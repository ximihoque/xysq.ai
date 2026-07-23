import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import HeroInfographic from './HeroInfographic'
import HeroTeamsGraphic from './HeroTeamsGraphic'
import '../styles/hero-showcase.css'

// rotates the two hero graphics: engine pipeline (builders) and
// sharing flow (teams). Auto-advances, holds on hover, arrows + caption
// labels jump directly.
const slides = [
  { id: 'builders', label: 'For Builders', Comp: HeroInfographic },
  { id: 'teams', label: 'For Teams', Comp: HeroTeamsGraphic },
]

const INTERVAL_MS = 5000

// ?slide=teams preselects a slide — debugging and deep links, SSR-safe
function initialIndex() {
  if (typeof window === 'undefined') return 0
  const wanted = new URLSearchParams(window.location.search).get('slide')
  const i = slides.findIndex((s) => s.id === wanted)
  return i >= 0 ? i : 0
}

export default function HeroShowcase() {
  const [index, setIndex] = useState(initialIndex)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return undefined
    // honor reduced motion: no auto-rotation, arrows still work
    const reduced = typeof window !== 'undefined'
      && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduced) return undefined
    const t = setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      INTERVAL_MS
    )
    return () => clearInterval(t)
    // index in deps so a manual jump restarts the 5s clock
  }, [paused, index])

  const active = slides[index]
  const { Comp } = active

  return (
    <div
      className="hsc"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="hsc-stage">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            className="hsc-slide"
            initial={{ opacity: 0, x: 26 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -26 }}
            transition={{ duration: 0.32, ease: 'easeOut' }}
          >
            <Comp />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="hsc-controls">
        <button
          type="button"
          className="hsc-arrow"
          aria-label="Previous graphic"
          onClick={() => setIndex((i) => (i + slides.length - 1) % slides.length)}
        >
          <ChevronLeft size={15} strokeWidth={2} />
        </button>

        <div className="hsc-caption" role="tablist" aria-label="Hero graphics">
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              className={`hsc-caption-item${i === index ? ' hsc-caption-item--active' : ''}`}
              onClick={() => setIndex(i)}
            >
              {s.label}.
            </button>
          ))}
        </div>

        <button
          type="button"
          className="hsc-arrow"
          aria-label="Next graphic"
          onClick={() => setIndex((i) => (i + 1) % slides.length)}
        >
          <ChevronRight size={15} strokeWidth={2} />
        </button>
      </div>
    </div>
  )
}
