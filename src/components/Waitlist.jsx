import { useState, useRef } from 'react'
import '../styles/waitlist.css'

export default function Waitlist() {
  const [email, setEmail] = useState('')
  const [showOk, setShowOk] = useState(false)
  const timerRef = useRef(null)

  const joinList = () => {
    const v = email.trim()
    if (!v || !v.includes('@')) return
    setEmail('')
    setShowOk(true)
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setShowOk(false), 5000)
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter') joinList()
  }

  return (
    <section className="sect" id="wl-sect">
      <div id="wl">
        <div className="wll reveal">
          <span className="stag">Early Access</span>
          <h2>Be the first to<br /><em>be remembered.</em></h2>
          <p>
            We're onboarding early partners and individuals who believe the future of AI is personal,
            persistent, proactive — and always on your terms. Join the waitlist and help shape what's next.
          </p>
          <div className="ig">
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={onKeyDown}
            />
            <button onClick={joinList}>Join</button>
          </div>
          {showOk && <p className="ok" style={{ display: 'block' }}>✦ You're on the list. We'll be in touch.</p>}
        </div>

        <div className="wrs reveal">
          <div className="wrs-s">
            <div className="wsn">0<em>×</em></div>
            <div className="wsl">Times you'll repeat yourself again</div>
          </div>
          <div className="wrs-s">
            <div className="wsn"><em>∞</em></div>
            <div className="wsl">Memory — no session limits, no forgetting</div>
          </div>
          <div className="wrs-s">
            <div className="wsn">1<em>×</em></div>
            <div className="wsl">Agent — seen, heard &amp; felt across every domain</div>
          </div>
        </div>
      </div>
    </section>
  )
}
