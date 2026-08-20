import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';

// The server half of the build. Deliberately does NOT import styles.css — that import stays
// in main.jsx, so the client build is what emits the stylesheet and links it into the HTML
// template. Importing it here too would have the SSR build emit a second, unreferenced copy.
export function render(slug) {
  return renderToString(<App page={slug} />);
}
