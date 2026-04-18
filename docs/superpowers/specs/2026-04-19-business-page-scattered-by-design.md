# Business Page — "Scattered by Design" Section

**Date:** 2026-04-19
**Scope:** `website/src/pages/ForBusinessPage.jsx` + styles
**Status:** Approved, ready for plan

## Problem

The business page currently covers four vertical pains (AI Builders, Marketing, Support, HR) and the "stateless agents" critique (RAG / fine-tuning / session history). It misses an orthogonal problem that business audiences relate to strongly:

**Their knowledge is scattered across a sprawling set of SaaS tools, no agent can see across them, and employees pay a daily context-switching tax to reconstruct it.**

This is three facets of one structural problem:

1. **Fragmentation** — knowledge lives in Slack, Notion, Jira, GDrive, Linear, Salesforce, GitHub, Figma
2. **Context-switching tax** — employees lose hours reconstructing context across tools; agents inherit the same blindness
3. **Tool sprawl** — the average company runs 130+ SaaS apps; each one is another silo

Each facet should be callable out on its own so different audience segments (knowledge workers, IT leaders, operators) recognize their own pain.

## Goals

- Add a new section "Scattered by Design" to the business page that names all three facets individually while framing them as one structural problem
- Use real SaaS tool logos (Slack, Notion, Jira, Google Drive, Linear, Salesforce, GitHub, Figma) so the fragmentation is visceral, not abstract
- Match the existing visual language, animation pattern, and copy voice of `ForBusinessPage`
- Pair thematically with the existing "Stateless by Design" (Why It Breaks) section — two problems, both structural, both named the same way

## Non-Goals

- Landing page (`HomePage`) changes
- Backend / data / routing changes
- Cited statistics — directional numbers ("2+ hrs/day", "130+ apps") are acceptable for this pass
- Any change to the four vertical persona cards, hero, or architecture section

## Page Flow (After Change)

1. Hero
2. The Real Problem (4 vertical personas) — unchanged
3. **Scattered by Design** ← NEW
4. Why It Breaks (stateless agents) — unchanged
5. The Fix
6. Architecture
7. The Difference
8. Contact

## Section Content

**Kicker:** `Scattered by Design`

**H2:** `Your knowledge lives everywhere —` / `except where your agents can reach it.`

**Three sub-cards:**

| Card | Headline | Body | Visual element |
|---|---|---|---|
| Fragmentation | *Knowledge, fragmented.* | Scattered across Slack threads, Notion pages, Jira tickets, GDrive folders, Linear issues, Salesforce records. No single agent sees across them. | 8-logo strip at bottom of card |
| Context-switching tax | *The hidden tax.* | Employees lose 2+ hours a day hopping between tools to reconstruct context. Your agents inherit the same blindness — and the same tax. | Pulled-out stat: `2+ hrs/day` |
| Tool sprawl | *Sprawl compounds.* | The average company runs 130+ SaaS apps. Each one is another silo. Memory should span them, not duplicate them. | Pulled-out stat: `130+ apps` |

**Closer line (below grid):** *It's not just your AI that forgets. Your tools never knew in the first place.*

## Component Design

### New component: `ToolLogoStrip.jsx`

- Renders the 8 SaaS brand marks inline as SVG (no PNGs, no external CDNs, no runtime dep)
- Source: Simple Icons (MIT-licensed brand SVGs) — inlined into the component as `<svg>` JSX
- Monochrome by default using `currentColor` so it respects theme tokens
- Lives in `website/src/components/ToolLogoStrip.jsx` with accompanying `website/src/styles/tool-logo-strip.css`
- Used inside the Fragmentation sub-card; reusable anywhere else on the site if needed later
- Props: `tools?: string[]` (default = the 8-tool list), `size?: number`

### Modified: `ForBusinessPage.jsx`

- Add `scatteredCards` data array at top of file (same style as existing `fixCards`, `metricCards`)
- Add new `<section>` between "The Real Problem" section and "Why It Breaks" section
- Reuse existing `fadeUp` / `staggerFadeUp` helpers for motion
- No new external deps

### Modified: `for-business-page.css`

- New CSS block under `/* ── Section: Scattered by Design ── */`
- Classes: `.fb-scattered-sect`, `.fb-scattered-grid`, `.fb-scattered-card`, `.fb-scattered-card--fragmentation|tax|sprawl`, `.fb-scattered-headline`, `.fb-scattered-body`, `.fb-scattered-stat`, `.fb-scattered-logo-strip-wrap`, `.fb-scattered-closer`
- Grid: 3 columns on desktop, stacks on mobile at the same breakpoints already used for `fb-fix-grid` / `fb-metrics-grid`
- Visual treatment matches existing sub-card grids for consistency

## Interfaces

`ToolLogoStrip` is the only new public surface; it's a presentational component with two optional props and no side effects.

## Testing

No test runner in this repo — verification is visual:

1. `npm run dev`, open `/for-business` in browser
2. Confirm new section appears between the persona grid and the "stateless by design" section
3. Confirm the 8 tool logos render, respect monochrome theme, and lay out in a horizontal strip inside the Fragmentation card
4. Confirm the two stat call-outs render in the other two cards
5. Confirm the grid collapses correctly on mobile (≤ 720px breakpoint, matching existing behavior)
6. Confirm scroll-in animations fire via `fadeUp` / `staggerFadeUp`
7. `npm run build` completes with no new warnings

## Risks

- **Trademark / brand usage of logos** — using Simple Icons (MIT) is customary for "works with" / problem-framing contexts, but legal could later ask us to pull specific marks. Low risk for the current marketing stage.
- **Stat numbers will rot** — directional framing is acceptable now, but if challenged we should cite or soften. Out of scope for this pass.

## Deliverables

- `website/src/components/ToolLogoStrip.jsx` (new)
- `website/src/styles/tool-logo-strip.css` (new)
- `website/src/pages/ForBusinessPage.jsx` (modified — add section + data)
- `website/src/styles/for-business-page.css` (modified — add section styles)
