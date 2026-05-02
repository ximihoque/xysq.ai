import { Helmet } from 'react-helmet-async'

const BASE_URL = 'https://xysq.ai'
const DEFAULT_IMAGE = `${BASE_URL}/og-image.png`

export default function SEO({ title, description, path = '/', image = DEFAULT_IMAGE, schema, extraLinks = [] }) {
  const fullTitle = title ? `${title} — xysq.ai` : 'xysq.ai — One presence, across time.'
  const canonical = `${BASE_URL}${path}`

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

      {schema && (
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      )}
    </Helmet>
  )
}
