import { Helmet } from 'react-helmet-async'

const BASE_URL = 'https://xysq.ai'
const DEFAULT_IMAGE = `${BASE_URL}/og-image.png`

export default function SEO({
  title,
  description,
  path = '/',
  image = DEFAULT_IMAGE,
  imageWidth,
  imageHeight,
  schema,
  extraLinks = [],
  keywords,
  author,
  twitterCard = 'summary_large_image',
  ogType = 'website',
  article,
}) {
  const fullTitle = title ? `${title} — xysq.ai` : 'xysq.ai — Memory infrastructure for AI.'
  const canonical = `${BASE_URL}${path}`
  const schemas = Array.isArray(schema) ? schema : schema ? [schema] : []
  const keywordList = Array.isArray(keywords) ? keywords.join(', ') : keywords

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywordList && <meta name="keywords" content={keywordList} />}
      {author && <meta name="author" content={author} />}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <link rel="canonical" href={canonical} />

      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="xysq.ai" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      {imageWidth && <meta property="og:image:width" content={String(imageWidth)} />}
      {imageHeight && <meta property="og:image:height" content={String(imageHeight)} />}
      <meta property="og:image:alt" content={title || 'xysq.ai'} />

      {article && (
        <>
          {article.publishedTime && <meta property="article:published_time" content={article.publishedTime} />}
          {article.modifiedTime && <meta property="article:modified_time" content={article.modifiedTime} />}
          {article.author && <meta property="article:author" content={article.author} />}
          {article.section && <meta property="article:section" content={article.section} />}
          {(article.tags ?? []).map((t) => (
            <meta key={t} property="article:tag" content={t} />
          ))}
        </>
      )}

      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {extraLinks.map((l, i) => (
        <link key={i} {...l} />
      ))}

      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(s)}</script>
      ))}
    </Helmet>
  )
}

export function breadcrumbSchema(trail) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      item: t.item.startsWith('http') ? t.item : `${BASE_URL}${t.item}`,
    })),
  }
}
