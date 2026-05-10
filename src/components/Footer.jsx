import { Link, useLocation } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { USE_CASE_CATEGORIES } from '../data/useCases'
import { handleHashLink } from '../lib/hashLink'
import '../styles/footer.css'

// Inline brand icons — Lucide intentionally doesn't ship third-party logos.
function GithubIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56 0-.27-.01-1.18-.02-2.14-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.16 1.18a10.96 10.96 0 0 1 5.76 0c2.2-1.49 3.16-1.18 3.16-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.84 1.18 3.1 0 4.42-2.7 5.4-5.27 5.68.41.36.78 1.06.78 2.15 0 1.55-.01 2.8-.01 3.18 0 .31.21.67.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5Z"/>
    </svg>
  )
}

function XIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26L23 21.75h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1 2.25h6.828l4.713 6.231 5.703-6.231Zm-1.16 17.52h1.833L7.084 4.126H5.117L17.084 19.77Z"/>
    </svg>
  )
}

const APP_URL = import.meta.env.VITE_APP_URL || 'https://app.xysq.ai'

const FEATURE_LINKS = [
  { label: 'Unified memory', to: '/#memory' },
  { label: 'Teams',          to: '/#teams' },
  { label: 'Organise',       to: '/#organise' },
]

const RESOURCE_LINKS = [
  { label: 'Docs',            href: 'https://docs.xysq.ai',                            external: true },
  { label: 'SDK',             href: 'https://docs.xysq.ai/sdk/getting-started',        external: true },
  { label: 'Product updates', href: 'https://docs.xysq.ai/product-releases/2026',      external: true },
  { label: 'App',             href: APP_URL,                                           external: true },
]

const COMPANY_LINKS = [
  { label: 'Contact', to: '/contact' },
  { label: 'Privacy', to: '/privacy' },
]

const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/xysq-ai', Icon: GithubIcon },
  { label: 'X',      href: 'https://x.com/xysq_ai',      Icon: XIcon },
]

function FooterLink({ to, href, external, children }) {
  const { pathname } = useLocation()
  if (to) {
    const onClick = to.includes('#')
      ? (e) => handleHashLink(e, to, pathname)
      : undefined
    return <Link to={to} className="ft-link" onClick={onClick}>{children}</Link>
  }
  return (
    <a
      href={href}
      className="ft-link"
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
    >
      {children}
      {external && <ArrowUpRight className="ft-link-arrow" size={12} strokeWidth={2} />}
    </a>
  )
}

export default function Footer() {
  return (
    <footer className="ft">
      <div className="ft-inner">
        <div className="ft-top">
          {/* Brand */}
          <div className="ft-brand">
            <Link to="/" className="ft-logo">
              <img src="/logo.svg" alt="" width="22" height="30" />
              <span className="ft-logo-word">xysq<span>.ai</span></span>
            </Link>
            <p className="ft-tagline">
              Memory that follows you across every AI tool — consent-first,
              never trained on.
            </p>
            <a
              className="ft-status"
              href="https://status.xysq.ai"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="ft-status-dot" />
              All systems normal
            </a>
          </div>

          {/* Link columns */}
          <div className="ft-cols">
            <div className="ft-col">
              <h4 className="ft-col-title">Features</h4>
              <ul>
                {FEATURE_LINKS.map((l) => (
                  <li key={l.label}><FooterLink to={l.to}>{l.label}</FooterLink></li>
                ))}
              </ul>
            </div>

            <div className="ft-col">
              <h4 className="ft-col-title">Use cases</h4>
              <ul>
                {USE_CASE_CATEGORIES.map((c) => (
                  <li key={c.slug}>
                    <FooterLink to={`/use-cases/${c.slug}`}>{c.title}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="ft-col">
              <h4 className="ft-col-title">Resources</h4>
              <ul>
                {RESOURCE_LINKS.map((l) => (
                  <li key={l.label}><FooterLink {...l}>{l.label}</FooterLink></li>
                ))}
              </ul>
            </div>

            <div className="ft-col">
              <h4 className="ft-col-title">Company</h4>
              <ul>
                {COMPANY_LINKS.map((l) => (
                  <li key={l.label}><FooterLink to={l.to}>{l.label}</FooterLink></li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="ft-bar">
          <span className="ft-copy">
            © {new Date().getFullYear()} xysq.ai · Memory infrastructure for AI.
          </span>
          <div className="ft-socials">
            {SOCIALS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="ft-social"
                aria-label={label}
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
