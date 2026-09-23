// field-notes only: stacked bars that narrow a population step by step.
// every width is value / total, so the bars stay to scale when the data moves.
// the bars are decoration (aria-hidden); the legend carries every number as text
//
//   <StepBars title="443 runs" total={443} rows={[
//     { label: "Did it pass?", segments: [{ value: 233, kind: "won", label: "won" }, { value: 210, kind: "lost", label: "failed" }] },
//     { label: "Of the failures?", offset: 233, segments: [...] },
//   ]} />
//
// kinds: all (no swatch), won, lost, err, never. offset is in the same units as values
export function StepBars({ title, caption, total, rows }) {
  const pct = (v) => `${(v / total) * 100}%`
  return (
    <figure className="fn-figure">
      {title && <p className="fn-figure__title fn-mono">{title}</p>}
      <div className="fn-steps">
        {rows.map((row) => (
          <div key={row.label}>
            <div className="fn-step__label fn-mono">{row.label}</div>
            <div className="fn-bar" aria-hidden="true">
              {row.offset > 0 && <span className="fn-seg fn-seg--gap" style={{ '--w': pct(row.offset) }} />}
              {row.segments.map((s, i) => (
                <span key={i} className={`fn-seg fn-seg--${s.kind}`} style={{ '--w': pct(s.value) }} />
              ))}
            </div>
            <div className="fn-legend">
              {row.segments.map((s, i) => (
                <span key={i}>
                  {s.kind !== 'all' && <span className={`fn-sw fn-sw--${s.kind}`} aria-hidden="true" />}
                  <b>{s.value}</b> {s.label}
                </span>
              ))}
            </div>
            {row.note && <p className="fn-step__note">{row.note}</p>}
          </div>
        ))}
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}
