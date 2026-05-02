import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const POSTS_DIR = new URL('../src/content/blog/', import.meta.url).pathname
const AUTHORS_DIR = new URL('../src/content/authors/', import.meta.url).pathname

export function loadAuthors() {
  const out = {}
  for (const file of readdirSync(AUTHORS_DIR).filter((f) => f.endsWith('.json'))) {
    const author = JSON.parse(readFileSync(join(AUTHORS_DIR, file), 'utf8'))
    out[author.id] = author
  }
  return out
}

export function loadPostsForBuild({ includeDrafts = false } = {}) {
  const authors = loadAuthors()
  const posts = []
  for (const file of readdirSync(POSTS_DIR).filter((f) => f.endsWith('.mdx'))) {
    const raw = readFileSync(join(POSTS_DIR, file), 'utf8')
    const { data: fm, content } = matter(raw)
    if (!includeDrafts && fm.draft) continue
    posts.push({
      ...fm,
      author: authors[fm.author],
      readingTime: readingTime(content),
      rawBody: content,
    })
  }
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
}
