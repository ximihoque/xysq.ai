import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { FileText, Layers, Activity, RotateCcw, Pause, Play, ChevronLeft } from 'lucide-react'
import '../styles/hero-stage.css'

// An illustrative build of the app, not a replica. The chrome is invented;
// the capabilities are not. Everything here is something the engine does
// today: a document is stored untouched, it is folded into a page that
// already exists, identifiers are masked on the way in, every line can show
// the sentence it came from, changes carry an actor, and a value that stopped
// being true is closed and kept. Nothing implies approvals, a link graph,
// confidence scores or inferred facts, because we don't ship those.
//
// Every surface a visitor can see is reachable by clicking. A window where
// three things work and thirty look clickable reads as a mock-up, which is
// the opposite of the point.

const SOURCES = [
  {
    id: 's4',
    title: 'Sept pricing update',
    by: 'team',
    added: 'just now',
    tags: ['pricing', 'q3'],
    fresh: true,
    body: [
      'We reviewed the plan tiers in August.',
      'Starter and Growth seats move to $59 on Sept 1.',
      'Existing annual contracts renew at the old rate.',
    ],
  },
  {
    id: 's3',
    title: 'Refund policy',
    by: 'support agent',
    added: '4 days ago',
    tags: ['policy', 'refunds'],
    body: [
      'Agents can approve most refunds themselves.',
      'Anything above $500 needs a manager to sign it off.',
      'Escalate in the shared queue, not by email.',
    ],
  },
  {
    id: 's1',
    title: 'Pricing FAQ v3',
    by: 'sales agent',
    added: '12 days ago',
    tags: ['pricing', 'faq'],
    body: [
      'Starter and Growth seats are $49 per month.',
      'Pay annually and you get 12 months for the price of 10.',
      'Anything over 50 seats goes through a quote, never the pricing page.',
      'Send escalations to {mask}, not to the shared inbox.',
    ],
  },
  {
    id: 's2',
    title: 'Campaign retro, Q3',
    by: 'marketing agent',
    added: '3 weeks ago',
    tags: ['campaign', 'q3'],
    body: [
      'We looked at where the new seats came from.',
      'Two thirds of Q3 upgrades came in through the campaign landing pages.',
      'Paid search was flat over the same period.',
    ],
  },
]

const BLOCKS = [
  {
    id: 'b1',
    n: 1,
    text: 'Seats are $59 per month.',
    was: '$49 per month',
    closed: 'closed Sept 1',
    wasSrc: 's1',
    quote: 'Starter and Growth seats move to $59 on Sept 1.',
    src: 's4',
  },
  {
    id: 'b2',
    n: 2,
    text: 'Annual billing saves two months.',
    quote: 'Pay annually and you get 12 months for the price of 10.',
    src: 's1',
  },
  {
    id: 'b3',
    n: 3,
    text: 'Refunds over $500 need manager approval.',
    quote: 'Anything above $500 needs a manager to sign it off.',
    src: 's3',
  },
  {
    id: 'b4',
    n: 4,
    text: 'Enterprise plans are quoted, not listed.',
    quote: 'Anything over 50 seats goes through a quote, never the pricing page.',
    src: 's1',
  },
  {
    id: 'b5',
    n: 5,
    text: 'The Q3 campaign drove most of the upgrades.',
    quote: 'Two thirds of Q3 upgrades came in through the campaign landing pages.',
    src: 's2',
  },
]

const CHANGES = [
  { when: 'Sept 1', what: 'Seat price updated from Sept pricing update' },
  { when: 'Aug 28', what: 'Refund threshold added from Refund policy' },
]

const byId = (id) => SOURCES.find((x) => x.id === id)

const MASKED = '\u2022\u2022\u2022\u2022\u2022\u2022@acme.com'
const plain = (line) => line.replace('{mask}', MASKED)

// The sentences either side of a quote are read out of the document itself
// rather than written by hand. They used to be hand-written and two of them
// quietly described text that was not in the source they pointed at, which
// is exactly the thing this hero is claiming we do not do.
function context(srcId, quote) {
  const body = byId(srcId)?.body ?? []
  const i = body.findIndex((line) => plain(line) === quote)
  if (i === -1) {
    if (import.meta.env.DEV) {
      console.error(`[HeroStage] quote is not in ${srcId}: ${quote}`)
    }
    return { before: '', after: '' }
  }
  return { before: i > 0 ? plain(body[i - 1]) : '', after: plain(body[i + 1] ?? '') }
}

