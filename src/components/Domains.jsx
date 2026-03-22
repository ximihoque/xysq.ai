import '../styles/domains.css'

const domains = [
  'Customer Support',
  'Banking & Finance',
  'Healthcare',
  'Travel & Hospitality',
  'Personal Conversations',
  'Insurance',
  'Education',
  'Retail & Commerce',
  'Mental Wellness',
  'Government Services',
  'Legal Assistance',
  'HR & Employment',
]

export default function Domains() {
  return (
    <section className="sect" id="domains">
      <div className="sect-inner" style={{ textAlign: 'center' }}>
        <span className="stag reveal">Where xysq Lives</span>
        <h2 className="reveal">Every domain.<br /><em>One</em> you.</h2>
        <p className="domains-body reveal">
          In every domain, we already know you. Seen, heard, and felt. Carrying your full story so you
          never have to start over.
        </p>
        <div className="dw reveal">
          {domains.map((d) => (
            <div className="dc" key={d}>
              <span>{d}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
