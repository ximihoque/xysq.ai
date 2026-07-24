import puppeteer from 'puppeteer-core'

// og-image.png = a real screenshot of the hero (dark theme), right-side
// carousel hidden, copy centered. Needs the dev server running:
//   npm run dev   (in another shell)
//   node scripts/generate-main-og.mjs [url]
const TARGET = process.argv[2] || 'http://localhost:5173/'
const OUT = new URL('../public/og-image.png', import.meta.url).pathname
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'shell' })
const page = await browser.newPage()
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 })
await page.evaluateOnNewDocument(() => localStorage.setItem('theme', 'dark'))
await page.goto(TARGET, { waitUntil: 'networkidle0', timeout: 30000 })

// card composition: no nav chrome, no right-side visual, centered copy
await page.addStyleTag({
  content: `
    body { zoom: 1.25; }
    nav { display: none !important; }
    .hero-visual { display: none !important; }
    #hero { min-height: 100vh; padding: 0 64px !important; }
    .hero-inner { grid-template-columns: 1fr; max-width: 980px; transform: translateY(-61px); }
    .hero-copy { align-items: center; text-align: center; }
    .hero-h1 { max-width: none; }
    .hero-sub { margin-inline: auto; }
    .hero-points { justify-content: center; padding-bottom: 10px; margin-top: 10px; }
    .hero-btns { justify-content: center; }
  `,
})
// let the hero entrance animation finish
await new Promise((r) => setTimeout(r, 1800))
await page.screenshot({ path: OUT })
await browser.close()
console.log('✓ og-image.png captured from', TARGET)
