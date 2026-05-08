import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import XysqLogo from './XysqLogo'
import '../styles/memory-diagram.css'

/**
 * Knowledge graph view: apps + AI tools coexist as peers.
 * Nodes drift gently around their anchor positions (sinusoidal, per-node phase).
 * Every ~3.5s a scenario lights up: 2 source apps feed an AI tool,
 * particles travel the active edges, the AI node pulses bright,
 * caption explains what's happening. Then quiet again, next scenario.
 */

const W = 560
const H = 440

// Node halo radius (px) for clipping edges. Apps are 44px circles
// (radius 22), AIs are 52px (radius 26). HALO is the larger value so
// lines stop just outside the AI rim — apps get a tiny extra gap which
// reads cleanly.
const HALO = 28

// Two concentric orbits around a static "xysq.ai" core.
//   Inner ring: 4 AIs, slow clockwise rotation
//   Outer ring: 7 apps, slower counter-clockwise rotation
// Each node has a fixed angular offset within its ring; positions
// are computed live from (centre + ring radius * angle(t)).
const CX = W / 2
const CY = H / 2
const INNER_RX = 115  // AI ring — clears the central logo's bounding box
const INNER_RY = 100
const OUTER_RX = 220  // app ring
const OUTER_RY = 175

// Periods in seconds for one full revolution. Negative = counter-clockwise.
const INNER_PERIOD = 28
const OUTER_PERIOD = -52

// `darkBg: true` means the logo is a white shape (Cursor, ChatGPT) and
// needs a charcoal plate behind it to be visible — both modes.
const nodes = {
  // ── AI core (inner ring) ────────────────────────────────────────────
  claude:  { id: 'claude',  name: 'Claude',  logo: '/logos/claude.svg',     kind: 'ai',  ring: 'inner', t0: 0.000, darkBg: false },
  chatgpt: { id: 'chatgpt', name: 'ChatGPT', logo: '/logos/chatgpt.svg',    kind: 'ai',  ring: 'inner', t0: 0.250, darkBg: true  },
  gemini:  { id: 'gemini',  name: 'Gemini',  logo: '/logos/gemini-c.svg',   kind: 'ai',  ring: 'inner', t0: 0.500, darkBg: false },
  cursor:  { id: 'cursor',  name: 'Cursor',  logo: '/logos/cursor.svg',     kind: 'ai',  ring: 'inner', t0: 0.750, darkBg: true  },

  // ── App ring (outer) ────────────────────────────────────────────────
  // `scale` is a per-logo multiplier — used for brand SVGs with wide
  // viewBoxes that render too small inside a circular badge.
  // 10 apps spaced every 36° around the outer ring.
  notion:  { id: 'notion',  name: 'Notion',   logo: '/logos/notion-c.svg',   kind: 'app', ring: 'outer', t0: 0 / 10, darkBg: false, scale: 1.55 },
  gmail:   { id: 'gmail',   name: 'Gmail',    logo: '/logos/gmail-c.svg',    kind: 'app', ring: 'outer', t0: 1 / 10, darkBg: false, scale: 1.15 },
  drive:   { id: 'drive',   name: 'Drive',    logo: '/logos/drive-c.svg',    kind: 'app', ring: 'outer', t0: 2 / 10, darkBg: false, scale: 1.1  },
  cal:     { id: 'cal',     name: 'Calendar', logo: '/logos/calendar-c.svg', kind: 'app', ring: 'outer', t0: 3 / 10, darkBg: false },
  github:  { id: 'github',  name: 'GitHub',   logo: '/logos/github-c.svg',   kind: 'app', ring: 'outer', t0: 4 / 10, darkBg: false },
  linear:  { id: 'linear',  name: 'Linear',   logo: '/logos/linear-c.svg',   kind: 'app', ring: 'outer', t0: 5 / 10, darkBg: false },
  jira:    { id: 'jira',    name: 'Jira',     logo: '/logos/jira-c.svg',     kind: 'app', ring: 'outer', t0: 6 / 10, darkBg: false },
  figma:   { id: 'figma',   name: 'Figma',    logo: '/logos/figma-c.svg',    kind: 'app', ring: 'outer', t0: 7 / 10, darkBg: false },
  dropbox: { id: 'dropbox', name: 'Dropbox',  logo: '/logos/dropbox-c.svg',  kind: 'app', ring: 'outer', t0: 8 / 10, darkBg: false },
  slack:   { id: 'slack',   name: 'Slack',    logo: '/logos/slack-c.svg',    kind: 'app', ring: 'outer', t0: 9 / 10, darkBg: false },
}

