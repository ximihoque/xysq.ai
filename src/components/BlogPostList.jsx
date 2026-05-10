import { Link } from 'react-router-dom'
import { formatDate } from '../lib/blog'

function pickFeatured(posts) {
  const flagged = posts.find((p) => p.featured)
  return flagged ?? posts[0]
}

function FeaturedCard({ post }) {
  return (
    <Link to={`/blog/${post.slug}`} className="blog-featured" aria-label={post.title}>
      <div className="blog-featured__visual" aria-hidden="true">
        {post.cover ? (
          <img src={post.cover} alt="" />
        ) : (
          <div className="blog-featured__placeholder" />
        )}
      </div>
      <div className="blog-featured__body">
        <span className="blog-tag">Featured</span>
        <h2 className="blog-featured__title">{post.title}</h2>
        {post.excerpt && <p className="blog-featured__excerpt">{post.excerpt}</p>}
        <div className="blog-featured__byline">
          <div className="blog-card__author">
            {post.author.avatar && (
              <img src={post.author.avatar} alt="" className="blog-card__avatar" />
            )}
            <span>{post.author.name}</span>
          </div>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </div>
      </div>
    </Link>
  )
}

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
  const featured = pickFeatured(posts)
  const rest = posts.filter((p) => p.slug !== featured.slug)
  return (
    <>
      <FeaturedCard post={featured} />
      {rest.length > 0 && (
        <ul className="blog-index__grid">
          {rest.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </ul>
      )}
    </>
  )
}
