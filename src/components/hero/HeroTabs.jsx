import { useState } from 'react'
import HeroStage from '../HeroStage'
import HeroChat from './HeroChat'
import Scenario from './Scenario'
import { cx, growth } from './scenarios'
import { BRAND_PATHS } from '../brandPaths'
import '../../styles/hero-tabs.css'

const TABS = [
  { id: 'cx', label: 'CX' },
  { id: 'growth', label: 'Growth' },
  { id: 'custom', label: 'Custom' },
]

const STACK = [
  { name: 'Shopify', mark: 'shopify' },
  { name: 'Gmail', mark: 'gmail' },
  { name: 'WhatsApp', mark: 'whatsapp' },
  { name: 'Instagram', mark: 'instagram' },
]

const CUSTOM = [
  {
    id: 'byo',
    title: 'Bring your own agent',
    blurb: 'Keep the agent you already run. It asks xysq before it answers, and every reply comes back naming the document it came from.',
  },
  {
    id: 'core',
    title: 'Use the core context layer',
    blurb: 'The workspace itself: documents in, one page out, every line traceable, every change with a name on it.',
  },
]

const AGENTS = [
  { name: 'Claude', mark: 'claude' },
  { name: 'ChatGPT' },
  { name: 'Hermes' },
  { name: 'OpenClaw' },
  { name: 'ADK' },
  { name: 'CrewAI', mark: 'crewai' },
  { name: 'n8n', mark: 'n8n' },
]

const Mark = ({ id }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d={BRAND_PATHS[id]} fill="currentColor" /></svg>
)

function BringYourOwn() {
  return (
    <div className="hs-frame byo">
      <p className="hs-eyebrow">Works with</p>
      <ul className="byo-grid">
        {AGENTS.map((a) => (
          <li key={a.name} className="byo-tile">
            <span className="byo-mark">{a.mark ? <Mark id={a.mark} /> : <b>{a.name[0]}</b>}</span>
            {a.name}
          </li>
        ))}
      </ul>

      <div className="byo-flow" aria-label="Your agent asks xysq, xysq answers with sources">
        <span className="byo-node">Your agent</span>
        <span className="byo-arrow"><i>asks</i></span>
        <span className="byo-node is-us">xysq context layer</span>
        <span className="byo-arrow"><i>answers, with sources</i></span>
        <span className="byo-node">Your customer</span>
      </div>

      <pre className="byo-code"><code>{`ctx = xysq.vaults.pull("acme", "what is our refund window?")
for item in ctx:
    print(item.content, "<-", item.source)   # every line names its document`}</code></pre>
    </div>
  )
}

export default function HeroTabs() {
  const [tab, setTab] = useState('cx')
  const [custom, setCustom] = useState(0)
  const agentTab = tab !== 'custom'

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
              <span key={s.name} className="ht-stack-item" title={s.name}><Mark id={s.mark} />{s.name}</span>
            ))}
          </p>
        )}
      </div>

      {/* keyed so a tab switch remounts and starts that tab's own walkthrough */}
      {tab === 'cx' && <HeroChat key="cx" sc={cx} />}
      {tab === 'growth' && <HeroChat key="growth" sc={growth} />}
      {tab === 'custom' && (
        <div className="hs hs--split" key="custom">
          <Scenario items={CUSTOM} active={custom} onPick={setCustom} />
          <div className="hs-main">
            {custom === 0 ? <BringYourOwn /> : <HeroStage key="core" />}
          </div>
        </div>
      )}
    </div>
  )
}
