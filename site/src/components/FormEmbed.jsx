import React from 'react';

// A Google Form embedded in the page rather than linked out to, so families fill it in here
// instead of being bounced to Google. Two things it always needs and that drift when copied:
// the ?embedded=true suffix (without it Google serves the full chrome inside the frame), and
// the escape hatch underneath - some browsers and extensions block third-party frames outright,
// and the iframe body text only shows when frames are disabled entirely, not when one is
// blocked. That fallback link uses the bare url, not the embedded variant.
//
// A cross-origin iframe can't size itself to its content, so height is always a fixed number
// the caller measures: too short and the form gets its own scrollbar inside the page, too tall
// and there's a band of dead cream under it.
//
// `loading` defaults to lazy, which is right for a form the reader scrolls down to. Pass
// 'eager' where the form is what the reader lands on - the interest form sits directly
// below the Info hero and "Get Info" links target /info#interest-form, so there the frame
// is on screen immediately and deferring it would show a tall blank rectangle at the
// moment of highest intent.
export default function FormEmbed({ url, title, height, loading = 'lazy' }) {
  return (
    <>
      <iframe
        src={`${url}?embedded=true`}
        title={title}
        width="100%"
        height={height}
        loading={loading}
        style={{ border: 0, maxWidth: '100%', display: 'block' }}
      >
        Loading the form…
      </iframe>
      <p style={{ fontSize: 14, color: 'var(--muted)', marginTop: 12 }}>
        Form not loading?{' '}
        <a href={url} target="_blank" rel="noopener noreferrer"
           style={{ color: 'var(--navy)', fontWeight: 700, textDecoration: 'underline' }}>
          Open it in a new tab
        </a>.
      </p>
    </>
  );
}
