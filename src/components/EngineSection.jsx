import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RefreshCw, GitBranch, Layers, ShieldCheck, Play, X } from 'lucide-react'
import HeroStage from './HeroStage'
import '../styles/engine-section.css'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay },
})

// the three words the rest of the page has been earning, each as a card
const CARDS = [
  { icon: GitBranch, label: 'Provable', body: 'Every fact traces back to the document it came from, and you can open it.' },
  { icon: Layers, label: 'Reconciled', body: 'Two facts disagree, the old one closes. You never serve both, and the old one stays readable.' },
  { icon: ShieldCheck, label: 'Governed', body: 'You decide which people and which agents can read what. Every answer stays inside those limits.' },
  { icon: RefreshCw, label: 'Self-improving', body: 'Every correction is one more thing the next answer gets right. Fix it once.' },
]

export default function EngineSection() {
  const [open, setOpen] = useState(false)

  return (
    <section className="eng-section eng-section--closer" id="engine">
      <div className="eng-inner">
        <motion.h2 className="eng-headline" {...fade(0)}>
          <span className="eng-light">Memory</span>{' '}
          <span className="eng-hl-improves">improves</span>{' '}
          <span className="eng-light">on command,</span>{' '}
          <em>not by <span className="eng-hl-accident">accident</span>.</em>
        </motion.h2>

        <motion.p className="eng-deck" {...fade(0.08)}>
          Fix a fact once and every answer after that uses the fix. The old one
          is closed, not lost, and you can always see where an answer came
          from.
        </motion.p>

        <ul className="eng-cards">
          {CARDS.map(({ icon: Icon, label, body }, i) => (
            <motion.li key={label} className="eng-card" {...fade(0.15 + i * 0.08)}>
              <span className="eng-card-icon" aria-hidden="true"><Icon size={16} strokeWidth={1.8} /></span>
              <span className="eng-card-label">{label}</span>
              <span className="eng-card-text">{body}</span>
            </motion.li>
          ))}
        </ul>

        <motion.div className="eng-ctas" {...fade(0.4)}>
          <button type="button" className="eng-btn eng-btn--main" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="engine-preview">
            {open ? <X size={15} strokeWidth={2} /> : <Play size={15} strokeWidth={2} />}
            {open ? 'Close preview' : 'Quick preview'}
          </button>
          <a href="/whitepaper" className="eng-btn eng-btn--alt">
            Read the whitepaper
            <span className="eng-btn-arrow">→</span>
          </a>
        </motion.div>

        {/* the workspace walkthrough, on demand. Keyed on open so a second
            look starts the walkthrough from the top. */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id="engine-preview"
              className="eng-preview"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="eng-preview-in">
                <HeroStage key="preview" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
