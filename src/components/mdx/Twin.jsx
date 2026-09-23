// field-notes only: two runs side by side, one row per step. `split` is the
// 1-based row where they first differ; it gets the coral/teal wash and the tag.
// rows before it read muted (same in both), rows after it follow the winner
//
//   <Twin columns={["This run (lost)", "Its twin (won)"]} split={5}
//     rows={[["get_user_details", "get_user_details"], ["(stopped)", "return_items"]]} />
export function Twin({ title, caption, columns, rows, split }) {
  const state = (n) => (!split || n < split ? 'same' : n === split ? 'split' : 'after')
  return (
    <figure className="fn-figure">
      {title && <p className="fn-figure__title fn-mono">{title}</p>}
      {/* focusable so a keyboard can scroll the table when it overflows */}
      <div className="fn-scroll" tabIndex={0} role="region" aria-label={title}>
        <table className="fn-twin">
          <thead>
            <tr>
              <th scope="col" className="fn-mono">#</th>
              <th scope="col" className="fn-mono fn-twin__lost">{columns[0]}</th>
              <th scope="col" className="fn-mono fn-twin__won">{columns[1]}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([lost, won], i) => (
              <tr key={i} className={`fn-twin__${state(i + 1)}`}>
                <td className="fn-twin__n">{i + 1}</td>
                <td className="fn-twin__l">
                  {lost}
                  {i + 1 === split && <span className="fn-flag">first difference</span>}
                </td>
                <td className="fn-twin__w">{won}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}
