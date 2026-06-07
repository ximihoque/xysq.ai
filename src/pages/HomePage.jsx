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
        description="xysq is collaborative memory for AI-native teams and enterprises. Capture context from the tools your team already uses, build a living knowledge graph, and give every AI tool and agent the right context when it needs it."
        schema={{
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: 'xysq',
          applicationCategory: 'DeveloperApplication',
          url: 'https://xysq.ai',
          description: 'Collaborative memory for AI-native teams. A living knowledge graph (episodic, procedural, semantic) shared across every AI tool and agent, consent-first.',
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
