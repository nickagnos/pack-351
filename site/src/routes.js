// The six real pages of the site, in one place.
//
// This file is the single source of truth for every URL: the nav and footer link lists,
// the <title>/description/canonical/og tags baked into each prerendered HTML file, and
// sitemap.xml. It is imported by the React app, by prerender.js (plain Node, after the
// build) and by vite.config.js, so it must stay free of JSX, of CSS imports and of
// `import.meta.env` — anything Node can't evaluate on its own breaks the build script.
// Base-URL awareness therefore lives in the callers: pagePath() takes the base as an
// argument, and src/asset.js wraps it for the browser.
//
// Each page is a real document at a real path (/about, /candy-canes, …). There is no
// client-side router — see App.jsx.

export const SITE_URL = 'https://pack351tx.org';
export const SITE_NAME = 'Cub Scout Pack 351';

// Scouting America's official online registration for THIS pack. The unitId is Pack 351's own
// — verified against BeAScout's public unit search for ZIP 75771, which lists "Pack 0351
// Central Baptist Church, 13745 FM Rd 16, Lindale, TX 75771" with this exact id behind its
// "Apply Now" button. If it ever needs re-checking, search that ZIP again rather than trusting
// the string here.
//
// Heads up for anyone linking it: it redirects to my.scouting.org and an unauthenticated
// visitor lands on a Scouting America login / create-account screen that never says "Pack 351".
// That's the official flow, but it means the link is for families who have already decided —
// the interest form on /info is the softer path.
export const BEASCOUT_REGISTER_URL =
  'https://beascout.scouting.org/registration?unitId=0b3e8cfb-0aa2-4d75-ad29-6c84c76bc74f';

// navLabel / footerLabel are null where a page is linked some other way: home is the logo
// in both bars, and Join is the gold call-to-action button rather than a plain nav link.
// Order here is the order the footer's Quick Links column renders in.
export const ROUTES = [
  {
    slug: 'home',
    navLabel: null,
    footerLabel: null,
    title: 'Pack 351 · Cub Scouts · Lindale, TX',
    description: 'Cub Scout Pack 351 in Lindale, TX — building friendships, skills, and memories for K–5th graders.',
    shareDescription: 'Cub Scouts for K–5th graders in Lindale, TX. Campouts, the Pinewood Derby, the Raingutter Regatta — and a welcome for every family. Drop in to a Tuesday meeting.',
    image: '/hero/trail.jpg',
    imageWidth: 1800,
    imageHeight: 1200,
    imageAlt: 'Cub Scouts and adult leaders carrying camping gear across a sunny meadow',
  },
  {
    slug: 'about',
    navLabel: 'About',
    footerLabel: 'About',
    title: 'About · Pack 351 · Cub Scouts · Lindale, TX',
    description: 'A family-run Cub Scout pack chartered by Central Baptist Church in Lindale, TX. Meet our dens — Lion through Arrow of Light — and see how the Pack is organized.',
    image: '/photos/photo-den-meeting.jpg',
    imageWidth: 1280,
    imageHeight: 853,
    imageAlt: 'Cub Scouts and a leader working on a project together around a table at a den meeting',
  },
  {
    slug: 'events',
    navLabel: 'Events',
    footerLabel: 'Events',
    title: 'Events · Pack 351 · Cub Scouts · Lindale, TX',
    description: 'A year with Pack 351: den meetings most Tuesday nights, campouts, the Pinewood Derby, the Raingutter Regatta, and the Hideaway candy cane fundraiser.',
    image: '/photos/photo-pack-year.jpg',
    imageWidth: 1400,
    imageHeight: 949,
    imageAlt: 'Cub Scouts and adult leaders setting up a tent in a meadow',
  },
  {
    slug: 'candy-canes',
    navLabel: 'Hideaway Candy Canes',
    footerLabel: 'Candy Canes',
    title: 'Hideaway Candy Canes · Pack 351 · Cub Scouts · Lindale, TX',
    description: 'Every December our Scouts plant giant 5-foot lawn candy canes across the Hideaway community. Order form, how it works, and when ordering opens.',
    // The share card can't be the animated SVG - Facebook needs a static raster - so this is
    // the still PNG rendered from it. Regenerate both together; see CLAUDE.md.
    image: '/candy-cane-scene.png',
    imageWidth: 1200,
    imageHeight: 800,
    imageAlt: 'Illustration of a house on a winter night with large candy canes planted in a row along the front lawn',
  },
  {
    slug: 'info',
    navLabel: 'Info',
    footerLabel: 'Info',
    title: 'Info · Pack 351 · Cub Scouts · Lindale, TX',
    description: 'Forms, links, the Cub Scout uniform guide, answers to the questions new families actually ask, a first-30-days checklist, and how to get on Band.',
    image: '/photos/photo-handbook.jpg',
    imageWidth: 1400,
    imageHeight: 960,
    imageAlt: 'Cub Scouts and parents working through an activity together at a table',
  },
  {
    // Not a content page any more (2026-08-20): /join IS the join action, so it forwards
    // straight to Scouting America's registration. GitHub Pages can't 301, so `redirect`
    // makes prerender.js emit a meta refresh and JoinPage.jsx backs it with a script and a
    // visible fallback link. noindex keeps a bare forwarding page out of search results
    // (and out of the sitemap - prerender.js filters on it); the og: fields stay so a
    // shared pack351tx.org/join still unfurls with our card, not a blank one.
    slug: 'join',
    navLabel: null,
    footerLabel: null,
    noindex: true,
    redirect: BEASCOUT_REGISTER_URL,
    title: 'Join · Pack 351 · Cub Scouts · Lindale, TX',
    description: "Register your scout with Cub Scout Pack 351 in Lindale, TX through Scouting America's official Be A Scout registration.",
    image: '/photos/photo-camping.jpg',
    imageWidth: 1400,
    imageHeight: 937,
    imageAlt: 'Cub Scouts sitting around a campsite in a grassy meadow',
  },
];

