import { motion } from 'framer-motion'
import MemoryDiagram from './MemoryDiagram'
import '../styles/capabilities.css'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay },
})

const capabilities = [
  {
    verb: 'Episodic',
    body: 'What happened. The decisions, threads, and sessions your team works through, kept in context.',
  },
  {
    verb: 'Procedural',
    body: 'How your team works. The standards, patterns, and ways of doing things, learned from how you operate.',
  },
  {
    verb: 'Semantic',
    body: 'What things mean. The shared vocabulary and concepts your team and its agents reason over.',
  },
]

export default function Capabilities() {
  return (
    <section className="cap-section" id="memory">
      <div className="cap-inner">
        <motion.div className="cap-text" {...fade(0)}>
          <span className="cap-eyebrow">
            <span className="cap-eyebrow-dot" />
            MEMORY
          </span>

          <h2 className="cap-headline">
            The working context of your team,<br />
            <em>stored as one memory.</em>
          </h2>

          <p className="cap-deck">
            We capture from the connectors your team already uses, build a living
            knowledge graph, and provide the right context the moment your AI
            tool or agent needs it.
          </p>

          <ul className="cap-list">
            {capabilities.map((cap, i) => (
              <motion.li
                key={cap.verb}
                className="cap-item"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.55, ease: 'easeOut', delay: 0.15 + i * 0.08 }}
              >
                <span className="cap-check" aria-hidden="true">
                  <svg viewBox="0 0 14 14" fill="none">
                    <path
                      d="M3 7.5l2.5 2.5L11 4.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="cap-item-body">
                  <span className="cap-verb">{cap.verb}</span>
                  <span className="cap-sep">—</span>
                  <span className="cap-body">{cap.body}</span>
                </span>
              </motion.li>
            ))}
          </ul>

          <motion.a
            href="/features/memory"
            className="cap-cta"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, ease: 'easeOut', delay: 0.55 }}
            whileHover={{ x: 2 }}
          >
            Explore Memory
            <span className="cap-cta-arrow">→</span>
          </motion.a>
        </motion.div>

        <motion.div className="cap-visual" {...fade(0.15)}>
          <MemoryDiagram />
        </motion.div>
      </div>
    </section>
  )
}