// Each app spokes into 1–2 AI tools; AI cluster is fully meshed.
const edges = [
  // AI internal mesh
  ['claude',  'chatgpt'],
  ['claude',  'cursor'],
  ['claude',  'gemini'],
  ['chatgpt', 'gemini'],
  ['chatgpt', 'cursor'],
  ['cursor',  'gemini'],

  // App spokes
  ['notion',  'claude'],
  ['notion',  'chatgpt'],
  ['gmail',   'chatgpt'],
  ['gmail',   'claude'],
  ['drive',   'chatgpt'],
  ['drive',   'gemini'],
  ['cal',     'gemini'],
  ['cal',     'chatgpt'],
  ['github',  'cursor'],
  ['github',  'gemini'],
  ['linear',  'cursor'],
  ['linear',  'claude'],
  ['jira',    'cursor'],
  ['jira',    'claude'],
  ['figma',   'gemini'],
  ['figma',   'chatgpt'],
  ['dropbox', 'gemini'],
  ['dropbox', 'chatgpt'],
  ['slack',   'claude'],
  ['slack',   'cursor'],
]

const scenarios = [
  { ai: 'claude',  sources: ['slack',   'jira'],   caption: 'Claude is reading Slack + Jira → cross-context reply'   },
  { ai: 'chatgpt', sources: ['notion',  'gmail'],  caption: 'ChatGPT is reading Notion + Gmail → meeting prep'       },
  { ai: 'cursor',  sources: ['github',  'linear'], caption: 'Cursor is reading GitHub + Linear → ticket-aware coding'},
  { ai: 'gemini',  sources: ['drive',   'cal'],    caption: 'Gemini is reading Drive + Calendar → weekly digest'     },
  { ai: 'chatgpt', sources: ['figma',   'dropbox'],caption: 'ChatGPT is reading Figma + Dropbox → design review'     },
  { ai: 'claude',  sources: ['github',  'slack'],  caption: 'Claude is reading GitHub + Slack → incident summary'    },
]

const SCENARIO_MS = 3500


function findEdgeIndex(a, b) {
  return edges.findIndex(
    ([x, y]) => (x === a && y === b) || (x === b && y === a)
  )
}

function clipEnd(p1, p2, r) {
  const dx = p2.x - p1.x
  const dy = p2.y - p1.y
  const len = Math.hypot(dx, dy) || 1
  const t = r / len
  return { x: p1.x + dx * t, y: p1.y + dy * t }
}

function clippedSegment(a, b, r = HALO) {
  const start = clipEnd(a, b, r)
  const end   = clipEnd(b, a, r)
  return { x1: start.x, y1: start.y, x2: end.x, y2: end.y }
}

// Compute the live orbital position of a node at time t (seconds).
// Each node moves along its ring at the ring's period, offset by t0.
function livePos(node, t) {
  const period = node.ring === 'inner' ? INNER_PERIOD : OUTER_PERIOD
  const rx     = node.ring === 'inner' ? INNER_RX     : OUTER_RX
  const ry     = node.ring === 'inner' ? INNER_RY     : OUTER_RY
  // angle in radians; t0 is in turns, t/period in turns. Subtract pi/2 so
  // turn=0 maps to the top of the ring (12 o'clock) — reads more natural.
  const theta = ((t / period) + node.t0) * Math.PI * 2 - Math.PI / 2
  return {
    x: CX + Math.cos(theta) * rx,
    y: CY + Math.sin(theta) * ry,
  }
}

