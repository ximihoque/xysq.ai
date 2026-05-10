import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { loadPostsForBuild } from './load-posts-node.mjs'

const SITE_URL = 'https://xysq.ai'
const BASE_SITEMAP = 'public/sitemap.xml'

export function generateSitemap(distDir) {
  const posts = loadPostsForBuild()
  const base = readFileSync(BASE_SITEMAP, 'utf8')

  const blogIndexEntry = `  <url>
    <loc>${SITE_URL}/blog</loc>
    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`

  const postEntries = posts.map((p) => `  <url>
    <loc>${SITE_URL}/blog/${p.slug}</loc>
    <lastmod>${p.date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`).join('\n')

  const appended = [blogIndexEntry, postEntries].filter(Boolean).join('\n')
  const xml = base.replace('</urlset>', `${appended}\n</urlset>`)

  mkdirSync(distDir, { recursive: true })
  writeFileSync(`${distDir}/sitemap.xml`, xml, 'utf8')
  console.log(`✓ Sitemap: ${posts.length + 1} blog URL(s) appended → ${distDir}/sitemap.xml`)
}
