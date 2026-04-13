import { motion } from 'framer-motion';
import GlassSnippet from './GlassSnippet';
import ContextFlow from './ContextFlow';
import '../styles/what-it-is.css';

const CODE = `# Agent connects. Context loads instantly.
await authenticate()

context = await memory_surface(
    "current projects and working preferences",
    budget="low"
)

# Agent starts informed. No re-introduction needed.`;

export default function WhatItIs() {
  return (
    <section className="sect">
      <div className="sect-inner">
        <div className="wit-grid">
          {/* Left column */}
          <motion.div
            className="wit-left"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0 }}
          >
            <span className="wit-tag">memory layer · MCP · consent-first</span>
            <h3 className="wit-headline">
              It observes across interactions, captures what matters, and refines its understanding of you over time.
            </h3>
            <p className="wit-body">
              One identity. Every agent you use. No re-introduction required.
            </p>
          </motion.div>

          {/* Right column */}
          <motion.div
            className="wit-right"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
          >
            <GlassSnippet
              code={CODE}
              label="Connect once. Remembered everywhere."
              delay={0.15}
            />
          </motion.div>
        </div>
        <div style={{ marginTop: '96px' }}>
          <ContextFlow />
        </div>
      </div>
    </section>
  );
}