// the walkthrough as a flat table. index 0 is the resting state and is what
// prerenders, so the static HTML is never an empty box.
// `cam` is [scale, origin-x%, origin-y%]. The window pushes in on whatever
// the beat is about and pulls back to 1 whenever the whole surface matters,
// so the reader is never hunting for what moved.
// [scale, focal-x%, focal-y%]. The focal point is what stays put while the
// window grows around it. It is pinned to the edge the eye reads from: 0% x
// for the document column, 100% x for the activity rail. Anything in between
// crops the start of a sentence, which reads as a rendering bug.
//
// transform-origin is FIXED at 0 0 and the focal point becomes a numeric
// translate instead. Animating transform-origin makes the move wobble,
// because a percentage-pair string has no clean interpolation.
const WIDE = [1, 50, 50]

// `cur` is the pointer's target as [left%, top%] of the window, measured off
// the real elements rather than guessed. `tap` means it clicks near the END of
// the beat, which is why the target always belongs to the beat BEFORE the one
// that shows the result: you click Pages while still looking at Sources, and
// the swap lands after. Putting the target on the beat that already shows the
// result makes the pointer click a thing that has already happened.
const OFF = [50, 118]

const STEPS = [
  { view: 'sources', hold: 2800, cam: WIDE, cur: [58, 40],
    cap: 'Your documents, kept exactly as they were written.' },
  { view: 'sources', up: true, hold: 3600, cam: [1.22, 100, 0], cur: [93.7, 19.7],
    cap: 'Add one more.' },
  { view: 'sources', added: true, hold: 3400, cam: WIDE, cur: [8.3, 19.9], tap: true,
    cap: 'Stored as written. We never edit your document.' },
  { view: 'pages', added: true, hold: 3000, cam: WIDE, cur: [58.4, 19.9], tap: true,
    cap: 'It goes onto the page you already have, not a new one.' },
  { view: 'page', added: true, hold: 3000, cam: WIDE, cur: [31.3, 25.7], tap: true,
    cap: 'One page, written from four of them.' },
  { view: 'page', added: true, cite: 'b1', hold: 4600, cam: [1.28, 0, 20], cur: [72, 46],
    cap: 'Every line points back at the sentence it came from.' },
  { view: 'page', added: true, log: true, hold: 3800, cam: [1.25, 100, 18], cur: [88.5, 21.7],
    cap: 'Every change, and who made it.' },
  { view: 'page', added: true, log: true, sup: true, hold: 4400, cam: [1.32, 0, 14], cur: [46.6, 26.6],
    cap: 'The price changed, so the old one was closed. It is still there to read.' },
  { view: 'page', added: true, log: true, sup: true, hold: null, cam: WIDE, cur: OFF,
    cap: 'Your turn. Open anything.' },
]

const LAST = STEPS.length - 1

// the push-in needs headroom beside the window; below the tablet breakpoint
// there is none, so the camera stays wide there. false on the server.
function useRoomToZoom() {
  const [ok, setOk] = useState(false)
  useEffect(() => {
    const q = window.matchMedia('(min-width: 1025px)')
    const sync = () => setOk(q.matches)
    sync()
    q.addEventListener('change', sync)
    return () => q.removeEventListener('change', sync)
  }, [])
  return ok
}

