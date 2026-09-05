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
      <p className="hl-tag">one source, old value closed</p>
    </div>
  )
}

// consistent: the same request run three times. the steps differ from run
// to run; the outcome does not. the outcome sits under each run in teal so
// the eye lands on the one thing that is identical
const RUNS = [
  ['run 1, Mon', ['read order', 'check refund policy', 'verify day 22 of 30']],
  ['run 2, Wed', ['check refund policy', 'read order', 'verify day 22 of 30']],
  ['run 3, Fri', ['read customer history', 'read order', 'check refund policy', 'verify day 22 of 30']],
]
const OUTCOME = 'refunded, 30-day window'

function ConsistentExample() {
  return (
    <div className="hl-g">
      <p className="hl-tag">refund request #4821, run three times</p>
      <div className="hl-runs">
        {RUNS.map(([head, steps]) => (
          <div key={head} className="hl-run">
            <p className="hl-tag">{head}</p>
            <ol className="hl-steps">{steps.map((st) => <li key={st}>{st}</li>)}</ol>
            <p className="hl-outcome">{OUTCOME}</p>
          </div>
        ))}
      </div>
      <p className="hl-tag">steps vary. outcome does not.</p>
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
      <p className="hl-tag">a no, with the reason</p>
    </div>
  )
}

// one part per word in the headline, in the order the headline cycles
const PARTS = [
  {
    n: '01', label: 'Reliable', Example: ReliableExample,
    title: 'Right, and provable.',
    body: 'Every fact has a source line. When facts conflict, the newer one wins and the old one closes.',
  },
  {
    n: '02', label: 'Behaviourally consistent', Example: ConsistentExample,
    title: 'Same outcome, every run.',
    body: 'Steps may vary; the outcome does not. Rules may change; the outcome follows them, in every run. Ask it ten times and it lands in the same place, because what counts as done lives in the context layer, not in the run.',
  },
  {
    n: '03', label: 'Human-like', Example: HumanExample,
    title: 'Knows you. Can say no.',
    body: 'Your tone, your words, your preferences, and pushback when that is what helps.',
  },
]

export default function HumanLike() {
  return (
    <section className="hl-section" id="human-like">
      <div className="hl-inner">
        <motion.h2 className="hl-headline" {...fade(0)}>
          Reliable. Consistent. <em>Human-like.</em>
        </motion.h2>

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
