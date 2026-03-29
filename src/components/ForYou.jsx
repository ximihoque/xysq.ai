import { Link } from 'react-router-dom'
import '../styles/foryou.css'

const cards = [
  {
    num: '01',
    title: 'Never Start Over',
    body: 'Every AI you talk to picks up from where the last one left off. Your preferences, your context, your history. Present everywhere you are, without you having to carry it.',
    tag: 'Portable Memory · Cross-Agent · Always On',
    delay: '0s',
  },
  {
    num: '02',
    title: 'You Own It',
    body: 'A dashboard that is yours. See exactly what is stored. Every agent with access. Every piece of context we hold. Grant it, revoke it, delete it. You stay in control of the full picture.',
    tag: 'Consent-First · Full Visibility · Your Rules',
    delay: '0.14s',
  },
]

export default function ForYou() {
  return (
    <section className="sect fy-sect" id="for-you">
      <div className="sect-inner">
        <span className="stag reveal">For You</span>
        <h2 className="reveal">Memory that travels<br /><em>with you.</em></h2>
        <p className="fy-intro reveal">
          You are the constant. Not the context. A world where every system you interact with
          already knows who you are, because you told it once and it remembered.
        </p>

        <div className="fy-grid">
          {cards.map((c) => (
            <div className="fy-card reveal" key={c.title} style={{ transitionDelay: c.delay }}>
              <div className="fy-num">{c.num}</div>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
              <span className="fy-tag">{c.tag}</span>
            </div>
          ))}
        </div>

        <div className="fy-cta-row reveal">
          <Link to="/experience" className="fy-link">See the full experience</Link>
        </div>
      </div>
    </section>
  )
}
