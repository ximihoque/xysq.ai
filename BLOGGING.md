# xysq Blog — Author's Guide

Everything you need to publish a post to [xysq.ai/blog](https://xysq.ai/blog).

---

## Quick start

1. Pull the repo and create a branch off `main` (or `blog` while the portal is still being iterated on).
2. Create one MDX file at `website/src/content/blog/YYYY-MM-DD-<slug>.mdx`.
3. Run `cd website && npm run dev` and visit `http://localhost:5173/blog/<slug>` to preview.
4. Open a PR. Reviewers run `npm run dev` to read the rendered post.
5. Merge to `main` → GitHub Actions deploys → live on xysq.ai. **Merge IS publish.**

That's it. One file. No CMS, no separate metadata file.

---

## File naming

```
website/src/content/blog/YYYY-MM-DD-<slug>.mdx
```

- The date prefix is for sorting on disk only — the displayed date comes from frontmatter.
- The slug after the date **must match** the `slug:` value in frontmatter, or the build fails.
- Use `kebab-case` for the slug. No spaces, no underscores, no capitals.

✅ `2026-06-12-consent-first-memory.mdx`
❌ `My Cool Post.mdx`, `2026-06-12_post.mdx`, `Consent-First.mdx`

---

## Frontmatter

Every post starts with a YAML frontmatter block. The validator enforces this contract — broken frontmatter fails the build.

```yaml
---
title: "Consent-First Memory for AI Agents"
slug: "consent-first-memory"
date: "2026-06-12"
author: "pulin"
excerpt: "Why memory needs consent — and what it means for the agents we build on top of it."
category: "Insight"
tags: ["memory", "consent"]
cover: "/blog/covers/consent.jpg"
featured: false
draft: false
---
```

### Required fields

| Field | Type | Notes |
|---|---|---|
| `title` | string | Shown in the post header, browser tab, and SEO metadata. Use sentence case or title case consistently. |
| `slug` | string | Must match the suffix of the filename (e.g. filename ends with `consent-first-memory.mdx`, slug is `consent-first-memory`). |
| `date` | string | ISO `YYYY-MM-DD` format. Drives sort order on the index page. |
| `author` | string | The `id` of an author file in `src/content/authors/`. Currently: `pulin`. To add yourself, see [Adding an author](#adding-an-author) below. |
| `excerpt` | string | One-sentence summary. Renders below the title as a subtitle, on the index card, and as the SEO meta description. Aim for 120–180 characters. |
| `category` | string | One of: **Article**, **Insight**, **News**, **Engineering**, **Product**. The full list lives in [`src/content/categories.json`](src/content/categories.json) — to add a new category, edit that file. |

### Optional fields

| Field | Type | Default | Notes |
|---|---|---|---|
| `tags` | array of strings | `[]` | Free-form tags for future search/filter. Not currently shown in UI. |
| `cover` | string (path) | `null` | Path to a hero image used on the featured card. Place files under `website/public/blog/covers/` and reference as `/blog/covers/file.jpg`. If absent, a brand gradient placeholder shows instead. |
| `featured` | boolean | `false` | Marks this post as the hero card on the index. **At most one published post may be featured at a time** — the validator enforces this. If no post is flagged, the newest post auto-fills the slot. |
| `draft` | boolean | `false` | Hides the post from production. Drafts still render in `npm run dev` so you can preview. |
| `related` | array of slugs | `[]` | Reserved for a future "related posts" feature. |

### What the validator checks

`npm run validate:posts` runs automatically before every build. It will fail if:

- Any required field is missing or empty
- `date` isn't ISO `YYYY-MM-DD`
- The filename suffix doesn't match `slug`
- `author` doesn't match an existing author JSON file
- `category` isn't in `categories.json`
- More than one published post has `featured: true`

You can run the validator manually:

```bash
cd website && npm run validate:posts
```

---

## Writing the post body

The body is plain Markdown with optional JSX (this is what makes it MDX). Most posts won't need any JSX at all.

### Headings

Use `##` for top-level sections and `###` for sub-sections. **Don't use `#` for body content** — that's reserved for the post title which comes from frontmatter.

```markdown
## Why memory needs consent

Body text under H2.

### What "consent" means here

Body text under H3.
```

The Table of Contents in the left rail is **auto-generated** from your `##` and `###` headings. If you want a section in the TOC, make it an H2 or H3. If you don't want it in the TOC, don't make it a heading — use bold text or a paragraph break instead.

Headings get anchor links automatically (hover over a heading on the live site to see the `#`).

### Paragraphs, lists, links, emphasis

Standard Markdown:

```markdown
Plain paragraph with **bold**, *italic*, `inline code`, and [a link](https://xysq.ai).

- Unordered list item
- Another item

1. Ordered step
2. Another step
```

### Blockquotes

```markdown
> Use these for pull quotes or short citations. They render with a cyan left border, italic Playfair, slightly larger text — distinctive enough that readers slow down.
```

Use sparingly. One or two pull quotes per long-form post is plenty.

### Code blocks

Fence with triple backticks and a language tag. Syntax highlighting is build-time (Shiki, `github-dark-dimmed` theme).

````markdown
```js
function greet(name) {
  return `Hello, ${name}!`
}
```

```py
def greet(name: str) -> str:
    return f"Hello, {name}!"
```

```bash
curl https://xysq.ai/api/health
```
````

Always include the language tag — `js`, `py`, `bash`, `ts`, `tsx`, `json`, `yaml`, `css`, `mdx`, etc. Untagged blocks won't be highlighted.

### Tables

Standard GitHub-flavored Markdown:

```markdown
| Column A | Column B | Column C |
|---|---|---|
| One | Two | Three |
```

### Images

Use the `<Figure>` component (auto-imported in posts that need it). Place image files under `website/public/blog/` and reference with absolute paths.

```mdx
<Figure src="/blog/covers/diagram.png" caption="An optional caption." />
```

`<Figure>` lazy-loads, applies a rounded border, and renders the caption below the image in muted text.

For inline images without captions, plain Markdown works too:

```markdown
![alt text](/blog/inline-image.png)
```

### Callouts

Use `<Callout>` for asides. Three variants:

```mdx
import { Callout } from '../../components/mdx/Callout'

<Callout type="info">
  This is an **info** callout. Useful but not critical.
</Callout>

<Callout type="warn">
  This is a **warning** callout. Sparingly, for things readers must not miss.
</Callout>

<Callout type="note">
  Neutral aside.
</Callout>
```

The `import` line goes after the frontmatter block, before the body. Only import what you actually use.

---

## Authoring workflow

### Local preview

```bash
cd website
npm run dev
```

Visit `http://localhost:5173/blog/<your-slug>`. Hot reload on save — edit the `.mdx`, see changes in <1 second.

### Drafts

Set `draft: true` to hide from production while keeping the post visible in `npm run dev`. Useful when you want to merge an in-progress post to share with reviewers without publishing.

```yaml
draft: true
```

When you're ready to publish, change to `draft: false` (or delete the line) and merge.

### PR review

Open a PR. Reviewers should:

1. `git checkout` the branch
2. `cd website && npm run dev`
3. Read the rendered post in the browser
4. Leave comments on the `.mdx` file in the PR — this is way better than commenting on Google Docs because comments anchor to specific lines

### Publishing

Merge the PR to `main`. GitHub Actions runs the build (validator → Vite build → RSS / sitemap / OG image generators) and deploys to xysq.ai/blog. **Live within ~2 minutes of merge.**

If the build fails (e.g. broken frontmatter, missing category), the deploy is blocked. Fix the issue, push another commit, the deploy retries.

---

## Adding an author

Author records live in `website/src/content/authors/<id>.json`. To add yourself:

1. Create `website/src/content/authors/<your-id>.json`:

```json
{
  "id": "your-id",
  "name": "Your Full Name",
  "title": "Your Title",
  "avatar": "/blog/authors/your-id.jpg",
  "bio": "One-line bio shown on author cards.",
  "links": {
    "twitter": "https://twitter.com/yourhandle",
    "linkedin": "https://www.linkedin.com/in/yourhandle/"
  }
}
```

2. Drop your avatar at `website/public/blog/authors/<your-id>.jpg` (square, ≥256px).

3. Reference yourself in posts via `author: "your-id"`.

`title`, `avatar`, `bio`, and `links` are all optional but recommended.

---

## Style guidelines

A few opinions to keep posts feeling consistent:

- **One idea per post.** If you find yourself writing two unrelated sections, split into two posts.
- **Subtitle (excerpt) earns its place.** Make it a real promise — what will the reader learn? Not "in this post we discuss X."
- **First paragraph hooks.** Don't open with throat-clearing. Get to the point in two sentences.
- **Code over prose.** When explaining a how-to, show the code first, explain afterward. People skim code blocks.
- **Tighten.** Read your draft aloud. Cut every adverb you can. Cut every "in order to" → "to".
- **Link generously to xysq docs/pages, sparingly to external sources.** Each external link is a chance for the reader to leave.

For longer posts, see the [sample post](src/content/blog/2026-05-02-sample-post.mdx) for an exhaustive feature reference.

---

## Cheat sheet

```yaml
---
title: "Your Title Here"
slug: "your-title-here"
date: "2026-06-12"
author: "pulin"
excerpt: "One-sentence promise of what this post delivers."
category: "Article"
draft: false
---
```

```bash
cd website && npm run dev    # preview
npm run validate:posts       # check frontmatter
npm run build                # full production build (runs validator + everything)
```

That's all.
