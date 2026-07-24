import { motion } from 'framer-motion'
import {
  Target, ShieldCheck, GitBranch, FileText, Folder, Database,
  User, Users, Lock, Download, HardDrive, Share2, ChevronDown,
  ArrowRight, Check,
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
    body: 'One page, a folder, or everything. With one person or the whole team. Take it back anytime.',
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
        <span>Context graph</span>
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
      aria-label="Share a page, folder, or vault with a person or the whole team, read-only or editable, revocable; export anytime, bring-your-own-drive rolling out"
    >
      <div className="out-fig-chips">
        <span><FileText size={11} strokeWidth={1.8} /> Page</span>
        <span><Folder size={11} strokeWidth={1.8} /> Folder</span>
        <span><Database size={11} strokeWidth={1.8} /> Vault</span>
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

/* the graph itself: facts and decisions across marketing, support, sales */
const graphNodes = [
  { x: 60, y: 74 }, { x: 158, y: 38, label: 'pricing decision' },
  { x: 258, y: 86 }, { x: 330, y: 30, label: 'campaign brief', hl: true },
  { x: 420, y: 82 }, { x: 496, y: 40, label: 'refund policy' },
  { x: 588, y: 70 },
]
const graphEdges = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [1, 3], [3, 5], [2, 4]]

function GraphStrip() {
  return (
    <svg
      viewBox="0 0 640 120"
      className="out-graph"
      role="img"
      aria-label="A context graph: connected facts and decisions, from pricing decisions to campaign briefs to refund policies"
      preserveAspectRatio="xMidYMid meet"
    >
      {graphEdges.map(([a, b], i) => (
        <line
          key={i}
          x1={graphNodes[a].x} y1={graphNodes[a].y}
          x2={graphNodes[b].x} y2={graphNodes[b].y}
          className="out-graph-edge"
        />
      ))}
      {graphNodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r={n.label ? 7 : 5} className={n.hl ? 'out-graph-node out-graph-node--hl' : 'out-graph-node'} />
          {n.label && (
            <text x={n.x} y={n.y - 14} className="out-graph-label">{n.label}</text>
          )}
        </g>
      ))}
    </svg>
  )
}

export default function OutputsSection() {
  return (
    <section className="out-section" id="graph">
      <div className="out-inner">
        <motion.h2 className="out-headline" {...fade(0)}>
          It all becomes <em>one context graph.</em>
        </motion.h2>

        <motion.p className="out-deck" {...fade(0.08)}>
          Not a pile of chat logs. Facts, decisions, and entities, connected
          and kept current as you work. Agents and your team read from the
          same graph, with the same permissions.
        </motion.p>

        <motion.div className="out-graph-wrap" {...fade(0.12)}>
          <GraphStrip />
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
      </div>
    </section>
  )
}
