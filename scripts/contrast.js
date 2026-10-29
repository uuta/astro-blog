// WCAG AA text contrast check for every route in the sitemap, the 404 pages and
// the language redirect at `/`, in both themes.
// Adapted from design/mock/contrast.js. It runs in the browser: serve the build
// (`npm run preview`), open any page, and evaluate this function there, for
// example with the chrome-devtools MCP `evaluate_script` tool.
// Returns per route and theme the number of text elements checked, the lowest
// ratio found and every element below 4.5:1 (3:1 for large text and brand icons).
async () => {
	const parse = (c) => {
		let m = c.match(/^rgba?\(([^)]+)\)/);
		if (m) {
			const v = m[1].split(/[ ,/]+/).filter(Boolean).map(Number);
			return [v[0], v[1], v[2], v[3] ?? 1];
		}
		m = c.match(/^color\(srgb ([^)]+)\)/);
		if (m) {
			const v = m[1].split(/[ /]+/).filter(Boolean).map(Number);
			return [v[0] * 255, v[1] * 255, v[2] * 255, v[3] ?? 1];
		}
		return null;
	};
	const lum = ([r, g, b]) => {
		const f = (x) => {
			x /= 255;
			return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
		};
		return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
	};
	const ratio = (a, b) => {
		const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
		return (x + 0.05) / (y + 0.05);
	};
	const wait = (ms) => new Promise((r) => setTimeout(r, ms));

	const sitemap = await (await fetch('/sitemap-0.xml')).text();
	const routes = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
	routes.push('/404.html', '/ja/404.html', '/');
	// `/` redirects as soon as it runs, so check its no-JS fallback with scripts stripped.
	const rootHtml = (await (await fetch('/')).text()).replace(/<script[\s\S]*?<\/script>|<noscript>[\s\S]*?<\/noscript>/g, '');
	const out = {};
	for (const route of routes) {
		for (const theme of ['light', 'dark']) {
			const f = document.createElement('iframe');
			f.style.cssText = 'position:absolute;left:0;top:0;width:1280px;height:900px;border:0';
			if (route === '/') f.srcdoc = rootHtml;
			else f.src = route;
			document.body.appendChild(f);
			await new Promise((r) => (f.onload = r));
			const doc = f.contentDocument;
			const win = f.contentWindow;
			doc.documentElement.dataset.theme = theme;
			await doc.fonts.ready;
			await wait(300);
			const bad = [];
			let checked = 0;
			let min = Infinity;
			for (const el of doc.body.querySelectorAll('*')) {
				// Icons are checked separately; visually hidden text (.sr-only) is never seen.
				if (el.closest('svg, .sr-only')) continue;
				const own = [...el.childNodes]
					.filter((n) => n.nodeType === 3 && n.textContent.trim())
					.map((n) => n.textContent.trim())
					.join(' ');
				if (!own) continue;
				if (!el.checkVisibility({ opacityProperty: true, visibilityProperty: true })) continue;
				const cs = win.getComputedStyle(el);
				const fg = parse(cs.color);
				let bg = null;
				let e = el;
				while (e) {
					const c = parse(win.getComputedStyle(e).backgroundColor);
					if (c && c[3] > 0.5) {
						bg = c;
						break;
					}
					e = e.parentElement;
				}
				if (!bg) bg = parse(win.getComputedStyle(doc.body).backgroundColor);
				if (!fg || !bg) {
					bad.push({ text: own.slice(0, 40), error: `unparsed color ${cs.color}` });
					continue;
				}
				checked++;
				const r = ratio(fg, bg);
				min = Math.min(min, r);
				const size = parseFloat(cs.fontSize);
				const large = size >= 24 || (size >= 18.66 && +cs.fontWeight >= 700);
				if (r < (large ? 3 : 4.5)) bad.push({ text: own.slice(0, 40), ratio: +r.toFixed(2), fg: cs.color, bg: e ? win.getComputedStyle(e).backgroundColor : 'body' });
			}
			// Brand icons are graphics: they need 3:1 against their card (WCAG 1.4.11).
			for (const icon of doc.querySelectorAll('.tools svg')) {
				const r = ratio(parse(win.getComputedStyle(icon).color), parse(win.getComputedStyle(icon.closest('.card')).backgroundColor));
				if (r < 3) bad.push({ icon: icon.querySelector('title')?.textContent, ratio: +r.toFixed(2) });
			}
			// Contact icons in the footer sit on their own button background.
			for (const link of doc.querySelectorAll('.contact-icons a')) {
				const cs = win.getComputedStyle(link);
				const r = ratio(parse(cs.color), parse(cs.backgroundColor));
				if (r < 3) bad.push({ icon: link.title, ratio: +r.toFixed(2) });
			}
			out[`${route} ${theme}`] = { checked, min: +min.toFixed(2), bad };
			f.remove();
		}
	}
	return out;
};
