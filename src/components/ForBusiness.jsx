import { Link } from 'react-router-dom'
import '../styles/forbusiness.css'

const cards = [
  {
    num: '01',
    title: 'Drop In. Don\'t Rebuild.',
    body: 'Install our plugin alongside your existing agent. From the first interaction, it has access to what matters: user context, preferences, history. No training required. No rebuilding. Just context, flowing.',
    tag: 'Plugin Install · Instant Enrichment · No Rebuild',
    delay: '0s',
  },
  {
    num: '02',
    title: 'Business Memory',
    body: 'Store what your product knows. Usage patterns, domain context, past interactions scoped to your service. Your agent recalls exactly what is relevant at the moment it matters. Not a generic response. A specific one.',
    tag: 'Product Knowledge · Domain-Scoped · Always Relevant',
    delay: '0.12s',
  },
  {
    num: '03',
    title: 'Two Streams. One Response.',
    body: 'When a user interacts with your agent, two memory streams merge: what your business knows about its product, and what the user has consented to share. The result is a response that understands the product and the person.',
    tag: 'Business Context · User Context · Hyper-Personalised',
    delay: '0.24s',
  },
]

export default function ForBusiness() {
  return (
    <section className="sect fb-sect" id="for-business">
      <div className="sect-inner">
        <span className="stag reveal">For Businesses</span>
        <h2 className="reveal">Your agent.<br /><em>Smarter from the start.</em></h2>
        <p className="fb-intro reveal">
          Your customers are already tired of repeating themselves. Install once and your agent gains
          the context it was always missing. No cold starts. No guesswork. Just interactions that feel like they should.
        </p>

        <div className="fb-grid">
          {cards.map((c) => (
            <div className="fb-card reveal" key={c.title} style={{ transitionDelay: c.delay }}>
              <div className="fb-num">{c.num}</div>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
              <span className="fb-tag">{c.tag}</span>
            </div>
          ))}
        </div>

        <div className="fb-cta-row reveal">
          <Link to="/experience" className="fb-link">See how it works for businesses</Link>
        </div>
      </div>
    </section>
  )
}
