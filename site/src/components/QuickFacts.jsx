import React from 'react';

// The at-a-glance pack facts, rehomed from the old Home page. Meeting time,
// location, grade range, and cost.
const FACTS = [
  { icon: '📅', head: 'Most Tuesdays', sub: '6:00 – 7:00 PM' },
  { icon: '📍', head: 'Central Baptist Church', sub: 'Lindale, TX' },
  { icon: '🎓', head: 'K – 5th Grade', sub: 'Boys & girls welcome' },
  // $85 is Scouting America's published national fee for Cub Scouts (effective May 2024).
  // The East Texas Area Council fee is on top and isn't published anywhere public, so the
  // band deliberately shows the part we can source rather than an invented total. See TODO.md.
  { icon: '💰', head: '$85 / year + council fee', sub: 'Scholarships available' },
];

export default function QuickFacts({ id }) {
  return (
    <div className="quick-facts-band" id={id}>
      <div className="container">
        <div className="quick-facts">
          {FACTS.map(({ icon, head, sub }) => (
            <div key={head} className="quick-fact">
              <div className="quick-fact-icon">{icon}</div>
              <div className="quick-fact-head">{head}</div>
              <div className="quick-fact-sub">{sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
