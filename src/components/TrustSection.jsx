import { motion } from 'framer-motion'
import {
  GitBranch, RefreshCw, Lock,
  Quote, FileText, Calendar, Archive, Eye, Undo2, UserCheck,
} from 'lucide-react'
import { handleHashLink } from '../lib/hashLink'
import '../styles/trust-section.css'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay },
})

/* the three questions someone has to answer before they let an agent
   near real work. one short answer each, specifics demoted to chips:
   the paragraphs these replaced ran to five lines and nobody reads five
   lines three times across. each answer is something the engine already
   does, so nothing here is a promise we can't back. */
const questions = [
  {
    icon: GitBranch,
    q: 'Where did it get that?',
    a: 'Every fact keeps the sentence it came from. If the sentence is not in the source, it never becomes a fact.',
    chips: [
      { icon: Quote, label: 'Verbatim quote' },
      { icon: FileText, label: 'Source file' },
      { icon: Calendar, label: 'Date' },
    ],
  },
  {
    icon: RefreshCw,
    q: 'Is it still true?',
    a: 'When a new fact contradicts an old one, the old one closes and stops being served.',
    chips: [
      { icon: Archive, label: 'Nothing deleted' },
      { icon: Eye, label: 'See what changed' },
    ],
  },
  {
    icon: Lock,
    q: 'Who can see it, and who changed it?',
    a: 'You grant access per graph, per page, or per person.',
    chips: [
      { icon: Undo2, label: 'Revoke anytime' },
      { icon: UserCheck, label: 'You approve agent shares' },
    ],
  },
]

export default function TrustSection() {
  return (
    <section className="tr-section" id="trust">
      <div className="tr-inner">
        <motion.h2 className="tr-headline" {...fade(0)}>
          Three questions your AI&rsquo;s{' '}
          <span className="tr-hl">context</span> has to answer.
        </motion.h2>

        <motion.p className="tr-deck" {...fade(0.08)}>
          Nobody asks them about a chatbot. Everybody asks them about an agent
          with write access.
        </motion.p>

        <div className="tr-items">
          {questions.map(({ icon: Icon, q, a, chips }, i) => (
            <motion.div key={q} className="tr-item" {...fade(0.14 + i * 0.08)}>
              <span className="tr-item-q">
                <Icon size={14} strokeWidth={1.8} aria-hidden="true" />
                {q}
              </span>
              <span className="tr-item-a">{a}</span>
              <span className="tr-item-chips">
                {chips.map(({ icon: ChipIcon, label }) => (
                  <span key={label} className="tr-chip">
                    <ChipIcon size={10} strokeWidth={1.9} aria-hidden="true" />
                    {label}
                  </span>
                ))}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.p className="tr-floor" {...fade(0.36)}>
          An agent gets the access you gave it and nothing else.
        </motion.p>

        <motion.a
          href="/#engine"
          className="tr-cta"
          onClick={(e) => handleHashLink(e, '/#engine', '/')}
          {...fade(0.42)}
          whileHover={{ x: 2 }}
        >
          How the engine does this
          <span className="tr-cta-arrow">→</span>
        </motion.a>
      </div>
    </section>
  )
}
