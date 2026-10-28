# uuta-site

Personal site of uuta, in English and Japanese. Static [Astro](https://astro.build) build,
served by Cloudflare Workers static assets. The approved design mock lives in
`design/mock/` and is the reference for layout, copy and colors.

## Commands

Requires Node 22.23.4 or later (Astro's minimum). `.nvmrc` pins 22.23.4, so run `nvm use` first.

| Command | What it does |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Dev server at http://localhost:4321 |
| `npm run build` | Build the static site into `dist/` |
| `npm run preview` | Serve `dist/` locally |
| `npm run check` | Type-check with `astro check` |
| `npm run check:links` | Check every internal link, asset and `#anchor` in `dist/`, and each page's EN/JA toggle (run after a build) |
| `npm run deploy` | Build, then deploy `dist/` with Wrangler (`wrangler.jsonc`) |

Deploying needs a Cloudflare login first: `npx wrangler login`.

Text contrast: `scripts/contrast.js` is a function to evaluate in a browser tab on the
preview server (for example with the chrome-devtools MCP `evaluate_script` tool). It loads
every route in the sitemap, the 404 pages and `/` in both themes and lists text below WCAG AA.

`npx wrangler dev` serves `dist/` the way Cloudflare will, including the 404 pages, with
no login needed.

## Layout

```
src/
  layouts/Base.astro        <html>, head, theme script, shared header and footer
  components/               Header, Footer, ThemeToggle, page components
  components/home/          Home page sections
  i18n/                     Copy per page, per language (ui.ts holds shared labels)
  content/writing/<lang>/   Articles (Markdown)
  pages/                    Routes: English under /en/, Japanese under /ja/, plus / and 404
  styles/global.css         Color tokens (light and dark) and shared styles
```

## Writing

Add a Markdown file at `src/content/writing/<lang>/<slug>.md`; it is published at
`/en/posts/<slug>/` or `/ja/posts/<slug>/`, and listed on `/en/posts/` and `/ja/posts/`
(a post that has no translation also shows on the other language's list, marked with its language).

```yaml
---
title: "…"
description: "…"        # meta description
date: 2026-11-01        # or a placeholder such as "[DATE]"
lang: en                # en or ja
key: some-article       # optional; the same key on an EN and a JA file links the translations
tags: [Agentic workflow]
---
```

Without a translation, the EN/JA toggle on an article goes to the other language's
posts page.

The Writing list on the home pages is set in `src/i18n/home.ts`. A row links to an
article through `post: '<key>'`, preferring the translation in the page's language.

## Routes

Every page lives under `/en/` or `/ja/`. `/` has no content of its own: a script in its
`<head>` sends the visitor to the language they last picked with the EN/JA toggle
(saved in `localStorage`), otherwise to `/ja/` when the browser's first language is
Japanese and to `/en/` for anything else, keeping `?query` and `#hash`. Without
JavaScript a meta refresh goes to `/en/`, and the page shows links to both homes.

Unknown paths get a 404 page in the site's design: `/ja/...` gets the Japanese one
(`dist/ja/404.html`), everything else the English one (`dist/404.html`). Cloudflare picks
the nearest `404.html` (`not_found_handling: "404-page"` in `wrangler.jsonc`). Astro
writes `src/pages/ja/404.astro` to `ja/404/index.html`, so a small hook in
`astro.config.mjs` moves it to `ja/404.html` after each build. `npm run preview` doesn't
serve these; check them with `npx wrangler dev`.

## Before going live

These are placeholders in the mock and stay as they are until the owner fills them in:

- `site` in `astro.config.mjs` is `https://example.com`; the sitemap and hreflang links use it.
- `[BRACKETED]` text across the pages: dates, background, hosting provider, analytics,
  full name.
- Links that point to `#`: the case studies and the Writing rows that have no article yet.
