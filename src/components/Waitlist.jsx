import { useState, useRef } from 'react'
import '../styles/waitlist.css'

function Field({ label, type = 'text', value, onChange, onKeyDown, optional = false, error = '', touched = false }) {
  const hasValue = value.trim().length > 0
  const showError = touched && error

  return (
    <div className="ig-wrap">
      <div className={`ig${hasValue || false ? ' ig--filled' : ''}${showError ? ' ig--error' : ''}${hasValue ? ' ig--filled' : ''}`}>
        <label className="ig-label">{label}{optional ? ' (Optional)' : ''}</label>
        <input
          type={type}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder=""
        />
      </div>
      {showError && <span className="ig-error">{error}</span>}
    </div>
  )
}

function TextareaField({ label, value, onChange, optional = false }) {
  const hasValue = value.trim().length > 0
  return (
    <div className="ig-wrap">
      <div className={`ig ig--textarea${hasValue ? ' ig--filled' : ''}`}>
        <label className="ig-label">{label}{optional ? ' (Optional)' : ''}</label>
        <textarea value={value} onChange={onChange} rows={4} placeholder="" />
      </div>
    </div>
  )
}

function validateEmail(e) {
  const v = e.trim()
  if (!v) return 'Email is required'
  if (!v.includes('@')) return 'Missing @ symbol'
  const parts = v.split('@')
  if (!parts[1] || !parts[1].includes('.')) return 'Enter a valid email (e.g. you@company.com)'
  return ''
}

function validateName(v) {
  if (!v.trim()) return 'Name is required'
  return ''
}

function validateLinkedin(v) {
  if (!v.trim()) return 'LinkedIn profile URL is required'
  return ''
}

export default function Waitlist() {
  const [fields, setFields] = useState({ name: '', company: '', email: '', linkedin: '', query: '' })
  const [touched, setTouched] = useState({ name: false, email: false, linkedin: false })
  const [loading, setLoading] = useState(false)
  const [showOk, setShowOk] = useState(false)
  const [submitError, setSubmitError] = useState(false)
  const timerRef = useRef(null)

  const set = (key) => (e) => {
    setFields(f => ({ ...f, [key]: e.target.value }))
    if (!touched[key]) setTouched(t => ({ ...t, [key]: true }))
  }

  const errors = {
    name: validateName(fields.name),
    email: validateEmail(fields.email),
    linkedin: validateLinkedin(fields.linkedin),
  }

  const isValid = !errors.name && !errors.email && !errors.linkedin

  const joinList = async () => {
    // mark all as touched to show all errors
    setTouched({ name: true, email: true, linkedin: true })
    if (!isValid) return

    setLoading(true)
    setSubmitError(false)

    try {
      const res = await fetch('https://api.staticforms.xyz/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          accessKey: 'sf_940da8576d9fbecf6bcceb7a',
          name: fields.name.trim(),
          email: fields.email.trim(),
          subject: 'New Inquiry - xysq.ai',
          replyTo: fields.email.trim(),
          cc: 'yashds47@gmail.com',
          message: `Name: ${fields.name.trim()}\nCompany: ${fields.company.trim() || 'N/A'}\nLinkedIn: ${fields.linkedin.trim()}\nQuery: ${fields.query.trim() || 'None'}\nEmail: ${fields.email.trim()}`,
        }),
      })
      const data = await res.json()
      if (!data.success) throw new Error('submission failed')
      setFields({ name: '', company: '', email: '', linkedin: '', query: '' })
      setTouched({ name: false, email: false, linkedin: false })
      setShowOk(true)
      clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => setShowOk(false), 5000)
    } catch {
      setSubmitError(true)
    } finally {
      setLoading(false)
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
          <p>We're partnering with forward-thinking teams. Tell us about your project or how you want to use xysq.</p>

          <Field label="Your Name" value={fields.name} onChange={set('name')} onKeyDown={onKeyDown}
            error={errors.name} touched={touched.name} />
          <Field label="Company Name" value={fields.company} onChange={set('company')} onKeyDown={onKeyDown}
            optional />
          <Field label="Work Email" type="email" value={fields.email} onChange={set('email')} onKeyDown={onKeyDown}
            error={errors.email} touched={touched.email} />
          <Field label="LinkedIn Profile URL" type="url" value={fields.linkedin} onChange={set('linkedin')} onKeyDown={onKeyDown}
            error={errors.linkedin} touched={touched.linkedin} />
          <TextareaField label="How can we help?" value={fields.query} onChange={set('query')} optional />

          <button className="wl-btn" onClick={joinList} disabled={!isValid || loading}>
            {loading
              ? <span className="wl-spinner"><span /><span /><span /></span>
              : 'Submit Request'
            }
          </button>

          {showOk && <p className="ok" style={{ display: 'block' }}>✦ Request sent. We'll be in touch shortly.</p>}
          {submitError && <p className="ok" style={{ display: 'block', color: '#e8847a' }}>Something went wrong. Please try again.</p>}
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
