import SEO from '../components/SEO'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Waitlist from '../components/Waitlist'
import PageTransition from '../components/PageTransition'
import NeuralBackground from '../components/NeuralBackground'

export default function ContactPage() {
  return (
    <PageTransition>
      <SEO
        title="Talk to us"
        path="/contact"
        description="Tell us about your project or how you want to use xysq. We'll get back to you shortly."
      />
      <NeuralBackground />
      <Nav />
      <main className="contact-main">
        <Waitlist />
      </main>
      <Footer />
    </PageTransition>
  )
}
