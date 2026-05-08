import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import XysqLogo from './XysqLogo'
import '../styles/teams-visual.css'

/**
 * Teams visual — borrowed from the section-1 memory diagram, retuned for Teams.
 *
 *   Inner ring: AI tools (Claude, Cursor, ChatGPT, Gemini) — peers across
 *               teams. Same set as section 1 so the language carries over.
 *   Outer ring: a mixed cast of agent frameworks + people + a couple apps —
 *               the "team" itself: humans and agents collaborating.
 *   Centre:     xysq logo with "Teams" subtext, signalling the team-scope.
 *
 * The diagram cycles through three states (~5s each):
 *   1. join    — a new person fades in on the outer ring
 *   2. steady  — the team is whole, nothing changes
 *   3. depart  — one existing person fades out (with an amber strikethrough)
 *
 * The outer ring still rotates slowly so the diagram doesn't read as a
 * static screenshot. Particles + scenario edges are intentionally OMITTED —
 * section 1 does that; section 3 should feel quieter and more about the cast.
 */

const W = 600
const H = 480

const CX = W / 2
const CY = H / 2

const INNER_RX = 110
const INNER_RY = 95
const OUTER_RX = 240
const OUTER_RY = 195

const INNER_PERIOD = 32     // seconds, AI tools rotate clockwise slowly
const OUTER_PERIOD = -56    // counter-clockwise, slower

// HALO = node radius (px); used to clip lines just outside each chip.
const HALO = 28

/* ── Cast ──────────────────────────────────────────────────────────── */

// Inner ring: same AI tools as section 1, evenly spaced.
const INNER_NODES = [
  { id: 'claude',  name: 'Claude',  kind: 'ai',    logo: '/logos/claude.svg',   t0: 0.000, darkBg: false },
  { id: 'chatgpt', name: 'ChatGPT', kind: 'ai',    logo: '/logos/chatgpt.svg',  t0: 0.250, darkBg: true  },
  { id: 'gemini',  name: 'Gemini',  kind: 'ai',    logo: '/logos/gemini-c.svg', t0: 0.500, darkBg: false },
  { id: 'cursor',  name: 'Cursor',  kind: 'ai',    logo: '/logos/cursor.svg',   t0: 0.750, darkBg: true  },
]

// Outer ring: agent frameworks + people + one app.
// `kind: 'person'` is special — these are silhouette circles drawn inline,
// not images. People are the ones that fade in / out across cycle states.
//
// Slot ordering matters: t0 determines angular position. We have 10 slots
// total: 4 agents, 5 people slots (one is the "joining" slot, normally empty
// during steady state), and 1 app. At any moment 4 people are visible.
const OUTER_NODES = [
  { id: 'langchain',  name: 'LangChain',  kind: 'agent',  logo: '/logos/langchain.svg',   t0: 0 / 10,  darkBg: false, scale: 1.05 },
  { id: 'person-maya',  name: 'Maya',     kind: 'person', t0: 1 / 10 },
  { id: 'llamaindex', name: 'LlamaIndex', kind: 'agent',  logo: '/logos/llamaindex.svg',  t0: 2 / 10,  darkBg: false, scale: 1.0 },
  { id: 'person-rohan', name: 'Rohan',    kind: 'person', t0: 3 / 10 },
  { id: 'crewai',     name: 'CrewAI',     kind: 'agent',  logo: '/logos/crewai.svg',      t0: 4 / 10,  darkBg: false, scale: 1.0 },
  { id: 'person-sara',  name: 'Sara',     kind: 'person', t0: 5 / 10 },
  { id: 'googleadk',  name: 'Google ADK', kind: 'agent',  logo: '/logos/google-adk.png',  t0: 6 / 10,  darkBg: false, scale: 1.0 },
  { id: 'person-jordan',name: 'Jordan',   kind: 'person', t0: 7 / 10 },
  { id: 'notion',     name: 'Notion',     kind: 'app',    logo: '/logos/notion-c.svg',    t0: 8 / 10,  darkBg: false, scale: 1.45 },
  { id: 'person-amir',  name: 'Amir',     kind: 'person', t0: 9 / 10 },
]

