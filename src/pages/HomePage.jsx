import SEO from '../components/SEO'
import Nav from '../components/Nav'
import Hero from '../components/Hero'
import Capabilities from '../components/Capabilities'
import Teams from '../components/Teams'
import Organise from '../components/Organise'
import TrustPrivacy from '../components/TrustPrivacy'
import ThreeColumnCTA from '../components/ThreeColumnCTA'
import Footer from '../components/Footer'
import PageTransition from '../components/PageTransition'
import NeuralBackground from '../components/NeuralBackground'

export default function HomePage() {
  return (
    <PageTransition>
      <SEO
        path="/"
        description="xysq is a persistent memory layer for AI agents. One identity, one context, across Claude, Cursor, ChatGPT and more. Connect in minutes — no rebuild required."
        schema={{
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: 'xysq',
          applicationCategory: 'DeveloperApplication',
          url: 'https://xysq.ai',
          description: 'Persistent memory layer for AI agents. Capture, surface, and synthesize context across every tool.',
          operatingSystem: 'Web',
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        }}
      />
      <NeuralBackground />
      <Nav />
      <Hero />
      <Capabilities />
      <Teams />
      <Organise />
      <TrustPrivacy />
      <ThreeColumnCTA />
      <Footer />
    </PageTransition>
  )
}
