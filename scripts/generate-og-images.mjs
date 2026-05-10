import { writeFileSync, mkdirSync, readFileSync } from 'node:fs'
import { loadPostsForBuild } from './load-posts-node.mjs'
import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'

// Load Outfit + Playfair font files. We rely on system-installed npm font packages
// or local files in website/public/fonts/. Easiest: download once and ship in repo.
const FONT_DIR = new URL('../public/fonts/', import.meta.url).pathname

function loadFont(file) {
  return readFileSync(`${FONT_DIR}${file}`)
}

function template(post) {
  return {
    type: 'div',
    props: {
      style: {
        width: '1200px',
        height: '630px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '72px',
        background: 'linear-gradient(135deg, #020408 0%, #060c14 100%)',
        color: '#f0f4f8',
        fontFamily: 'Outfit',
      },
      children: [
        {
          type: 'div',
          props: {
            style: { display: 'flex', alignItems: 'center', gap: '12px', fontSize: '24px', color: '#00e5c8' },
            children: 'xysq.ai',
          },
        },
        {
          type: 'div',
          props: {
            style: {
              fontFamily: 'Playfair Display',
              fontSize: '64px',
              lineHeight: 1.15,
              maxWidth: '1000px',
              fontWeight: 500,
              letterSpacing: '-0.02em',
            },
            children: post.title,
          },
        },
        {
          type: 'div',
          props: {
            style: { fontSize: '22px', color: '#8899aa' },
            children: `${post.author?.name ?? ''} · ${post.date}`,
          },
        },
      ],
    },
  }
}

export async function generateOgImages(distDir) {
  const posts = loadPostsForBuild()
  mkdirSync(`${distDir}/blog/og`, { recursive: true })

  let outfit, playfair
  try {
    outfit = loadFont('Outfit-Regular.ttf')
    playfair = loadFont('PlayfairDisplay-Medium.ttf')
  } catch (err) {
    console.warn('⚠ OG font files missing in website/public/fonts/. Skipping OG generation.')
    console.warn('  Add Outfit-Regular.ttf and PlayfairDisplay-Medium.ttf to enable.')
    return
  }

  for (const post of posts) {
    if (post.cover) continue
    const svg = await satori(template(post), {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Outfit', data: outfit, weight: 400, style: 'normal' },
        { name: 'Playfair Display', data: playfair, weight: 500, style: 'normal' },
      ],
    })
    const png = new Resvg(svg).render().asPng()
    writeFileSync(`${distDir}/blog/og/${post.slug}.png`, png)
  }
  console.log(`✓ OG images: ${posts.length} → dist/blog/og/*.png`)
}
