import { formatDate } from '../lib/blog'

export default function BlogPostHeader({ post }) {
  return (
    <header className="blog-post__header">
      <h1 className="blog-post__title">{post.title}</h1>
      {post.excerpt && (
        <p className="blog-post__subtitle">{post.excerpt}</p>
      )}
      <div className="blog-post__byline">
        <div className="blog-post__author">
          {post.author.avatar && (
            <img src={post.author.avatar} alt="" className="blog-post__avatar" />
          )}
          <span className="blog-post__author-name">{post.author.name}</span>
        </div>
        <time className="blog-post__date" dateTime={post.date}>
          {formatDate(post.date)}
        </time>
      </div>
    </header>
  )
}
