import { motion } from 'framer-motion'
import TeamsVisual from './TeamsVisual'
import '../styles/teams.css'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay },
})

const points = [
  {
    headline: 'Shared, isolated vaults',
    body: 'Memory belongs to the team. Each team’s vault is fully isolated from every other.',
  },
  {
    headline: 'Role-based access',
    body: 'Owner, admin, read/write, and read-only roles control who can read, contribute, or manage memory.',
  },
  {
    headline: 'Survives the team',
    body: 'When someone leaves their context stays. New teammates and agents inherit it on day one.',
  },
]

export default function Teams() {
  return (
    <section className="tm-section" id="teams">
      <div className="tm-inner">
        {/* Visual on the LEFT */}
        <motion.div className="tm-visual" {...fade(0.15)}>
          <TeamsVisual />
        </motion.div>

        {/* Text on the RIGHT */}
        <motion.div className="tm-text" {...fade(0)}>
          <span className="tm-eyebrow">
            <span className="tm-eyebrow-dot" />
            TEAMS
          </span>

          <h2 className="tm-headline">
            Knowledge that compounds<br />
            <em>across the whole team.</em>
          </h2>

          <p className="tm-deck">
            Memory shouldn’t evaporate when someone changes role or leaves.
            Team vaults turn individual context into institutional knowledge —
            decisions, patterns, and answers that stay.
          </p>

          <ul className="tm-list">
            {points.map((p, i) => (
              <motion.li
                key={p.headline}
                className="tm-item"
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.55, ease: 'easeOut', delay: 0.15 + i * 0.08 }}
              >
                <span className="tm-bullet" aria-hidden="true" />
                <span className="tm-item-body">
                  <span className="tm-item-headline">{p.headline}</span>
                  <span className="tm-item-sep">—</span>
                  <span className="tm-item-text">{p.body}</span>
                </span>
              </motion.li>
            ))}
          </ul>

          <motion.a
            href="/features/teams"
            className="tm-cta"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, ease: 'easeOut', delay: 0.55 }}
            whileHover={{ x: 2 }}
          >
            Explore Teams
            <span className="tm-cta-arrow">→</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
