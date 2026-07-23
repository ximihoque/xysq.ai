import SEO, { breadcrumbSchema } from '../components/SEO'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import PageTransition from '../components/PageTransition'
import NeuralBackground from '../components/NeuralBackground'
import XysqLogo from '../components/XysqLogo'
import {
  FileText, ScrollText, Network, User, Bot, BarChart3,
  ArrowDown, Check, X,
} from 'lucide-react'
import '../styles/whitepaper.css'

/* ── Figure 1: two layers, one trust chain ── */
function FigLayers() {
  return (
    <figure className="wp-fig" role="img" aria-label="The engine's stack: an immutable verbatim log at the bottom, the fact ledger with recency and lineage in the middle, the distilled context graph on top; six families of deterministic gates wrap every change">
      <div className="wp-fig-stack">
        <div className="wp-fig-layer">
          <span className="wp-fig-layer-icon"><Network size={15} strokeWidth={1.7} /></span>
          <span className="wp-fig-layer-text">
            <span className="wp-fig-layer-title">Context graph</span>
            <span className="wp-fig-layer-sub">distilled, block-structured pages a human can read</span>
          </span>
        </div>
        <span className="wp-fig-join">cites · renders from</span>
        <div className="wp-fig-layer">
          <span className="wp-fig-layer-icon"><ScrollText size={15} strokeWidth={1.7} /></span>
          <span className="wp-fig-layer-text">
            <span className="wp-fig-layer-title">Fact ledger</span>
            <span className="wp-fig-layer-sub">recency + lineage on every fact, dependency chains</span>
          </span>
        </div>
        <span className="wp-fig-join">quotes, byte-for-byte</span>
        <div className="wp-fig-layer">
          <span className="wp-fig-layer-icon"><FileText size={15} strokeWidth={1.7} /></span>
          <span className="wp-fig-layer-text">
            <span className="wp-fig-layer-title">Verbatim logs</span>
            <span className="wp-fig-layer-sub">immutable, never edited, the root of trust</span>
          </span>
        </div>
      </div>
      <div className="wp-fig-gates">
        <span className="wp-fig-gates-label">six gate families, enforced in code</span>
        <div className="wp-fig-gates-chips">
          <span>diff = declared edits</span>
          <span>quote or quarantine</span>
          <span>frozen renderings</span>
          <span>code-owned changelog</span>
          <span>1:1 ledger events</span>
          <span>invariant validators</span>
        </div>
      </div>
      <figcaption className="wp-fig-caption">Two layers, one trust chain. The model proposes; code disposes.</figcaption>
    </figure>
  )
}

/* ── Figure 2: one correction, walked end to end ── */
function FigCorrection() {
  return (
    <figure className="wp-fig" role="img" aria-label="A correction walked end to end: the correction becomes a supersession event, one gated run closes the old fact, updates every hosting page and downweights stale chunks, and the next query serves the corrected state">
      <div className="wp-fig-quote">
        <span className="wp-fig-quote-mark">"</span>
        We deprecated the v2 endpoint in March; everything routes through v3 now.
        <span className="wp-fig-tag">targeted correction</span>
      </div>
      <span className="wp-fig-arrow"><ArrowDown size={13} strokeWidth={2} /> one gated run</span>
      <div className="wp-fig-steps">
        <span>old fact closed<br /><em>supersession event</em></span>
        <span>every hosting page updated<br /><em>enumerated, not sampled</em></span>
        <span>stale chunks downweighted<br /><em>retrieval retuned</em></span>
      </div>
      <span className="wp-fig-arrow"><ArrowDown size={13} strokeWidth={2} /> next query</span>
      <div className="wp-fig-ba">
        <span className="wp-fig-ba-row wp-fig-ba-row--before">
          <X size={13} strokeWidth={2.2} />
          "Route traffic through the v2 endpoint."
        </span>
        <span className="wp-fig-ba-row wp-fig-ba-row--after">
          <Check size={13} strokeWidth={2.2} />
          "v2 was deprecated in March. Route through v3."
        </span>
      </div>
      <figcaption className="wp-fig-caption">Applied now. Visible on the next query. Attributable forever.</figcaption>
    </figure>
  )
}

