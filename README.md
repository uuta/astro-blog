# uuta

Personal site of uuta, in English and Japanese. Static [Astro](https://astro.build) build,
deployed by Netlify (`netlify.toml`): every push to `main` goes live, every pull request
gets a deploy preview, and `.github/workflows/scheduled-build.yml` rebuilds daily so new
Zenn articles appear. The approved design mock lives in `design/mock/` and is the reference
for layout, copy and colors.

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

Text contrast: `scripts/contrast.js` is a function to evaluate in a browser tab on the
preview server (for example with the chrome-devtools MCP `evaluate_script` tool). It loads
every route in the sitemap, the 404 pages and `/` in both themes and lists text below WCAG AA.

Redirects and 404 pages only work on Netlify; check them on a pull request's deploy preview.

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
aiDisclosure: none      # required: none, ai-assisted, ai-generated or autonomous (W3C proposal);
                        # shown as a label next to the date and as ai-disclosure on <article>
key: some-article       # optional; the same key on an EN and a JA file links the translations
translated: true        # optional; on the translated side of a pair, shows a note linking the original
tags: [Agentic workflow] # optional; only used by search
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
- Plain HTML works inside the Markdown for layouts it can't express. Two styled blocks are
  ready in `ArticlePage.astro`: `<div class="pipeline">` with `<div class="step">` cards
  (`step--agent`, `step--gate`; `<p class="step-who">` and `<p class="step-what">` inside),
  and `<dl class="permissions">`. Markdown isn't parsed inside HTML, and a blank line ends
  the block.

Without a translation, the EN/JA toggle on an article goes to the other language's list,
and the article's own "read in the other language" link is hidden.

The articles of the old blog (`~/astro-blog`) were imported once: drafts were left out, and
eight Gyazo images that Gyazo no longer serves were dropped.

### When an article breaks in dev after a schema change

A dev server that keeps running while `src/content.config.ts` changes can save articles
to its cache with the old schema, so a new field comes back `undefined` even after a
restart. Stop the dev server, then run `rm -rf .astro && npm run dev`. `.astro/` is
generated and safe to delete.

## Routes

Every page lives under `/en/` or `/ja/`. `/` has no content of its own: a script in its
`<head>` sends the visitor to the language they last picked with the EN/JA toggle
(saved in `localStorage`), otherwise to `/ja/` when the browser's first language is
Japanese and to `/en/` for anything else, keeping `?query` and `#hash`. Without
JavaScript a meta refresh goes to `/en/`, and the page shows links to both homes.

Unknown paths get a 404 page in the site's design: `/ja/...` gets the Japanese one
(`dist/ja/404.html`), everything else the English one (`dist/404.html`). Netlify serves
`404.html` itself, and `public/_redirects` sends unknown `/ja/` paths to `ja/404.html`.
Astro writes `src/pages/ja/404.astro` to `ja/404/index.html`, so a small hook in
`astro.config.mjs` moves it to `ja/404.html` after each build.

The old blog that used to live on this Netlify site had its articles at `/posts/<slug>/`.
`public/_redirects` sends each one to its new page (301), and the old list, tag, search and
about pages to the matching new ones.

## Before going live

- The privacy policy says the site uses PostHog, but no PostHog snippet is installed yet.
- With a custom domain, change `site` in `astro.config.mjs`; the sitemap, canonical and
  hreflang links are built from it.

## Logo and favicon

- `public/favicon.svg` is drawn on a 16-unit grid so its eye holes land on whole pixels at
  16px; `favicon-32.png` and `apple-touch-icon.png` are rendered from it with sharp.
- `brand/logo.svg` is the same mask with smooth eyes for large sizes, exported as
  `logo-512/1024/2048.png`. `brand/logo-mark.svg` (and `logo-mark-2048.png`) is the mask
  alone, with the eyes cut out, for any background.
