import { writeFileSync, mkdirSync } from 'node:fs'
import { loadPostsForBuild } from './load-posts-node.mjs'

const SITE_URL = 'https://xysq.ai'
const FEED_TITLE = 'xysq blog'
const FEED_DESC = 'Notes from the team building xysq — a consent-first memory layer for AI agents.'

function escapeXml(s = '') {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export function generateRss(distDir) {
  const posts = loadPostsForBuild()
  const items = posts
    .map((p) => `
    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${SITE_URL}/blog/${p.slug}</link>
      <guid>${SITE_URL}/blog/${p.slug}</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <description>${escapeXml(p.excerpt ?? '')}</description>
      <author>noreply@xysq.ai (${escapeXml(p.author?.name ?? 'xysq')})</author>
    </item>`)
    .join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(FEED_TITLE)}</title>
    <link>${SITE_URL}/blog</link>
    <description>${escapeXml(FEED_DESC)}</description>
    <language>en-us</language>
    <atom:link href="${SITE_URL}/blog/rss.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`

  mkdirSync(`${distDir}/blog`, { recursive: true })
  writeFileSync(`${distDir}/blog/rss.xml`, xml, 'utf8')
  console.log(`✓ RSS: ${posts.length} item(s) → dist/blog/rss.xml`)
}