export default function MemoryDiagram() {
  const [step, setStep] = useState(0)
  // Tick state — bumped each animation frame; positions read from `tRef.current`
  // and pushed into a single state value so React renders.
  const [tick, setTick] = useState(0)
  const rafRef = useRef(0)
  const tRef = useRef(0)
  const startRef = useRef(0)

  // Scenario rotation
  useEffect(() => {
    const t = setInterval(() => {
      setStep((s) => (s + 1) % scenarios.length)
    }, SCENARIO_MS)
    return () => clearInterval(t)
  }, [])

  // Drift loop — single rAF, throttled to ~30fps so we don't burn cycles
  // re-rendering React 60 times a second for a marketing graphic.
  useEffect(() => {
    const reduced = typeof window !== 'undefined'
      && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    let last = 0
    const loop = (now) => {
      if (!startRef.current) startRef.current = now
      tRef.current = (now - startRef.current) / 1000
      if (now - last > 33) {
        last = now
        setTick((n) => (n + 1) % 1_000_000)
      }
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  // Live node positions for this frame
  const live = useMemo(() => {
    const out = {}
    const t = tRef.current
    for (const id in nodes) out[id] = { ...nodes[id], ...livePos(nodes[id], t) }
    return out
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tick])

  const current = scenarios[step]
  const activeAi = current.ai
  const activeSources = new Set(current.sources)
  const activeEdgeIndices = new Set(
    current.sources.map((s) => findEdgeIndex(s, activeAi)).filter((i) => i >= 0)
  )

  return (
    <div className="md-wrap">
      <div className="md-card">
        {/* Static xysq logo — sits at the centre, planets orbit it.
            The internal graph dots blink, mirroring the live activity around. */}
        <div
          className="md-core-logo"
          style={{ left: `${(CX / W) * 100}%`, top: `${(CY / H) * 100}%` }}
          aria-hidden="true"
        >
          <XysqLogo size={88} />
        </div>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
          className="md-svg"
          aria-hidden="true"
        >
          <defs>
            <filter id="md-soft" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="1.6" />
            </filter>
            {/* Ruled grid — faint criss-cross paper feel inside the card.
                Stroke uses currentColor so light mode picks up the lychee
                tint via CSS on the parent .md-svg. */}
            <pattern
              id="md-grid"
              width="28"
              height="28"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 28 0 L 0 0 0 28"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </pattern>
            {/* Mask so the grid fades softly toward the card edges. */}
            <radialGradient id="md-grid-fade" cx="50%" cy="50%" r="65%">
              <stop offset="0%"   stopColor="white" stopOpacity="1"/>
              <stop offset="70%"  stopColor="white" stopOpacity="0.85"/>
              <stop offset="100%" stopColor="white" stopOpacity="0"/>
            </radialGradient>
            <mask id="md-grid-mask">
              <rect x="0" y="0" width={W} height={H} fill="url(#md-grid-fade)" />
            </mask>
          </defs>

          {/* Background ruled grid */}
          <rect
            x="0" y="0" width={W} height={H}
            fill="url(#md-grid)"
            mask="url(#md-grid-mask)"
          />

          {/* Faint orbit rings — guides for the planetary motion */}
          <ellipse
            cx={CX} cy={CY} rx={INNER_RX} ry={INNER_RY}
            fill="none"
            stroke="rgba(0, 229, 200, 0.16)"
            strokeWidth="1"
            strokeDasharray="2 4"
          />
          <ellipse
            cx={CX} cy={CY} rx={OUTER_RX} ry={OUTER_RY}
            fill="none"
            stroke="rgba(0, 229, 200, 0.12)"
            strokeWidth="1"
            strokeDasharray="2 4"
          />


          {/* Static background edges — clipped to chip halos, recomputed live */}
          {edges.map(([a, b], i) => {
            const seg = clippedSegment(live[a], live[b])
            const isActive = activeEdgeIndices.has(i)
            return (
              <line
                key={`edge-${i}`}
                x1={seg.x1}
                y1={seg.y1}
                x2={seg.x2}
                y2={seg.y2}
                stroke={isActive ? 'rgba(0, 229, 200, 0.85)' : 'rgba(0, 229, 200, 0.28)'}
                strokeWidth={isActive ? 1.8 : 1.1}
                strokeLinecap="round"
                style={{ transition: 'stroke 0.4s ease, stroke-width 0.4s ease' }}
              />
            )
          })}

          {/* Travelling particles on active edges */}
          {[...activeEdgeIndices].map((edgeIdx) => {
            const [a, b] = edges[edgeIdx]
            const fromNode = live[a].kind === 'app' ? live[a] : live[b]
            const toNode   = live[a].kind === 'app' ? live[b] : live[a]
            const seg = clippedSegment(fromNode, toNode)
            const path = `M ${seg.x1} ${seg.y1} L ${seg.x2} ${seg.y2}`
            return (
              <g key={`particle-${step}-${edgeIdx}`}>
                <circle r="3" fill="#aef7ec" filter="url(#md-soft)">
                  <animateMotion
                    dur="1.4s"
                    begin="0.2s"
                    repeatCount="2"
                    path={path}
                  />
                  <animate
                    attributeName="opacity"
                    values="0;1;1;0"
                    keyTimes="0;0.15;0.85;1"
                    dur="1.4s"
                    begin="0.2s"
                    repeatCount="2"
                  />
                </circle>
              </g>
            )
          })}
        </svg>

        {/* Nodes — HTML overlays so logos and labels stay crisp */}
        {Object.values(live).map((node) => {
          const isActiveAi     = node.id === activeAi
          const isActiveSource = activeSources.has(node.id)
          const isActive       = isActiveAi || isActiveSource

          return (
            <div
              key={node.id}
              className={[
                'md-node',
                `md-node--${node.kind}`,
                node.darkBg ? 'md-node--invert' : '',
                isActiveAi ? 'md-node--ai-active' : '',
                isActiveSource ? 'md-node--source-active' : '',
              ].filter(Boolean).join(' ')}
              style={{
                left: `${(node.x / W) * 100}%`,
                top:  `${(node.y / H) * 100}%`,
              }}
              title={node.name}
            >
              <img
                src={node.logo}
                alt={node.name}
                className="md-node-logo"
                style={node.scale ? { '--md-logo-scale': node.scale } : undefined}
              />

              {isActive && (
                <motion.span
                  key={`pulse-${node.id}-${step}`}
                  className={`md-node-pulse${isActiveAi ? ' md-node-pulse--ai' : ''}`}
                  initial={{ scale: 0.6, opacity: 0.7 }}
                  animate={{ scale: 1.8, opacity: 0 }}
                  transition={{ duration: 1.4, ease: 'easeOut', repeat: 1 }}
                  aria-hidden="true"
                />
              )}
            </div>
          )
        })}

      </div>

      {/* Live caption — sits below the card, narrating what's lighting up. */}
      <div className="md-caption-outside" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            className="md-caption-inner"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="md-caption-dot" />
            <span className="md-caption-text">{current.caption}</span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
