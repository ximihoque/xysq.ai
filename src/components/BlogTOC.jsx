import { useEffect, useRef, useState } from 'react'
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

  if (headings.length === 0) return null

  return (
    <nav className="blog-toc" aria-label="Table of contents">
      <div className="blog-toc__label">Contents</div>
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
    </nav>
  )
}
