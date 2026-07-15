// Prefix a public asset path with Vite's base URL so absolute asset paths work
// whether the site is served from the domain root ('/') or a project subpath
// (e.g. GitHub Pages at '/pack-351/'). import.meta.env.BASE_URL always ends
// with a trailing slash, so we strip the leading slash off the given path.
export const asset = (p) => import.meta.env.BASE_URL + String(p).replace(/^\//, '');
