import { motion } from 'framer-motion'
import '../styles/timeline-arc.css'

// Wide canvas: 4 main tools | 3 other tools | 3 AI agents
const W = 1500
const H = 230

// Primary named nodes — the main AI coding tools
const nodes = [
  { name: 'Claude',   x: 90,  y: 155, logo: '/logos/claude.svg',   labelY: 178, logoY: 100, logoAbove: true  },
  { name: 'Cursor',   x: 290, y: 52,  logo: '/logos/cursor.svg',   labelY: 34,  logoY: 67,  logoAbove: false },
  { name: 'Windsurf', x: 490, y: 150, logo: '/logos/windsurf.svg', labelY: 172, logoY: 97,  logoAbove: true  },
  { name: 'ChatGPT',  x: 680, y: 48,  logo: '/logos/chatgpt.svg',  labelY: 30,  logoY: 63,  logoAbove: false },
]

// Ghost dots between the 4 main nodes
const ghostDots = [
  { x: 175, y: 108, r: 2.5, opacity: 0.22, delay: 1.55 },
  { x: 238, y: 74,  r: 2,   opacity: 0.16, delay: 1.65 },
  { x: 375, y: 88,  r: 2.5, opacity: 0.20, delay: 1.80 },
  { x: 440, y: 128, r: 2,   opacity: 0.16, delay: 1.90 },
  { x: 568, y: 108, r: 2.5, opacity: 0.22, delay: 2.05 },
  { x: 626, y: 72,  r: 2,   opacity: 0.18, delay: 2.12 },
]

// "Other AI tools" — 3 nodes continuing the arc
const toolNodes = [
  { name: 'Zed',     x: 820,  y: 148, logo: '/logos/zed.svg',           labelY: 170, logoY: 96,  logoAbove: true,  delay: 2.30 },
  { name: 'Continue', x: 960,  y: 46, logo: '/logos/continue.png',       labelY: 28,  logoY: 61,  logoAbove: false, delay: 2.45 },
  { name: 'Claude\nDesktop', x: 1080, y: 145, logo: '/logos/claude-desktop.svg', labelY: 166, logoY: 94, logoAbove: true, delay: 2.60 },
]

// "AI Agents" — 3 nodes at the end, same arc, cyan accent
const agentNodes = [
  { name: 'Monitor',  x: 1210, y: 48,  labelY: 30,  logoAbove: false, delay: 3.10 },
  { name: 'Docs Bot', x: 1330, y: 150, labelY: 172, logoAbove: true,  delay: 3.25 },
  { name: 'Standup',  x: 1440, y: 68,  labelY: 50,  logoAbove: false, delay: 3.40 },
]

// Arc through all node positions
const ARC = [
  'M 90 155',
  'C 175 22, 220 22, 290 52',
  'C 378 92, 412 182, 490 150',
  'C 568 118, 618 16, 680 48',
  'C 748 82, 784 178, 820 148',
  'C 882 108, 922 14, 960 46',
  'C 1010 82, 1048 174, 1080 145',
  'C 1138 108, 1178 14, 1210 48',
  'C 1268 88, 1298 175, 1330 150',
  'C 1376 120, 1410 50, 1460 62',
].join(' ')

