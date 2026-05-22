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

/* The four-stage path — pillars of the page. */
const STAGES = [
  {
    num: '01',
    tag: 'Shipping now',
    title: 'Connectivity',
    body:
      'MCP-native bridges in two directions. We connect to the work tools your team already lives in — Slack, Granola, Notion, Confluence, Jira, Linear, Google Docs — and to the AI tools your team already uses — Claude, Cowork, ChatGPT, Cursor, Copilot, and your internal agents. Bidirectional from day one. We read history, keep it in sync, write back when it is time, and serve the same truthy source to every agent that asks.',
  },
  {
    num: '02',
    tag: 'First layer shipping',
    title: 'Memory + intelligence',
    body:
      'A living knowledge graph that organises itself. Contradiction detection, decay, behavioural signal — the trail of what people edit, search, ignore, promote. Humans in the loop on escalations. Plugs into Claude, Cowork, Cursor, Copilot, and your internal agents as the truthy source. Humans and agents work off the same reality.',
  },
  {
    num: '03',
    tag: 'Next',
    title: 'Actions',
    body:
      'Proactiveness is the product. xysq drafts the document, files it in the right folder, applies your standards. Routes the right notification to the right person. Raises the alarm early when a lateral conversation contradicts the current roadmap. Tiered autonomy with humans always in the loop where it matters.',
  },
  {
    num: '04',
    tag: 'The closed loop',
    title: 'Sync',
    body:
      'Engineering is always in sync with product. Strategy is always in sync with execution. Decisions made anywhere reach everyone who needs to know, in the form they need to act on. With full provenance, a transparent audit trail, and consent at every step.',
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
    title: 'Decision capture',
    body:
      'Decisions made in Slack and meetings become structured documents in your existing tools — drafted, filed, formatted to your standards.',
  },
  {
    title: 'Agent-readable memory',
    body:
      'Your existing AI tools get the truthy source for free. No new app to learn. Claude, Cursor, Copilot, your internal agents — all smarter overnight.',
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
        description="xysq is the AI operating system for companies — connectivity, memory, intelligence, actions. Closing the loop between strategy and execution."
        schema={[
          breadcrumbSchema([
            { name: 'Home', item: '/' },
            { name: 'Vision', item: '/vision' },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'AboutPage',
            url: 'https://xysq.ai/vision',
            name: 'Vision — xysq.ai',
            description:
              'xysq is the AI operating system for companies — a staged path from connectivity to memory, intelligence, and actions that closes the open loop between strategy and execution.',
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
                'Memory infrastructure and AI operating system for modern organizations. Connectivity, memory, intelligence, and actions across the tools and AI agents teams already use.',
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
          The AI operating system for&nbsp;companies.
        </motion.h1>

        <motion.p className="vision-lede" {...stagger(3)}>
          Every company runs as an open loop. Decisions happen in Slack threads, in meetings, in someone&apos;s head — and the right people find out weeks later, if at all. xysq closes that loop.
        </motion.p>

        <motion.p className="vision-staged" {...stagger(4)}>
          Connectivity. Memory. Intelligence. Actions. In that order.
        </motion.p>
      </section>

      {/* ─────────────────────── THE OPEN LOOP ─────────────────────── */}
      <section className="vision-sect vision-sect--accent">
        <div className="vision-sect-inner">
          <motion.span className="vision-eyebrow" {...fadeUp}>
            The problem
          </motion.span>
          <motion.h2 className="vision-h2" {...stagger(1)}>
            Companies are running as <em>open&nbsp;loops</em>.
          </motion.h2>

          <motion.p className="vision-prose" {...stagger(2)}>
            The information already exists. It lives in Slack threads, in Granola
            transcripts, in someone&apos;s head, in a half-written Notion page
            nobody finished. It is just not connected, structured, current, or
            trusted.
          </motion.p>

          <motion.p className="vision-prose" {...stagger(3)}>
            CEOs say things at all-hands that engineers do not internalise.
            Engineers learn things in Slack debates that PMs see two quarters
            later in NPS reports. Support sees a pattern that product hears about
            from sales after the renewal closes. The signal is always real-time.
            Nothing routes it.
          </motion.p>

          <motion.p className="vision-prose vision-prose--lead" {...stagger(4)}>
            The AI-native companies that have figured this out are shipping twice
            as much. The rest are losing time, decisions, and launches to the
            gap.
          </motion.p>
        </div>
      </section>

      {/* ─────────────────────── THE FOUR STAGES ─────────────────────── */}
      <section className="vision-sect">
        <div className="vision-sect-inner">
          <motion.span className="vision-eyebrow" {...fadeUp}>
            The path
          </motion.span>
          <motion.h2 className="vision-h2" {...stagger(1)}>
            Four stages. One closed&nbsp;loop.
          </motion.h2>
          <motion.p className="vision-prose vision-prose--narrow" {...stagger(2)}>
            We build the bedrock first. Trust earns the right to operate. The
            order matters.
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
            The first three jobs.
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
                connecting agents to tools — it did not exist eighteen months
                ago. Connectivity is finally a solved layer.
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
                <strong>The thesis is publicly endorsed.</strong> Y Combinator
                just put out a Request for Startups for the AI operating system
                for companies — the closed loop that flags when engineering is
                building the wrong thing. The capital is forming.
              </p>
            </motion.div>
            <motion.div className="vision-why" {...stagger(5)}>
              <span className="vision-why-num">04</span>
              <p>
                <strong>The cost of inaction has spiked.</strong> Companies
                running closed loops ship twice as much. The gap is now visible,
                measurable, and expensive.
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
                across them — not capturing you on a surface.
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
          xysq is building the memory layer — with an operating system around
          it — that carries individuals, teams, and entire organisations forward
          across time. The substrate that makes a company legible to itself —
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
            staged path in detail — book a 25-minute call. We share the deck
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
