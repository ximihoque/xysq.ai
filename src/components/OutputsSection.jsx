import { motion } from 'framer-motion'
import {
  Target, ShieldCheck, GitBranch, FileText, Database,
  User, Users, Download, HardDrive, Share2, ChevronDown,
  ArrowRight, Bot, PenLine,
} from 'lucide-react'
import '../styles/outputs-section.css'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay },
})

const builderRows = [
  {
    icon: Target,
    label: 'The right context, every time',
    body: 'Each agent gets exactly the context its task needs, nothing extra.',
  },
  {
    icon: ShieldCheck,
    label: 'Sees only what it should',
    body: 'Each agent has the access you gave it. Nothing more.',
  },
  {
    icon: PenLine,
    label: 'Agents write back what they learn',
    body: 'An agent writes to its own graph, and the next agent that needs it can read it, if you let it.',
  },
]

const teamRows = [
  {
    icon: Share2,
    label: 'Share exactly what you choose',
    body: 'One page, one graph, or everything. With one person or the whole team. Take it back anytime.',
  },
  {
    icon: Users,
    label: 'Context stays when people leave',
    body: 'Team knowledge belongs to the team. New members get it on day one.',
  },
  {
    icon: Download,
    label: 'Export anytime',
    body: 'Your data is yours, all of it, whenever. Your own drive support is rolling out.',
  },
]

/* builders: agents collaborate across graphs. Read from one or many,
   write to their own — same chip-stack language as the teams figure. */
function BuilderFig() {
  return (
    <div
      className="out-fig"
      role="img"
      aria-label="Agents collaborate across context graphs: a sales agent reads from the pricing, product, and support graphs and writes what it learns to its own sales graph"
    >
      <div className="out-fig-chips">
        <span><GitBranch size={11} strokeWidth={1.8} /> Pricing graph</span>
        <span><GitBranch size={11} strokeWidth={1.8} /> Product graph</span>
        <span><GitBranch size={11} strokeWidth={1.8} /> Support graph</span>
      </div>
      <span className="out-fig-arrow out-fig-arrow--label" aria-hidden="true">
        <ChevronDown size={12} strokeWidth={2} /> reads · from one or many
      </span>
      <div className="out-fig-chips">
        <span><Bot size={11} strokeWidth={1.8} /> Sales agent</span>
      </div>
      <span className="out-fig-arrow out-fig-arrow--label" aria-hidden="true">
        <ChevronDown size={12} strokeWidth={2} /> writes · to its own
      </span>
      <div className="out-fig-chips">
        <span className="out-fig-chip--own"><GitBranch size={11} strokeWidth={1.8} /> Sales graph</span>
      </div>
    </div>
  )
}

/* teams: share targets -> controls -> recipients, plus the ownership strip */
function TeamFig() {
  return (
    <div
      className="out-fig"
      role="img"
      aria-label="Share a page, a graph, or everything with a person or the whole team, read-only or editable, revocable; export anytime, bring-your-own-drive rolling out"
    >
      <div className="out-fig-chips">
        <span><FileText size={11} strokeWidth={1.8} /> A page</span>
        <span><GitBranch size={11} strokeWidth={1.8} /> A graph</span>
        <span><Database size={11} strokeWidth={1.8} /> Everything</span>
      </div>
      <span className="out-fig-arrow out-fig-arrow--label" aria-hidden="true">
        <ChevronDown size={12} strokeWidth={2} /> share · read-only or editable · revoke anytime
      </span>
      <div className="out-fig-chips">
        <span><User size={11} strokeWidth={1.8} /> One person</span>
        <span><Users size={11} strokeWidth={1.8} /> Whole team</span>
      </div>
      <div className="out-fig-own">
        <span><Download size={11} strokeWidth={1.8} /> export anytime</span>
        <span><HardDrive size={11} strokeWidth={1.8} /> your own drive · rolling out</span>
      </div>
    </div>
  )
}

/* the lake: many distinct context graphs, one per part of your work.
   each cluster gets its own shape (tree / dense mesh / chain) so they
   read as different graphs, not copies */