/* ── Figure 3: three loops, two layers ── */
function FigLoops() {
  return (
    <figure className="wp-fig" role="img" aria-label="Three closed feedback loops, human feedback, self feedback and usage signals, tune two layers: the structural layer that organizes knowledge and the retrieval layer that selects context">
      <div className="wp-fig-loops">
        <span className="wp-fig-loop"><User size={13} strokeWidth={1.8} /> Human feedback</span>
        <span className="wp-fig-loop"><Bot size={13} strokeWidth={1.8} /> Self feedback</span>
        <span className="wp-fig-loop"><BarChart3 size={13} strokeWidth={1.8} /> Usage signals</span>
      </div>
      <span className="wp-fig-arrow"><ArrowDown size={13} strokeWidth={2} /></span>
      <div className="wp-fig-layers2">
        <div className="wp-fig-layer">
          <span className="wp-fig-layer-text">
            <span className="wp-fig-layer-title">Structural layer</span>
            <span className="wp-fig-layer-sub">how knowledge is organized: splits, merges, contradiction resolution, links</span>
          </span>
        </div>
        <div className="wp-fig-layer">
          <span className="wp-fig-layer-text">
            <span className="wp-fig-layer-title">Retrieval layer</span>
            <span className="wp-fig-layer-sub">what gets selected: downweighting, contradiction-aware ranking, versioned overlays</span>
          </span>
        </div>
      </div>
      <figcaption className="wp-fig-caption">Every adjustment is a versioned text change you can read and revert.</figcaption>
    </figure>
  )
}

