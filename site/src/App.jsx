import React from 'react';
import SiteNav from './components/SiteNav';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import EventsPage from './pages/EventsPage';
import JoinPage from './pages/JoinPage';
import ResourcesPage from './pages/ResourcesPage';

const getPage = () => window.location.hash.replace('#/', '') || 'home';

// Hash routing never reloads the document, so the <title> in index.html would otherwise
// stick on every page — leaving all five identical in tabs, history and bookmarks.
const TITLES = {
  home:      'Pack 351 · Cub Scouts · Lindale, TX',
  about:     'About · Pack 351 · Cub Scouts · Lindale, TX',
  events:    'Events · Pack 351 · Cub Scouts · Lindale, TX',
  join:      'Join · Pack 351 · Cub Scouts · Lindale, TX',
  resources: 'Resources · Pack 351 · Cub Scouts · Lindale, TX',
};

export default function App() {
  const [page, setPage] = React.useState(getPage);

  React.useEffect(() => {
    document.title = TITLES[page] || TITLES.home;
  }, [page]);

  const go = React.useCallback((p) => {
    setPage(p);
    window.location.hash = '/' + p;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  React.useEffect(() => {
    const h = () => setPage(getPage());
    window.addEventListener('hashchange', h);
    return () => window.removeEventListener('hashchange', h);
  }, []);

  return (
    <>
      <SiteNav current={page} go={go} />
      {page === 'home'      && <HomePage      go={go} />}
      {page === 'about'     && <AboutPage     go={go} />}
      {page === 'events'    && <EventsPage    go={go} />}
      {page === 'join'      && <JoinPage      go={go} />}
      {page === 'resources' && <ResourcesPage go={go} />}
    </>
  );
}
