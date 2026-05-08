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
    verb: 'Capture',
    body: 'Automatically pulls context from Slack, Gmail, Notion, Drive, Calendar — and your AI sessions across Claude, Cursor, ChatGPT.',
  },
  {
    verb: 'Surface',
    body: 'Your AI tools and agents gets the right context, the moment it needs it. No re-introduction, no copy-paste, no “as we discussed earlier.”',
  },
  {
    verb: 'Synthesise',
    body: 'Patterns over time. Forgets the clutter, keeps the signal — your memory gets sharper the longer you use it.',
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
            Capture, surface, synthesise<br />
            <em>across every tool.</em>
          </h2>

          <p className="cap-deck">
            One memory layer between your apps and your AI. Watch context move
            in real time — the same way it will the moment you connect.
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
