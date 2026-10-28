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
  content/writing/<lang>/   Articles (Markdown), Writing and Journal
  assets/writing/<slug>/    Article images
  lib/                      Article lists, Zenn fetch, tool icons
  pages/                    Routes: English under /en/, Japanese under /ja/, plus / and 404
  styles/global.css         Color tokens (light and dark) and shared styles
```

## Writing

Add a Markdown file at `src/content/writing/<lang>/<slug>.md`. Lists never show articles
in the other language.

```yaml
---
title: "…"
description: "…"        # optional; without it, the opening of the article is used
date: 2026-11-01        # or a placeholder such as "[DATE]"
lang: en                # en or ja
section: writing        # writing (default) or journal
key: some-article       # optional; the same key on an EN and a JA file links the translations
translated: true        # optional; on the translated side of a pair, shows a note linking the original
tags: [Agentic workflow] # optional; only used by search
agentDrafted: true      # optional; shows the "How this was written" note
---
```

- **Writing** (`section: writing`) is the professional list: `/<lang>/posts/<slug>/`, listed
  on `/<lang>/posts/`. The header links here, and the home page shows its latest four.
- **Journal** (`section: journal`) keeps personal essays and travel apart:
  `/<lang>/journal/<slug>/`, listed on `/<lang>/journal/` and linked only from the footer
  (and only in a language that has entries).
- **Zenn**: `src/lib/zenn.ts` fetches the articles of `yutti` from the Zenn API at build time
  and adds them to the Japanese Writing list, linking out to zenn.dev. If the API fails, the
  build goes on without them. New Zenn articles appear only after a rebuild, so schedule one
  (the old blog ran a daily GitHub Action that called a Netlify build hook).
- Put an article's images in `src/assets/writing/<slug>/` and link them relatively
  (`../../../assets/writing/<slug>/photo.jpg`); they get a responsive `srcset` at build.
- Reading time is estimated from the text. Code blocks are highlighted in both themes.

Without a translation, the EN/JA toggle on an article goes to the other language's list,
and the article's own "read in the other language" link is hidden.

The articles of the old blog (`~/astro-blog`) were imported once: drafts were left out, and
eight Gyazo images that Gyazo no longer serves were dropped.

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
- `[BRACKETED]` text across the pages: dates and the hosting provider.
- Links that point to `#`: the case studies and the Writing rows that have no article yet.
