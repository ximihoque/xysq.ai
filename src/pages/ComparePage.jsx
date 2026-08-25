import { useParams, Navigate } from 'react-router-dom'
import { COMPARISONS } from '../data/comparisons'
import SEO from '../components/SEO'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import PageTransition from '../components/PageTransition'
import NeuralBackground from '../components/NeuralBackground'
import '../styles/footer.css' // reusing some general styling if needed, or inline

export default function ComparePage() {
  const { competitor } = useParams()
  const data = COMPARISONS[competitor?.toLowerCase()]

  if (!data) {
    return <Navigate to="/" replace />
  }

  return (
    <PageTransition>
      <SEO
        title={`${data.title} | xysq`}
        description={data.description}
        path={`/compare/${competitor}`}
      />
      <NeuralBackground />
      <Nav />
      
      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 text-white">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            {data.title}
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {data.description}
          </p>
        </div>

        <div className="space-y-12">
          {data.points.map((point, idx) => (
            <div key={idx} className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 overflow-hidden relative">
              <h3 className="text-2xl font-semibold mb-8 text-white">{idx + 1}. {point.title}</h3>
              
              <div className="grid md:grid-cols-2 gap-8 relative">
                {/* Vertical divider on md screens */}
                <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-800 transform -translate-x-1/2"></div>
                
                <div className="pr-0 md:pr-4">
                  <div className="flex items-center mb-4">
                    <img src="/logo.svg" alt="xysq" className="w-5 h-5 mr-2" />
                    <h4 className="text-lg font-medium text-white">xysq</h4>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    {point.xysq}
                  </p>
                </div>
                
                <div className="pl-0 md:pl-4 pt-8 md:pt-0 border-t border-gray-800 md:border-0">
                  <div className="flex items-center mb-4">
                    <div className="w-5 h-5 rounded-full bg-gray-700 mr-2 flex items-center justify-center text-xs font-bold text-gray-300">
                      {data.competitorName.charAt(0).toUpperCase()}
                    </div>
                    <h4 className="text-lg font-medium text-gray-400">{data.competitorName}</h4>
                  </div>
                  <p className="text-gray-400 leading-relaxed">
                    {point.competitor}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to upgrade your AI memory?</h2>
          <a
            href="https://app.xysq.ai/register"
            className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-full text-black bg-white hover:bg-gray-100 transition-colors"
          >
            Get Started Free
          </a>
        </div>
      </main>

      <Footer />
    </PageTransition>
  )
}
