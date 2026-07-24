import { motion } from 'framer-motion'
import { FileText, PenLine, ChevronDown, ArrowRight } from 'lucide-react'
import XysqLogo from './XysqLogo'
import '../styles/capture-section.css'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay },
})

const aiTools = [
  { name: 'Claude', logo: '/logos/claude.svg' },
  { name: 'Cursor', logo: '/logos/cursor.svg', invert: true },
  { name: 'ChatGPT', logo: '/logos/chatgpt.svg', invert: true },
  { name: 'Gemini', logo: '/logos/gemini-c.svg' },
]

export default function CaptureSection() {
  return (
    <section className="cpt-section" id="capture">
      <div className="cpt-inner">
        {/* ── Visual: the four real inputs → one context graph ── */}
        <motion.div className="cpt-visual" {...fade(0.15)}>
          <div
            className="cpt-frame"
            role="img"
            aria-label="Capture sources: AI sessions over MCP from Claude, Cursor, ChatGPT and Gemini; uploaded files; Chrome capture; and decisions saved by hand. Everything distills into one context graph"
          >
            <div className="cpt-grid">
              <div className="cpt-src">
                <span className="cpt-src-title">AI sessions</span>
                <span className="cpt-src-logos" aria-hidden="true">
                  {aiTools.map((t) => (
                    <img
                      key={t.name}
                      src={t.logo}
                      alt=""
                      title={t.name}
                      className={t.invert ? 'cpt-logo cpt-logo--invert' : 'cpt-logo'}
                      width="18"
                      height="18"
                      loading="lazy"
                    />
                  ))}
                </span>
                <span className="cpt-src-sub">over MCP, as you work</span>
              </div>
              <div className="cpt-src">
                <span className="cpt-src-title">Files</span>
                <span className="cpt-src-icon" aria-hidden="true"><FileText size={16} strokeWidth={1.7} /></span>
                <span className="cpt-src-sub">PDFs, docs, images, code</span>
              </div>
              <div className="cpt-src">
                <span className="cpt-src-title">Browser</span>
                <span className="cpt-src-icon" aria-hidden="true">
                  <img src="/chrome-logo.svg" alt="" width="15" height="15" />
                </span>
                <span className="cpt-src-sub">clip from the Chrome extension</span>
              </div>
              <div className="cpt-src">
                <span className="cpt-src-title">By hand</span>
                <span className="cpt-src-icon" aria-hidden="true"><PenLine size={16} strokeWidth={1.7} /></span>
                <span className="cpt-src-sub">save a decision when it's made</span>
              </div>
            </div>

            <span className="cpt-flow" aria-hidden="true">
              <ChevronDown size={13} strokeWidth={2} /> distilled by the engine
            </span>

            <div className="cpt-graph">
              <XysqLogo size={16} />
              <span>Your context graph</span>
            </div>
          </div>
        </motion.div>

        {/* ── Text ── */}
        <motion.div className="cpt-text" {...fade(0)}>
          <h2 className="cpt-headline">
            Captured where the work<br />
            <em>actually happens.</em>
          </h2>

          <p className="cpt-deck">
            No pipelines to babysit. Connect your AI tools over MCP and every
            session flows in. Drop in files, clip from the browser, or save a
            decision by hand. The engine distills all of it into your context
            graph.
          </p>

          {/* faces: one capability, both audiences */}
          <div className="cpt-faces">
            <div className="cpt-face">
              <span className="cpt-face-label">For builders</span>
              <p className="cpt-face-body">
                Wire it into your product over MCP and the SDK. Every agent
                you ship starts informed.
              </p>
              <a href="https://docs.xysq.ai" className="cpt-face-link" target="_blank" rel="noopener noreferrer">
                Read the docs <ArrowRight size={13} strokeWidth={2} />
              </a>
            </div>
            <div className="cpt-face">
              <span className="cpt-face-label">For teams</span>
              <p className="cpt-face-body">
                Sessions from Claude, Cursor, and ChatGPT become shared
                context, automatically.
              </p>
              <a href="https://app.xysq.ai" className="cpt-face-link">
                Start free <ArrowRight size={13} strokeWidth={2} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
