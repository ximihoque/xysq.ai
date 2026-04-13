import { useState, useRef } from 'react'
import '../styles/waitlist.css'

export default function Waitlist() {
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  const [linkedin, setLinkedin] = useState('')
  const [query, setQuery] = useState('')
  const [showOk, setShowOk] = useState(false)
  const [error, setError] = useState(false)
  const timerRef = useRef(null)

  const joinList = async () => {
    const vEmail = email.trim()
    const vName = name.trim()
    const vLi = linkedin.trim()
    const vQuery = query.trim()
    
    const vCompany = company.trim()
    if (!vEmail || !vEmail.includes('@') || !vName || !vLi) return
    setError(false)

    try {
      const res = await fetch('https://api.staticforms.xyz/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          accessKey: 'sf_940da8576d9fbecf6bcceb7a',
          name: vName,
          email: vEmail,
          subject: 'New Inquiry - xysq.ai',
          replyTo: vEmail,
          cc: 'yashds47@gmail.com',
          message: `Name: ${vName}\nCompany: ${vCompany || 'N/A'}\nLinkedIn: ${vLi}\nQuery: ${vQuery || 'None'}\nEmail: ${vEmail}`,
        }),
      })
      const data = await res.json()
      if (!data.success) throw new Error('submission failed')
      setName('')
      setCompany('')
      setEmail('')
      setLinkedin('')
      setQuery('')
      setShowOk(true)
      clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => setShowOk(false), 5000)
    } catch {
      setError(true)
    }
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') joinList()
  }

  return (
    <section className="sect" id="wl-sect">
      <div id="wl">
        <div className="wll">
          <h2>Talk to us<br /><em>directly.</em></h2>
          <p>
            We're partnering with forward-thinking teams. Tell us about your project or how you want to use xysq.
          </p>
          
          <div className="ig ig-first">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={onKeyDown}
            />
          </div>

          <div className="ig ig-next">
            <input
              type="text"
              placeholder="Company Name (Optional)"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              onKeyDown={onKeyDown}
            />
          </div>

          <div className="ig ig-next">
            <input
              type="email"
              placeholder="company@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={onKeyDown}
            />
          </div>

          <div className="ig ig-li">
            <input
              type="url"
              placeholder="linkedin.com/in/yourprofile"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              onKeyDown={onKeyDown}
            />
          </div>

          <div className="ig ig-query">
            <textarea
              placeholder="How can we help? (Optional)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              rows={4}
            />
          </div>

          <button
            className="wl-btn"
            onClick={joinList}
            disabled={!email.trim().includes('@') || !name.trim() || !linkedin.trim()}
          >Submit Request</button>
          {showOk && <p className="ok" style={{ display: 'block' }}>✦ Request sent. We'll be in touch shortly.</p>}
          {error && <p className="ok" style={{ display: 'block', color: 'var(--amber)' }}>Something went wrong. Please try again.</p>}
        </div>

        <div className="wrs">
          <div className="wrs-s">
            <div className="wsn">0<em>×</em></div>
            <div className="wsl">Times you'll repeat yourself again</div>
          </div>
          <div className="wrs-s">
            <div className="wsn"><em>∞</em></div>
            <div className="wsl">Memory: no session limits, no forgetting</div>
          </div>
          <div className="wrs-s">
            <div className="wsn">1<em>×</em></div>
            <div className="wsl">Agent: seen, heard &amp; felt across every domain</div>
          </div>
        </div>
      </div>
    </section>
  )
}
