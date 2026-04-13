import Nav from '../components/Nav'
import Hero from '../components/Hero'
import WhatItIs from '../components/WhatItIs'
import HowItWorks from '../components/HowItWorks'
import ThreeLayers from '../components/ThreeLayers'
import PatternRecognition from '../components/PatternRecognition'
import WorksEverywhere from '../components/WorksEverywhere'
import CtaStrip from '../components/CtaStrip'
import Footer from '../components/Footer'
import PageTransition from '../components/PageTransition'
import NeuralBackground from '../components/NeuralBackground'

export default function HomePage() {
  return (
    <PageTransition>
      <NeuralBackground />
      <Nav />
      <Hero />
      <WhatItIs />
      <HowItWorks />
      <ThreeLayers />
      <PatternRecognition />
      <WorksEverywhere />
      <CtaStrip />
      <Footer />
    </PageTransition>
  )
}
