import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import './styles.css';
import App from './App';
import { slugFromPath } from './routes.js';

const container = document.getElementById('root');
const page = slugFromPath(window.location.pathname, import.meta.env.BASE_URL);
const tree = (
  <React.StrictMode>
    <App page={page} />
  </React.StrictMode>
);

// hydrateRoot, not createRoot: the HTML for this page was already rendered at build time by
// prerender.js. createRoot would throw that markup away and re-render from scratch, which
// would undo the point of prerendering - and would leave section anchors broken again,
// because the browser looks for #uniform before React has created it.
//
// Except in dev, where nothing prerenders and #root really is empty. Hydrating an empty
// container "works" only by failing over to a client render, after filling the console with
// hydration errors that hide the real ones - so dev takes the createRoot path deliberately.
if (container.firstChild) hydrateRoot(container, tree);
else createRoot(container).render(tree);
