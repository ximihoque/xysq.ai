import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  FileText, FileType2, FileCode2, Receipt, BookOpen, ScrollText,
  Plane, Users, Briefcase,
  MessagesSquare, Mic, Subtitles, Phone, MessageCircle,
} from 'lucide-react'
import XysqLogo from './XysqLogo'
import '../styles/organise-visual.css'

/**
 * Organise visual — hourglass with content "feeds" feeding the centre.
 *
 * Each upper cluster is a feed of realistic mini-cards (a 30-page legal
 * contract, an all-hands meeting recording, an onboarding doc, …) with a
 * format badge. 5 cards are visible at any moment, drawn from a pool of
 * ~10 per cluster; cards fade in / fade out on staggered cycles so the
 * area feels alive and communicates the breadth of supported content.
 *
 * Centre: xysq logo + ORGANISE.
 * Bottom: horizontal strip — Interfaces (AI tools) | Consumers (frameworks).
 */

const W = 640
const H = 540
const CX = W / 2
const CY = 350

const POOL_SIZE = 10
const SLOT_TICK_MS = 1700

/* ── Content pools ──────────────────────────────────────────────────── */

// Documents — realistic artefacts a real user would upload. Title-forward,
// format badge as secondary. Each card has a content icon (left) + title
// + format badge (right).
const DOC_POOL = [
  { id: 'd-legal',     title: '30-page legal contract',   format: 'PDF',  Icon: ScrollText },
  { id: 'd-flight',    title: 'Flight tickets · Mar 12',  format: 'PDF',  Icon: Plane },
  { id: 'd-onboard',   title: 'Onboarding guide',         format: 'MD',   Icon: BookOpen },
  { id: 'd-q3',        title: 'Q3 board report',          format: 'DOCX', Icon: Briefcase },
  { id: 'd-runbook',   title: 'Server runbook',           format: 'TXT',  Icon: FileText },
  { id: 'd-termsheet', title: 'Term sheet · Series A',    format: 'PDF',  Icon: ScrollText },
  { id: 'd-rfc',       title: 'Design RFC · async auth',  format: 'MD',   Icon: FileCode2 },
  { id: 'd-shared',    title: 'Shared by Rohan',          format: 'PDF',  Icon: Users },
  { id: 'd-receipt',   title: 'Office expenses · Q2',     format: 'PDF',  Icon: Receipt },
  { id: 'd-spec',      title: 'API spec · v2',            format: 'DOCX', Icon: FileType2 },
]

// Conversations — meetings, call transcripts, chat threads, captions.
const CONV_POOL = [
  { id: 'c-allhands',  title: 'All-hands · Tue 11am',     format: 'Meeting',    Icon: Mic },
  { id: 'c-engslack',  title: 'Slack #engineering',       format: 'Transcript', Icon: MessagesSquare },
  { id: 'c-acme',      title: 'Customer call · Acme',     format: 'Meeting',    Icon: Phone },
  { id: 'c-retro',     title: 'Team retro · Aug 14',      format: 'Captions',   Icon: Subtitles },
  { id: 'c-strategy',  title: 'Leadership strategy chat', format: 'Transcript', Icon: MessagesSquare },
  { id: 'c-1on1',      title: '1:1 · Maya & Rohan',       format: 'Meeting',    Icon: MessageCircle },
  { id: 'c-launch',    title: 'Launch standup',           format: 'Captions',   Icon: Subtitles },
  { id: 'c-design',    title: 'Design review · Sep 5',    format: 'Meeting',    Icon: Mic },
  { id: 'c-sales',     title: 'Sales call · Globex',      format: 'Transcript', Icon: Phone },
  { id: 'c-roadmap',   title: 'Roadmap discussion',       format: 'Captions',   Icon: MessageCircle },
]

/* Format-badge color mapping. Keeps the palette consistent across both pools. */
const FORMAT_COLORS = {
  PDF:        '#f56450',
  DOCX:       '#82aaff',
  TXT:        '#00e5c8',
  MD:         '#9b87ff',
  Meeting:    '#9b87ff',
  Transcript: '#ffb454',
  Captions:   '#82aaff',
}

