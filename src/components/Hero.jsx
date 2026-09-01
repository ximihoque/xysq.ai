import { motion } from 'framer-motion'
import { ChevronDown, Quote, RefreshCcw, ShieldCheck } from 'lucide-react'
import XysqLogo from './XysqLogo'
import IntegrationMarquee from './IntegrationMarquee'
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
            Build reliable agents
            <br />
            on a self-improving
            <br />
            <span className="hero-accent">context layer you can trust.</span>
          </motion.h1>

          {/* the headline's three claims, each with the one line that backs
              it. Icon plates use the house idiom: 30px square, hairline
              border, surface fill, teal glyph. */}
          <motion.ul {...fade(0.18)} className="hero-pillars">
            <li className="hero-pillar">
              <span className="hero-pillar-ico"><Quote size={15} strokeWidth={1.8} /></span>
              <span>
                <span className="hero-pillar-h">Grounded</span>
                <span className="hero-pillar-p">Every answer names its source.</span>
              </span>
            </li>
            <li className="hero-pillar">
              <span className="hero-pillar-ico"><RefreshCcw size={15} strokeWidth={1.8} /></span>
              <span>
                <span className="hero-pillar-h">Self-improving</span>
                <span className="hero-pillar-p">Correct it once. It holds.</span>
              </span>
            </li>
            <li className="hero-pillar">
              <span className="hero-pillar-ico"><ShieldCheck size={15} strokeWidth={1.8} /></span>
              <span>
                <span className="hero-pillar-h">Governed</span>
                <span className="hero-pillar-p">You decide what each agent reads.</span>
              </span>
            </li>
          </motion.ul>

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

          <motion.div {...fade(0.32)} className="hero-strip">
            <IntegrationMarquee />
          </motion.div>

          <motion.a {...fade(0.4)} href="#demo" className="hero-jump">
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
