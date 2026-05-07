import { motion } from 'framer-motion'
import LogoMarquee from './LogoMarquee'
import '../styles/hero.css'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay },
})

const tap = { type: 'spring', stiffness: 400, damping: 25 }

export default function Hero() {
  return (
    <section id="hero">
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-grid" />
        <div className="hero-spot" />
      </div>

      <div className="hero-inner">
        <motion.a
          {...fade(0)}
          href="https://docs.xysq.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="hero-eyebrow"
        >
          <span className="hero-eyebrow-dot" />
          <span>MEMORY INFRASTRUCTURE FOR AI</span>
          <span className="hero-eyebrow-arrow">→</span>
        </motion.a>

        <motion.h1 {...fade(0.05)} className="hero-h1">
          Unified Memory for<br />you and your AI.
        </motion.h1>

        <motion.p {...fade(0.15)} className="hero-sub">
          One memory across every app and agent you use. Captured automatically,
          synthesised continuously, shared on your terms.
        </motion.p>

        <motion.div {...fade(0.25)} className="hero-btns">
          <motion.a
            href="https://app.xysq.ai"
            className="btn-main"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            transition={tap}
          >
            Get started free
            <span className="btn-main-arrow">→</span>
          </motion.a>
          <motion.a
            href="#memory-diagram"
            className="btn-out"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            transition={tap}
          >
            See how it works
            <span className="btn-out-arrow">↓</span>
          </motion.a>
        </motion.div>

        <motion.div {...fade(0.4)} className="hero-marquee-slot">
          <LogoMarquee />
        </motion.div>
      </div>
    </section>
  )
}
