# xysq website — frozen messaging structure (v1)

Working doc for cross-provider brainstorm (ChatGPT, Grok, Claude). This is the
**frozen** structure to react to. Decisions marked LOCKED are settled; OPEN
items are where we still want opinions. If you're a model reading this: push
back hard where you disagree, but respect the LOCKED product-truth constraints
at the bottom (they're not preferences, they're what the code actually does).

Date: 2026-07-22

---

## The one-line answer

**xysq is a Context Engineering Platform.**

Category = "context engineering." Under that category sit two products:

1. **Memory Engine** — the self-improving core. For people building AI systems.
2. **Knowledge Graph** — capture, share, own. The try-it, self-serve product.

Both run on the same underlying engine. That's the whole pitch: one engine,
two entry points.

Mental model (LOCKED):

```
xysq
  → Context Engineering Platform          (the category)
      → Memory Engine    (for AI builders)
      → Knowledge Graph  (for teams capturing/sharing AI-generated knowledge)
          → deployment / storage / audit
```

NOT "Memory → Knowledge → Storage → Deploy." Context engineering is the
category; Memory and Knowledge are the products.

---

## The two goals in tension (name them so we design for both)

1. **Category clarity.** The buyer must understand in 5 seconds: this is a
   context engineering platform, and it's serious infrastructure. Sell the
   engine big.
2. **PLG.** The primary conversion motion is self-serve: get the visitor to
   click "Get started free" and build their own knowledge graph. That's how we
   grow. No sales gate at the top of the funnel.

The design challenge: state the platform/engine ambition loudly AND keep one
clean try-it front door. These can fight. Where they do, we resolve toward
**one homepage funnel** (not a persona fork), with the engine as depth + an
enterprise CTA.

---

## LOCKED decisions

- **Category = Context Engineering Platform.** Stated in the hero eyebrow and
  repeated across surfaces.
- **Homepage = ONE funnel, not a persona fork.** We do NOT split the homepage
  into "Build Better AI" vs "Build Better Knowledge" at the top (that forces
  the visitor to self-classify before acting, which fights PLG). Everyone gets
  the same homepage; the try-it product (Knowledge Graph) is the front door;
  the Memory Engine is depth one layer down + an enterprise CTA.
- **Go big on the Memory Engine.** Sell the self-improving engine
  (domain-adaptive, human-in-the-loop, fully auditable, compounding) in
  present tense and with confidence, even though parts are ahead of what ships
  today. Founder's explicit call. This is the "we are a platform" proof.
- **No work-app connectors anywhere.** We removed Slack / Jira / Linear / Gmail
  / Google Calendar / GitHub / Notion sync. Do NOT imply we read from or write
  to those apps. (See product-truth constraints.)
- **Real inputs** = AI-tool sessions via MCP (Claude, Cursor, ChatGPT, Gemini,
  Claude Code) + files you upload + Chrome/web capture + manual retain.
- **"Share" is a first-class section.** Share a slice of your knowledge graph
  with anyone (one person) or your team. Granular, consent-gated, revocable,
  and it feeds the recipient's AI tools too (not just humans).
- **"Own / data localisation" is a first-class section.** Bring your own drive,
  open it in Obsidian for a graph view, export anytime. "Your knowledge graph,
  your control." Marked as rolling out (see constraint below).
- **Hero visual = the "build → share → own" infographic** (founder-generated),
  right column; hero copy moves left. The existing animated knowledge-graph
  (MemoryDiagram) relocates down to the "how it works / engine" section.
- **Free tier caps** = 1,000 recalls / month + 10k memories / month.
- **Voice = Karpathy, no em-dashes** (see root CLAUDE.md). No hype words.

---

## Frozen homepage structure

**Hero (one, for everyone)**
- Eyebrow: `The context engineering platform`
- h1: leads with the try-able product (see OPEN: hero h1 options below)
- sub: one memory across Claude, Cursor, ChatGPT · bring your own drive ·
  private from day 0
- CTAs: **Get started free** (primary, PLG) · See how it works
- small "You own your data" chip
- Right column: the build → share → own infographic

**1. The core engine** (go big — this is the "we are a platform" section)
- Headline: the self-improving context engineering engine.
- Converge diagram: `AI sessions + files → context engine → knowledge graph →
  context back to every AI tool`.
- Four capabilities: domain-adaptive (learns from corrections) ·
  human-in-the-loop · fully auditable (provenance) · compounding (knowledge
  improves, not just accumulates).
- The animated knowledge-graph visual lands here.
- Episodic / procedural / semantic can live here or in Capture.

**2. Capture**
- From your AI-tool sessions (Claude / Cursor / ChatGPT / Gemini) + files +
  Chrome capture + manual retain. No connectors.

