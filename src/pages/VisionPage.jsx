import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import SEO, { breadcrumbSchema } from '../components/SEO'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import PageTransition from '../components/PageTransition'
import NeuralBackground from '../components/NeuralBackground'
import '../styles/vision-page.css'

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.65, ease: 'easeOut' },
}

const stagger = (i) => ({
  ...fadeUp,
  transition: { duration: 0.65, ease: 'easeOut', delay: i * 0.08 },
})

/* The three pillars of the page: Capture, Memory, Skills. */
const STAGES = [
  {
    num: '01',
    tag: 'Consent-first, always',
    title: 'Capture',
    body:
      'Deep integrations with the tools your product and engineering teams already use (Cursor, Claude Code, GitHub, Linear, Slack, Notion, Granola) and the AI sessions your team runs every day. Bidirectional from day one. Nothing flows in by default: every source, scope, and agent is something you turn on.',
  },
  {
    num: '02',
    tag: 'The living knowledge graph',
    title: 'Memory [core]',
    body:
      'Captured signal organises itself into one knowledge graph that decides what to keep, how the team works, and what things mean. Three kinds of memory, held together. Episodic: what happened, the decisions and threads. Procedural: how the team actually works, its standards and patterns. Semantic: what things mean, the shared vocabulary. Contradiction detection, decay, and humans in the loop on escalations keep it the truthy source every agent reads from.',
  },
  {
    num: '03',
    tag: 'Born from your knowledge',
    title: 'Skills',
    body:
      'Repeated work becomes reusable skills, generated from the company’s own memory. Every decision and correction makes the graph more correct; every skill makes the next one easier to generate. The longer your team works, the more the system compounds, and humans and agents both ship from the same reality.',
  },
]

const PERSONAS = [
  {
    label: 'For engineering leaders',
    line: 'New joiners reach productive in two weeks, not six. Internal AI agents stop hallucinating company context.',
  },
  {
    label: 'For product and operations',
    line: 'Cross-team signals reach the right owner in days. Roadmap contradictions surface before they cost a launch.',
  },
  {
    label: 'For the C-suite',
    line: 'Strategy decided at the all-hands reaches the engineer writing the code that week. Not next quarter.',
  },
]

const USE_CASES = [
  {
    title: 'Skills that compound',
    body:
      'Repeated work becomes a reusable skill, generated from your team’s own memory. The next onboarding doc, review, or spec writes itself, to your standards, not a generic template.',
  },
  {
    title: 'Agent-readable memory',
    body:
      'Your existing AI tools get the truthy source for free. No new app to learn. Claude, Cursor, Copilot, your internal agents, all smarter overnight.',
  },
  {
    title: 'Audit and provenance',
    body:
      'Every claim links to its source. Every action is timestamped and attributed. Tamper-evident, exportable, audit-ready from day one.',
  },
]

