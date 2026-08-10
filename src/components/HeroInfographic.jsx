import {
  FileText, Hexagon, ShieldCheck, ChevronDown,
  User, Bot, BarChart3, Network, Filter,
  Image, MessagesSquare, GitMerge, History, Link2,
  ScrollText, Undo2, RefreshCw, Anchor, SearchCheck,
} from 'lucide-react'
import XysqLogo from './XysqLogo'
import '../styles/hero-infographic.css'

/*
  The hero's right-side infographic, hand-built (no image gen) so it stays
  crisp, wraps properly, and follows the site theme in both modes.
  Flow: Raw Data -> Memory Engine -> Context Graph -> Governance,
  fed back by the Self-Improving Context Loop, flanked by two learnings.

  the two middle cards carry the trust story (engine = the trust layer,
  graph = provable), which is why the hero doesn't need a separate proof
  graphic. self-improving stays one level down, in the loop panel.
*/

/* one line per card, everything else demoted to icon chips. the full
   sentences used to wrap to three lines and buried the trust claim. */
const cards = [
  {
    id: 'raw',
    icon: FileText,
    title: 'Raw Data',
    line: 'Everything keeps the file it came from.',
    chips: [
      { icon: FileText, label: 'PDFs' },
      { icon: Image, label: 'Images' },
      { icon: MessagesSquare, label: 'AI sessions' },
    ],
  },
  {
    /* engine chips are verbs (what it does), graph chips are properties
       (what you get). that split is what makes the arrow between them
       mean something. "Gated" used to live here and read as access
       control, which is the Governance card's job. */
    id: 'engine',
    icon: null, // brand mark instead
    title: 'xysq Memory Engine',
    line: 'The trust layer between your sources and your agents.',
    chips: [
      { icon: SearchCheck, label: 'Checks the source' },
      { icon: GitMerge, label: 'Reconciles' },
      { icon: RefreshCw, label: 'Self-improving' },
    ],
    highlight: true,
  },
  {
    id: 'graph',
    icon: Hexagon,
    title: 'Context Graph',
    line: 'Every fact traces to the sentence it came from.',
    chips: [
      { icon: Anchor, label: 'Grounded' },
      { icon: History, label: 'Current' },
      { icon: Link2, label: 'Linked' },
    ],
  },
  {
    id: 'governance',
    icon: ShieldCheck,
    title: 'Governance',
    line: 'You decide who sees what.',
    chips: [
      { icon: ScrollText, label: 'Auditable' },
      { icon: Undo2, label: 'Revocable' },
    ],
  },
]

const loopItems = [
  { icon: User, label: 'Human Feedback' },
  { icon: Bot, label: 'Self Feedback' },
  { icon: BarChart3, label: 'Usage Signals' },
]

const badges = [
  {
    icon: Network,
    title: 'Structural Learning',
    lines: ['Restructures what you know.'],
  },
  {
    icon: Filter,
    title: 'Retrieval Learning',
    lines: ['Corrections land on the next query.'],
  },
]

export default function HeroInfographic() {
  return (
    <div className="hig" role="img" aria-label="How xysq works: raw data (PDFs, images, AI sessions) flows into the xysq Memory Engine, the trust layer between your sources and your agents, which checks the source, reconciles conflicts and is self-improving. It becomes a context graph that is grounded, current and linked, where every fact traces to the sentence it came from. Governance over it is auditable and revocable, and a self-improving loop of human feedback, self feedback and usage signals feeds back into the engine">
      {/* dashed feedback line: loop panel back up to the top card */}
      <span className="hig-loopline" aria-hidden="true" />

      <div className="hig-flow">
        {cards.map((card, i) => {
          const Icon = card.icon
          return (
            <div key={card.id} className="hig-step">
              {i > 0 && (
                <span className="hig-connector" aria-hidden="true">
                  <ChevronDown size={13} strokeWidth={2} />
                </span>
              )}
              <div className={`hig-card${card.highlight ? ' hig-card--engine' : ''}`}>
                <span className="hig-card-icon" aria-hidden="true">
                  {Icon ? <Icon size={16} strokeWidth={1.7} /> : <XysqLogo size={18} />}
                </span>
                <span className="hig-card-text">
                  <span className="hig-card-title">{card.title}</span>
                  <span className="hig-card-line">{card.line}</span>
                  <span className="hig-card-chips">
                    {card.chips.map(({ icon: ChipIcon, label }) => (
                      <span key={label} className="hig-chip">
                        <ChipIcon size={10} strokeWidth={1.9} aria-hidden="true" />
                        {label}
                      </span>
                    ))}
                  </span>
                </span>
              </div>
            </div>
          )
        })}
      </div>

      <div className="hig-loop">
        <span className="hig-loop-title">Self-Improving Context Loop</span>
        <div className="hig-loop-items">
          {loopItems.map(({ icon: Icon, label }) => (
            <span key={label} className="hig-loop-item">
              <Icon size={13} strokeWidth={1.8} aria-hidden="true" />
              {label}
            </span>
          ))}
        </div>
      </div>

      <div className="hig-badges">
        {badges.map(({ icon: Icon, title, lines }) => (
          <div key={title} className="hig-badge">
            <span className="hig-badge-head">
              <Icon size={13} strokeWidth={1.8} aria-hidden="true" />
              {title}
            </span>
            {lines.map((line) => (
              <span key={line} className="hig-badge-line">{line}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
