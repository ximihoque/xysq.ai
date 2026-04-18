# Scattered by Design — Business Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a new "Scattered by Design" section to the business page that surfaces the tool-sprawl problem via three facets (fragmentation, context-switching tax, tool sprawl) with inline SaaS brand logos.

**Architecture:** Insert one new `<section>` inside `ForBusinessPage.jsx` between the existing "Real Problem" and "Why It Breaks" sections. Introduce one new presentational component `ToolLogoStrip.jsx` with inline Simple Icons SVGs. Styling follows the existing `fb-fix-card` / `fb-metric-card` grid pattern via a new CSS block in `for-business-page.css`.

**Tech Stack:** React 18 + Vite, framer-motion for reveals, hand-authored CSS with CSS variables, inline SVG for brand marks.

**Verification model:** This repo has no test runner (see `website/CLAUDE.md` — "No test runner or linter is configured yet"). Verification is: `npm run build` passes clean + visual check via `npm run dev`. Tasks below reflect that.

---

## File Structure

- **Create:** `website/src/components/ToolLogoStrip.jsx` — presentational component; renders 8 inline SVG brand marks as a horizontal strip, monochrome via `currentColor`
- **Create:** `website/src/styles/tool-logo-strip.css` — styles for the strip (flex layout, sizing, hover)
- **Modify:** `website/src/pages/ForBusinessPage.jsx` — add `scatteredCards` data + new `<section>` between existing Real Problem and Why It Breaks sections, import `ToolLogoStrip`
- **Modify:** `website/src/styles/for-business-page.css` — add styles for `.fb-scattered-*` classes + responsive rule

---

## Task 1: Create ToolLogoStrip component

**Files:**
- Create: `website/src/components/ToolLogoStrip.jsx`
- Create: `website/src/styles/tool-logo-strip.css`

- [ ] **Step 1: Create the CSS file**

Write `website/src/styles/tool-logo-strip.css`:

```css
/* ── ToolLogoStrip ───────────────────────────────────────── */

.tool-logo-strip {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 18px;
  margin-top: 20px;
  color: var(--muted);
}

.tool-logo-strip__item {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  opacity: 0.7;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.tool-logo-strip__item:hover {
  opacity: 1;
  transform: translateY(-1px);
}

.tool-logo-strip__item svg {
  width: 100%;
  height: 100%;
  fill: currentColor;
}
```

- [ ] **Step 2: Create the component file**

Write `website/src/components/ToolLogoStrip.jsx`. The SVG `path` data below is from Simple Icons (CC0) — inline so no runtime dep:

```jsx
import '../styles/tool-logo-strip.css'

// Simple Icons SVG path data (CC0). Inlined — no runtime dep.
const ICONS = {
  slack: (
    <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" />
  ),
  notion: (
    <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.635-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z" />
  ),
  jira: (
    <path d="M11.571 11.513H0a5.218 5.218 0 0 0 5.232 5.215h2.13v2.057A5.215 5.215 0 0 0 12.575 24V12.518a1.005 1.005 0 0 0-1.005-1.005zm5.723-5.756H5.736a5.215 5.215 0 0 0 5.215 5.214h2.129v2.058a5.218 5.218 0 0 0 5.215 5.214V6.762a1.001 1.001 0 0 0-1.001-1.005zM23.013 0H11.455a5.215 5.215 0 0 0 5.215 5.215h2.129v2.057A5.215 5.215 0 0 0 24 12.483V1.005A1.001 1.001 0 0 0 23.013 0z" />
  ),
  googledrive: (
    <path d="M12.01 1.485L.67 21.148l3.64 2.367 11.34-19.662-3.64-2.368zM23.33 21.148L18.67 12.9l-6.66 11.45h11.32v-3.202zm-11.34-8.582l4.35-7.53-5.7-3.551-3.66 6.33 5.01 4.751z" />
  ),
  linear: (
    <path d="M.403 13.795A12.014 12.014 0 0 0 10.205 23.597L.403 13.795Zm0-4.015L14.22 23.597a12.064 12.064 0 0 0 3.095-1.2L1.603 6.685a12.064 12.064 0 0 0-1.2 3.095Zm2.451-5.49L19.71 21.146a12.072 12.072 0 0 0 2.235-2.576L5.43 2.055a12.072 12.072 0 0 0-2.576 2.235ZM6.975 1.107C8.516.404 10.212 0 12 0c6.627 0 12 5.373 12 12 0 1.788-.404 3.484-1.107 5.025L6.975 1.107Z" />
  ),
  salesforce: (
    <path d="M10.006 5.415a4.195 4.195 0 0 1 3.045-1.306c1.56 0 2.954.9 3.69 2.205.63-.3 1.35-.45 2.1-.45 2.85 0 5.159 2.34 5.159 5.22 0 2.88-2.31 5.22-5.16 5.22-.345 0-.69-.036-1.02-.105a3.75 3.75 0 0 1-3.255 1.905c-.555 0-1.08-.12-1.56-.345A4.275 4.275 0 0 1 9.09 20.31a4.26 4.26 0 0 1-3.946-2.626 4.38 4.38 0 0 1-.9.105A4.336 4.336 0 0 1 0 13.43c0-1.8 1.08-3.375 2.64-4.05a4.71 4.71 0 0 1-.39-1.88c0-2.625 2.13-4.755 4.77-4.755 1.545 0 2.93.735 3.811 1.875l-.825.795z" />
  ),
  github: (
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  ),
  figma: (
    <path d="M8 24c2.208 0 4-1.792 4-4v-4H8c-2.208 0-4 1.792-4 4s1.792 4 4 4zm-4-12c0-2.208 1.792-4 4-4h4v8H8c-2.208 0-4-1.792-4-4zm0-8c0-2.208 1.792-4 4-4h4v8H8c-2.208 0-4-1.792-4-4zm8-4h4c2.208 0 4 1.792 4 4s-1.792 4-4 4h-4V0zm8 12c0 2.208-1.792 4-4 4s-4-1.792-4-4 1.792-4 4-4 4 1.792 4 4z" />
  ),
}

const LABELS = {
  slack: 'Slack',
  notion: 'Notion',
  jira: 'Jira',
  googledrive: 'Google Drive',
  linear: 'Linear',
  salesforce: 'Salesforce',
  github: 'GitHub',
  figma: 'Figma',
}

const DEFAULT_TOOLS = ['slack', 'notion', 'jira', 'googledrive', 'linear', 'salesforce', 'github', 'figma']

export default function ToolLogoStrip({ tools = DEFAULT_TOOLS }) {
  return (
    <div className="tool-logo-strip" aria-label="Tools where knowledge lives">
      {tools.map((t) => (
        <span key={t} className="tool-logo-strip__item" title={LABELS[t] || t}>
          <svg viewBox="0 0 24 24" role="img" aria-label={LABELS[t] || t} xmlns="http://www.w3.org/2000/svg">
            {ICONS[t]}
          </svg>
        </span>
      ))}
    </div>
  )
}
```

- [ ] **Step 3: Verify build passes**