export default function VisionPage() {
  return (
    <PageTransition>
      <SEO
        title="Vision"
        path="/vision"
        description="xysq is the shared knowledge layer for AI-native teams: capture, a living memory graph, and skills that compound. The foundational block companies build on."
        schema={[
          breadcrumbSchema([
            { name: 'Home', item: '/' },
            { name: 'Vision', item: '/vision' },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'AboutPage',
            url: 'https://xysq.ai/vision',
            name: 'Vision · xysq.ai',
            description:
              'xysq is the shared knowledge layer for AI-native teams: a path from consent-first capture to a living memory graph and skills that compound, born from your company’s own knowledge.',
            isPartOf: {
              '@type': 'WebSite',
              name: 'xysq.ai',
              url: 'https://xysq.ai',
            },
            about: {
              '@type': 'Organization',
              name: 'xysq',
              url: 'https://xysq.ai',
              description:
                'Shared knowledge layer for AI-native teams. Consent-first capture, a living memory graph, and skills generated from a company’s own knowledge, across the tools and AI agents teams already use.',
            },
          },
        ]}
      />
      <NeuralBackground />
      <Nav />

      {/* ─────────────────────────── HERO ─────────────────────────── */}
      <section className="vision-hero">
        <motion.div {...fadeUp}>
          <Link to="/" className="vision-back">
            <ArrowRight size={12} style={{ transform: 'rotate(180deg)' }} />
            <span>Back to xysq.ai</span>
          </Link>
        </motion.div>

        <motion.span className="vision-eyebrow" {...stagger(1)}>
          The vision
        </motion.span>

        <motion.h1 className="vision-h1" {...stagger(2)}>
          The shared knowledge layer for AI-native&nbsp;teams.
        </motion.h1>

        <motion.p className="vision-lede" {...stagger(3)}>
          A company runs on shared context: what it knows, what it decided, why it chose this over that. That context now forms inside AI tools and scatters across them. xysq is the layer that holds it, shared on your team&apos;s terms.
        </motion.p>

        <motion.p className="vision-staged" {...stagger(4)}>
          Capture. Memory. Skills. The foundational block for AI-native companies.
        </motion.p>
      </section>

      {/* ─────────────────────── THE PROBLEM ─────────────────────── */}
      <section className="vision-sect vision-sect--accent">
        <div className="vision-sect-inner">
          <motion.span className="vision-eyebrow" {...fadeUp}>
            The problem
          </motion.span>
          <motion.h2 className="vision-h2" {...stagger(1)}>
            Working knowledge is split across <em>three&nbsp;places</em>, and
            nothing holds all three.
          </motion.h2>

          <motion.p className="vision-prose" {...stagger(2)}>
            AI sessions hold what your team is figuring out, in Cursor, Claude
            Code, ChatGPT. Docs and specs hold what got written down, in Notion,
            Google Docs, READMEs. Communication holds what got decided, in Slack,
            Linear, email. The information already exists. It is just not
            connected, current, or trusted across all three.
          </motion.p>

          <motion.p className="vision-prose" {...stagger(3)}>
            No teammate and no AI tool ever sees all three. So the team re-asks,
            re-derives, and contradicts itself. CEOs say things at all-hands that
            engineers never internalise. Support sees a pattern that product
            hears about from sales after the renewal closes. Every AI tool you
            add does it faster, not slower.
          </motion.p>

          <motion.p className="vision-prose vision-prose--lead" {...stagger(4)}>
            The teams that close this gap are shipping twice as much. The rest
            lose roughly 5.3 hours a week per person recreating work that already
            exists.
          </motion.p>
        </div>
      </section>

      {/* ─────────────────────── THE THREE PILLARS ─────────────────────── */}
      <section className="vision-sect">
        <div className="vision-sect-inner">
          <motion.span className="vision-eyebrow" {...fadeUp}>
            The path
          </motion.span>
          <motion.h2 className="vision-h2" {...stagger(1)}>
            Three pillars. One shared&nbsp;brain.
          </motion.h2>
          <motion.p className="vision-prose vision-prose--narrow" {...stagger(2)}>
            We build the bedrock first. Capture earns trust, memory earns the
            graph, skills earn the compounding. The order matters.
          </motion.p>

          <div className="vision-stages">
            {STAGES.map((s, i) => (
              <motion.div
                key={s.num}
                className="vision-stage"
                {...stagger(i + 2)}
              >
                <div className="vision-stage-head">
                  <span className="vision-stage-num">{s.num}</span>
                  <span className="vision-stage-tag">{s.tag}</span>
                </div>
                <h3 className="vision-stage-title">{s.title}</h3>
                <p className="vision-stage-body">{s.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────── WHO IT'S FOR ─────────────────────── */}
      <section className="vision-sect vision-sect--accent">
        <div className="vision-sect-inner">
          <motion.span className="vision-eyebrow" {...fadeUp}>
            Who it is for
          </motion.span>
          <motion.h2 className="vision-h2" {...stagger(1)}>
            One product. Three&nbsp;altitudes.
          </motion.h2>

          <div className="vision-personas">
            {PERSONAS.map((p, i) => (
              <motion.div key={p.label} className="vision-persona" {...stagger(i + 2)}>
                <span className="vision-persona-label">{p.label}</span>
                <p>{p.line}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────── USE CASES ─────────────────────── */}
      <section className="vision-sect">
        <div className="vision-sect-inner">
          <motion.span className="vision-eyebrow" {...fadeUp}>
            What it does
          </motion.span>
          <motion.h2 className="vision-h2" {...stagger(1)}>
            What it does today.
          </motion.h2>

          <div className="vision-usecases">
            {USE_CASES.map((u, i) => (
              <motion.div key={u.title} className="vision-usecase" {...stagger(i + 2)}>
                <h3>{u.title}</h3>
                <p>{u.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────── WHY NOW ─────────────────────── */}
      <section className="vision-sect vision-sect--accent">
        <div className="vision-sect-inner">
          <motion.span className="vision-eyebrow" {...fadeUp}>
            Why now
          </motion.span>
          <motion.h2 className="vision-h2" {...stagger(1)}>
            The window opened in the last twelve&nbsp;months.
          </motion.h2>

          <div className="vision-why-grid">
            <motion.div className="vision-why" {...stagger(2)}>
              <span className="vision-why-num">01</span>
              <p>
                <strong>MCP standardised.</strong> A universal protocol for
                connecting agents to tools, one that did not exist eighteen
                months ago. Connectivity is finally a solved layer.
              </p>
            </motion.div>
            <motion.div className="vision-why" {...stagger(3)}>
              <span className="vision-why-num">02</span>
              <p>
                <strong>Agents are everywhere.</strong> 81% of enterprises use
                three or more AI tools. 37% use five or more in production. Each
                one needs a memory layer. None of them have it.
              </p>
            </motion.div>
            <motion.div className="vision-why" {...stagger(4)}>
              <span className="vision-why-num">03</span>
              <p>
                <strong>The category is proven.</strong> ChatGPT, Claude, and
                Gemini all shipped memory this year. The market is validating
                shared, persistent context in real time. The open question is
                who becomes the layer the agents depend on.
              </p>
            </motion.div>
            <motion.div className="vision-why" {...stagger(5)}>
              <span className="vision-why-num">04</span>
              <p>
                <strong>The cost of inaction has spiked.</strong> Teams that
                share context ship twice as much. Without it, ~5.3 hours a week
                per person goes to recreating work that already exists. The gap
                is now visible, measurable, and expensive.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─────────────────────── COMMITMENTS ─────────────────────── */}
      <section className="vision-sect">
        <div className="vision-sect-inner">
          <motion.span className="vision-eyebrow" {...fadeUp}>
            What we will not compromise
          </motion.span>
          <motion.h2 className="vision-h2" {...stagger(1)}>
            Commitments.
          </motion.h2>

          <div className="vision-commitments">
            <motion.div className="vision-commitment" {...stagger(2)}>
              <h4>Consent first, always.</h4>
              <p>
                The user controls the data. Per-source, per-scope, per-agent.
                Built into the foundation, not bolted on as a feature.
              </p>
            </motion.div>
            <motion.div className="vision-commitment" {...stagger(3)}>
              <h4>Provenance on every claim.</h4>
              <p>
                Every fact links to its source. Every action is timestamped and
                attributed. Auditable from day one. The compliance moat is the
                trust moat.
              </p>
            </motion.div>
            <motion.div className="vision-commitment" {...stagger(4)}>
              <h4>Humans in the loop on the things that matter.</h4>
              <p>
                Tiered autonomy. We nudge before we act. Policy, security, legal
                escalations always require human judgment. The audit log is
                tamper-evident.
              </p>
            </motion.div>
            <motion.div className="vision-commitment" {...stagger(5)}>
              <h4>Neutral across the tools you already use.</h4>
              <p>
                We are not a wiki. We do not compete with Notion or Confluence.
                We make them better. Our business model rewards being neutral
                across them, not capturing you on a surface.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─────────────────────── LONG VIEW ─────────────────────── */}
      <section className="vision-longview">
        <motion.blockquote className="vision-quote" {...fadeUp}>
          People will change.<br />
          Teams will evolve.<br />
          Organisations will grow.<br /><br />
          Knowledge should persist through all of it.
        </motion.blockquote>

        <motion.p className="vision-longview-body" {...stagger(1)}>
          xysq is building the shared knowledge layer, the foundational block
          that carries individuals, teams, and entire organisations forward
          across time. The substrate that makes a company legible to itself,
          and to every AI tool it has deployed.
        </motion.p>
      </section>

      {/* ─────────────────────── INVESTOR / PARTNER CTA ─────────────────────── */}
      <section className="vision-sect vision-sect--accent vision-cta-sect">
        <div className="vision-sect-inner vision-cta-inner">
          <motion.h2 className="vision-h2" {...fadeUp}>
            Building this with us.
          </motion.h2>
          <motion.p className="vision-prose vision-prose--narrow" {...stagger(1)}>
            Investors, design partners, and future operators who want to see the
            staged path in detail can book a 25-minute call. We share the deck
            ahead of the conversation.
          </motion.p>
          <motion.div className="vision-cta-row" {...stagger(2)}>
            <a
              href="https://calendly.com/hoque-ximi/30min"
              className="vision-cta-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a call
              <ArrowUpRight size={14} strokeWidth={2} />
            </a>
            <Link to="/" className="vision-cta-secondary">
              See what is live today
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </PageTransition>
  )
}
