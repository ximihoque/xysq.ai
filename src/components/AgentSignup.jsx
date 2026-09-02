import { useState } from 'react'
import { ChevronDown, Zap } from 'lucide-react'
import { BRAND_PATHS } from './brandPaths'
import '../styles/agent-signup.css'

// "Get your agent in 3 mins": country code, number, one button. The button is
// a placeholder for now and does nothing on purpose.

const COUNTRIES = [
  ['IN', '🇮🇳', '+91'], ['US', '🇺🇸', '+1'], ['GB', '🇬🇧', '+44'], ['AE', '🇦🇪', '+971'],
  ['SG', '🇸🇬', '+65'], ['AU', '🇦🇺', '+61'], ['CA', '🇨🇦', '+1'], ['DE', '🇩🇪', '+49'],
  ['FR', '🇫🇷', '+33'], ['NL', '🇳🇱', '+31'], ['BR', '🇧🇷', '+55'], ['ID', '🇮🇩', '+62'],
]

export default function AgentSignup() {
  const [cc, setCc] = useState('IN')
  const [num, setNum] = useState('')
  const c = COUNTRIES.find((x) => x[0] === cc)

  return (
    <form className="as" onSubmit={(e) => e.preventDefault()} aria-label="Get your agent">
      <p className="as-title">
        <Zap size={20} strokeWidth={2.2} className="as-bolt" aria-hidden="true" />
        Get your agent in{' '}
        <span className="as-swap" aria-label="3 minutes, not 30 days">
          <b className="as-new">3 mins</b>
          <s className="as-old">30 days</s>
        </span>
      </p>
      <div className="as-pill">
        <label className="as-cc">
          <span className="as-flag" aria-hidden="true">{c[1]}</span>
          <ChevronDown size={14} strokeWidth={2} aria-hidden="true" />
          <select value={cc} onChange={(e) => setCc(e.target.value)} aria-label="Country code">
            {COUNTRIES.map(([k, f, d]) => <option key={k} value={k}>{f} {k} {d}</option>)}
          </select>
          <span className="as-code">{c[2]}</span>
        </label>
        <input
          className="as-num"
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          placeholder="Phone number"
          value={num}
          onChange={(e) => setNum(e.target.value.replace(/[^\d\s]/g, ''))}
          aria-label="Phone number"
        />
        <button type="submit" className="as-go">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d={BRAND_PATHS.whatsapp} fill="currentColor" /></svg>
          WA me
        </button>
      </div>
    </form>
  )
}
