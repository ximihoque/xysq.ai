import { motion } from 'framer-motion';
import '../styles/glass-snippet.css';

const TOKEN_RE = /(#.*)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|(→)|(\b(?:await|async|def|return|if|else|for|while|import|from|in|not|and|or|True|False|None|with|as|class|pass|raise|try|except|lambda)\b)|(\b(?:memory_capture|memory_surface|memory_synthesize|authenticate|agent|print|len|range|str|int|float|list|dict|set|type|isinstance)\b)|(\b[a-zA-Z_]\w*(?=\s*\())|(\b\d+\.?\d*\b)|([\(\)\[\]{},.:=\+\-\*\/!<>]+)|(\s+)|(\S+)/g;

function tokenizeLine(line) {
  const tokens = [];
  let match;
  TOKEN_RE.lastIndex = 0;

  while ((match = TOKEN_RE.exec(line)) !== null) {
    const [full, comment, string, arrow, keyword, builtin, fn, number, punct, ws, other] = match;

    if (comment !== undefined) {
      tokens.push({ type: 'comment', value: full });
    } else if (string !== undefined) {
      tokens.push({ type: 'string', value: full });
    } else if (arrow !== undefined) {
      tokens.push({ type: 'arrow', value: full });
    } else if (keyword !== undefined) {
      tokens.push({ type: 'keyword', value: full });
    } else if (builtin !== undefined) {
      tokens.push({ type: 'builtin', value: full });
    } else if (fn !== undefined) {
      tokens.push({ type: 'fn', value: full });
    } else if (number !== undefined) {
      tokens.push({ type: 'number', value: full });
    } else if (punct !== undefined) {
      tokens.push({ type: 'punct', value: full });
    } else if (ws !== undefined) {
      tokens.push({ type: 'ws', value: full });
    } else {
      tokens.push({ type: 'other', value: full });
    }
  }

  return tokens;
}

function renderLine(line, lineIdx) {
  const trimmed = line.trimStart();

  // Full comment lines — fast path
  if (trimmed.startsWith('#')) {
    return (
      <span key={lineIdx} className="tk-comment">
        {line}
      </span>
    );
  }

  const tokens = tokenizeLine(line);

  return (
    <span key={lineIdx}>
      {tokens.map((tok, tokIdx) => {
        if (tok.type === 'ws') {
          return tok.value;
        }
        const cls =
          tok.type === 'comment'  ? 'tk-comment'  :
          tok.type === 'string'   ? 'tk-string'   :
          tok.type === 'arrow'    ? 'tk-arrow'    :
          tok.type === 'keyword'  ? 'tk-keyword'  :
          tok.type === 'builtin'  ? 'tk-builtin'  :
          tok.type === 'fn'       ? 'tk-fn'        :
          tok.type === 'number'   ? 'tk-number'   :
          tok.type === 'punct'    ? 'tk-punct'    :
          'tk-other';
        return (
          <span key={tokIdx} className={cls}>
            {tok.value}
          </span>
        );
      })}
    </span>
  );
}

export default function GlassSnippet({ code = '', label = '', delay = 0, title = 'xysq.ai' }) {
  const lines = code.split('\n');

  return (
    <div>
      <motion.div
        className="glass-snippet"
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: 'easeOut', delay }}
      >
        <div className="gs-titlebar">
          <div className="gs-dots">
            <span className="gs-dot gs-dot--red" />
            <span className="gs-dot gs-dot--yellow" />
            <span className="gs-dot gs-dot--green" />
          </div>
          {title && <span className="gs-title">{title}</span>}
        </div>

        <pre>
          {lines.map((line, idx) => (
            <span key={idx} style={{ display: 'block' }}>
              {renderLine(line, idx)}
            </span>
          ))}
        </pre>
      </motion.div>

      {label && (
        <motion.p
          className="glass-snippet-label"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: delay + 0.15 }}
        >
          {label}
        </motion.p>
      )}
    </div>
  );
}
