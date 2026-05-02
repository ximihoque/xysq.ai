import Nav from '../components/Nav'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import BlogPostList from '../components/BlogPostList'
import { loadPosts } from '../lib/blog'
import '../styles/blog-index.css'

export default function BlogIndexPage() {
  const posts = loadPosts()

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'xysq blog',
    url: 'https://xysq.ai/blog',
    blogPost: posts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      datePublished: p.date,
      url: `https://xysq.ai/blog/${p.slug}`,
      author: { '@type': 'Person', name: p.author.name },
    })),
  }

  return (
    <>
      <SEO
        title="Blog"
        description="Notes from the team building xysq — a consent-first memory layer for AI agents."
        path="/blog"
        schema={schema}
      />
      <Nav />
      <main className="blog-index">
        <header className="blog-index__hero">
          <h1>Blog</h1>
          <p>Notes from the team building xysq.</p>
        </header>
        <BlogPostList posts={posts} />
      </main>
      <Footer />
    </>
  )
}
