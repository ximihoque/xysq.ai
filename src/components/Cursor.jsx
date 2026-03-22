import { useEffect } from 'react'
import '../styles/cursor.css'

export default function Cursor() {
  useEffect(() => {
    const cur = document.getElementById('cur')
    const ring = document.getElementById('cur-ring')
    let mx = 0, my = 0, rx = 0, ry = 0

    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY
      cur.style.left = mx + 'px'
      cur.style.top = my + 'px'
    }

    document.addEventListener('mousemove', onMove)

    let rafId
    const animate = () => {
      rx += (mx - rx) * 0.13
      ry += (my - ry) * 0.13
      ring.style.left = rx + 'px'
      ring.style.top = ry + 'px'
      rafId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <div id="cur" />
      <div id="cur-ring" />
    </>
  )
}
