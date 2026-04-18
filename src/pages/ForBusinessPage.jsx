import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import PageTransition from '../components/PageTransition'
import GlassSnippet from '../components/GlassSnippet'
import ArchitectureDiagram from '../components/ArchitectureDiagram'
import NeuralBackground from '../components/NeuralBackground'
import Waitlist from '../components/Waitlist'
import ToolLogoStrip from '../components/ToolLogoStrip'
import '../styles/for-business-page.css'

// ── Pain chips — Hero ──────────────────────────────────────
const painItems = [
  'Context lost between sessions',
  'Repeated instructions, every time',
  'Hallucinations from missing history',
  'Token waste on re-establishing state',
]

// ── Persona icons (Lucide, inlined) ───────────────────────
const PERSONA_ICONS = {
  wrench: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  ),
  code: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m18 16 4-4-4-4" />
      <path d="m6 8-4 4 4 4" />
      <path d="m14.5 4-5 16" />
    </svg>
  ),
  package: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z" />
      <path d="M12 22V12" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="m7.5 4.27 9 5.15" />
    </svg>
  ),
  megaphone: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m3 11 18-5v12L3 14v-3z" />
      <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
    </svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  scale: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
      <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
      <path d="M7 21h10" />
      <path d="M12 3v18" />
      <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
    </svg>
  ),
}

// ── Persona cards — Section 2 ─────────────────────────────
const buildersPersonas = [
  {
    id: 'builders',
    headline: 'AI Builders',
    body: "You're stuffing context into every prompt. Token costs balloon. Recall degrades. You're duct-taping memory yourself.",
    icon: 'wrench',
  },
  {
    id: 'development',
    headline: 'Development',
    body: "Every new engineer ramps from zero. Every AI code assistant forgets the conventions, the gotchas, the \u201Cwhy we did it this way\u201D from last sprint. Documentation is a tax your team pays every time it writes, reads, or fails to find it.",
    icon: 'code',
  },
  {
    id: 'product',
    headline: 'Product',
    body: "Your product team ships features agents don't know exist. Users ask about yesterday's release; the agent answers with last quarter's docs.",
    icon: 'package',
  },
]

const operatorsPersonas = [
  {
    id: 'marketing',
    headline: 'Marketing',
    body: "Your agents don't know your brand voice, past campaigns, or what already flopped. Every brief starts cold.",
    icon: 'megaphone',
  },
  {
    id: 'hr',
    headline: 'HR & Onboarding',
    body: "New hire asks the same questions. Agent gives the same generic answers. Everything your team knows lives in someone's head.",
    icon: 'users',
  },
  {
    id: 'legal',
    headline: 'Legal',
    body: "Contracts, clauses, policies, precedents \u2014 all scattered across redlines, emails, and someone's desktop. Your agent can't cite what it can't see.",
    icon: 'scale',
  },
]

// ── Capture/Surface/Synthesize cards — Section 4 ──────────
const fixCards = [
  {
    id: 'capture',
    headline: 'Capture',
    body: 'Every interaction builds understanding. Not logs. Not document embeddings. Structured memory that knows what matters and why.',
    cls: 'fb-fix-card--capture',
  },
  {
    id: 'surface',
    headline: 'Surface',
    body: 'The right context, injected at the right moment. Your agents arrive informed — not guessing, not hallucinating, not asking again.',
    cls: 'fb-fix-card--surface',
  },
  {
    id: 'synthesize',
    headline: 'Synthesize',
    body: 'Memory that evolves. Patterns emerge. Preferences sharpen. The longer it runs, the smarter your agents get — without retraining.',
    cls: 'fb-fix-card--synthesize',
  },
]

// ── Scattered by Design cards — NEW section ──────────────
const scatteredCards = [
  {
    id: 'fragmentation',
    headline: 'Knowledge, fragmented.',
    body: 'Scattered across Slack threads, Notion pages, Jira tickets, GDrive folders, Linear issues, Salesforce records. No single agent sees across them.',
    cls: 'fb-scattered-card--fragmentation',
    variant: 'logos',
  },
  {
    id: 'tax',
    headline: 'The hidden tax.',
    body: 'Employees lose 2+ hours a day hopping between tools to reconstruct context. Your agents inherit the same blindness — and the same tax.',
    cls: 'fb-scattered-card--tax',
    variant: 'stat',
    stat: '2+ hrs',
    statLabel: 'per day, per employee',
  },
  {
    id: 'sprawl',
    headline: 'Sprawl compounds.',
    body: 'The average company runs 130+ SaaS apps. Each one is another silo. Memory should span them, not duplicate them.',
    cls: 'fb-scattered-card--sprawl',
    variant: 'stat',
    stat: '130+',
    statLabel: 'SaaS apps, per company',
  },
]

