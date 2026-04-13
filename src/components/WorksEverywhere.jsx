import { motion } from 'framer-motion'
import '../styles/works-everywhere.css'

const agents = [
  { name: 'Claude',        logo: '/logos/claude.svg',         darkBg: false },
  { name: 'Cursor',        logo: '/logos/cursor.svg',         darkBg: true  },
  { name: 'Windsurf',      logo: '/logos/windsurf.svg',       darkBg: true  },
  { name: 'Zed',           logo: '/logos/zed.svg',            darkBg: false },
  { name: 'Continue.dev',  logo: '/logos/continue.png',       darkBg: false },
  { name: 'Claude Desktop',logo: '/logos/claude-desktop.svg', darkBg: false },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}

const item = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function WorksEverywhere() {
  return (
    <section className="sect" id="works-everywhere">
      <div className="sect-inner">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          style={{ textAlign: 'center', marginBottom: '56px' }}
        >
          <span className="stag">Integrations</span>
          <h2>One memory layer.<br /><em>Every</em> agent you already use.</h2>
        </motion.div>

        <motion.div
          className="we-grid"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          {agents.map((agent) => (
            <motion.div key={agent.name} className="we-badge" variants={item}>
              <div className={`we-logo-wrap${agent.darkBg ? ' we-logo-wrap--dark' : ''}`}>
                <img src={agent.logo} alt={agent.name} className="we-badge-logo" />
              </div>
              <span className="we-badge-name">{agent.name}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          className="we-tags"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
        >
          MCP · SSE transport · OAuth · API Key
        </motion.p>

        <motion.p
          className="we-oneliner"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.55 }}
        >
          Connect in minutes. No rebuild required.
        </motion.p>
      </div>
    </section>
  )
}
