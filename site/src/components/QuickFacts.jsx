import React from 'react';

// The at-a-glance pack facts, rehomed from the old Home page. Meeting time,
// location, grade range, and cost.
const FACTS = [
  { icon: '📅', head: 'Most Mondays', sub: '6:30 – 7:30 PM' },
  { icon: '📍', head: 'Central Baptist Church', sub: 'Lindale, TX' },
  { icon: '🎓', head: 'K – 5th Grade', sub: 'Boys & girls welcome' },
  { icon: '💰', head: '$175 / year', sub: 'Scholarships available' },
];

export default function QuickFacts() {
  return (
    <div className="quick-facts-band">
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
