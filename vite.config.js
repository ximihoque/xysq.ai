import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'

export default defineConfig({
  plugins: [
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
