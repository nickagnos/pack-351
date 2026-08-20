// Turns the single-page build into six real HTML documents.
//
// Runs last in `npm run build`, after the client build (dist/) and the SSR build (dist-ssr/).
// For every page in the manifest it renders the React tree to a string, drops it into the
// client build's index.html in place of the empty #root div, swaps the per-page head block,
// and writes dist/<slug>.html. Then it writes sitemap.xml and robots.txt from the same
// manifest, so a new page is added in exactly one place: src/routes.js.
//
// Why this exists rather than a client-side router: search engines treat #/about and / as
// the same URL, so all six pages were one page to a crawler and every share rendered the
// home card. Prerendering is also what makes section anchors work - the element the browser
// is looking for is in the HTML at parse time, before any JavaScript runs.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ALL_PAGES, ROUTES, SITE_URL, pageFile, pagePath } from './src/routes.js';
import { render } from './dist-ssr/entry-server.js';

const root = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(root, 'dist');

const esc = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');

// The two markers index.html carries around the home page's own head tags. Everything
// between them is replaced per page; everything outside is shared and copied verbatim,
// which is how the legacy-hash shim and the static og: tags reach all six files.
const HEAD_START = '<!--head-->';
const HEAD_END = '<!--/head-->';
if (!template.includes(HEAD_START) || !template.includes(HEAD_END)) {
  // Also what you see if you run this script twice: the first pass consumes the markers when
  // it overwrites dist/index.html with the home page. Re-run `npm run build`, not this alone.
  throw new Error(
    'dist/index.html has no <!--head--> / <!--/head--> markers - run `vite build` first'
  );
}
if (!template.includes('<div id="root"></div>')) {
  throw new Error('index.html is missing <div id="root"></div>');
}

function head(route) {
  const url = SITE_URL + pagePath(route.slug);
  const tags = [
    `<title>${esc(route.title)}</title>`,
    `<meta name="description" content="${esc(route.description)}" />`,
    // noindex on 404.html only: the server hands that body back under whatever bad URL was
    // requested, and there is no end to those.
    route.noindex ? '<meta name="robots" content="noindex" />' : null,
    // No canonical on 404.html - it isn't served at /404, it's served at whatever URL missed,
    // and a canonical pointing at a path that doesn't exist is worse than none.
    route.noindex ? null : `<link rel="canonical" href="${esc(url)}" />`,
    `<meta property="og:title" content="${esc(route.title)}" />`,
    `<meta property="og:description" content="${esc(route.shareDescription || route.description)}" />`,
    `<meta property="og:url" content="${esc(url)}" />`,
    `<meta property="og:image" content="${esc(SITE_URL + route.image)}" />`,
    `<meta property="og:image:width" content="${route.imageWidth}" />`,
    `<meta property="og:image:height" content="${route.imageHeight}" />`,
    `<meta property="og:image:alt" content="${esc(route.imageAlt)}" />`,
  ].filter(Boolean);
  return tags.join('\n    ');
}

for (const route of ALL_PAGES) {
  const body = render(route.slug);
  const html = template
    .slice(0, template.indexOf(HEAD_START))
    .concat(head(route))
    .concat(template.slice(template.indexOf(HEAD_END) + HEAD_END.length))
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`);
  fs.writeFileSync(path.join(dist, pageFile(route.slug)), html);
  console.log(`prerendered ${pageFile(route.slug)}`);
}

// Only the six real pages go in the sitemap - not 404.html. No <lastmod>: nothing here
// tracks when a page's content actually changed, and a build timestamp would claim every
// page changed on every deploy.
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map(r => `  <url><loc>${SITE_URL + pagePath(r.slug)}</loc></url>`).join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);

fs.writeFileSync(path.join(dist, 'robots.txt'), `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`);
console.log('wrote sitemap.xml and robots.txt');
