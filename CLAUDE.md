# CLAUDE.md — website/

Guidance for working in the marketing site. See the root `CLAUDE.md` for the writing voice (Karpathy, no em-dashes) and repo-wide rules.

## Blog authoring

Posts are MDX files in `src/content/blog/`, named `YYYY-MM-DD-slug.mdx`, with YAML frontmatter validated by `scripts/validate-posts.mjs` (run `npm run validate:posts`). Authors are JSON files in `src/content/authors/`; a post's `author` field is an author `id`.

- **Default author for new posts is `ximi` (Ximi Hoque).** Unless the user names a different author, every new blog post ships under `author: "ximi"`.
- Required frontmatter: `title`, `slug`, `date` (ISO `YYYY-MM-DD`), `author`, `excerpt`, `category`, `cover`. Categories are limited to the list in `src/content/categories.json`.
- Post images (cover + all in-body figures) are uploaded to the public GCS bucket and referenced by their public URL, so the deployed Pages site doesn't serve heavy PNGs and link/social unfurlers get a stable CDN URL. Convention: `gs://xysq_public/blogs/{slug}/<name>.png` → `https://storage.googleapis.com/xysq_public/blogs/{slug}/<name>.png`. Upload with `gsutil -m -h "Cache-Control:public, max-age=31536000" cp <files> gs://xysq_public/blogs/{slug}/` (the bucket is public-read via uniform bucket-level access, no per-object ACL needed). Keep a working copy in `public/blog/posts/{slug}/` for local iteration, but the `cover:` field and every `<Figure src=...>` must point at the GCS URL, not the local path.
- Verify before claiming done: `npm run validate:posts` then `npm run build` (the build prerenders each post route and will fail on a bad MDX or unknown author).
