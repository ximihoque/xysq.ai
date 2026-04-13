import { motion } from 'framer-motion'
import '../styles/pattern-recognition.css'

const panels = [
  {
    tag: 'Synthesis',
    icon: '◈',
    headline: 'Not a dump. A distillation.',
    body: 'Every interaction is processed, not just stored. xysq pulls signal from noise — distilling what actually matters about how you think, decide, and work.',
    example: {
      label: 'xysq · captured',
      text: 'Priya prefers async patterns over synchronous calls when latency is a risk. Reached for this independently across 3 incidents.',
    },
    cls: 'pr-panel--synthesis',
    delay: 0.1,
  },
  {
    tag: 'Reasoning',
    icon: '◎',
    headline: 'Context that thinks ahead.',
    body: 'The knowledge base doesn\'t wait to be asked. It surfaces what\'s relevant — before you repeat yourself, before the agent asks the wrong question.',
    example: {
      label: 'xysq · surfaced',
      text: 'Injecting: previous decision on Redis namespace isolation. Relevant to current impl — skipping re-introduction.',
    },
    cls: 'pr-panel--reasoning',
    delay: 0.22,
  },
  {
    tag: 'Personalisation',
    icon: '◉',
    headline: 'Built around you. Not just about you.',
    body: 'Your knowledge base evolves with how you actually work — not just what you\'ve said. The more you use it, the more precisely it serves you.',
    example: {
      label: 'xysq · synthesized',
      text: 'Pattern: tends to scope tightly when under time pressure. Broaden suggestions only after constraints are surfaced.',
    },
    cls: 'pr-panel--personalisation',
    delay: 0.34,
  },
]

export default function PatternRecognition() {
  return (
    <section className="sect" id="pattern-recognition" style={{ background: 'var(--bg2)' }}>
      <div className="sect-inner">
        <motion.div
          className="pr-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <span className="stag">Knowledge Base</span>
          <h2>Memory that <em>understands</em> you.</h2>
          <p className="pr-sub">Not a log of what happened. A living picture of how you think — ready for any agent, any tool, any moment.</p>
        </motion.div>

        <div className="pr-panels">
          {panels.map((panel, i) => (
            <motion.div
              key={panel.tag}
              className={`pr-panel ${panel.cls}`}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, ease: 'easeOut', delay: panel.delay }}
            >
              <div className="pr-panel-top">
                <span className="pr-icon">{panel.icon}</span>
                <span className="pr-tag">{panel.tag}</span>
              </div>
              <p className="pr-panel-headline">{panel.headline}</p>
              <p className="pr-panel-body">{panel.body}</p>

              {/* Live example chip */}
              <div className="pr-example" style={{ borderColor: panel.border }}>
                <span className="pr-example-label">{panel.example.label}</span>
                <p className="pr-example-text">{panel.example.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
