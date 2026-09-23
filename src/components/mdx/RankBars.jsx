// field-notes only: a ranked list with one bar per item, scaled to the largest
// count. the count is real text; the bar is decoration (aria-hidden)
//
//   <RankBars items={[{ count: 39, label: "stopped one step short", note: "optional" }]} />
export function RankBars({ title, caption, items }) {
  const max = Math.max(...items.map((it) => it.count))
  return (
    <figure className="fn-figure">
      {title && <p className="fn-figure__title fn-mono">{title}</p>}
      <ol className="fn-rank">
        {items.map((it) => (
          <li key={it.label} className="fn-rank__item">
            <span className="fn-rank__count">{it.count}</span>
            <span className="fn-rank__label">{it.label}</span>
            <span className="fn-rank__track" aria-hidden="true">
              <span className="fn-rank__fill" style={{ '--w': `${(it.count / max) * 100}%` }} />
            </span>
            {it.note && <span className="fn-rank__note">{it.note}</span>}
          </li>
        ))}
      </ol>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}
