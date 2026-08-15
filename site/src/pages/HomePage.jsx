import React from 'react';
import HomeHero from '../components/HomeHero';

// The Home page is the scroll-scrubbed photographic cinematic: a "fly through a year
// with Pack 351." Practical info (facts, meeting time, events, forms) lives on the
// About / Events / Join / Resources pages. The finale scene carries the Join CTA.
export default function HomePage({ go }) {
  return <HomeHero go={go} />;
}
