import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import '../styles/nav.css'

const APP_URL = import.meta.env.VITE_APP_URL || 'https://app.xysq.ai'

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  )
}

export default function Nav() {
  const { pathname } = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const [theme, setTheme] = useState(() =>
    typeof window !== 'undefined' ? (localStorage.getItem('theme') || 'dark') : 'dark'
  )

  const { scrollY } = useScroll()
  const navOpacity = useTransform(scrollY, [0, 80], [0, 1])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [isMenuOpen])

  return (
    <motion.nav
      className={isMenuOpen ? 'menu-open' : ''}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <motion.div
        className="nav-backdrop"
        style={{ opacity: navOpacity }}
      />

      <Link to="/" className="logo" onClick={() => setIsMenuOpen(false)}>
        <img className="logo-lychee" src="/logo.svg" alt="xysq" width="22" height="30" />
        <span className="logo-wordmark">xysq<span>.ai</span></span>
      </Link>

      <div className={`nav-links${isMenuOpen ? ' open' : ''}`}>
        <Link
          to="/for-business"
          className={pathname === '/for-business' ? 'nav-active' : ''}
          onClick={() => setIsMenuOpen(false)}
        >
          For Business
        </Link>
        <Link
          to="/vision"
          className={pathname === '/vision' ? 'nav-active' : ''}
          onClick={() => setIsMenuOpen(false)}
        >
          Vision
        </Link>
        <a href="https://docs.xysq.ai" target="_blank" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)}>Docs</a>
        <a href={APP_URL} className="nav-signin" onClick={() => setIsMenuOpen(false)}>Sign In / Up</a>
      </div>

      <div className="nav-btns">
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>
        <button
          className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <div className="bar" />
          <div className="bar" />
        </button>
      </div>
    </motion.nav>
  )
}
