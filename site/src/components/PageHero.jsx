import React from 'react';

// Warm, image-forward hero used at the top of every interior page — echoes the
// cream clay-diorama landing so the whole site reads as one designed world.
export default function PageHero({ eyebrow, title, sub, image, imageAlt, actions }) {
  return (
    <div className="page-hero">
      <div className="container">
        <div className={image ? 'page-hero-grid' : undefined}>
          <div>
            {eyebrow && <span className="eyebrow" style={{ marginBottom: 12 }}>{eyebrow}</span>}
            <h1 className="page-hero-title">{title}</h1>
            {sub && <p className="page-hero-sub">{sub}</p>}
            {actions && <div className="page-hero-actions">{actions}</div>}
          </div>
          {image && (
            <div className="page-hero-img-wrap">
              <img src={image} alt={imageAlt || ''} loading="lazy" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
