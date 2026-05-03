import { useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { MDXProvider } from '@mdx-js/react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
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

  const ogImage = post.cover ?? `https://xysq.ai/blog/og/${post.slug}.png`

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: { '@type': 'Person', name: post.author.name },
    image: ogImage,
    publisher: {
      '@type': 'Organization',
      name: 'xysq',
      url: 'https://xysq.ai',
    },
    mainEntityOfPage: `https://xysq.ai/blog/${post.slug}`,
  }

  const Body = post.Body

  return (
    <>
      <SEO
        title={post.title}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        image={ogImage}
        schema={schema}
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
