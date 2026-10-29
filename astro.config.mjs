// @ts-check
import { rename, rm } from 'node:fs/promises';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { satteri } from '@astrojs/markdown-satteri';

// [SITE URL]: the production domain is not decided yet. Replace before deploy;
// the sitemap and hreflang links are built from it.
const site = 'https://example.com';

// https://astro.build/config
export default defineConfig({
	site,
	trailingSlash: 'always',
	i18n: {
		locales: ['en', 'ja'],
		defaultLocale: 'en',
		// Every page lives under /en/ or /ja/; src/pages/index.astro picks one for `/`.
		routing: { prefixDefaultLocale: true, redirectToDefaultLocale: false },
	},
	image: {
		// Article images get a srcset, so a phone doesn't download the full-size photo.
		layout: 'constrained',
	},
	markdown: {
		// Keep the copy's straight quotes and apostrophes exactly as written.
		processor: satteri({ features: { smartPunctuation: false } }),
		// Code blocks carry both themes' colors; global.css switches to the dark set with the site.
		shikiConfig: { themes: { light: 'github-light', dark: 'github-dark' } },
	},
	vite: {
		plugins: [
			{
				// With trailingSlash: 'always', `astro dev` answers /en with a 404 (a warning about
				// links missing the slash), while the hosts redirect it to /en/. Redirect in dev too.
				// Astro puts its check at the front of the stack, so this goes in front of it.
				name: 'dev-trailing-slash',
				apply: 'serve',
				configureServer: (server) => () => {
					server.middlewares.stack.unshift({
						route: '',
						handle: (req, res, next) => {
							const [path, query] = (req.url ?? '/').split(/\?(.*)/s);
							if (path.endsWith('/') || /\.\w+$/.test(path) || /^\/(@|_|node_modules\/|src\/)/.test(path)) return next();
							res.writeHead(308, { Location: `${path}/${query ? `?${query}` : ''}` });
							res.end();
						},
					});
				},
			},
		],
		build: {
			// Keep font files as separate, cacheable files instead of base64 in the CSS.
			assetsInlineLimit: (file) => (/\.woff2?$/.test(file) ? false : undefined),
		},
	},
	integrations: [
		sitemap({
			i18n: { defaultLocale: 'en', locales: { en: 'en', ja: 'ja' } },
			// Leave out the language redirect at `/` and the 404 pages.
			filter: (page) => {
				const path = new URL(page).pathname;
				return path !== '/' && !/\/404\/?$/.test(path);
			},
		}),
		{
			// Astro writes src/pages/ja/404.astro to ja/404/index.html, but Cloudflare's
			// 404-page handling looks for the nearest 404.html, so move it to ja/404.html.
			name: 'ja-404',
			hooks: {
				'astro:build:done': async ({ dir }) => {
					await rename(new URL('ja/404/index.html', dir), new URL('ja/404.html', dir));
					await rm(new URL('ja/404/', dir), { recursive: true });
				},
			},
		},
	],
});
