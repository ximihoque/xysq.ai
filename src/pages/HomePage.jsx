import SEO from '../components/SEO'
import Nav from '../components/Nav'
import Hero from '../components/Hero'
import TrustSection from '../components/TrustSection'
import EngineSection from '../components/EngineSection'
import OutputsSection from '../components/OutputsSection'
import ThreeColumnCTA from '../components/ThreeColumnCTA'
import Footer from '../components/Footer'
import PageTransition from '../components/PageTransition'
import NeuralBackground from '../components/NeuralBackground'
import GridSpot from '../components/GridSpot'

export default function HomePage() {
  return (
    <PageTransition>
      <SEO
        path="/"
        description="xysq is a context engineering platform for your agents and your teams. Every fact keeps the source it came from, old versions close instead of stacking next to them, and you control who sees what."
        schema={{
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: 'xysq',
          applicationCategory: 'DeveloperApplication',
          url: 'https://xysq.ai',
          description: 'xysq is a context engineering platform for your agents and your teams. The xysq Memory Engine keeps the source behind every fact, closes the old version when something changes, and leaves you the say on who sees what. Consent-first, never trained on.',
          operatingSystem: 'Web',
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        }}
      />
      <NeuralBackground />
      <GridSpot />
      <Nav />
      {/* trust first, then what you get, then the engine as the closing
          argument. the engine used to open the page; it lands last now so
          "provable / reconciled / self-improving" arrive after the reader
          has a reason to care. */}
      <Hero />
      <TrustSection />
      <OutputsSection />
      <EngineSection />
      <ThreeColumnCTA />
      <Footer />
    </PageTransition>
  )
}
