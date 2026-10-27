async (pages, dark) => {
  const parse = (c) => {
    let m = c.match(/^rgba?\(([^)]+)\)/);
    if (m) { const v = m[1].split(/[ ,/]+/).filter(Boolean).map(Number); return [v[0], v[1], v[2], v[3] ?? 1]; }
    m = c.match(/^color\(srgb ([^)]+)\)/);
    if (m) { const v = m[1].split(/[ /]+/).filter(Boolean).map(Number); return [v[0] * 255, v[1] * 255, v[2] * 255, v[3] ?? 1]; }
    return null;
  };
  const lum = ([r, g, b]) => { const f = (x) => { x /= 255; return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4); }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
  const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
  const out = {};
  for (const p of pages) {
    const f = document.createElement('iframe');
    f.style.cssText = 'position:absolute;left:0;top:0;width:1280px;height:900px;border:0';
    f.src = p + '.dc.html';
    document.body.appendChild(f);
    await new Promise((r) => (f.onload = r));
    const doc = f.contentDocument, win = f.contentWindow;
    await doc.fonts.ready;
    await new Promise((r) => setTimeout(r, 800));
    if (dark) { const b = doc.querySelector('button[aria-label="Switch to dark mode"]'); if (b) b.click(); await new Promise((r) => setTimeout(r, 400)); }
    const bad = [];
    for (const el of doc.querySelectorAll('.site *')) {
      if (el.closest('svg')) continue;
      const own = [...el.childNodes].filter((n) => n.nodeType === 3 && n.textContent.trim()).map((n) => n.textContent.trim()).join(' ');
      if (!own) continue;
      const cs = win.getComputedStyle(el);
      if (cs.visibility === 'hidden' || cs.display === 'none' || +cs.opacity === 0) continue;
      const fg = parse(cs.color);
      let bg = null, e = el;
      while (e) { const c = parse(win.getComputedStyle(e).backgroundColor); if (c && c[3] > 0.5) { bg = c; break; } e = e.parentElement; }
      if (!fg || !bg) { bad.push({ t: own.slice(0, 40), err: cs.color }); continue; }
      const r = ratio(fg, bg);
      const size = parseFloat(cs.fontSize), large = size >= 24 || (size >= 18.6 && +cs.fontWeight >= 600);
      if (r < (large ? 3 : 4.5)) bad.push({ t: own.slice(0, 40), r: +r.toFixed(2), fg: cs.color, bg: win.getComputedStyle(e).backgroundColor });
    }
    out[p] = { h: Math.ceil(doc.querySelector('.site').getBoundingClientRect().height), dark: doc.querySelector('.site').getAttribute('data-theme'), bad };
    f.remove();
  }
  return out;
}
