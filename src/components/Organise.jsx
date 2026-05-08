import { motion } from 'framer-motion'
import OrganiseVisual from './OrganiseVisual'
import '../styles/organise.css'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay },
})

const points = [
  {
    headline: 'Drop in anything',
    body: 'PDFs, transcripts, screenshots, links, code — xysq indexes the lot.',
  },
  {
    headline: 'Auto-tagged & connected',
    body: 'Every file is parsed, tagged, and linked to related memories you’ve already captured.',
  },
  {
    headline: 'Queryable from any agent',
    body: 'Ask Claude, Cursor, ChatGPT — they all reach into the same library.',
  },
]

export default function Organise() {
  return (
    <section className="og-section" id="organise">
      <div className="og-inner">
        {/* Text on the LEFT */}
        <motion.div className="og-text" {...fade(0)}>
          <span className="og-eyebrow">
            <span className="og-eyebrow-dot" />
            ORGANISE
          </span>

          <h2 className="og-headline">
            Every document.<br />
            <em>One searchable mind.</em>
          </h2>

          <p className="og-deck">
            Stop hunting through Drive folders, Slack threads, and email
            attachments. Drop your files into xysq and they become part of the
            same memory your agents already use.
          </p>

          <ul className="og-list">
            {points.map((p, i) => (
              <motion.li
                key={p.headline}
                className="og-item"
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.55, ease: 'easeOut', delay: 0.15 + i * 0.08 }}
              >
                <span className="og-bullet" aria-hidden="true" />
                <span className="og-item-body">
                  <span className="og-item-headline">{p.headline}</span>
                  <span className="og-item-text">{p.body}</span>
                </span>
              </motion.li>
            ))}
          </ul>

          <motion.a
            href="https://docs.xysq.ai/features/organise"
            target="_blank"
            rel="noopener noreferrer"
            className="og-cta"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, ease: 'easeOut', delay: 0.55 }}
            whileHover={{ x: 2 }}
          >
            Organise your knowledge
            <span className="og-cta-arrow">→</span>
          </motion.a>
        </motion.div>

        {/* Visual on the RIGHT — flipped from Teams so the page alternates */}
        <motion.div className="og-visual" {...fade(0.15)}>
          <OrganiseVisual />
        </motion.div>
      </div>
    </section>
  )
}
