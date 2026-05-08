import { useParams, Navigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  GraduationCap, User, FlaskConical,
  Code2, Rocket, PenTool,
  Users, Megaphone, Target,
  LineChart, BarChart3, Compass,
  ArrowUpRight,
} from 'lucide-react'
import SEO, { breadcrumbSchema } from '../components/SEO'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import PageTransition from '../components/PageTransition'
import NeuralBackground from '../components/NeuralBackground'
import ContextFlow from '../components/ContextFlow'
import ThreeColumnCTA from '../components/ThreeColumnCTA'
import { USE_CASE_BY_SLUG, USE_CASE_CATEGORIES, TOOLS, FEATURES } from '../data/useCases'
import '../styles/use-case-page.css'

const ICONS = {
  GraduationCap, User, FlaskConical,
  Code2, Rocket, PenTool,
  Users, Megaphone, Target,
  LineChart, BarChart3, Compass,
}

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay },
})

// Tokens recognised inline in nudge bodies:
//   {tool:claude}        → bold inline tool mention
//   {feature:organise}   → accent-coloured docs link
const TOKEN_RE = /\{(feature|tool):([a-z0-9_-]+)\}/g

function NudgeBody({ text }) {
  const parts = []
  let lastIdx = 0
  let m
  // exec is stateful; reset before reuse
  TOKEN_RE.lastIndex = 0
  while ((m = TOKEN_RE.exec(text)) !== null) {
    if (m.index > lastIdx) parts.push({ kind: 'text', value: text.slice(lastIdx, m.index) })
    parts.push({ kind: m[1], id: m[2] })
    lastIdx = m.index + m[0].length
  }
  if (lastIdx < text.length) parts.push({ kind: 'text', value: text.slice(lastIdx) })

  return (
    <p className="uc-nudge-body">
      {parts.map((part, i) => {
        if (part.kind === 'text') return <span key={i}>{part.value}</span>
        if (part.kind === 'feature') {
          const f = FEATURES[part.id]
          if (!f) return null
          const isExternal = /^https?:/.test(f.docsHref)
          return (
            <a
              key={i}
              className="uc-nudge-feature-link"
              data-feature={part.id}
              href={f.docsHref}
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noopener noreferrer' : undefined}
            >
              {f.name}
              <ArrowUpRight size={11} strokeWidth={2.4} className="uc-nudge-feature-link-arrow" />
            </a>
          )
        }
        if (part.kind === 'tool') {
          const t = TOOLS[part.id]
          if (!t) return null
          // Plain inline mention — chip below already carries the visual emphasis
          return <span key={i}>{t.name}</span>
        }
        return null
      })}
    </p>
  )
}