// ── Metric cards — Section 6 ───────────────────────────────
const metricCards = [
  {
    id: 'relevance',
    headline: 'Context Relevance',
    body: "Agents get the right context, not the most recent context. xysq surfaces what's actually relevant — not just what's in the last N tokens.",
    cls: 'fb-metric-card--relevance',
  },
  {
    id: 'tokens',
    headline: 'Token Efficiency',
    body: "Stop re-establishing state on every call. xysq delivers compressed, structured memory — so your prompts stay lean and your costs don't balloon.",
    cls: 'fb-metric-card--tokens',
  },
  {
    id: 'hallucinations',
    headline: 'Hallucination Reduction',
    body: "Hallucinations spike when agents guess. xysq gives agents grounded, structured knowledge — so they stop guessing about things they should already know.",
    cls: 'fb-metric-card--hallucinations',
  },
]

// ── Architecture code snippet ──────────────────────────────
const architectureCode = `# Two streams merge at every interaction
user_context = await memory_surface(
    query="user preferences and history",
    team_id="your_business_vault"
)

# What your business knows + what user consented to share
response = agent.reply(
    business_context=your_product_knowledge,
    user_context=user_context  # consent-gated
)`

// ── Animation helpers ──────────────────────────────────────
const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, ease: 'easeOut' },
}

function staggerFadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.7, ease: 'easeOut', delay },
  }
}