**3. Share**
- Share a slice of your knowledge graph with anyone, or your team.
- Points: you pick exactly what crosses · one person or the whole team · it
  feeds their agents too · revoke anytime.

**4. Own (data localisation)**
- Your memory lives in your drive. Your knowledge graph, your control.
- Points: bring your own drive · open it in Obsidian (graph view) · export
  anytime, no lock-in.
- Small "rolling out" marker (BYO-drive is v2).

**5. Trust / privacy**
- Private from day 0, your storage, never trained on, encrypted,
  consent-gated, yours to inspect/export/delete.

**6. Get started**
- Personas as CTAs (a fork is fine HERE, at the bottom): For you (self-serve) ·
  For builders (docs / SDK / the engine) · For teams (book a call).

**Footer** — tagline updated to the new positioning.

---

## Frozen nav

```
Platform ▾
  ├── Memory Engine
  ├── Knowledge Graph
  ├── Enterprise
Pricing
Docs
```

---

## Platform sub-pages (built for depth, so the homepage doesn't have to fork)

- **/platform/memory-engine** — the technical, production-AI page. ICP: VP Eng,
  Head of AI, Product Lead, Senior Staff. Answers "can I trust this in
  production?" Go big: domain-adaptive, HITL, fully auditable, compounding.
  WAL / git / ledger details live LOW on this page, not in the headline.
- **/platform/knowledge-graph** — capture / organize / share / own. The
  team-knowledge story. Self-serve.

---

## Use-cases reframe (LOCKED direction)

Market to the builder, not the department. Sell infrastructure to engineering
leaders who happen to build for marketing/support/sales.

- ❌ "Marketing AI" → ✅ "Build AI that understands your marketing playbooks."
- ❌ "Customer Support" → ✅ "Build support agents that improve from resolved
  conversations."
- ❌ "Sales" → ✅ "Build sales copilots that learn your team's best practices."

---

## OPEN questions (want cross-provider opinions)

1. **Hero h1 direction.** Three candidates (all keep the eyebrow "The context
   engineering platform"):
   - **Product-led (PLG):** "Turn your AI work into a knowledge graph you own
     and share."
   - **Category-led:** "The self-improving context engineering platform."
   - **Blend:** "Build a knowledge graph that makes every AI tool sharper."

2. **Section 4 (Own) vs Section 5 (Trust) overlap.** Both carry "your data is
   yours / BYO drive / private." Merge into one loud data-ownership section, or
   split by angle (4 = ownership/portability, 5 = privacy/security)?

3. **How prominent is the Memory Engine on the homepage?** We locked "go big"
   and "one funnel." Open question: is the engine section #1 (right after
   hero), or does the try-it Knowledge Graph story come first and the engine
   land mid-page? Trade-off: engine-first = strongest platform clarity;
   product-first = strongest PLG pull.

4. **Does "context engineering platform" land with a cold buyer,** or does it
   need a plainer gloss right beside it (e.g. "the memory layer that makes your
   AI tools sharper")? Category creation vs category clarity.

---

## Product-truth constraints (NOT preferences — what the code does today)

Any provider proposing copy MUST respect these or the site lies to users.

- **No work-app connectors.** Slack / Jira / Linear / Gmail / Calendar / GitHub
  / Notion sync is GONE. Never imply we read/write those apps.
- **BYO drive is v2, not shipped.** Today: blobs are stored on our box
  (`backend/app_engine/blobs.py` = local disk in v0, "in v2 this becomes the
  user's Google Drive"); the upload UI is local-file-only. So "your data lives
  in your own Google Drive / Dropbox / OneDrive" and the Obsidian-on-your-drive
  story describe a **roadmap**, not today. Ship them as marked vision
  ("rolling out"), present-tense-directional, never as "you can do this now."
- **The self-improving engine is largely vision.** The daily lint worker, fact
  ledger, provenance, HITL loop are partly built / partly roadmap. Founder's
  call is to sell it big anyway. Fine for marketing ambition; just know it's
  ahead of provable-in-prod reality, so avoid hard "trusted in production
  today" guarantees or named-customer proof we can't back.
- **What IS solidly true today:** shared memory across AI tools via MCP; upload
  files; a living knowledge graph (episodic/procedural/semantic); team vaults
  with role-based access that survive turnover; sharing a slice with a person
  or team; consent-first; never trained on; inspect / export / delete.

---

## For providers reviewing this

Tell us: what's the sharpest single homepage this structure can become? Where
does "context engineering platform" help vs confuse? What would make an
engineering leader try it free today (PLG) without a sales call? Be pushy.
Respect the product-truth constraints.
