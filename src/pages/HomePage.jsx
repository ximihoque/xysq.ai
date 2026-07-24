import SEO from '../components/SEO'
import Nav from '../components/Nav'
import Hero from '../components/Hero'
import EngineSection from '../components/EngineSection'
import OutputsSection from '../components/OutputsSection'
import ThreeColumnCTA from '../components/ThreeColumnCTA'
import Footer from '../components/Footer'
import PageTransition from '../components/PageTransition'
import NeuralBackground from '../components/NeuralBackground'

export default function HomePage() {
  return (
    <PageTransition>
      <SEO
        path="/"
        description="The first self-improving context engineering platform. The xysq Memory Engine turns your files and AI sessions into knowledge graphs your team shares and owns."
        schema={{
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: 'xysq',
          applicationCategory: 'DeveloperApplication',
          url: 'https://xysq.ai',
          description: 'The first self-improving context engineering platform. A domain-adaptive Memory Engine that evolves knowledge into better context for AI, with shareable knowledge graphs for teams. Consent-first.',
          operatingSystem: 'Web',
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        }}
      />
      <NeuralBackground />
      <Nav />
      <Hero />
      <EngineSection />
      <OutputsSection />
      <ThreeColumnCTA />
      <Footer />
    </PageTransition>
  )
}
