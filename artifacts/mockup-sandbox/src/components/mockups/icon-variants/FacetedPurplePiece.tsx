const piecePath =
  "M180 28c-16.2 0-29.3 12.7-29.3 28.3 0 9.4 4.7 17.7 11.9 22.8H91.1c-16.2 0-29.3 12.8-29.3 28.5v53.2c6.6-6.1 15.2-9.8 24.7-9.8 18.1 0 32.8 13.7 32.8 30.7s-14.7 30.8-32.8 30.8c-9.5 0-18.1-3.8-24.7-9.9v53.7c0 15.7 13.1 28.4 29.3 28.4h52.6c-6.1 6.5-9.8 15-9.8 24.4 0 17.9 13.8 32.4 30.9 32.4 17 0 30.8-14.5 30.8-32.4 0-9.4-3.7-17.9-9.8-24.4h54.1c16.2 0 29.3-12.7 29.3-28.4v-53.7c6.6 6.1 15.2 9.9 24.7 9.9 18.1 0 32.8-13.8 32.8-30.8S310.1 151 292 151c-9.5 0-18.1 3.7-24.7 9.8v-53.2c0-15.7-13.1-28.5-29.3-28.5h-40.9c7.2-5.1 11.9-13.4 11.9-22.8C209 40.7 196.1 28 180 28Z";

function PieceMark({ label = "Faceted purple jigsaw piece" }: { label?: string }) {
  const clipId = `piece-clip-${label.replace(/\s/g, "-")}`;

  return (
    <svg viewBox="0 0 360 360" role="img" aria-label={label}>
      <defs>
        <clipPath id={clipId}>
          <path d={piecePath} />
        </clipPath>
      </defs>
      <g transform="translate(-18 -18) scale(1.1)">
        <path d={piecePath} fill="#7d31d3" />
        <g clipPath={`url(#${clipId})`}>
          <path d="M33 56 166 2l41 83-65 103-88-29Z" fill="#bd7cff" />
          <path d="M166 2 329 47l-62 116-60-78Z" fill="#9d55ed" />
          <path d="m54 159 88 29 125-25 54 116-139 79-84-52Z" fill="#5a16a7" />
          <path d="m142 188 125-25 54 116-139 79Z" fill="#6d20be" opacity=".9" />
        </g>
      </g>
    </svg>
  );
}

