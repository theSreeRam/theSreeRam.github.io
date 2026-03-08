# Gamified Portfolio (Vite + React + TypeScript)

Gamified, interaction-heavy portfolio website optimized for free hosting.

## Local run

```bash
cd /Users/sreerampanigrahi/Documents/Playground/portfolio-gamified-vite
npm install
npm run dev
```

Default URL: `http://localhost:5173` (or whichever Vite prints).

## Production build

```bash
npm run build
npm run preview
```

## GitHub Pages deployment (recommended)

This repo already includes a workflow:
- `.github/workflows/deploy.yml`

### One-time GitHub setup

1. Push this folder to a GitHub repository (branch `main`).
2. In GitHub repo settings, open **Pages**.
3. Under **Build and deployment**, set **Source** to `GitHub Actions`.
4. Push to `main` and wait for the workflow to finish.
5. Your site URL will appear in the workflow summary and Pages settings.

## Personalization

1. Update contact links in `src/App.tsx`.
2. Replace placeholder email.
3. Tweak palette/animations in `src/App.css`.
4. Update project/experience data arrays in `src/App.tsx`.

## Notes

- `vite.config.ts` uses `base: './'` for simpler Pages/static compatibility.
- Works on GitHub Pages, Netlify, and Vercel free tiers.
