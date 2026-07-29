// section screenshot for visual verification: real viewport, real scroll
// usage: node scripts/section-shot.mjs <url> <out.png> [selector] [theme]
import puppeteer from 'puppeteer-core'
const [url, out, selector, theme] = process.argv.slice(2)
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'shell' })
const page = await browser.newPage()
await page.setViewport({ width: 1512, height: 1000, deviceScaleFactor: 1 })
if (theme) await page.evaluateOnNewDocument((t) => localStorage.setItem('theme', t), theme)
await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 })
await new Promise((r) => setTimeout(r, 700))
if (selector) {
  await page.evaluate((sel) => document.querySelector(sel)?.scrollIntoView({ block: 'center', behavior: 'instant' }), selector)
  await new Promise((r) => setTimeout(r, 1200))
  const el = await page.$(selector)
  if (!el) throw new Error(`selector not found: ${selector}`)
  await el.screenshot({ path: out })
} else {
  await page.screenshot({ path: out })
}
await browser.close()
console.log('saved', out)
