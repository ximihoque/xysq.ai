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
        <svg className="logo-lychee" viewBox="25 22 150 205" width="22" height="30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="140" r="76" fill="#ff6b7a"/>
          <circle cx="100" cy="64"  r="10"  fill="#ff6b7a"/><circle cx="83"  cy="67"  r="9.5" fill="#ff6b7a"/>
          <circle cx="67"  cy="75"  r="9"   fill="#ff6b7a"/><circle cx="53"  cy="88"  r="9"   fill="#ff6b7a"/>
          <circle cx="43"  cy="104" r="9"   fill="#ff6b7a"/><circle cx="37"  cy="122" r="9"   fill="#ff6b7a"/>
          <circle cx="36"  cy="141" r="9"   fill="#ff6b7a"/><circle cx="39"  cy="160" r="9"   fill="#ff6b7a"/>
          <circle cx="47"  cy="178" r="9"   fill="#ff6b7a"/><circle cx="59"  cy="193" r="9"   fill="#ff6b7a"/>
          <circle cx="75"  cy="204" r="9.5" fill="#ff6b7a"/><circle cx="100" cy="210" r="10"  fill="#ff6b7a"/>
          <circle cx="125" cy="204" r="9.5" fill="#ff6b7a"/><circle cx="141" cy="193" r="9"   fill="#ff6b7a"/>
          <circle cx="153" cy="178" r="9"   fill="#ff6b7a"/><circle cx="161" cy="160" r="9"   fill="#ff6b7a"/>
          <circle cx="164" cy="141" r="9"   fill="#ff6b7a"/><circle cx="163" cy="122" r="9"   fill="#ff6b7a"/>
          <circle cx="157" cy="104" r="9"   fill="#ff6b7a"/><circle cx="147" cy="88"  r="9"   fill="#ff6b7a"/>
          <circle cx="133" cy="75"  r="9"   fill="#ff6b7a"/><circle cx="117" cy="67"  r="9.5" fill="#ff6b7a"/>
          <circle cx="100" cy="140" r="76" fill="none" stroke="white" strokeWidth="5"/>
          <defs><clipPath id="nav-fc"><circle cx="100" cy="140" r="74"/></clipPath></defs>
          <g clipPath="url(#nav-fc)">
            <g stroke="white" strokeWidth="1.5" opacity="0.3" fill="none">
              <line x1="75" y1="102" x2="93" y2="95"/><line x1="93" y1="95" x2="114" y2="99"/>
              <line x1="101" y1="110" x2="97" y2="133"/><line x1="97" y1="133" x2="117" y2="148"/>
              <line x1="67" y1="165" x2="87" y2="175"/><line x1="87" y1="175" x2="101" y2="192"/>
            </g>
            <g fill="white" opacity="0.65">
              <circle cx="75" cy="102" r="4.5"/><circle cx="114" cy="99" r="5"/>
              <circle cx="101" cy="110" r="5.5"/><circle cx="97" cy="133" r="5"/>
              <circle cx="117" cy="148" r="4.5"/><circle cx="101" cy="192" r="5"/>
            </g>
          </g>
          <path d="M100 66 Q94 54 88 44" stroke="white" strokeWidth="5.5" strokeLinecap="round"/>
          <path d="M88 44 C76 26 40 28 36 56 C32 76 48 96 70 94 C84 92 92 76 88 44Z" fill="#22c4a5" stroke="white" strokeWidth="3.5" strokeLinejoin="round"/>
          <path d="M88 44 C98 30 128 24 146 36 C156 44 150 58 134 60 C116 62 96 56 88 44Z" fill="#22c4a5" stroke="white" strokeWidth="3.5" strokeLinejoin="round"/>
        </svg>
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
