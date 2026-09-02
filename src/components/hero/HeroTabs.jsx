import { useState } from 'react'
import { Upload, Search, Sparkles, BookmarkPlus, History, Wrench } from 'lucide-react'
import HeroChat from './HeroChat'
import Scenario from './Scenario'
import { cx, growth } from './scenarios'
import { BRAND_PATHS } from '../brandPaths'
import '../../styles/hero-tabs.css'

const TABS = [
  { id: 'cx', label: 'CX' },
  { id: 'growth', label: 'Growth' },
  { id: 'byo', label: 'Bring your own agent' },
]

const STACK = [
  { name: 'Shopify', mark: 'shopify' },
  { name: 'Gmail', mark: 'gmail' },
  { name: 'WhatsApp', mark: 'whatsapp' },
  { name: 'Instagram', mark: 'instagram' },
]

// Two audiences, kept apart on purpose: people using AI tools together, and
// builders wiring memory into a workflow. Same layer, different door.
const BYO = [
  {
    id: 'teams',
    title: 'Teams',
    blurb: 'One shared context for the whole team. Save a decision from Claude, ask about it from ChatGPT, get the same answer with the same source.',
  },
  {
    id: 'flows',
    title: 'Agentic workflows',
    blurb: 'Long-term memory for the workflows you already run. Each run picks up where the last one left off, and every fact it carries names its source.',
  },
]

const TOOLS = [
  { name: 'Claude', mark: 'claude' },
  { name: 'ChatGPT', mark: 'openai' },
  { name: 'Hermes', img: '/marks/hermes.png' },
  { name: 'OpenClaw', mark: 'openclaw' },
]

const FRAMEWORKS = [
  { name: 'n8n', mark: 'n8n' },
  { name: 'CrewAI', mark: 'crewai' },
  { name: 'LangChain', mark: 'langchain' },
  { name: 'LangGraph', mark: 'langgraph' },
  { name: 'ADK', mark: 'adk' },
]

const TEAM_LOOP = [
  { icon: Upload, label: 'Push', text: 'Save a decision from whichever tool you are in. It lands in the team’s shared context.' },
  { icon: Search, label: 'Retrieve', text: 'Ask from any other tool. Same answer, same source, nothing re-explained.' },
  { icon: Sparkles, label: 'Reason', text: 'Every tool reasons over the same facts, so the team stops contradicting itself.' },
]

const FLOW_LOOP = [
  { icon: BookmarkPlus, label: 'Remember', text: 'Each run writes what it learned, with the document it learned it from.' },
  { icon: History, label: 'Recall', text: 'The next run reads it before acting, instead of starting from zero.' },
  { icon: Wrench, label: 'Correct', text: 'Fix a fact once and every run after gets it right.' },
]

const Mark = ({ id, img }) =>
  img ? (
    // a raster mark, recoloured through a mask so it takes currentColor like the svgs
    <span className="mark-img" style={{ maskImage: `url(${img})`, WebkitMaskImage: `url(${img})` }} aria-hidden="true" />
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d={BRAND_PATHS[id]} fill="currentColor" /></svg>
  )

function Tiles({ items }) {
  return (
    <ul className="byo-grid" style={{ '--n': items.length }}>
      {items.map((a) => (
        <li key={a.name} className="byo-tile">
          <span className="byo-mark"><Mark id={a.mark} img={a.img} /></span>
          {a.name}
        </li>
      ))}
    </ul>
  )
}

function Loop({ steps }) {
  return (
    <ol className="byo-loop">
      {steps.map(({ icon: Icon, label, text }, i) => (
        <li key={label} className="byo-step">
          <span className="byo-step-ico"><Icon size={15} strokeWidth={1.8} /></span>
          <span className="byo-step-body">
            <b>{label}</b>
            <span>{text}</span>
          </span>
          {i < steps.length - 1 && <span className="byo-step-arrow" aria-hidden="true" />}
        </li>
      ))}
    </ol>
  )
}

function TeamsPane() {
  return (
    <div className="hs-frame byo">
      <p className="hs-eyebrow">Works with</p>
      <Tiles items={TOOLS} />
      <Loop steps={TEAM_LOOP} />
    </div>
  )
}

function FlowsPane() {
  return (
    <div className="hs-frame byo">
      <p className="hs-eyebrow">Works with</p>
      <Tiles items={FRAMEWORKS} />
      <Loop steps={FLOW_LOOP} />
      <pre className="byo-code"><code>{`ctx = xysq.vaults.pull("acme", "what did the last run decide about refunds?")
for item in ctx:
    print(item.content, "<-", item.source)   # every line names its document`}</code></pre>
    </div>
  )
}

export default function HeroTabs() {
  const [tab, setTab] = useState('cx')
  const [byo, setByo] = useState(0)
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
              <span key={s.name} className="ht-stack-item" title={s.name}><Mark id={s.mark} />{s.name}</span>
            ))}
          </p>
        )}
      </div>

      {tab === 'cx' && <HeroChat key="cx" sc={cx} />}
      {tab === 'growth' && <HeroChat key="growth" sc={growth} />}
      {tab === 'byo' && (
        <div className="hs hs--split" key="byo">
          <Scenario items={BYO} active={byo} onPick={setByo} />
          <div className="hs-main">
            {byo === 0 ? <TeamsPane /> : <FlowsPane />}
          </div>
        </div>
      )}
    </div>
  )
}
