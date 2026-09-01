const piecePath =
  "M180 24c-18 0-33 14-33 32 0 9 4 17 10 23H91c-17 0-30 13-30 30v51c7-6 16-10 26-10 18 0 33 14 33 32s-15 32-33 32c-10 0-19-4-26-10v47c0 17 13 30 30 30h50c-6 7-9 15-9 25 0 18 14 32 32 32s32-14 32-32c0-10-3-18-9-25h52c17 0 30-13 30-30v-47c7 6 16 10 26 10 18 0 33-14 33-32s-15-32-33-32c-10 0-19 4-26 10v-51c0-17-13-30-30-30h-49c6-6 10-14 10-23 0-18-15-32-33-32Z";

function IconPiece({
  size,
  labelled = false,
}: {
  size: number;
  labelled?: boolean;
}) {
  const suffix = `${size}-${labelled ? "hero" : "check"}`;
  return (
    <svg
      className="sculpted-piece-icon"
      width={size}
      height={size}
      viewBox="0 0 360 360"
      role={labelled ? "img" : undefined}
      aria-label={labelled ? "Sculpted purple jigsaw app icon" : undefined}
      aria-hidden={labelled ? undefined : true}
    >
      <defs>
        <linearGradient id={`sculpted-base-${suffix}`} x1="88" y1="54" x2="275" y2="318" gradientUnits="userSpaceOnUse">
          <stop stopColor="#d3a7ff" />
          <stop offset=".32" stopColor="#ab67e5" />
          <stop offset=".7" stopColor="#7835af" />
          <stop offset="1" stopColor="#4c176f" />
        </linearGradient>
        <radialGradient id={`sculpted-bloom-${suffix}`} cx="0" cy="0" r="1" gradientTransform="matrix(116 70 -79 130 126 85)" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f0d8ff" stopOpacity=".82" />
          <stop offset=".52" stopColor="#dcaaff" stopOpacity=".24" />
          <stop offset="1" stopColor="#dcaaff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`sculpted-rim-${suffix}`} x1="81" y1="63" x2="269" y2="301" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f5e8ff" stopOpacity=".8" />
          <stop offset=".35" stopColor="#e3c3ff" stopOpacity=".12" />
          <stop offset=".65" stopColor="#40105f" stopOpacity=".16" />
          <stop offset="1" stopColor="#250932" stopOpacity=".7" />
        </linearGradient>
        <filter id={`sculpted-shadow-${suffix}`} x="-25%" y="-22%" width="160%" height="168%">
          <feDropShadow dx="0" dy="15" stdDeviation="11" floodColor="#210526" floodOpacity=".82" />
        </filter>
        <filter id={`sculpted-soft-${suffix}`} x="-15%" y="-15%" width="130%" height="130%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
      </defs>
      <rect width="360" height="360" rx="76" fill="#000000" />
      <path d={piecePath} transform="translate(0 3)" fill="#260830" opacity=".92" filter={`url(#sculpted-shadow-${suffix})`} />
      <path d={piecePath} fill={`url(#sculpted-base-${suffix})`} />
      <path d={piecePath} fill={`url(#sculpted-bloom-${suffix})`} />
      <path
        d="M94 91h65c-6-8-8-15-8-24 0-14 11-26 25-26 10 0 19 6 23 15-7-4-15-5-23-3-12 4-18 16-14 28 2 5 5 9 10 12H94c-11 0-20 9-20 20v39c-5-3-8-5-12-9v-30c0-17 14-30 32-30Z"
        fill="#fff3ff"
        opacity=".29"
        filter={`url(#sculpted-soft-${suffix})`}
      />
      <path d={piecePath} fill="none" stroke={`url(#sculpted-rim-${suffix})`} strokeWidth="5" strokeLinejoin="round" />
    </svg>
  );
}

