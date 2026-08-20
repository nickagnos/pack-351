import { pagePath } from './routes.js';

// Prefix a public asset path with Vite's base URL so absolute asset paths work
// whether the site is served from the domain root ('/') or a project subpath
// (e.g. GitHub Pages at '/pack-351/'). import.meta.env.BASE_URL always ends
// with a trailing slash, so we strip the leading slash off the given path.
export const asset = (p) => import.meta.env.BASE_URL + String(p).replace(/^\//, '');

// The href for another page of the site — '/', '/about', '/candy-canes'. Every internal
// link goes through this rather than hardcoding a path, for the same reason asset() exists:
// the base lives in exactly one place. routes.js can't read import.meta.env itself (Node
// imports it during the build), so the base is applied here.
export const pageHref = (slug) => pagePath(slug, import.meta.env.BASE_URL);
