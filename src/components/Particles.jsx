import { useEffect, useRef } from 'react'

export default function Particles() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const cv = canvasRef.current
    const ct = cv.getContext('2d')
    let pts = []
    let rafId

    function resize() {
      cv.width = window.innerWidth
      cv.height = window.innerHeight
    }

    function init() {
      pts = []
      const n = Math.floor((window.innerWidth * window.innerHeight) / 18000)
      for (let i = 0; i < n; i++) {
        pts.push({
          x: Math.random() * cv.width,
          y: Math.random() * cv.height,
          r: Math.random() * 1.4 + 0.3,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          a: Math.random() * 0.5 + 0.15,
        })
      }
    }

    function draw() {
      ct.clearRect(0, 0, cv.width, cv.height)
      pts.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > cv.width) p.vx *= -1
        if (p.y < 0 || p.y > cv.height) p.vy *= -1
        ct.beginPath()
        ct.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ct.fillStyle = `rgba(0,229,200,${p.a})`
        ct.fill()
      })
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x
          const dy = pts[i].y - pts[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < 110) {
            ct.beginPath()
            ct.moveTo(pts[i].x, pts[i].y)
            ct.lineTo(pts[j].x, pts[j].y)
            ct.strokeStyle = `rgba(0,229,200,${0.07 * (1 - d / 110)})`
            ct.lineWidth = 0.5
            ct.stroke()
          }
        }
      }
      rafId = requestAnimationFrame(draw)
    }

    const onResize = () => { resize(); init() }

    resize()
    init()
    draw()
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      id="particles"
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    />
  )
}
