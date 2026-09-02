import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Scenario from './hero/Scenario'
import '../styles/faq.css'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay },
})

// the questions a call with us actually opens on, answered the way we'd say
// them out loud. one idea per answer, no more than four sentences.
const QA = [
  {
    q: 'What do I actually get?',
    a: 'Two things, and you pick. Ready-made agents for support and growth that run on our context layer, or the layer alone under an agent you already have. The layer is the product either way; the agents are the fastest way to see it work.',
  },
  {
    q: 'How is this different from a vector database?',
    a: 'A vector store hands your agent the five chunks that look most like the question. We keep one page per topic, written from your documents, and every line on it points back at the sentence it came from. When two facts disagree, the old one closes instead of sitting next to the new one. One answer, with a source, not five candidates.',
  },
  {
    q: 'Can I see why the agent said something?',
    a: 'Yes, every time. Each answer carries the lines it was built from, and you can open the original document from there. In the demos above, that is the panel beside the phone.',
  },
  {
    q: 'What happens when a fact changes?',
    a: 'The new fact takes its place on the page and the old one is closed, not deleted. You can still read it, and see who changed it and when. Every answer after that uses the new one.',
  },
  {
    q: 'Who can see what?',
    a: 'You decide, per person and per agent. An agent only reads what it has been given, and an answer never crosses that line. What was shared, and with whom, is on record.',
  },
  {
    q: 'Does it work with what we already run?',
    a: 'Yes. Shopify, Gmail, WhatsApp, Instagram, Slack and the rest of the row above. If you already have an agent, point it at the layer and it keeps its memory there. No rewrite.',
  },
  {
    q: 'Is my data used to train models?',
    a: 'No. Your documents and conversations stay yours and are never used to train anything, ours or anyone else’s.',
  },
  {
    q: 'How long does it take to get started?',
    a: 'An agent on our stack takes minutes. Leave your number above and we set it up with you on WhatsApp. Bringing your own agent takes about an afternoon, and most of that is deciding what it should be allowed to read.',
  },
  {
    q: 'What does it cost?',
    a: 'Free to start. For governance, a deployment inside your own environment, or real volume, book a call and we’ll price it with you.',
    cta: { label: 'Book a call', href: 'https://calendly.com/hoque-ximi/30min' },
  },
]

export default function Faq() {
  const [i, setI] = useState(0)
  const cur = QA[i]

  return (
    <section className="faq-section" id="faq">
      <div className="faq-inner">
        <motion.h2 className="faq-headline" {...fade(0)}>
          Questions we get asked.
        </motion.h2>

        {/* same shape as the demos: the list on the left picks, the right
            shows. the list is the Scenario column, so it reads the same. on
            a phone the right panel is hidden and the column's own blurb slot
            carries the answer, so it opens under the question you tapped. */}
        <motion.div className="faq-split" {...fade(0.1)}>
          <Scenario label="FAQ" items={QA.map(({ q, a }) => ({ title: q, blurb: a }))} active={i} onPick={setI} />
          <div className="faq-answer">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
              >
                <h3 className="faq-q">{cur.q}</h3>
                <p className="faq-a">{cur.a}</p>
                {cur.cta && (
                  <a className="faq-cta" href={cur.cta.href}>
                    {cur.cta.label}
                    <span className="faq-cta-arrow">→</span>
                  </a>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