export function SculptedPurplePiece() {
  return (
    <main className="sculpted-stage">
      <header className="sculpted-header">
        <span className="sculpted-eyebrow">RTO STANDARDS COMPANION</span>
        <span className="sculpted-version">ICON STUDY · 04</span>
      </header>

      <section className="sculpted-layout">
        <div className="sculpted-intro">
          <p>APP ICON EXPLORATION</p>
          <h1>Sculpted<br />Purple Piece</h1>
          <span className="sculpted-line" />
          <small>Softly molded volume. One shape, held in the hand.</small>
        </div>

        <div className="sculpted-hero">
          <IconPiece size={360} labelled />
          <div className="sculpted-note">
            <b>HYPOTHESIS</b>
            <span>Broad light and a rounded bevel make the piece feel premium—not planar.</span>
          </div>
        </div>

        <aside className="sculpted-checks" aria-label="Icon scale checks">
          <p>LEGIBILITY CHECK</p>
          <div className="sculpted-scale-row"><IconPiece size={64} /><span>64 PX</span></div>
          <div className="sculpted-scale-row"><IconPiece size={32} /><span>32 PX</span></div>
          <div className="sculpted-scale-row"><IconPiece size={20} /><span>20 PX</span></div>
        </aside>
      </section>

      <footer className="sculpted-footer">
        <span>OBJECT STUDY / PLUM SERIES</span>
        <span>2025</span>
      </footer>

      <style>{`
        .sculpted-stage {
          min-height: 100dvh; box-sizing: border-box; padding: 30px 38px 25px;
          background: #100c14; color: #f2e9f5; font-family: "DM Sans", ui-sans-serif, sans-serif;
          position: relative; overflow: hidden; isolation: isolate;
        }
        .sculpted-stage:before { content:""; position:absolute; inset:0; z-index:-1; pointer-events:none; opacity:.34; background: radial-gradient(circle at 50% 47%, #2b17343f 0, transparent 31%), repeating-linear-gradient(90deg, #ffffff05 0 1px, transparent 1px 88px); }
        .sculpted-header,.sculpted-footer { display:flex; justify-content:space-between; align-items:center; color:#837187; font-family:"Space Mono", monospace; font-size:8px; letter-spacing:.17em; }
        .sculpted-version { color:#b991cb; }
        .sculpted-layout { max-width:890px; min-height:calc(100dvh - 96px); margin:auto; display:grid; grid-template-columns:1fr 360px 1fr; align-items:center; gap:52px; }
        .sculpted-intro { animation:sculpted-rise .7s both; }
        .sculpted-intro p,.sculpted-checks>p { color:#bd78e1; font-family:"Space Mono",monospace; font-size:8px; font-weight:700; letter-spacing:.19em; margin:0 0 15px; }
        .sculpted-intro h1 { font-family:"Fraunces", Georgia, serif; margin:0; font-size:clamp(42px, 6vw, 67px); font-weight:450; line-height:.88; letter-spacing:-.06em; }
        .sculpted-intro small { color:#aa98ad; display:block; max-width:150px; font-size:11px; line-height:1.5; }
        .sculpted-line { width:29px; height:1px; display:block; background:#c586e7; margin:22px 0 13px; }
        .sculpted-hero { animation:sculpted-rise .85s .08s both; }
        .sculpted-piece-icon { display:block; flex:none; }
        .sculpted-note { margin-top:17px; display:flex; gap:11px; align-items:flex-start; color:#a996ae; font-size:10px; line-height:1.45; }
        .sculpted-note b { color:#d5a6ed; font-family:"Space Mono",monospace; font-size:7px; letter-spacing:.11em; white-space:nowrap; padding-top:2px; }
        .sculpted-checks { align-self:center; animation:sculpted-rise .7s .18s both; }
        .sculpted-scale-row { display:flex; align-items:center; gap:13px; margin:15px 0; }
        .sculpted-scale-row span { color:#86748b; font-family:"Space Mono",monospace; font-size:8px; letter-spacing:.1em; }
        .sculpted-footer { color:#5d5061; }
        @keyframes sculpted-rise { from { opacity:0; transform:translateY(12px) } to { opacity:1; transform:translateY(0) } }
        @media (max-width:760px) {
          .sculpted-stage { padding:25px 23px 20px; }
          .sculpted-layout { display:flex; flex-direction:column; min-height:auto; padding:56px 0 37px; gap:29px; align-items:flex-start; }
          .sculpted-intro h1 { font-size:51px; }
          .sculpted-hero { align-self:center; width:min(78vw,360px); }
          .sculpted-hero .sculpted-piece-icon { width:100%; height:auto; }
          .sculpted-checks { display:flex; width:100%; align-items:center; gap:15px; flex-wrap:wrap; }
          .sculpted-checks>p { width:100%; margin:0 0 1px; }
          .sculpted-scale-row { margin:0; }
        }
      `}</style>
    </main>
  );
}