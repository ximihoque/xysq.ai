import '../styles/marquee.css'

const items = [
  { text: 'Seen', hi: false },
  { text: '·', hi: true },
  { text: 'Heard', hi: false },
  { text: '·', hi: true },
  { text: 'Felt', hi: false },
  { text: '✦', hi: true },
  { text: 'Multimodal in DNA', hi: false },
  { text: '✦', hi: true },
  { text: 'Lifelong Memory', hi: false },
  { text: '✦', hi: true },
  { text: 'One Universal Agent', hi: false },
  { text: '✦', hi: true },
  { text: 'Proactive Action', hi: false },
  { text: '✦', hi: true },
  { text: 'Consent First', hi: false },
  { text: '✦', hi: true },
  { text: 'Power to You', hi: false },
  { text: '✦', hi: true },
  { text: 'Banking · Healthcare · Travel · Support', hi: false },
  { text: '✦', hi: true },
]

export default function Marquee() {
  return (
    <div className="mq-wrap" aria-hidden="true">
      <div className="mq-inner">
        {[...items, ...items].map((item, i) => (
          <span key={i} className={item.hi ? 'hi' : undefined}>{item.text}</span>
        ))}
      </div>
    </div>
  )
}
