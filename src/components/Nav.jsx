import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  ChevronDown, Brain, Users, FolderKanban, ArrowUpRight,
  Sparkles, Hammer, Network, Target,
} from 'lucide-react'
import { USE_CASE_CATEGORIES } from '../data/useCases'
import { handleHashLink } from '../lib/hashLink'
import '../styles/nav.css'

const APP_URL = import.meta.env.VITE_APP_URL || 'https://app.xysq.ai'

const USE_CASE_ICONS = { Sparkles, Hammer, Network, Target }

const FEATURES = [
  {
    id: 'unified-memory',
    label: 'Unified memory',
    description: 'One memory across every AI tool you use.',
    href: '/#memory',
    Icon: Brain,
  },
  {
    id: 'teams',
    label: 'Teams',
    description: 'Shared context across collaborators.',
    href: '/#teams',
    Icon: Users,
  },
  {
    id: 'organise',
    label: 'Organise',
    description: 'Drop in documents and conversations — all queryable.',
    href: '/#organise',
    Icon: FolderKanban,
  },
]

function SunIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  )
}

// Dropdown trigger + panel.
//   • Desktop: opens on hover/focus; an invisible bridge (::before) covers the
//     14px gap so the cursor can travel from trigger → panel without the panel
//     vanishing. Closes after a short timeout.
//   • Mobile (inside the open burger menu): renders as an inline accordion.
function NavDropdown({ label, panelClassName = '', children, isMobile }) {
  const [open, setOpen] = useState(false)
  const closeTimer = useRef(null)

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }
  const scheduleClose = () => {
    cancelClose()
    closeTimer.current = setTimeout(() => setOpen(false), 140)
  }
  useEffect(() => () => cancelClose(), [])

  if (isMobile) {
    return (
      <div className="nav-drop nav-drop--mobile">
        <span className="nav-drop-label nav-drop-label--mobile">{label}</span>
        <div className={`nav-drop-panel nav-drop-panel--mobile ${panelClassName}`}>
          {children}
        </div>
      </div>
    )
  }

  return (
    <div
      className={`nav-drop${open ? ' nav-drop--open' : ''}`}
      onMouseEnter={() => { cancelClose(); setOpen(true) }}
      onMouseLeave={scheduleClose}
      onFocus={() => { cancelClose(); setOpen(true) }}
      onBlur={scheduleClose}
    >
      <button
        type="button"
        className="nav-drop-label"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
      >
        {label}
        <ChevronDown size={13} className="nav-drop-chev" strokeWidth={2.2} />
      </button>
      <div className={`nav-drop-panel ${panelClassName}`} role="menu">
        {children}
      </div>
    </div>
  )
}

export default function Nav() {
  const { pathname } = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [theme, setTheme] = useState(() =>
    typeof window !== 'undefined' ? (localStorage.getItem('theme') || 'dark') : 'dark'
  )

  const { scrollY } = useScroll()
  // Backdrop AND bottom hairline both fade in past 60px of scroll
  const backdropOpacity = useTransform(scrollY, [0, 60], [0, 1])
  const hairlineOpacity = useTransform(scrollY, [0, 60], [0, 1])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')
  const toggleMenu = () => setIsMenuOpen(v => !v)
  const closeMenu = () => setIsMenuOpen(false)

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset'
    return () => { document.body.style.overflow = 'unset' }
  }, [isMenuOpen])

  useEffect(() => { setIsMenuOpen(false) }, [pathname])

  const featuresPanel = (
    <ul className="nav-drop-list nav-drop-list--features">
      {FEATURES.map((f) => {
        const Icon = f.Icon
        return (
          <li key={f.id}>
            <Link
              to={f.href}
              className="nav-drop-item"
              onClick={(e) => handleHashLink(e, f.href, pathname, closeMenu)}
            >
              <span className="nav-drop-item-icon"><Icon strokeWidth={1.6} /></span>
              <span className="nav-drop-item-text">
                <span className="nav-drop-item-title">{f.label}</span>
                <span className="nav-drop-item-desc">{f.description}</span>
              </span>
              <ArrowUpRight className="nav-drop-item-arrow" size={16} strokeWidth={1.8} />
            </Link>
          </li>
        )
      })}
    </ul>
  )

  const useCasesPanel = (
    <div className="nav-mega">
      <div className="nav-mega-grid">
        {USE_CASE_CATEGORIES.map((c) => {
          const Icon = USE_CASE_ICONS[c.icon]
          return (
            <Link
              key={c.slug}
              to={`/use-cases/${c.slug}`}
              className="nav-mega-cell"
              onClick={closeMenu}
            >
              {Icon && (
                <span className="nav-mega-cell-icon" aria-hidden="true">
                  <Icon strokeWidth={1.6} />
                </span>
              )}
              <span className="nav-mega-cell-body">
                <span className="nav-mega-eyebrow">{c.eyebrow}</span>
                <span className="nav-mega-title">{c.title}</span>
                <span className="nav-mega-personas">
                  {c.personas.map((p) => p.name).join(' · ')}
                </span>
              </span>
              <ArrowUpRight className="nav-mega-arrow" size={16} strokeWidth={1.8} />
            </Link>
          )
        })}
      </div>
    </div>
  )

  return (
    <motion.nav
      className={isMenuOpen ? 'menu-open' : ''}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <motion.div className="nav-backdrop" style={{ opacity: backdropOpacity }} />
      <motion.div className="nav-hairline" style={{ opacity: hairlineOpacity }} />

      <Link to="/" className="nav-logo" onClick={closeMenu}>
        <img src="/logo.svg" alt="xysq" width="22" height="30" />
        <span className="nav-logo-word">xysq<span>.ai</span></span>
      </Link>

      <div className={`nav-center${isMenuOpen ? ' open' : ''}`}>
        <NavDropdown label="Features" isMobile={isMenuOpen}>
          {featuresPanel}
        </NavDropdown>

        <NavDropdown
          label="Use cases"
          panelClassName="nav-drop-panel--mega"
          isMobile={isMenuOpen}
        >
          {useCasesPanel}
        </NavDropdown>

        <a
          href="https://docs.xysq.ai"
          target="_blank"
          rel="noopener noreferrer"
          onClick={closeMenu}
          className="nav-link"
        >
          Docs
        </a>

        <a
          href="https://docs.xysq.ai/sdk/getting-started"
          target="_blank"
          rel="noopener noreferrer"
          onClick={closeMenu}
          className="nav-link"
        >
          SDK
        </a>

        {/* Mobile: CTA appears inside the menu so users on small screens see it */}
        <a href={APP_URL} className="nav-cta nav-cta--mobile" onClick={closeMenu}>
          Get started
          <ArrowUpRight size={14} strokeWidth={2} />
        </a>
      </div>

      <div className="nav-end">
        <button className="nav-theme" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>
        <a href={APP_URL} className="nav-cta nav-cta--desktop">
          Get started
          <ArrowUpRight size={14} strokeWidth={2} />
        </a>
        <button
          className={`nav-burger ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className="nav-burger-bar" />
          <span className="nav-burger-bar" />
        </button>
      </div>
    </motion.nav>
  )
}
