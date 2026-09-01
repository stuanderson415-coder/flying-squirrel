export function LetterformPuzzle() {
  return (
    <main className="letterform-stage">
      <div className="stage-noise" aria-hidden="true" />

      <section className="presentation" aria-label="RTO Standards Companion icon concept">
        <div className="eyebrow">
          <span className="eyebrow-rule" />
          <span>RTO STANDARDS COMPANION</span>
          <span className="eyebrow-index">01 / 03</span>
        </div>

        <div className="icon-wrap">
          <div className="halo halo-one" aria-hidden="true" />
          <div className="halo halo-two" aria-hidden="true" />
          <svg
            className="puzzle-icon"
            viewBox="0 0 320 320"
            role="img"
            aria-labelledby="puzzle-title puzzle-desc"
          >
            <title id="puzzle-title">Hidden RTO letterform puzzle icon</title>
            <desc id="puzzle-desc">
              A compact plum and orange jigsaw piece whose inset seams quietly form the letters R, T and O.
            </desc>
            <defs>
              <linearGradient id="pieceFill" x1="38" y1="24" x2="283" y2="296" gradientUnits="userSpaceOnUse">
                <stop stopColor="#7F54D8" />
                <stop offset=".54" stopColor="#5B2B91" />
                <stop offset="1" stopColor="#3C1C67" />
              </linearGradient>
              <linearGradient id="edgeLight" x1="74" y1="38" x2="250" y2="273" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFB26B" />
                <stop offset="1" stopColor="#F05B88" />
              </linearGradient>
              <filter id="pieceShadow" x="-30%" y="-30%" width="160%" height="170%">
                <feDropShadow dx="0" dy="15" stdDeviation="13" floodColor="#12071E" floodOpacity=".48" />
              </filter>
              <clipPath id="pieceClip">
                <path d="M92 39h63c-4 10-3 22 5 29 10 9 26 8 35-2 7-8 8-18 3-27h31c10 0 18 8 18 18v44c9-4 21-2 29 6 10 10 10 27 0 37-8 8-19 10-29 6v51c0 10-8 18-18 18h-42c5 10 3 23-5 31-10 10-27 10-37 0-8-8-10-20-5-31H92c-10 0-18-8-18-18v-44c-10 5-23 3-31-5-10-10-10-27 0-37 8-8 20-10 31-5V57c0-10 8-18 18-18Z" />
              </clipPath>
            </defs>

            <path
              d="M92 39h63c-4 10-3 22 5 29 10 9 26 8 35-2 7-8 8-18 3-27h31c10 0 18 8 18 18v44c9-4 21-2 29 6 10 10 10 27 0 37-8 8-19 10-29 6v51c0 10-8 18-18 18h-42c5 10 3 23-5 31-10 10-27 10-37 0-8-8-10-20-5-31H92c-10 0-18-8-18-18v-44c-10 5-23 3-31-5-10-10-10-27 0-37 8-8 20-10 31-5V57c0-10 8-18 18-18Z"
              fill="url(#pieceFill)"
              stroke="#A879E9"
              strokeOpacity=".52"
              strokeWidth="2"
              filter="url(#pieceShadow)"
            />

            <g clipPath="url(#pieceClip)">
              <path d="M77 94h141" stroke="#FFB26B" strokeOpacity=".88" strokeWidth="7" strokeLinecap="round" />
              <path d="M77 100h141" stroke="#2D1550" strokeOpacity=".54" strokeWidth="2" />
              <path d="M76 218h142" stroke="#F275A2" strokeOpacity=".78" strokeWidth="7" strokeLinecap="round" />
              <path d="M76 212h142" stroke="#2D1550" strokeOpacity=".48" strokeWidth="2" />
              <path d="M139 52v211" stroke="#F5A263" strokeOpacity=".76" strokeWidth="7" strokeLinecap="round" />
              <path d="M146 52v211" stroke="#281044" strokeOpacity=".56" strokeWidth="2" />
              <path d="M219 65v186" stroke="#E56BA7" strokeOpacity=".72" strokeWidth="7" strokeLinecap="round" />
              <path d="M226 65v186" stroke="#281044" strokeOpacity=".48" strokeWidth="2" />

              <path d="M90 113h27c13 0 22 7 22 18s-9 18-22 18H90m28 0 23 29" fill="none" stroke="#F9D0B4" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M155 113h45m-22 0v66" fill="none" stroke="#FFD4A9" strokeWidth="6" strokeLinecap="round" />
              <ellipse cx="224" cy="144" rx="22" ry="32" fill="none" stroke="#F9C3CF" strokeWidth="6" />
              <path d="M90 113h27c13 0 22 7 22 18s-9 18-22 18H90m28 0 23 29M155 113h45m-22 0v66" fill="none" stroke="#FFF0DF" strokeOpacity=".22" strokeWidth="1.5" />
            </g>

            <circle cx="77" cy="89" r="3" fill="#FFD8AE" />
            <circle cx="237" cy="211" r="3" fill="#F4A6C0" />
          </svg>
          <div className="size-note">32 px ready</div>
        </div>

        <div className="caption">
          <div className="caption-mark">RTO</div>
          <div>
            <h1>Knowledge, joined.</h1>
            <p>A pocket reference for the standards that hold your practice together.</p>
          </div>
        </div>
      </section>

      <footer className="stage-footer">
        <span>HIDDEN MONOGRAM / LETTERFORM PUZZLE</span>
        <span>AUSTRALIAN VET EDUCATORS</span>
      </footer>

      <style>{`
        .letterform-stage {
          min-height: 100vh;
          min-height: 100dvh;
          position: relative;
          overflow: hidden;
          display: grid;
          place-items: center;
          padding: 38px 28px 32px;
          color: #f8edff;
          background: #160d22;
          font-family: "DM Sans", "Trebuchet MS", sans-serif;
        }
        .stage-noise {
          position: fixed;
          inset: 0;
          pointer-events: none;
          opacity: .08;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E");
          mix-blend-mode: screen;
        }
        .presentation { width: min(100%, 520px); position: relative; z-index: 1; }
        .eyebrow, .stage-footer {
          display: flex; align-items: center; gap: 10px;
          color: #ac91c2; font-size: 9px; letter-spacing: .2em; font-weight: 700;
        }
        .eyebrow-rule { width: 28px; height: 1px; background: #f39167; }
        .eyebrow-index { margin-left: auto; color: #6f577d; }
        .icon-wrap { position: relative; display: grid; place-items: center; padding: 35px 0 13px; }
        .puzzle-icon { width: min(78vw, 330px); height: auto; position: relative; z-index: 1; animation: settle .8s cubic-bezier(.2,.8,.2,1) both; }
        .halo { position: absolute; border-radius: 50%; filter: blur(1px); pointer-events: none; }
        .halo-one { width: 250px; height: 250px; background: rgba(116, 65, 180, .22); box-shadow: 0 0 100px 30px rgba(116, 65, 180, .14); }
        .halo-two { width: 170px; height: 170px; background: rgba(240, 91, 136, .1); transform: translate(38px, 32px); }
        .size-note { position: absolute; right: 10%; bottom: 10px; padding: 5px 8px; border: 1px solid rgba(215,177,239,.18); color: #a990b9; font: 9px "Space Mono", monospace; letter-spacing: .04em; background: rgba(22,13,34,.72); }
        .caption { border-top: 1px solid rgba(224,191,240,.16); padding-top: 19px; display: flex; gap: 17px; align-items: flex-start; }
        .caption-mark { color: #f5a263; font: 700 11px "Space Mono", monospace; letter-spacing: .16em; padding-top: 5px; }
        h1 { margin: 0; font: 400 clamp(25px, 5vw, 34px)/1.05 Fraunces, Georgia, serif; letter-spacing: -.025em; color: #fff4f4; }
        .caption p { margin: 8px 0 0; max-width: 300px; color: #bca7c6; font-size: 12px; line-height: 1.5; }
        .stage-footer { position: absolute; bottom: 32px; left: 28px; right: 28px; justify-content: space-between; font-size: 8px; color: #715b7f; }
        @keyframes settle { from { opacity: 0; transform: translateY(14px) scale(.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @media (max-width: 430px) {
          .letterform-stage { padding: 27px 20px 26px; }
          .stage-footer { left: 20px; right: 20px; bottom: 24px; font-size: 7px; }
          .icon-wrap { padding-top: 22px; }
          .puzzle-icon { width: min(82vw, 300px); }
          .size-note { right: 3%; }
        }
      `}</style>
    </main>
  );
}