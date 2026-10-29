// Crawl the built site in dist/ and check that every internal link, asset and #anchor resolves.
// Also checks that each page's EN/JA toggle points at an existing page in its language.
// usage: node scripts/check-links.mjs [distDir]
import fs from 'node:fs';
import path from 'node:path';

const dist = path.resolve(process.argv[2] ?? 'dist');
const files = (dir) =>
	fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
		const p = path.join(dir, e.name);
		return e.isDirectory() ? files(p) : [p];
	});
const all = files(dist);
const pages = all.filter((f) => f.endsWith('.html'));
const styles = all.filter((f) => f.endsWith('.css'));

// Absolute links to the site itself (hreflang, sitemap) count as internal.
const site = fs.readFileSync(path.join(dist, 'sitemap-index.xml'), 'utf8').match(/<loc>(https?:\/\/[^/<]+)/)?.[1];
if (!site) throw new Error('No site origin found in sitemap-index.xml');

const attr = (tag, name) => tag.match(new RegExp(`\\s${name}="([^"]*)"`))?.[1];
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"');
const urlOf = (file) => '/' + path.relative(dist, file).replace(/index\.html$/, '').split(path.sep).join('/');

// Map a site path to the file that serves it, the way a static host does.
const resolveFile = (pathname) => {
	const p = path.join(dist, decodeURIComponent(pathname));
	if (pathname.endsWith('/')) return fs.existsSync(path.join(p, 'index.html')) ? path.join(p, 'index.html') : null;
	return fs.existsSync(p) && fs.statSync(p).isFile() ? p : null;
};

const ids = new Map();
const idsOf = (file) => {
	if (!ids.has(file)) {
		const html = fs.readFileSync(file, 'utf8');
		ids.set(file, new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
	}
	return ids.get(file);
};
const langOf = (file) => fs.readFileSync(file, 'utf8').match(/<html[^>]*\slang="([^"]+)"/)?.[1];

const errors = [];
let checked = 0;
let placeholders = 0;
const external = new Set();

const check = (from, raw, kind) => {
	const ref = decode(raw.trim());
	if (!ref || /^(mailto:|tel:|data:|javascript:)/.test(ref)) return;
	if (/^https?:\/\//.test(ref) && new URL(ref).origin !== site) {
		external.add(ref);
		return;
	}
	checked++;
	if (ref === '#') placeholders++;
	const url = new URL(ref, site + urlOf(from));
	const target = url.pathname === urlOf(from) ? from : resolveFile(url.pathname);
	if (!target) return errors.push(`${urlOf(from)}: ${kind} ${ref} -> no file for ${url.pathname}`);
	const hash = decodeURIComponent(url.hash.slice(1));
	if (hash && target.endsWith('.html') && !idsOf(target).has(hash))
		errors.push(`${urlOf(from)}: ${kind} ${ref} -> no id="${hash}" in ${urlOf(target)}`);
};

const toggles = [];
for (const page of pages) {
	const html = fs.readFileSync(page, 'utf8');
	for (const [tag] of html.matchAll(/<(a|link|img|script|source)\b[^>]*>/g)) {
		for (const name of ['href', 'src']) {
			const value = attr(tag, name);
			if (value !== undefined) check(page, value, `${name}`);
		}
		const srcset = attr(tag, 'srcset');
		if (srcset) for (const part of srcset.split(',')) check(page, part.trim().split(/\s+/)[0], 'srcset');
	}

	// `/` only redirects to /en/ or /ja/, so it has no header.
	if (urlOf(page) === '/') continue;
	const toggle = html.match(/<div class="lang-switch[^"]*"[^>]*>([\s\S]*?)<\/div>/)?.[1];
	if (!toggle) {
		errors.push(`${urlOf(page)}: no EN/JA toggle`);
		continue;
	}
	for (const [tag] of toggle.matchAll(/<a\b[^>]*>/g)) {
		const href = attr(tag, 'href');
		const hreflang = attr(tag, 'hreflang');
		const target = href && resolveFile(new URL(href, site).pathname);
		const ok = Boolean(target) && langOf(target) === hreflang;
		toggles.push(`${urlOf(page)} [${hreflang}] -> ${href}${ok ? '' : '  BROKEN'}`);
		if (!ok) errors.push(`${urlOf(page)}: ${hreflang} toggle -> ${href} is missing or not a ${hreflang} page`);
	}
}

for (const css of styles) {
	for (const [, raw] of fs.readFileSync(css, 'utf8').matchAll(/url\(([^)]+)\)/g)) {
		const ref = raw.replace(/["']/g, '');
		if (ref.startsWith('data:')) continue;
		checked++;
		if (!resolveFile(new URL(ref, `${site}/${path.relative(dist, css)}`).pathname))
			errors.push(`${path.relative(dist, css)}: url(${ref}) -> missing`);
	}
}

console.log(`Pages: ${pages.length}, internal references checked: ${checked}, placeholder "#" links: ${placeholders}`);
console.log(`EN/JA toggles:\n  ${toggles.join('\n  ')}`);
console.log(`External links (not fetched):\n  ${[...external].sort().join('\n  ')}`);
if (errors.length) {
	console.error(`\n${errors.length} broken:\n  ${errors.join('\n  ')}`);
	process.exit(1);
}
console.log('\nAll internal links and anchors resolve.');