/* ── Cluster anchors ────────────────────────────────────────────────── */

const DOC_CLUSTER  = { x: 130, domain: 'Documents',     hint: 'Legal · Reports · Docs' }
const CONV_CLUSTER = { x: 470, domain: 'Conversations', hint: 'Meetings · Chat transcripts' }

// Zigzag layout: each side alternates between an "outer" x (hugging the
// frame edge) and an "inner" x (reaching toward the logo). Tight y spacing
// allows neighbouring cards to overlap slightly via their tilt.
//
// Logo at (320, 350) gets a rectangular clearance: any slot whose centre
// falls inside both half-width 180 AND half-height 70 is filtered out, so
// "inner" slots only live in the upper half where the logo isn't.
const LOGO_CX = 320
const LOGO_CY = 350
const LOGO_CLEAR_HALF_W = 180
const LOGO_CLEAR_HALF_H = 70

// Card width is 200px. Frame is 640 wide. Outer x leaves a ~20px breathing
// gap from each frame edge (left=120 → card edge at 20; right=500 → card edge
// at 600 with 40px). Inner x reaches further into the centre — left=200 and
// right=420 — and is only used at y values where the logo clearance allows.
const SLOTS = [
  // Left column — Documents (zigzag: outer · inner · outer · inner · outer)
  { x: 120, y:  95, rot: -2, pool: 'doc'  },
  { x: 200, y: 150, rot:  3, pool: 'doc'  },
  { x: 120, y: 210, rot: -3, pool: 'doc'  },
  { x: 200, y: 270, rot:  2, pool: 'doc'  },
  { x: 120, y: 325, rot: -2, pool: 'doc'  },

  // Right column — Conversations (mirrored zigzag)
  { x: 500, y:  95, rot:  2, pool: 'conv' },
  { x: 420, y: 150, rot: -3, pool: 'conv' },
  { x: 500, y: 210, rot:  3, pool: 'conv' },
  { x: 420, y: 270, rot: -2, pool: 'conv' },
  { x: 500, y: 325, rot:  2, pool: 'conv' },
]

// Filter slots that violate the logo clearance — rectangular box, more
// aggressive than the previous circular check. A slot is rejected only if
// its centre falls INSIDE both the half-width and half-height of the
// clearance box.
const SAFE_SLOTS = SLOTS.filter((s) => {
  const dx = Math.abs(s.x - LOGO_CX)
  const dy = Math.abs(s.y - LOGO_CY)
  return dx >= LOGO_CLEAR_HALF_W || dy >= LOGO_CLEAR_HALF_H
})

const DOC_SLOT_INDICES  = SAFE_SLOTS.map((s, i) => s.pool === 'doc'  ? i : -1).filter((i) => i >= 0)
const CONV_SLOT_INDICES = SAFE_SLOTS.map((s, i) => s.pool === 'conv' ? i : -1).filter((i) => i >= 0)

/* ── Bottom strip ──────────────────────────────────────────────────── */

const CONSUMERS_LEFT = [
  { id: 'claude',  name: 'Claude',  logo: '/logos/claude.svg',   darkBg: false },
  { id: 'chatgpt', name: 'ChatGPT', logo: '/logos/chatgpt.svg',  darkBg: true  },
  { id: 'cursor',  name: 'Cursor',  logo: '/logos/cursor.svg',   darkBg: true  },
  { id: 'gemini',  name: 'Gemini',  logo: '/logos/gemini-c.svg', darkBg: false },
]

const CONSUMERS_RIGHT = [
  { id: 'langchain',  name: 'LangChain',  logo: '/logos/langchain.svg',  darkBg: false, scale: 1.05 },
  { id: 'llamaindex', name: 'LlamaIndex', logo: '/logos/llamaindex.svg', darkBg: false, scale: 1.0 },
  { id: 'crewai',     name: 'CrewAI',     logo: '/logos/crewai.svg',     darkBg: false, scale: 1.25 },
  { id: 'googleadk',  name: 'Google ADK', logo: '/logos/google-adk.png', darkBg: false, scale: 1.0 },
]

