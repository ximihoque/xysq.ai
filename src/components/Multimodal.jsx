import '../styles/multimodal.css'

export default function Multimodal() {
  return (
    <section id="multimodal">
      <div className="mm-inner">
        <div className="mm-head">
          <div className="reveal">
            <span className="stag">Multimodal in DNA</span>
            <h2>Not just what you say —<br /><em>how</em> you say it.<br /><em>How</em> you feel it.</h2>
          </div>
          <div className="reveal" style={{ transitionDelay: '0.1s' }}>
            <p className="mm-head-body">
              Most AI reads your text. xysq.ai reads <strong>you</strong>. Every modality — your voice, your
              camera, your words, your tone, your silence — is part of how xysq builds a living portrait of who
              you are. Not one dimension. All of you.
            </p>
            <p className="mm-head-body" style={{ marginTop: '20px' }}>
              This isn't a feature. It's the foundation.{' '}
              <strong className="cyan">Multimodal is in xysq's DNA.</strong>
            </p>
          </div>
        </div>

        <div className="mm-cards">
          <div className="mm-card reveal">
            <div className="mm-sense">👁</div>
            <h4>Seen</h4>
            <p>Visual context — your expressions, your environment, your non-verbal cues — xysq sees the whole picture, not just the typed word.</p>
            <span className="mm-badge">Vision · Facial Cues · Context</span>
          </div>
          <div className="mm-card reveal" style={{ transitionDelay: '0.12s' }}>
            <div className="mm-sense">👂</div>
            <h4>Heard</h4>
            <p>Your voice carries emotion, urgency, exhaustion, and joy. xysq listens to what's between the words — the tone, the pace, the pause.</p>
            <span className="mm-badge">Voice · Tone · Emotion Detection</span>
          </div>
          <div className="mm-card reveal" style={{ transitionDelay: '0.24s' }}>
            <div className="mm-sense">❤️</div>
            <h4>Felt</h4>
            <p>Understanding your emotional state in real time — not just processing your request, but genuinely sensing what you're going through and responding accordingly.</p>
            <span className="mm-badge">Emotional AI · Sentiment · Empathy</span>
          </div>
        </div>
      </div>
    </section>
  )
}
