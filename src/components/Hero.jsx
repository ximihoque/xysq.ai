import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { BadgeCheck, ChevronDown } from 'lucide-react'
import XysqLogo from './XysqLogo'
import IntegrationMarquee from './IntegrationMarquee'
import HeroTabs from './hero/HeroTabs'
import AgentSignup from './AgentSignup'
import '../styles/hero.css'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay },
})

const tap = { type: 'spring', stiffness: 400, damping: 25 }

// the middle line of the headline, in the order the argument runs
const ROTATE = ['reliable agents', 'behaviourally consistent agents', 'human-like agents']
const ROTATE_EVERY = 2800

// five small four-point stars around the phrase, fixed spots so the twinkle
// is the same every time. x/y in % of the phrase box, delay in ms
const SPARKS = [
  [-6, 6, 15, 0], [10, -34, 10, 120], [52, -40, 14, 60], [86, -20, 10, 200], [103, 20, 13, 160],
]

function Sparkles() {
  return (
    <span className="hero-sparks" aria-hidden="true">
      {SPARKS.map(([x, y, size, delay], i) => (
        <svg key={i} className="hero-spark" viewBox="0 0 24 24" width={size} height={size}
          style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${delay}ms` }}>
          <path d="M12 0c.6 7 5 11.4 12 12-7 .6-11.4 5-12 12-.6-7-5-11.4-12-12 7-.6 11.4-5 12-12z" fill="currentColor" />
        </svg>
      ))}
    </span>
  )
}

function RotatingLine() {
  const reduce = useReducedMotion()
  const [i, setI] = useState(0)

  useEffect(() => {
    if (reduce) return
    const t = setInterval(() => setI((n) => (n + 1) % ROTATE.length), ROTATE_EVERY)
    return () => clearInterval(t)
  }, [reduce])

  // reduced motion: no cycling, the brand word stays put
  const word = reduce ? ROTATE[ROTATE.length - 1] : ROTATE[i]

  return (
    <span className="hero-rot">
      {/* popLayout lifts the leaving phrase out of flow, so the new one
          lands without the line collapsing in between */}
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={word}
          className="hero-rot-word"
          initial={{ opacity: 0, y: 16, filter: 'blur(5px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -16, filter: 'blur(5px)' }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {word}
          {!reduce && <Sparkles />}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

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
            {/* the middle line is its own block, so no breaks needed */}
            <span className="hero-h1-light">The</span> context platform{' '}
            <span className="hero-h1-light">to build</span>
            <RotatingLine />
            <span className="hero-h1-light">to</span> 10x your business.
          </motion.h1>

          {/* the one word in the headline that needs a gloss, glossed */}
          <motion.p {...fade(0.12)} className="hero-sub">
            <BadgeCheck size={18} strokeWidth={2.2} className="hero-sub-ico" aria-hidden="true" />
            <span className="hero-sub-strong">human-like:</span> AI agents you can trust.
          </motion.p>


          <motion.div {...fade(0.18)} className="hero-signup">
            <AgentSignup />
          </motion.div>

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
        <HeroTabs />
      </motion.div>
    </section>
  )
}
