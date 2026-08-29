import { BRAND_PATHS } from './brandPaths'
import '../styles/integration-marquee.css'

// Everything that can reach xysq, in the order a reader recognises them.
// `mark` is a key into BRAND_PATHS; entries without one ride as wordmarks
// because no official mark is published we can use (OpenAI and Slack pulled
// theirs from simple-icons over trademark policy; the rest never had one).
const ITEMS = [
  { name: 'Claude', mark: 'claude' },
  { name: 'ChatGPT' },
  { name: 'Gemini CLI', mark: 'gemini' },
  { name: 'ADK' },
  { name: 'LangGraph', mark: 'langgraph' },
  { name: 'CrewAI', mark: 'crewai' },
  { name: 'OpenClaw' },
  { name: 'Hermes Agent' },
  { name: 'Python client', mark: 'python' },
  { name: 'MCP', mark: 'mcp' },
  { name: 'Gmail', mark: 'gmail' },
  { name: 'Slack', mark: 'slack' },
  { name: 'WhatsApp', mark: 'whatsapp' },
  { name: 'Telegram', mark: 'telegram' },
]

// Slack's four-bar hash, drawn here because it is not in the CC0 set.
const SLACK = [
  'M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52Zm1.271 0a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313Z',
  'M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834Zm0 1.271a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312Z',
  'M18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834Zm-1.268 0a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312Z',
  'M15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52Zm0-1.268a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313Z',
]

function Mark({ id }) {
  if (id === 'slack') {
    return (
      <svg className="im-mark" viewBox="0 0 24 24" aria-hidden="true">
        {SLACK.map((d) => (
          <path key={d.slice(0, 12)} d={d} fill="currentColor" />
        ))}
      </svg>
    )
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
      <p className="im-label">Integrates with</p>

      {/* the row is rendered twice; the track scrolls exactly one copy's width
          so the seam never shows. aria-hidden on the clone keeps it out of the
          reading order. */}
      <div className="im-viewport">
        <div className="im-track">
          {[0, 1].map((copy) => (
            <ul className="im-row" key={copy} aria-hidden={copy === 1 || undefined}>
              {ITEMS.map((it) => (
                <li className="im-item" key={it.name}>
                  {it.mark && <Mark id={it.mark} />}
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
