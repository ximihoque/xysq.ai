import { motion } from 'framer-motion'
import '../styles/three-layers.css'

const cards = [
  {
    tag: 'personal vault',
    headline: 'Your memory.',
    body: "Your context, preferences, decisions — carried across every agent you use. You don't re-explain yourself. You build on yourself.",
  },
  {
    tag: 'team vault',
    headline: 'Shared knowledge.',
    body: "A shared vault. Decisions stay when people leave. New members ramp instantly. The team doesn't start over when people change.",
  },
  {
    tag: 'knowledge base',
    headline: 'Sources that compound.',
    body: 'Ingest links, quotes, code, transcripts. Auto-indexed, auto-synthesized. Conversations become memories. Memories become knowledge.',
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function ThreeLayers() {
  return (
    <section className="sect" id="three-layers">
      <div className="sect-inner">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <span className="stag">The Platform</span>
          <h2>Three layers. <em>One</em> you.</h2>
        </motion.div>

        <motion.div
          className="tl-grid"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          {cards.map((card) => (
            <motion.div
              key={card.tag}
              className="tl-card"
              variants={item}
              whileHover={{
                y: -4,
                borderColor: 'rgba(0,229,200,0.35)',
                transition: { type: 'spring', stiffness: 300, damping: 20 },
              }}
            >
              <span className="tl-tag">{card.tag}</span>
              <p className="tl-headline">{card.headline}</p>
              <p className="tl-body">{card.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
