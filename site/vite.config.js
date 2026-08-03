import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';

// Vite copies public/ verbatim, which would publish our internal notes alongside the site
// (PHOTOS-NEEDED.md, ranks/README.md, scroll-world/README.md). Those docs are written for
// whoever maintains this repo, and PHOTOS-NEEDED.md in particular spells out that every
// image is AI-generated placeholder art - not something to serve to families. They stay in
// public/ because that's where they're useful (next to the folder you drop photos into);
// this just keeps them out of the build.
function stripDocsFromBuild() {
  return {
    name: 'strip-docs-from-build',
    apply: 'build',
    closeBundle() {
      const dist = path.resolve(__dirname, 'dist');
      const walk = (dir) => {
        if (!fs.existsSync(dir)) return;
        for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
          const p = path.join(dir, e.name);
          if (e.isDirectory()) walk(p);
          else if (e.name.toLowerCase().endsWith('.md')) fs.rmSync(p);
        }
      };
      walk(dist);
    },
  };
}

// Served from a GitHub Pages *project* site at https://<user>.github.io/pack-351/,
// so the production build needs base '/pack-351/'. Local dev/preview stays at '/'.
// All runtime asset URLs go through src/asset.js (import.meta.env.BASE_URL), so
// they resolve correctly under either base. If you move to a custom domain or a
// user/org page served at the root, change the build base back to '/'.
export default defineConfig(({ command, isPreview }) => ({
  base: command === 'build' || isPreview ? '/pack-351/' : '/',
  plugins: [react(), stripDocsFromBuild()],
}));
