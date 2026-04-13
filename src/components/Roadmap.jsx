import { motion } from 'framer-motion'
import '../styles/roadmap.css'

const phases = [
  {
    num: '01',
    label: 'Foundation',
    status: 'live',
    items: ['Individual identity layer', 'Persistent memory', 'Single-model integration'],
  },
  {
    num: '02',
    label: 'Expansion',
    status: 'live',
    items: ['Multi-model interoperability', 'Memory structuring & retrieval', 'Developer APIs'],
  },
  {
    num: '03',
    label: 'Collaboration',
    status: 'live',
    items: ['Team identity layer', 'Shared memory graphs', 'Context continuity across team'],
  },
  {
    num: '04',
    label: 'Organization',
    status: 'roadmap',
    items: ['Org identity layer', 'Cross-team intelligence', 'Knowledge persistence'],
  },
  {
    num: '05',
    label: 'Ecosystem',
    status: 'roadmap',
    items: ['Identity as a standard', 'Third-party integrations', 'Network effects'],
  },
]

export default function Roadmap() {
  return (
    <section className="roadmap-section">
      <div className="roadmap-header">
        <span className="roadmap-stag">Product Roadmap</span>
        <h2 className="roadmap-heading">
          Where we are. <em>Where we&rsquo;re going.</em>
        </h2>
      </div>
      <div className="roadmap-track">
        {phases.map((phase, i) => (
          <motion.div
            key={phase.num}
            className={`roadmap-phase ${phase.status}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: i * 0.15, duration: 0.55, ease: 'easeOut' }}
          >
            <span className="roadmap-num">{phase.num}</span>
            <div className="roadmap-label">{phase.label}</div>
            <span className={`roadmap-badge ${phase.status}`}>
              {phase.status === 'live' ? 'Live' : 'Roadmap'}
            </span>
            <ul className="roadmap-items">
              {phase.items.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
