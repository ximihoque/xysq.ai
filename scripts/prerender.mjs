// Prerender every known route to a static dist/<route>/index.html.
//
// Runs after the client + SSR Vite builds. Reads the SSR bundle's render()
// function, the client-built dist/index.html template, and produces one HTML
// file per route — each with the correct per-page <title>, meta tags, OG/
// Twitter tags, and JSON-LD schema (extracted from react-helmet-async).
//
// Route list:
//   - Static: /, /contact, /privacy
//   - Dynamic: /features/:slug × N, /use-cases/:slug × M
//     (enumerated from the same data sources the React app uses)

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..')
const distDir = path.join(projectRoot, 'dist')
const ssrDir = path.join(projectRoot, 'dist-ssr')

const templatePath = path.join(distDir, 'index.html')
const ssrEntryPath = path.join(ssrDir, 'entry-server.js')

// Sanity-check both builds completed
for (const p of [templatePath, ssrEntryPath]) {
  if (!fs.existsSync(p)) {
    console.error(`[prerender] missing ${p} — run client + SSR builds first`)
    process.exit(1)
  }
}

const template = fs.readFileSync(templatePath, 'utf-8')
// Both render() and the route list come from the SSR bundle so Vite's env
// (e.g. import.meta.env.VITE_APP_URL referenced by feature data) is injected.
const { render, ROUTES: routes } = await import(pathToFileURL(ssrEntryPath).href)

// ─── Render each route ───────────────────────────────────────────────────

let succeeded = 0
let failed = 0

for (const url of routes) {
  try {
    const { html, helmet } = await render(url)

    // Helmet builds the head string from the components rendered for this
    // route. Joined just before the closing </head> via the placeholder.
    const helmetHead = helmet
      ? [
          helmet.title?.toString() ?? '',
          helmet.meta?.toString() ?? '',
          helmet.link?.toString() ?? '',
          helmet.script?.toString() ?? '',
        ]
          .filter(Boolean)
          .join('\n    ')
      : ''

    const finalHtml = template
      .replace('<!--app-head-->', helmetHead)
      .replace('<!--app-html-->', html)

    const outPath =
      url === '/'
        ? path.join(distDir, 'index.html')
        : path.join(distDir, url, 'index.html')

    fs.mkdirSync(path.dirname(outPath), { recursive: true })
    fs.writeFileSync(outPath, finalHtml)
    succeeded++
    console.log(`✓ ${url}`)
  } catch (err) {
    failed++
    console.error(`✗ ${url}:`, err.message)
  }
}

console.log(
  `\n[prerender] ${succeeded} routes written, ${failed} failed (out of ${routes.length}).`,
)

// Fail the build if any prerender failed — better to catch broken pages here
// than ship a half-prerendered site.
if (failed > 0) process.exit(1)
