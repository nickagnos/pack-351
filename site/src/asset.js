import { pagePath, PAGE_ANCHORS } from './routes.js';

// Prefix a public asset path with Vite's base URL so absolute asset paths work
// whether the site is served from the domain root ('/') or a project subpath
// (e.g. GitHub Pages at '/pack-351/'). import.meta.env.BASE_URL always ends
// with a trailing slash, so we strip the leading slash off the given path.
export const asset = (p) => import.meta.env.BASE_URL + String(p).replace(/^\//, '');

// The href for another page of the site — '/', '/about', '/candy-canes'. Every internal
// link goes through this rather than hardcoding a path, for the same reason asset() exists:
// the base lives in exactly one place. routes.js can't read import.meta.env itself (Node
// imports it during the build), so the base is applied here. Pass `hash` for a section:
// pageHref('info', 'uniform') → '/info#uniform'. A leading '#' is stripped rather
// than doubled, so callers can pass it either way.
//
// `hash` defaults to the page's own anchor from PAGE_ANCHORS — currently empty, so every
// generated link is a bare path, but the mechanism stays: add an entry there and every
// mapped link to that slug (ROUTES/FOOTER_LINKS) gains the anchor with no call-site changes.
// Getting a fragment wrong is silent: one that matches no element scrolls nowhere and
// reports no error. Pass '' to force the bare path when a default anchor exists.
export const pageHref = (slug, hash = PAGE_ANCHORS[slug]) =>
  pagePath(slug, import.meta.env.BASE_URL) +
  (hash ? '#' + String(hash).replace(/^#/, '') : '');
