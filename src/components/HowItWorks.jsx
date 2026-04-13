import { motion } from 'framer-motion';
import GlassSnippet from './GlassSnippet';
import '../styles/steps.css';

const CAPTURE_CODE = `memory_capture(
    "User prefers TypeScript strict mode. "
    "Hates unnecessary abstractions.",
    tags=["preference", "coding"]
)`;

const SURFACE_CODE = `memory_surface(
    "how does this user like to structure code?",
    budget="low"
)
# → "Strict TypeScript. No unnecessary abstractions.
#    Prefers explicit over implicit."`;

const SYNTHESIZE_CODE = `memory_synthesize(
    "What are this user's active projects "
    "and current focus?"
)
# → "Currently building xysq.ai — a memory layer
#    for AI agents. Focus: MCP server, teams."`;

export default function HowItWorks() {
  return (
    <section className="sect">
      <div className="sect-inner">
        <motion.span
          className="stag"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0 }}
        >
          How It Works
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
        >
          Observe. Retain. Recall. <em>Everywhere.</em>
        </motion.h2>

        <div className="hiw-grid">
          <GlassSnippet
            code={CAPTURE_CODE}
            label="Agents capture what matters. Decisions, preferences, corrections."
            delay={0}
          />
          <GlassSnippet
            code={SURFACE_CODE}
            label="Any agent. Any session. Instant context."
            delay={0.15}
          />
          <GlassSnippet
            code={SYNTHESIZE_CODE}
            label="Not just retrieval — synthesis. The agent reasons over everything you've built."
            delay={0.3}
          />
        </div>
      </div>
    </section>
  );
}