const clusters = [
  {
    label: 'Personal',
    labelX: 112,
    nodes: [{ x: 104, y: 30, c: true }, { x: 62, y: 58 }, { x: 142, y: 54 }, { x: 172, y: 28 }, { x: 80, y: 90 }, { x: 130, y: 88 }],
    edges: [[0, 1], [0, 2], [2, 3], [1, 4], [2, 5]],
  },
  {
    label: 'Teams',
    labelX: 322,
    nodes: [{ x: 322, y: 54, c: true }, { x: 286, y: 30 }, { x: 358, y: 28 }, { x: 270, y: 74 }, { x: 372, y: 70 }, { x: 324, y: 94 }],
    edges: [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [1, 2], [3, 5], [4, 5]],
  },
  {
    label: 'Agents',
    labelX: 532,
    nodes: [{ x: 482, y: 40 }, { x: 522, y: 70, c: true }, { x: 558, y: 32 }, { x: 592, y: 62 }, { x: 534, y: 96 }],
    edges: [[0, 1], [1, 2], [2, 3], [1, 4]],
  },
]

function LakeStrip() {
  return (
    <div className="out-lake">
      <span className="out-lake-label">Your context lake</span>
      <svg
        viewBox="0 0 640 124"
        className="out-graph"
        role="img"
        aria-label="Your context lake holds many separate context graphs: personal graphs, team graphs, and agent graphs, each its own small graph of connected facts"
        preserveAspectRatio="xMidYMid meet"
      >
        {clusters.map((cl) => (
          <g key={cl.label}>
            {cl.edges.map(([a, b], i) => (
              <line
                key={i}
                x1={cl.nodes[a].x} y1={cl.nodes[a].y}
                x2={cl.nodes[b].x} y2={cl.nodes[b].y}
                className="out-graph-edge"
              />
            ))}
            {cl.nodes.map((n, i) => (
              <circle
                key={i}
                cx={n.x} cy={n.y} r={n.c ? 7 : 5}
                className={n.c ? 'out-graph-node out-graph-node--hl' : 'out-graph-node'}
              />
            ))}
            <text x={cl.labelX} y={114} className="out-graph-label">{cl.label}</text>
          </g>
        ))}
      </svg>
    </div>
  )
}

export default function OutputsSection() {
  return (
    <section className="out-section" id="graph">
      <div className="out-inner">
        <motion.h2 className="out-headline" {...fade(0)}>
          One <span className="out-hl-lake">context lake</span>,{' '}
          <em>many <span className="out-hl-graphs">context graphs</span>.</em>
        </motion.h2>

        <motion.p className="out-deck" {...fade(0.08)}>
          Everything you capture lands in your context lake. Inside it,
          separate context graphs: yours, your teams', your agents'.
          Everyone draws from the same lake.
        </motion.p>

        <motion.div className="out-graph-wrap" {...fade(0.12)}>
          <LakeStrip />
        </motion.div>

        <div className="out-halves">
          <motion.div className="out-half" {...fade(0.15)}>
            <h3 className="out-half-title">Context for your agents</h3>
            <BuilderFig />
            <ul className="out-list">
              {builderRows.map(({ icon: Icon, label, body }) => (
                <li key={label} className="out-item">
                  <span className="out-item-icon" aria-hidden="true">
                    <Icon size={14} strokeWidth={1.8} />
                  </span>
                  <span className="out-item-body">
                    <span className="out-item-label">{label}</span>
                    <span className="out-item-text">{body}</span>
                  </span>
                </li>
              ))}
            </ul>
            <a href="https://docs.xysq.ai" className="out-btn out-btn--main" target="_blank" rel="noopener noreferrer">
              For AI builders <ArrowRight size={14} strokeWidth={2} />
            </a>
          </motion.div>

          <motion.div className="out-half" {...fade(0.22)}>
            <h3 className="out-half-title">Knowledge for your team</h3>
            <TeamFig />
            <ul className="out-list">
              {teamRows.map(({ icon: Icon, label, body }) => (
                <li key={label} className="out-item">
                  <span className="out-item-icon" aria-hidden="true">
                    <Icon size={14} strokeWidth={1.8} />
                  </span>
                  <span className="out-item-body">
                    <span className="out-item-label">{label}</span>
                    <span className="out-item-text">{body}</span>
                  </span>
                </li>
              ))}
            </ul>
            <a href="https://app.xysq.ai/teams?src=outputs-teams" className="out-btn out-btn--alt">
              For teams <ArrowRight size={14} strokeWidth={2} />
            </a>
          </motion.div>
        </div>

      </div>
    </section>
  )
}
