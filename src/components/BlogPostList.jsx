import { Link } from 'react-router-dom'
import { formatDate } from '../lib/blog'

export default function BlogPostList({ posts }) {
  if (posts.length === 0) {
    return <p className="blog-index__empty">No posts yet — check back soon.</p>
  }
  return (
    <ul className="blog-index__list">
      {posts.map((p) => (
        <li key={p.slug} className="blog-index__row">
          <Link to={`/blog/${p.slug}`} className="blog-index__link">
            <time className="blog-index__date" dateTime={p.date}>{formatDate(p.date)}</time>
            <h2 className="blog-index__title">{p.title}</h2>
            {p.excerpt && <p className="blog-index__excerpt">{p.excerpt}</p>}
            <span className="blog-index__reading">{p.readingTime.text}</span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
