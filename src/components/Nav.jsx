import { Link, useLocation } from 'react-router-dom'
import '../styles/nav.css'

export default function Nav() {
  const { pathname } = useLocation()
  const isExperience = pathname === '/experience'

  return (
    <nav>
      <Link to="/" className="logo">xysq<span>.ai</span></Link>
      <div className="nav-links">
        {isExperience ? (
          <>
            <a href="/#problem">Vision</a>
            <Link to="/experience" className="nav-active">The Experience</Link>
            <a href="#wl-sect" className="nav-cta">Early Access</a>
          </>
        ) : (
          <>
            <a href="#problem">Vision</a>
            <a href="#pillars">Pillars</a>
            <Link to="/experience">The Experience</Link>
            <a href="#consent">Your Control</a>
            <a href="#wl-sect" className="nav-cta">Early Access</a>
          </>
        )}
      </div>
    </nav>
  )
}
