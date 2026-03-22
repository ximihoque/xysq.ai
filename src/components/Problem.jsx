import '../styles/problem.css'

export default function Problem() {
  return (
    <section className="sect" id="problem">
      <div className="sect-inner">
        <div className="split">
          <div className="txt reveal">
            <span className="stag">The Problem We Solve</span>
            <h2>Fragmented worlds.<br /><em>Whole</em> you.</h2>
            <p>
              Every day, you re-introduce yourself to systems that should already know you. You explain your
              situation to support agents who cannot hear the stress in your voice. You type feelings that should
              be felt. You start from zero — <strong>again and again.</strong>
            </p>
            <p>
              <strong>xysq.ai ends this.</strong> A persistent, context-aware layer that sees you, hears you, and
              feels what you're going through — so every system understands not just your words, but{' '}
              <strong>who you are.</strong>
            </p>
            <div className="consent-badge">🔒 &nbsp; Your data. Your rules. Consent first — always.</div>
          </div>

          <div className="vis-box reveal">
            <div className="orb o1"><div className="od" /></div>
            <div className="orb o2"><div className="od" /></div>
            <div className="orb o3"><div className="od" /></div>
            <div className="cn"><span>xysq<br />.ai</span></div>
            <div className="nl" style={{ top: '12%', left: '60%' }}>Seen 👁</div>
            <div className="nl" style={{ top: '24%', left: '72%' }}>Heard 👂</div>
            <div className="nl" style={{ top: '68%', left: '66%' }}>Felt ❤️</div>
            <div className="nl" style={{ top: '76%', left: '20%' }}>Memory</div>
            <div className="nl" style={{ top: '16%', left: '12%' }}>Identity</div>
            <div className="nl" style={{ top: '44%', left: '1%' }}>History</div>
            <div className="nl" style={{ top: '44%', left: '80%' }}>Actions</div>
          </div>
        </div>
      </div>
    </section>
  )
}
