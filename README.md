# xysq.ai — Website

> Seen. Heard. Felt. Remembered.

Vite + React static site, deployable to GitHub Pages.

---

## Local development

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:5173`.

---

## Deployment

There are two ways to deploy: **GitHub Actions (CI/CD)** or **manual local build + push**.

---

### Option A — GitHub Actions (recommended for continuous updates)

Every push to `main` automatically builds and deploys the site. Do this once:

#### 1. Push the repo to GitHub

```bash
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

#### 2. Enable GitHub Pages via GitHub Actions

1. Go to your repo on GitHub → **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions**
3. Save

That's it. The `.github/workflows/deploy.yml` file in this repo handles everything. Every `git push` to `main` will rebuild and redeploy automatically.

#### 3. (Optional) Custom domain

If you're using a custom domain like `xysq.ai`:

1. Add a `CNAME` file in the `public/` folder with just your domain:
   ```
   xysq.ai
   ```
2. In **Settings → Pages → Custom domain**, enter `xysq.ai` and save.
3. Configure your DNS provider:
   - Add an `A` record pointing to GitHub Pages IPs:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - Or add a `CNAME` record pointing `www` → `YOUR_USERNAME.github.io`

> If deploying to a subdirectory URL (`https://username.github.io/repo-name/`) instead of a custom domain, update `vite.config.js`:
> ```js
> base: '/repo-name/',
> ```

---

### Option B — Build locally, push `dist/` to `gh-pages` branch

Use this if you prefer not to use GitHub Actions.

#### 1. Install `gh-pages` helper (one-time)

```bash
npm install --save-dev gh-pages
```

#### 2. Add a deploy script to `package.json`

```json
"scripts": {
  "deploy": "npm run build && gh-pages -d dist"
}
```

#### 3. Deploy

```bash
npm run deploy
```

This builds the project into `dist/` and pushes it to the `gh-pages` branch of your repo.

#### 4. Enable GitHub Pages from the branch

1. Go to **Settings → Pages**
2. Under **Source**, select **Deploy from a branch**
3. Choose `gh-pages` / `/ (root)` and save

#### Subsequent updates

Each time you make changes, just run:

```bash
npm run deploy
```

---

## Project structure

```
website/
├── .github/
│   └── workflows/
│       └── deploy.yml        # CI/CD: auto-deploy on push to main
├── public/
│   └── CNAME                 # add this for a custom domain
├── src/
│   ├── components/
│   │   ├── Cursor.jsx
│   │   ├── Particles.jsx
│   │   ├── Nav.jsx
│   │   ├── Hero.jsx
│   │   ├── Marquee.jsx
│   │   ├── Problem.jsx
│   │   ├── Multimodal.jsx
│   │   ├── Pillars.jsx
│   │   ├── Domains.jsx
│   │   ├── HowItWorks.jsx
│   │   ├── Consent.jsx
│   │   ├── Waitlist.jsx
│   │   └── Footer.jsx
│   ├── styles/
│   │   ├── global.css        # reset, CSS variables, shared section styles, keyframes
│   │   ├── cursor.css
│   │   ├── nav.css
│   │   ├── hero.css
│   │   ├── marquee.css
│   │   ├── problem.css
│   │   ├── multimodal.css
│   │   ├── pillars.css
│   │   ├── domains.css
│   │   ├── steps.css
│   │   ├── consent.css
│   │   ├── waitlist.css
│   │   ├── footer.css
│   │   └── responsive.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vite.config.js
└── package.json
```
