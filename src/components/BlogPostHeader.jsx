import { formatDate } from '../lib/blog'

export default function BlogPostHeader({ post }) {
  return (
    <header className="blog-post__header">
      <h1 className="blog-post__title">{post.title}</h1>
      <p className="blog-post__meta">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span aria-hidden="true"> · </span>
        <span>{post.readingTime.text}</span>
        <span aria-hidden="true"> · </span>
        <span>{post.author.name}</span>
      </p>
    </header>
  )
}
