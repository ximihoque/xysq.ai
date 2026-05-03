const postModules = import.meta.glob('/src/content/blog/*.mdx', { eager: true })
const authorModules = import.meta.glob('/src/content/authors/*.json', { eager: true })

const authorsById = Object.fromEntries(
  Object.values(authorModules).map((mod) => [mod.default.id, mod.default])
)

function buildPost(path, mod) {
  const fm = mod.frontmatter
  if (!fm || !fm.slug) {
    throw new Error(`Post at ${path} is missing frontmatter or slug`)
  }
  const author = authorsById[fm.author]
  if (!author) {
    throw new Error(`Post "${fm.slug}" references unknown author "${fm.author}"`)
  }

  // The MDX module's default export is the React component for the body.
  const Body = mod.default

  // reading-time wants raw text; we approximate from the rendered body's words.
  // We can't easily get the raw text from the compiled module, so we estimate
  // from the file path's known word count via a build-time annotation. As a
  // simpler approach, we use a fixed average if not provided.
  const estimatedMinutes = fm.readingTimeMinutes ?? 4

  return {
    slug: fm.slug,
    title: fm.title,
    date: fm.date,
    excerpt: fm.excerpt ?? '',
    category: fm.category ?? 'Article',
    tags: fm.tags ?? [],
    cover: fm.cover ?? null,
    draft: Boolean(fm.draft),
    featured: Boolean(fm.featured),
    related: fm.related ?? [],
    author,
    readingTime: { minutes: estimatedMinutes, text: `${estimatedMinutes} min read` },
    Body,
    path,
  }
}

const allPosts = Object.entries(postModules)
  .map(([path, mod]) => buildPost(path, mod))
  .sort((a, b) => (a.date < b.date ? 1 : -1))

export function loadPosts({ includeDrafts = import.meta.env.DEV } = {}) {
  return includeDrafts ? allPosts : allPosts.filter((p) => !p.draft)
}

export function getPostBySlug(slug, { includeDrafts = import.meta.env.DEV } = {}) {
  return loadPosts({ includeDrafts }).find((p) => p.slug === slug) ?? null
}

export function formatDate(iso) {
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}
