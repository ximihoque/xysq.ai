import { Link } from 'react-router-dom'
import { formatDate } from '../lib/blog'

function PostCard({ post }) {
  return (
    <li className="blog-card">
      <Link to={`/blog/${post.slug}`} className="blog-card__link">
        {post.cover && (
          <div className="blog-card__cover" aria-hidden="true">
            <img src={post.cover} alt="" />
          </div>
        )}
        <span className="blog-tag blog-tag--ghost">{post.category}</span>
        <h3 className="blog-card__title">{post.title}</h3>
        {post.excerpt && <p className="blog-card__excerpt">{post.excerpt}</p>}
        <div className="blog-card__byline">
          <div className="blog-card__author">
            {post.author.avatar && (
              <img src={post.author.avatar} alt="" className="blog-card__avatar" />
            )}
            <span>{post.author.name}</span>
          </div>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </div>
      </Link>
    </li>
  )
}

export default function BlogPostList({ posts }) {
  if (posts.length === 0) {
    return <p className="blog-index__empty">No posts yet — check back soon.</p>
  }
  return (
    <ul className="blog-index__grid">
      {posts.map((p) => (
        <PostCard key={p.slug} post={p} />
      ))}
    </ul>
  )
}
