import '../styles/nav.css'

export default function Nav() {
  return (
    <nav>
      <div className="logo">xysq<span>.ai</span></div>
      <div className="nav-links">
        <a href="#problem">Vision</a>
        <a href="#multimodal">Multimodal</a>
        <a href="#pillars">Pillars</a>
        <a href="#consent">Your Control</a>
        <a href="#wl-sect" className="nav-cta">Early Access</a>
      </div>
    </nav>
  )
}