export function FacetedPurplePiece() {
  return (
    <main className="facet-board">
      <header className="facet-topline">
        <span>RTO STANDARDS COMPANION</span>
        <span>ICON STUDY / 03</span>
      </header>

      <section className="facet-layout">
        <div className="facet-intro">
          <p className="facet-eyebrow">HYPOTHESIS — FACETED PURPLE</p>
          <h1>A single piece.<br />Cut with light.</h1>
          <p className="facet-description">
            Broad angular planes make the mark feel held, folded and memorable—without adding anything inside it.
          </p>
        </div>

        <div className="facet-icon-area">
          <div className="facet-icon-frame">
            <PieceMark />
          </div>
          <p className="facet-frame-note">PRIMARY MARK / TRUE BLACK FIELD</p>
        </div>

        <aside className="facet-proof" aria-label="Icon scale checks">
          <p className="facet-proof-label">LEGIBILITY CHECK</p>
          <div className="facet-scales">
            <div className="facet-scale facet-scale-64">
              <div className="facet-swatch"><PieceMark label="64 pixel icon check" /></div>
              <span>64px</span>
            </div>
            <div className="facet-scale facet-scale-32">
              <div className="facet-swatch"><PieceMark label="32 pixel icon check" /></div>
              <span>32px</span>
            </div>
            <div className="facet-scale facet-scale-20">
              <div className="facet-swatch"><PieceMark label="20 pixel icon check" /></div>
              <span>20px</span>
            </div>
          </div>
          <p className="facet-proof-copy">Silhouette first. Planes second.<br />Clear at a glance.</p>
        </aside>
      </section>

      <footer className="facet-footer">
        <span>SHAPE LANGUAGE / JOIN · FIT · REMEMBER</span>
        <span>2025</span>
      </footer>

      <style>{`
        .facet-board {
          --paper: #f0e9e2;
          --ink: #201922;
          --violet: #792dc9;
          min-height: 100dvh;
          box-sizing: border-box;
          padding: 28px 34px 22px;
          overflow: hidden;
          color: var(--ink);
          background: var(--paper);
          font-family: "DM Sans", "Trebuchet MS", sans-serif;
          position: relative;
        }
        .facet-board::before {
          content: "";
          position: absolute;
          inset: 0;
          opacity: .26;
          pointer-events: none;
          background-image: radial-gradient(#5c4d5d 0.55px, transparent .65px);
          background-size: 8px 8px;
        }
        .facet-topline, .facet-footer {
          position: relative;
          z-index: 1;
          display: flex;
          justify-content: space-between;
          color: #685b68;
          font-family: "Space Mono", monospace;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: .13em;
        }
        .facet-layout {
          position: relative;
          z-index: 1;
          max-width: 1050px;
          min-height: calc(100dvh - 88px);
          margin: 0 auto;
          display: grid;
          grid-template-columns: .88fr 1.25fr .72fr;
          gap: clamp(24px, 4vw, 64px);
          align-items: center;
        }
        .facet-intro { animation: facet-rise .7s ease both; }
        .facet-eyebrow, .facet-proof-label, .facet-frame-note {
          margin: 0;
          font-family: "Space Mono", monospace;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: .13em;
        }
        .facet-eyebrow { color: var(--violet); }
        .facet-intro h1 {
          margin: 17px 0 15px;
          font-family: "Fraunces", Georgia, serif;
          font-size: clamp(43px, 5.1vw, 69px);
          font-weight: 600;
          letter-spacing: -.065em;
          line-height: .91;
        }
        .facet-description {
          max-width: 255px;
          margin: 0;
          color: #665868;
          font-size: 13px;
          line-height: 1.55;
        }
        .facet-icon-area { text-align: center; animation: facet-rise .8s .12s ease both; }
        .facet-icon-frame {
          width: min(46vw, 430px);
          aspect-ratio: 1;
          margin: auto;
          background: #000;
          display: grid;
          place-items: center;
        }
        .facet-icon-frame svg { width: 100%; height: 100%; display: block; }
        .facet-frame-note { margin-top: 11px; color: #706271; font-size: 8px; }
        .facet-proof { animation: facet-rise .7s .24s ease both; }
        .facet-proof-label { color: #6e6070; margin-bottom: 20px; }
        .facet-scales { display: flex; align-items: end; gap: clamp(13px, 2vw, 25px); }
        .facet-scale { display: flex; flex-direction: column; align-items: center; gap: 9px; color: #504453; font-family: "Space Mono", monospace; font-size: 9px; }
        .facet-swatch { display: grid; place-items: center; background: #000; }
        .facet-scale-64 .facet-swatch { width: 64px; height: 64px; }
        .facet-scale-32 .facet-swatch { width: 32px; height: 32px; }
        .facet-scale-20 .facet-swatch { width: 20px; height: 20px; }
        .facet-swatch svg { display: block; width: 100%; height: 100%; }
        .facet-proof-copy { margin: 25px 0 0; color: #756878; font-family: "Fraunces", Georgia, serif; font-size: 15px; font-style: italic; line-height: 1.35; }
        .facet-footer { color: #756978; font-size: 8px; }
        @keyframes facet-rise { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        @media (max-width: 740px) {
          .facet-board { padding: 22px 21px 18px; overflow: auto; }
          .facet-layout { min-height: auto; padding: 52px 0 38px; grid-template-columns: 1fr; gap: 32px; }
          .facet-intro { text-align: center; }
          .facet-description { margin-inline: auto; }
          .facet-icon-frame { width: min(80vw, 390px); }
          .facet-proof { text-align: center; }
          .facet-scales { justify-content: center; }
          .facet-proof-copy { margin-top: 18px; }
          .facet-footer { font-size: 7px; }
        }
      `}</style>
    </main>
  );
}