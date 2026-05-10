import { motion } from 'framer-motion'
import { ShieldCheck, Lock, EyeOff } from 'lucide-react'
import '../styles/trust-privacy.css'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay },
})

const pillars = [
  {
    icon: ShieldCheck,
    title: 'We don’t train on your data.',
    body: 'Your memory is yours. Period. We don’t use it to train models — ours, anyone else’s, or the providers we route through.',
  },
  {
    icon: Lock,
    title: 'Encrypted, scoped, consent-gated.',
    body: 'Every memory is encrypted at rest and in transit. Cross-agent access is consent-gated by you, not assumed by default.',
  },
  {
    icon: EyeOff,
    title: 'Yours to inspect, export, delete.',
    body: 'See exactly what’s remembered. Export it. Delete it. No black box, no lock-in, no “sorry, we can’t retrieve that for you.”',
  },
]

export default function TrustPrivacy() {
  return (
    <section className="tp-section" id="trust">
      <div className="tp-inner">
        <motion.span className="tp-eyebrow" {...fade(0)}>
          <span className="tp-eyebrow-dot" />
          TRUST &amp; PRIVACY
        </motion.span>

        <motion.h2 className="tp-headline" {...fade(0.05)}>
          Your memory.<br />
          <em>Not our training set.</em>
        </motion.h2>

        <motion.p className="tp-deck" {...fade(0.1)}>
          xysq is built consent-first. The whole point is for an AI to know
          you better — not for a model maker to learn from you in the process.
        </motion.p>

        <div className="tp-grid">
          {pillars.map((p, i) => {
            const Icon = p.icon
            return (
              <motion.div key={p.title} className="tp-card" {...fade(0.15 + i * 0.08)}>
                <span className="tp-icon">
                  <Icon strokeWidth={1.6} />
                </span>
                <h3 className="tp-card-title">{p.title}</h3>
                <p className="tp-card-body">{p.body}</p>
              </motion.div>
            )
          })}
        </div>

        <motion.a className="tp-link" href="/privacy" {...fade(0.4)}>
          Read the full privacy stance
          <span className="tp-link-arrow">→</span>
        </motion.a>
      </div>
    </section>
  )
}
