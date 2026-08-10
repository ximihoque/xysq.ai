import { motion } from 'framer-motion'
import { Brain, GitBranch, ShieldCheck } from 'lucide-react'
import HeroShowcase from './HeroShowcase'
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
        {/* ── LEFT: copy ── */}
        <div className="hero-copy">
          <motion.h1 {...fade(0.05)} className="hero-h1">
            The <span className="hero-accent">trust layer</span>
            <br />
            <span className="hero-h1-dim">your AI acts on.</span>
          </motion.h1>

          <motion.p {...fade(0.15)} className="hero-sub">
            xysq is the <span className="hero-sub-strong">context of record</span>{' '}
            for your agents and your teams.
            <br />
            One place they read from, with the source kept on every fact.
          </motion.p>

          <motion.ul {...fade(0.2)} className="hero-points">
            <li>
              <GitBranch size={15} strokeWidth={1.8} aria-hidden="true" />
              Every fact keeps its source
            </li>
            <li>
              <ShieldCheck size={15} strokeWidth={1.8} aria-hidden="true" />
              You control who sees what
            </li>
            <li>
              <Brain size={15} strokeWidth={1.8} aria-hidden="true" />
              Improves with every correction
            </li>
          </motion.ul>

          <motion.div {...fade(0.25)} className="hero-btns">
            <motion.a
              href="https://app.xysq.ai?src=hero-builders"
              className="btn-main"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              transition={tap}
            >
              For AI builders
              <span className="btn-main-arrow">→</span>
            </motion.a>
            <motion.a
              href="https://app.xysq.ai/teams?src=hero-teams"
              className="btn-out"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              transition={tap}
            >
              For teams
              <span className="btn-out-arrow">→</span>
            </motion.a>
          </motion.div>
        </div>

        {/* ── RIGHT: rotating graphics (builders / teams) ── */}
        <motion.div {...fade(0.2)} className="hero-visual">
          <HeroShowcase />
        </motion.div>
      </div>
    </section>
  )
}
