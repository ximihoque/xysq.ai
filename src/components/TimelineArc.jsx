import { motion } from 'framer-motion'
import '../styles/timeline-arc.css'

// Wide canvas: 3 main tools | 3 other tools | 3 AI agents
const W = 1500
const H = 300

// Primary named nodes — the main AI coding tools (no Windsurf)
const nodes = [
  { name: 'Claude',  x: 90,  y: 200, logo: '/logos/claude.svg',  labelY: 264, logoY: 120, logoAbove: true,  darkBg: false },
  { name: 'Cursor',  x: 340, y: 65,  logo: '/logos/cursor.svg',  labelY: 20,  logoY: 110, logoAbove: false, darkBg: true  },
  { name: 'ChatGPT', x: 590, y: 196, logo: '/logos/chatgpt.svg', labelY: 264, logoY: 120, logoAbove: true,  darkBg: true  },
]

// Ghost dots between the 3 main nodes
const ghostDots = [
  { x: 190, y: 148, r: 3,   opacity: 0.22, delay: 1.55 },
  { x: 252, y: 102, r: 2.5, opacity: 0.16, delay: 1.65 },
  { x: 432, y: 112, r: 3,   opacity: 0.20, delay: 1.80 },
  { x: 510, y: 162, r: 2.5, opacity: 0.16, delay: 1.90 },
]

// "Other AI tools" — 3 nodes continuing the arc
const toolNodes = [
  { name: 'Windsurf', x: 790,  y: 65,  logo: '/logos/windsurf.svg', labelY: 18,  logoY: 108, logoAbove: false, darkBg: true,  delay: 2.30 },
  { name: 'Zed',      x: 960,  y: 196, logo: '/logos/zed.svg',       labelY: 252, logoY: 118, logoAbove: true,  darkBg: false, delay: 2.45 },
  { name: 'Continue', x: 1110, y: 62,  logo: '/logos/continue.png',  labelY: 16,  logoY: 104, logoAbove: false, darkBg: false, delay: 2.60 },
]

// "AI Agents" — 3 nodes at the end, same arc, cyan accent
const agentNodes = [
  { name: 'Monitor',  x: 1240, y: 196, labelY: 226, logoAbove: true,  delay: 3.10 },
  { name: 'Docs Bot', x: 1360, y: 60,  labelY: 36,  logoAbove: false, delay: 3.25 },
  { name: 'Standup',  x: 1470, y: 196, labelY: 226, logoAbove: true,  delay: 3.40 },
]

// Arc through all node positions
const ARC = [
  'M 90 200',
  'C 200 28, 260 28, 340 65',
  'C 440 118, 500 248, 590 196',
  'C 670 148, 730 18, 790 65',
  'C 860 118, 910 238, 960 196',
  'C 1020 148, 1068 18, 1110 62',
  'C 1160 112, 1200 238, 1240 196',
  'C 1290 140, 1330 18, 1360 60',
  'C 1400 112, 1440 248, 1470 196',
].join(' ')

