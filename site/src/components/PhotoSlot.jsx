import React from 'react';

export default function PhotoSlot({ src, alt = '', label, caption, bg = '#b8c6d8', style = {}, captionSize = 20 }) {
  return (
    <div className="ps" style={{ background: bg, ...style }}>
      {src
        ? <img src={src} alt={alt} />
        : <div className="ps-indicator">{label}</div>
      }
      {caption && (
        <div className="ps-caption">
          <div className="ps-caption-text" style={{ fontSize: captionSize }}>{caption}</div>
        </div>
      )}
    </div>
  );
}
