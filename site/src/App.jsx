import React from 'react';
import SiteNav from './components/SiteNav';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import EventsPage from './pages/EventsPage';
import JoinPage from './pages/JoinPage';
import ResourcesPage from './pages/ResourcesPage';

const getPage = () => window.location.hash.replace('#/', '') || 'home';

export default function App() {
  const [page, setPage] = React.useState(getPage);

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
