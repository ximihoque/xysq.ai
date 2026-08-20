---
name: Teams + Organise sketchful infographics
description: Hand-drawn (roughjs) + blueprint-annotation visuals for the Teams and Organise sections of the marketing homepage
status: approved
date: 2026-05-08
---

# Teams + Organise sketchful infographics

## Goal

Replace the current `TeamsVisual` (concentric rings) and `OrganiseVisual` (clean
file grid) with sketchful infographics — hand-drawn napkin-sketch strokes mixed
with technical-blueprint annotations (dotted leader lines, dimension brackets,
handwritten callouts).

Each visual delivers one punchline at a glance:

- **Teams** — *one shared vault that survives turnover*
- **Organise** — *messy inputs become a queryable memory layer*

Both are mostly still (one subtle "breathing" element each); animation budget
deferred for a later pass.

## Aesthetic direction

A + D blend:
- **A — hand-drawn**: rough, slightly-wobbly ink strokes via [roughjs](https://roughjs.com)
- **D — blueprint**: dotted leader lines, dimension brackets `[━━━━━]`,
  handwritten callouts in [Caveat](https://fonts.google.com/specimen/Caveat)

Color: existing site palette — cyan (`#00e5c8`) primary, amber (`#f5a623`) for
"departing/private", lychee (`#ff6b7a`) primary in light theme. No new tokens.

## Components

### `TeamsVisual.jsx` — "The Vault"

A single hand-drawn safe centered in the card, four rough stick-figure people
around it, each labeled with a role:

- top-left — `owner`, arrow pointing into the vault
- top-right — `admin`, two-way arrow
- bottom-right — `rw`, arrow into the vault
- bottom-left — `ro`, arrow only out of the vault

A fifth figure off to the right side, drawn lighter with a strikethrough,
captioned `← left the team`. A faded dotted line stops mid-path between them
and the vault.

Blueprint annotations (Caveat font):
- `team vault` label at the top with a dotted leader to the safe
- bottom dimension bracket `[━━━━━]` labeled `survives turnover`
- small `1,247 memories` tag near the vault corner

**Breathing element**: a slow opacity pulse on the cyan glow seeping from the
vault seam (~4s loop). Disabled when `prefers-reduced-motion`.

### `OrganiseVisual.jsx` — "The Funnel"

Three vertical stages, top to bottom:

1. **Top — messy inputs**. Sketchy rectangles labeled `PDF`, `IMG`, `TXT`,
   `MD`, a wonky link icon, a torn-paper transcript. Each slightly rotated to
   read as "dumped on a desk". Per-filetype colors reuse existing accents from
   the previous `OrganiseVisual` (`#f56450`, `#9b87ff`, `#00e5c8`, `#82aaff`,
   `#ffb454`).
2. **Middle — funnel/hopper**. Hand-drawn funnel shape. Inside it, dotted
   blueprint script: `· extracting · tagging · indexing`.
3. **Bottom — clean cards**. A short stack of uniform memory-cards, each with
   a small tag-dot. To the right, three small AI tool initials (C / G / X) with
   a dotted query arrow drawn back into the stack labeled `@onboarding-doc`.

Blueprint annotations:
- top label `messy inputs` with leader line
- middle label `xysq indexer`
- bottom label `queryable from any agent`
- right-side dimension bracket labeled `1 memory layer`

**Breathing element**: one input file gently drops toward the funnel mouth
every ~5s. Disabled when `prefers-reduced-motion`.

## Tech approach

- **Library**: [roughjs](https://github.com/rough-stuff/rough) — 9KB,
  Excalidraw uses it. Generates SVG paths with natural stroke variance.
  Use `RoughGenerator` (not the canvas variant) so we get plain SVG path `d`
  strings we can render through React.
- **Seed**: each `rough` shape uses a fixed integer seed so strokes don't
  re-randomize on every render.
- **Font**: [Caveat](https://fonts.google.com/specimen/Caveat) added to the
  Google Fonts `<link>` in `index.html`. Used for handwritten labels via a
  new `--font-sketch` CSS variable (or inline `font-family`).
- **Animation**: framer-motion for the breathing element only.
- **Theme**: both visuals support dark + light themes the same way the
  current ones do — the existing card frame styles are kept; only the
  drawn content changes.

## Files

| File | Action |
|---|---|
| `package.json` | add `roughjs` dependency |
| `index.html` | append `Caveat` to the Google Fonts URL |
| `src/components/TeamsVisual.jsx` | full rewrite |
| `src/components/OrganiseVisual.jsx` | full rewrite |
| `src/styles/teams-visual.css` | full rewrite |
| `src/styles/organise-visual.css` | full rewrite |
| `src/components/Teams.jsx` | unchanged |
| `src/components/Organise.jsx` | unchanged |

## Out of scope

- Full B-tier choreographed animation loops (deferred — track for later)
- Mobile-specific layout changes (existing media queries retained)
- Updating any other section visuals
- Gamma-generated illustration assets (user is generating these separately
  for reference / fallback)

## Verification

- `npm run build` succeeds
- `npm run dev` renders both sections without console errors
- Light + dark theme both render correctly
- `prefers-reduced-motion` disables the breathing animations
