import SEO from '../components/SEO'
import Nav from '../components/Nav'
import Hero from '../components/Hero'
import EngineSection from '../components/EngineSection'
import Faq from '../components/Faq'
import Footer from '../components/Footer'
import PageTransition from '../components/PageTransition'
import NeuralBackground from '../components/NeuralBackground'
import GridSpot from '../components/GridSpot'

export default function HomePage() {
  return (
    <PageTransition>
      <SEO
        path="/"
        description="The context platform for reliable, human-like agents. Every fact keeps its source, old versions close instead of piling up, and you control who sees what."
        keywords={['context platform', 'reliable agents', 'human-like agents', 'AI agent memory', 'context engineering', 'AI agents', 'agent memory layer']}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: 'xysq',
          applicationCategory: 'DeveloperApplication',
          url: 'https://xysq.ai',
          description: 'The context platform for reliable, human-like agents. Every fact keeps the source it came from, the old version closes when something changes, and you decide who sees what. Never trained on.',
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
      <EngineSection />
      <Faq />
      <Footer />
    </PageTransition>
  )
}
