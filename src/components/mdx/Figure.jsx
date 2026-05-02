export function Figure({ src, alt = '', caption }) {
  return (
    <figure className="blog-figure">
      <img src={src} alt={alt || caption || ''} loading="lazy" />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}
