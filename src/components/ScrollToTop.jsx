import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// On client-side route changes:
//   • If the URL has a hash (#section), scroll that element into view. Because
//     the app uses <AnimatePresence mode="wait"> the new page's DOM doesn't
//     mount until the old page finishes exiting (~400ms). We poll for the
//     element for up to ~1.2s, scrolling as soon as it appears.
//   • Otherwise, jump to the top.
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.replace(/^#/, '')
      let cancelled = false
      let attempts = 0
      const maxAttempts = 24 // ~1.2s at 50ms intervals

      const tryScroll = () => {
        if (cancelled) return
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
          return
        }
        attempts += 1
        if (attempts < maxAttempts) {
          setTimeout(tryScroll, 50)
        } else {
          // Give up gracefully — element never appeared
          window.scrollTo({ top: 0, behavior: 'instant' })
        }
      }

      tryScroll()
      return () => { cancelled = true }
    }

    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])

  return null
}
