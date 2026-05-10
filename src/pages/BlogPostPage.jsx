import { useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { MDXProvider } from '@mdx-js/react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import SEO, { breadcrumbSchema } from '../components/SEO'
import BlogPostHeader from '../components/BlogPostHeader'
import BlogAuthorCard from '../components/BlogAuthorCard'
import BlogTOC from '../components/BlogTOC'
import { getPostBySlug } from '../lib/blog'
import { mdxComponents } from '../lib/mdxComponents'
import '../styles/blog-post.css'
import '../styles/blog-mdx.css'

export default function BlogPostPage() {
  const { slug } = useParams()
  const articleRef = useRef(null)
  const post = getPostBySlug(slug)

  if (!post) {
    return (
      <>
        <SEO title="Post not found" description="This post doesn't exist." path={`/blog/${slug}`} />
        <Nav />
        <main className="blog-post blog-post--missing">
          <h1>Post not found</h1>
          <p>We couldn't find a post at <code>/blog/{slug}</code>.</p>
          <Link to="/blog">← Back to blog</Link>
        </main>
        <Footer />
      </>
    )
  }

  const ogImage = post.cover
    ? (post.cover.startsWith('http') ? post.cover : `https://xysq.ai${post.cover}`)
    : `https://xysq.ai/blog/og/${post.slug}.png`
  const modifiedDate = post.updated ?? post.date

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: modifiedDate,
    author: { '@type': 'Person', name: post.author.name },
    image: ogImage,
    publisher: {
      '@type': 'Organization',
      name: 'xysq',
      url: 'https://xysq.ai',
      logo: { '@type': 'ImageObject', url: 'https://xysq.ai/logo.svg' },
    },
    mainEntityOfPage: `https://xysq.ai/blog/${post.slug}`,
    articleSection: post.category,
    keywords: post.tags?.join(', '),
    inLanguage: 'en-US',
    wordCount: post.readingTime?.minutes ? post.readingTime.minutes * 200 : undefined,
  }

  const Body = post.Body

  return (
    <>
      <SEO
        title={post.title}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        image={ogImage}
        imageWidth={1600}
        imageHeight={900}
        schema={[schema, breadcrumbSchema([
          { name: 'Home', item: '/' },
          { name: 'Blog', item: '/blog' },
          { name: post.title, item: `/blog/${post.slug}` },
        ])]}
        ogType="article"
        author={post.author.name}
        keywords={post.tags}
        article={{
          publishedTime: post.date,
          modifiedTime: modifiedDate,
          author: post.author.name,
          section: post.category,
          tags: post.tags,
        }}
        extraLinks={[{ rel: 'alternate', type: 'application/rss+xml', title: 'xysq blog', href: '/blog/rss.xml' }]}
      />
      <Nav />
      <main className="blog-post blog-post--with-toc">
        <BlogTOC articleRef={articleRef} />
        <article className="blog-post__article" ref={articleRef}>
          <BlogPostHeader post={post} />
          <div className="blog-post__body">
            <MDXProvider components={mdxComponents}>
              <Body />
            </MDXProvider>
          </div>
          <BlogAuthorCard author={post.author} />
        </article>
      </main>
      <Footer />
    </>
  )
}
