import { useEffect, useRef } from 'react'

export default function NeuralBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    let animId
    let lastTime = 0
    let nodes = []
    let running = true

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
      const area = w * h
      // Capped tighter than before: 60 max nodes (was 90) keeps O(n²) reasonable.
      const count = Math.min(60, Math.max(30, Math.floor(area / 22000)))
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
        r: 1 + Math.random() * 1.2,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.008 + Math.random() * 0.012,
        brightness: Math.random(),
      }))
    }

    function frame(ts) {
      if (!running) return
      animId = requestAnimationFrame(frame)
      // ~30fps cap (was ~50) — visually identical at this density, half the CPU
      if (ts - lastTime < 33) return
      const dt = Math.min(ts - lastTime, 50)
      lastTime = ts

      const w = canvas.width / dpr
      const h = canvas.height / dpr
      ctx.clearRect(0, 0, w, h)

      nodes.forEach(n => {
        n.pulsePhase += n.pulseSpeed * dt * 0.1
        n.brightness = 0.3 + 0.7 * Math.abs(Math.sin(n.pulsePhase))
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > w) { n.vx *= -0.9; n.x = Math.max(0, Math.min(w, n.x)) }
        if (n.y < 0 || n.y > h) { n.vy *= -0.9; n.y = Math.max(0, Math.min(h, n.y)) }
      })

      // Signal pulses removed — the "neural signal" traveling dots read as an
      // AI-demo tell. What's left is a faint, slow, monochrome starfield.

      // Connections: faint near-white hairlines, no glow.
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - nodes[i].x
          const dy = nodes[j].y - nodes[i].y
          const d2 = dx * dx + dy * dy
          if (d2 < 160 * 160) {
            const dist = Math.sqrt(d2)
            const opacity = (1 - dist / 160) * 0.06 * nodes[i].brightness * nodes[j].brightness
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      nodes.forEach(n => {
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${n.brightness * 0.28})`
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

    resize()
    window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', onVisibility)
    animId = requestAnimationFrame(frame)

    return () => {
      running = false
      cancelAnimationFrame(animId)
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
