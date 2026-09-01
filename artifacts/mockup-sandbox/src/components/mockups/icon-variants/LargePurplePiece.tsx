export function LargePurplePiece() {
  return (
    <main className="large-piece-stage" aria-label="Large Purple Piece app icon presentation">
      <header className="large-piece-header">
        <span className="large-piece-status" aria-hidden="true" />
        <span>RTO STANDARDS COMPANION</span>
        <span className="large-piece-index">01 / 03</span>
      </header>

      <section className="large-piece-content">
        <div className="large-piece-copy">
          <p className="large-piece-kicker">RADICAL SIMPLICITY</p>
          <h1>Large Purple Piece</h1>
          <p className="large-piece-lead">
            One unmistakable shape for a guide that keeps the work together.
          </p>
        </div>

        <div className="large-piece-icon-wrap">
          <svg
            className="large-piece-icon"
            viewBox="0 0 360 360"
            role="img"
            aria-labelledby="large-piece-title large-piece-description"
          >
            <title id="large-piece-title">Large Purple Piece app icon</title>
            <desc id="large-piece-description">
              A single oversized light-purple jigsaw piece on a black background.
            </desc>
            <defs>
              <linearGradient id="pieceLight" x1="72" y1="42" x2="292" y2="320" gradientUnits="userSpaceOnUse">
                <stop stopColor="#C6A3FF" />
                <stop offset="0.56" stopColor="#A879F1" />
                <stop offset="1" stopColor="#8959D5" />
              </linearGradient>
              <filter id="pieceDepth" x="-30%" y="-30%" width="160%" height="170%">
                <feDropShadow dx="0" dy="16" stdDeviation="12" floodColor="#000000" floodOpacity="0.7" />
              </filter>
              <path
                id="pieceShape"
                d="M180 29
                  C164 29 151 41 151 56
                  C151 65 155 73 162 79
                  H88
                  C73 79 61 91 61 106
                  V160
                  C68 154 76 151 86 151
                  C104 151 118 164 118 181
                  C118 198 104 211 86 211
                  C76 211 68 208 61 202
                  V254
                  C61 269 73 281 88 281
                  H143
                  C137 288 134 297 134 307
                  C134 324 147 337 164 337
                  C181 337 194 324 194 307
                  C194 297 191 288 185 281
                  H239
                  C254 281 266 269 266 254
                  V201
                  C273 208 282 211 292 211
                  C310 211 324 198 324 181
                  C324 164 310 151 292 151
                  C282 151 273 154 266 160
                  V106
                  C266 91 254 79 239 79
                  H198
                  C205 73 209 65 209 56
                  C209 41 196 29 180 29 Z"
              />
            </defs>
            <rect width="360" height="360" rx="64" fill="#0D0912" />
            <use href="#pieceShape" fill="url(#pieceLight)" filter="url(#pieceDepth)" />
            <use href="#pieceShape" fill="none" stroke="#D4B9FF" strokeOpacity=".48" strokeWidth="2" />
          </svg>
        </div>

        <div className="large-piece-caption">
          <span className="large-piece-rule" aria-hidden="true" />
          <p>
            <strong>THE HYPOTHESIS</strong>
            <br />
            The piece fills the frame, so the idea survives the glance.
          </p>
        </div>

        <div className="large-piece-scale-checks" aria-label="Icon scale checks">
          <div className="large-piece-scale-item">
            <svg viewBox="0 0 360 360" aria-hidden="true">
              <use href="#pieceShape" fill="#B58AF6" />
            </svg>
            <span>64px</span>
          </div>
          <div className="large-piece-scale-item">
            <svg viewBox="0 0 360 360" aria-hidden="true">
              <use href="#pieceShape" fill="#B58AF6" />
            </svg>
            <span>32px</span>
          </div>
          <div className="large-piece-scale-item">
            <svg viewBox="0 0 360 360" aria-hidden="true">
              <use href="#pieceShape" fill="#B58AF6" />
            </svg>
            <span>20px</span>
          </div>
        </div>
      </section>

      <footer className="large-piece-footer">
        <span>POCKET REFERENCE / EDUCATOR LOG</span>
        <span>RTO · 2025</span>
      </footer>

      <style>{`
        .large-piece-stage {
          min-height: 100dvh;
          box-sizing: border-box;
          overflow: hidden;
          isolation: isolate;
          padding: 30px 36px 28px;
          background: #0D0912;
          color: #F2EAFB;
          font-family: 'DM Sans', ui-sans-serif, sans-serif;
        }
        .large-piece-stage:after {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -1;
          pointer-events: none;
          opacity: .12;
          background-image: radial-gradient(#E3D3FF .5px, transparent .5px);
          background-size: 6px 6px;
        }
        .large-piece-header, .large-piece-footer {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #8D799F;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: .18em;
        }
        .large-piece-status {
          width: 7px;
          height: 7px;
          flex: none;
          border-radius: 50%;
          background: #B58AF6;
          box-shadow: 0 0 0 4px #B58AF61D;
        }
        .large-piece-index {
          margin-left: auto;
          color: #5D4A6B;
        }
        .large-piece-content {
          display: flex;
          min-height: calc(100dvh - 108px);
          max-width: 620px;
          margin: 0 auto;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .large-piece-copy {
          text-align: center;
          animation: piece-in .7s ease both;
        }
        .large-piece-kicker {
          margin: 0 0 12px;
          color: #B58AF6;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: .28em;
        }
        .large-piece-copy h1 {
          margin: 0;
          color: #F5EDFF;
          font-family: 'Fraunces', Georgia, serif;
          font-size: clamp(39px, 8vw, 59px);
          font-weight: 500;
          letter-spacing: -.055em;
          line-height: .92;
        }
        .large-piece-lead {
          max-width: 290px;
          margin: 15px auto 0;
          color: #AE9DBB;
          font-size: 12px;
          line-height: 1.55;
        }
        .large-piece-icon-wrap {
          width: min(78vw, 376px);
          margin: 20px auto 14px;
          animation: piece-in .85s .1s ease both;
        }
        .large-piece-icon {
          display: block;
          width: 100%;
          height: auto;
        }
        .large-piece-caption {
          display: flex;
          align-items: flex-start;
          gap: 13px;
          max-width: 290px;
          animation: piece-in .7s .18s ease both;
        }
        .large-piece-rule {
          width: 22px;
          height: 1px;
          flex: none;
          margin-top: 7px;
          background: #B58AF6;
        }
        .large-piece-caption p {
          margin: 0;
          color: #9B87A9;
          font-size: 10px;
          line-height: 1.55;
        }
        .large-piece-caption strong {
          color: #C7A8F8;
          font-size: 8px;
          letter-spacing: .18em;
        }
        .large-piece-scale-checks {
          display: flex;
          align-items: flex-end;
          gap: 22px;
          margin-top: 19px;
          animation: piece-in .7s .25s ease both;
        }
        .large-piece-scale-item {
          display: flex;
          align-items: center;
          flex-direction: column;
          gap: 6px;
          color: #766183;
          font-family: 'Space Mono', monospace;
          font-size: 8px;
          letter-spacing: .08em;
        }
        .large-piece-scale-item svg {
          display: block;
          width: 64px;
          height: 64px;
          overflow: visible;
          filter: drop-shadow(0 5px 6px #0008);
        }
        .large-piece-scale-item:nth-child(2) svg { width: 32px; height: 32px; }
        .large-piece-scale-item:nth-child(3) svg { width: 20px; height: 20px; }
        .large-piece-footer {
          justify-content: space-between;
          margin-top: 7px;
          color: #594667;
        }
        @keyframes piece-in {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 430px) {
          .large-piece-stage { padding: 24px 22px; }
          .large-piece-content { min-height: calc(100dvh - 92px); }
          .large-piece-copy h1 { font-size: 46px; }
          .large-piece-icon-wrap { margin-top: 17px; }
          .large-piece-footer { font-size: 7px; }
        }
      `}</style>
    </main>
  );
}