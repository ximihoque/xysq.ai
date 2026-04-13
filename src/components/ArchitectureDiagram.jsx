import { motion } from 'framer-motion'
import '../styles/architecture-diagram.css'

const layers = [
  {
    id: 'agents',
    label: 'AI AGENTS',
    items: ['Claude', 'GPT-4', 'Custom Agent'],
    color: 'var(--silver)',
  },
  {
    id: 'xysq',
    label: 'xysq layer',
    items: ['Identity', 'Memory Vault', 'Knowledge Base', 'Context Engine'],
    color: 'var(--cyan)',
    highlight: true,
  },
  {
    id: 'data',
    label: 'DATA & CONSENT',
    items: ['Business Knowledge', 'User Consent Controls', 'Raw Interaction Data'],
    color: 'var(--silver)',
  },
]

function FlowConnector({ fromCount, toCount, reverse = false, delay = 0 }) {
  const W = 600
  const H = 56
  const midY = H / 2

  // Evenly space source and target points
  const srcPoints = Array.from({ length: fromCount }, (_, i) =>
    ((i + 1) / (fromCount + 1)) * W
  )
  const dstPoints = Array.from({ length: toCount }, (_, i) =>
    ((i + 1) / (toCount + 1)) * W
  )

  const topY = reverse ? H : 0
  const botY = reverse ? 0 : H

  const paths = srcPoints.flatMap((sx) =>
    dstPoints.map((dx) => {
      const cp1x = sx
      const cp1y = midY
      const cp2x = dx
      const cp2y = midY
      return `M ${sx} ${topY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${dx} ${botY}`
    })
  )

  return (
    <div className="arch-flow-connector">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        className="arch-flow-svg"
      >
        <defs>
          <linearGradient id={`fg-${delay}`} x1="0" y1={reverse ? '1' : '0'} x2="0" y2={reverse ? '0' : '1'}>
            <stop offset="0%" stopColor="rgba(0,229,200,0.5)" />
            <stop offset="100%" stopColor="rgba(0,229,200,0.15)" />
          </linearGradient>
        </defs>
        {paths.map((d, i) => (
          <motion.path
            key={i}
            d={d}
            fill="none"
            stroke={`url(#fg-${delay})`}
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: delay + i * 0.05, duration: 0.6, ease: 'easeOut' }}
          />
        ))}
        {/* Central spine */}
        <motion.line
          x1={W / 2} y1={topY}
          x2={W / 2} y2={botY}
          stroke="rgba(0,229,200,0.4)"
          strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay, duration: 0.5, ease: 'easeOut' }}
        />
      </svg>
    </div>
  )
}

export default function ArchitectureDiagram() {
  return (
    <div className="arch-diagram">
      <div className="arch-layers">
        {layers.map((layer, i) => (
          <div key={layer.id}>
            <motion.div
              className={`arch-layer ${layer.highlight ? 'arch-layer--highlight' : ''}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.2, duration: 0.6, ease: 'easeOut' }}
            >
              <span className="arch-layer-label" style={{ color: layer.color }}>{layer.label}</span>
              <div className="arch-layer-items">
                {layer.items.map(item => (
                  <span key={item} className="arch-item">{item}</span>
                ))}
              </div>
            </motion.div>

            {i === 0 && (
              <FlowConnector
                fromCount={layers[0].items.length}
                toCount={layers[1].items.length}
                reverse={false}
                delay={0.4}
              />
            )}
            {i === 1 && (
              <FlowConnector
                fromCount={layers[1].items.length}
                toCount={layers[2].items.length}
                reverse={false}
                delay={0.7}
              />
            )}
          </div>
        ))}
      </div>
      <p className="arch-caption">The layer underneath. Drop it in alongside your existing agent. No rebuild.</p>
    </div>
  )
}