Run: `cd website && npm run build`
Expected: exit 0, no errors. (The component isn't imported anywhere yet, so a successful build proves it parses cleanly.)

- [ ] **Step 4: Commit**

```bash
git add website/src/components/ToolLogoStrip.jsx website/src/styles/tool-logo-strip.css
git commit -m "feat: add ToolLogoStrip component with inline SaaS brand marks"
```

---

## Task 2: Add scattered-by-design styles

**Files:**
- Modify: `website/src/styles/for-business-page.css`

- [ ] **Step 1: Append the new section styles**

Open `website/src/styles/for-business-page.css`. Add this block immediately before the existing `/* ── Responsive ── */` comment (currently near line 401). Do NOT change any existing rules:

```css
/* ── Section: Scattered by Design ── */
.fb-scattered-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 48px;
}

.fb-scattered-card {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 16px;
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.fb-scattered-card:hover {
  transform: translateY(-4px);
}

.fb-scattered-card--fragmentation {
  background: rgba(130, 170, 255, 0.05);
  border-color: rgba(130, 170, 255, 0.18);
}

.fb-scattered-card--tax {
  background: rgba(245, 166, 35, 0.05);
  border-color: rgba(245, 166, 35, 0.18);
}

.fb-scattered-card--sprawl {
  background: rgba(0, 229, 200, 0.05);
  border-color: rgba(0, 229, 200, 0.18);
}

.fb-scattered-headline {
  font-family: 'Playfair Display', serif;
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--paper);
  margin-bottom: 12px;
  line-height: 1.2;
  font-style: italic;
}

.fb-scattered-body {
  font-family: 'Outfit', sans-serif;
  font-size: 0.9rem;
  color: var(--silver);
  line-height: 1.7;
  margin: 0;
}

.fb-scattered-stat {
  font-family: 'Playfair Display', serif;
  font-size: 2.6rem;
  font-weight: 700;
  color: var(--paper);
  line-height: 1;
  margin-top: auto;
  padding-top: 24px;
  letter-spacing: -0.02em;
}

.fb-scattered-stat-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  color: var(--muted);
  text-transform: uppercase;
  margin-top: 6px;
}

.fb-scattered-logo-wrap {
  margin-top: auto;
  padding-top: 20px;
}

.fb-scattered-closer {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  color: var(--muted);
  text-align: center;
  margin-top: 40px;
}
```

- [ ] **Step 2: Add mobile breakpoint rule**

In the same file, inside the existing `@media (max-width: 900px) { ... }` block (currently near line 402), add one more rule next to `.fb-fix-grid` and `.fb-metrics-grid`:

```css
.fb-scattered-grid {
  grid-template-columns: 1fr;
}
```

The resulting block should contain `.fb-scattered-grid` alongside the other grid overrides.

- [ ] **Step 3: Verify build passes**

Run: `cd website && npm run build`
Expected: exit 0, no CSS errors.

- [ ] **Step 4: Commit**

```bash
git add website/src/styles/for-business-page.css
git commit -m "style: add scattered-by-design section styles"
```

---

## Task 3: Add the new section to ForBusinessPage

**Files:**
- Modify: `website/src/pages/ForBusinessPage.jsx`

- [ ] **Step 1: Add ToolLogoStrip import**

In `website/src/pages/ForBusinessPage.jsx`, add this import alongside the other component imports (currently at lines 2-9):

```jsx
import ToolLogoStrip from '../components/ToolLogoStrip'
```

- [ ] **Step 2: Add the `scatteredCards` data array**

Add this block immediately after the `fixCards` array (currently lines 45-64), before the `metricCards` array:

```jsx
// ── Scattered by Design cards — NEW section ──────────────
const scatteredCards = [
  {
    id: 'fragmentation',
    headline: 'Knowledge, fragmented.',
    body: 'Scattered across Slack threads, Notion pages, Jira tickets, GDrive folders, Linear issues, Salesforce records. No single agent sees across them.',
    cls: 'fb-scattered-card--fragmentation',
    variant: 'logos',
  },
  {
    id: 'tax',
    headline: 'The hidden tax.',
    body: 'Employees lose 2+ hours a day hopping between tools to reconstruct context. Your agents inherit the same blindness — and the same tax.',
    cls: 'fb-scattered-card--tax',
    variant: 'stat',
    stat: '2+ hrs',
    statLabel: 'per day, per employee',
  },
  {
    id: 'sprawl',
    headline: 'Sprawl compounds.',
    body: 'The average company runs 130+ SaaS apps. Each one is another silo. Memory should span them, not duplicate them.',
    cls: 'fb-scattered-card--sprawl',
    variant: 'stat',
    stat: '130+',
    statLabel: 'SaaS apps, per company',
  },
]
```

- [ ] **Step 3: Insert the new `<section>` in JSX**

In the JSX, find the existing section block that starts with the comment `{/* ── Section 3: Why It Breaks ── */}` (currently around line 220). Insert the entire new section below immediately BEFORE that comment, so the final order is: Section 2 (Real Problem) → NEW Scattered section → Section 3 (Why It Breaks):

```jsx
          {/* ── Section: Scattered by Design ── NEW */}
          <section className="sect">
            <div className="sect-inner">
              <motion.span className="stag" {...fadeUp}>
                Scattered by Design
              </motion.span>
              <motion.h2 {...staggerFadeUp(0.1)}>
                Your knowledge lives everywhere —<br />
                <em>except where your agents can reach it.</em>
              </motion.h2>

              <div className="fb-scattered-grid">
                {scatteredCards.map((card, i) => (
                  <motion.div
                    key={card.id}
                    className={`fb-scattered-card ${card.cls}`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 + i * 0.12 }}
                  >
                    <p className="fb-scattered-headline">{card.headline}</p>
                    <p className="fb-scattered-body">{card.body}</p>
                    {card.variant === 'logos' && (
                      <div className="fb-scattered-logo-wrap">
                        <ToolLogoStrip />
                      </div>
                    )}
                    {card.variant === 'stat' && (
                      <div>
                        <div className="fb-scattered-stat">{card.stat}</div>
                        <div className="fb-scattered-stat-label">{card.statLabel}</div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              <motion.p className="fb-scattered-closer" {...staggerFadeUp(0.5)}>
                {"// it's not just your AI that forgets. your tools never knew in the first place."}
              </motion.p>
            </div>
          </section>
```

- [ ] **Step 4: Verify build passes**

Run: `cd website && npm run build`
Expected: exit 0. The `dist/` output should be produced without errors.

- [ ] **Step 5: Visual verification in dev server**

Run: `cd website && npm run dev`

In the browser, navigate to `http://localhost:5173/for-business`. Confirm all of the following:

1. The new "Scattered by Design" section appears between the four vertical persona cards and the "Why It Happens / Agents are stateless by design" section
2. The kicker text `Scattered by Design` renders in the same `.stag` monospace style as other kickers
3. The H2 reads `Your knowledge lives everywhere — except where your agents can reach it.` with the second line in italic
4. Three cards render side-by-side on desktop, each with tinted background matching its variant (blue / amber / cyan)
5. The first card (Fragmentation) shows 8 monochrome SaaS logos in a horizontal strip at the bottom of the card — hover fades them brighter
6. The second card (Tax) shows the large `2+ hrs` stat with `per day, per employee` label underneath
7. The third card (Sprawl) shows the large `130+` stat with `SaaS apps, per company` label underneath
8. The closer line reads `// it's not just your AI that forgets. your tools never knew in the first place.`
9. Resize browser to ≤ 900px wide — the three cards stack vertically
10. Scroll-reveal animation fires on the section (cards fade up as they enter the viewport)

Stop the dev server (Ctrl+C) once verified.

- [ ] **Step 6: Commit**

```bash
git add website/src/pages/ForBusinessPage.jsx
git commit -m "feat: add scattered-by-design section to business page

Introduces a new section between the vertical personas and the stateless-
agents section. Surfaces three facets of tool sprawl — fragmentation,
context-switching tax, and SaaS sprawl — with inline SaaS brand marks
on the fragmentation card and directional stats on the other two."
```

---

## Self-Review

**Spec coverage:**
- "Insert new section between existing Section 2 and Section 3" → Task 3, Step 3 ✓
- "Three sub-cards with headlines and bodies as specified" → Task 3, Step 2 `scatteredCards` array ✓
- "Kicker + H2 as specified" → Task 3, Step 3 ✓
- "Closer line below grid" → Task 3, Step 3 ✓
- "Tool logos inline SVG via Simple Icons, monochrome via currentColor" → Task 1 ✓
- "8 tools: Slack, Notion, Jira, GDrive, Linear, Salesforce, GitHub, Figma" → Task 1, `DEFAULT_TOOLS` ✓
- "New CSS block in for-business-page.css" → Task 2 ✓
- "3-column grid desktop, stacks on mobile matching existing breakpoints" → Task 2, Steps 1 + 2 ✓
- "Reuse fadeUp / staggerFadeUp motion helpers" → Task 3, Step 3 ✓
- "New ToolLogoStrip component + paired CSS" → Task 1 ✓
- "No new deps, no external CDN" → Task 1 (inlined SVG) ✓
- "Visual verification via npm run dev + npm run build" → Task 3, Steps 4-5 ✓

**Placeholder scan:** No TBDs, no "TODO", no vague "add appropriate X" phrasing. All code blocks are complete and ready to paste.

**Type consistency:** Class names used in CSS (`fb-scattered-grid`, `fb-scattered-card`, `fb-scattered-card--fragmentation|tax|sprawl`, `fb-scattered-headline`, `fb-scattered-body`, `fb-scattered-stat`, `fb-scattered-stat-label`, `fb-scattered-logo-wrap`, `fb-scattered-closer`) match exactly between Task 2 and Task 3. Component name `ToolLogoStrip` matches between file creation (Task 1) and import (Task 3). `DEFAULT_TOOLS` keys match `ICONS` keys match `LABELS` keys in Task 1. No drift.
