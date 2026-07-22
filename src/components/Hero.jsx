import { motion } from 'framer-motion'
import { Brain, Network, ShieldCheck } from 'lucide-react'
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
            <span className="hero-h1-lead">The first</span>{' '}
            <span className="hero-accent">self-improving</span>
            <br />
            context engineering
            <br />
            <span className="hero-h1-dim">platform.</span>
          </motion.h1>

          <motion.p {...fade(0.15)} className="hero-sub">
            Powered by <span className="hero-sub-strong">the xysq Memory Engine</span>.
            <br />
            A domain-adaptive engine that continuously evolves knowledge
            into better context for AI.
          </motion.p>

          <motion.ul {...fade(0.2)} className="hero-points">
            <li>
              <Brain size={15} strokeWidth={1.8} aria-hidden="true" />
              Self-Improving Memory
            </li>
            <li>
              <Network size={15} strokeWidth={1.8} aria-hidden="true" />
              Knowledge Graphs
            </li>
            <li>
              <ShieldCheck size={15} strokeWidth={1.8} aria-hidden="true" />
              Enterprise Governance
            </li>
          </motion.ul>

          <motion.div {...fade(0.25)} className="hero-btns">
            <motion.a
              href="https://app.xysq.ai"
              className="btn-main"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              transition={tap}
            >
              For AI builders
              <span className="btn-main-arrow">→</span>
            </motion.a>
            <motion.a
              href="https://app.xysq.ai/teams"
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

        {/* ── RIGHT: infographic placeholder (build → share → own) ── */}
        <motion.div {...fade(0.2)} className="hero-visual">
          <div
            className="hero-visual-ph"
            role="img"
            aria-label="Infographic placeholder: build your knowledge graph, share it, own it"
          >
            <span className="hero-visual-ph-tag">INFOGRAPHIC</span>
            <span className="hero-visual-ph-title">build → share → own</span>
            <span className="hero-visual-ph-note">
              personal graph · share controls · team graph
              <br />
              (generated image drops in here)
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
