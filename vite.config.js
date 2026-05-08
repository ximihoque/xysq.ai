import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // For GitHub Pages with a custom domain (e.g. xysq.ai), keep base as '/'.
  // If deploying to https://username.github.io/repo-name/ instead, change to '/repo-name/'.
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
