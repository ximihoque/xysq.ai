import { motion } from 'framer-motion'
import { Ear, Scale, SlidersHorizontal, BookOpen, Check } from 'lucide-react'
import '../styles/human-like.css'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay },
})

// a two-line exchange, the shape every graphic here is built from
function Thread({ user, agent }) {
  return (
    <div className="hl-thread">
      <p className="hl-bub is-user">{user}</p>
      <p className="hl-bub is-agent">{agent}</p>
    </div>
  )
}

// the same fact, answered in the register the person used
function ToneGraphic() {
  return (
    <div className="hl-g hl-g--tone">
      <div>
        <p className="hl-tag">casual</p>
        <Thread user="yo did my order ship" agent="yep. went out tue, lands thu." />
      </div>
      <div>
        <p className="hl-tag">formal</p>
        <Thread user="Could you confirm dispatch?" agent="Dispatched Tuesday. Delivery is expected Thursday." />
      </div>
    </div>
  )
}

// helping is not pleasing: a no, with the reason
function StanceGraphic() {
  return (
    <div className="hl-g">
      <Thread
        user="Ship the refund flow tonight?"
        agent="No. Partial refunds and split payments both fail. Fix those two first, then ship."
      />
      <p className="hl-tag">said no, with the reason</p>
    </div>
  )
}

const PREFS = [
  ['Short answers', 'from 4 chats'],
  ['Metric units', 'told once'],
  ['No emojis', 'told once'],
  ['Summary on Mondays, 9 am', 'from calendar'],
]

function PrefsGraphic() {
  return (
    <div className="hl-g">
      <p className="hl-tag">preferences, learned</p>
      <ul className="hl-rows">
        {PREFS.map(([what, from]) => (
          <li key={what}>
            <Check size={13} strokeWidth={2.4} className="hl-check" aria-hidden="true" />
            <span className="hl-row-main">{what}</span>
            <span className="hl-row-src">{from}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

const WORDS = [
  ['the drop', 'the next launch, Oct 3'],
  ['the big one', 'the Acme renewal, $180k'],
  ['Q3 deck', 'the board deck, Sept 12'],
  ['PP', 'Pines & Pines, wholesale account'],
]

function VocabGraphic() {
  return (
    <div className="hl-g">
      <p className="hl-tag">vocabulary, yours</p>
      <ul className="hl-rows hl-rows--words">
        {WORDS.map(([term, means]) => (
          <li key={term}>
            <span className="hl-term">{term}</span>
            <span className="hl-row-src">{means}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

// four behaviours a conversational agent picks up from the layer, in the
// order they show up in a real relationship
const CARDS = [
  {
    icon: Ear, label: 'Learning tone', Graphic: ToneGraphic,
    body: 'How you write gets remembered, short and terse or long and warm. Your agent answers in that register, and still does next week.',
  },
  {
    icon: Scale, label: 'Setting tone', Graphic: StanceGraphic,
    body: 'What you need from an agent is on record, not what pleases you. So your agent can push back: when the answer is no, it says no, and says why.',
  },
  {
    icon: SlidersHorizontal, label: 'Understanding preferences', Graphic: PrefsGraphic,
    body: 'Say it once: the length, the units, the format, the day you want the summary. Every agent you run applies it from then on.',
  },
  {
    icon: BookOpen, label: 'Learning vocabulary', Graphic: VocabGraphic,
    body: 'Your names, acronyms and nicknames are picked up from how you use them, with the source kept. Your agent uses them the way you do.',
  },
]

export default function HumanLike() {
  return (
    <section className="hl-section" id="human-like">
      <div className="hl-inner">
        <motion.h2 className="hl-headline" {...fade(0)}>
          <span className="hl-light">What</span> <em>human-like</em> <span className="hl-light">looks like.</span>
        </motion.h2>
        <motion.p className="hl-deck" {...fade(0.08)}>
          The context layer learns behavioural data, not just static data.
        </motion.p>

        <ul className="hl-cards">
          {CARDS.map(({ icon: Icon, label, body, Graphic }, i) => (
            <motion.li key={label} className="hl-card" {...fade(0.15 + i * 0.08)}>
              <Graphic />
              <span className="hl-card-head">
                <span className="hl-card-icon" aria-hidden="true"><Icon size={16} strokeWidth={1.8} /></span>
                <span className="hl-card-label">{label}</span>
              </span>
              <span className="hl-card-text">{body}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
