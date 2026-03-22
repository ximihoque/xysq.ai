import '../styles/hero.css'

export default function Hero() {
  return (
    <section id="hero">
      <div className="hero-grid" />
      <div className="hero-glow" />

      <div className="principle-badge">
        <div className="principle-dot" />
        <span className="principle-badge-text">
          We don't make AI feel <em>human</em>. We make AI feel like it's talking to a <em>human</em>.
        </span>
        <div className="principle-dot" />
      </div>

      <p className="hero-tag">Introducing xysq.ai</p>

      <h1>
        One Agent.
        <span className="ln2">One Memory.</span>
        <span className="ln3">You. Remembered.</span>
      </h1>

      <div className="shf-row">
        <div className="shf-item active"><span className="shf-icon">👁</span> Seen</div>
        <div className="shf-item active"><span className="shf-icon">👂</span> Heard</div>
        <div className="shf-item active"><span className="shf-icon">❤️</span> Felt</div>
        <div className="shf-item inactive"><span className="shf-icon">♾</span> Always</div>
      </div>

      <p className="hero-body">
        Every system you interact with already knows you: your voice, your face, your words, your emotions, your history.<br />
        <strong>Multimodal in DNA. Persistent in memory. You, understood in full.</strong>
      </p>

      <div className="hero-btns">
        <a href="#wl-sect" className="btn-main">Request Early Access</a>
        <a href="#problem" className="btn-out">Discover the Vision</a>
      </div>

      <div className="scroll-ind">
        <div className="scroll-bar" />
        <span>Explore</span>
      </div>
    </section>
  )
}
