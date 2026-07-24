import {
  FileText, Hexagon, ShieldCheck, ChevronDown,
  User, Bot, BarChart3, Network, Filter,
} from 'lucide-react'
import XysqLogo from './XysqLogo'
import '../styles/hero-infographic.css'

/*
  The hero's right-side infographic, hand-built (no image gen) so it stays
  crisp, wraps properly, and follows the site theme in both modes.
  Flow: Raw Data -> Memory Engine -> Context Graph -> Governance,
  fed back by the Self-Improving Context Loop, flanked by two learnings.
*/

const cards = [
  {
    id: 'raw',
    icon: FileText,
    title: 'Raw Data',
    lines: ['Ingest PDFs, text, images and documents.', 'Turn unstructured data into usable knowledge.'],
  },
  {
    id: 'engine',
    icon: null, // brand mark instead
    title: 'xysq Memory Engine',
    lines: ['Transforms raw knowledge into domain-adaptive context.', 'Continuously improves through feedback and governance.'],
    highlight: true,
  },
  {
    id: 'graph',
    icon: Hexagon,
    title: 'Context Graph',
    lines: ['Continuously evolving knowledge for humans and AI.', 'Structured, connected and always up to date.'],
  },
  {
    id: 'governance',
    icon: ShieldCheck,
    title: 'Governance',
    lines: ['Every change is auditable and reviewable.', 'Human oversight keeps knowledge trustworthy.'],
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
    lines: ['Improves knowledge organization.', 'Continuously restructures for reasoning.'],
  },
  {
    icon: Filter,
    title: 'Retrieval Learning',
    lines: ['Optimizes context selection.', 'Improves every future retrieval.'],
  },
]

export default function HeroInfographic() {
  return (
    <div className="hig" role="img" aria-label="How xysq works: raw data flows into the xysq Memory Engine, becomes a context graph under governance, and a self-improving context loop of human feedback, self feedback, and usage signals feeds it back">
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
                  {card.lines.map((line) => (
                    <span key={line} className="hig-card-line">{line}</span>
                  ))}
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
