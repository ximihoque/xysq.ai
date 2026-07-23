import SEO, { breadcrumbSchema } from '../components/SEO'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import PageTransition from '../components/PageTransition'
import NeuralBackground from '../components/NeuralBackground'
import XysqLogo from '../components/XysqLogo'
import {
  FileText, ScrollText, Network, ShieldCheck, User, Bot, BarChart3,
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
      <figcaption className="wp-fig-caption">Every adjustment is a versioned, revertable text change. The improvement is legible.</figcaption>
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
            <span>xysq · 2026 · 10 min read</span>
          </div>
        </header>

        <section>
          <h2>The problem: memory that grows but doesn't get better</h2>
          <p>Most AI memory today accumulates. It doesn't improve.</p>
          <p>
            The standard setup looks like this: you wire a memory store to your
            agents, sessions and documents flow in, embeddings get indexed, and
            retrieval pulls the top-k back out. When retrieval is wrong, you
            write a correction into the store and move on. The theory is that
            with enough corrections, quality trends upward.
          </p>
          <p>
            We call this <strong>hope-based memory</strong>, where you dump
            feedback into a store and wait for retrieval to get better, after
            some uncertain volume of corrections. The problem isn't that it
            never works. The problem is that you can't see it work. Improvement
            is unobservable (no way to tell whether last month's corrections
            changed anything) and unattributable (no way to point at a specific
            correction and say what it fixed). Meanwhile the store decays
            underneath you: contradictions accumulate, duplicates pile up, and
            a fact you superseded in March sits next to its replacement with
            equal retrieval weight in July.
          </p>
          <p>
            For a team shipping AI to production this is an uncomfortable place
            to be. Context quality is now a direct input to system quality, and
            the tooling for it behaves like a landfill with a search bar.
          </p>
        </section>

        <section>
          <h2>What the engine is</h2>
          <p>
            The xysq Memory Engine is a self-improving context engineering
            engine. The mental model in one sentence: raw AI work goes in
            (session transcripts from your AI tools, uploaded files), gets
            distilled into a context graph, and that graph then improves in
            response to feedback you can watch land on the very next query.
          </p>
          <p>
            We say "context engineering" deliberately. Deciding what an AI
            system sees is an engineering problem, and engineering problems
            need observability, attribution, and rollback. The engine is the
            machinery that supplies those. (The same graph, rendered for
            humans, is the knowledge graph you browse and share; the engine is
            what keeps it true.)
          </p>
          <p>Three ideas carry the design:</p>
          <ol>
            <li>
              <strong>Two layers, one trust chain.</strong> Immutable verbatim
              logs underneath; a distilled, block-structured context graph on
              top. The raw layer is the root of trust; the distilled layer must
              cite it.
            </li>
            <li>
              <strong>Targeted feedback, applied now.</strong> A correction is
              a first-class structured event that restructures the graph and
              retunes retrieval in one gated run, not a hint tossed into a
              pile.
            </li>
            <li>
              <strong>The model proposes, code disposes.</strong> A language
              model drafts every change; deterministic code verifies, gates,
              and applies it. No invariant in the system is enforced by a
              prompt.
            </li>
          </ol>
          <p>The rest of this paper walks each one.</p>
        </section>

        <section>
          <h2>Two layers, one trust chain</h2>
          <FigLayers />
          <p>
            Every push into the engine (a session transcript, a file) lands
            first in the verbatim layer: an immutable log, stored
            byte-for-byte, never edited, indexed for retrieval within seconds.
            Nothing downstream can alter it, which is precisely what makes
            everything downstream checkable.
          </p>
          <p>
            A background distill worker then merges new content into the second
            layer: the context graph. Graph pages are real prose a human can
            read, structured as addressable blocks (the unit of editing,
            merging, and fact binding), and they update within minutes of a
            push, with a hard cap on the delay rather than a best-effort
            promise. Cost scales with what's new: per-push model work is O(new
            content), never O(corpus). There is no global recompute as your
            graph grows.
          </p>
          <p>
            Between the layers sits the fact ledger. Every fact is a row
            carrying recency (when it became valid, when it was superseded, by
            what) and lineage (verbatim quote spans pointing back into the raw
            log, a stated-vs-inferred claim type, and a dependency chain for
            inferred facts, so superseding a premise flags every conclusion
            built on it). A fact in a page is not a sentence the model happened
            to write; it is a rendered ledger row, frozen at commit, that can
            only change through a new ledger event.
          </p>
          <p>
            Around all of it, deterministic gates. The engine runs six families
            of them, in code: assembled diffs must equal exactly the declared
            edits, so undeclared text physically cannot change; new facts must
            quote the raw log verbatim or they quarantine for review; fact
            renderings are frozen outside ledger events; the changelog is
            code-composed, so the model cannot write its own history; every
            fact edit maps one-to-one to a ledger event; and invariant
            validators catch contradictions, orphans, and malformed structure
            before anything lands. Every change is staged in a write-ahead log
            and applied in ordered durable steps; a crash mid-apply replays
            deterministically, without re-calling the model.
          </p>
          <p>
            Each user's graph lives in its own isolated vault,
            version-controlled, so every byte change is a commit you can diff.
          </p>
          <p>
            One honest boundary, stated precisely: the mechanical edit trail is
            100%, guaranteed by code. Semantic judgment (did the model link
            this fact to the right entity?) is bounded and audited, not
            guaranteed. We promise perfect recording of edits, never perfect
            memory.
          </p>
        </section>

        <section>
          <h2>The centerpiece: targeted feedback, visible improvement</h2>
          <p>
            Here is where the engine departs from the standard playbook. The
            standard playbook says: keep sending feedback and retrieval will
            get better, eventually, somehow. We think that's backwards. One
            comprehensive, targeted correction should beat a hundred vague
            ones, and its effect should be visible immediately.
          </p>
          <FigCorrection />
          <p>
            Walk through what actually happens when you correct the engine.
            Say you tell it "we deprecated the v2 endpoint in March; everything
            routes through v3 now." That correction becomes a supersession
            event in the fact ledger. In the same gated run, code closes the
            old fact, enumerates every page in the graph that hosts it, and
            updates each one; the stale verbatim chunks in the log layer get
            tagged so retrieval downweights them. The next query serves the
            corrected state. If contradictory facts ever do surface together,
            the response flags the conflict (current fact, superseded
            candidate) instead of returning both raw.
          </p>
          <p>
            Applied now. Visible on the next query. Attributable forever,
            because the ledger row records what changed, on what evidence,
            superseding what. You never wait for statistical accumulation, and
            you never wonder whether a correction took.
          </p>
          <p>Feedback tunes two layers of the system:</p>
          <ul>
            <li>
              <strong>The structural layer: how knowledge is organized.</strong>{' '}
              Corrections drive restructuring: pages split when they grow past
              budget, duplicate entities merge, contradictions resolve (one
              active value per single-valued attribute, enforced by a
              validator, not a prompt), links rewire. The graph's shape is a
              moving target that feedback keeps honest.
            </li>
            <li>
              <strong>The retrieval layer: what gets selected as context.</strong>{' '}
              Superseded content is downweighted, contradiction-aware ranking
              prefers current truth, and the selection instructions themselves
              are versioned per-user overlays that feedback rewrites (and that
              you can revert, because they're versioned).
            </li>
          </ul>
          <FigLoops />
          <p>Three closed loops feed those two layers:</p>
          <ol>
            <li>
              <strong>Human feedback.</strong> Corrections, review decisions,
              direct edits. Highest authority, and sticky: text a human
              authored cannot be modified by the engine without superseding
              evidence plus explicit review. Never a silent clobber.
            </li>
            <li>
              <strong>Self feedback.</strong> The engine evaluates itself:
              quarantine outcomes, contradiction sweeps on touched entities,
              offline audits of merge quality against a stronger judge, and a
              nightly consistency check across graph, ledger, and index that
              repairs or alerts on drift.
            </li>
            <li>
              <strong>Usage signals.</strong> Which retrieved items actually
              got used downstream feeds selection tuning, so retrieval learns
              from outcomes, not just content.
            </li>
          </ol>
        </section>

        <section>
          <h2>It learns your domain, not a benchmark</h2>
          <p>
            Generic memory systems optimize for generic benchmarks. Your
            production system doesn't run on a benchmark; it runs on your
            vocabulary, your entities, your priorities.
          </p>
          <p>
            The engine is built to absorb exactly that. Entities and their
            aliases are first-class records, so your internal names, project
            codenames, and acronyms resolve to the same node instead of
            fragmenting into near-duplicates (a new entity is a reviewable
            event, not a silent mint). The instruction overlays that steer
            distillation and selection are per-user and per-team, grown from
            your feedback and your usage. Priorities follow what your queries
            actually touch.
          </p>
          <p>
            This is what "compounding" means concretely: by month three,
            retrieval in your domain behaves differently than it did on day
            one, and you can read the diff of exactly how, because every
            adaptation is a versioned, revertable text change. Not a fine-tune
            you can't inspect. Our favorite property of this design is that
            the improvement is legible.
          </p>
        </section>

        <section>
          <h2>Governance: every change is a diff you can read</h2>
          <p>
            The question a serious evaluator asks about self-improving systems
            is not "how good is it?" but "what happens when it's wrong?" Our
            answer: nothing changes silently, and the blast radius of a mistake
            is a review item, not a corrupted store.
          </p>
          <ul>
            <li>
              <strong>Provenance on every fact.</strong> Verbatim quote,
              source, timestamp, lineage. Stated claims must ground in the raw
              log; inferred claims are labeled as such and require multiple
              citations.
            </li>
            <li>
              <strong>A code-owned history.</strong> Changelogs are composed by
              the server, byte-checked on every write. The model cannot edit
              its own trail.
            </li>
            <li>
              <strong>A review queue for what deserves a human.</strong> New
              entities, new pages, quarantined claims, a page shrinking
              suspiciously in one run, any conflict with human-authored text:
              these park for review rather than applying. If review items pile
              up past a ceiling, distillation pauses for that vault and the
              owner is notified. A bad model day becomes a visible queue, not
              silent corruption.
            </li>
            <li>
              <strong>Recoverability as a requirement.</strong> Every failure
              mode has a defined automated recovery path. Deletion is real too:
              removing a single item scrubs the ledger, the history, the
              vectors, and the archives, not just the visible page.
            </li>
          </ul>
          <p>
            Human oversight concentrates where it matters. The gates handle the
            mechanical 100%; humans handle judgment calls, at a bounded,
            visible rate.
          </p>
        </section>

        <section>
          <h2>Ownership</h2>
          <p>
            The engine's output is deliberately unexotic: plain markdown pages
            plus a ledger, in a vault that belongs to one user or team. That's
            a design stance. Context this valuable shouldn't live in a
            proprietary blob.
          </p>
          <p>
            Today that means full isolation per vault and export at any time;
            nothing about your graph is locked in. The direction we're building
            toward, and rolling out: bring your own storage, with the graph
            mirrored to a drive you control and readable in standard markdown
            tools, and private deployment for teams that need the engine inside
            their own boundary. We're stating direction here, not shipped
            guarantees; the architecture was shaped around these from the start
            (per-vault isolation is why account deletion is a clean sweep, and
            why a mirror to your drive is a mirror rather than a migration).
          </p>
        </section>

        <section>
          <h2>What we are not claiming</h2>
          <p>A short list, because this audience has read enough whitepapers:</p>
          <ul>
            <li>
              Not perfect memory. Perfect recording of edits, with semantic
              judgment bounded and audited.
            </li>
            <li>
              No benchmark numbers here. The engine ships with a measurement
              harness (real multi-session transcripts seeded with
              contradictions and aliasing, crash injection at every write-ahead
              step), and the numbers we publish will come from it.
            </li>
            <li>
              Not magic self-improvement. Three specific loops, tuning two
              specific layers, through gates that make every adjustment
              inspectable and revertable.
            </li>
          </ul>
        </section>

        <section>
          <h2>The short version</h2>
          <p>
            Context for AI systems today accumulates and decays, and teams are
            asked to fix it with hope. The xysq Memory Engine replaces hope
            with a mechanism: verbatim logs under a distilled context graph, a
            fact ledger carrying recency and lineage, deterministic gates on
            every change, and feedback that lands now, where you can see it,
            structurally and in retrieval, in your domain's own terms.
          </p>
          <p>
            Hope is not a memory strategy. Bring us a correction and watch
            what it changes.
          </p>
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
