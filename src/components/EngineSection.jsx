import { motion } from 'framer-motion'
import { RefreshCw, GitBranch, Layers } from 'lucide-react'
import CorrectionFigure from './CorrectionFigure'
import '../styles/engine-section.css'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay },
})

/* the closer names the three words the rest of the page has been earning.
   they appear here and nowhere else, next to the figure that proves them.
   one line each: the figure is the argument, the words are the labels. */
const rows = [
  {
    icon: GitBranch,
    label: 'Provable',
    body: 'Every fact traces back to the source it came from.',
  },
  {
    icon: Layers,
    label: 'Reconciled',
    body: 'Two facts disagree, the old one closes. You never serve both.',
  },
  {
    icon: RefreshCw,
    label: 'Self-improving',
    body: 'Every correction is one more thing the next answer gets right.',
  },
]

export default function EngineSection() {
  return (
    <section className="eng-section eng-section--closer" id="engine">
      <div className="eng-inner">
        {/* the correction walked end to end — same figure as the whitepaper */}
        <motion.div className="eng-visual" {...fade(0.15)}>
          <CorrectionFigure />
        </motion.div>

        <motion.div className="eng-text" {...fade(0)}>
          <h2 className="eng-headline">
            Memory that <span className="eng-hl-improves">improves</span><br />
            on command,<br />
            <em>not by <span className="eng-hl-accident">accident</span>.</em>
          </h2>

          <p className="eng-deck">
            Most memory stacks store a correction and hope retrieval sorts it
            out later. The xysq Memory Engine applies it as an edit with a
            blast radius, and you see it on the next query.
          </p>

          <ul className="eng-list">
            {rows.map(({ icon: Icon, label, body }, i) => (
              <motion.li
                key={label}
                className="eng-item"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.55, ease: 'easeOut', delay: 0.15 + i * 0.08 }}
              >
                <span className="eng-item-icon" aria-hidden="true">
                  <Icon size={15} strokeWidth={1.8} />
                </span>
                <span className="eng-item-body">
                  <span className="eng-item-label">{label}</span>
                  <span className="eng-item-text">{body}</span>
                </span>
              </motion.li>
            ))}
          </ul>

          <motion.a
            href="/whitepaper"
            className="eng-cta"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, ease: 'easeOut', delay: 0.5 }}
            whileHover={{ x: 2 }}
          >
            Read the whitepaper
            <span className="eng-cta-arrow">→</span>
          </motion.a>
        </motion.div>

      </div>
    </section>
  )
}
