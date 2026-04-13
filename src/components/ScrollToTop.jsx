import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    // If there's a hash (e.g. #fb-contact), let the browser scroll to it
    if (hash) return

    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])

  return null
}
