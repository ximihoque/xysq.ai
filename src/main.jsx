import { StrictMode } from 'react'
import { hydrateRoot, createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { MotionConfig } from 'framer-motion'
import './styles/global.css'
import './styles/responsive.css'
import App from './App.jsx'

const root = document.getElementById('root')

// framer-motion defaults to reducedMotion "never", so every motion component
// on the site ignored the OS setting while our CSS honoured it. "user" turns
// off transform/layout animation for those visitors and keeps opacity+color.
const tree = (
  <StrictMode>
    <HelmetProvider>
      <MotionConfig reducedMotion="user">
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MotionConfig>
    </HelmetProvider>
  </StrictMode>
)

// If the root has prerendered children (production SSG build), hydrate.
// In dev or for the un-prerendered fallback, mount fresh.
if (root.hasChildNodes()) {
  hydrateRoot(root, tree)
} else {
  createRoot(root).render(tree)
}
