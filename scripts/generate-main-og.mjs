import { writeFileSync, readFileSync } from 'node:fs'
import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'

// The main og-image.png (1200x630), same satori+resvg pipeline and brand
// tokens as the per-post cards. Re-run after a positioning change:
//   node scripts/generate-main-og.mjs
const FONT_DIR = new URL('../public/fonts/', import.meta.url).pathname
const PUBLIC_DIR = new URL('../public/', import.meta.url).pathname

const C = {
  bg: '#0a0a0a',
  line: '#262626',
  paper: '#ededed',
  silver: '#8f8f8f',
  cyan: '#00e5c8',
  lychee: '#ff6b7a',
}

const logoData = `data:image/svg+xml;base64,${Buffer.from(readFileSync(`${PUBLIC_DIR}logo.svg`, 'utf8')).toString('base64')}`

const span = (children, style = {}) => ({ type: 'span', props: { style, children } })
const div = (children, style = {}) => ({ type: 'div', props: { style: { display: 'flex', ...style }, children } })

const H = 84 // headline size
const headlineLine = (parts) =>
  div(parts.map(([text, color]) => span(text, { fontSize: `${H}px`, fontWeight: 600, color, letterSpacing: '-2px', lineHeight: '1.06', whiteSpace: 'pre' })))

const tree = div(
  [
    // left column
    div(
      [
        // wordmark
        div(
          [
            { type: 'img', props: { src: logoData, width: 26, height: 36 } },
            span('xysq.ai', { fontSize: '30px', fontWeight: 600, color: C.paper, letterSpacing: '-0.5px', marginLeft: '14px' }),
          ],
          { alignItems: 'center' },
        ),

        // headline: three lines, hero coloring
        div(
          [
            headlineLine([['The first ', C.silver], ['self-improving', C.cyan]]),
            headlineLine([['context engineering', C.paper]]),
            headlineLine([['platform.', C.silver]]),
          ],
          { flexDirection: 'column', flexGrow: 1, justifyContent: 'center' },
        ),

        // footer: hairline + the three proofs
        div(
          [
            div([], { width: '100%', height: '1px', backgroundColor: C.line, marginBottom: '22px' }),
            span('Self-Improving Memory   ·   Knowledge Graphs   ·   Enterprise Governance', {
              fontSize: '24px', fontWeight: 500, color: C.silver, letterSpacing: '0px',
            }),
          ],
          { flexDirection: 'column' },
        ),
      ],
      { flexDirection: 'column', flexGrow: 1, padding: '56px 24px 56px 64px' },
    ),
  ],
  { width: '1200px', height: '630px', backgroundColor: C.bg, fontFamily: 'Outfit' },
)

const svg = await satori(tree, {
  width: 1200,
  height: 630,
  fonts: [
    { name: 'Outfit', data: readFileSync(`${FONT_DIR}Outfit-Regular.ttf`), weight: 400, style: 'normal' },
    { name: 'Outfit', data: readFileSync(`${FONT_DIR}Outfit-SemiBold.ttf`), weight: 600, style: 'normal' },
    { name: 'Outfit', data: readFileSync(`${FONT_DIR}Outfit-Bold.ttf`), weight: 700, style: 'normal' },
  ],
})

const png = new Resvg(svg, { fitTo: { mode: 'width', value: 2400 } }).render().asPng()
writeFileSync(`${PUBLIC_DIR}og-image.png`, png)
console.log('✓ og-image.png regenerated')
