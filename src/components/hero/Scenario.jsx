import '../../styles/scenario.css'

// The column beside the screen: one entry per scenario in the tab. The open
// one shows its line; the rest show only their name. Same shape whether a
// tab has one scenario or several.
export default function Scenario({ items, active, onPick, heading, label = 'Scenario' }) {
  return (
    <aside className="sc">
      <p className="hs-eyebrow">{label}</p>
      {heading && <p className="sc-heading">{heading}</p>}
      {items.map((it, i) => {
        const on = i === active
        return (
          <button
            key={it.id ?? i}
            type="button"
            className={`sc-item ${on ? 'is-on' : ''}`}
            aria-pressed={on}
            onClick={() => onPick?.(i)}
            disabled={items.length === 1}
          >
            <span className="sc-title">{it.title}</span>
            {on && it.blurb && <span className="sc-blurb">{it.blurb}</span>}
          </button>
        )
      })}
    </aside>
  )
}
