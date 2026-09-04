import { useState } from 'react'
import { Upload, Shield, Users, BookmarkPlus, History, Wrench, MessageSquare, Lock, Repeat, Brain, Network, ShieldCheck } from 'lucide-react'
import HeroChat from './HeroChat'
import Scenario from './Scenario'
import { cx, growth } from './scenarios'
import { BRAND_PATHS } from '../brandPaths'
import '../../styles/hero-tabs.css'

const TABS = [
  { id: 'growth', label: 'Growth' },
  { id: 'cx', label: 'CX' },
  { id: 'byo', label: 'Bring your own agent' },
  { id: 'brain', label: 'Company Brain' },
]

const STACK = [
  { name: 'Shopify', mark: 'shopify' },
  { name: 'Gmail', mark: 'gmail' },
  { name: 'WhatsApp', mark: 'whatsapp' },
  { name: 'Instagram', mark: 'instagram' },
]

// Three doors into the same layer, kept apart on purpose: builders wiring
// memory into a workflow, teams sharing governed knowledge, and one person
// carrying their own memory between assistants.
const BYO = [
  {
    id: 'flows',
    title: 'Agentic workflows',
    blurb: 'Long-term memory for the workflows you already run. Each run picks up where the last one left off, and every fact it carries names its source.',
  },
  {
    id: 'teams',
    title: 'Teams',
    blurb: 'Governed, shared knowledge for the whole team. One set of facts everyone reads from, with who sees what decided by you.',
  },
  {
    id: 'personal',
    title: 'Personal assistants',
    blurb: 'One memory that follows you across every assistant you use. Tell it once, it stays told.',
  },
]

const FRAMEWORKS = [
  { name: 'n8n', mark: 'n8n' },
  { name: 'CrewAI', mark: 'crewai' },
  { name: 'LangChain', mark: 'langchain' },
  { name: 'LangGraph', mark: 'langgraph' },
  { name: 'ADK', mark: 'adk' },
]

const TEAM_TOOLS = [
  { name: 'Claude', mark: 'claude' },
  { name: 'ChatGPT', mark: 'openai' },
  { name: 'Hermes', img: '/marks/hermes.png' },
  { name: 'OpenClaw', mark: 'openclaw' },
]

const PERSONAL_TOOLS = [
  { name: 'Claude', mark: 'claude' },
  { name: 'ChatGPT', mark: 'openai' },
  { name: 'Gemini', mark: 'gemini' },
  { name: 'Hermes', img: '/marks/hermes.png' },
]

const COMPANY_STACK = [
  { name: 'Slack', mark: 'slack' },
  { name: 'Jira', mark: 'jira' },
  { name: 'Google Workspace', mark: 'google' },
  { name: 'Confluence', mark: 'confluence' },
  { name: 'Notion', mark: 'notion' },
  { name: 'GitHub', mark: 'github' },
]

const FLOW_LOOP = [
  { icon: BookmarkPlus, label: 'Remember', text: 'Each run writes what it learned, with the document it learned it from.' },
  { icon: History, label: 'Recall', text: 'The next run reads it before acting, instead of starting from zero.' },
  { icon: Wrench, label: 'Correct', text: 'Fix a fact once and every run after gets it right.' },
]

const TEAM_LOOP = [
  { icon: Upload, label: 'Share', text: 'Save a decision from whichever tool you are in. It lands in the team’s context with your name on it.' },
  { icon: Shield, label: 'Govern', text: 'You decide who reads what. Every person and every agent sees only what it is allowed to.' },
  { icon: Users, label: 'Agree', text: 'Everyone reasons over the same facts with the same source, so the team stops contradicting itself.' },
]

const PERSONAL_LOOP = [
  { icon: MessageSquare, label: 'Say it once', text: 'A preference, a decision, a fact about your life, saved from whichever assistant you were talking to.' },
  { icon: Lock, label: 'It stays yours', text: 'Your memory, in your vault, readable by you. Not locked inside one app.' },
  { icon: Repeat, label: 'Every assistant knows', text: 'Switch tools and nothing is lost. Same facts, same source, nothing re-explained.' },
]

// the company brain: what the layer does on its own once it has your documents
const BRAIN = [
  { icon: Brain, label: 'Learns your domain', text: 'It reads how your company actually talks: the products, the people, the policies, and the words you use for them. Nobody writes a schema.' },
  { icon: Network, label: 'Builds the ontology itself', text: 'Entities and how they relate, discovered from your documents and kept current as they change.' },
  { icon: ShieldCheck, label: 'Writes the guardrails', text: 'Policies your agents must follow, generated from your own rules and applied to every answer.' },
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
      {steps.map(({ icon: Icon, label, text }) => (
        <li key={label} className="byo-step">
          <span className="byo-step-ico"><Icon size={15} strokeWidth={1.8} /></span>
          <span className="byo-step-body">
            <b>{label}</b>
            <span>{text}</span>
          </span>
        </li>
      ))}
    </ol>
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

function TeamsPane() {
  return (
    <div className="hs-frame byo">
      <p className="hs-eyebrow">Works with</p>
      <Tiles items={TEAM_TOOLS} />
      <Loop steps={TEAM_LOOP} />
    </div>
  )
}

function PersonalPane() {
  return (
    <div className="hs-frame byo">
      <p className="hs-eyebrow">Works with</p>
      <Tiles items={PERSONAL_TOOLS} />
      <Loop steps={PERSONAL_LOOP} />
    </div>
  )
}

function BrainPane() {
  return (
    <div className="hs-frame byo brain">
      <p className="brain-lede">
        Your company’s context, as infrastructure. Give it your documents and
        it does the rest: it learns how your business is put together, and it
        hands every agent you run the same, governed picture of it.
      </p>
      <ul className="brain-cards">
        {BRAIN.map(({ icon: Icon, label, text }) => (
          <li key={label} className="brain-card">
            <span className="brain-card-ico"><Icon size={16} strokeWidth={1.8} /></span>
            <b>{label}</b>
            <span>{text}</span>
          </li>
        ))}
      </ul>
      <p className="hs-eyebrow">Plugs into your existing stack</p>
      <Tiles items={COMPANY_STACK} />
    </div>
  )
}

const PANES = [FlowsPane, TeamsPane, PersonalPane]

export default function HeroTabs() {
  const [tab, setTab] = useState('growth')
  const [byo, setByo] = useState(0)
  const agentTab = tab === 'cx' || tab === 'growth'
  const Pane = PANES[byo]

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

      {tab === 'growth' && <HeroChat key="growth" sc={growth} />}
      {tab === 'cx' && <HeroChat key="cx" sc={cx} />}
      {tab === 'byo' && (
        <div className="hs hs--split" key="byo">
          <Scenario items={BYO} active={byo} onPick={setByo} />
          <div className="hs-main"><Pane /></div>
        </div>
      )}
      {tab === 'brain' && (
        <div className="hs" key="brain"><BrainPane /></div>
      )}
    </div>
  )
}
