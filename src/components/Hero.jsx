import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import TimelineArc from './TimelineArc'
import '../styles/hero.css'

const h1Words = ['One', 'presence,', 'across', 'time.']

const springTap = { type: 'spring', stiffness: 400, damping: 25 }

export default function Hero() {
  return (
    <section id="hero">
      <div className="hero-inner">
        <h1 className="hero-h1">
          {h1Words.map((word, i) => (
            <motion.span
              key={word}
              className="word"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.08 }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          className="hero-sub"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
        >
          Your context, your patterns, how you think — carried forward.<br />
          The model can change. You keep going.
        </motion.p>

        <motion.p
          className="hero-body"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.5 }}
        >
          A system that continuously understands you by connecting who you've been with who you're becoming.
        </motion.p>

        <motion.div
          className="hero-btns"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.65 }}
        >
          <motion.a
            href="https://app.xysq.ai"
            className="btn-main"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={springTap}
          >
            Get started free
          </motion.a>
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={springTap}
          >
            <Link to="/for-business" className="btn-out">
              For businesses →
            </Link>
          </motion.div>
        </motion.div>

        <TimelineArc />
      </div>
    </section>
  )
}
