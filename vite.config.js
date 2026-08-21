import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'

// `virtual:blog-meta`: every post's frontmatter, and nothing else.
//
// Why this exists: an MDX module is atomic to Rollup. Import *any* export from
// one (even just `frontmatter`) and the compiled body comes along, because the
// blog routes use that body so it can't be shaken out. That's ~135 KB of post
// bodies. Pages that only want to *link* to a post (the use case pages) would
// pay all of it for a title and a cover. So we read the frontmatter at build
// time with gray-matter and hand back a plain array.
//
// Sorted newest-first, same as lib/blog.js, so both agree on ordering.
function blogMetaPlugin() {
  const virtualId = 'virtual:blog-meta'
  const resolvedId = '\0' + virtualId
  const postsDir = fileURLToPath(new URL('./src/content/blog', import.meta.url))

  const readFrontmatter = () =>
    fs
      .readdirSync(postsDir)
      .filter((f) => f.endsWith('.mdx'))
      .map((f) => matter(fs.readFileSync(path.join(postsDir, f), 'utf-8')).data)
      .sort((a, b) => (a.date < b.date ? 1 : -1))

  return {
    name: 'xysq:blog-meta',
    resolveId: (id) => (id === virtualId ? resolvedId : null),
    load: (id) =>
      id === resolvedId
        ? `export const posts = ${JSON.stringify(readFrontmatter())}`
        : null,
    // editing a post in dev should refresh the metadata too
    handleHotUpdate({ file, server }) {
      if (!file.endsWith('.mdx')) return
      const mod = server.moduleGraph.getModuleById(resolvedId)
      if (mod) server.moduleGraph.invalidateModule(mod)
    },
  }
}

export default defineConfig({
  plugins: [
    blogMetaPlugin(),
    {
      enforce: 'pre',
      ...mdx({
        remarkPlugins: [
          remarkFrontmatter,
          [remarkMdxFrontmatter, { name: 'frontmatter' }],
          remarkGfm,
        ],
        rehypePlugins: [
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: 'append',
              properties: { className: ['heading-anchor'], 'aria-label': 'Link to section' },
              content: { type: 'text', value: '#' },
            },
          ],
          [
            rehypePrettyCode,
            {
              theme: 'github-dark-dimmed',
              keepBackground: true,
            },
          ],
        ],
        providerImportSource: '@mdx-js/react',
      }),
    },
    react(),
  ],
  base: '/',
  build: {
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        // Split heavy vendors into their own chunks so they cache independently
        // of app code. framer-motion is the largest (~70 KB gz); router and
        // helmet are small but rarely change.
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('framer-motion')) return 'framer-motion'
          if (id.includes('react-router')) return 'router'
          if (id.includes('react-helmet-async')) return 'helmet'
          if (id.includes('lucide-react')) return 'icons'
          if (id.includes('react-dom') || id.includes('/react/')) return 'react'
        },
      },
    },
  },
})
