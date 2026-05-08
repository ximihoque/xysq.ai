import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Sparkles, Code2, Building2 } from 'lucide-react'
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
    id: 'you',
    icon: Sparkles,
    eyebrow: 'For you',
    title: 'Start using xysq.',
    body: 'Sign in, connect your favourite AI tools, and start carrying your context across them. No setup, no migration.',
    cta: { kind: 'external', label: 'Open the app', href: APP_URL },
    accent: 'cyan',
  },
  {
    id: 'developers',
    icon: Code2,
    eyebrow: 'For developers',
    title: 'Build with xysq.',
    body: 'API, SDKs, and reference architectures. Drop persistent memory into your agents in minutes — no rebuild required.',
    cta: { kind: 'external', label: 'Read the docs', href: 'https://docs.xysq.ai' },
    accent: 'cyan',
  },
  {
    id: 'businesses',
    icon: Building2,
    eyebrow: 'For businesses',
    title: 'Bring xysq to your team.',
    body: 'Institutional memory across Slack, Drive, Notion, and the rest. Your team’s knowledge, queryable from any agent.',
    cta: { kind: 'internal', label: 'Book a call', href: '/for-business#fb-contact' },
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
