import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // For GitHub Pages with a custom domain (e.g. xysq.ai), keep base as '/'.
  // If deploying to https://username.github.io/repo-name/ instead, change to '/repo-name/'.
  base: '/',
})