export default function HeroStage() {
  const reduce = useReducedMotion()
  const canZoom = useRoomToZoom()
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)
  const [paused, setPaused] = useState(false)
  // once the visitor takes over, `nav` is authoritative; the step table only
  // still owns the resting-state fallback
  const [nav, setNav] = useState(null)
  const [cite, setCite] = useState(null)
  const [tapping, setTapping] = useState(false)
  const timer = useRef(null)

  const s = STEPS[step]
  const view = nav?.view ?? s.view
  const openCite = done ? cite : (s.cite ?? null)
  const src = byId(nav?.src)

  useEffect(() => {
    if (!reduce) return
    setStep(LAST)
    setCite('b1')
    setDone(true)
  }, [reduce])

  useEffect(() => {
    if (reduce || done || paused) return
    const { hold, cite: c } = STEPS[step]
    if (hold == null) {
      setCite(c ?? null)
      setDone(true)
      return
    }
    timer.current = setTimeout(() => setStep((n) => n + 1), hold)
    return () => clearTimeout(timer.current)
  }, [step, paused, done, reduce])

  useEffect(() => {
    if (reduce || done || paused) return
    const { tap, hold } = STEPS[step]
    if (!tap || hold == null) return
    const down = setTimeout(() => setTapping(true), hold - 640)
    const up = setTimeout(() => setTapping(false), hold - 520)
    return () => {
      clearTimeout(down)
      clearTimeout(up)
    }
  }, [step, paused, done, reduce])

  const takeOver = () => {
    if (done) return
    clearTimeout(timer.current)
    setCite(STEPS[step].cite ?? null)
    setStep(LAST)
    setDone(true)
  }

  // every click routes through here, so the walkthrough always yields first
  const go = (v, sid) => {
    takeOver()
    setNav({ view: v, src: sid })
    if (v !== 'page') setCite(null)
  }

  // the rail is a scrubber: pick any stage, land on it, and stay there until
  // you press play or click something in the window
  const jump = (i) => {
    clearTimeout(timer.current)
    setNav(null)
    setCite(STEPS[i].cite ?? null)
    setDone(false)
    setPaused(true)
    setStep(i)
  }

  const replay = () => {
    clearTimeout(timer.current)
    setNav(null)
    setCite(null)
    setDone(false)
    setPaused(false)
    setStep(0)
  }

  const [scale, ox, oy] = done || reduce || !canZoom ? WIDE : (s.cam ?? WIDE)
  // the pointer lives inside the zoomed layer so it tracks the content, and
  // counter-scales so it stays one constant size however far we push in
  const [cx, cy] = done || reduce ? OFF : (s.cur ?? OFF)

  const rows = s.added || done ? SOURCES : SOURCES.filter((r) => !r.fresh)
  const showLog = s.log || done
  const showSup = s.sup || done

  const feed = SOURCES.map((r) => (
    <button
      key={r.id}
      type="button"
      className={`hs-edit ${r.fresh ? 'is-fresh' : ''}`}
      onClick={() => go('source', r.id)}
    >
      <span className="hs-edit-by">{r.by}</span>
      <span className="hs-edit-what">added {r.title}</span>
      <span className="hs-edit-when">{r.added}</span>
    </button>
  ))

  return (
    <div className="hs">
      <div className="hs-frame">
        <motion.div
          className="hs-win"
          style={{ transformOrigin: '0% 0%' }}
          animate={{
            scale,
            x: `${(1 - scale) * ox}%`,
            y: `${(1 - scale) * oy}%`,
          }}
          transition={{ duration: 1.35, ease: [0.4, 0, 0.2, 1] }}
        >
        <motion.svg
          className="hs-cursor"
          viewBox="0 0 24 24"
          aria-hidden="true"
          initial={{ left: `${OFF[0]}%`, top: `${OFF[1]}%` }}
          animate={{
            left: `${cx}%`,
            top: `${cy}%`,
            scale: (tapping ? 0.84 : 1) / scale,
          }}
          transition={{
            left: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
            top: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
            scale: { duration: tapping ? 0.1 : 0.22, ease: tapping ? 'easeIn' : 'easeOut' },
          }}
        >
          <path
            d="M5.5 2.5 19 12.4l-6.1.5-3.2 5.8-4.2-16.2Z"
            fill="var(--paper)"
            stroke="var(--bg)"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
        </motion.svg>

        <div className="hs-top">
          <span className="hs-dot" aria-hidden="true" />
          <span className="hs-ws">Acme workspace</span>
          <span className="hs-top-spacer" />
          <span className="hs-who" aria-hidden="true">JD</span>
        </div>

        <div className="hs-body">
          <div className="hs-side">
            <button
              type="button"
              className={`hs-nav ${view === 'sources' || view === 'source' ? 'is-on' : ''}`}
              onClick={() => go('sources')}
            >
              <FileText size={14} strokeWidth={1.8} />
              Sources
              <span className="hs-count">{rows.length}</span>
            </button>
            <button
              type="button"
              className={`hs-nav ${view === 'pages' || view === 'page' ? 'is-on' : ''}`}
              onClick={() => go('pages')}
            >
              <Layers size={14} strokeWidth={1.8} />
              Pages
              <span className="hs-count">1</span>
            </button>
            <button
              type="button"
              className={`hs-nav ${view === 'activity' ? 'is-on' : ''}`}
              onClick={() => go('activity')}
            >
              <Activity size={14} strokeWidth={1.8} />
              Activity
              <span className="hs-count">{SOURCES.length}</span>
            </button>
          </div>

          <div className="hs-view">
            <AnimatePresence mode="wait" initial={false}>
              {view === 'sources' && (
                <Pane key="sources">
                  <p className="hs-eyebrow">Sources</p>
                  {s.up && !done && <UploadRow />}
                  <ul className="hs-list">
                    {rows.map((r) => (
                      <motion.li key={r.id} layout>
                        <button
                          type="button"
                          className={`hs-row ${r.fresh && s.added && !done ? 'is-fresh' : ''}`}
                          onClick={() => go('source', r.id)}
                        >
                          <FileText size={14} strokeWidth={1.7} className="hs-row-ico" />
                          <span className="hs-row-title">{r.title}</span>
                          <span className={`hs-when ${r.fresh ? 'is-new' : ''}`}>
                            {r.added}
                          </span>
                          <span className="hs-by">{r.by}</span>
                        </button>
                      </motion.li>
                    ))}
                  </ul>
                </Pane>
              )}

              {view === 'source' && src && (
                <Pane key={`source-${src.id}`}>
                  <button type="button" className="hs-back" onClick={() => go('sources')}>
                    <ChevronLeft size={13} strokeWidth={2} />
                    Sources
                  </button>
                  <h3 className="hs-doc-title">{src.title}</h3>
                  <p className="hs-doc-meta">Added by {src.by}, {src.added}</p>
                  <div className="hs-field">
                    <p className="hs-eyebrow">Tags</p>
                    <div className="hs-tags">
                      {src.tags.map((t) => (
                        <span key={t} className="hs-tag">{t}</span>
                      ))}
                    </div>
                  </div>
                  <div className="hs-raw">
                    {src.body.map((line) => (
                      <p key={line} className="hs-raw-line">
                        {line.includes('{mask}') ? (
                          <>
                            {line.split('{mask}')[0]}
                            <span className="hs-masked">{MASKED}</span>
                            <span className="hs-masked-tag">masked on the way in</span>
                            {line.split('{mask}')[1]}
                          </>
                        ) : (
                          line
                        )}
                      </p>
                    ))}
                  </div>
                  <div className="hs-field">
                    <p className="hs-eyebrow">Pages</p>
                    <button type="button" className="hs-jump" onClick={() => go('page')}>
                      <Layers size={13} strokeWidth={1.7} />
                      Growth plan
                    </button>
                  </div>
                </Pane>
              )}

              {view === 'pages' && (
                <Pane key="pages">
                  <p className="hs-eyebrow">Pages</p>
                  <ul className="hs-list">
                    <li>
                      <button type="button" className="hs-row is-fresh" onClick={() => go('page')}>
                        <Layers size={14} strokeWidth={1.7} className="hs-row-ico" />
                        <span className="hs-row-title">Growth plan</span>
                        <span className="hs-by">updated just now</span>
                      </button>
                    </li>
                  </ul>
                </Pane>
              )}

              {view === 'activity' && (
                <Pane key="activity">
                  <p className="hs-eyebrow">Activity</p>
                  <div className="hs-feed">{feed}</div>
                </Pane>
              )}

              {view === 'page' && (
                <Pane key="page">
                  <div className="hs-page">
                    <div className="hs-doc">
                      <h3 className="hs-doc-title">Growth plan</h3>
                      <p className="hs-doc-meta">Built from 4 documents</p>

                      {BLOCKS.map((b) => (
                        <div key={b.id} className="hs-block">
                          <p className="hs-line">
                            {b.text}
                            <button
                              type="button"
                              className={`hs-mark ${openCite === b.id ? 'is-on' : ''}`}
                              onClick={() => {
                                takeOver()
                                setCite((c) => (c === b.id ? null : b.id))
                              }}
                            >
                              [{b.n}]
                            </button>
                          </p>

                          {b.was && showSup && (
                            <motion.p
                              className="hs-was"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.35 }}
                            >
                              <s>{b.was}</s>
                              <span className="hs-closed">{b.closed}</span>
                              <button
                                type="button"
                                className="hs-was-src"
                                onClick={() => go('source', b.wasSrc)}
                              >
                                {byId(b.wasSrc).title}
                              </button>
                            </motion.p>
                          )}

                          <AnimatePresence initial={false}>
                            {openCite === b.id && (
                              <motion.div
                                className="hs-pop"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                              >
                                <div className="hs-pop-in">
                                  <p className="hs-pop-head">From your source</p>
                                  <p className="hs-pop-body">
                                    <span className="hs-ctx">{context(b.src, b.quote).before} </span>
                                    <mark>{b.quote}</mark>
                                    <span className="hs-ctx"> {context(b.src, b.quote).after}</span>
                                  </p>
                                  <button
                                    type="button"
                                    className="hs-pop-from"
                                    onClick={() => go('source', b.src)}
                                  >
                                    {byId(b.src).title}
                                  </button>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}

                      <div className="hs-changes">
                        <p className="hs-eyebrow">Changelog</p>
                        {CHANGES.map((c) => (
                          <p key={c.when} className="hs-change">
                            <span className="hs-change-when">{c.when}</span>
                            {c.what}
                          </p>
                        ))}
                      </div>
                    </div>

                    <AnimatePresence initial={false}>
                      {showLog && (
                        <motion.aside
                          className="hs-log"
                          initial={{ opacity: 0, x: 12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <p className="hs-eyebrow">Activity</p>
                          <div className="hs-feed">{feed}</div>
                        </motion.aside>
                      )}
                    </AnimatePresence>
                  </div>
                </Pane>
              )}
            </AnimatePresence>
          </div>
        </div>
        </motion.div>
      </div>

      <div className="hs-foot">
        <ol className="hs-rail">
          {STEPS.map((st, i) => (
            <li key={i}>
              <button
                type="button"
                className={`hs-step ${i <= step ? 'is-on' : ''}`}
                onClick={() => jump(i)}
                aria-label={`Stage ${i + 1}: ${st.cap}`}
              >
                <i />
              </button>
            </li>
          ))}
        </ol>

        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={done ? 'done' : step}
            className="hs-cap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {done ? 'Your turn. Open anything.' : s.cap}
          </motion.p>
        </AnimatePresence>

        {done ? (
          <button type="button" className="hs-btn" onClick={replay}>
            <RotateCcw size={12} strokeWidth={2} />
            Replay
          </button>
        ) : (
          <button
            type="button"
            className="hs-btn"
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? 'Play the walkthrough' : 'Pause the walkthrough'}
          >
            {paused ? <Play size={12} strokeWidth={2} /> : <Pause size={12} strokeWidth={2} />}
            {paused ? 'Play' : 'Pause'}
          </button>
        )}
      </div>
    </div>
  )
}

// counts 0 to 100 over the upload beat. A bar with no number reads as decoration.
function UploadRow() {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const started = performance.now()
    let raf
    const tick = (now) => {
      const t = Math.min(1, (now - started) / 2600)
      setPct(Math.round(t * 100))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <motion.div
      className="hs-up"
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <FileText size={14} strokeWidth={1.8} />
      <span className="hs-up-name">Sept pricing update.md</span>
      <span className="hs-up-pct">{pct}%</span>
      <span className="hs-up-bar">
        <i style={{ width: `${pct}%` }} />
      </span>
    </motion.div>
  )
}

function Pane({ children }) {
  return (
    <motion.div
      className="hs-pane"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
    >
      {children}
    </motion.div>
  )
}
