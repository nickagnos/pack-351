import React from 'react';
import ScrollWorld from '../components/ScrollWorld';

// The Home page is the scroll-scrubbed clay-diorama cinematic — a "fly through a year
// with Pack 351." Practical info (facts, meeting time, events, forms) lives on the
// About / Events / Join / Resources pages. The finale scene carries the Join CTA.
export default function HomePage({ go }) {
  return <ScrollWorld go={go} />;
}
