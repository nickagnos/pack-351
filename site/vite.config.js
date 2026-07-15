import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Served from a GitHub Pages *project* site at https://<user>.github.io/pack-351/,
// so the production build needs base '/pack-351/'. Local dev/preview stays at '/'.
// All runtime asset URLs go through src/asset.js (import.meta.env.BASE_URL), so
// they resolve correctly under either base. If you move to a custom domain or a
// user/org page served at the root, change the build base back to '/'.
export default defineConfig(({ command, isPreview }) => ({
  base: command === 'build' || isPreview ? '/pack-351/' : '/',
  plugins: [react()],
}));
