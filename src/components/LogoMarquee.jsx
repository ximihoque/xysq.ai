import '../styles/logo-marquee.css'

// Two parallel marquees — AI tools (top, scrolling right→left) and the apps
// they read context from (bottom, scrolling left→right). Opposite directions
// give a sense of two streams crossing through xysq.

const aiTools = [
  { name: 'Claude',      src: '/logos/claude.svg',         tint: 'mono' },
  { name: 'Cursor',      src: '/logos/cursor.svg',         tint: 'mono' },
  { name: 'ChatGPT',     src: '/logos/chatgpt.svg',        tint: 'mono' },
  { name: 'Codex',       src: '/logos/openai.svg',         tint: 'mono' },
  { name: 'Antigravity', src: '/logos/antigravity.svg',    tint: 'mono' },
  { name: 'Gemini',      src: '/logos/googlegemini.svg',   tint: 'mono' },
  { name: 'Windsurf',    src: '/logos/windsurf.svg',       tint: 'mono' },
  { name: 'Zed',         src: '/logos/zed.svg',            tint: 'mono' },
]

const apps = [
  { name: 'Slack',    src: '/logos/slack.svg',          tint: 'mono' },
  { name: 'Gmail',    src: '/logos/gmail.svg',          tint: 'mono' },
  { name: 'Calendar', src: '/logos/googlecalendar.svg', tint: 'mono' },
  { name: 'Drive',    src: '/logos/googledrive.svg',    tint: 'mono' },
  { name: 'Notion',   src: '/logos/notion.svg',         tint: 'mono' },
  { name: 'GitHub',   src: '/logos/github.svg',         tint: 'mono' },
  { name: 'Jira',     src: '/logos/jira.svg',           tint: 'mono' },
  { name: 'Linear',   src: '/logos/linear.svg',         tint: 'mono' },
]

// Duplicate each list so the CSS marquee animation loops seamlessly.
const aiTrack  = [...aiTools, ...aiTools]
const appsTrack = [...apps, ...apps]

function Item({ logo, keyPrefix, idx }) {
  return (
    <div className="lm-item" key={`${keyPrefix}-${logo.name}-${idx}`} title={logo.name}>
      <img
        src={logo.src}
        alt=""
        aria-hidden="true"
        className={`lm-logo lm-logo--${logo.tint}`}
        loading="lazy"
        width="24"
        height="24"
      />
      <span className="lm-name">{logo.name}</span>
    </div>
  )
}

export default function LogoMarquee() {
  return (
    <div
      className="lm-wrap"
      aria-label="Connects AI tools (Claude, Cursor, ChatGPT, Codex, Antigravity, Gemini, Windsurf, Zed) to the apps you already use (Slack, Gmail, Google Calendar, Google Drive, Notion, GitHub, Jira, Linear)"
    >
      <div className="lm-label">
        <span className="lm-label-line" />
        <span className="lm-label-text">Connects every AI tool to every app</span>
        <span className="lm-label-line" />
      </div>

      <div className="lm-viewport">
        <div className="lm-track lm-track--rtl" role="presentation">
          {aiTrack.map((logo, i) => (
            <Item key={`ai-${i}`} logo={logo} keyPrefix="ai" idx={i} />
          ))}
        </div>

        <div className="lm-track lm-track--ltr" role="presentation">
          {appsTrack.map((logo, i) => (
            <Item key={`app-${i}`} logo={logo} keyPrefix="app" idx={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
