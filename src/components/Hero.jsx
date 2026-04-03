import '../styles/hero.css'
import { IconEye, IconWave, IconPulse, IconInfinity } from './Icons'

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
        <div className="shf-item active"><IconEye className="shf-icon" /> Seen</div>
        <div className="shf-item active"><IconWave className="shf-icon" /> Heard</div>
        <div className="shf-item active"><IconPulse className="shf-icon" /> Felt</div>
        <div className="shf-item inactive"><IconInfinity className="shf-icon" /> Always</div>
      </div>

      <p className="hero-body">
        Every system you interact with already knows you: your voice, your face, your words, your emotions, your history.<br />
        <strong>Multimodal in DNA. Persistent in memory. You, understood in full.</strong>
      </p>

      <div className="hero-btns">
        <a href="https://app.xysq.ai" className="btn-main">Sign Up</a>
        <a href="#problem" className="btn-out">Discover the Vision</a>
      </div>

      <div className="scroll-ind">
        <div className="scroll-bar" />
        <span>Explore</span>
      </div>
    </section>
  )
}
