# Homepage reposition: trust first, self-improving as the close

Date: 2026-08-10
Source of truth: `260809 xysq_pitch.pptx`
Baseline: `website/main` @ 949b216
Status: locked, ready to build

---

## The change in one line

The homepage leads with the mechanism ("the first self-improving context engineering
platform") and buries trust in a band at the bottom of section 3. The deck leads with
trust and only names provable and self-improving at the end. The site should follow the
deck. This is an ordering change plus a copy rewrite, not a rebuild.

Focus shifts to the trust layer of AI. That is what pulls platform AI devs, engineering
managers, and CXOs. "Context engineering platform" stays as the category for search,
and self-improving stays present, just no longer in the lead.

---

## Locked decisions

| Decision | Answer |
|---|---|
| Hero h1 | **"The trust layer your AI acts on."** |
| Hero sub | **"xysq is the context of record for your agents and your teams. One place they read from, with the source kept on every fact."** |
| Category noun | Keep "context engineering platform" in the title tag, meta description, and footer. The h1 carries trust, the sub carries "context of record". |
| Product noun | **Keep "xysq Memory Engine".** No rename anywhere. |
| Hero visual | Reuse `HeroInfographic`, relabel the cards. **No new hero component.** |
| Hero CTAs | **Keep both persona buttons** ("For AI builders" / "For teams"). |
| Page order | Hero (trust) → Trust → Context graphs → Engine (self-improving, the closer) → Pick a starting point |
| Where self-improving lives | The `Self-Improving Context Loop` panel in the hero graphic, and the engine section at the close. |
| "context lake" | **Unchanged.** Out of scope, and it is consistent with the use-case pages. |

### Rejected along the way, and why

- **A `FactReceipt` proof card in the hero** (a fact, its verbatim source, a failed
  check). Rejected: a refund-policy example is a use case, and a use case in the fold
  makes us read as a support tool instead of a platform. The trust story is carried by
  the existing infographic's cards instead.
- **Dropping "context lake" from the homepage.** Rejected as scope creep. It is live on
  five use-case pages; changing it here only would split the vocabulary.

### One superseded rule (do not "fix" this later)

`MESSAGING-STRUCTURE.md` locked "homepage = ONE funnel, not a persona fork" for a
consumer and dev audience. The audience is now platform AI devs, engineering managers,
and CXOs, and the founder's call is to keep both persona buttons in the hero. The known
cost was raised and accepted: a cold visitor self-classifies before they know what we
sell, and the free tier has no signal in the fold. Mitigation is the nav button becoming
"Get started free".

---

## The new order

| # | Section | Component | Change |
|---|---|---|---|
| 1 | Hero | `Hero.jsx` + `HeroInfographic.jsx` | rewrite copy, relabel graphic cards |
| 2 | Trust | NEW `TrustSection.jsx` | ~90% lifted from the `out-gov` block |
| 3 | Context graphs | `OutputsSection.jsx` | delete the gov band, rewrite one row |
| 4 | Engine | `EngineSection.jsx` | **moves from slot 2 to slot 4**, rewrite the rows |
| 5 | Pick a starting point | `ThreeColumnCTA.jsx` | rewrite three cards |
| 6 | Footer | `Footer.jsx` | rewrite tagline |

Trust is slots 1 and 2. Provable and self-improving are named at slot 4, next to
`CorrectionFigure`, the only figure on the page that proves them.

---

## 1. Hero (`src/components/Hero.jsx`)

**h1:** The trust layer your AI acts on.
("The" plain, "trust layer" in cyan, "your AI acts on." dimmed, so the weight lands on
the noun.)

**Subcopy:** xysq is the context of record for your agents and your teams. One place
they read from, with the source kept on every fact.

The first draft of the sub restated hero bullets 1 and 2 back at the reader in longer
words. It got cut in half. The Memory Engine name is still in the fold, on the
highlighted card of the infographic, so nothing was lost by dropping it here.

**Three supporting lines** (same flex list, same icons, reordered so trust leads):

| icon | now | becomes |
|---|---|---|
| `GitBranch` | Provenance | Every fact keeps its source |
| `ShieldCheck` | Enterprise Governance | You control who sees what |
| `Brain` | Self-Improving Memory | Improves with every correction |

Order in the list changes to GitBranch, ShieldCheck, Brain. Today it is Brain first.

**CTAs:** unchanged. "For AI builders" and "For teams".

**Visual:** `HeroShowcase` unchanged. `HeroInfographic` gets the relabel below.

### `HeroInfographic.jsx` card copy

One line per card, everything else demoted to icon chips. Two full sentences per card
wrapped to three lines and buried the trust claim.

```
  ┌─ Raw Data ────────────────────────────────────┐
  │ Everything keeps the file it came from.       │
  │ (PDFs) (Images) (AI sessions)                 │
  └───────────────────┬───────────────────────────┘
                      ↓
  ┌─ xysq Memory Engine ──────────────── ★ ───────┐   ← the trust layer
  │ The trust layer between your sources and      │
  │ your agents.                                  │
  │ (Checks the source) (Reconciles)              │
  │ (Self-improving)                              │
  └───────────────────┬───────────────────────────┘
                      ↓
  ┌─ Context Graph ───────────────────────────────┐   ← provable
  │ Every fact traces to the sentence it came     │
  │ from.                                         │
  │ (Grounded) (Current) (Linked)                 │
  └───────────────────┬───────────────────────────┘
                      ↓
  ┌─ Governance ──────────────────────────────────┐
  │ You decide who sees what.                     │
  │ (Auditable) (Revocable)                       │
  └───────────────────────────────────────────────┘

  ┌─ Self-Improving Context Loop ─────────────────┐   ← unchanged
  │  Human Feedback · Self Feedback · Usage       │
  └───────────────────────────────────────────────┘
```

The chips are `.hig-chip`: 1px hairline pill, mono 0.58rem, cyan 10px icon. On the
engine card they get their own background back, or they vanish into the cyan tint.

**Engine chips are verbs, graph chips are properties.** That split is what makes the
arrow between the two cards mean something: the engine checks, so the graph is grounded.
Two words got cut on the way here and should not come back:

- **"Gated"** on the engine card. It is an engine internal (the deterministic write
  gates), and sitting two cards above "Governance" a reader parses it as access control,
  which is Governance's job. Straight collision.
- **"Grounded"** on the engine card. Grounding is checked at write time in the engine
  but it is a property of what comes out, so it belongs on the graph. Saying it on both
  cards made the arrow between them meaningless.

Keep the aria-label in sync with the chips. It went stale once already.

Both badges drop to one line each. Retrieval Learning's "Improves every future
retrieval." becomes "Corrections land on the next query." (see the honesty audit).

The `role="img"` aria-label has to be rewritten to match, or a screen reader gets the
old positioning.

---

## 2. Trust (NEW `src/components/TrustSection.jsx`)

**h2:** Three questions your AI's context has to answer.

**Deck:** They come up the moment an agent stops answering questions and starts doing
things. Nobody asks them about a chatbot. Everybody asks them about an agent with write
access.

**Points:**

1. **Where did it get that?** Every stated fact keeps the sentence it came from, plus
   the file and the date. Before it is stored, the engine checks that the sentence
   really is in the source. If it is not, the text stays on the page as ordinary prose
   and never becomes a fact your agent can cite.
2. **Is it still true?** When a new fact contradicts an old one on the same thing, the
   old one is closed and stops being served. It is not deleted, so you can still see
   what changed and when.
3. **Who can see it, and who changed it?** Access is granted per graph, per page, per
   person, and you can take it back. When an agent proposes sharing something, it
   arrives as a proposal you approve.

**Closing line:** This is the same whether you work alone, with a team, or with agents.
An agent gets the access you gave it and nothing else.

**Visual:** the existing `out-gov` three-column item grid, lifted out of
`OutputsSection.jsx` with its CSS renamed to `trust-*`. No new tokens, no new layout.

**CTA:** quiet text link only, "How the engine does this", anchored to `#engine`. It
builds the arc toward the closer.

---

## 3. Context graphs (`src/components/OutputsSection.jsx`)

Headline, deck, and `LakeStrip` unchanged.

Two edits:

1. Delete the `out-gov` block (lines 234 to 253). It is now section 2. Drop the newly
   unused `Eye`, `Lock`, and `ShieldCheck` imports.
2. `builderRows[2]` currently repeats provenance ("Every answer can be checked").
   Provenance is now said twice above this point, so give the slot to the deck's
   fleet-contradiction idea instead:

   > **Agents write back what they learn.** An agent writes to its own graph, and the
   > next agent that needs it can read it, if you let it.

`teamRows` unchanged. All three are already outcome-shaped, and "your own drive is
rolling out" is correctly hedged.

---

## 4. Engine, the highlighted closer (`src/components/EngineSection.jsx`)

Moves from slot 2 to slot 4. Headline and `CorrectionFigure` unchanged.

**Deck:** Most memory stacks treat a correction as one more thing to store and hope
retrieval sorts it out later. The xysq Memory Engine applies it as an edit with a blast
radius. Tell it once that the v2 endpoint is dead, and the old fact closes, every page
that carried it is updated, the stale chunks get downweighted, and the next query
serves the corrected version.

**Rows** (this is where the three words get named, and the only place):

1. **Provable.** Every fact traces back to the source it came from. Nothing appears out
   of nowhere.
2. **Reconciled.** When two facts disagree on the same thing, the old one is closed.
   You do not end up serving both.
3. **Self-improving.** Every correction is one more thing the next answer gets right.
   Not a model that gets smarter on its own, a context store that gets more correct
   every time you tell it something.

**Styling:** one background rule in `engine-section.css` so the section reads as the
closing argument rather than a demoted leftover.

**CTA:** Read the whitepaper. Unchanged.

---

## 5. Pick your starting point (`src/components/ThreeColumnCTA.jsx`)

Headline and structure unchanged. Three cards rewritten.

1. **For teams:** "Your team's knowledge, and where all of it came from."
   Body: "Your files and AI sessions become context everyone can use, with the source
   kept on every fact. Free to start."
   CTA: Start free.
2. **For AI builders:** "Give your agents context they can cite."
   Body: "Agents read from the graphs you allow, write to their own, and every fact
   they are handed carries the source it came from."
   CTA: Read the docs.
3. **Governance and deployment** (replaces "Custom solution / Tuned to your domain"):
   "Approvals, your vocabulary, your boundary."
   Body: "Role-based access, an audit trail on what gets shared, and the engine fitted
   to your environment. We will walk you through it."
   CTA: Book a call.

Card 3 changing job is the safety valve. After a trust-first page, the person who books
a call has a risk question, and "tuned to your domain" does not answer it. It also puts
every ahead-of-reality claim behind a human conversation, which is the only place an
unqualified claim belongs.

---

## 6. Footer, meta, nav

- **Footer tagline** (`Footer.jsx:78`): "The trust layer for your AI context. Every fact
  keeps its source. Consent-first, never trained on."
- **Title tag** (`SEO.jsx:21`): `xysq.ai · Context engineering platform · AI memory you can check`
- **Meta description** (`HomePage.jsx:16` AND the JSON-LD at `:23`, the easy miss):
  "xysq is a context engineering platform for your agents and your teams. Every fact
  keeps the source it came from, old versions close instead of stacking next to them,
  and you control who sees what."
- **Nav** (`Nav.jsx:277, :297`): "Get started" becomes "Get started free". The word
  "free" currently appears exactly once on the whole homepage, in the last card of the
  last section, and the hero no longer carries a self-serve button.

**SEO hedge:** let the h1 and the title tag diverge on purpose. The h1 carries the trust
promise. The title tag keeps the category plus "AI memory", the noun people actually
search, because that string sits next to mem0's in the result list. Pull real Search
Console queries before shipping the title change rather than trusting the inference.

---

## What we are NOT saying (honesty audit)

Deck claims held back from the website, with reasons.

| Deck claim | Verdict | Why |
|---|---|---|
| "The trust layer for agents that act" as the h1 | Reworked, shipped | Shipped as "The trust layer your AI acts on." Keeps the deck's noun, drops "agents that act" which by the deck's own number addresses one reader in six and reads to a developer as an agent framework. |
| "Context of record" | **Shipped in the hero sub** (founder's call, overrides the original hold) | The original recommendation was to hold it: system-of-record claims invite "who uses it as theirs?" and we have no customer to name. Founder chose to ship it. Noted so nobody reverts it as an oversight. |
| "Retrieval remembers. xysq reconciles." | Hold as written | Its power is the parallel two-beat shape, which is the banned poetic form. The claim ships in plain words as the "Reconciled" row. |
| "Traces to the exact words it came from" | Soften | Gate 3 exempts inferred claims by design. Say "every **stated** fact" in section 2 where there is room to scope it. Never a universal promise in the hero, footer, or meta. |
| "Contradictions get resolved, not stored side by side" (unscoped) | Scope it | Supersession is real and write-time. There is no contradiction sweep. Ship the scoped version. |
| "An approval trail on every decision" | Do not say | The only approval that exists is on sharing. Nothing approves an agent's action. |
| "Calibrated abstention" | Do not say | "Calibrated" is a measurement word, and our one measurement logged over-confidence as a ranked gap. Our exact audience tries to break this in the first ten minutes. Leave it in /whitepaper. |
| S8 market stats (78%, 16%, $37B) | Keep off the site | Investor material about other companies' spending. Reads as filler to a developer. |
| Naming mem0 / Zep / Letta | Keep off the homepage | Teaches a competitor's name for free on a page with zero social proof. |
| "Trusted in production", named customers, SOC2 | Never | We have none of it, and every one gets asked about. |

### Live copy to fix in the same push

1. **"The first"** appears in the h1, the footer tagline, the SEO fallback title, the
   `HomePage.jsx` meta description, and the JSON-LD. Delete everywhere. It is a
   category-ownership superlative with zero customers, zero design partners, and one
   blind LoCoMo run at F1 0.196. Next to trust claims it does more damage than any other
   string on the site.
2. **"One correction improves every future retrieval"** (`EngineSection.jsx`, and
   "Improves every future retrieval." in `HeroInfographic.jsx`). Unbounded and false in
   the general case. Narrow it to what `CorrectionFigure` actually shows.
3. **`PricingPage.jsx:30, :46, :61`** sells "Up to 3 connectors" and "Unlimited
   connectors" under a heading that says "Simple, honest pricing", for a product with no
   connectors. Strip them.
4. **`WhitepaperPage.jsx:349`** claims "contradiction sweeps, merge audits, and a nightly
   consistency check across graph, ledger, and index" in present tense.
   `app_engine/sweeper.py` is a stuck-row rescue job, not any of those. Mark as rolling
   out or cut.

A trust-first homepage points a spotlight at all four.

---

## What the engine actually does today

Verified in code, so every claim above is safe to ship.

| Claim on the page | Backing |
|---|---|
| Every stated fact keeps the verbatim sentence it came from, and text that fails the check never becomes a citable fact | `app_engine/wiki/worker/grounding.py` (Gate 3: `quotes_grounded`, `ground_events`, `drop_uncontained_facts`) |
| A new fact closes the old one instead of stacking next to it, and you can still see what changed | `app_engine/wiki/store.py:99` `close_fact(fact_id, superseded_by, invalid_at_iso)` |
| Every page shows its sources and its verified blocks with quotes | `app_engine/graph.py` (`page_sources`, `verified_blocks` from `fact_ledger.quotes`) |
| An agent proposing a share arrives as a proposal you approve | `app_engine/mcp_app.py:259, :325` (`status="proposed"`) |

**No backend work is needed for this reposition.**

---

## Files touched

**One new component. One section moved. Copy in eight files. Roughly half a day plus a
mobile pass.**

- `src/pages/HomePage.jsx`: reorder to Hero, TrustSection, OutputsSection,
  EngineSection, ThreeColumnCTA. One import. Rewrite the meta description (16) and the
  JSON-LD description (23).
- NEW `src/components/TrustSection.jsx` + `src/styles/trust-section.css`: ~80 lines,
  ~50 of it JSX lifted verbatim from the `out-gov` block with its CSS renamed.
- `src/components/Hero.jsx`: h1 (26 to 32), sub, three list items reordered and
  relabelled. Buttons and `HeroShowcase` untouched.
- `src/components/HeroInfographic.jsx`: four card bodies, one badge line, the aria-label.
- `src/components/OutputsSection.jsx`: delete the `out-gov` block (234 to 253) and the
  now-unused `Eye` / `Lock` / `ShieldCheck` imports, rewrite `builderRows[2]`.
- `src/components/EngineSection.jsx`: deck plus three rows. Headline and
  `CorrectionFigure` untouched. One background rule in `engine-section.css`.
- `src/components/ThreeColumnCTA.jsx`: three card titles and bodies.
- `src/components/Footer.jsx`: tagline (78).
- `src/components/SEO.jsx`: fallback title (21).
- `src/components/Nav.jsx`: button label (277, 297).
- `src/pages/PricingPage.jsx`: connector lines (30, 46, 61).
- `src/pages/WhitepaperPage.jsx`: the nightly-consistency claim (349).

**Do first, ten minutes, separately:** add `?src=hero-builders`, `?src=hero-teams`,
`?src=nav`, `?src=cta1` to the app.xysq.ai links. Today they all collapse into one GA4
outbound bucket keyed on link_url, so a heavier trust-first fold could move signups and
run for a month invisible.

**Dead code, flag but do not touch in this commit:** `LogoMarquee.jsx` holds the eight
deleted connector logos and sits exactly where someone rebuilding a hero would reach for
it. Do not revive it.

---

## Verification

1. `npm run build` clean.
2. Homepage renders in both themes, desktop and mobile, sections in the new order.
3. Grep the whole `src/` tree for `The first` and for em dashes in changed files. Both
   should return nothing new.
4. Grep for `connector` in `src/pages/PricingPage.jsx`. Should return nothing.
5. Read the page top to bottom out loud. Trust in the first two screens, self-improving
   named at the close.
