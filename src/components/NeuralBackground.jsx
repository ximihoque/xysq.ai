import { useEffect, useRef } from 'react'

export default function NeuralBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId
    let lastTime = 0
    let nodes = []
    let signals = []
    let signalTimer = 0

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initNodes()
    }

    function initNodes() {
      const area = canvas.width * canvas.height
      const count = Math.min(90, Math.max(40, Math.floor(area / 14000)))
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
        r: 1.5 + Math.random() * 2,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.008 + Math.random() * 0.012,
        brightness: Math.random(),
        isStar: Math.random() < 0.12,
      }))
      signals = []
    }

    function drawStar(ctx, x, y, r, brightness) {
      const spikes = 4
      const outerR = r * 1.8
      const innerR = r * 0.6
      ctx.beginPath()
      for (let i = 0; i < spikes * 2; i++) {
        const angle = (i * Math.PI) / spikes - Math.PI / 2
        const radius = i % 2 === 0 ? outerR : innerR
        const px = x + Math.cos(angle) * radius
        const py = y + Math.sin(angle) * radius
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py)
      }
      ctx.closePath()
      ctx.fillStyle = `rgba(0, 229, 200, ${brightness * 0.9})`
      ctx.shadowBlur = 10
      ctx.shadowColor = `rgba(0, 229, 200, ${brightness * 0.8})`
      ctx.fill()
    }

    function frame(ts) {
      animId = requestAnimationFrame(frame)
      if (ts - lastTime < 20) return  // ~50fps cap
      const dt = Math.min(ts - lastTime, 50)
      lastTime = ts

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update nodes
      nodes.forEach(n => {
        n.pulsePhase += n.pulseSpeed * dt * 0.1
        n.brightness = 0.3 + 0.7 * Math.abs(Math.sin(n.pulsePhase))
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > canvas.width) { n.vx *= -0.9; n.x = Math.max(0, Math.min(canvas.width, n.x)) }
        if (n.y < 0 || n.y > canvas.height) { n.vy *= -0.9; n.y = Math.max(0, Math.min(canvas.height, n.y)) }
      })

      // Signal timer
      signalTimer -= dt
      if (signalTimer <= 0 && nodes.length > 1) {
        signalTimer = 2000 + Math.random() * 2000
        // Find a valid edge
        const tries = 10
        for (let t = 0; t < tries; t++) {
          const a = Math.floor(Math.random() * nodes.length)
          const b = Math.floor(Math.random() * nodes.length)
          if (a === b) continue
          const dx = nodes[b].x - nodes[a].x
          const dy = nodes[b].y - nodes[a].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 160) {
            signals.push({ fromIdx: a, toIdx: b, progress: 0, duration: 800 + Math.random() * 400 })
            break
          }
        }
      }

      // Draw connections
      ctx.shadowBlur = 0
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - nodes[i].x
          const dy = nodes[j].y - nodes[i].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 160) {
            const opacity = (1 - dist / 160) * 0.18 * nodes[i].brightness * nodes[j].brightness
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = `rgba(0, 229, 200, ${opacity})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      // Draw nodes
      nodes.forEach(n => {
        if (n.isStar) {
          drawStar(ctx, n.x, n.y, n.r, n.brightness)
        } else {
          ctx.beginPath()
          ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(0, 229, 200, ${n.brightness * 0.9})`
          ctx.shadowBlur = 8
          ctx.shadowColor = `rgba(0, 229, 200, ${n.brightness * 0.6})`
          ctx.fill()
        }
        ctx.shadowBlur = 0
      })

      // Update & draw signals
      signals = signals.filter(sig => {
        sig.progress += dt / sig.duration
        if (sig.progress >= 1) {
          // Flare destination node
          nodes[sig.toIdx].brightness = 1
          return false
        }
        const from = nodes[sig.fromIdx]
        const to = nodes[sig.toIdx]
        const x = from.x + (to.x - from.x) * sig.progress
        const y = from.y + (to.y - from.y) * sig.progress
        ctx.beginPath()
        ctx.arc(x, y, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(255, 255, 255, 0.95)'
        ctx.shadowBlur = 12
        ctx.shadowColor = 'rgba(0, 229, 200, 1)'
        ctx.fill()
        ctx.shadowBlur = 0
        return true
      })
    }

    resize()
    window.addEventListener('resize', resize)
    animId = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
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
        opacity: 0.85,
      }}
    />
  )
}
