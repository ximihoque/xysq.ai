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

// consistent: one task run three times takes the same path, step for step;
// a different task takes the same strategy. shown as run logs, not chat,
// because the point is the steps, not the words
const REFUND_PATH = ['read order', 'check refund policy', 'verify 30-day window', 'approve, notify']
const EXCHANGE_PATH = ['read order', 'check exchange policy', 'verify 30-day window', 'approve, notify']
const RUNS = [['run 1', 'Mon'], ['run 2', 'Wed'], ['run 3', 'Fri']]

function Run({ head, steps, fresh }) {
  return (
    <div className={`hl-run ${fresh ? 'is-new' : ''}`}>
      <p className="hl-tag">{head}</p>
      <ol className="hl-steps">{steps.map((s) => <li key={s}>{s}</li>)}</ol>
    </div>
  )
}

function ConsistentExample() {
  return (
    <div className="hl-g">
      <p className="hl-tag">refund request #4821, run three times</p>
      <div className="hl-runs">
        {RUNS.map(([r, d]) => <Run key={r} head={`${r}, ${d}`} steps={REFUND_PATH} />)}
        <Run head="new task, exchange" steps={EXCHANGE_PATH} fresh />
      </div>
      <p className="hl-tag">same task, same path. new task, same strategy.</p>
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
    title: 'Same task, same path, every run.',
    body: 'Same steps, same tool calls, same decision, run after run. A new task gets the same strategy, not a new invention. The steps come from your playbook in the context layer, so the model does not improvise them.',
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