/* ── Scenarios ─────────────────────────────────────────────────────── */

// At any moment, exactly 4 people are visible. The cycle:
//   1. steady — A, B, C, D present; Eli's slot is empty
//   2. depart — A is leaving (still rendered, fading + struck through)
//   3. join   — A is gone; Eli fades in to become the 4th teammate
// `visible` lists the people who appear in this scenario. `leaving` is one of
// them (rendered but in fade-out state). `joining` is one new person who's
// fading in.
const SCENARIOS = [
  {
    id: 'steady',
    visible: ['person-maya', 'person-rohan', 'person-sara', 'person-jordan'],
    leaving: null,
    joining: null,
    caption: 'Humans + agents working from one shared memory.',
  },
  {
    id: 'depart',
    visible: ['person-maya', 'person-rohan', 'person-sara', 'person-jordan'],
    leaving: 'person-maya',
    joining: null,
    caption: 'Maya left — the team’s memory stays with the team.',
  },
  {
    id: 'join',
    visible: ['person-rohan', 'person-sara', 'person-jordan', 'person-amir'],
    leaving: null,
    joining: 'person-amir',
    caption: 'Amir just joined — already has full team context.',
  },
]

const SCENARIO_MS = 4500

/* ── Math helpers ──────────────────────────────────────────────────── */

function livePos(node, t) {
  const isInner = INNER_NODES.includes(node)
  const period = isInner ? INNER_PERIOD : OUTER_PERIOD
  const rx = isInner ? INNER_RX : OUTER_RX
  const ry = isInner ? INNER_RY : OUTER_RY
  const theta = ((t / period) + node.t0) * Math.PI * 2 - Math.PI / 2
  return {
    x: CX + Math.cos(theta) * rx,
    y: CY + Math.sin(theta) * ry,
  }
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
  const end = clipEnd(b, a, r)
  return { x1: start.x, y1: start.y, x2: end.x, y2: end.y }
}

/* ── Component ─────────────────────────────────────────────────────── */

