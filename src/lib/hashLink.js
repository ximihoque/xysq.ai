// Click handler for <Link to="/path#anchor"> entries.
//
// React Router v6's Link will update the URL on hash navigation, but if the
// user is already on the target pathname the page doesn't re-render — and our
// ScrollToTop only fires once per (pathname, hash) location change, which can
// be missed when pathname doesn't change at all. Calling scrollIntoView
// directly here keeps same-page navigation reliable. Cross-page navigation is
// untouched: we just call any onAfter() callback (e.g. closeMenu) and let
// React Router + ScrollToTop handle it.
export function handleHashLink(event, to, currentPathname, onAfter) {
  const hashIdx = to.indexOf('#')
  const path = hashIdx >= 0 ? to.slice(0, hashIdx) : to
  const hash = hashIdx >= 0 ? to.slice(hashIdx + 1) : ''
  const targetPath = path || '/'

  if (hash && currentPathname === targetPath) {
    event.preventDefault()
    const el = document.getElementById(hash)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      if (window.history && typeof window.history.pushState === 'function') {
        window.history.pushState(null, '', `#${hash}`)
      }
    }
  }

  if (typeof onAfter === 'function') onAfter()
}
