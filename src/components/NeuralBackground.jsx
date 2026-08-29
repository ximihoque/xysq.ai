import { useEffect, useRef } from 'react'

// Slow starfield with edges that come and go.
//
// It used to draw every pair within 160px on every frame at peak alpha 0.06,
// multiplied by both endpoints' brightness, which lands around 0.02 and is
// effectively invisible. Now a small set of edges is alive at any moment:
// each one picks a nearby pair, fades in, holds, fades out, and is replaced.
// Fewer lines, each actually visible, and it reads as a graph rather than as
// a static web.

const LINK_RANGE = 210
const MAX_EDGES = 22
const FADE_IN = 700
const FADE_OUT = 1000

export default function NeuralBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    let animId
    let lastTime = 0
    let nodes = []
    let edges = []
    let running = true
    // the canvas drew white unconditionally, so it was invisible on the light
    // theme, which is the default a first-time visitor gets
    let ink = '255, 255, 255'

    const readTheme = () => {
      ink = document.documentElement.dataset.theme === 'light' ? '0, 0, 0' : '255, 255, 255'
    }

    function resize() {
      const w = window.innerWidth
      const h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      initNodes(w, h)
    }

    function initNodes(w, h) {
      // denser field. Drawing is O(n) per frame and the neighbour scan only
      // runs when an edge spawns, so this is cheap even at the cap.
      const count = Math.min(140, Math.max(70, Math.floor((w * h) / 9500)))
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
        // keep the floor at 1px: a sub-pixel circle disappears entirely
        // once antialiasing and the 0.5 canvas opacity are applied
        r: 1 + Math.random() * 1.3,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.008 + Math.random() * 0.012,
        brightness: Math.random(),
      }))
      edges = []
    }

    // A spawn picks one hub and wires it to two or three neighbours at once.
    // Single edges read as stray pairs; a node with spokes reads as a graph.
    function spawnEdge() {
      const a = (Math.random() * nodes.length) | 0
      const near = []
      for (let b = 0; b < nodes.length; b++) {
        if (b === a) continue
        const dx = nodes[b].x - nodes[a].x
        const dy = nodes[b].y - nodes[a].y
        if (dx * dx + dy * dy < LINK_RANGE * LINK_RANGE) near.push(b)
      }
      if (near.length < 2) return
      for (let i = near.length - 1; i > 0; i--) {
        const j = (Math.random() * (i + 1)) | 0
        ;[near[i], near[j]] = [near[j], near[i]]
      }
      const spokes = Math.min(near.length, 2 + ((Math.random() * 2) | 0))
      const hold = 1400 + Math.random() * 2600
      for (let k = 0; k < spokes; k++) {
        const b = near[k]
        const key = a < b ? `${a}-${b}` : `${b}-${a}`
        if (edges.some((e) => e.key === key)) continue
        edges.push({
          key,
          a,
          b,
          age: 0,
          // stagger the spokes slightly so they draw outward from the hub
          hold: hold - k * 120,
          peak: 0.15 + Math.random() * 0.12,
        })
      }
    }

    // fade in, hold, fade out. returns 0 once the edge is spent.
    function envelope(e) {
      if (e.age < FADE_IN) return (e.age / FADE_IN) * e.peak
      const out = e.age - FADE_IN - e.hold
      if (out <= 0) return e.peak
      if (out >= FADE_OUT) return 0
      return (1 - out / FADE_OUT) * e.peak
    }

    function frame(ts) {
      if (!running) return
      animId = requestAnimationFrame(frame)
      if (ts - lastTime < 33) return
      const dt = Math.min(ts - lastTime, 50)
      lastTime = ts

      const w = canvas.width / dpr
      const h = canvas.height / dpr
      ctx.clearRect(0, 0, w, h)

      nodes.forEach((n) => {
        n.pulsePhase += n.pulseSpeed * dt * 0.1
        n.brightness = 0.3 + 0.7 * Math.abs(Math.sin(n.pulsePhase))
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > w) { n.vx *= -0.9; n.x = Math.max(0, Math.min(w, n.x)) }
        if (n.y < 0 || n.y > h) { n.vy *= -0.9; n.y = Math.max(0, Math.min(h, n.y)) }
      })

      edges.forEach((e) => { e.age += dt })
      edges = edges.filter((e) => e.age < FADE_IN + e.hold + FADE_OUT)
      // top back up a few at a time, so they appear in ones and twos rather
      // than all together
      if (edges.length < MAX_EDGES && Math.random() < 0.05) spawnEdge()

      const lit = new Map()
      edges.forEach((e) => {
        const alpha = envelope(e)
        if (alpha <= 0.001) return
        const a = nodes[e.a]
        const b = nodes[e.b]
        if (!a || !b) return
        const dx = b.x - a.x
        const dy = b.y - a.y
        // no penalty inside range; only fade if the pair has drifted apart
        // since the edge formed
        const over = Math.sqrt(dx * dx + dy * dy) - LINK_RANGE
        const slack = over <= 0 ? 1 : Math.max(0, 1 - over / (LINK_RANGE * 0.5))
        const v = alpha * slack
        if (v <= 0.001) return
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.strokeStyle = `rgba(${ink}, ${v})`
        ctx.lineWidth = 1
        ctx.stroke()
        lit.set(e.a, Math.max(lit.get(e.a) || 0, v))
        lit.set(e.b, Math.max(lit.get(e.b) || 0, v))
      })

      nodes.forEach((n, i) => {
        // an endpoint of a live edge sits up a little, so the graph reads
        const boost = (lit.get(i) || 0) * 2.2
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r + boost * 0.7, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${ink}, ${Math.min(0.7, n.brightness * 0.4 + boost)})`
        ctx.fill()
      })
    }

    function start() {
      if (running) return
      running = true
      lastTime = performance.now()
      animId = requestAnimationFrame(frame)
    }

    function stop() {
      running = false
      if (animId) cancelAnimationFrame(animId)
    }

    function onVisibility() {
      if (document.hidden) stop()
      else start()
    }

    readTheme()
    const themeWatch = new MutationObserver(readTheme)
    themeWatch.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    resize()
    window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', onVisibility)
    animId = requestAnimationFrame(frame)

    return () => {
      running = false
      cancelAnimationFrame(animId)
      themeWatch.disconnect()
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.5,
      }}
    />
  )
}
