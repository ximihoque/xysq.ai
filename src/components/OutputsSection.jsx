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
    label: 'Scoped recall',
    body: 'Agents pull the context they need over MCP or the SDK, in one call.',
  },
  {
    icon: ShieldCheck,
    label: 'Permissions enforced at retrieval',
    body: 'An agent only sees what its scope allows.',
  },
  {
    icon: GitBranch,
    label: 'Traceable answers',
    body: 'Every piece of served context links back to its source.',
  },
]

const teamRows = [
  {
    icon: Share2,
    label: 'Granular sharing',
    body: 'Share one page, a folder, or a whole vault with a person or the team. Revoke anytime.',
  },
  {
    icon: Users,
    label: 'Context stays when people leave',
    body: 'Team knowledge belongs to the team. New members get it on day one.',
  },
  {
    icon: Download,
    label: 'Export anytime',
    body: 'Your data is yours. Bring-your-own-drive is rolling out.',
  },
]

/* builders: a scoped recall, served with sources; out-of-scope stays out */
function BuilderFig() {
  return (
    <div
      className="out-fig"
      role="img"
      aria-label="A support agent recalls context scoped to its vault: the graph serves a fact with its source; a page outside the agent's scope is not served"
    >
      <div className="out-fig-req">
        <span className="out-fig-agent">Support agent</span>
        <span className="out-fig-call">recall · scope: support</span>
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
          eng roadmap · outside scope, not served
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

export default function OutputsSection() {
  return (
    <section className="out-section" id="outputs">
      <div className="out-inner">
        <motion.h2 className="out-headline" {...fade(0)}>
          One graph, <em>two outputs.</em>
        </motion.h2>

        <motion.p className="out-deck" {...fade(0.08)}>
          Agents and your team read from the same graph. Same facts, same
          permissions.
        </motion.p>

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
