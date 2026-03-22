import '../styles/consent.css'

const rows = [
  { label: 'Healthcare Provider', sub: 'Medical history · Emotional context · Voice profile', on: true },
  { label: 'Banking & Finance', sub: 'Preferences · Identity · Spending context', on: true },
  { label: 'Retail & Commerce', sub: 'Access not granted', on: false },
  { label: 'Travel & Hospitality', sub: 'Travel history · Preferences · Context', on: true },
  { label: 'Government Services', sub: 'Access not granted', on: false },
]

export default function Consent() {
  return (
    <section id="consent">
      <div className="consent-inner">
        <div className="reveal">
          <span className="stag">Your Control</span>
          <h2>Every system knows you.<br /><em>You decide</em> who.</h2>
          <div className="consent-text">
            <p>
              xysq remembers everything — but shares nothing without your explicit permission.{' '}
              <strong>Consent is not a setting. It is the foundation.</strong> You hold the power to decide
              which services see which parts of your story. You can grant, revoke, and control at any time.
            </p>
            <p>
              This is the future of AI as it should be —{' '}
              <strong className="cyan">powerful for systems, sovereign for you.</strong>
            </p>
          </div>
        </div>

        <div className="reveal" style={{ transitionDelay: '0.15s' }}>
          <div className="consent-vis">
            <div className="consent-head-row">
              <span>Service</span>
              <span>Your Permission</span>
            </div>
            {rows.map((r) => (
              <div className={`consent-row${r.on ? '' : ' off'}`} key={r.label}>
                <div className={`consent-toggle${r.on ? '' : ' off'}`} />
                <div style={{ flex: 1 }}>
                  <div className={`consent-row-label${r.on ? '' : ' off'}`}>{r.label}</div>
                  <div className="consent-row-sub">{r.sub}</div>
                </div>
              </div>
            ))}
            <div className="consent-footer-note">You hold the keys. Always. ✦</div>
          </div>
        </div>
      </div>
    </section>
  )
}
