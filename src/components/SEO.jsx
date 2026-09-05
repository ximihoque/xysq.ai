import { Helmet } from 'react-helmet-async'

const BASE_URL = 'https://xysq.ai'
// the query is a cache-buster for X, LinkedIn and Slack; bump it when the card changes
const DEFAULT_IMAGE = `${BASE_URL}/og-image.png?v=2026-09-06`

export default function SEO({
  title,
  description,
  path = '/',
  image = DEFAULT_IMAGE,
  // og-image.png is a 1200x630 card. blog posts pass 1600x900 for their own
  // cover, which used to CONTRADICT a hardcoded 1200x630 in index.html.
  // defaulting here means one source of truth and one pair of tags.
  imageWidth = 1200,
  imageHeight = 630,
  imageAlt,
  schema,
  extraLinks = [],
  keywords,
  author,
  twitterCard = 'summary_large_image',
  twitterCreator,
  ogType = 'website',
  article,
}) {
  // the home title is the one line the site says everywhere (hero, footer,
  // og alt), so the result list and the page agree
  const fullTitle = title ? `${title} · xysq.ai` : 'xysq.ai · The context platform for reliable, human-like agents'
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
      <meta property="og:image:alt" content={imageAlt || title || 'xysq.ai · The context platform for reliable, human-like agents'} />

      {/* flat, not wrapped in a fragment: react-helmet-async walks its direct
          children and does NOT descend into <>...</>, so a fragment here
          silently drops every tag inside it. arrays are fine, which is why
          the tag list and the schemas below work. */}
      {article?.publishedTime && <meta property="article:published_time" content={article.publishedTime} />}
      {article?.modifiedTime && <meta property="article:modified_time" content={article.modifiedTime} />}
      {article?.author && <meta property="article:author" content={article.author} />}
      {article?.section && <meta property="article:section" content={article.section} />}
      {(article?.tags ?? []).map((t) => (
        <meta key={t} property="article:tag" content={t} />
      ))}

      <meta name="twitter:card" content={twitterCard} />
      {twitterCreator && <meta name="twitter:creator" content={twitterCreator} />}
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
