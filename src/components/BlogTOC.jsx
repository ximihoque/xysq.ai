import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/blog-toc.css'

export default function BlogTOC({ articleRef }) {
  const [headings, setHeadings] = useState([])
  const [activeId, setActiveId] = useState(null)
  const observerRef = useRef(null)

  useEffect(() => {
    if (!articleRef.current) return
    const found = Array.from(articleRef.current.querySelectorAll('h2[id], h3[id]')).map((el) => ({
      id: el.id,
      text: el.textContent.replace(/#$/, '').trim(),
      level: Number(el.tagName.slice(1)),
    }))
    setHeadings(found)
  }, [articleRef])

  useEffect(() => {
    if (!articleRef.current || headings.length === 0) return
    observerRef.current?.disconnect()
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length > 0) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: 0 }
    )
    headings.forEach((h) => {
      const el = document.getElementById(h.id)
      if (el) observerRef.current.observe(el)
    })
    return () => observerRef.current?.disconnect()
  }, [headings, articleRef])

  return (
    <aside className="blog-toc" aria-label="Post navigation">
      <Link to="/blog" className="blog-toc__back">
        <span aria-hidden="true">←</span> Back to Blog
      </Link>
      {headings.length > 0 && (
        <div className="blog-toc__nav" role="navigation" aria-label="Table of contents">
          <div className="blog-toc__label">Table of Contents</div>
          <ul>
            {headings.map((h) => (
              <li
                key={h.id}
                className={`blog-toc__item blog-toc__item--h${h.level} ${activeId === h.id ? 'is-active' : ''}`}
              >
                <a href={`#${h.id}`}>{h.text}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  )
}
