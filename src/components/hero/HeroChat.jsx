import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { FileText, ShoppingCart, RotateCcw, Pause, Play, ChevronLeft } from 'lucide-react'
import { MASKED, plain } from './scenarios'
import '../../styles/hero-chat.css'

// A conversation on the left, the documents behind it on the right. Plays
// itself once, then every bubble is a button. Same rail, caption, pointer and
// pause/replay as the app window; the chrome classes are shared on purpose so
// the three tabs read as one product.
//
// Pointer targets are measured off the real bubbles at render time rather
// than stored as percentages, because bubbles land and the thread scrolls,
// so no stored number would survive.

const OFF = { x: '50%', y: '118%' }

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
  const [sel, setSel] = useState(null)          // visitor's selection once done
  const [openSrc, setOpenSrc] = useState(null)  // a document opened from the panel
  const [tapping, setTapping] = useState(false)
  const [cur, setCur] = useState(OFF)
  const timer = useRef(null)
  const frame = useRef(null)
  const thread = useRef(null)

  const s = sc.steps[step]
  const upto = done ? sc.thread.length : s.upto
  const liveSel = done ? sel : (s.sel ?? null)
  const visible = sc.thread.slice(0, upto)
  const bySrc = (id) => sc.sources.find((x) => x.id === id)
  const msg = (id) => sc.thread.find((x) => x.id === id)

  // reduced motion: land on the payoff, no walkthrough
  useEffect(() => {
    if (!reduce) return
    setStep(LAST); setDone(true); setSel(mobile ? null : sc.steps[LAST].sel ?? null)
  }, [reduce, mobile, sc, LAST])

  // advance
  useEffect(() => {
    if (reduce || done) return
    const { hold, sel: landSel } = sc.steps[step]
    if (hold == null) {
      // a landing resolves even when paused, otherwise a rail jump to the last
      // stage strands the walkthrough: not done, no Replay, and on a phone the
      // sheet left covering the thread the caption tells you to tap
      setSel(mobile ? null : landSel ?? null)
      setDone(true)
      return
    }
    if (paused) return
    timer.current = setTimeout(() => setStep((n) => n + 1), hold)
    return () => clearTimeout(timer.current)
  }, [step, paused, done, reduce, sc, mobile])

  // the tap fires just before the beat flips
  useEffect(() => {
    if (reduce || done || paused) return
    const { tap, hold } = sc.steps[step]
    if (!tap || hold == null) return
    const down = setTimeout(() => setTapping(true), hold - 640)
    const up = setTimeout(() => setTapping(false), hold - 520)
    return () => { clearTimeout(down); clearTimeout(up) }
  }, [step, paused, done, reduce, sc])

  // keep the newest bubble in view
  useEffect(() => {
    const el = thread.current
    if (!el) return
    el.scrollTo({ top: el.scrollHeight, behavior: reduce ? 'auto' : 'smooth' })
  }, [upto, reduce])

  // measure the pointer target after the DOM has settled
  useLayoutEffect(() => {
    if (done || reduce || !s.cur) { setCur(OFF); return }
    const [id, dx, dy] = s.cur
    let raf = requestAnimationFrame(() => {
      raf = requestAnimationFrame(() => {
        const f = frame.current, t = f?.querySelector(`[data-t="${id}"]`)
        if (!f || !t) return
        const F = f.getBoundingClientRect(), T = t.getBoundingClientRect()
        setCur({ x: `${T.left - F.left + T.width * dx}px`, y: `${T.top - F.top + T.height * dy}px` })
      })
    })
    return () => cancelAnimationFrame(raf)
  }, [step, done, reduce, upto, s.cur])

  const takeOver = () => {
    if (done) return
    clearTimeout(timer.current)
    setSel(mobile ? null : sc.steps[step].sel ?? null)
    setStep(LAST); setDone(true)
  }
  const pick = (id) => { takeOver(); setOpenSrc(null); setSel((c) => (c === id ? null : id)) }
  const jump = (i) => { clearTimeout(timer.current); setOpenSrc(null); setSel(null); setDone(false); setPaused(true); setStep(i) }
  const replay = () => { clearTimeout(timer.current); setOpenSrc(null); setSel(null); setDone(false); setPaused(false); setStep(0) }

  const selected = liveSel ? msg(liveSel) : null
  const srcCount = (m) => new Set((m.draws ?? []).map(([sid]) => sid)).size
  const sheetOpen = mobile && (openSrc || selected)

  return (
    <div className="hs">
      <div className="hs-frame hc-frame" ref={frame}>
        <motion.svg className="hs-cursor" viewBox="0 0 24 24" aria-hidden="true"
          initial={{ left: OFF.x, top: OFF.y }}
          animate={{ left: cur.x, top: cur.y, scale: tapping ? 0.84 : 1 }}
          transition={{ left: { duration: 0.9, ease: [0.22, 1, 0.36, 1] }, top: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
                        scale: { duration: tapping ? 0.1 : 0.22 } }}>
          <path d="M5.5 2.5 19 12.4l-6.1.5-3.2 5.8-4.2-16.2Z" fill="var(--paper)" stroke="var(--bg)" strokeWidth="1.3" strokeLinejoin="round" />
        </motion.svg>

        <div className="hs-top">
          <span className="hs-dot" aria-hidden="true" />
          <span className="hs-ws">{sc.store}</span>
          <span className="hs-top-spacer" />
          <span className="hs-who" aria-hidden="true">{sc.initials}</span>
        </div>

        <div className="hc">
          {/* ── the scenario ── */}
          <div className="hc-scen">
            <p className="hs-eyebrow">Scenario</p>
            <p className="hc-scen-title">{sc.scenario.title}</p>
            <p className="hc-scen-blurb">{sc.scenario.blurb}</p>
          </div>

          {/* ── the phone ── */}
          <div className="hc-phone">
            <div className="hc-thread" ref={thread} onPointerDownCapture={takeOver}>
              {visible.map((m) => {
                if (m.kind === 'time') return <p key={m.id} className="hc-time" data-t={m.id}>{m.text}</p>
                if (m.kind === 'system') return (
                  <motion.p key={m.id} className={`hc-sys ${m.tone === 'good' ? 'is-good' : ''}`} data-t={m.id}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>{m.text}</motion.p>
                )
                if (m.kind === 'card') return (
                  <div key={m.id} className="hc-card" data-t={m.id}>
                    <ShoppingCart size={14} strokeWidth={1.7} />
                    <span><b>{m.title}</b><i>{m.sub}</i></span>
                  </div>
                )
                const agent = m.from === 'agent'
                const n = agent ? srcCount(m) : 0
                return (
                  <motion.div key={m.id} className={`hc-row ${agent ? 'is-agent' : 'is-cust'}`}
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}>
                    {agent ? (
                      <button type="button" data-t={m.id} className={`hc-bub ${liveSel === m.id ? 'is-on' : ''}`}
                        aria-pressed={liveSel === m.id} onClick={() => pick(m.id)}>
                        {m.text}
                        <span className="hc-foot">{n} {n === 1 ? 'source' : 'sources'}</span>
                      </button>
                    ) : (
                      <p data-t={m.id} className="hc-bub">{m.text}</p>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* ── why it said that ── */}
          <div className={`hc-why ${sheetOpen ? 'is-open' : ''}`} data-t="why">
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
                        {/* one passage per document: the window around every used
                            line, each sentence printed once, used ones marked.
                            Rendering each line with its own neighbours repeated
                            the same sentences three times over. */}
                        <p className="hs-pop-body">
                          {passage(src.body, lines).map(([i, used]) =>
                            used
                              ? <mark key={i}>{plain(src.body[i])}</mark>
                              : <span key={i} className="hs-ctx">{plain(src.body[i])}</span>
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
        <ol className="hs-rail">
          {sc.steps.map((st, i) => (
            <li key={i}><button type="button" className={`hs-step ${i <= step ? 'is-on' : ''}`} onClick={() => jump(i)} aria-label={`Stage ${i + 1}: ${st.cap}`}><i /></button></li>
          ))}
        </ol>
        <AnimatePresence mode="wait" initial={false}>
          <motion.p key={done ? 'done' : step} className="hs-cap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            {done ? sc.steps[LAST].cap : s.cap}
          </motion.p>
        </AnimatePresence>
        {done ? (
          <button type="button" className="hs-btn" onClick={replay}><RotateCcw size={12} strokeWidth={2} />Replay</button>
        ) : (
          <button type="button" className="hs-btn" onClick={() => setPaused((p) => !p)} aria-label={paused ? 'Play' : 'Pause'}>
            {paused ? <Play size={12} strokeWidth={2} /> : <Pause size={12} strokeWidth={2} />}{paused ? 'Play' : 'Pause'}
          </button>
        )}
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

// [['voice',0],['voice',1],['cart',0]] -> { voice:[0,1], cart:[0] }, in first-seen order
function groupDraws(draws = []) {
  const out = {}
  for (const [sid, i] of draws) (out[sid] ||= []).push(i)
  return out
}
