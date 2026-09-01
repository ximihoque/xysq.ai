import { FileText, MessagesSquare, ShoppingBag, Bot } from 'lucide-react'
import XysqLogo from './XysqLogo'
import '../styles/hero-flow.css'

// The shape of the system in one row: what you already have, the layer, the
// agents that read from it. No captions and no claims, because the headline
// already made the argument. Varied icons on the left read as "your things",
// three identical bots on the right read as "your agents", so neither side
// needs a label.

export default function HeroFlow() {
  return (
    <div className="hf" aria-label="Your sources feed the context layer, and your agents read from it">
      <ul className="hf-row">
        {[FileText, MessagesSquare, ShoppingBag].map((Icon, i) => (
          <li key={i} className="hf-plate">
            <Icon size={16} strokeWidth={1.7} />
          </li>
        ))}
      </ul>

      <span className="hf-link" aria-hidden="true" />

      <div className="hf-core">
        <span className="hf-core-plate">
          <XysqLogo size={22} />
        </span>
        <span className="hf-core-name">context layer</span>
      </div>

      <span className="hf-link" aria-hidden="true" />

      <ul className="hf-row">
        {[0, 1, 2].map((i) => (
          <li key={i} className="hf-plate is-agent">
            <Bot size={16} strokeWidth={1.7} />
          </li>
        ))}
      </ul>
    </div>
  )
}
