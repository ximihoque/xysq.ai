import { writeFileSync, mkdirSync } from 'node:fs'
import { loadPostsForBuild } from './load-posts-node.mjs'

const SITE_URL = 'https://xysq.ai'
const STATIC_ROUTES = ['/', '/for-business', '/vision', '/privacy', '/blog']

export function generateSitemap(distDir) {
  const posts = loadPostsForBuild()
  const today = new Date().toISOString().slice(0, 10)

  const urls = [
    ...STATIC_ROUTES.map((p) => ({ loc: `${SITE_URL}${p}`, lastmod: today })),
    ...posts.map((p) => ({ loc: `${SITE_URL}/blog/${p.slug}`, lastmod: p.date })),
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u.loc}</loc><lastmod>${u.lastmod}</lastmod></url>`).join('\n')}
</urlset>`

  mkdirSync(distDir, { recursive: true })
  writeFileSync(`${distDir}/sitemap.xml`, xml, 'utf8')
  console.log(`✓ Sitemap: ${urls.length} URL(s) → dist/sitemap.xml`)
}
