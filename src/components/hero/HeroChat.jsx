import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { FileText, ShoppingCart, RotateCcw, Pause, Play, ChevronLeft, Plus, Mic, ArrowUp } from 'lucide-react'
import { MASKED, plain } from './scenarios'
import Scenario from './Scenario'
import '../../styles/hero-chat.css'

// A phone on the left, the documents behind the conversation on the right.
// No pointer here: on a phone you watch someone type, so the agent shows a
// typing indicator and then the message lands, the way a real thread reads.
// Plays itself once, then every agent bubble is a button.

function useMobile() {
  const [m, setM] = useState(false)
  useEffect(() => {
    const q = window.matchMedia('(max-width: 720px)')
    const f = () => setM(q.matches)
    f(); q.addEventListener('change', f)
    return () => q.removeEventListener('change', f)
  }, [])
  return m
}

export default function HeroChat({ sc }) {
  const reduce = useReducedMotion()
  const mobile = useMobile()
  const LAST = sc.steps.length - 1

  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)
  const [paused, setPaused] = useState(false)
  const [typing, setTyping] = useState(false)
  const [sel, setSel] = useState(null)
  const [openSrc, setOpenSrc] = useState(null)
  const timer = useRef(null)
  const typeTimer = useRef(null)
  const thread = useRef(null)

  const s = sc.steps[step]
  const upto = done ? sc.thread.length : s.upto
  // while the agent is typing, the newest item is held back and a typing
  // bubble stands in for it
  const visible = sc.thread.slice(0, typing ? upto - 1 : upto)
  const liveSel = done ? sel : (s.sel ?? null)
  const bySrc = (id) => sc.sources.find((x) => x.id === id)
  const msg = (id) => sc.thread.find((x) => x.id === id)

  useEffect(() => {
    if (!reduce) return
    setStep(LAST); setDone(true); setSel(mobile ? null : sc.steps[LAST].sel ?? null)
  }, [reduce, mobile, sc, LAST])

  // advance. a landing (hold null) resolves even when paused, so a rail jump
  // to the last stage does not strand the walkthrough
  useEffect(() => {
    if (reduce || done) return
    const { hold, sel: landSel, typing: t } = sc.steps[step]
    if (hold == null) {
      setSel(mobile ? null : landSel ?? null)
      setDone(true)
      return
    }
    if (paused) return
    if (t) {
      setTyping(true)
      typeTimer.current = setTimeout(() => setTyping(false), t)
    }
    timer.current = setTimeout(() => setStep((n) => n + 1), hold)
    return () => { clearTimeout(timer.current); clearTimeout(typeTimer.current) }
  }, [step, paused, done, reduce, sc, mobile])

  // keep the newest thing in view, typing bubble included
  useEffect(() => {
    const el = thread.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: reduce ? 'auto' : 'smooth' })
  }, [upto, typing, reduce])

  const stopAll = () => { clearTimeout(timer.current); clearTimeout(typeTimer.current); setTyping(false) }
  const takeOver = () => {
    if (done) return
    stopAll()
    setSel(mobile ? null : sc.steps[step].sel ?? null)
    setStep(LAST); setDone(true)
  }
  const pick = (id) => { takeOver(); setOpenSrc(null); setSel((c) => (c === id ? null : id)) }
  const replay = () => { stopAll(); setOpenSrc(null); setSel(null); setDone(false); setPaused(false); setStep(0) }

  const selected = liveSel ? msg(liveSel) : null
  let chapter = 0
  for (let i = 0; i < sc.chapters.length; i++) if (sc.chapters[i].at <= step) chapter = i
  // clicking a chapter plays from its first beat rather than parking there
  const goChapter = (i) => { stopAll(); setOpenSrc(null); setSel(null); setDone(false); setPaused(false); setStep(sc.chapters[i].at) }
  const srcCount = (m) => new Set((m.draws ?? []).map(([sid]) => sid)).size
  const sheetOpen = mobile && (openSrc || selected)

  return (
    <div className="hs hs--split">
      <Scenario heading={sc.scenario.title} items={sc.chapters} active={chapter} onPick={goChapter} />

      <div className="hs-main">
      <div className="hs-frame hc-frame">
        <div className="hc-ctl">
          {done ? (
            <button type="button" className="hs-btn" onClick={replay}><RotateCcw size={12} strokeWidth={2} />Replay</button>
          ) : (
            <button type="button" className="hs-btn" onClick={() => setPaused((p) => !p)} aria-label={paused ? 'Play' : 'Pause'}>
              {paused ? <Play size={12} strokeWidth={2} /> : <Pause size={12} strokeWidth={2} />}{paused ? 'Play' : 'Pause'}
            </button>
          )}
        </div>
        <div className="hc">
          {/* ── the phone, from the shopper's side ── */}
          <div className="ph" onPointerDownCapture={takeOver}>
            <div className="ph-status" aria-hidden="true">
              <span>9:41</span>
              <span className="ph-status-r">
                <i className="ph-sig" /><i className="ph-wifi" /><i className="ph-batt" />
              </span>
            </div>
            <div className="ph-head">
              <ChevronLeft size={18} strokeWidth={2} className="ph-back" aria-hidden="true" />
              <span className="ph-avatar" aria-hidden="true">{sc.initials}</span>
              <span className="ph-name">
                <b>{sc.store}</b>
                <i>{typing ? 'typing…' : 'online'}</i>
              </span>
            </div>

            <div className="ph-thread" ref={thread}>
              {visible.map((m) => {
                if (m.kind === 'time') return <p key={m.id} className="ph-day">{m.text}</p>
                if (m.kind === 'system') return (
                  <motion.p key={m.id} className={`ph-sys ${m.tone === 'good' ? 'is-good' : ''}`}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>{m.text}</motion.p>
                )
                if (m.kind === 'card') return (
                  <div key={m.id} className="ph-card">
                    <span className="ph-card-ico"><ShoppingCart size={15} strokeWidth={1.7} /></span>
                    <span><b>{m.title}</b><i>{m.sub}</i></span>
                  </div>
                )
                const agent = m.from === 'agent'
                const n = agent ? srcCount(m) : 0
                return (
                  <motion.div key={m.id} className={`ph-row ${agent ? 'is-agent' : 'is-cust'}`}
                    initial={{ opacity: 0, y: 10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}>
                    {agent ? (
                      <button type="button" className={`ph-bub ${liveSel === m.id ? 'is-on' : ''}`}
                        aria-pressed={liveSel === m.id} onClick={() => pick(m.id)}>
                        {m.text}
                      </button>
                    ) : (
                      <p className="ph-bub">{m.text}</p>
                    )}
                    <span className="ph-meta">
                      {m.at}{agent && <>{' · '}<em>{n} {n === 1 ? 'source' : 'sources'}</em></>}
                    </span>
                  </motion.div>
                )
              })}
              <AnimatePresence>
                {typing && (
                  <motion.div key="typing" className="ph-row is-agent" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, transition: { duration: 0.12 } }} transition={{ duration: 0.25 }}>
                    <span className="ph-bub ph-typing" aria-label="typing"><i /><i /><i /></span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="ph-compose" aria-hidden="true">
              <Plus size={18} strokeWidth={2} />
              <span className="ph-input">Message</span>
              <Mic size={16} strokeWidth={2} />
              <span className="ph-send"><ArrowUp size={14} strokeWidth={2.4} /></span>
            </div>
          </div>

          {/* ── why it said that ── */}
          <div className={`hc-why ${sheetOpen ? 'is-open' : ''}`}>
            <AnimatePresence mode="wait" initial={false}>
              {openSrc ? (
                <motion.div key={`src-${openSrc}`} className="hc-pane" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                  <button type="button" className="hs-back" onClick={() => setOpenSrc(null)}><ChevronLeft size={13} strokeWidth={2} />Back</button>
                  <h3 className="hs-doc-title">{bySrc(openSrc).title}</h3>
                  <p className="hs-doc-meta">{bySrc(openSrc).by}, {bySrc(openSrc).added}</p>
                  <div className="hs-raw">
                    {bySrc(openSrc).body.map((l) => <p key={l} className="hs-raw-line">{l.includes('{mask}') ? <>{l.split('{mask}')[0]}<span className="hs-masked">{MASKED}</span>{l.split('{mask}')[1]}</> : l}</p>)}
                  </div>
                  {bySrc(openSrc).was && (
                    <p className="hs-was"><s>{bySrc(openSrc).was.text}</s><span className="hs-closed">{bySrc(openSrc).was.closed}</span></p>
                  )}
                </motion.div>
              ) : selected ? (
                <motion.div key={`sel-${selected.id}`} className="hc-pane" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                  {mobile && <button type="button" className="hs-back" onClick={() => setSel(null)}><ChevronLeft size={13} strokeWidth={2} />Conversation</button>}
                  <p className="hs-eyebrow">Why it said that</p>
                  <p className="hc-quote">{selected.text}</p>
                  {Object.entries(groupDraws(selected.draws)).map(([sid, lines]) => {
                    const src = bySrc(sid)
                    return (
                      <div key={sid} className="hc-cite">
                        <p className="hs-pop-head">From {src.live ? 'the live cart' : 'the store’s documents'}</p>
                        <p className="hs-pop-body">
                          {passage(src.body, lines).map(([i, used]) =>
                            used ? <mark key={i}>{plain(src.body[i])}</mark> : <span key={i} className="hs-ctx">{plain(src.body[i])}</span>
                          ).reduce((acc, el, k) => (k ? [...acc, ' ', el] : [el]), [])}
                        </p>
                        {src.was && lines.includes(0) && (
                          <p className="hs-was"><s>{src.was.text}</s><span className="hs-closed">{src.was.closed}</span><span className="hs-was-src">{src.was.from}</span></p>
                        )}
                        <button type="button" className="hs-pop-from" onClick={() => setOpenSrc(sid)}>{src.title}</button>
                      </div>
                    )
                  })}
                </motion.div>
              ) : (
                <motion.div key="rest" className="hc-pane" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                  <p className="hs-eyebrow">What it had to work with</p>
                  <ul className="hs-list">
                    {sc.sources.map((src) => (
                      <li key={src.id}>
                        <button type="button" className="hs-row" onClick={() => { takeOver(); setOpenSrc(src.id) }}>
                          {src.live ? <ShoppingCart size={14} strokeWidth={1.7} className="hs-row-ico" /> : <FileText size={14} strokeWidth={1.7} className="hs-row-ico" />}
                          <span className="hs-row-title">{src.title}</span>
                          <span className="hs-when">{src.added}</span>
                          <span className="hs-by">{src.by}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="hs-foot">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p key={done ? 'done' : step} className="hs-cap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            {done ? sc.steps[LAST].cap : s.cap}
          </motion.p>
        </AnimatePresence>
      </div>
      </div>
    </div>
  )
}

// the lines to print for one document: one neighbour either side of the used
// span, as [index, used] pairs in order
function passage(body, used) {
  const lo = Math.max(0, Math.min(...used) - 1)
  const hi = Math.min(body.length - 1, Math.max(...used) + 1)
  const out = []
  for (let i = lo; i <= hi; i++) out.push([i, used.includes(i)])
  return out
}

function groupDraws(draws = []) {
  const out = {}
  for (const [sid, i] of draws) (out[sid] ||= []).push(i)
  return out
}
