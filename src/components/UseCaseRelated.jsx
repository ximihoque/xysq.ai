import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BookOpen, ArrowRight } from 'lucide-react'
import { getPostMetaBySlug, formatDate } from '../lib/blogMeta'
import '../styles/use-case-related.css'

// Same reveal as the rest of the use case page. Kept local so the block can
// drop into any page without dragging the page's animation helper along.
const fade = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.26 },
}

// Posts we've actually written for this function. Unknown slugs are dropped
// rather than thrown on, so a post that gets renamed or unpublished degrades
// to "no block" instead of a broken page. validate-posts.mjs catches the
// rename at build time, which is where you actually want to hear about it.
export default function UseCaseRelated({ slugs = [] }) {
  const posts = slugs.map((s) => getPostMetaBySlug(s)).filter(Boolean)
  if (posts.length === 0) return null

  return (
    <motion.section className="ucr" aria-labelledby="ucr-heading" {...fade}>
      <div className="ucr-head">
        <BookOpen size={15} strokeWidth={1.8} aria-hidden="true" />
        <h2 id="ucr-heading">Related reading</h2>
      </div>

      <ul className="ucr-list">
        {posts.map((post) => (
          <li key={post.slug} className="ucr-item">
            <Link to={`/blog/${post.slug}`} className="ucr-link">
              {post.cover && (
                <div className="ucr-thumb" aria-hidden="true">
                  <img src={post.cover} alt="" loading="lazy" />
                </div>
              )}
              <div className="ucr-body">
                <div className="ucr-meta">
                  <span className="ucr-cat">{post.category}</span>
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  {post.readingTimeMinutes && <span>{post.readingTimeMinutes} min read</span>}
                </div>
                <h3 className="ucr-title">{post.title}</h3>
                {post.excerpt && <p className="ucr-excerpt">{post.excerpt}</p>}
                <span className="ucr-cta">
                  Read the post <ArrowRight size={13} strokeWidth={2} aria-hidden="true" />
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </motion.section>
  )
}
