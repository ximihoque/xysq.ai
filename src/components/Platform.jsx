import '../styles/platform.css'

function IconOS() {
  return (
    <svg className="pf-icon" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Outer ring */}
      <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.18" strokeDasharray="3 6" />
      {/* Middle ring */}
      <circle cx="40" cy="40" r="22" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
      {/* Core */}
      <circle cx="40" cy="40" r="9" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="40" cy="40" r="3.5" fill="currentColor" fillOpacity="0.8" />
      {/* Input spokes */}
      <line x1="40" y1="18" x2="40" y2="31" stroke="currentColor" strokeWidth="0.9" strokeOpacity="0.6" />
      <line x1="62" y1="40" x2="49" y2="40" stroke="currentColor" strokeWidth="0.9" strokeOpacity="0.6" />
      <line x1="18" y1="40" x2="31" y2="40" stroke="currentColor" strokeWidth="0.9" strokeOpacity="0.6" />
      <line x1="40" y1="62" x2="40" y2="49" stroke="currentColor" strokeWidth="0.9" strokeOpacity="0.6" />
      {/* Input nodes */}
      <circle cx="40" cy="16" r="3" stroke="currentColor" strokeWidth="1" />
      <circle cx="64" cy="40" r="3" stroke="currentColor" strokeWidth="1" />
      <circle cx="16" cy="40" r="3" stroke="currentColor" strokeWidth="1" />
      <circle cx="40" cy="64" r="3" stroke="currentColor" strokeWidth="1" />
    </svg>
  )
}


function IconTwin() {
  return (
    <svg className="pf-icon" viewBox="0 0 70 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Left figure */}
      <circle cx="22" cy="18" r="8" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.5" />
      <path d="M8 50 Q8 36 22 36 Q36 36 36 50" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.5" strokeLinecap="round" />
      {/* Right figure — the twin, slightly more vivid */}
      <circle cx="48" cy="18" r="8" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="48" cy="18" r="3" fill="currentColor" fillOpacity="0.4" />
      <path d="M34 50 Q34 36 48 36 Q62 36 62 50" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      {/* Connecting thread */}
      <line x1="30" y1="18" x2="40" y2="18" stroke="currentColor" strokeWidth="0.9" strokeOpacity="0.4" strokeDasharray="2 3" />
      {/* Data aura around twin */}
      <circle cx="48" cy="18" r="14" stroke="currentColor" strokeWidth="0.7" strokeOpacity="0.15" strokeDasharray="2 4" />
      {/* Identity marker */}
      <circle cx="48" cy="64" r="5" stroke="currentColor" strokeWidth="1.2" />
      <line x1="48" y1="50" x2="48" y2="59" stroke="currentColor" strokeWidth="0.9" strokeOpacity="0.5" />
    </svg>
  )
}

export default function Platform() {
  return (
    <section className="sect pf-sect" id="platform">
      <div className="sect-inner">
        <span className="stag reveal">The Platform</span>
        <h2 className="reveal">Not an app.<br /><em>The layer underneath.</em></h2>
        <p className="pf-intro reveal">
          An operating system for context. It defines how inputs are ingested, stored, and ranked:
          voice, vision, text, behaviour. Downstream, any LLM or VLM builds on top of it.
          The models get better context. You get a world that already knows you.
        </p>

        <div className="pf-grid pf-grid-2">
          <div className="pf-card reveal">
            <IconOS />
            <h3>The Context OS</h3>
            <p>
              A de-multiplexer for everything you produce. Receives all sensory and behavioural
              inputs, ranks what matters, and proactively injects the right context at the right moment.
              Models can also pull deeper context via API when they need it. Cross-language.
              Real-time. Always on.
            </p>
            <span className="pf-tag">Proactive Injection · Pull API · Real-Time</span>
          </div>

          <div className="pf-card reveal" style={{ transitionDelay: '0.14s' }}>
            <IconTwin />
            <h3>Your Digital Twin</h3>
            <p>
              A consensual, living portrait of you. Continuously updated from every interaction,
              every modality, across every platform you allow. When an AI talks to you, it
              doesn't start from zero. Verified agents see who you are. Everyone else sees nothing.
            </p>
            <span className="pf-tag">Consensual · Portable · Verified</span>
          </div>
        </div>
      </div>
    </section>
  )
}
