import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Cursor from '../components/Cursor'
import Particles from '../components/Particles'
import Nav from '../components/Nav'
import HowItWorks from '../components/HowItWorks'
import ExperienceTiers from '../components/ExperienceTiers'
import Waitlist from '../components/Waitlist'
import Footer from '../components/Footer'
import '../styles/experience-tiers.css'

export default function ExperiencePage() {
  useEffect(() => {
    window.scrollTo(0, 0)
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

      <div className="exp-hero">
        <div className="exp-hero-grid" />
        <Link to="/" className="exp-back">Back to home</Link>
        <span className="stag">The Experience</span>
        <h1>Seen. Heard. Felt.<br /><em>Remembered.</em></h1>
        <p>
          From the moment you first interact to every interaction that follows. This is what it means
          to have an AI that genuinely knows you.
        </p>
      </div>

      <HowItWorks />
      <ExperienceTiers />
      <Waitlist />
      <Footer />
    </>
  )
}
