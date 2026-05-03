import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import matter from 'gray-matter'

const POSTS_DIR = new URL('../src/content/blog/', import.meta.url).pathname
const AUTHORS_DIR = new URL('../src/content/authors/', import.meta.url).pathname
const CATEGORIES_FILE = new URL('../src/content/categories.json', import.meta.url).pathname

const REQUIRED = ['title', 'slug', 'date', 'author', 'excerpt', 'category']
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/

function fail(msg) {
  console.error(`✗ ${msg}`)
  process.exitCode = 1
}

function knownAuthors() {
  return new Set(
    readdirSync(AUTHORS_DIR)
      .filter((f) => f.endsWith('.json'))
      .map((f) => f.replace(/\.json$/, ''))
  )
}

function knownCategories() {
  const data = JSON.parse(readFileSync(CATEGORIES_FILE, 'utf8'))
  return new Set(data.categories)
}

function validate() {
  const authors = knownAuthors()
  const categories = knownCategories()
  const files = readdirSync(POSTS_DIR).filter((f) => f.endsWith('.mdx'))
  if (files.length === 0) {
    console.log('No posts found (this is fine).')
    return
  }

  let featuredCount = 0
  for (const file of files) {
    const path = join(POSTS_DIR, file)
    const raw = readFileSync(path, 'utf8')
    const { data: fm } = matter(raw)

    for (const field of REQUIRED) {
      if (!fm[field]) fail(`${file}: missing required frontmatter "${field}"`)
    }
    if (fm.date && !ISO_DATE.test(fm.date)) {
      fail(`${file}: date "${fm.date}" must be ISO YYYY-MM-DD`)
    }
    if (fm.slug && !file.endsWith(`${fm.slug}.mdx`)) {
      fail(`${file}: filename must end with "${fm.slug}.mdx" to match slug`)
    }
    if (fm.author && !authors.has(fm.author)) {
      fail(`${file}: unknown author "${fm.author}" (no matching authors/${fm.author}.json)`)
    }
    if (fm.category && !categories.has(fm.category)) {
      fail(`${file}: unknown category "${fm.category}". Allowed: ${[...categories].join(', ')}`)
    }
    if (fm.featured === true && !fm.draft) featuredCount++
  }

  if (featuredCount > 1) {
    fail(`At most one published post may have "featured: true" (found ${featuredCount}).`)
  }

  if (process.exitCode) {
    console.error('\nFrontmatter validation failed.')
  } else {
    console.log(`✓ All ${files.length} post(s) have valid frontmatter.`)
  }
}

validate()
