import '../styles/pillars.css'

export default function Pillars() {
  return (
    <section className="sect" id="pillars" style={{ background: 'var(--bg2)' }}>
      <div className="sect-inner">
        <span className="stag reveal">Core Architecture</span>
        <h2 className="reveal">Three pillars.<br /><em>One</em> you.</h2>
        <div className="pg">
          <div className="pc reveal">
            <div className="pn">01</div>
            <span className="pi">👁&nbsp;👂&nbsp;❤️</span>
            <h3>Seen. Heard. Felt.</h3>
            <p>
              We are multimodal at our core, not as an add-on. We read your face, your voice, your words,
              and your emotional state simultaneously, building a rich, real-time understanding of you that no
              single-channel system ever could.
            </p>
            <span className="pc-tag">Multimodal in DNA</span>
          </div>
          <div className="pc reveal" style={{ transitionDelay: '0.12s' }}>
            <div className="pn">02</div>
            <span className="pi">🧠</span>
            <h3>Lifelong Memory</h3>
            <p>
              Every conversation, every preference, every life moment, remembered and built upon forever. Not
              session memory. Not day memory. A lifetime of context that compounds, so every interaction starts
              where the last one left off. Seen, heard, and felt in full.
            </p>
            <span className="pc-tag">Persistent · Contextual · Growing</span>
          </div>
          <div className="pc reveal" style={{ transitionDelay: '0.24s' }}>
            <div className="pn">03</div>
            <span className="pi">⚡</span>
            <h3>One Universal Agent. Proactive.</h3>
            <p>
              A single intelligent layer across every platform: banking, healthcare, travel, support. We don't
              just respond; we anticipate. We take justified, proactive action on your behalf before you even
              ask, because we already know you. Seen, heard, and felt, across every domain.
            </p>
            <span className="pc-tag">Universal · Proactive · You First</span>
          </div>
        </div>
      </div>
    </section>
  )
}
