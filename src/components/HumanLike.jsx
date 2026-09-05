import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import '../styles/human-like.css'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay },
})

// a two-line exchange, the shape every example here is built from
function Thread({ user, agent }) {
  return (
    <div className="hl-thread">
      <p className="hl-bub is-user">{user}</p>
      <p className="hl-bub is-agent">{agent}</p>
    </div>
  )
}

// reliable: the answer, the line it came from, and the value it replaced
function ReliableExample() {
  return (
    <div className="hl-g">
      <Thread user="Is the refund window 14 or 30 days?" agent="30 days, since Sept 1. It was 14 before that." />
      <ul className="hl-srcs">
        <li><span className="hl-src-n">[1]</span> Refund policy v2, line 4 <Check size={12} strokeWidth={2.6} className="hl-check" aria-hidden="true" /></li>
        <li className="is-closed"><span className="hl-src-n">[1]</span> <s>14 days</s> closed Sept 1, Refund policy v1</li>
      </ul>
      <p className="hl-tag">one answer, one source, the old value closed</p>
    </div>
  )
}

// consistent: the same rule, on a different day and a different channel
function ConsistentExample() {
  return (
    <div className="hl-g hl-g--pair">
      <div>
        <p className="hl-tag">Monday, WhatsApp</p>
        <Thread user="Can I get 10% off this one?" agent="No discounts on rare pieces. I can hold it for you for 24 hours, though." />
      </div>
      <div>
        <p className="hl-tag">Friday, email</p>
        <Thread user="Any chance of a deal on the Argentina 2022?" agent="No discounts on rare pieces. I can hold it till Saturday night if that helps." />
      </div>
    </div>
  )
}

const LEARNED = [
  ['tone', 'casual, lowercase'],
  ['prefers', 'short answers, no emojis'],
  ['“the drop”', 'the next launch, Oct 3'],
]

// human-like: your register, your words, and a no when a no is what helps
function HumanExample() {
  return (
    <div className="hl-g">
      <Thread user="yo can we ship the drop page tonight" agent="no. checkout still fails on split payments. fix that first, then ship." />
      <ul className="hl-rows hl-rows--words">
        {LEARNED.map(([k, v]) => (
          <li key={k}><span className="hl-term">{k}</span><span className="hl-row-src">{v}</span></li>
        ))}
      </ul>
      <p className="hl-tag">your tone, your words, and a no with the reason</p>
    </div>
  )
}

// one part per word in the headline, in the order the headline cycles
const PARTS = [
  {
    n: '01', label: 'Reliable', Example: ReliableExample,
    title: 'Every answer has a source.',
    body: 'Facts come from your documents, and each one points at the line it came from. When two disagree, the newer one wins and the older one closes with a date. Your agent never serves both, and never invents a third.',
  },
  {
    n: '02', label: 'Behaviourally consistent', Example: ConsistentExample,
    title: 'The same agent on Monday and on Friday.',
    body: 'Tone, rules and preferences are recorded once and applied every session, on every channel. No drift between a good day and a bad one, and no explaining yourself again after a restart.',
  },
  {
    n: '03', label: 'Human-like', Example: HumanExample,
    title: 'It knows you, and it can say no.',
    body: 'It writes in your register, uses your words, and remembers what you prefer. And it pushes back when that is what helps, because helping is not pleasing.',
  },
]

export default function HumanLike() {
  return (
    <section className="hl-section" id="human-like">
      <div className="hl-inner">
        <motion.h2 className="hl-headline" {...fade(0)}>
          Reliable. Consistent. <em>Human-like.</em>
        </motion.h2>
        <motion.p className="hl-deck" {...fade(0.08)}>
          The context layer learns behavioural nuances, not just static data.
        </motion.p>

        <div className="hl-parts">
          {PARTS.map(({ n, label, title, body, Example }, i) => (
            <motion.div key={n} className="hl-part" {...fade(0.1 + i * 0.06)}>
              <div className="hl-part-copy">
                <p className="hl-part-label"><span>{n}</span>{label}</p>
                <h3 className="hl-part-title">{title}</h3>
                <p className="hl-part-body">{body}</p>
              </div>
              <Example />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
