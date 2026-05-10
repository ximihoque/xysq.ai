export default function BlogAuthorCard({ author }) {
  return (
    <aside className="blog-author-card">
      {author.avatar && <img src={author.avatar} alt="" className="blog-author-card__avatar" />}
      <div className="blog-author-card__body">
        <div className="blog-author-card__name">{author.name}</div>
        {author.title && <div className="blog-author-card__title">{author.title}</div>}
        {author.bio && <p className="blog-author-card__bio">{author.bio}</p>}
        {author.links && (
          <div className="blog-author-card__links">
            {author.links.twitter && <a href={author.links.twitter} rel="noopener">Twitter</a>}
            {author.links.linkedin && <a href={author.links.linkedin} rel="noopener">LinkedIn</a>}
            {author.links.github && <a href={author.links.github} rel="noopener">GitHub</a>}
          </div>
        )}
      </div>
    </aside>
  )
}