export default function UseCaseCategoryPage() {
  const { slug } = useParams()
  const category = USE_CASE_BY_SLUG[slug]
  if (!category) return <Navigate to="/" replace />

  return (
    <PageTransition>
      <SEO
        title={`${category.title} · Use cases`}
        path={`/use-cases/${category.slug}`}
        description={category.deck}
        schema={breadcrumbSchema([
          { name: 'Home', item: '/' },
          { name: 'Use cases', item: '/' },
          { name: category.title, item: `/use-cases/${category.slug}` },
        ])}
      />
      <NeuralBackground />
      <Nav />
      <main className="uc-page">
        {/* Hero */}
        <section className="uc-hero">
          <div className="uc-hero-inner">
            <motion.span className="uc-eyebrow" {...fade(0)}>
              <span className="uc-eyebrow-dot" />
              {category.eyebrow}
            </motion.span>
            <motion.h1 className="uc-headline" {...fade(0.05)}>
              {category.headline.split('\n').map((line, i, arr) => (
                <span key={i}>
                  {line}
                  {i < arr.length - 1 && <br />}
                </span>
              ))}
            </motion.h1>
            <motion.p className="uc-deck" {...fade(0.1)}>{category.deck}</motion.p>
          </div>
        </section>

        {/* Personas grid */}
        <section className="uc-personas">
          <div className="uc-personas-inner">
            {category.personas.map((p, i) => {
              const Icon = ICONS[p.icon] || User
              return (
                <motion.article
                  key={p.id}
                  className="uc-persona-card"
                  {...fade(0.12 + i * 0.08)}
                >
                  <span className="uc-persona-icon">
                    <Icon strokeWidth={1.6} />
                  </span>
                  <h3 className="uc-persona-name">{p.name}</h3>
                  <p className="uc-persona-body">{p.body}</p>
                </motion.article>
              )
            })}
          </div>
        </section>

        {/* Workflow nudges — one per persona */}
        <section className="uc-nudges">
          <div className="uc-nudges-inner">
            <motion.div className="uc-nudges-header" {...fade(0)}>
              <span className="uc-nudges-eyebrow">How it might fit</span>
              <h2 className="uc-nudges-title">
                Tiny workflows you can <em>try this week.</em>
              </h2>
            </motion.div>

            <div className="uc-nudges-grid">
              {category.personas.map((p, i) => {
                const n = p.nudge
                if (!n) return null
                const features = (n.features || []).filter((id) => FEATURES[id])
                const primary = features[0]
                const primaryFeature = FEATURES[primary]
                return (
                  <motion.article
                    key={p.id}
                    className="uc-nudge"
                    data-feature={primary}
                    {...fade(0.1 + i * 0.08)}
                  >
                    <span className="uc-nudge-persona">{p.name}</span>
                    <h3 className="uc-nudge-label">{n.label}</h3>
                    <NudgeBody text={n.body} />

                    <div className="uc-nudge-tools">
                      {n.tools.map((tid) => {
                        const t = TOOLS[tid]
                        if (!t) return null
                        return (
                          <span key={tid} className="uc-nudge-tool" title={t.name}>
                            <img src={t.logo} alt="" className="uc-nudge-tool-logo" width="16" height="16" loading="lazy" />
                            <span>{t.name}</span>
                          </span>
                        )
                      })}
                    </div>

                    <div className="uc-nudge-foot">
                      <div className="uc-nudge-features">
                        {features.map((fid) => {
                          const f = FEATURES[fid]
                          const isExternal = /^https?:/.test(f.docsHref)
                          return (
                            <a
                              key={fid}
                              className="uc-nudge-feature"
                              data-feature={fid}
                              href={f.docsHref}
                              target={isExternal ? '_blank' : undefined}
                              rel={isExternal ? 'noopener noreferrer' : undefined}
                              title={`Learn about ${f.name}`}
                            >
                              <span className="uc-nudge-feature-dot" />
                              {f.name}
                            </a>
                          )
                        })}
                      </div>
                      {primaryFeature && (() => {
                        const isExternal = /^https?:/.test(primaryFeature.docsHref)
                        return (
                          <a
                            className="uc-nudge-docs"
                            href={primaryFeature.docsHref}
                            target={isExternal ? '_blank' : undefined}
                            rel={isExternal ? 'noopener noreferrer' : undefined}
                          >
                            Learn more
                            <ArrowUpRight size={13} strokeWidth={2} />
                          </a>
                        )
                      })()}
                    </div>
                  </motion.article>
                )
              })}
            </div>
          </div>
        </section>

        {category.showContextFlow && (
          <section className="uc-contextflow-host">
            <ContextFlow />
          </section>
        )}

        {/* Cross-link to other categories */}
        <section className="uc-other">
          <div className="uc-other-inner">
            <p className="uc-other-label">Other use cases</p>
            <div className="uc-other-row">
              {USE_CASE_CATEGORIES.filter((c) => c.slug !== category.slug).map((c) => (
                <Link key={c.slug} to={`/use-cases/${c.slug}`} className="uc-other-chip">
                  {c.title}
                  <span className="uc-other-arrow">→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* "Pick your starting point" — same three-column CTA the home page
           uses, so every use case page funnels into a consistent next step. */}
        <ThreeColumnCTA />

        <Footer />
      </main>
    </PageTransition>
  )
}