export default function ForBusinessPage() {
  return (
    <>
      <SEO
        title="For Business"
        path="/for-business"
        description="Memory is the real bottleneck in enterprise AI. xysq gives your agents persistent, shared institutional memory — reducing hallucinations, token costs, and context loss across teams."
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: 'xysq for Business',
          url: 'https://xysq.ai/for-business',
          description: 'Persistent institutional memory layer for AI agents. Capture, surface, and synthesize context across your entire organisation.',
          brand: { '@type': 'Brand', name: 'xysq' },
        }}
      />
      <Nav />
      <PageTransition>
        <NeuralBackground />
        <div className="for-business-page">

          {/* ── Section 1: Hero ── */}
          <section className="sect fb-hero-sect">
            <div className="sect-inner">
              <div className="fb-hero">
                <motion.span className="stag" {...staggerFadeUp(0)}>
                  For Businesses
                </motion.span>

                <motion.h1 {...staggerFadeUp(0.1)}>
                  Memory is the<br />real bottleneck.
                </motion.h1>

                <motion.p className="fb-hero-sub" {...staggerFadeUp(0.2)}>
                  Your agents are capable. But every session starts from scratch. Every handoff loses context. Every new model forgets everything. The problem isn't the model — it's that nothing remembers.
                </motion.p>

                <motion.div
                  className="fb-pain-grid"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {painItems.map((item, i) => (
                    <motion.span
                      key={item}
                      className="fb-pain-item"
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-80px' }}
                      transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 + i * 0.08 }}
                    >
                      {item}
                    </motion.span>
                  ))}
                </motion.div>

                <motion.div className="fb-hero-ctas" {...staggerFadeUp(0.6)}>
                  <a href="https://docs.xysq.ai" className="fb-cta-btn" target="_blank" rel="noopener noreferrer">
                    Get API access
                  </a>
                  <a href="#fb-contact" className="fb-cta-link">
                    Talk to us →
                  </a>
                </motion.div>
              </div>
            </div>
          </section>

          {/* ── Section 2: The Problem ── */}
          <section className="sect">
            <div className="sect-inner">
              <motion.span className="stag" {...fadeUp}>
                The Real Problem
              </motion.span>
              <motion.h2 {...staggerFadeUp(0.1)}>
                Your AI has no<br /><em>institutional memory.</em>
              </motion.h2>

              <motion.p className="fb-verticals-row-label" {...fadeUp}>
                Builders & Creators
              </motion.p>
              <div className="fb-verticals-grid">
                {buildersPersonas.map((v, i) => (
                  <motion.div
                    key={v.id}
                    className="fb-vertical-card"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 + i * 0.1 }}
                  >
                    <span className="fb-vertical-icon">{PERSONA_ICONS[v.icon]}</span>
                    <p className="fb-vertical-headline">{v.headline}</p>
                    <p className="fb-vertical-body">{v.body}</p>
                  </motion.div>
                ))}
              </div>

              <motion.p className="fb-verticals-row-label fb-verticals-row-label--second" {...fadeUp}>
                Operators
              </motion.p>
              <div className="fb-verticals-grid">
                {operatorsPersonas.map((v, i) => (
                  <motion.div
                    key={v.id}
                    className="fb-vertical-card"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 + i * 0.1 }}
                  >
                    <span className="fb-vertical-icon">{PERSONA_ICONS[v.icon]}</span>
                    <p className="fb-vertical-headline">{v.headline}</p>
                    <p className="fb-vertical-body">{v.body}</p>
                  </motion.div>
                ))}
              </div>

              <motion.p className="fb-unifying-line" {...staggerFadeUp(0.5)}>
                The model isn't the problem. <em>Memory is.</em>
              </motion.p>
            </div>
          </section>

          {/* ── Section: Scattered by Design ── NEW */}
          <section className="sect">
            <div className="sect-inner">
              <motion.span className="stag" {...fadeUp}>
                Scattered by Design
              </motion.span>
              <motion.h2 {...staggerFadeUp(0.1)}>
                Your knowledge lives everywhere —<br />
                <em>except where your agents can reach it.</em>
              </motion.h2>

              <div className="fb-scattered-grid">
                {scatteredCards.map((card, i) => (
                  <motion.div
                    key={card.id}
                    className={`fb-scattered-card ${card.cls}`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 + i * 0.12 }}
                  >
                    <p className="fb-scattered-headline">{card.headline}</p>
                    <p className="fb-scattered-body">{card.body}</p>
                    {card.variant === 'logos' && (
                      <div className="fb-scattered-logo-wrap">
                        <ToolLogoStrip />
                      </div>
                    )}
                    {card.variant === 'stat' && (
                      <div>
                        <div className="fb-scattered-stat">{card.stat}</div>
                        <div className="fb-scattered-stat-label">{card.statLabel}</div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              <motion.p className="fb-scattered-closer" {...staggerFadeUp(0.5)}>
                {"// it's not just your AI that forgets. your tools never knew in the first place."}
              </motion.p>
            </div>
          </section>

          {/* ── Section 3: Why It Breaks ── */}
          <section className="sect">
            <div className="sect-inner fb-breaks-inner">
              <motion.span className="stag" {...fadeUp}>
                Why It Happens
              </motion.span>
              <motion.h2 {...staggerFadeUp(0.1)}>
                Agents are stateless<br />by design.
              </motion.h2>

              <motion.div className="fb-breaks-prose" {...staggerFadeUp(0.2)}>
                <p>
                  <strong>RAG is archaeology.</strong> You're digging through documents hoping to find understanding. <strong>Fine-tuning is a photograph</strong> — a frozen moment, aging the second it's taken. <strong>Session history is a sticky note</strong> on a whiteboard that gets wiped every night.
                </p>
                <p>
                  None of these are memory. They're workarounds. And workarounds compound — more tokens, more hallucinations, more drift.
                </p>
              </motion.div>

              <motion.div className="fb-consequence-chips" {...staggerFadeUp(0.35)}>
                <span className="fb-consequence-chip fb-chip--up">↑ token spend per interaction</span>
                <span className="fb-consequence-chip fb-chip--up">↑ hallucination rate on domain knowledge</span>
                <span className="fb-consequence-chip fb-chip--down">↓ context relevance over time</span>
              </motion.div>
            </div>
          </section>

          {/* ── Section 4: The Fix ── */}
          <section className="sect">
            <div className="sect-inner">
              <motion.span className="stag" {...fadeUp}>
                The Fix
              </motion.span>
              <motion.h2 {...staggerFadeUp(0.1)}>
                Persistent memory.<br />Not a workaround.
              </motion.h2>

              <div className="fb-fix-grid">
                {fixCards.map((card, i) => (
                  <motion.div
                    key={card.id}
                    className={`fb-fix-card ${card.cls}`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 + i * 0.12 }}
                  >
                    <p className="fb-fix-headline">{card.headline}</p>
                    <p className="fb-fix-body">{card.body}</p>
                  </motion.div>
                ))}
              </div>

              <motion.p className="fb-fix-oneliner" {...staggerFadeUp(0.5)}>
                Drop it in alongside your existing stack. No rebuild. No retraining.
              </motion.p>
            </div>
          </section>

          {/* ── Section 5: Architecture (keep as-is) ── */}
          <section className="sect">
            <div className="sect-inner">
              <motion.span className="stag" {...fadeUp}>
                Architecture
              </motion.span>
              <motion.h2 {...staggerFadeUp(0.1)}>
                The layer underneath.
              </motion.h2>

              <motion.div
                className="fb-arch-wrap"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
              >
                <ArchitectureDiagram />
              </motion.div>

              <div className="fb-snippet-wrap">
                <GlassSnippet
                  code={architectureCode}
                  label="Drop in alongside your existing agent. No rebuild required."
                  delay={0.2}
                />
              </div>
            </div>
          </section>

          {/* ── Section 6: Why xysq Wins ── */}
          <section className="sect">
            <div className="sect-inner">
              <motion.span className="stag" {...fadeUp}>
                The Difference
              </motion.span>
              <motion.h2 {...staggerFadeUp(0.1)}>
                Built for memory.<br />Measured by what matters.
              </motion.h2>

              <div className="fb-metrics-grid">
                {metricCards.map((card, i) => (
                  <motion.div
                    key={card.id}
                    className={`fb-metric-card ${card.cls}`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 + i * 0.12 }}
                  >
                    <p className="fb-metric-headline">{card.headline}</p>
                    <p className="fb-metric-body">{card.body}</p>
                  </motion.div>
                ))}
              </div>

              <motion.p className="fb-metric-provocation" {...staggerFadeUp(0.5)}>
                {'// the metric that matters most: your agents stop forgetting'}
              </motion.p>
            </div>
          </section>

          {/* ── Section 7: Contact form ── */}
          <div id="fb-contact">
            <Waitlist />
          </div>

          <Footer />
        </div>
      </PageTransition>
    </>
  )
}
