import { useParams, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { GitBranch, ChevronDown, ArrowRight, Bot, FileText } from 'lucide-react'
import SEO, { breadcrumbSchema } from '../components/SEO'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import PageTransition from '../components/PageTransition'
import NeuralBackground from '../components/NeuralBackground'
import { USE_CASE_BY_SLUG } from '../data/useCases'
import '../styles/outputs-section.css'
import '../styles/use-case-page.css'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay },
})

export default function UseCaseCategoryPage() {
  const { slug } = useParams()
  const data = USE_CASE_BY_SLUG[slug]
  if (!data) return <Navigate to="/" replace />

  const { flow } = data

  return (
    <PageTransition>
      <SEO
        title={`${data.title} · Use cases`}
        path={`/use-cases/${slug}`}
        description={data.seo}
        schema={breadcrumbSchema([
          { name: 'Home', item: '/' },
          { name: data.title, item: `/use-cases/${slug}` },
        ])}
      />
      <NeuralBackground />
      <Nav />

      <article className="ucp">
        <motion.header className="ucp-header" {...fade(0)}>
          <span className="ucp-eyebrow">{data.eyebrow}</span>
          <h1 className="ucp-h1">
            {data.h1[0]}<br />
            <em>{data.h1[1]}</em>
          </h1>
          <p className="ucp-deck">{data.deck}</p>
        </motion.header>

        <div className="out-halves ucp-halves">
          {/* teams face: what you capture becomes this function's graphs */}
          <motion.div className="out-half" {...fade(0.1)}>
            <h3 className="out-half-title">{data.teamFace.label}</h3>
            <div
              className="out-fig"
              role="img"
              aria-label={`What goes in (${data.captures.join(', ')}) is distilled into the ${data.title.toLowerCase()} context graphs: ${data.graphs.join(', ')}`}
            >
              <div className="out-fig-chips">
                {data.captures.map((c) => (
                  <span key={c}><FileText size={11} strokeWidth={1.8} /> {c}</span>
                ))}
              </div>
              <span className="out-fig-arrow out-fig-arrow--label" aria-hidden="true">
                <ChevronDown size={12} strokeWidth={2} /> distilled into your context graphs
              </span>
              <div className="out-fig-chips">
                {data.graphs.map((g) => (
                  <span key={g} className="out-fig-chip--own">
                    <GitBranch size={11} strokeWidth={1.8} /> {g}
                  </span>
                ))}
              </div>
            </div>
            <p className="ucp-face-body">{data.teamFace.body}</p>
            <a href="https://app.xysq.ai" className="out-btn out-btn--main">
              Start free <ArrowRight size={14} strokeWidth={2} />
            </a>
          </motion.div>

          {/* builders face: the agent reads across graphs, writes to its own */}
          <motion.div className="out-half" {...fade(0.18)}>
            <h3 className="out-half-title">{data.builderFace.label}</h3>
            <div
              className="out-fig"
              role="img"
              aria-label={`${flow.agent} reads from the ${flow.reads.join(' and ')} graphs and writes to the ${flow.writes} graph`}
            >
              <div className="out-fig-chips">
                {flow.reads.map((g) => (
                  <span key={g}><GitBranch size={11} strokeWidth={1.8} /> {g}</span>
                ))}
              </div>
              <span className="out-fig-arrow out-fig-arrow--label" aria-hidden="true">
                <ChevronDown size={12} strokeWidth={2} /> reads
              </span>
              <div className="out-fig-chips">
                <span><Bot size={11} strokeWidth={1.8} /> {flow.agent}</span>
              </div>
              <span className="out-fig-arrow out-fig-arrow--label" aria-hidden="true">
                <ChevronDown size={12} strokeWidth={2} /> writes · to its own
              </span>
              <div className="out-fig-chips">
                <span className="out-fig-chip--own">
                  <GitBranch size={11} strokeWidth={1.8} /> {flow.writes}
                </span>
              </div>
            </div>
            <p className="ucp-face-body">{data.builderFace.body}</p>
            <a href="https://docs.xysq.ai" className="out-btn out-btn--alt" target="_blank" rel="noopener noreferrer">
              Read the docs <ArrowRight size={14} strokeWidth={2} />
            </a>
          </motion.div>
        </div>
      </article>

      <Footer />
    </PageTransition>
  )
}
