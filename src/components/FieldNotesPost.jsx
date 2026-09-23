import { useRef } from 'react'
import { MDXProvider } from '@mdx-js/react'
import BlogTOC from './BlogTOC'
import { formatDate } from '../lib/blog'
import { mdxComponents } from '../lib/mdxComponents'
import '../styles/field-notes.css'

// css text-transform uppercases greek too, and a capital tau reads as a latin
// T ("T²-BENCH"). free text a writer types gets latin-only caps in js instead,
// with css uppercasing switched off for it (.fn-caps)
const latinCaps = (s) => s.replace(/[a-z]/g, (c) => c.toUpperCase())

// `==phrase==` renders the phrase in coral. validate-posts keeps the markers
// balanced, so every odd piece of the split is a highlight
function Headline({ text }) {
  return (
    <h1 className="fn-headline">
      {text.split('==').map((part, i) => (i % 2 ? <span key={i} className="fn-hl">{part}</span> : part))}
    </h1>
  )
}

// the `layout: "field-notes"` post body. BlogPostPage still owns the SEO,
// Nav and Footer; this replaces the cover header + author card and dresses
// the site's own BlogTOC in the field-notes palette. the byline carries the
// author, so there is no author card at the bottom
export default function FieldNotesPost({ post }) {
  const Body = post.Body
  const dek = post.dek ?? post.excerpt
  const articleRef = useRef(null)
  return (
    <main className="field-notes">
      <BlogTOC articleRef={articleRef} />
      <article className="fn-frame" ref={articleRef}>
        <header>
          {post.eyebrow && <p className="fn-eyebrow fn-mono fn-caps">{latinCaps(post.eyebrow)}</p>}
          <Headline text={post.headline ?? post.title} />
          {dek && <p className="fn-dek">{dek}</p>}
          <div className="fn-byline fn-mono fn-caps">
            <span>{latinCaps(post.author.name)}</span>
            <time dateTime={post.date}>{latinCaps(formatDate(post.date))}</time>
            <span>{latinCaps(post.readingTime.text)}</span>
            {post.facts.map((fact) => <span key={fact}>{latinCaps(fact)}</span>)}
          </div>
        </header>
        <div className="fn-prose">
          <MDXProvider components={mdxComponents}>
            <Body />
          </MDXProvider>
        </div>
        <footer className="fn-foot fn-mono">
          <span>xysq · field notes</span>
          <time dateTime={post.date}>{post.date}</time>
        </footer>
      </article>
    </main>
  )
}
