import { motion } from 'framer-motion'
import { ScrollText, ArrowUpRight } from 'lucide-react'
import '../styles/use-case-evidence.css'

const fade = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.06 },
}

// Documented cases for a given function. Every item links the primary
// document (the ruling, the regulator's own page), never coverage of it.
// That's the point, and it's also the only standard that survives a reader
// clicking through. Use cases with no case that clears that bar render
// nothing rather than padding the list.
export default function UseCaseEvidence({ items = [] }) {
  if (items.length === 0) return null

  return (
    <motion.section className="uce" aria-labelledby="uce-heading" {...fade}>
      <div className="uce-head">
        <ScrollText size={15} strokeWidth={1.8} aria-hidden="true" />
        <h2 id="uce-heading">On the record</h2>
      </div>
      <p className="uce-sub">
        This has already happened, more than once. Each case links to the
        primary document, not to coverage of it.
      </p>

      <ul className="uce-list">
        {items.map((e) => (
          <li key={e.url} className="uce-item">
            <p className="uce-claim">{e.claim}</p>
            <a
              className="uce-src"
              href={e.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {e.source}
              <ArrowUpRight size={12} strokeWidth={2} aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </motion.section>
  )
}