// Not a page anyone navigates to: GitHub Pages serves dist/404.html for any path that
// doesn't resolve to a file. It's prerendered from the same App as the rest so it keeps
// the nav and footer, and carries noindex so the 404 body never gets indexed under
// whatever nonsense URL produced it.
export const NOT_FOUND = {
  slug: '404',
  navLabel: null,
  footerLabel: null,
  noindex: true,
  title: 'Page not found · Pack 351 · Cub Scouts · Lindale, TX',
  description: 'That page doesn’t exist on the Pack 351 site.',
  image: '/hero/trail.jpg',
  imageWidth: 1800,
  imageHeight: 1200,
  imageAlt: 'Cub Scouts and adult leaders carrying camping gear across a sunny meadow',
};

// Everything that gets written as an HTML file. Only ROUTES goes in the sitemap.
export const ALL_PAGES = [...ROUTES, NOT_FOUND];

export const NAV_LINKS = ROUTES.filter(r => r.navLabel);
export const FOOTER_LINKS = ROUTES.filter(r => r.footerLabel);

export const routeFor = (slug) => ALL_PAGES.find(r => r.slug === slug);

// The id on the Info page's interest-form section. It lives here, with the rest of the URL
// vocabulary, because it IS part of a URL: "Get Info" CTAs point at /info#interest-form.
// A bare fragment that matches no element scrolls nowhere and reports no error, so renaming
// this string in one place and not the others would fail silently. Change it here and
// InfoPage.jsx follows. (It was the Join page's form id until /join became a redirect.)
export const INTEREST_FORM_ID = 'interest-form';

// The Pack's own interest form, recovered from the old Google Sites joining page where it was
// embedded rather than linked - which is why the 2026-08-15 content audit missed it. Responses
// land in the Pack's Google account, so if it ever stops working that's a Google-side fix, not
// a code one. Embedded on /info, below the hero.
export const INTEREST_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSebpfiiOkjATRM82sql_qjqakCm2iDDT7Fmywpu1_so7iL8qA/viewform';
// The old Google Sites page embedded this same form at 1392, but that clips Google's own
// "Never submit passwords" footer and leaves the frame with an internal scrollbar, so this runs
// slightly taller. Re-measure if questions are added or removed - the whole form has to fit,
// footer included, or families get a scrollbar inside a scrollbar.
// Unlike the candy cane order form there's no open/closed flag here: this one stays open year
// round. If it ever does get closed, the embed will read "no longer accepting responses" with
// nothing explaining why, so add a status banner like the candy canes page has.
export const INTEREST_FORM_HEIGHT = 1490;

// Slugs whose links land on a section rather than the top of the page. pageHref() reads this
// as its default. Empty since 2026-08-20: the messaging was split — anything labelled "Join"
// goes to BEASCOUT_REGISTER_URL (and /join itself redirects there), while "Get Info" CTAs go
// to the interest form explicitly via pageHref('info', INTEREST_FORM_ID). A generated link
// that said one thing and did the other is what this split removed.
export const PAGE_ANCHORS = {};

// The path a slug lives at. `base` always ends in a slash (Vite's BASE_URL convention),
// and home is the base itself rather than "/home".
export const pagePath = (slug, base = '/') => base + (slug === 'home' ? '' : slug);

// The file prerender.js writes into dist/. Flat files, not directories: GitHub Pages
// resolves /about to about.html directly, whereas about/index.html would 301 /about to
// /about/ and add a redirect hop to every short link.
export const pageFile = (slug) => (slug === 'home' ? 'index.html' : `${slug}.html`);

// Which page a URL is asking for. Used by the browser entry point to hydrate the same
// markup the build rendered — including on 404.html, which the server hands back under
// the URL that missed, so an unknown path has to resolve to '404' on both sides.
export function slugFromPath(pathname, base = '/') {
  let p = String(pathname);
  if (base !== '/' && p.startsWith(base)) p = p.slice(base.length - 1);
  p = p.replace(/\.html$/, '').replace(/^\/+/, '').replace(/\/+$/, '');
  if (p === '' || p === 'index') return 'home';
  return ROUTES.some(r => r.slug === p) ? p : '404';
}
