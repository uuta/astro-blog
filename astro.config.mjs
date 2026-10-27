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
	markdown: {
		// Keep the copy's straight quotes and apostrophes exactly as written.
		processor: satteri({ features: { smartPunctuation: false } }),
	},
	vite: {
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
