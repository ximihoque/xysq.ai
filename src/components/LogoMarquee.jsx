import '../styles/logo-marquee.css'

const logos = [
  { name: 'Claude',     src: '/logos/claude.svg',         tint: 'mono'  },
  { name: 'Cursor',     src: '/logos/cursor.svg',         tint: 'mono'  },
  { name: 'ChatGPT',    src: '/logos/chatgpt.svg',        tint: 'mono'  },
  { name: 'Codex',      src: '/logos/openai.svg',         tint: 'mono'  },
  { name: 'Antigravity',src: '/logos/antigravity.svg',    tint: 'mono'  },
  { name: 'Gemini',     src: '/logos/googlegemini.svg',   tint: 'mono'  },
  { name: 'Windsurf',   src: '/logos/windsurf.svg',       tint: 'mono'  },
  { name: 'Zed',        src: '/logos/zed.svg',            tint: 'mono'  },
  { name: 'Slack',      src: '/logos/slack.svg',          tint: 'mono'  },
  { name: 'Gmail',      src: '/logos/gmail.svg',          tint: 'mono'  },
  { name: 'Calendar',   src: '/logos/googlecalendar.svg', tint: 'mono'  },
  { name: 'Drive',      src: '/logos/googledrive.svg',    tint: 'mono'  },
  { name: 'Notion',     src: '/logos/notion.svg',         tint: 'mono'  },
  { name: 'GitHub',     src: '/logos/github.svg',         tint: 'mono'  },
  { name: 'Jira',       src: '/logos/jira.svg',           tint: 'mono'  },
  { name: 'Linear',     src: '/logos/linear.svg',         tint: 'mono'  },
]

// Duplicate the list so the CSS marquee animation loops seamlessly.
const track = [...logos, ...logos]

export default function LogoMarquee() {
  return (
    <div className="lm-wrap" aria-label="Works with Claude, Cursor, ChatGPT, Codex, Antigravity, Gemini, Windsurf, Zed, Slack, Gmail, Google Calendar, Google Drive, Notion, GitHub, Jira, Linear and more">
      <div className="lm-label">
        <span className="lm-label-line" />
        <span className="lm-label-text">Connects to every tool you use</span>
        <span className="lm-label-line" />
      </div>

      <div className="lm-viewport">
        <div className="lm-track" role="presentation">
          {track.map((logo, i) => (
            <div className="lm-item" key={`${logo.name}-${i}`} title={logo.name}>
              <img
                src={logo.src}
                alt=""
                aria-hidden="true"
                className={`lm-logo lm-logo--${logo.tint}`}
                loading="lazy"
              />
              <span className="lm-name">{logo.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
