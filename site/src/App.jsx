import React from 'react';
import SiteNav from './components/SiteNav';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import EventsPage from './pages/EventsPage';
import CandyCanesPage from './pages/CandyCanesPage';
import JoinPage from './pages/JoinPage';
import ResourcesPage from './pages/ResourcesPage';
import NotFoundPage from './pages/NotFoundPage';

// There is no router. Each page is a real HTML document prerendered by prerender.js and
// served at its own path, so navigation is a plain <a href> and a full page load — which
// is also what frees the URL fragment for section anchors (/resources#uniform).
//
// `page` is a slug from routes.js. The build passes it in through entry-server.jsx; the
// browser derives the same value from location.pathname in main.jsx, so the hydrated tree
// matches the prerendered markup exactly.
const PAGES = {
  home: HomePage,
  about: AboutPage,
  events: EventsPage,
  'candy-canes': CandyCanesPage,
  join: JoinPage,
  resources: ResourcesPage,
  404: NotFoundPage,
};

export default function App({ page }) {
  const Page = PAGES[page] || NotFoundPage;
  return (
    <>
      <SiteNav current={page} />
      <Page />
    </>
  );
}