export default function TimelineArc() {
  return (
    <div className="timeline-arc">
      <svg viewBox={`0 0 ${W} ${H + 50}`} fill="none" xmlns="http://www.w3.org/2000/svg" overflow="visible">
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

        {/* Section backgrounds */}
        {/* "Other AI Tools" tint */}
        <motion.rect
          x={750} y={0} width={400} height={H}
          fill="rgba(0,229,200,0.015)"
          rx="0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.1, duration: 0.8 }}
        />
        {/* "AI Agents" tint */}
        <motion.rect
          x={1150} y={0} width={360} height={H}
          fill="rgba(0,229,200,0.03)"
          rx="0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.9, duration: 0.8 }}
        />

        {/* Divider lines */}
        <motion.line
          x1={752} y1={8} x2={752} y2={H - 8}
          stroke="rgba(0,229,200,0.15)" strokeWidth="1" strokeDasharray="3 5"
          initial={{ opacity: 0, scaleY: 0 }} animate={{ opacity: 1, scaleY: 1 }}
          style={{ transformOrigin: '752px 8px' }}
          transition={{ delay: 2.15, duration: 0.5 }}
        />
        <motion.line
          x1={1152} y1={8} x2={1152} y2={H - 8}
          stroke="rgba(0,229,200,0.2)" strokeWidth="1" strokeDasharray="3 5"
          initial={{ opacity: 0, scaleY: 0 }} animate={{ opacity: 1, scaleY: 1 }}
          style={{ transformOrigin: '1152px 8px' }}
          transition={{ delay: 2.95, duration: 0.5 }}
        />

        {/* Section header labels */}
        <motion.text x={950} y={H + 18} textAnchor="middle"
          fill="rgba(0,229,200,0.6)" fontSize="8" fontFamily="JetBrains Mono, monospace" letterSpacing="0.2em"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2, duration: 0.6 }}
        >
          + OTHER AI TOOLS
        </motion.text>
        <motion.text x={1310} y={H + 18} textAnchor="middle"
          fill="rgba(0,229,200,0.85)" fontSize="8" fontFamily="JetBrains Mono, monospace" letterSpacing="0.2em"
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

        {/* Main named nodes */}
        {nodes.map((node, i) => (
          <motion.g key={node.name}
            initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.3 + i * 0.2, duration: 0.45, ease: 'backOut' }}
          >
            <image href={node.logo}
              x={node.x - 20} y={node.logoY - 20} width="40" height="40"
              preserveAspectRatio="xMidYMid meet" style={{ opacity: 1 }}
            />
            <line
              x1={node.x} y1={node.logoAbove ? node.logoY + 20 : node.y + 7}
              x2={node.x} y2={node.logoAbove ? node.y - 7 : node.logoY - 20}
              stroke="rgba(0,229,200,0.2)" strokeWidth="0.75" strokeDasharray="2 3"
            />
            <circle cx={node.x} cy={node.y} r="7" fill="var(--bg)" stroke="rgba(0,229,200,0.9)" strokeWidth="2" filter="url(#node-glow)" />
            <circle cx={node.x} cy={node.y} r="3.5" fill="var(--cyan)" />
            <text x={node.x} y={node.labelY} textAnchor="middle"
              fill="rgba(210,230,240,0.95)" fontSize="10" fontFamily="JetBrains Mono, monospace" letterSpacing="0.07em"
            >
              {node.name}
            </text>
          </motion.g>
        ))}

        {/* Other AI Tool nodes — slightly dimmer */}
        {toolNodes.map((node, i) => (
          <motion.g key={`tool-${i}`}
            initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: node.delay, duration: 0.4, ease: 'backOut' }}
          >
            <image href={node.logo}
              x={node.x - 15} y={node.logoY - 15} width="30" height="30"
              preserveAspectRatio="xMidYMid meet" style={{ opacity: 0.8 }}
            />
            <line
              x1={node.x} y1={node.logoAbove ? node.logoY + 15 : node.y + 6}
              x2={node.x} y2={node.logoAbove ? node.y - 6 : node.logoY - 15}
              stroke="rgba(0,229,200,0.15)" strokeWidth="0.6" strokeDasharray="2 3"
            />
            <circle cx={node.x} cy={node.y} r="5.5" fill="var(--bg)" stroke="rgba(0,229,200,0.6)" strokeWidth="1.5" />
            <circle cx={node.x} cy={node.y} r="2.5" fill="rgba(0,229,200,0.65)" />
            {node.name === 'Claude\nDesktop' ? (
              <>
                <text x={node.x} y={node.labelY} textAnchor="middle"
                  fill="rgba(150,170,185,0.8)" fontSize="8.5" fontFamily="JetBrains Mono, monospace" letterSpacing="0.07em"
                >Claude</text>
                <text x={node.x} y={node.labelY + 10} textAnchor="middle"
                  fill="rgba(150,170,185,0.8)" fontSize="8.5" fontFamily="JetBrains Mono, monospace" letterSpacing="0.07em"
                >Desktop</text>
              </>
            ) : (
              <text x={node.x} y={node.labelY} textAnchor="middle"
                fill="rgba(150,170,185,0.8)" fontSize="8.5" fontFamily="JetBrains Mono, monospace" letterSpacing="0.07em"
              >
                {node.name}
              </text>
            )}
          </motion.g>
        ))}

        {/* AI Agent nodes — bright cyan, prominent */}
        {agentNodes.map((agent, i) => (
          <motion.g key={`agent-${i}`}
            initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: agent.delay, duration: 0.5, ease: 'backOut' }}
          >
            <line
              x1={agent.x} y1={agent.logoAbove ? agent.y + 28 : agent.y + 8}
              x2={agent.x} y2={agent.logoAbove ? agent.y - 8 : agent.y - 28}
              stroke="rgba(0,229,200,0.3)" strokeWidth="0.75" strokeDasharray="2 3"
            />
            {/* Outer ring pulse */}
            <circle cx={agent.x} cy={agent.y} r="10" fill="rgba(0,229,200,0.04)" stroke="rgba(0,229,200,0.25)" strokeWidth="1" />
            <circle cx={agent.x} cy={agent.y} r="7" fill="var(--bg)" stroke="rgba(0,229,200,1)" strokeWidth="2" filter="url(#strong-glow)" />
            <circle cx={agent.x} cy={agent.y} r="3.5" fill="var(--cyan)" />
            <text x={agent.x} y={agent.labelY} textAnchor="middle"
              fill="rgba(0,229,200,0.9)" fontSize="9" fontFamily="JetBrains Mono, monospace" letterSpacing="0.1em"
              filter="url(#arc-glow)"
            >
              {agent.name === 'Standup' ? (
                <>
                  <tspan x={agent.x} dy="0">Standup</tspan>
                  <tspan x={agent.x} dy="10">Bot</tspan>
                </>
              ) : agent.name}
            </text>
          </motion.g>
        ))}

        {/* Big bottom label */}
        <motion.text
          x={W / 2} y={H + 38}
          textAnchor="middle"
          fill="rgba(0,229,200,0.8)"
          fontSize="15"
          fontFamily="JetBrains Mono, monospace"
          letterSpacing="0.28em"
          filter="url(#strong-glow)"
          initial={{ opacity: 0, y: H + 48 }}
          animate={{ opacity: 1, y: H + 38 }}
          transition={{ delay: 3.7, duration: 1.0, ease: 'easeOut' }}
        >
          ONE IDENTITY · ACROSS EVERY TOOL · ACROSS TIME
        </motion.text>
      </svg>
    </div>
  )
}