export default function TimelineArc() {
  return (
    <div className="timeline-arc">
      <svg viewBox={`0 0 ${W} ${H + 100}`} fill="none" xmlns="http://www.w3.org/2000/svg" overflow="visible">
        <defs>
          <filter id="arc-glow">
            <feGaussianBlur stdDeviation="3" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="node-glow">
            <feGaussianBlur stdDeviation="3" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="strong-glow">
            <feGaussianBlur stdDeviation="5" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        <g className="arc-lines-group">
        {/* Section backgrounds */}
        {/* "Other AI Tools" tint */}
        <motion.rect
          x={700} y={0} width={490} height={H}
          fill="rgba(0,229,200,0.015)"
          rx="0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.1, duration: 0.8 }}
        />
        {/* "AI Agents" tint */}
        <motion.rect
          x={1190} y={0} width={320} height={H}
          fill="rgba(0,229,200,0.03)"
          rx="0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.9, duration: 0.8 }}
        />

        {/* Divider lines */}
        <motion.line
          x1={702} y1={8} x2={702} y2={H - 8}
          stroke="rgba(0,229,200,0.15)" strokeWidth="1" strokeDasharray="3 5"
          initial={{ opacity: 0, scaleY: 0 }} animate={{ opacity: 1, scaleY: 1 }}
          style={{ transformOrigin: '702px 8px' }}
          transition={{ delay: 2.15, duration: 0.5 }}
        />
        <motion.line
          x1={1192} y1={8} x2={1192} y2={H - 8}
          stroke="rgba(0,229,200,0.2)" strokeWidth="1" strokeDasharray="3 5"
          initial={{ opacity: 0, scaleY: 0 }} animate={{ opacity: 1, scaleY: 1 }}
          style={{ transformOrigin: '1192px 8px' }}
          transition={{ delay: 2.95, duration: 0.5 }}
        />

        {/* Section header labels */}
        <motion.text x={945} y={H + 22} textAnchor="middle"
          fill="rgba(0,229,200,0.9)" fontSize="13" fontFamily="JetBrains Mono, monospace" letterSpacing="0.18em"
          fontWeight="bold" filter="url(#arc-glow)"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2, duration: 0.6 }}
        >
          + OTHER AI TOOLS
        </motion.text>
        <motion.text x={1355} y={H + 22} textAnchor="middle"
          fill="rgba(0,229,200,0.9)" fontSize="13" fontFamily="JetBrains Mono, monospace" letterSpacing="0.18em"
          filter="url(#arc-glow)"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.0, duration: 0.6 }}
        >
          AI AGENTS
        </motion.text>

        {/* Arc — ambient layer */}
        <motion.path
          d={ARC}
          stroke="rgba(0,229,200,0.16)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.8, ease: 'easeInOut', delay: 0.2 }}
        />
        {/* Arc — glowing core */}
        <motion.path
          d={ARC}
          stroke="rgba(0,229,200,0.55)"
          strokeWidth="0.6"
          fill="none"
          strokeLinecap="round"
          filter="url(#arc-glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.8, ease: 'easeInOut', delay: 0.2 }}
        />

        {/* Ghost dots between main 4 nodes */}
        {ghostDots.map((d, i) => (
          <motion.circle key={`ghost-${i}`} cx={d.x} cy={d.y} r={d.r}
            fill={`rgba(0,229,200,${d.opacity})`}
            initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: d.delay, duration: 0.3, ease: 'easeOut' }}
          />
        ))}

        {/* Main named nodes — non-logo elements */}
        {nodes.map((node, i) => (
          <motion.g key={`node-lines-${node.name}`}
            initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.3 + i * 0.2, duration: 0.45, ease: 'backOut' }}
          >
            <line
              x1={node.x} y1={node.logoAbove ? node.logoY + 28 : node.y + 9}
              x2={node.x} y2={node.logoAbove ? node.y - 9 : node.logoY - 28}
              stroke="rgba(0,229,200,0.2)" strokeWidth="1" strokeDasharray="2 4"
            />
            <circle cx={node.x} cy={node.y} r="9" fill="var(--bg)" stroke="rgba(0,229,200,0.9)" strokeWidth="2.5" filter="url(#node-glow)" />
            <circle cx={node.x} cy={node.y} r="4.5" fill="var(--cyan)" />
            <text x={node.x} y={node.labelY} textAnchor="middle"
              fill="rgba(210,230,240,0.95)" fontSize="13" fontFamily="JetBrains Mono, monospace" letterSpacing="0.07em"
            >
              {node.name}
            </text>
          </motion.g>
        ))}

        {/* Other AI Tool nodes — non-logo elements */}
        {toolNodes.map((node, i) => (
          <motion.g key={`tool-lines-${i}`}
            initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: node.delay, duration: 0.4, ease: 'backOut' }}
          >
            <line
              x1={node.x} y1={node.logoAbove ? node.logoY + 20 : node.y + 7}
              x2={node.x} y2={node.logoAbove ? node.y - 7 : node.logoY - 20}
              stroke="rgba(0,229,200,0.15)" strokeWidth="0.8" strokeDasharray="2 3"
            />
            <circle cx={node.x} cy={node.y} r="7" fill="var(--bg)" stroke="rgba(0,229,200,0.6)" strokeWidth="1.8" />
            <circle cx={node.x} cy={node.y} r="3.2" fill="rgba(0,229,200,0.65)" />
            {node.name === 'Claude\nDesktop' ? (
              <>
                <text x={node.x} y={node.labelY} textAnchor="middle"
                  fill="rgba(150,170,185,0.8)" fontSize="11" fontFamily="JetBrains Mono, monospace" letterSpacing="0.07em"
                >Claude</text>
                <text x={node.x} y={node.labelY + 13} textAnchor="middle"
                  fill="rgba(150,170,185,0.8)" fontSize="11" fontFamily="JetBrains Mono, monospace" letterSpacing="0.07em"
                >Desktop</text>
              </>
            ) : (
              <text x={node.x} y={node.labelY} textAnchor="middle"
                fill="rgba(150,170,185,0.8)" fontSize="11" fontFamily="JetBrains Mono, monospace" letterSpacing="0.07em"
              >
                {node.name}
              </text>
            )}
          </motion.g>
        ))}

        {/* AI Agent nodes — non-logo elements */}
        {agentNodes.map((agent, i) => (
          <motion.g key={`agent-lines-${i}`}
            initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: agent.delay, duration: 0.5, ease: 'backOut' }}
          >
            <line
              x1={agent.x} y1={agent.logoAbove ? agent.y + 36 : agent.y + 10}
              x2={agent.x} y2={agent.logoAbove ? agent.y - 10 : agent.y - 36}
              stroke="rgba(0,229,200,0.3)" strokeWidth="1" strokeDasharray="2 3"
            />
            {/* Outer ring pulse */}
            <circle cx={agent.x} cy={agent.y} r="14" fill="rgba(0,229,200,0.04)" stroke="rgba(0,229,200,0.25)" strokeWidth="1" />
            <circle cx={agent.x} cy={agent.y} r="9" fill="var(--bg)" stroke="rgba(0,229,200,1)" strokeWidth="2.5" filter="url(#strong-glow)" />
            <circle cx={agent.x} cy={agent.y} r="4.5" fill="var(--cyan)" />
            <text x={agent.x} y={agent.labelY} textAnchor="middle"
              fill="rgba(0,229,200,0.9)" fontSize="12" fontFamily="JetBrains Mono, monospace" letterSpacing="0.1em"
              filter="url(#arc-glow)"
            >
              {agent.name === 'Standup' ? (
                <>
                  <tspan x={agent.x} dy="0">Standup</tspan>
                  <tspan x={agent.x} dy="14">Bot</tspan>
                </>
              ) : agent.name}
            </text>
          </motion.g>
        ))}

        </g>

        {/* Big bottom label — outside arc-lines-group for independent light mode color */}
        <motion.text
          x={W / 2} y={H + 64}
          textAnchor="middle"
          fontSize="32"
          fontFamily="JetBrains Mono, monospace"
          letterSpacing="0.18em"
          filter="url(#strong-glow)"
          className="arc-identity-label"
          initial={{ opacity: 0, y: H + 78 }}
          animate={{ opacity: 1, y: H + 64 }}
          transition={{ delay: 3.7, duration: 1.0, ease: 'easeOut' }}
        >
          ONE IDENTITY · ACROSS EVERY TOOL · ACROSS TIME
        </motion.text>

        {/* Logo images — outside arc-lines-group so light mode filter doesn't affect them */}
        {nodes.map((node, i) => (
          <motion.g key={`node-logo-${node.name}`}
            initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.3 + i * 0.2, duration: 0.45, ease: 'backOut' }}
          >
            {node.darkBg && (
              <rect
                x={node.x - 28} y={node.logoY - 28} width="56" height="56"
                rx="10" fill="#111827" className="logo-dark-bg"
              />
            )}
            <image href={node.logo}
              x={node.x - 28} y={node.logoY - 28} width="56" height="56"
              preserveAspectRatio="xMidYMid meet" style={{ opacity: 1 }}
            />
          </motion.g>
        ))}
        {toolNodes.map((node, i) => (
          <motion.g key={`tool-logo-${i}`}
            initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: node.delay, duration: 0.4, ease: 'backOut' }}
          >
            {node.darkBg && (
              <rect
                x={node.x - 20} y={node.logoY - 20} width="40" height="40"
                rx="8" fill="#111827" className="logo-dark-bg"
              />
            )}
            <image href={node.logo}
              x={node.x - 20} y={node.logoY - 20} width="40" height="40"
              preserveAspectRatio="xMidYMid meet" style={{ opacity: 0.8 }}
            />
          </motion.g>
        ))}
      </svg>
    </div>
  )
}
