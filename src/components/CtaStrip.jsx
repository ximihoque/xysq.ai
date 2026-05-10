import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import '../styles/cta-strip.css'

const colVariants = {
  hidden: { opacity: 0, y: 24 },
  show: (delay) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut', delay },
  }),
}

export default function CtaStrip() {
  return (
    <section className="sect cs-sect" id="cta-strip">
      <div className="sect-inner">
        <div className="cs-grid">
          {/* Left column */}
          <motion.div
            className="cs-col"
            custom={0}
            variants={colVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
          >
            <p className="cs-headline">Start remembering.</p>
            <p className="cs-sub">Free to get started. Connect in minutes.</p>
            <motion.a
              href="https://app.xysq.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="cs-btn-primary"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              Get started free
            </motion.a>
          </motion.div>

          {/* Vertical divider */}
          <div className="cs-divider" />

          {/* Right column */}
          <motion.div
            className="cs-col"
            custom={0.1}
            variants={colVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
          >
            <p className="cs-headline">Upgrade your AI stack.</p>
            <p className="cs-sub">For teams and businesses building on AI.</p>
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              style={{ display: 'inline-block' }}
            >
              <Link to="/contact" className="cs-btn-secondary">
                Talk to us →
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
