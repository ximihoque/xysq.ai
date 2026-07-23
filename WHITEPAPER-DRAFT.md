# The xysq Memory Engine: self-improving context engineering

A technical overview for teams evaluating memory infrastructure for production AI.

## The problem: memory that grows but doesn't get better

Most AI memory today accumulates. It doesn't improve.

The standard setup looks like this: you wire a memory store to your agents, sessions and documents flow in, embeddings get indexed, and retrieval pulls the top-k back out. When retrieval is wrong, you write a correction into the store and move on. The theory is that with enough corrections, quality trends upward.

We call this hope-based memory, where you dump feedback into a store and wait for retrieval to get better, after some uncertain volume of corrections. The problem isn't that it never works. The problem is that you can't see it work. Improvement is unobservable (no way to tell whether last month's corrections changed anything) and unattributable (no way to point at a specific correction and say what it fixed). Meanwhile the store decays underneath you: contradictions accumulate, duplicates pile up, and a fact you superseded in March sits next to its replacement with equal retrieval weight in July.

For a team shipping AI to production this is an uncomfortable place to be. Context quality is now a direct input to system quality, and the tooling for it behaves like a landfill with a search bar.

## What the engine is

The xysq Memory Engine is a self-improving context engineering engine. The mental model in one sentence: raw AI work goes in (session transcripts from your AI tools, uploaded files), gets distilled into a context graph, and that graph then improves in response to feedback you can watch land on the very next query.

We say "context engineering" deliberately. Deciding what an AI system sees is an engineering problem, and engineering problems need observability, attribution, and rollback. The engine is the machinery that supplies those. (The same graph, rendered for humans, is the knowledge graph you browse and share; the engine is what keeps it true.)

Three ideas carry the design:

1. **Two layers, one trust chain.** Immutable verbatim logs underneath; a distilled, block-structured context graph on top. The raw layer is the root of trust; the distilled layer must cite it.
2. **Targeted feedback, applied now.** A correction is a first-class structured event that restructures the graph and retunes retrieval in one gated run, not a hint tossed into a pile.
3. **The model proposes, code disposes.** A language model drafts every change; deterministic code verifies, gates, and applies it. No invariant in the system is enforced by a prompt.

The rest of this paper walks each one.

## Two layers, one trust chain

Every push into the engine (a session transcript, a file) lands first in the verbatim layer: an immutable log, stored byte-for-byte, never edited, indexed for retrieval within seconds. Nothing downstream can alter it, which is precisely what makes everything downstream checkable.

A background distill worker then merges new content into the second layer: the context graph. Graph pages are real prose a human can read, structured as addressable blocks (the unit of editing, merging, and fact binding), and they update within minutes of a push, with a hard cap on the delay rather than a best-effort promise. Cost scales with what's new: per-push model work is O(new content), never O(corpus). There is no global recompute as your graph grows.

Between the layers sits the fact ledger. Every fact is a row carrying recency (when it became valid, when it was superseded, by what) and lineage (verbatim quote spans pointing back into the raw log, a stated-vs-inferred claim type, and a dependency chain for inferred facts, so superseding a premise flags every conclusion built on it). A fact in a page is not a sentence the model happened to write; it is a rendered ledger row, frozen at commit, that can only change through a new ledger event.

Around all of it, deterministic gates. The engine runs six families of them, in code: assembled diffs must equal exactly the declared edits, so undeclared text physically cannot change; new facts must quote the raw log verbatim or they quarantine for review; fact renderings are frozen outside ledger events; the changelog is code-composed, so the model cannot write its own history; every fact edit maps one-to-one to a ledger event; and invariant validators catch contradictions, orphans, and malformed structure before anything lands. Every change is staged in a write-ahead log and applied in ordered durable steps; a crash mid-apply replays deterministically, without re-calling the model.

Each user's graph lives in its own isolated vault, version-controlled, so every byte change is a commit you can diff.

One honest boundary, stated precisely: the mechanical edit trail is 100%, guaranteed by code. Semantic judgment (did the model link this fact to the right entity?) is bounded and audited, not guaranteed. We promise perfect recording of edits, never perfect memory.

## The centerpiece: targeted feedback, visible improvement

Here is where the engine departs from the standard playbook. The standard playbook says: keep sending feedback and retrieval will get better, eventually, somehow. We think that's backwards. One comprehensive, targeted correction should beat a hundred vague ones, and its effect should be visible immediately.

Walk through what actually happens when you correct the engine. Say you tell it "we deprecated the v2 endpoint in March; everything routes through v3 now." That correction becomes a supersession event in the fact ledger. In the same gated run, code closes the old fact, enumerates every page in the graph that hosts it, and updates each one; the stale verbatim chunks in the log layer get tagged so retrieval downweights them. The next query serves the corrected state. If contradictory facts ever do surface together, the response flags the conflict (current fact, superseded candidate) instead of returning both raw.

Applied now. Visible on the next query. Attributable forever, because the ledger row records what changed, on what evidence, superseding what. You never wait for statistical accumulation, and you never wonder whether a correction took.

Feedback tunes two layers of the system:

- **The structural layer: how knowledge is organized.** Corrections drive restructuring: pages split when they grow past budget, duplicate entities merge, contradictions resolve (one active value per single-valued attribute, enforced by a validator, not a prompt), links rewire. The graph's shape is a moving target that feedback keeps honest.
- **The retrieval layer: what gets selected as context.** Superseded content is downweighted, contradiction-aware ranking prefers current truth, and the selection instructions themselves are versioned per-user overlays that feedback rewrites (and that you can revert, because they're versioned).

Three closed loops feed those two layers:

1. **Human feedback.** Corrections, review decisions, direct edits. Highest authority, and sticky: text a human authored cannot be modified by the engine without superseding evidence plus explicit review. Never a silent clobber.
2. **Self feedback.** The engine evaluates itself: quarantine outcomes, contradiction sweeps on touched entities, offline audits of merge quality against a stronger judge, and a nightly consistency check across graph, ledger, and index that repairs or alerts on drift.
3. **Usage signals.** Which retrieved items actually got used downstream feeds selection tuning, so retrieval learns from outcomes, not just content.

## It learns your domain, not a benchmark

Generic memory systems optimize for generic benchmarks. Your production system doesn't run on a benchmark; it runs on your vocabulary, your entities, your priorities.

The engine is built to absorb exactly that. Entities and their aliases are first-class records, so your internal names, project codenames, and acronyms resolve to the same node instead of fragmenting into near-duplicates (a new entity is a reviewable event, not a silent mint). The instruction overlays that steer distillation and selection are per-user and per-team, grown from your feedback and your usage. Priorities follow what your queries actually touch.

This is what "compounding" means concretely: by month three, retrieval in your domain behaves differently than it did on day one, and you can read the diff of exactly how, because every adaptation is a versioned, revertable text change. Not a fine-tune you can't inspect. Our favorite property of this design is that the improvement is legible.

## Governance: every change is a diff you can read

The question a serious evaluator asks about self-improving systems is not "how good is it?" but "what happens when it's wrong?" Our answer: nothing changes silently, and the blast radius of a mistake is a review item, not a corrupted store.

- **Provenance on every fact.** Verbatim quote, source, timestamp, lineage. Stated claims must ground in the raw log; inferred claims are labeled as such and require multiple citations.
- **A code-owned history.** Changelogs are composed by the server, byte-checked on every write. The model cannot edit its own trail.
- **A review queue for what deserves a human.** New entities, new pages, quarantined claims, a page shrinking suspiciously in one run, any conflict with human-authored text: these park for review rather than applying. If review items pile up past a ceiling, distillation pauses for that vault and the owner is notified. A bad model day becomes a visible queue, not silent corruption.
- **Recoverability as a requirement.** Every failure mode has a defined automated recovery path. Deletion is real too: removing a single item scrubs the ledger, the history, the vectors, and the archives, not just the visible page.

Human oversight concentrates where it matters. The gates handle the mechanical 100%; humans handle judgment calls, at a bounded, visible rate.

## Ownership

The engine's output is deliberately unexotic: plain markdown pages plus a ledger, in a vault that belongs to one user or team. That's a design stance. Context this valuable shouldn't live in a proprietary blob.

Today that means full isolation per vault and export at any time; nothing about your graph is locked in. The direction we're building toward, and rolling out: bring your own storage, with the graph mirrored to a drive you control and readable in standard markdown tools, and private deployment for teams that need the engine inside their own boundary. We're stating direction here, not shipped guarantees; the architecture was shaped around these from the start (per-vault isolation is why account deletion is a clean sweep, and why a mirror to your drive is a mirror rather than a migration).

## What we are not claiming

A short list, because this audience has read enough whitepapers:

- Not perfect memory. Perfect recording of edits, with semantic judgment bounded and audited.
- No benchmark numbers here. The engine ships with a measurement harness (real multi-session transcripts seeded with contradictions and aliasing, crash injection at every write-ahead step), and the numbers we publish will come from it.
- Not magic self-improvement. Three specific loops, tuning two specific layers, through gates that make every adjustment inspectable and revertable.

## The short version

Context for AI systems today accumulates and decays, and teams are asked to fix it with hope. The xysq Memory Engine replaces hope with a mechanism: verbatim logs under a distilled context graph, a fact ledger carrying recency and lineage, deterministic gates on every change, and feedback that lands now, where you can see it, structurally and in retrieval, in your domain's own terms.

Hope is not a memory strategy. Bring us a correction and watch what it changes.
