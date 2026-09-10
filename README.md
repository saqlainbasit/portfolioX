# portfolioX

Personal portfolio/CV site — brutalist editorial design, vanilla HTML/CSS/JS.

**Live:** [saqlainbasit-portfolio.vercel.app](https://saqlainbasit-portfolio.vercel.app)

---

## Stack

- Vanilla HTML, CSS, JavaScript — no framework, no build step
- Fonts: `Archivo Black` · `JetBrains Mono` · `Archivo` (Google Fonts)
- Deployed on Vercel

## Structure

```
portfolioX/
├── index.html      # markup + content
├── style.css       # all styles
├── script.js       # scroll progress, typing effect, project rendering, reveal animations
└── vercel.json     # security headers (X-Frame-Options, CSP, CORS, nosniff)
```

## Sections

- Hero — name, typing effect, contact meta
- About — lead paragraph with drop cap
- Projects — editorial index table (5 projects, links to GitHub)
- Skills — grouped by category
- Education — timeline (Matric → Intermediate → BS)

## Run Locally

No install needed — open `index.html` directly in a browser.

```bash
git clone https://github.com/saqlainbasit/portfolioX
cd portfolioX
open index.html   # or just drag into browser
```

## Deploy

Push to `main` — Vercel auto-deploys via GitHub integration.

## Security

`vercel.json` sets:
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Content-Security-Policy` — whitelisted sources only
- `Access-Control-Allow-Origin` — locked to production domain

---

© 2026 Saqlain Basit
