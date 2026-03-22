import '../styles/steps.css'

const steps = [
  {
    num: '01',
    title: 'You Are Seen',
    body: 'We read your visual cues, expressions, and context, understanding what no text alone could ever tell us. Your identity and presence, fully recognised.',
    tag: 'Visual · Multimodal',
    img: '/assets/seen.jpeg',
    delay: '0s',
  },
  {
    num: '02',
    title: 'You Are Heard',
    body: 'Every word, every tone, every pause, captured and understood. We listen to the emotion behind your voice, not just the content of your message.',
    tag: 'Voice · Tone · Language',
    img: '/assets/heard.jpeg',
    delay: '0.1s',
  },
  {
    num: '03',
    title: 'You Are Felt',
    body: 'Your emotional state, your urgency, your wellbeing, sensed in real time. We respond to how you feel, not just what you say.',
    tag: 'Emotion · Empathy · Sentiment',
    img: '/assets/felt.jpeg',
    delay: '0.2s',
  },
  {
    num: '04',
    title: 'You Come First',
    body: 'Proactive, justified action taken before you ask. We anticipate your needs because we already know you, seen, heard, and felt across your entire history.',
    tag: 'Proactive · Memory · Action',
    img: '/assets/remembered.jpeg',
    delay: '0.3s',
  },
]

export default function HowItWorks() {
  return (
    <section className="sect howitworks-sect" style={{ background: 'var(--bg2)' }}>
      <div className="sect-inner">
        <span className="stag reveal">The Experience</span>
        <h2 className="reveal">How we know you.<br /><em>Completely.</em></h2>
        <div className="steps-grid">
          {steps.map((s) => (
            <div className="step-card reveal" key={s.title} style={{ transitionDelay: s.delay }}>
              <div className="step-img-wrap">
                <img src={s.img} alt={s.title} />
                <div className="step-img-overlay" />
                <span className="step-num">{s.num}</span>
              </div>
              <div className="step-content">
                <h4>{s.title}</h4>
                <p>{s.body}</p>
                <span className="step-tag">{s.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
