import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Cursor from './components/Cursor'
import Particles from './components/Particles'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Problem from './components/Problem'
import Pillars from './components/Pillars'
import Platform from './components/Platform'
import ForYou from './components/ForYou'
import ForBusiness from './components/ForBusiness'
import Consent from './components/Consent'
import Waitlist from './components/Waitlist'
import Footer from './components/Footer'
import ExperiencePage from './pages/ExperiencePage'

function HomePage() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('in') }),
      { threshold: 0.1 }
    )
    document.querySelectorAll('.reveal').forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <Cursor />
      <Particles />
      <Nav />
      <Hero />
      <Marquee />
      <Problem />
      <Pillars />
      <Platform />
      <ForYou />
      <ForBusiness />
      <Consent />
      <Waitlist />
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/experience" element={<ExperiencePage />} />
    </Routes>
  )
}
