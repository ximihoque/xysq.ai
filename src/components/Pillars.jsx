import '../styles/pillars.css'

/* ── Pillar 01: Seen · Heard · Felt
   Three sensory channels stacked — eye, voice wave, heartbeat pulse ── */
function IconMultimodal() {
  return (
    <svg className="pillar-icon" viewBox="0 0 100 72" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Eye */}
      <path d="M4 16 Q50 -2 96 16 Q50 34 4 16Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <circle cx="50" cy="16" r="8" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="50" cy="16" r="2.5" fill="currentColor" />
      {/* Micro-dots on iris */}
      <circle cx="44" cy="13" r="1" fill="currentColor" fillOpacity="0.5" />
      <circle cx="56" cy="19" r="1" fill="currentColor" fillOpacity="0.5" />

      {/* Voice waveform */}
      <path
        d="M4 42 C14 34 20 50 30 42 C40 34 46 50 56 42 C66 34 72 50 82 42 C88 38 94 44 98 42"
        stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.75" strokeLinecap="round"
      />

      {/* Heartbeat pulse */}
      <polyline
        points="4,64 24,64 30,54 36,74 42,54 48,64 96,64"
        stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.5" strokeLinejoin="round" strokeLinecap="round"
      />
    </svg>
  )
}

/* ── Pillar 02: Lifelong Memory
   A growing thread — vertical timeline with branching moments, blossoming at the top ── */
function IconMemory() {
  return (
    <svg className="pillar-icon" viewBox="0 0 60 96" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Vertical thread */}
      <line x1="30" y1="8" x2="30" y2="92" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.4" />

      {/* Top bloom — the present, fully realised */}
      <circle cx="30" cy="12" r="12" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.2" />
      <circle cx="30" cy="12" r="6" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="30" cy="12" r="2.2" fill="currentColor" />

      {/* Memory node 1 */}
      <circle cx="30" cy="36" r="4" stroke="currentColor" strokeWidth="1.2" />
      <line x1="34" y1="34" x2="50" y2="27" stroke="currentColor" strokeWidth="0.9" strokeOpacity="0.55" strokeLinecap="round" />

      {/* Memory node 2 */}
      <circle cx="30" cy="58" r="4" stroke="currentColor" strokeWidth="1.2" />
      <line x1="26" y1="56" x2="10" y2="50" stroke="currentColor" strokeWidth="0.9" strokeOpacity="0.55" strokeLinecap="round" />

      {/* Memory node 3 — earliest, faintest */}
      <circle cx="30" cy="80" r="4" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.6" />
      <line x1="34" y1="78" x2="50" y2="72" stroke="currentColor" strokeWidth="0.9" strokeOpacity="0.35" strokeLinecap="round" />
    </svg>
  )
}

/* ── Pillar 04: The Personality Layer
   Three horizontal sliders — representing tunable, user-owned response controls ── */
function IconPersonality() {
  return (
    <svg className="pillar-icon" viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Track 1 */}
      <line x1="6" y1="14" x2="74" y2="14" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.3" strokeLinecap="round" />
      <circle cx="52" cy="14" r="5" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="52" cy="14" r="2" fill="currentColor" fillOpacity="0.7" />

      {/* Track 2 */}
      <line x1="6" y1="30" x2="74" y2="30" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.3" strokeLinecap="round" />
      <circle cx="28" cy="30" r="5" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="28" cy="30" r="2" fill="currentColor" fillOpacity="0.7" />

      {/* Track 3 */}
      <line x1="6" y1="46" x2="74" y2="46" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.3" strokeLinecap="round" />
      <circle cx="62" cy="46" r="5" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="62" cy="46" r="2" fill="currentColor" fillOpacity="0.7" />
    </svg>
  )
}

/* ── Pillar 03: One Universal Agent
   Hub-and-spoke — one centre node connected to six domain nodes on an orbit ring ── */
