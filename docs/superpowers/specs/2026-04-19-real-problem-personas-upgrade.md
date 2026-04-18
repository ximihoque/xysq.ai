# Real Problem Personas — Upgrade

**Date:** 2026-04-19
**Scope:** `website/src/pages/ForBusinessPage.jsx` + `website/src/styles/for-business-page.css`
**Status:** Approved, ready for implementation

## Goal

Upgrade the "Real Problem" section on the business page: add icons to every persona card, expand the persona set from 4 to 6 (drop Customer Support, add Development, Product, Legal), and group them into two visually labeled rows — "Builders & Creators" and "Operators".

## Non-Goals

- Landing page changes
- Hero, Scattered, Why It Breaks, Fix, Architecture, Difference, Contact sections
- Adding `lucide-react` as a dependency (inline SVGs instead)

## Persona Set — Final

**Row 1 — Builders & Creators:**

| Persona | Icon | Body |
|---|---|---|
| AI Builders | Wrench | You're stuffing context into every prompt. Token costs balloon. Recall degrades. You're duct-taping memory yourself. |
| Development | Code2 | Every new engineer ramps from zero. Every AI code assistant forgets the conventions, the gotchas, the "why we did it this way" from last sprint. Documentation is a tax your team pays every time it writes, reads, or fails to find it. |
| Product | Package | Your product team ships features agents don't know exist. Users ask about yesterday's release; the agent answers with last quarter's docs. |

**Row 2 — Operators:**

| Persona | Icon | Body |
|---|---|---|
| Marketing | Megaphone | Your agents don't know your brand voice, past campaigns, or what already flopped. Every brief starts cold. |
| HR & Onboarding | Users | New hire asks the same questions. Agent gives the same generic answers. Everything your team knows lives in someone's head. |
| Legal | Scale | Contracts, clauses, policies, precedents — all scattered across redlines, emails, and someone's desktop. Your agent can't cite what it can't see. |

## Layout

- Two 3-column grids stacked, each preceded by a small visible kicker label using the existing `.stag` monospace style
- On ≤ 900px, both grids collapse to single column (existing `.fb-verticals-grid` media rule already handles this)
- Each card gets a ~28px icon block at the top, above the existing headline

## Icons — Source + Implementation

- Icons are from [Lucide](https://lucide.dev) (ISC-licensed). SVG path data is inlined — **no new dependency**.
- The 6 icons needed: `Wrench`, `Code2`, `Package`, `Megaphone`, `Users`, `Scale`
- Rendered at 28px, stroke-based, using `currentColor` (themed via CSS)
- Icon map lives inside `ForBusinessPage.jsx` (colocated with the persona data). YAGNI: no reuse planned elsewhere, so no separate component.

## Code Changes

### `ForBusinessPage.jsx`

- Replace the single `verticals` array with two arrays: `buildersPersonas`, `operatorsPersonas`
- Add an `ICONS` const mapping icon names to inline JSX fragments containing SVG path elements
- In JSX, replace the single grid block inside Section 2 ("The Real Problem") with two consecutive row blocks. Each row: kicker label (`.fb-verticals-row-label`) → grid of cards. Each card renders its icon above the headline.

### `for-business-page.css`

Add two new classes, no changes to existing rules:

- `.fb-verticals-row-label` — kicker style, similar treatment to existing `.stag`, positioned with appropriate margin-top to separate rows
- `.fb-vertical-icon` — 28px × 28px wrapper, uses cyan accent color, margin-bottom to space above headline

## Testing

No test runner in this repo — visual verification only:

1. `npm run build` passes clean
2. `npm run dev`, open `/for-business` — confirm:
   - Two row-labeled grids render between hero and Scattered section
   - All 6 cards have icons at top, rendered in accent color
   - Development card shows the expanded documentation-tax copy
   - New cards (Development, Product, Legal) match visual style of existing cards
   - Customer Support card is gone
   - ≤ 900px: both rows stack single-column
   - Scroll animations fire normally

## Risks

- **Visual weight** — 6 cards in two rows is more content than the previous 4. If the section feels too long, a future pass could tighten body copy. Acceptable for this iteration.

## Deliverables

- Modified: `website/src/pages/ForBusinessPage.jsx`
- Modified: `website/src/styles/for-business-page.css`
