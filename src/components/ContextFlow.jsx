import { motion } from 'framer-motion'
import '../styles/context-flow.css'

/*
  Story: Production is degrading. You diagnose with ChatGPT,
  architect the fix with Claude, implement in Cursor —
  and four downstream agents already know everything xysq captured.
*/

const moments = [
  {
    id: 'chatgpt',
    side: 'left',
    time: '8:47 AM',
    tool: 'ChatGPT',
    toolColor: null,
    logo: '/logos/chatgpt.svg',
    whiteLogo: true,
    messages: [
      { from: 'user', text: "p99 spiked to 4.2s. Nothing deployed. What's happening?" },
      { from: 'ai',   text: "Your OpenAI embedding calls went from 80ms to 340ms overnight — they're synchronous in your hot path. Move them async and serve cached embeddings." },
    ],
    xysq: {
      action: 'captured',
      note: 'Root cause: sync embedding calls degrading p99. Fix direction: async queue + cached fallback.',
      tags: ['incident', 'decision'],
    },
  },
  {
    id: 'claude',
    side: 'right',
    time: '9:31 AM',
    tool: 'Claude',
    toolColor: '#D97757',
    logo: '/logos/claude.svg',
    messages: [
      { from: 'user', text: "Design the async queue. Worried about stale embeddings." },
      { from: 'ai',   text: "Already have the incident. Three-tier fallback: live → cache (6h TTL) → weekly. Circuit breaker at 500ms — your SLA covers the window." },
    ],
    xysqEvents: [
      {
        action: 'surfaced',
        note: 'Injected incident context. No re-introduction needed.',
        tags: ['incident', 'architecture'],
      },
      {
        action: 'captured',
        note: 'Three-tier fallback pattern decided. Circuit breaker at 500ms.',
        tags: ['decision', 'pattern'],
      },
    ],
  },
  {
    id: 'cursor',
    side: 'left',
    time: '10:14 AM',
    tool: 'Cursor',
    toolColor: null,
    logo: '/logos/cursor.svg',
    whiteLogo: true,
    messages: [
      { from: 'user', text: "Build it." },
      { from: 'ai',   text: "On it — live → cache → weekly fallback, circuit breaker wired. Adding /internal/embedding-health so your agents can monitor state." },
    ],
    xysqEvents: [
      {
        action: 'synthesized',
        note: 'You reach for circuit breakers under external dep pressure. Noted for future suggestions.',
        tags: ['pattern', 'synthesize'],
      },
      {
        action: 'captured',
        note: 'EmbeddingService shipped. Health endpoint live.',
        tags: ['coding', 'decision'],
      },
    ],
  },
  {
    id: 'agents',
    side: 'right',
    time: '10:28 AM',
    tool: 'Knowledge Base Updated',
    toolColor: '#00e5c8',
    logo: '/logos/agent.svg',
    type: 'multi-agent',
    messages: [
      { from: 'ai', text: "4 agents already know what happened — and what to do next." },
    ],
    xysq: {
      action: 'synthesized',
      note: 'Full incident arc captured. Pattern propagated to downstream agents.',
      tags: ['synthesize', 'pattern'],
    },
    downstreamAgents: [
      {
        name: 'Monitoring Agent',
        logo: '/logos/agent.svg',
        update: 'Watching /embedding-health. Alerts wired.',
      },
      {
        name: 'Docs Agent',
        logo: '/logos/agent.svg',
        update: 'Runbook drafted: 3-tier fallback pattern.',
      },
      {
        name: 'Standup Bot',
        logo: '/logos/agent.svg',
        update: 'Tomorrow\'s standup: incident closed, fix live at 10:14.',
      },
      {
        name: 'Claude (next session)',
        logo: '/logos/claude.svg',
        update: 'Context loaded. Picks up exactly where you left off.',
      },
    ],
  },
]

const tagColors = {
  incident:     'rgba(245, 100, 80, 0.13)',
  decision:     'rgba(0, 229, 200, 0.1)',
  architecture: 'rgba(130, 170, 255, 0.12)',
  pattern:      'rgba(180, 100, 220, 0.12)',
  coding:       'rgba(100, 200, 130, 0.1)',
  synthesize:   'rgba(245, 166, 35, 0.12)',
}

const actionLabel = {
  captured:    '◈ captured',
  surfaced:    '◉ surfaced',
  synthesized: '◎ synthesized',
}

