import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import PageTransition from '../components/PageTransition'
import NeuralBackground from '../components/NeuralBackground'
import '../styles/vision-page.css'

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, ease: 'easeOut' },
}

const stagger = (i) => ({
  ...fadeUp,
  transition: { duration: 0.7, ease: 'easeOut', delay: i * 0.12 },
})

const PILLARS = [
  {
    num: '01',
    title: 'Seen. Heard. Felt.',
    body: 'We are multimodal at our core, not as an add-on. We read your face, your voice, your words, and your emotional state simultaneously, building a rich, real-time understanding of you that no single-channel system ever could.',
    tag: 'Multimodal in DNA',
  },
  {
    num: '02',
    title: 'Lifelong Memory',
    body: 'Every conversation, every preference, every life moment, remembered and built upon forever. Not session memory. Not day memory. A lifetime of context that compounds, so every interaction starts where the last one left off. Seen, heard, and felt in full.',
    tag: 'Persistent · Contextual · Growing',
  },
  {
    num: '03',
    title: 'One Universal Agent. Proactive.',
    body: "A single intelligent layer across every platform: banking, healthcare, travel, support. We don't just respond; we anticipate. We take justified, proactive action on your behalf before you even ask, because we already know you. Seen, heard, and felt, across every domain.",
    tag: 'Universal · Proactive · You First',
  },
  {
    num: '04',
    title: 'The Personality Layer',
    body: "The platform provides the processed context: who you are, what you're experiencing. Users and businesses define how agents respond to it. You set your preferences. A business configures their agent's tone, escalation, and behaviour. The what is ours. The how is yours.",
    tag: 'User-Owned · Business-Configured · Yours',
  },
]

const DOMAINS = [
  'Customer Support',
  'Banking & Finance',
  'Healthcare',
  'Travel & Hospitality',
  'Personal Conversations',
  'Insurance',
  'Education',
  'Retail & Commerce',
  'Mental Wellness',
  'Government Services',
  'Legal Assistance',
  'HR & Employment',
]

export default function VisionPage() {
  return (
    <PageTransition>
      <SEO
        title="The Vision"
        path="/vision"
        description="xysq's long-term vision: multimodal AI that sees, hears, and feels you. Lifelong memory, one universal agent, proactive intelligence across every domain."
      />
      <NeuralBackground />
      <Nav />

      {/* ── Section 1: Vision Hero ─────────────────────────── */}
      <section className="vision-hero">
        <motion.div {...fadeUp}>
          <Link to="/" className="vision-back">← Back to xysq.ai</Link>
        </motion.div>

        <motion.span className="stag" {...fadeUp} transition={{ duration: 0.7, ease: 'easeOut', delay: 0.05 }}>
          The Vision
        </motion.span>

        <motion.h1
          className="vision-h1"
          {...fadeUp}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
        >
          Seen. Heard. Felt.
        </motion.h1>

        <motion.p
          className="vision-sub"
          {...fadeUp}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.18 }}
        >
          This is where we&apos;re going.
        </motion.p>

        <motion.p
          className="vision-body"
          {...fadeUp}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.26 }}
        >
          xysq today is your memory layer — persistent, portable, consent-first. What follows is the
          full vision: AI that doesn&apos;t just remember you, but understands you completely.
        </motion.p>
      </section>

      {/* ── Section 2: Multimodal Pillars ─────────────────── */}
      <section className="sect" style={{ background: 'var(--bg2)' }}>
        <div className="sect-inner">
          <motion.span className="stag" {...fadeUp}>The Future</motion.span>
          <motion.h2 {...stagger(1)}>
            Four pillars. <em>One</em> you.
          </motion.h2>

          <div className="vision-pillars-grid">
            {PILLARS.map((p, i) => (
              <motion.div
                key={p.num}
                className="vision-pillar-card"
                {...stagger(i * 0.5)}
              >
                <span className="vision-coming-badge">Coming</span>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: 'var(--muted)', marginBottom: '8px', letterSpacing: '0.1em' }}>
                  {p.num}
                </div>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
                <span className="vision-pillar-tag">{p.tag}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 3: Digital Twin ───────────────────────── */}
      <section className="sect">
        <div className="sect-inner">
          <motion.span className="stag" {...fadeUp}>Digital Twin</motion.span>
          <motion.h2 {...stagger(1)}>A living portrait of you.</motion.h2>

          <motion.div className="vision-feature" {...stagger(2)}>
            <span className="vision-feature-tag">Consensual · Portable · Verified</span>
            <p>
              A consensual, living portrait of you. Continuously updated from every interaction,
              every modality, across every platform you allow. When an AI talks to you, it
              doesn&apos;t start from zero. Verified agents see who you are. Everyone else sees nothing.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Section 4: Context OS ─────────────────────────── */}
      <section className="sect" style={{ background: 'var(--bg2)' }}>
        <div className="sect-inner">
          <motion.span className="stag" {...fadeUp}>Context Engine</motion.span>
          <motion.h2 {...stagger(1)}>The operating system for context.</motion.h2>

          <motion.div className="vision-feature" {...stagger(2)}>
            <span className="vision-feature-tag">Proactive Injection · Pull API · Real-Time</span>
            <p>
              A de-multiplexer for everything you produce. Receives all sensory and behavioural
              inputs, ranks what matters, and proactively injects the right context at the right
              moment. Models can also pull deeper context via API when they need it. Cross-language.
              Real-time. Always on.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Section 5: 12 Domains ─────────────────────────── */}
      <section className="sect">
        <div className="sect-inner" style={{ textAlign: 'center' }}>
          <motion.span className="stag" {...fadeUp}>Coverage</motion.span>
          <motion.h2 {...stagger(1)}>One identity. Every domain.</motion.h2>
          <motion.p
            {...stagger(2)}
            style={{ color: 'var(--muted)', fontSize: '1rem', marginBottom: 0 }}
          >
            No resets.
          </motion.p>

          <div className="vision-domains">
            {DOMAINS.map((d, i) => (
              <motion.span
                key={d}
                className="vision-domain"
                {...stagger(i * 0.3)}
              >
                {d}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 6: The Long View ──────────────────────── */}
      <section className="vision-longview">
        <motion.blockquote
          className="vision-quote"
          {...fadeUp}
        >
          {`"People will change.\nTeams will evolve.\nOrganizations will grow.\n\nIdentity should persist through all of it."`}
        </motion.blockquote>


        <motion.p className="vision-longview-body" {...stagger(2)}>
          xysq is building the layer that carries not just individuals — but teams and entire
          organizations — forward across time.
        </motion.p>
      </section>

      {/* ── Section 7: CTA back home ──────────────────────── */}
      <section className="sect vision-cta">
        <div className="sect-inner">
          <motion.h2 {...fadeUp}>See what&apos;s live today.</motion.h2>
          <motion.div {...stagger(1)}>
            <Link to="/" className="vision-cta-btn">
              Explore xysq →
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </PageTransition>
  )
}