export default function WhitepaperPage() {
  return (
    <PageTransition>
      <SEO
        title="Whitepaper"
        path="/whitepaper"
        description="The xysq Memory Engine: self-improving context engineering. Verbatim logs under a distilled context graph, a fact ledger with lineage, deterministic gates, and targeted feedback you can watch land on the very next query."
        schema={[
          breadcrumbSchema([
            { name: 'Home', item: '/' },
            { name: 'Whitepaper', item: '/whitepaper' },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'TechArticle',
            headline: 'The xysq Memory Engine: self-improving context engineering',
            url: 'https://xysq.ai/whitepaper',
            author: { '@type': 'Organization', name: 'xysq' },
          },
        ]}
      />
      <NeuralBackground />
      <Nav />

      <article className="wp">
        <header className="wp-header">
          <span className="wp-kicker">Whitepaper</span>
          <h1 className="wp-title">
            The xysq Memory Engine:<br />self-improving context engineering.
          </h1>
          <p className="wp-standfirst">
            A technical overview for teams evaluating memory infrastructure
            for production AI.
          </p>
          <div className="wp-meta">
            <XysqLogo size={14} />
            <span>xysq · 2026 · 7 min read</span>
          </div>
        </header>

        <section>
          <h2>The problem: memory that grows but doesn't get better</h2>
          <p>Most AI memory today accumulates. It doesn't improve.</p>
          <p>
            The standard setup: wire a memory store to your agents, index
            everything, retrieve top-k. When retrieval is wrong, you add a
            correction and hope quality goes up over time.
          </p>
          <p>
            We call this <strong>hope-based memory</strong>. The problem is you
            can't see it work. You can't tell if last month's corrections
            changed anything, and you can't point at a correction and say what
            it fixed. Meanwhile the store decays: contradictions and duplicates
            pile up, and a superseded fact keeps the same retrieval weight as
            its replacement.
          </p>
          <p>
            If you ship AI to production, context quality is part of system
            quality. It needs real engineering, not hope.
          </p>
        </section>

        <section>
          <h2>What the engine is</h2>
          <p>
            The xysq Memory Engine is a self-improving context engineering
            engine. Raw AI work goes in: session transcripts from your AI
            tools, uploaded files. It gets distilled into a context graph. The
            graph improves in response to feedback, and you can see the change
            on the next query.
          </p>
          <p>
            Deciding what an AI system sees is an engineering problem, and
            engineering problems need observability, attribution, and
            rollback. The engine supplies those. (The same graph, rendered for
            humans, is the knowledge graph you browse and share.)
          </p>
          <p>Three ideas carry the design:</p>
          <ol>
            <li>
              <strong>Two layers, one trust chain.</strong> Immutable verbatim
              logs at the bottom. A distilled context graph on top. The graph
              must cite the logs.
            </li>
            <li>
              <strong>Targeted feedback, applied now.</strong> A correction is
              a structured event. It restructures the graph and retunes
              retrieval in one run.
            </li>
            <li>
              <strong>The model proposes, code disposes.</strong> A model
              drafts every change. Deterministic code verifies and applies it.
              No invariant is enforced by a prompt.
            </li>
          </ol>
        </section>

        <section>
          <h2>Two layers, one trust chain</h2>
          <FigLayers />
          <p>
            Every push (a session transcript, a file) lands first in the
            verbatim layer: an immutable log, stored byte-for-byte, indexed
            within seconds. Nothing downstream can edit it. That's what makes
            everything downstream checkable.
          </p>
          <p>
            A background worker merges new content into the context graph:
            readable pages made of addressable blocks, updated within minutes
            of a push. Work per push scales with the new content, not with the
            size of your corpus. There is no global recompute.
          </p>
          <p>
            Between the layers sits the fact ledger. Every fact carries
            recency (when it became valid, when it was superseded, by what)
            and lineage (verbatim quotes from the log, stated vs inferred, and
            a dependency chain, so superseding a premise flags the conclusions
            built on it). A fact in a page is a rendered ledger row. It only
            changes through a new ledger event.
          </p>
          <p>Six families of deterministic gates run in code:</p>
          <ul>
            <li>Assembled diffs must equal the declared edits.</li>
            <li>New facts must quote the log verbatim, or they quarantine for review.</li>
            <li>Fact renderings are frozen outside ledger events.</li>
            <li>The changelog is composed by the server, not the model.</li>
            <li>Every fact edit maps to exactly one ledger event.</li>
            <li>Validators catch contradictions, orphans, and malformed structure.</li>
          </ul>
          <p>
            Every change goes through a write-ahead log. A crash mid-apply
            replays deterministically, without re-calling the model.
          </p>
          <p>
            Each graph lives in its own version-controlled vault. Every change
            is a commit you can diff.
          </p>
          <p>
            One boundary, stated plainly: the edit trail is guaranteed by
            code. Semantic judgment (did the model link a fact to the right
            entity?) is audited, not guaranteed. Perfect recording of edits,
            not perfect memory.
          </p>
        </section>

        <section>
          <h2>Targeted feedback, visible improvement</h2>
          <p>
            The standard playbook says: keep sending feedback and retrieval
            gets better, eventually. We think one targeted correction should
            beat a hundred vague ones, and its effect should be visible
            immediately.
          </p>
          <FigCorrection />
          <p>
            Here's what happens when you correct the engine. You say: "we
            deprecated the v2 endpoint in March; everything routes through v3
            now." The correction becomes a supersession event in the ledger.
            In the same run, code closes the old fact, updates every page that
            hosts it, and tags the stale chunks so retrieval downweights them.
            The next query serves the corrected state. If contradictory facts
            surface together, the response flags the conflict instead of
            returning both.
          </p>
          <p>
            Applied now. Visible on the next query. Attributable forever: the
            ledger records what changed, on what evidence, superseding what.
          </p>
          <p>Feedback tunes two layers:</p>
          <ul>
            <li>
              <strong>Structural: how knowledge is organized.</strong> Pages
              split, duplicates merge, contradictions resolve, links rewire.
            </li>
            <li>
              <strong>Retrieval: what gets selected.</strong> Superseded
              content is downweighted, ranking prefers current truth, and
              selection instructions are versioned overlays you can revert.
            </li>
          </ul>
          <FigLoops />
          <p>Three loops feed those layers:</p>
          <ol>
            <li>
              <strong>Human feedback.</strong> Corrections, reviews, edits.
              Highest authority. Text a human wrote is never changed without
              superseding evidence plus review.
            </li>
            <li>
              <strong>Self feedback.</strong> Quarantine outcomes,
              contradiction sweeps, merge audits, and a nightly consistency
              check across graph, ledger, and index.
            </li>
            <li>
              <strong>Usage signals.</strong> What actually got used
              downstream tunes what gets selected next.
            </li>
          </ol>
        </section>

        <section>
          <h2>It learns your domain, not a benchmark</h2>
          <p>
            Generic memory optimizes for generic benchmarks. Your system runs
            on your vocabulary, your entities, your priorities.
          </p>
          <p>
            Entities and aliases are first-class records, so internal names
            and acronyms resolve to one node instead of fragmenting. A new
            entity is a reviewable event, not a silent mint. The instructions
            that steer distillation and selection are per-user and per-team,
            grown from your feedback and usage.
          </p>
          <p>
            Compounding, concretely: by month three, retrieval in your domain
            behaves differently than it did on day one, and you can read the
            diff of how. Every adaptation is a versioned text change, not a
            fine-tune you can't inspect.
          </p>
        </section>

        <section>
          <h2>Governance: every change is a diff you can read</h2>
          <p>
            The right question for a self-improving system isn't "how good is
            it?" but "what happens when it's wrong?" Answer: nothing changes
            silently, and a mistake becomes a review item, not a corrupted
            store.
          </p>
          <ul>
            <li>
              <strong>Provenance on every fact.</strong> Quote, source,
              timestamp, lineage. Inferred claims are labeled and need
              multiple citations.
            </li>
            <li>
              <strong>Code-owned history.</strong> Changelogs are composed by
              the server and byte-checked. The model can't edit its own trail.
            </li>
            <li>
              <strong>A review queue.</strong> New entities, new pages,
              quarantined claims, a page shrinking suspiciously, conflicts
              with human text. If the queue passes a ceiling, distillation
              pauses and the owner is notified.
            </li>
            <li>
              <strong>Recoverability.</strong> Every failure mode has a
              defined recovery path. Deleting an item scrubs the ledger,
              history, vectors, and archives.
            </li>
          </ul>
          <p>
            Gates handle the mechanical part. Humans handle judgment calls, at
            a bounded, visible rate.
          </p>
        </section>

        <section>
          <h2>Ownership</h2>
          <p>
            The engine's output is plain markdown pages plus a ledger, in a
            vault owned by one user or team. Context this valuable shouldn't
            live in a proprietary blob.
          </p>
          <p>
            Today: full isolation per vault, export anytime. The direction
            we're building, rolling out now: bring your own storage (the graph
            mirrored to a drive you control, readable in standard markdown
            tools) and private deployment inside your own boundary. This is
            stated direction, not a shipped guarantee.
          </p>
        </section>

        <section>
          <h2>What we are not claiming</h2>
          <ul>
            <li>
              Not perfect memory. Perfect recording of edits; semantic
              judgment is audited and bounded.
            </li>
            <li>
              No benchmark numbers here. The engine ships with a measurement
              harness, and the numbers we publish will come from it.
            </li>
            <li>
              Not magic. Three loops, two layers, and gates that make every
              adjustment inspectable and revertable.
            </li>
          </ul>
        </section>

        <section>
          <h2>The short version</h2>
          <p>
            Context today accumulates and decays. The engine replaces hope
            with a mechanism: verbatim logs under a context graph, a ledger
            with recency and lineage, gates on every change, and feedback that
            lands now, where you can see it.
          </p>
          <p>Bring a correction and watch what it changes.</p>
        </section>

        <div className="wp-cta">
          <a href="https://app.xysq.ai" className="wp-cta-main">
            Get started free <span>→</span>
          </a>
          <a href="https://calendly.com/hoque-ximi/30min" className="wp-cta-alt" target="_blank" rel="noopener noreferrer">
            Talk to us
          </a>
        </div>
      </article>

      <Footer />
    </PageTransition>
  )
}
