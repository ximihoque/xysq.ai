// Post metadata without the post bodies. Import this from anywhere that only
// needs to LINK to a post (use case pages, cross-links); import lib/blog.js
// only where the compiled MDX body is actually rendered. See the
// `virtual:blog-meta` plugin in vite.config.js for why the split exists.
import { posts } from 'virtual:blog-meta'

export function loadPostMeta({ includeDrafts = import.meta.env.DEV } = {}) {
  return includeDrafts ? posts : posts.filter((p) => !p.draft)
}

export function getPostMetaBySlug(slug, { includeDrafts = import.meta.env.DEV } = {}) {
  return loadPostMeta({ includeDrafts }).find((p) => p.slug === slug) ?? null
}

export function formatDate(iso) {
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}
