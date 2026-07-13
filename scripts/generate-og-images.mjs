import { writeFileSync, mkdirSync, readFileSync } from 'node:fs'
import { loadPostsForBuild } from './load-posts-node.mjs'
import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'

// Per-blog-post OG cards. Matches the site brand: Outfit sans (no serif),
// near-monochrome dark, cyan/lychee accents used sparingly, the lychee mascot.
// Fonts + logo ship in website/public/. Playfair is gone (serif retired).
const FONT_DIR = new URL('../public/fonts/', import.meta.url).pathname
const PUBLIC_DIR = new URL('../public/', import.meta.url).pathname

// brand tokens, kept in sync with src/styles/global.css :root (dark)
const C = {
  bg: '#0a0a0a',
  line: '#262626',
  paper: '#ededed',
  silver: '#8f8f8f',
  cyan: '#00e5c8',
}

function loadFont(file) {
  return readFileSync(`${FONT_DIR}${file}`)
}

// lychee mascot as a data URI so satori can draw it as an <img>
function loadLogoData() {
  const svg = readFileSync(`${PUBLIC_DIR}logo.svg`, 'utf8')
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`
}

const row = (children, extra = {}) => ({
  type: 'div',
  props: { style: { display: 'flex', flexDirection: 'row', ...extra }, children },
})
const col = (children, extra = {}) => ({
  type: 'div',
  props: { style: { display: 'flex', flexDirection: 'column', ...extra }, children },
})

// Left-editorial layout (the winning main-card language), adapted per post:
// wordmark top-left, post title as the hero, author + date footer, mascot right.
function template(post, logoData) {
  return {
    type: 'div',
    props: {
      style: {
        display: 'flex',
        flexDirection: 'row',
        width: '1200px',
        height: '630px',
        backgroundColor: C.bg,
        fontFamily: 'Outfit',
      },
      children: [
        col(
          [
            // wordmark: cyan dot + xysq.ai
            row(
              [
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      width: '10px',
                      height: '10px',
                      borderRadius: '5px',
                      backgroundColor: C.cyan,
                      marginRight: '12px',
                    },
                  },
                },
                {
                  type: 'span',
                  props: {
                    style: { fontSize: '28px', fontWeight: 600, color: C.paper, letterSpacing: '-0.5px' },
                    children: 'xysq.ai',
                  },
                },
              ],
              { alignItems: 'center' },
            ),

            // post title as the hero, centered vertically
            {
              type: 'div',
              props: {
                style: {
                  display: 'flex',
                  flexGrow: 1,
                  alignItems: 'center',
                  fontSize: '60px',
                  fontWeight: 700,
                  color: C.paper,
                  letterSpacing: '-1.5px',
                  lineHeight: '1.1',
                  maxWidth: '780px',
                },
                children: post.title,
              },
            },

            // footer: author + date, above a hairline
            col(
              [
                {
                  type: 'div',
                  props: {
                    style: { display: 'flex', width: '100%', height: '1px', backgroundColor: C.line, marginBottom: '20px' },
                  },
                },
                {
                  type: 'span',
                  props: {
                    style: { fontSize: '22px', fontWeight: 500, color: C.silver },
                    children: `${post.author?.name ?? ''}  ·  ${post.date}`,
                  },
                },
              ],
              {},
            ),
          ],
          { flexGrow: 1, paddingTop: '68px', paddingBottom: '68px', paddingLeft: '80px', paddingRight: '48px' },
        ),

        // mascot anchored center-right
        col(
          [{ type: 'img', props: { src: logoData, width: 200, height: 200 } }],
          { width: '300px', alignItems: 'center', justifyContent: 'center', paddingRight: '24px' },
        ),
      ],
    },
  }
}

export async function generateOgImages(distDir) {
  const posts = loadPostsForBuild()
  mkdirSync(`${distDir}/blog/og`, { recursive: true })

  let regular, semibold, bold, logoData
  try {
    regular = loadFont('Outfit-Regular.ttf')
    semibold = loadFont('Outfit-SemiBold.ttf')
    bold = loadFont('Outfit-Bold.ttf')
    logoData = loadLogoData()
  } catch (err) {
    console.warn('⚠ OG assets missing in website/public/. Skipping per-post OG generation.')
    console.warn('  Need public/fonts/Outfit-{Regular,SemiBold,Bold}.ttf and public/logo.svg.')
    return
  }

  const fonts = [
    { name: 'Outfit', data: regular, weight: 400, style: 'normal' },
    { name: 'Outfit', data: semibold, weight: 500, style: 'normal' },
    { name: 'Outfit', data: semibold, weight: 600, style: 'normal' },
    { name: 'Outfit', data: bold, weight: 700, style: 'normal' },
  ]

  let count = 0
  for (const post of posts) {
    // posts that ship their own cover image use that as the social card
    if (post.cover) continue
    const svg = await satori(template(post, logoData), { width: 1200, height: 630, fonts })
    const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng()
    writeFileSync(`${distDir}/blog/og/${post.slug}.png`, png)
    count++
  }
  console.log(`✓ OG images: ${count} per-post card(s) → dist/blog/og/*.png`)
}