function IconUniversal() {
  return (
    <svg className="pillar-icon" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Orbit ring */}
      <circle cx="45" cy="45" r="34" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.18" strokeDasharray="2 5" />

      {/* Centre hub */}
      <circle cx="45" cy="45" r="9" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="45" cy="45" r="3.5" fill="currentColor" fillOpacity="0.7" />

      {/* 6 domain nodes at equal angles on the orbit ring */}
      {/* top */}
      <line x1="45" y1="36" x2="45" y2="13" stroke="currentColor" strokeWidth="0.9" strokeOpacity="0.6" />
      <circle cx="45" cy="11" r="3.5" stroke="currentColor" strokeWidth="1.2" />
      {/* top-right */}
      <line x1="53" y1="39" x2="71" y2="23" stroke="currentColor" strokeWidth="0.9" strokeOpacity="0.6" />
      <circle cx="73" cy="21" r="3.5" stroke="currentColor" strokeWidth="1.2" />
      {/* bottom-right */}
      <line x1="54" y1="49" x2="74" y2="62" stroke="currentColor" strokeWidth="0.9" strokeOpacity="0.6" />
      <circle cx="76" cy="64" r="3.5" stroke="currentColor" strokeWidth="1.2" />
      {/* bottom */}
      <line x1="45" y1="54" x2="45" y2="77" stroke="currentColor" strokeWidth="0.9" strokeOpacity="0.6" />
      <circle cx="45" cy="79" r="3.5" stroke="currentColor" strokeWidth="1.2" />
      {/* bottom-left */}
      <line x1="36" y1="49" x2="16" y2="62" stroke="currentColor" strokeWidth="0.9" strokeOpacity="0.6" />
      <circle cx="14" cy="64" r="3.5" stroke="currentColor" strokeWidth="1.2" />
      {/* top-left */}
      <line x1="37" y1="39" x2="19" y2="23" stroke="currentColor" strokeWidth="0.9" strokeOpacity="0.6" />
      <circle cx="17" cy="21" r="3.5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}

export default function Pillars() {
  return (
    <section className="sect" id="pillars" style={{ background: 'var(--bg2)' }}>
      <div className="sect-inner">
        <span className="stag reveal">Core Architecture</span>
        <h2 className="reveal">Four pillars.<br /><em>One</em> you.</h2>
        <div className="pg pg-2x2">
          <div className="pc reveal">
            <div className="pc-header">
              <div className="pn">01</div>
              <IconMultimodal />
            </div>
            <h3>Seen. Heard. Felt.</h3>
            <p>
              We are multimodal at our core, not as an add-on. We read your face, your voice, your words,
              and your emotional state simultaneously, building a rich, real-time understanding of you that no
              single-channel system ever could.
            </p>
            <span className="pc-tag">Multimodal in DNA</span>
          </div>
          <div className="pc reveal" style={{ transitionDelay: '0.12s' }}>
            <div className="pc-header">
              <div className="pn">02</div>
              <IconMemory />
            </div>
            <h3>Lifelong Memory</h3>
            <p>
              Every conversation, every preference, every life moment, remembered and built upon forever. Not
              session memory. Not day memory. A lifetime of context that compounds, so every interaction starts
              where the last one left off. Seen, heard, and felt in full.
            </p>
            <span className="pc-tag">Persistent · Contextual · Growing</span>
          </div>
          <div className="pc reveal" style={{ transitionDelay: '0.24s' }}>
            <div className="pc-header">
              <div className="pn">03</div>
              <IconUniversal />
            </div>
            <h3>One Universal Agent. Proactive.</h3>
            <p>
              A single intelligent layer across every platform: banking, healthcare, travel, support. We don't
              just respond; we anticipate. We take justified, proactive action on your behalf before you even
              ask, because we already know you. Seen, heard, and felt, across every domain.
            </p>
            <span className="pc-tag">Universal · Proactive · You First</span>
          </div>
          <div className="pc reveal" style={{ transitionDelay: '0.36s' }}>
            <div className="pc-header">
              <div className="pn">04</div>
              <IconPersonality />
            </div>
            <h3>The Personality Layer</h3>
            <p>
              The platform provides the processed context — who you are, what you're experiencing.
              Users and businesses define how agents respond to it. You set your preferences.
              A business configures their agent's tone, escalation, and behaviour. The what is ours.
              The how is yours.
            </p>
            <span className="pc-tag">User-Owned · Business-Configured · Yours</span>
          </div>
        </div>
      </div>
    </section>
  )
}
