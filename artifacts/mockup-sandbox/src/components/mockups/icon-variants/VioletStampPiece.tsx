export function VioletStampPiece() {
  const Piece = ({ label, className = "" }: { label?: string; className?: string }) => (
    <svg className={className} viewBox="0 0 320 320" role={label ? "img" : undefined} aria-label={label}>
      <rect width="320" height="320" fill="#000000" />
      <path
        d="M117 35h58c-7 8-11 18-11 29 0 26 20 46 45 46s45-20 45-46c0-11-4-21-11-29h42v78c8-7 18-11 30-11 25 0 45 20 45 45s-20 45-45 45c-12 0-22-4-30-11v74H207c7 8 11 18 11 30 0 25-20 45-45 45s-45-20-45-45c0-12 4-22 11-30H65v-71c-8 7-18 11-30 11-25 0-45-20-45-45s20-45 45-45c12 0 22 4 30 11V35h52Z"
        transform="translate(35 7) scale(.7 .82)"
        fill="#5b21a8"
      />
      <path
        d="M117 35h58c-7 8-11 18-11 29 0 26 20 46 45 46s45-20 45-46c0-11-4-21-11-29h42v78c8-7 18-11 30-11 25 0 45 20 45 45s-20 45-45 45c-12 0-22-4-30-11v74H207c7 8 11 18 11 30 0 25-20 45-45 45s-45-20-45-45c0-12 4-22 11-30H65v-71c-8 7-18 11-30 11-25 0-45-20-45-45s20-45 45-45c12 0 22 4 30 11V35h52Z"
        transform="translate(30 2) scale(.7 .82)"
        fill="#a855f7"
      />
    </svg>
  );

  return (
    <main className="violet-stamp" aria-label="Violet Stamp Piece icon exploration">
      <header className="violet-stamp__masthead">
        <span>RTO STANDARDS COMPANION</span>
        <span>ICON STUDY / 04</span>
      </header>

      <section className="violet-stamp__content">
        <div className="violet-stamp__intro">
          <p className="violet-stamp__eyebrow">RECOGNITION TEST</p>
          <h1>Violet<br />Stamp Piece</h1>
          <p className="violet-stamp__thesis">One hard-edged shape. Nothing to decode.</p>
        </div>

        <div className="violet-stamp__hero" aria-label="Primary icon at large scale">
          <Piece label="A large violet jigsaw piece on a true black square" className="violet-stamp__mark" />
        </div>

        <aside className="violet-stamp__notes">
          <div>
            <span className="violet-stamp__note-number">01</span>
            <p>Flat, saturated violet holds its identity without a highlight or a gradient.</p>
          </div>
          <div>
            <span className="violet-stamp__note-number">02</span>
            <p>A single dark offset is the only depth cue: more print stamp than object.</p>
          </div>
        </aside>
      </section>

      <section className="violet-stamp__checks" aria-label="Icon legibility scale checks">
        <div className="violet-stamp__checks-title">
          <span>SMALL-SIZE PROOF</span>
          <span>TRUE BLACK / LIGHT VIOLET</span>
        </div>
        <div className="violet-stamp__sizes">
          <figure>
            <div className="violet-stamp__swatch violet-stamp__swatch--64"><Piece className="violet-stamp__mini" /></div>
            <figcaption>64 PX</figcaption>
          </figure>
          <figure>
            <div className="violet-stamp__swatch violet-stamp__swatch--32"><Piece className="violet-stamp__mini" /></div>
            <figcaption>32 PX</figcaption>
          </figure>
          <figure>
            <div className="violet-stamp__swatch violet-stamp__swatch--20"><Piece className="violet-stamp__mini" /></div>
            <figcaption>20 PX</figcaption>
          </figure>
        </div>
      </section>

      <footer className="violet-stamp__footer">
        <span>HYPOTHESIS: MINIMAL VIOLET STAMP</span>
        <span>CRISP AT A GLANCE</span>
      </footer>

      <style>{`
        .violet-stamp {
          --ink: #000000;
          --violet: #a855f7;
          --paper: #f1eaff;
          --muted: #9583aa;
          --line: rgba(196, 161, 231, .24);
          box-sizing: border-box;
          min-height: 100dvh;
          overflow: hidden;
          padding: 26px clamp(22px, 5vw, 72px) 20px;
          background: #120b1e;
          color: var(--paper);
          font-family: "Space Mono", ui-monospace, monospace;
          position: relative;
        }
        .violet-stamp:before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: .19;
          background-image: radial-gradient(rgba(225, 199, 255, .42) .55px, transparent .6px);
          background-size: 5px 5px;
          mix-blend-mode: screen;
        }
        .violet-stamp__masthead, .violet-stamp__footer, .violet-stamp__checks-title {
          position: relative;
          display: flex;
          justify-content: space-between;
          gap: 16px;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: .15em;
        }
        .violet-stamp__masthead { color: #bba5cf; }
        .violet-stamp__content {
          position: relative;
          z-index: 1;
          max-width: 1080px;
          min-height: calc(100dvh - 175px);
          margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(190px, .74fr) minmax(300px, 1.18fr) minmax(180px, .68fr);
          align-items: center;
          gap: clamp(24px, 4vw, 72px);
        }
        .violet-stamp__intro { animation: violet-stamp-rise .65s .08s both cubic-bezier(.2,.8,.2,1); }
        .violet-stamp__eyebrow {
          color: var(--violet);
          margin: 0 0 17px;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: .2em;
        }
        .violet-stamp h1 {
          margin: 0;
          max-width: 340px;
          font-family: "Fraunces", Georgia, serif;
          font-size: clamp(47px, 6vw, 78px);
          font-weight: 500;
          letter-spacing: -.075em;
          line-height: .82;
        }
        .violet-stamp__thesis {
          max-width: 205px;
          margin: 24px 0 0;
          color: var(--muted);
          font-family: "DM Sans", sans-serif;
          font-size: 14px;
          line-height: 1.42;
        }
        .violet-stamp__hero {
          width: min(100%, 500px);
          justify-self: center;
          animation: violet-stamp-pop .72s .16s both cubic-bezier(.17,.84,.3,1.15);
        }
        .violet-stamp__mark { display: block; width: 100%; height: auto; }
        .violet-stamp__notes {
          display: grid;
          gap: 23px;
          animation: violet-stamp-rise .65s .28s both cubic-bezier(.2,.8,.2,1);
        }
        .violet-stamp__notes > div { border-top: 1px solid var(--line); padding-top: 10px; }
        .violet-stamp__note-number { color: var(--violet); font-size: 9px; letter-spacing: .1em; }
        .violet-stamp__notes p {
          margin: 8px 0 0;
          color: #b9a9c9;
          font-family: "DM Sans", sans-serif;
          font-size: 12px;
          line-height: 1.45;
        }
        .violet-stamp__checks {
          position: relative;
          z-index: 1;
          max-width: 1080px;
          margin: -18px auto 0;
          padding-top: 14px;
          border-top: 1px solid var(--line);
          animation: violet-stamp-rise .65s .36s both;
        }
        .violet-stamp__checks-title { color: #987eaf; font-size: 8px; }
        .violet-stamp__sizes { display: flex; align-items: flex-end; gap: clamp(30px, 7vw, 84px); margin-top: 13px; }
        .violet-stamp figure { display: grid; justify-items: center; gap: 8px; margin: 0; }
        .violet-stamp__swatch { display: grid; place-items: center; background: var(--ink); }
        .violet-stamp__swatch--64 { width: 78px; height: 78px; }
        .violet-stamp__swatch--32 { width: 46px; height: 46px; }
        .violet-stamp__swatch--20 { width: 30px; height: 30px; }
        .violet-stamp__mini { display: block; width: 64px; height: 64px; }
        .violet-stamp__swatch--32 .violet-stamp__mini { width: 32px; height: 32px; }
        .violet-stamp__swatch--20 .violet-stamp__mini { width: 20px; height: 20px; }
        .violet-stamp figcaption { color: #9c88b0; font-size: 8px; letter-spacing: .12em; }
        .violet-stamp__footer { position: relative; z-index: 1; margin-top: 22px; color: #745a89; font-size: 8px; }
        @keyframes violet-stamp-rise { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes violet-stamp-pop { from { opacity: 0; transform: scale(.94); } to { opacity: 1; transform: scale(1); } }
        @media (max-width: 720px) {
          .violet-stamp { padding-top: 22px; }
          .violet-stamp__content { min-height: auto; padding: 56px 0 34px; grid-template-columns: 1fr; gap: 28px; }
          .violet-stamp__intro { text-align: center; }
          .violet-stamp__thesis { margin-inline: auto; }
          .violet-stamp__hero { width: min(82vw, 380px); order: 2; }
          .violet-stamp__notes { order: 3; grid-template-columns: 1fr 1fr; gap: 16px; }
          .violet-stamp__checks { margin-top: 0; }
        }
        @media (max-width: 420px) {
          .violet-stamp__masthead, .violet-stamp__footer { font-size: 7px; letter-spacing: .11em; }
          .violet-stamp h1 { font-size: 57px; }
          .violet-stamp__notes p { font-size: 11px; }
          .violet-stamp__sizes { gap: 30px; }
        }
      `}</style>
    </main>
  );
}