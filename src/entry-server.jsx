import { StrictMode } from 'react'
import { renderToPipeableStream } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Writable } from 'node:stream'
import App from './App.jsx'
import { USE_CASE_CATEGORIES } from './data/useCases.js'
import { FEATURE_PAGES } from './data/features.js'

// Single source of truth for the prerender script. Bundled by Vite SSR build
// so `import.meta.env` works for any data files that reference it.
export const ROUTES = [
  '/',
  '/contact',
  '/privacy',
  ...Object.keys(FEATURE_PAGES).map((slug) => `/features/${slug}`),
  ...USE_CASE_CATEGORIES.map((c) => `/use-cases/${c.slug}`),
]

// Renders the app at the given URL into a static HTML string. Uses
// renderToPipeableStream so React resolves all <Suspense>/lazy() boundaries
// (i.e. our route-level code-split chunks) before we collect the output.
//
// Returns:
//   { html, helmet } where helmet.{title,meta,link,script}.toString() can be
//   inlined into the document <head>.
export function render(url) {
  const helmetContext = {}

  return new Promise((resolve, reject) => {
    let html = ''
    let didResolve = false

    const collector = new Writable({
      write(chunk, _enc, cb) {
        html += chunk.toString()
        cb()
      },
      final(cb) {
        if (!didResolve) {
          didResolve = true
          resolve({ html, helmet: helmetContext.helmet })
        }
        cb()
      },
    })

    const tree = (
      <StrictMode>
        <HelmetProvider context={helmetContext}>
          <StaticRouter location={url}>
            <App />
          </StaticRouter>
        </HelmetProvider>
      </StrictMode>
    )

    const { pipe } = renderToPipeableStream(tree, {
      // onAllReady fires only after every Suspense boundary (incl. lazy()
      // route chunks) has fully resolved — exactly what we want for SSG.
      onAllReady() {
        pipe(collector)
      },
      onShellError(err) {
        if (!didResolve) {
          didResolve = true
          reject(err)
        }
      },
      onError(err) {
        // Stream-level errors during render: log and surface
        console.error(`[entry-server] render error for ${url}:`, err)
      },
    })
  })
}
