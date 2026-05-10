export function Callout({ type = 'info', children }) {
  return (
    <aside className={`callout callout--${type}`} role="note">
      <div className="callout__body">{children}</div>
    </aside>
  )
}
