import '../styles/steps.css'

const steps = [
  {
    icon: '👁',
    title: 'You Are Seen',
    body: 'We read your visual cues, expressions, and context, understanding what no text alone could ever tell us. Your identity and presence, fully recognised.',
    tag: 'Visual · Multimodal',
    delay: '0s',
  },
  {
    icon: '👂',
    title: 'You Are Heard',
    body: 'Every word, every tone, every pause, captured and understood. We listen to the emotion behind your voice, not just the content of your message.',
    tag: 'Voice · Tone · Language',
    delay: '0.1s',
  },
  {
    icon: '❤️',
    title: 'You Are Felt',
    body: 'Your emotional state, your urgency, your wellbeing, sensed in real time. We respond to how you feel, not just what you say.',
    tag: 'Emotion · Empathy · Sentiment',
    delay: '0.2s',
  },
  {
    icon: '⚡',
    title: 'You Come First',
    body: 'Proactive, justified action taken before you ask. We anticipate your needs because we already know you, seen, heard, and felt across your entire history.',
    tag: 'Proactive · Memory · Action',
    delay: '0.3s',
  },
]

export default function HowItWorks() {
  return (
    <section className="sect" style={{ background: 'var(--bg2)' }}>
      <div className="sect-inner">
        <span className="stag reveal">The Experience</span>
        <h2 className="reveal">How we know you.<br /><em>Completely.</em></h2>
        <div className="steps">
          {steps.map((s) => (
            <div className="step reveal" key={s.title} style={{ transitionDelay: s.delay }}>
              <div className="sdot"><span className="sdn">{s.icon}</span></div>
              <h4>{s.title}</h4>
              <p>{s.body}</p>
              <div className="step-modal">{s.tag}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