export default function TeamsVisual() {
  const [step, setStep] = useState(1) // start on "steady" so first paint reads cleanly
  const [tick, setTick] = useState(0)
  const tRef = useRef(0)
  const startRef = useRef(0)
  const rafRef = useRef(0)

  // Scenario rotation
  useEffect(() => {
    const t = setInterval(() => {
      setStep((s) => (s + 1) % SCENARIOS.length)
    }, SCENARIO_MS)
    return () => clearInterval(t)
  }, [])

  // Drift loop — single rAF, throttled to ~30fps
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

  const live = useMemo(() => {
    const out = {}
    const t = tRef.current
    for (const n of INNER_NODES) out[n.id] = { ...n, ...livePos(n, t) }
    for (const n of OUTER_NODES) out[n.id] = { ...n, ...livePos(n, t) }
    return out
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tick])

  const scenario = SCENARIOS[step]

  // Static spokes — every outer node connects to a single inner-ring AI
  // node (so the diagram has visible structure). Pre-built once.
  const spokes = useMemo(() => {
    // Round-robin assignment so every AI gets ~equal load.
    const ais = INNER_NODES.map((n) => n.id)
    return OUTER_NODES.map((on, i) => ({
      from: on.id,
      to: ais[i % ais.length],
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="tv-wrap">
      <div className="tv-card">
        {/* Centre xysq logo + "Teams" subtext — pinned at exact centre */}
        <div
          className="tv-core"
          style={{ left: `${(CX / W) * 100}%`, top: `${(CY / H) * 100}%` }}
          aria-hidden="true"
        >
          <XysqLogo size={84} />
          <span className="tv-core-subtext">Teams</span>
        </div>

        <svg
          viewBox={`0 0 ${W} ${H}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
          className="tv-svg"
          aria-hidden="true"
        >
          <defs>
            {/* Soft paper grid for the diagram backdrop */}
            <pattern id="tv-grid" width="28" height="28" patternUnits="userSpaceOnUse">
              <path d="M 28 0 L 0 0 0 28" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
            <radialGradient id="tv-grid-fade" cx="50%" cy="50%" r="65%">
              <stop offset="0%"   stopColor="white" stopOpacity="1" />
              <stop offset="70%"  stopColor="white" stopOpacity="0.85" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <mask id="tv-grid-mask">
              <rect x="0" y="0" width={W} height={H} fill="url(#tv-grid-fade)" />
            </mask>
          </defs>

          {/* Background grid */}
          <rect
            x="0" y="0" width={W} height={H}
            fill="url(#tv-grid)"
            mask="url(#tv-grid-mask)"
            className="tv-grid-rect"
          />

          {/* Faint orbit guides */}
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

          {/* Spokes — every outer node → its assigned AI tool. Spokes from a
              hidden person (not in scenario.visible) are dropped entirely.
              The spoke from the leaving person fades to 0 in sync with the
              chip; the spoke from the joining person fades up from 0. */}
          {spokes.map((sp, i) => {
            const fromNode = OUTER_NODES.find((n) => n.id === sp.from)
            const isPerson = fromNode?.kind === 'person'
            // For people: only render spoke if person is in visible set
            if (isPerson && !scenario.visible.includes(sp.from)) {
              return null
            }
            const seg = clippedSegment(live[sp.from], live[sp.to])
            const isLeavingEdge = scenario.leaving === sp.from
            const isJoiningEdge = scenario.joining === sp.from
            return (
              <line
                key={`spoke-${i}`}
                x1={seg.x1}
                y1={seg.y1}
                x2={seg.x2}
                y2={seg.y2}
                stroke="rgba(0, 229, 200, 0.32)"
                strokeOpacity={isLeavingEdge ? 0 : isJoiningEdge ? 1 : 1}
                strokeWidth="1.1"
                strokeLinecap="round"
                style={{
                  transition: isLeavingEdge
                    ? 'stroke-opacity 1s ease-in 0.2s'
                    : isJoiningEdge
                      ? 'stroke-opacity 0.9s ease-out 0.5s'
                      : 'stroke-opacity 0.6s ease',
                  // Joining edges should start invisible — use a CSS variable
                  // by inlining the animation via opacity. simplest: kick
                  // initial opacity to 0 on joining via a class.
                  opacity: isJoiningEdge ? undefined : 1,
                }}
                className={isJoiningEdge ? 'tv-spoke-joining' : ''}
              />
            )
          })}
        </svg>

        {/* Outer ring nodes — HTML overlays so logos stay crisp.
            People nodes get the join/depart fade animation. People not in
            scenario.visible are hidden entirely. */}
        {OUTER_NODES.map((node) => {
          const p = live[node.id]
          if (!p) return null

          // Hide people who aren't part of the current scenario's visible set.
          if (node.kind === 'person' && !scenario.visible.includes(node.id)) {
            return null
          }

          // Determine state for this person
          const isLeaving = scenario.leaving === node.id
          const isJoining = scenario.joining === node.id
          const stateClass = isLeaving ? 'tv-leaving' : isJoining ? 'tv-joining' : ''

          return (
            <div
              key={node.id}
              className={[
                'tv-node',
                `tv-node--${node.kind}`,
                node.darkBg ? 'tv-node--invert' : '',
                stateClass,
              ].filter(Boolean).join(' ')}
              style={{
                left: `${(p.x / W) * 100}%`,
                top: `${(p.y / H) * 100}%`,
              }}
              title={node.name}
            >
              {node.kind === 'person' ? (
                <PersonSilhouette name={node.name} />
              ) : (
                <img
                  src={node.logo}
                  alt={node.name}
                  className="tv-node-logo"
                  style={node.scale ? { '--tv-logo-scale': node.scale } : undefined}
                />
              )}

              {/* Strikethrough for the departing node */}
              {isLeaving && <span className="tv-strike" aria-hidden="true" />}
            </div>
          )
        })}

        {/* Join/Depart notification badges — float next to the affected
            person with a subtext like "just joined" or "left the team". */}
        <AnimatePresence>
          {scenario.joining && (() => {
            const node = OUTER_NODES.find((n) => n.id === scenario.joining)
            const p = node && live[node.id]
            if (!p) return null
            // Decide notification offset based on the person's quadrant:
            // for nodes on the right side of the diagram, anchor to the
            // right of the chip; for left, anchor to the left. Always
            // offset slightly upward so the note sits above the chip.
            const onRight = p.x > CX
            return (
              <motion.div
                key={`note-join-${scenario.id}`}
                className={`tv-note tv-note--join ${onRight ? 'tv-note--right' : 'tv-note--left'}`}
                style={{
                  left: `${(p.x / W) * 100}%`,
                  top: `${(p.y / H) * 100}%`,
                }}
                initial={{ opacity: 0, y: 12, scale: 0.85 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
              >
                <span className="tv-note-badge tv-note-badge--join">+</span>
                <span className="tv-note-body">
                  <span className="tv-note-name">{node.name} joined</span>
                  <span className="tv-note-sub">inherits team memory</span>
                </span>
              </motion.div>
            )
          })()}

          {scenario.leaving && (() => {
            const node = OUTER_NODES.find((n) => n.id === scenario.leaving)
            const p = node && live[node.id]
            if (!p) return null
            const onRight = p.x > CX
            return (
              <motion.div
                key={`note-leave-${scenario.id}`}
                className={`tv-note tv-note--leave ${onRight ? 'tv-note--right' : 'tv-note--left'}`}
                style={{
                  left: `${(p.x / W) * 100}%`,
                  top: `${(p.y / H) * 100}%`,
                }}
                initial={{ opacity: 0, y: 12, scale: 0.85 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
              >
                <span className="tv-note-badge tv-note-badge--leave">×</span>
                <span className="tv-note-body">
                  <span className="tv-note-name">{node.name} left</span>
                  <span className="tv-note-sub">team memory stays</span>
                </span>
              </motion.div>
            )
          })()}
        </AnimatePresence>

        {/* Inner ring nodes — AI tools, always present */}
        {INNER_NODES.map((node) => {
          const p = live[node.id]
          if (!p) return null
          return (
            <div
              key={node.id}
              className={[
                'tv-node',
                'tv-node--ai',
                node.darkBg ? 'tv-node--invert' : '',
              ].filter(Boolean).join(' ')}
              style={{
                left: `${(p.x / W) * 100}%`,
                top: `${(p.y / H) * 100}%`,
              }}
              title={node.name}
            >
              <img
                src={node.logo}
                alt={node.name}
                className="tv-node-logo"
              />
            </div>
          )
        })}
      </div>

      {/* Caption strip below the card — narrates the scenario + isolation note */}
      <div className="tv-caption-outside" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.div
            key={scenario.id}
            className="tv-caption-inner"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="tv-caption-dot" />
            <span className="tv-caption-text">{scenario.caption}</span>
          </motion.div>
        </AnimatePresence>
      </div>

      <p className="tv-isolation-note">
        Every team’s vault is isolated.
      </p>
    </div>
  )
}

/* ── Person silhouette ──
   Sits inside a white-plate node (matches every logo chip in the diagram).
   The chip layout is: coral head circle on top, name label below in mono.
   We render the name as HTML so font sizing/wrapping behaves naturally
   regardless of name length (Maya / Rohan / Jordan etc.). */
function PersonSilhouette({ name }) {
  return (
    <div className="tv-person" aria-hidden="true">
      <svg
        viewBox="0 0 44 44"
        xmlns="http://www.w3.org/2000/svg"
        className="tv-person-head-svg"
      >
        {/* Head */}
        <circle cx="22" cy="14" r="7" fill="#ff6b7a" />
        {/* Shoulders — a small rounded arch under the head */}
        <path
          d="M 11 30 Q 22 19 33 30 L 33 32 L 11 32 Z"
          fill="#ff6b7a"
        />
      </svg>
      <span className="tv-person-name">{name}</span>
    </div>
  )
}
