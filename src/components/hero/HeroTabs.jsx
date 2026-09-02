import { useState } from 'react'
import HeroStage from '../HeroStage'
import HeroChat from './HeroChat'
import { cx, growth } from './scenarios'
import { BRAND_PATHS } from '../brandPaths'
import '../../styles/hero-tabs.css'

const TABS = [
  { id: 'cx', label: 'CX' },
  { id: 'growth', label: 'Growth' },
  { id: 'byo', label: 'Bring your own agents' },
]

const STACK = [
  { name: 'Shopify', mark: 'shopify' },
  { name: 'Gmail', mark: 'gmail' },
  { name: 'WhatsApp', mark: 'whatsapp' },
  { name: 'Instagram', mark: 'instagram' },
]

export default function HeroTabs() {
  const [tab, setTab] = useState('cx')
  const agentTab = tab !== 'byo'

  return (
    <div className="ht">
      <div className="ht-bar">
        <div className="ht-tabs" role="tablist" aria-label="What runs on the layer">
          {TABS.map((t) => (
            <button key={t.id} type="button" role="tab" aria-selected={tab === t.id}
              className={`ht-tab ${tab === t.id ? 'is-on' : ''}`} onClick={() => setTab(t.id)}>
              {t.label}
            </button>
          ))}
        </div>

        {agentTab && (
          <p className="ht-stack">
            <span className="ht-stack-label">Out of the box on</span>
            {STACK.map((s) => (
              <span key={s.name} className="ht-stack-item" title={s.name}>
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d={BRAND_PATHS[s.mark]} fill="currentColor" /></svg>
                {s.name}
              </span>
            ))}
          </p>
        )}
      </div>

      {/* keyed so a tab switch remounts and starts that tab's own walkthrough */}
      {tab === 'cx' && <HeroChat key="cx" sc={cx} />}
      {tab === 'growth' && <HeroChat key="growth" sc={growth} />}
      {tab === 'byo' && <HeroStage key="byo" />}
    </div>
  )
}
