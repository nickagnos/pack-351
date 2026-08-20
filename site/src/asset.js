import { pagePath, JOIN_FORM_ID } from './routes.js';

// Prefix a public asset path with Vite's base URL so absolute asset paths work
// whether the site is served from the domain root ('/') or a project subpath
// (e.g. GitHub Pages at '/pack-351/'). import.meta.env.BASE_URL always ends
// with a trailing slash, so we strip the leading slash off the given path.
export const asset = (p) => import.meta.env.BASE_URL + String(p).replace(/^\//, '');

// The href for another page of the site — '/', '/about', '/candy-canes'. Every internal
// link goes through this rather than hardcoding a path, for the same reason asset() exists:
// the base lives in exactly one place. routes.js can't read import.meta.env itself (Node
// imports it during the build), so the base is applied here. Pass `hash` for a section:
// pageHref('resources', 'uniform') → '/resources#uniform'. A leading '#' on the hash is
// stripped rather than doubled, so callers can pass it either way.
export const pageHref = (slug, hash) =>
  pagePath(slug, import.meta.env.BASE_URL) +
  (hash ? '#' + String(hash).replace(/^#/, '') : '');

// Where the "Join Now" / "Join Pack 351" buttons go. Not the top of the Join page: someone
// who clicks a join button has already decided, so they land on the interest form itself
// rather than on the preamble above it. The three ways to join are still up the page, and
// the footer's "Join Us" quick link still points at /join for anyone browsing rather than
// converting.
export const JOIN_CTA_HREF = pageHref('join', JOIN_FORM_ID);
