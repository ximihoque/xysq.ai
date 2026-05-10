import { generateRss } from './generate-rss.mjs'
import { generateSitemap } from './generate-sitemap.mjs'
import { generateOgImages } from './generate-og-images.mjs'

const DIST = new URL('../dist/', import.meta.url).pathname

async function run() {
  generateRss(DIST)
  generateSitemap(DIST)
  await generateOgImages(DIST)
  console.log('✓ Post-build complete.')
}

run().catch((err) => {
  console.error('✗ Post-build failed:', err)
  process.exit(1)
})
