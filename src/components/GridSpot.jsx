import { useEffect, useRef } from 'react'
import '../styles/grid-spot.css'

// Lights the grid cell under the pointer and leaves a short trail behind it.
//
// The site grid is `body::before`: fixed, 1px lines, `background-size:
// var(--grid-size)`, `background-position: center top`. For a repeating
// background, `center` puts the image's LEFT edge at (W - size) / 2, so the
// lines land at (W - g) / 2 + k*g. Using W / 2 as the origin instead puts
// every cell half a cell off, which is what it was doing.
//
// A ring of nodes is reused rather than mounting one per cell, and positions
// are written straight to the DOM inside a rAF, because this runs on every
// mousemove.

const POOL = 16
const FADE = 900

export default function GridSpot() {
  const host = useRef(null)

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const root = host.current
    const cells = []
    for (let i = 0; i < POOL; i++) {
      const d = document.createElement('i')
      d.className = 'grid-cell'
      root.appendChild(d)
      cells.push(d)
    }

    let next = 0
    let lastKey = ''
    let raf = 0
    let mx = 0
    let my = 0

    const gridSize = () =>
      parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--grid-size')) || 72

    const draw = () => {
      raf = 0
      const g = gridSize()
      const originX = (window.innerWidth - g) / 2 // where `center` starts the tile
      const cx = Math.floor((mx - originX) / g) * g + originX
      const cy = Math.floor(my / g) * g
      const key = `${cx},${cy}`
      if (key === lastKey) return
      lastKey = key

      const cell = cells[next]
      next = (next + 1) % POOL
      cell.style.width = `${g}px`
      cell.style.height = `${g}px`
      cell.style.transform = `translate3d(${cx}px, ${cy}px, 0)`
      // restart the fade: kill the transition, go opaque, reflow, then fade
      cell.style.transition = 'none'
      cell.style.opacity = '1'
      void cell.offsetWidth
      cell.style.transition = `opacity ${FADE}ms linear`
      cell.style.opacity = '0'
    }

    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY
      if (!raf) raf = requestAnimationFrame(draw)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      if (raf) cancelAnimationFrame(raf)
      cells.forEach((c) => c.remove())
    }
  }, [])

  return <div ref={host} className="grid-spot" aria-hidden="true" />
}
