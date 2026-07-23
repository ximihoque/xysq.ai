import { motion } from 'framer-motion'
import { RefreshCw, Crosshair, Layers } from 'lucide-react'
import CorrectionFigure from './CorrectionFigure'
import '../styles/engine-section.css'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay },
})

const rows = [
  {
    icon: RefreshCw,
    label: 'Self-improving loops',
    body: 'One correction improves every future retrieval.',
  },
  {
    icon: Crosshair,
    label: 'Domain-adaptive',
    body: 'Learns your domain instead of generic internet knowledge.',
  },
  {
    icon: Layers,
    label: 'Dual-layer learning',
    body: 'Every correction updates both knowledge structure and retrieval.',
  },
]

export default function EngineSection() {
  return (
    <section className="eng-section" id="engine">
      <div className="eng-inner">
        <motion.div className="eng-text" {...fade(0)}>
          <h2 className="eng-headline">
            Memory that <span className="eng-hl-improves">improves</span> on command,<br />
            <em>not by <span className="eng-hl-accident">accident</span>.</em>
          </h2>

          <p className="eng-deck">
            Most memory stacks accumulate feedback and hope retrieval gets
            better later. The xysq Memory Engine applies a targeted
            correction the moment you give it, and you see the improvement
            on the very next query.
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

        {/* the correction walked end to end — same figure as the whitepaper */}
        <motion.div className="eng-visual" {...fade(0.15)}>
          <CorrectionFigure />
        </motion.div>
      </div>
    </section>
  )
}
