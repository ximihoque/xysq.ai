import { BRAND_PATHS } from './brandPaths'
import '../styles/integration-marquee.css'

// Everything that can reach xysq, in the order a reader recognises them.
// `mark` is a key into BRAND_PATHS; `img` is a raster mark rendered through a
// mask so it recolours like the svgs. Only Freshdesk has neither.
const ITEMS = [
  { name: 'Claude', mark: 'claude' },
  { name: 'ChatGPT', mark: 'openai' },
  { name: 'Gemini CLI', mark: 'gemini' },
  { name: 'ADK', mark: 'adk' },
  { name: 'LangGraph', mark: 'langgraph' },
  { name: 'CrewAI', mark: 'crewai' },
  { name: 'OpenClaw', mark: 'openclaw' },
  { name: 'Hermes Agent', img: '/marks/hermes.png' },
  { name: 'Python client', mark: 'python' },
  { name: 'MCP', mark: 'mcp' },
  { name: 'Shopify', mark: 'shopify' },
  { name: 'Freshdesk' },
  { name: 'Gmail', mark: 'gmail' },
  { name: 'Slack', mark: 'slack' },
  { name: 'WhatsApp', mark: 'whatsapp' },
  { name: 'Telegram', mark: 'telegram' },
]


function Mark({ id, img }) {
  if (img) {
    return <span className="im-mark mark-img" style={{ maskImage: `url(${img})`, WebkitMaskImage: `url(${img})` }} aria-hidden="true" />
  }
  return (
    <svg className="im-mark" viewBox="0 0 24 24" aria-hidden="true">
      <path d={BRAND_PATHS[id]} fill="currentColor" />
    </svg>
  )
}

export default function IntegrationMarquee() {
  return (
    <div className="im">
      <p className="im-label">Integrates with your existing stack</p>

      {/* the row is rendered twice; the track scrolls exactly one copy's width
          so the seam never shows. aria-hidden on the clone keeps it out of the
          reading order. */}
      <div className="im-viewport">
        <div className="im-track">
          {[0, 1].map((copy) => (
            <ul className="im-row" key={copy} aria-hidden={copy === 1 || undefined}>
              {ITEMS.map((it) => (
                <li className="im-item" key={it.name}>
                  {(it.mark || it.img) && <Mark id={it.mark} img={it.img} />}
                  {it.name}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  )
}