/* ── Slot rotation hook ─────────────────────────────────────────────── */

/* Maintains an array of `slotCount` content-indices for a given pool. Every
   `tickMs`, one slot rotates to the next pool item that isn't already
   visible in this stream. Each slot has a key that bumps on swap so
   AnimatePresence can drive fade-in / fade-out per slot. */
function useSlotRotation(poolSize, slotCount, tickMs, offsetMs = 0) {
  const [slots, setSlots] = useState(() => {
    return Array.from({ length: slotCount }, (_, i) => ({
      poolIdx: i % poolSize,
      key: i,
    }))
  })
  const slotsRef = useRef(slots)
  useEffect(() => { slotsRef.current = slots }, [slots])
  const nextSlotRef = useRef(0)
  const nextPoolRef = useRef(slotCount % poolSize)

  useEffect(() => {
    const reduced = typeof window !== 'undefined'
      && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const start = setTimeout(() => {
      const id = setInterval(() => {
        const slotIdx = nextSlotRef.current % slotCount
        nextSlotRef.current = (nextSlotRef.current + 1) % slotCount
        const visible = new Set(slotsRef.current.map((s) => s.poolIdx))
        let candidate = nextPoolRef.current
        let guard = 0
        while (visible.has(candidate) && guard < poolSize) {
          candidate = (candidate + 1) % poolSize
          guard++
        }
        nextPoolRef.current = (candidate + 1) % poolSize
        setSlots((prev) => {
          const next = [...prev]
          next[slotIdx] = { poolIdx: candidate, key: prev[slotIdx].key + slotCount }
          return next
        })
      }, tickMs)
      return () => clearInterval(id)
    }, offsetMs)

    return () => clearTimeout(start)
  }, [tickMs, offsetMs, slotCount, poolSize])

  return slots
}

/* ── Component ─────────────────────────────────────────────────────── */

