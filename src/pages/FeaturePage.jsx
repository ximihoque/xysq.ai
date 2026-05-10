import { useParams, Navigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  // step / benefit icons
  Upload, LayoutGrid, MessageCircle, Sparkles,
  Search, BrainCog, Lock, Files,
  Brain, Network, TrendingUp, ShieldCheck, Repeat2,
  UserPlus, Layers, Handshake, RefreshCw,
  GraduationCap, GitMerge, Workflow,
  // ui
  ArrowUpRight, ArrowRight,
} from 'lucide-react'
import SEO, { breadcrumbSchema } from '../components/SEO'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import PageTransition from '../components/PageTransition'
import NeuralBackground from '../components/NeuralBackground'
import { FEATURE_PAGES } from '../data/features'
import '../styles/feature-page.css'

const ICONS = {
  Upload, LayoutGrid, MessageCircle, Sparkles,
  Search, BrainCog, Lock, Files,
  Brain, Network, TrendingUp, ShieldCheck, Repeat2,
  UserPlus, Layers, Handshake, RefreshCw,
  GraduationCap, GitMerge, Workflow,
}

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay },
})

function CTA({ cta, variant = 'primary' }) {
  if (!cta) return null
  const cls = `fp-cta fp-cta--${variant}`
  const isExternal = cta.external || /^https?:/.test(cta.href)
  if (isExternal) {
    return (
      <a className={cls} href={cta.href} target="_blank" rel="noopener noreferrer">
        {cta.label}
        <ArrowUpRight size={14} strokeWidth={2} />
      </a>
    )
  }
  // hash links → plain anchor; route links → react-router Link
  if (cta.href.startsWith('#') || cta.href.includes('#')) {
    return (
      <a className={cls} href={cta.href}>
        {cta.label}
        <ArrowRight size={14} strokeWidth={2} />
      </a>
    )
  }
  return (
    <Link className={cls} to={cta.href}>
      {cta.label}
      <ArrowRight size={14} strokeWidth={2} />
    </Link>
  )
}

export default function FeaturePage() {
  const { slug } = useParams()
  const feature = FEATURE_PAGES[slug]
  if (!feature) return <Navigate to="/" replace />

  return (
    <PageTransition>
      <SEO
        title={`${feature.title} · xysq`}
        path={`/features/${feature.slug}`}
        description={feature.seo?.description || feature.deck}
        schema={breadcrumbSchema([
          { name: 'Home', item: '/' },
          { name: feature.title, item: `/features/${feature.slug}` },
        ])}
      />
      <NeuralBackground />
      <Nav />
      <main className="fp" data-feature={feature.slug} data-tone={feature.primaryTone}>

        {/* ── Hero ── */}
        <section className="fp-hero">
          <div className="fp-hero-inner">
            <motion.span className="fp-eyebrow" {...fade(0)}>
              <span className="fp-eyebrow-mark" />
              {feature.eyebrow}
            </motion.span>

            <motion.h1 className="fp-headline" {...fade(0.05)}>
              {feature.headline.lead}{' '}
              <em>{feature.headline.accent}</em>
            </motion.h1>

            <motion.p className="fp-deck" {...fade(0.1)}>
              {feature.deck}
            </motion.p>

            <motion.div className="fp-ctas" {...fade(0.15)}>
              <CTA cta={feature.primaryCta}   variant="primary" />
              <CTA cta={feature.secondaryCta} variant="secondary" />
            </motion.div>

            <motion.div className="fp-personas" {...fade(0.22)}>
              {feature.personas.map((name) => (
                <span className="fp-persona" key={name}>
                  <span className="fp-persona-mark" />
                  {name}
                </span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── How it works ── */}
        <section className="fp-how" id="fp-how">
          <div className="fp-section-inner">
            <motion.span className="fp-section-eyebrow" {...fade(0)}>
              How it works
            </motion.span>

            <div className="fp-steps">
              {feature.steps.map((s, i) => {
                const Icon = ICONS[s.icon] || Sparkles
                return (
                  <motion.div
                    key={s.id}
                    className="fp-step"
                    data-tone={s.tone}
                    {...fade(0.06 + i * 0.08)}
                  >
                    <span className="fp-step-icon">
                      <Icon strokeWidth={1.6} />
                    </span>
                    <h3 className="fp-step-title">{s.title}</h3>
                    <p className="fp-step-desc">{s.desc}</p>
                    {i < feature.steps.length - 1 && (
                      <span className="fp-step-connector" aria-hidden="true" />
                    )}
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── Why teams choose [feature] ── */}
        <section className="fp-why">
          <div className="fp-section-inner">
            <motion.span className="fp-section-eyebrow" {...fade(0)}>
              Why teams choose {feature.title}
            </motion.span>

            <div className="fp-benefits">
              {feature.benefits.map((b, i) => {
                const Icon = ICONS[b.icon] || Sparkles
                return (
                  <motion.article
                    key={b.id}
                    className="fp-benefit"
                    data-tone={b.tone}
                    {...fade(0.06 + i * 0.06)}
                  >
                    <span className="fp-benefit-icon">
                      <Icon strokeWidth={1.6} />
                    </span>
                    <h3 className="fp-benefit-title">{b.title}</h3>
                    <p className="fp-benefit-body">{b.body}</p>
                  </motion.article>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── Testimonial ── */}
        {feature.testimonial && (
          <section className="fp-testimonial">
            <div className="fp-section-inner">
              <motion.blockquote className="fp-quote" {...fade(0)}>
                <p className="fp-quote-text">“{feature.testimonial.quote}”</p>
                <cite className="fp-quote-attr">— {feature.testimonial.attribution}</cite>
              </motion.blockquote>
            </div>
          </section>
        )}

        {/* ── Final CTA ── */}
        <section className="fp-final">
          <div className="fp-final-inner">
            <motion.h2 className="fp-final-headline" {...fade(0)}>
              {feature.finalCta.headline}
            </motion.h2>
            <motion.p className="fp-final-deck" {...fade(0.05)}>
              {feature.finalCta.subtext}
            </motion.p>
            <motion.div {...fade(0.1)}>
              <CTA
                cta={{ label: feature.finalCta.label, href: feature.finalCta.href, external: /^https?:/.test(feature.finalCta.href) }}
                variant="primary"
              />
            </motion.div>
          </div>
        </section>

        <Footer />
      </main>
    </PageTransition>
  )
}
