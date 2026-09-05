import puppeteer from 'puppeteer-core'

// og-image.png = a real screenshot of the hero in the dark theme: the mark,
// the three-line headline with "reliable agents" held, the subtext. Nothing else. Needs the dev
// server running:
//   npm run dev   (in another shell)
//   node scripts/generate-main-og.mjs [url]
const TARGET = process.argv[2] || 'http://localhost:5173/'
const OUT = new URL('../public/og-image.png', import.meta.url).pathname
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'shell' })
const page = await browser.newPage()
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 })
await page.evaluateOnNewDocument(() => localStorage.setItem('theme', 'dark'))
// freeze the rotating middle line on its first word ("reliable agents"):
// the rotation is a setInterval, so a no-op interval never advances it
await page.evaluateOnNewDocument(() => { window.setInterval = () => 0 })
await page.goto(TARGET, { waitUntil: 'networkidle0', timeout: 30000 })

// card composition: only the copy block, centred, scaled up for a 1200x630
// frame (the page's vw-based sizes are tuned for a browser, not a card)
await page.addStyleTag({
  content: `
    nav, .hero-signup, .hero-btns, .hero-strip, .hero-jump, .hero-stage-wrap,
    #hero ~ *, .hero-sparks { display: none !important; }
    #hero { min-height: 100vh; padding: 0 64px !important; justify-content: center; }
    .hero-inner { transform: translateY(-6px); }
    .hero-mark { margin-bottom: 26px; }
    .hero-mark svg { width: 84px; height: auto; }
    .hero-h1 { font-size: 64px !important; line-height: 1.04 !important; margin-bottom: 34px !important; }
    .hero-sub { font-size: 21px !important; margin-bottom: 0 !important; }
    .hero-sub-ico { width: 24px; height: 24px; vertical-align: -4px; margin-right: 10px; }
  `,
})
// let the hero entrance animation finish
await new Promise((r) => setTimeout(r, 1800))
await page.screenshot({ path: OUT })
await browser.close()
console.log('✓ og-image.png captured from', TARGET)