export default function OrganiseVisual() {
  // Two independent rotation streams — staggered start so the two pools
  // don't tick in lockstep.
  const docSlots  = useSlotRotation(POOL_SIZE, DOC_SLOT_INDICES.length,  SLOT_TICK_MS, 0)
  const convSlots = useSlotRotation(POOL_SIZE, CONV_SLOT_INDICES.length, SLOT_TICK_MS, 850)

  return (
    <div className="ov-wrap">
      <div className="ov-card">
        {/* Centre xysq logo + ORGANISE */}
        <div
          className="ov-core"
          style={{ left: `${(CX / W) * 100}%`, top: `${(CY / H) * 100}%` }}
          aria-hidden="true"
        >
          <XysqLogo size={68} />
          <span className="ov-core-subtext">Organise</span>
        </div>

        {/* Background paper grid */}
        <svg
          viewBox={`0 0 ${W} ${H}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
          className="ov-svg"
          aria-hidden="true"
        >
          <defs>
            <pattern id="ov-grid" width="28" height="28" patternUnits="userSpaceOnUse">
              <path d="M 28 0 L 0 0 0 28" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
            <radialGradient id="ov-grid-fade" cx="50%" cy="50%" r="65%">
              <stop offset="0%"   stopColor="white" stopOpacity="1" />
              <stop offset="70%"  stopColor="white" stopOpacity="0.85" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <mask id="ov-grid-mask">
              <rect x="0" y="0" width={W} height={H} fill="url(#ov-grid-fade)" />
            </mask>
          </defs>
          <rect
            x="0" y="0" width={W} height={H}
            fill="url(#ov-grid)"
            mask="url(#ov-grid-mask)"
            className="ov-grid-rect"
          />
        </svg>

        {/* Cluster headers */}
        {[
          { ...DOC_CLUSTER, headerY: 18 },
          { ...CONV_CLUSTER, headerY: 18 },
        ].map((cluster) => (
          <div
            key={cluster.domain}
            className="ov-cluster"
            style={{
              left: `${(cluster.x / W) * 100}%`,
              top: `${(cluster.headerY / H) * 100}%`,
            }}
          >
            <div className="ov-cluster-head">
              <span className="ov-cluster-name">{cluster.domain}</span>
              <span className="ov-cluster-hint">{cluster.hint}</span>
            </div>
          </div>
        ))}

        {/* Feed cards — full-width layout. Two streams (Documents +
            Conversations) draw from their respective pools and render into
            their assigned slot indices in the shared SAFE_SLOTS array. */}
        <FeedStream
          slots={docSlots}
          slotIndices={DOC_SLOT_INDICES}
          slotPositions={SAFE_SLOTS}
          pool={DOC_POOL}
        />
        <FeedStream
          slots={convSlots}
          slotIndices={CONV_SLOT_INDICES}
          slotPositions={SAFE_SLOTS}
          pool={CONV_POOL}
        />

        {/* Bottom horizontal strip */}
        <div className="ov-strip">
          <div className="ov-strip-half ov-strip-half--left">
            <span className="ov-strip-label">Interfaces</span>
            <span className="ov-strip-sublabel">AI tools</span>
            <div className="ov-strip-row">
              {CONSUMERS_LEFT.map((node) => (
                <div
                  key={node.id}
                  className={[
                    'ov-node',
                    node.darkBg ? 'ov-node--invert' : '',
                  ].filter(Boolean).join(' ')}
                  title={node.name}
                >
                  <img
                    src={node.logo}
                    alt={node.name}
                    className="ov-node-logo"
                    style={node.scale ? { '--ov-logo-scale': node.scale } : undefined}
                    width="24"
                    height="24"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="ov-strip-divider" aria-hidden="true" />

          <div className="ov-strip-half ov-strip-half--right">
            <span className="ov-strip-label">Consumers</span>
            <span className="ov-strip-sublabel">Agent frameworks</span>
            <div className="ov-strip-row">
              {CONSUMERS_RIGHT.map((node) => (
                <div
                  key={node.id}
                  className={[
                    'ov-node',
                    node.darkBg ? 'ov-node--invert' : '',
                  ].filter(Boolean).join(' ')}
                  title={node.name}
                >
                  <img
                    src={node.logo}
                    alt={node.name}
                    className="ov-node-logo"
                    style={node.scale ? { '--ov-logo-scale': node.scale } : undefined}
                    width="24"
                    height="24"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <p className="ov-tagline">
        Synthesized knowledge, accessible from any agent.
      </p>
    </div>
  )
}

/* ── Sub-components ────────────────────────────────────────────────── */

function FeedStream({ slots, slotIndices, slotPositions, pool }) {
  return (
    <>
      {slots.map((slot, i) => {
        const item = pool[slot.poolIdx]
        const pos = slotPositions[slotIndices[i]]
        if (!pos) return null
        // Non-animated wrapper handles positioning + centering + rotation;
        // the inner motion.div only animates opacity/scale/y so framer-motion's
        // transform management doesn't fight with our translate(-50%, -50%).
        return (
          <div
            key={`slot-${slotIndices[i]}`}
            className="ov-feed-slot"
            style={{
              left: `${(pos.x / W) * 100}%`,
              top: `${(pos.y / H) * 100}%`,
              transform: `translate(-50%, -50%) rotate(${pos.rot}deg)`,
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={slot.key}
                className="ov-feed-card"
                initial={{ opacity: 0, scale: 0.92, y: -6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 6 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                <FeedCard item={item} />
              </motion.div>
            </AnimatePresence>
          </div>
        )
      })}
    </>
  )
}

function FeedCard({ item }) {
  const { Icon, title, format } = item
  const color = FORMAT_COLORS[format] || '#00e5c8'
  return (
    <div className="ov-feed-card-inner">
      <span
        className="ov-feed-icon"
        style={{ background: `${color}1F`, color }}
      >
        <Icon strokeWidth={2} />
      </span>
      <span className="ov-feed-title">{title}</span>
      <span
        className="ov-feed-badge"
        style={{ background: `${color}26`, color, borderColor: `${color}66` }}
      >
        {format}
      </span>
    </div>
  )
}