function XysqSingle({ data, delay = 0.2 }) {
  return (
    <motion.div
      className="cf-xysq"
      style={{ width: '100%' }}
      initial={{ opacity: 0, scale: 0.93 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: 'easeOut', delay }}
    >
      <div className="cf-xysq-header">
        <span className="cf-xysq-logo">xysq</span>
        <span className={`cf-xysq-action cf-xysq-action--${data.action}`}>
          {actionLabel[data.action]}
        </span>
      </div>
      <p className="cf-xysq-note">{data.note}</p>
      <div className="cf-xysq-tags">
        {data.tags.map(tag => (
          <span key={tag} className="cf-xysq-tag" style={{ background: tagColors[tag] || 'rgba(0,229,200,0.07)' }}>
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

function XysqEvent({ moment }) {
  const events = moment.xysqEvents || [moment.xysq]
  return (
    <div className="cf-xysq-stack">
      {events.map((data, i) => (
        <XysqSingle key={i} data={data} delay={0.2 + i * 0.15} />
      ))}
    </div>
  )
}

function MultiAgentPanel({ agents }) {
  return (
    <motion.div
      className="cf-multi-agent"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="cf-ma-header">
        <span className="cf-ma-label">Knowledge Base</span>
        <span className="cf-ma-live">
          <span className="cf-ma-pulse" />
          live
        </span>
      </div>

      <div className="cf-ma-agents">
        {agents.map((agent, i) => (
          <motion.div
            key={agent.name}
            className="cf-ma-agent"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: 0.45, ease: 'easeOut', delay: i * 0.1 + 0.3 }}
          >
            <div className="cf-ma-agent-top">
              <img src={agent.logo} alt={agent.name} className="cf-ma-logo" width="24" height="24" loading="lazy" />
              <span className="cf-ma-name">{agent.name}</span>
              <span className="cf-ma-dot" />
            </div>
            <p className="cf-ma-update">{agent.update}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function ChatCard({ moment, index }) {
  const isLeft = moment.side === 'left'
  const isMultiAgent = moment.type === 'multi-agent'

  return (
    <div className={`cf-moment cf-moment--${moment.side}`}>
      {/* Spine dot */}
      <motion.div
        className="cf-spine-dot"
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.4, ease: 'backOut', delay: index * 0.08 }}
      >
        <div className="cf-spine-dot-ring" />
        <div className="cf-spine-dot-core" />
      </motion.div>

      {/* Main content — either chat card or multi-agent panel */}
      {isMultiAgent ? (
        <motion.div
          className="cf-card cf-card--event"
          initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.08 }}
        >
          <div className="cf-card-header">
            <div className="cf-card-tool">
              <img src={moment.logo} alt={moment.tool} className={`cf-tool-logo${moment.whiteLogo ? ' cf-tool-logo--white' : ''}`} width="24" height="24" loading="lazy" />
              <span className="cf-tool-name" style={moment.toolColor ? { color: moment.toolColor } : undefined}>{moment.tool}</span>
            </div>
            <span className="cf-time">{moment.time}</span>
          </div>
          <div className="cf-messages">
            {moment.messages.map((msg, i) => (
              <div key={i} className={`cf-bubble cf-bubble--${msg.from}`}>{msg.text}</div>
            ))}
          </div>
          <MultiAgentPanel agents={moment.downstreamAgents} />
        </motion.div>
      ) : (
        <motion.div
          className="cf-card"
          initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.08 }}
        >
          <div className="cf-card-header">
            <div className="cf-card-tool">
              <img src={moment.logo} alt={moment.tool} className={`cf-tool-logo${moment.whiteLogo ? ' cf-tool-logo--white' : ''}`} width="24" height="24" loading="lazy" />
              <span className="cf-tool-name" style={moment.toolColor ? { color: moment.toolColor } : undefined}>{moment.tool}</span>
            </div>
            <span className="cf-time">{moment.time}</span>
          </div>
          <div className="cf-messages">
            {moment.messages.map((msg, i) => (
              <motion.div
                key={i}
                className={`cf-bubble cf-bubble--${msg.from}`}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.35, ease: 'easeOut', delay: index * 0.08 + i * 0.08 + 0.15 }}
              >
                {msg.text}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* xysq memory event */}
      <XysqEvent moment={moment} />
    </div>
  )
}

export default function ContextFlow() {
  return (
    <div className="cf-wrap">
      <motion.div
        className="cf-section"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <span className="stag">Your Morning</span>
        <h2>Wherever you work, <em>it's already there.</em></h2>
        <p>You move between tools all day. xysq moves with you — carrying everything you know, everywhere you go.</p>
      </motion.div>

      <div className="cf-track">
        <div className="cf-spine-wrap">
          <motion.div
            className="cf-spine"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.6, ease: 'easeOut' }}
          />
        </div>

        {moments.map((moment, i) => (
          <ChatCard key={moment.id} moment={moment} index={i} />
        ))}
      </div>
    </div>
  )
}
