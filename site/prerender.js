// Turns the single-page build into seven real HTML documents (six routes + 404.html).
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

// The real pixel size of a JPEG or PNG, read straight out of the header. No dependency:
// both formats we ship put their dimensions somewhere cheap to reach, and pulling an image
// library into a build that otherwise needs none is a bad trade for twenty lines.
function imageSize(file) {
  const buf = fs.readFileSync(file);
  // PNG: 8-byte signature, then the IHDR chunk, whose first two fields are the dimensions.
  if (buf.length > 24 && buf.readUInt32BE(0) === 0x89504e47) {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }
  // JPEG: walk the marker segments to the frame header. No fixed offset works - EXIF blocks
  // and colour profiles sit between the start of the file and the frame. SOF0-SOF15 carry
  // the size; C4/C8/CC share that range but are Huffman/arithmetic tables, not frames.
  if (buf.length > 4 && buf.readUInt16BE(0) === 0xffd8) {
    let off = 2;
    while (off + 9 < buf.length) {
      if (buf[off] !== 0xff) { off++; continue; }   // resync past padding
      const marker = buf[off + 1];
      if (marker === 0xff) { off++; continue; }     // fill byte
      // Standalone markers carry no length field, so they can't be skipped by one.
      if (marker === 0x01 || (marker >= 0xd0 && marker <= 0xd9)) { off += 2; continue; }
      if (marker >= 0xc0 && marker <= 0xcf &&
          marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
        return { height: buf.readUInt16BE(off + 5), width: buf.readUInt16BE(off + 7) };
      }
      off += 2 + buf.readUInt16BE(off + 2);
    }
  }
  return null;
}

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');

// The two markers index.html carries around the home page's own head tags. Everything
// between them is replaced per page; everything outside is shared and copied verbatim,
// which is how the legacy-hash shim and the static og: tags reach all seven files.
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

// og:image:width/height are what Facebook lays a share card out with *before* it downloads
// the picture, so a stale number renders the preview at the wrong shape - and it fails
// silently, on someone else's server, long after the commit. The numbers are hand-written in
// routes.js, and the Brand Center licence forbids cropping and pushes every replacement
// through a downscale, which is precisely the operation that changes them. So check the
// declarations against the files rather than trusting them. Runs after the template guards
// above so a build that skipped `vite build` reports that, not a missing image.
for (const route of ALL_PAGES) {
  const file = path.join(dist, route.image.replace(/^\//, ''));
  const real = imageSize(file);
  if (!real) {
    throw new Error(
      `${route.image}: could not read its dimensions - only JPEG and PNG are parsed here, ` +
      `and og:image has to be a raster the scrapers accept anyway (see CLAUDE.md).`
    );
  }
  if (real.width !== route.imageWidth || real.height !== route.imageHeight) {
    throw new Error(
      `${route.image} is ${real.width}x${real.height}, but src/routes.js declares ` +
      `${route.imageWidth}x${route.imageHeight} for /${route.slug}. Update imageWidth/` +
      `imageHeight there to match the file, then re-scrape in Facebook's Sharing Debugger.`
    );
  }
}
console.log(`verified og:image dimensions for ${ALL_PAGES.length} pages`);

function head(route) {
  const url = SITE_URL + pagePath(route.slug);
  const tags = [
    `<title>${esc(route.title)}</title>`,
    `<meta name="description" content="${esc(route.description)}" />`,
    // A redirect route (currently /join → Scouting America registration) forwards in the
    // head, before the body even parses; JoinPage.jsx backs this with a script and a visible
    // link for anything that ignores meta refresh. GitHub Pages can't serve a real 301.
    route.redirect ? `<meta http-equiv="refresh" content="0;url=${esc(route.redirect)}" />` : null,
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

// Only the real content pages go in the sitemap - not 404.html, and not noindex'd routes
// (the /join redirect stub). No <lastmod>: nothing here tracks when a page's content
// actually changed, and a build timestamp would claim every page changed on every deploy.
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.filter(r => !r.noindex).map(r => `  <url><loc>${SITE_URL + pagePath(r.slug)}</loc></url>`).join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);

fs.writeFileSync(path.join(dist, 'robots.txt'), `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`);
console.log('wrote sitemap.xml and robots.txt');
