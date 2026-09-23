import { MDXProvider } from '@mdx-js/react'
import { formatDate } from '../lib/blog'
import { mdxComponents } from '../lib/mdxComponents'
import '../styles/field-notes.css'

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
// Nav and Footer; this replaces only the TOC + cover header + author card.
// the byline carries the author, so there is no author card at the bottom
export default function FieldNotesPost({ post }) {
  const Body = post.Body
  const dek = post.dek ?? post.excerpt
  return (
    <main className="field-notes">
      <article className="fn-frame">
        <header>
          {post.eyebrow && <p className="fn-eyebrow fn-mono">{post.eyebrow}</p>}
          <Headline text={post.headline ?? post.title} />
          {dek && <p className="fn-dek">{dek}</p>}
          <div className="fn-byline fn-mono">
            <span>{post.author.name}</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span>{post.readingTime.text}</span>
            {post.facts.map((fact) => <span key={fact}>{fact}</span>)}
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
