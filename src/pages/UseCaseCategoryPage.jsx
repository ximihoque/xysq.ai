import { useParams, Navigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  GraduationCap, User, FlaskConical,
  Code2, Rocket, PenTool,
  Users, Megaphone, Target,
  LineChart, BarChart3, Compass,
} from 'lucide-react'
import SEO from '../components/SEO'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import PageTransition from '../components/PageTransition'
import NeuralBackground from '../components/NeuralBackground'
import ContextFlow from '../components/ContextFlow'
import { USE_CASE_BY_SLUG, USE_CASE_CATEGORIES } from '../data/useCases'
import '../styles/use-case-page.css'

const ICONS = {
  GraduationCap, User, FlaskConical,
  Code2, Rocket, PenTool,
  Users, Megaphone, Target,
  LineChart, BarChart3, Compass,
}

const APP_URL = import.meta.env.VITE_APP_URL || 'https://app.xysq.ai'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay },
})

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

        {/* CTA */}
        <section className="uc-cta">
          <div className="uc-cta-inner">
            <h2 className="uc-cta-headline">Try it on your own work.</h2>
            <p className="uc-cta-deck">
              Plug xysq into the AI tools you already use. Your context follows you.
            </p>
            <a href={APP_URL} className="uc-cta-btn">
              Get started
              <span className="uc-cta-arrow">→</span>
            </a>
          </div>
        </section>

        <Footer />
      </main>
    </PageTransition>
  )
}
