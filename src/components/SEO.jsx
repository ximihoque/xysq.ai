import { Helmet } from 'react-helmet-async'

const BASE_URL = 'https://xysq.ai'
const DEFAULT_IMAGE = `${BASE_URL}/og-image.png`

export default function SEO({ title, description, path = '/', image = DEFAULT_IMAGE, schema, extraLinks = [] }) {
  const fullTitle = title ? `${title} — xysq.ai` : 'xysq.ai — Memory infrastructure for AI.'
  const canonical = `${BASE_URL}${path}`
  const schemas = Array.isArray(schema) ? schema : schema ? [schema] : []

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

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
