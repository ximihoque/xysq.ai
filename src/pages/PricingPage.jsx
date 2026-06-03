import { motion } from 'framer-motion'
import { Check, ArrowUpRight } from 'lucide-react'
import SEO, { breadcrumbSchema } from '../components/SEO'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import PageTransition from '../components/PageTransition'
import NeuralBackground from '../components/NeuralBackground'
import '../styles/pricing.css'

const APP_URL = import.meta.env.VITE_APP_URL || 'https://app.xysq.ai'
const CALENDLY_URL = 'https://calendly.com/hoque-ximi/30min'

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
}

const TIERS = [
  {
    id: 'free',
    plan: 'Free',
    price: '$0',
    unit: '/ forever',
    for: 'For individuals and small teams getting started.',
    features: [
      '1,000 personal memories',
      '1,000 team memories (shared across all your teams)',
      'Up to 3 connectors',
      'Full MCP / SDK access',
    ],
    cta: { label: 'Get started', href: APP_URL, variant: 'primary' },
  },
  {
    id: 'business',
    plan: 'Business',
    badge: 'Most quotes in ~15 min',
    price: 'Custom',
    unit: '',
    for: 'For teams and companies running agents in production.',
    featured: true,
    features: [
      'Everything in Free',
      'Unlimited memories — personal and team',
      'Unlimited connectors',
      'Teams, SSO and admin controls',
      'Priority support and SLA',
      '30-day business trial, then a custom quote — most quotes within ~15 minutes of your call',
    ],
    cta: { label: 'Talk to us', href: CALENDLY_URL, variant: 'secondary' },
  },
]

export default function PricingPage() {
  return (
    <PageTransition>
      <SEO
        title="Pricing"
        path="/pricing"
        description="Start free with 1,000 memories and up to 3 connectors. Scale to unlimited memories, connectors, teams, SSO, and priority support — talk to us for a custom quote."
        schema={breadcrumbSchema([
          { name: 'Home', item: '/' },
          { name: 'Pricing', item: '/pricing' },
        ])}
      />
      <NeuralBackground />
      <Nav />
      <main className="pricing-main">
        <div className="pr-inner">
          <motion.div className="pr-head" {...fadeUp}>
            <span className="pr-eyebrow">Pricing</span>
            <h1 className="pr-title">
              Simple, <em>honest</em> pricing
            </h1>
            <p className="pr-sub">
              Start free. Scale when your agents do.
            </p>
          </motion.div>

          <div className="pr-grid">
            {TIERS.map((tier, i) => (
              <motion.div
                key={tier.id}
                className={`pr-card${tier.featured ? ' pr-card--featured' : ''}`}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: 0.08 + i * 0.08 }}
              >
                <div className="pr-card-head">
                  <span className="pr-plan">{tier.plan}</span>
                  {tier.badge && <span className="pr-badge">★ {tier.badge}</span>}
                </div>

                <div className="pr-price">
                  <span className="pr-price-num">{tier.price}</span>
                  {tier.unit && <span className="pr-price-unit">{tier.unit}</span>}
                </div>
                <p className="pr-for">{tier.for}</p>

                <ul className="pr-features">
                  {tier.features.map((f) => (
                    <li key={f} className="pr-feature">
                      <Check className="pr-check" size={18} strokeWidth={2.2} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={tier.cta.href}
                  className={`pr-cta pr-cta--${tier.cta.variant}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {tier.cta.label}
                  <ArrowUpRight className="pr-cta-arrow" size={16} strokeWidth={2} />
                </a>
              </motion.div>
            ))}
          </div>

          <p className="pr-note">
            30-day trial on Business · No card required to start
          </p>
        </div>
      </main>
      <Footer />
    </PageTransition>
  )
}
