import { motion } from 'framer-motion'
import {
  Target, ShieldCheck, GitBranch, FileText, Folder, Database,
  User, Users, Lock, Download, HardDrive, Share2, ChevronDown,
  ArrowRight, Check, History, Eye,
} from 'lucide-react'
import XysqLogo from './XysqLogo'
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
    icon: GitBranch,
    label: 'Every answer can be checked',
    body: 'Anything an agent is told traces back to where it came from.',
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

/* builders: a scoped recall, served with sources; out-of-scope stays out */
function BuilderFig() {
  return (
    <div
      className="out-fig"
      role="img"
      aria-label="Your marketing, support, and sales agents ask the graph questions: it answers with a fact and its source; content an agent has no access to is not shown"
    >
      <div className="out-fig-req">
        <div className="out-fig-agents">
          <span className="out-fig-agent">Marketing agent</span>
          <span className="out-fig-agent">Support agent</span>
          <span className="out-fig-agent">Sales agent</span>
        </div>
        <span className="out-fig-call">"What's our refund policy?"</span>
      </div>
      <span className="out-fig-arrow" aria-hidden="true"><ChevronDown size={12} strokeWidth={2} /></span>
      <div className="out-fig-graph">
        <XysqLogo size={13} />
        <span>Context lake</span>
      </div>
      <span className="out-fig-arrow" aria-hidden="true"><ChevronDown size={12} strokeWidth={2} /></span>
      <div className="out-fig-rows">
        <span className="out-fig-served">
          <Check size={12} strokeWidth={2.2} />
          Refunds over $500 need manager approval.
          <em>source: refund policy</em>
        </span>
        <span className="out-fig-denied">
          <Lock size={12} strokeWidth={2} />
          eng roadmap · no access, not shown
        </span>
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

/* the lake: many distinct context graphs, one per part of your work */
const clusters = [
  {
    label: 'pricing',
    nodes: [{ x: 110, y: 56, c: true }, { x: 76, y: 32 }, { x: 144, y: 30 }, { x: 82, y: 84 }, { x: 140, y: 82 }],
  },
  {
    label: 'campaigns',
    hl: true,
    nodes: [{ x: 320, y: 52, c: true }, { x: 286, y: 28 }, { x: 354, y: 26 }, { x: 292, y: 80 }, { x: 350, y: 78 }],
  },
  {
    label: 'support',
    nodes: [{ x: 530, y: 56, c: true }, { x: 496, y: 32 }, { x: 564, y: 30 }, { x: 502, y: 84 }, { x: 560, y: 82 }],
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
        aria-label="Your context lake holds many separate context graphs: one for pricing, one for campaigns, one for support, each its own small graph of connected facts"
        preserveAspectRatio="xMidYMid meet"
      >
        {clusters.map((cl) => {
          const [center, ...rest] = cl.nodes
          return (
            <g key={cl.label}>
              {rest.map((n, i) => (
                <line
                  key={i}
                  x1={center.x} y1={center.y} x2={n.x} y2={n.y}
                  className="out-graph-edge"
                />
              ))}
              {cl.nodes.map((n, i) => (
                <circle
                  key={i}
                  cx={n.x} cy={n.y} r={n.c ? 7 : 5}
                  className={n.c && cl.hl ? 'out-graph-node out-graph-node--hl' : 'out-graph-node'}
                />
              ))}
              <text x={center.x} y={114} className="out-graph-label">{cl.label}</text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

export default function OutputsSection() {
  return (
    <section className="out-section" id="graph">
      <div className="out-inner">
        <motion.h2 className="out-headline" {...fade(0)}>
          One context lake, <em>many context graphs.</em>
        </motion.h2>

        <motion.p className="out-deck" {...fade(0.08)}>
          Everything you capture lands in your context lake. Inside it, a
          context graph for each part of your work: pricing, campaigns,
          support, projects. Agents and your team draw from the same lake.
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
            <a href="https://app.xysq.ai/teams" className="out-btn out-btn--alt">
              For teams <ArrowRight size={14} strokeWidth={2} />
            </a>
          </motion.div>
        </div>

        {/* the common floor: governance applies to every graph, both sides */}
        <motion.div className="out-gov" {...fade(0.25)}>
          <div className="out-gov-head">
            <ShieldCheck size={16} strokeWidth={1.8} aria-hidden="true" />
            <span>Governance, common to both</span>
          </div>
          <div className="out-gov-items">
            <div className="out-gov-item">
              <span className="out-gov-item-label"><Eye size={13} strokeWidth={1.8} aria-hidden="true" /> Transparent to your team</span>
              <span className="out-gov-item-text">Every context graph is visible and accessible to your team. No black boxes.</span>
            </div>
            <div className="out-gov-item">
              <span className="out-gov-item-label"><History size={13} strokeWidth={1.8} aria-hidden="true" /> Every change auditable</span>
              <span className="out-gov-item-text">Who changed what, when, based on what. Always answerable.</span>
            </div>
            <div className="out-gov-item">
              <span className="out-gov-item-label"><Lock size={13} strokeWidth={1.8} aria-hidden="true" /> Access you control</span>
              <span className="out-gov-item-text">Grant by graph, page, or person. Revoke anytime.</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
