import { motion } from 'framer-motion'
import { Brain, ChevronDown } from 'lucide-react'
import XysqLogo from './XysqLogo'
import HeroStage from './HeroStage'
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

      <div className="hero-inner hero-inner--stacked">
        {/* ── LEFT: copy ── */}
        <div className="hero-copy">
          <motion.div {...fade(0)} className="hero-mark" aria-hidden="true">
            <XysqLogo size={56} />
          </motion.div>

          <motion.h1 {...fade(0.05)} className="hero-h1">
            <span className="hero-h1-lychee">Context Layer</span>
            <br />
            <span className="hero-h1-dim">your </span>
            <span className="hero-h1-strong">AI agents</span>
            <span className="hero-h1-dim"> and </span>
            <span className="hero-h1-strong">teams</span>
            <br />
            <span className="hero-accent">can trust.</span>
          </motion.h1>

          <motion.p {...fade(0.15)} className="hero-sub">
            <Brain size={17} strokeWidth={1.8} className="hero-sub-ico" aria-hidden="true" />
            Self-improving memory engine that adapts to your domain.
          </motion.p>

          <motion.div {...fade(0.25)} className="hero-btns">
            <motion.a
              href="https://app.xysq.ai?src=hero"
              className="btn-main"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              transition={tap}
            >
              Get started
              <span className="btn-main-arrow">→</span>
            </motion.a>
            <motion.a
              href="https://calendly.com/hoque-ximi/30min"
              className="btn-out"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              transition={tap}
            >
              Book a call
              <span className="btn-out-arrow">→</span>
            </motion.a>
          </motion.div>

          <motion.a {...fade(0.35)} href="#demo" className="hero-jump">
            See it in action
            <ChevronDown size={15} strokeWidth={2} />
          </motion.a>
        </div>

      </div>

      {/* the illustrative interface. walks the journey once, then hands over. */}
      <motion.div {...fade(0.3)} id="demo" className="hero-stage-wrap">
        <HeroStage />
      </motion.div>
    </section>
  )
}
