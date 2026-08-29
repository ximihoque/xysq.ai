import { useEffect, useRef } from 'react'
import '../styles/grid-spot.css'

// Lights the single grid cell under the pointer.
//
// The site grid is `body::before`: position fixed, 1px lines at --grid-size,
// background-position `center top`. So a vertical line falls on the viewport's
// horizontal centre and every --grid-size px either side of it, and horizontal
// lines start at the viewport top. Snapping has to use that same phase or the
// highlight sits half a cell off the lines it is meant to fill.
//
// Position is written straight to the element in a rAF rather than through
// React state, because this fires on every mousemove.

export default function GridSpot() {
  const el = useRef(null)

  useEffect(() => {
    // coarse pointers have no hover, and the OS may ask for less motion
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const node = el.current
    let raf = 0
    let x = 0
    let y = 0
    let live = false

    const size = () =>
      parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--grid-size')) || 72

    const draw = () => {
      raf = 0
      const g = size()
      const originX = window.innerWidth / 2 // where `center` puts a line
      const cellX = Math.floor((x - originX) / g) * g + originX
      const cellY = Math.floor(y / g) * g
      node.style.transform = `translate3d(${cellX}px, ${cellY}px, 0)`
      node.style.width = `${g}px`
      node.style.height = `${g}px`
      if (!live) {
        live = true
        node.classList.add('is-on')
      }
    }

    const onMove = (e) => {
      x = e.clientX
      y = e.clientY
      if (!raf) raf = requestAnimationFrame(draw)
    }

    const onLeave = () => {
      live = false
      node.classList.remove('is-on')
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return <div ref={el} className="grid-spot" aria-hidden="true" />
}
