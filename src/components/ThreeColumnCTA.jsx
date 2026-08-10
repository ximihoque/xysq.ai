import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Users, Code2, SlidersHorizontal } from 'lucide-react'
import '../styles/three-column-cta.css'

const APP_URL = import.meta.env.VITE_APP_URL || 'https://app.xysq.ai'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay },
})

const columns = [
  {
    id: 'teams',
    icon: Users,
    eyebrow: 'For teams',
    title: 'Your team’s knowledge, and where all of it came from.',
    body: 'Your files and AI sessions become context everyone can use, with the source kept on every fact. Free to start.',
    cta: { kind: 'external', label: 'Start free', href: `${APP_URL}?src=cta-teams` },
    accent: 'cyan',
  },
  {
    id: 'builders',
    icon: Code2,
    eyebrow: 'For AI builders',
    title: 'Give your agents context they can cite.',
    body: 'Agents read from the graphs you allow, write to their own, and every fact they are handed carries the source it came from.',
    cta: { kind: 'external', label: 'Read the docs', href: 'https://docs.xysq.ai' },
    accent: 'cyan',
  },
  {
    /* after a trust-first page the person who books a call has a risk
       question, and "tuned to your domain" doesn't answer it. this is also
       where every ahead-of-reality claim goes: behind a human conversation. */
    id: 'custom',
    icon: SlidersHorizontal,
    eyebrow: 'Governance and deployment',
    title: 'Approvals, your vocabulary, your boundary.',
    body: 'Role-based access, an audit trail on what gets shared, and the engine fitted to your environment. We’ll walk you through it.',
    cta: { kind: 'external', label: 'Book a call', href: 'https://calendly.com/hoque-ximi/30min' },
    accent: 'lychee',
  },
]

export default function ThreeColumnCTA() {
  return (
    <section className="t3-section" id="get-started">
      <div className="t3-inner">
        <motion.h2 className="t3-headline" {...fade(0)}>
          Pick your <em>starting point</em>.
        </motion.h2>

        <div className="t3-grid">
          {columns.map((c, i) => {
            const Icon = c.icon
            const cta = c.cta
            return (
              <motion.div
                key={c.id}
                className={`t3-card t3-card--${c.accent}`}
                {...fade(0.1 + i * 0.08)}
              >
                <span className="t3-icon">
                  <Icon strokeWidth={1.6} />
                </span>
                <span className="t3-eyebrow">{c.eyebrow}</span>
                <h3 className="t3-title">{c.title}</h3>
                <p className="t3-body">{c.body}</p>
                {cta.kind === 'external' ? (
                  <a
                    href={cta.href}
                    className="t3-cta"
                    target={cta.href.startsWith('http') ? '_blank' : undefined}
                    rel={cta.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {cta.label}
                    <span className="t3-cta-arrow">→</span>
                  </a>
                ) : (
                  <Link to={cta.href} className="t3-cta">
                    {cta.label}
                    <span className="t3-cta-arrow">→</span>
                  </Link>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
