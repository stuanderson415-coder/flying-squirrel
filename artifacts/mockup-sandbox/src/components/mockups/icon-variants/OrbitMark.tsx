export function OrbitMark() {
  return (
    <main className="orbit-stage" aria-label="Orbit Mark app icon presentation">
      <div className="orbit-grid" aria-hidden="true" />
      <div className="orbit-header">
        <span className="brand-dot" />
        <span>RTO STANDARDS COMPANION</span>
        <span className="header-index">02 / 03</span>
      </div>

      <section className="orbit-presentation">
        <div className="orbit-copy">
          <p className="kicker">CONNECTED REFERENCE</p>
          <h1>Orbit Mark</h1>
          <p className="lead">A pocket emblem for the standards that hold the work together.</p>
        </div>

        <div className="icon-frame">
          <div className="orbit-ring ring-outer" aria-hidden="true" />
          <div className="orbit-ring ring-inner" aria-hidden="true" />
          <div className="orbit-spark spark-a" aria-hidden="true" />
          <div className="orbit-spark spark-b" aria-hidden="true" />
          <svg className="orbit-icon" viewBox="0 0 360 360" role="img" aria-labelledby="orbit-title orbit-desc">
            <title id="orbit-title">Orbit Mark RTO Standards Companion icon</title>
            <desc id="orbit-desc">Four interlocking rounded puzzle fragments form a circular emblem around a subtle RTO monogram.</desc>
            <defs>
              <linearGradient id="orbitPlum" x1="60" y1="45" x2="300" y2="320" gradientUnits="userSpaceOnUse">
                <stop stopColor="#9D6BE8" />
                <stop offset=".48" stopColor="#65349A" />
                <stop offset="1" stopColor="#351A58" />
              </linearGradient>
              <linearGradient id="orbitEmber" x1="50" y1="55" x2="316" y2="300" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFB26B" />
                <stop offset="1" stopColor="#EE5C8D" />
              </linearGradient>
              <filter id="orbitShadow" x="-30%" y="-30%" width="160%" height="170%">
                <feDropShadow dx="0" dy="18" stdDeviation="15" floodColor="#08040D" floodOpacity=".62" />
              </filter>
              <filter id="softGlow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="7" />
              </filter>
            </defs>

            <circle cx="180" cy="180" r="139" fill="#1A102A" stroke="#8A5BC2" strokeOpacity=".18" strokeWidth="1" />
            <circle cx="180" cy="180" r="119" fill="none" stroke="#FF996A" strokeOpacity=".14" strokeWidth="1.5" strokeDasharray="2 10" />
            <circle cx="180" cy="180" r="84" fill="#241438" stroke="#E178A5" strokeOpacity=".28" strokeWidth="1" />

            <g filter="url(#orbitShadow)" stroke="#C48CF3" strokeOpacity=".68" strokeWidth="2">
              <path d="M180 42c-13 0-24 10-24 23 0 7 3 13 8 18H112c-11 0-20 9-20 20v52c6-5 12-7 20-7 14 0 25 11 25 25s-11 25-25 25c-8 0-14-3-20-8v48c0 11 9 20 20 20h52c-5-6-8-13-8-21 0-14 11-25 25-25s25 11 25 25c0 8-3 15-8 21h47c11 0 20-9 20-20v-48c-6 5-13 8-21 8-14 0-25-11-25-25s11-25 25-25c8 0 15 2 21 7v-52c0-11-9-20-20-20h-51c5-5 8-11 8-18 0-13-11-23-24-23Z" fill="url(#orbitPlum)" />
              <path d="M180 42c-13 0-24 10-24 23 0 7 3 13 8 18H112c-11 0-20 9-20 20v52c6-5 12-7 20-7 14 0 25 11 25 25s-11 25-25 25c-8 0-14-3-20-8v48c0 11 9 20 20 20h52c-5-6-8-13-8-21 0-14 11-25 25-25s25 11 25 25c0 8-3 15-8 21h47c11 0 20-9 20-20v-48c-6 5-13 8-21 8-14 0-25-11-25-25s11-25 25-25c8 0 15 2 21 7v-52c0-11-9-20-20-20h-51c5-5 8-11 8-18 0-13-11-23-24-23Z" fill="none" stroke="url(#orbitEmber)" strokeOpacity=".55" strokeWidth="5" />
            </g>

            <g fill="none" stroke="#F7C4B1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M146 136h21c11 0 18 5 18 14s-7 14-18 14h-21m19 0 22 29" strokeWidth="6" />
              <path d="M193 136v57m-15-57h31" strokeWidth="6" />
              <ellipse cx="230" cy="164" rx="20" ry="28" strokeWidth="6" />
            </g>
            <path d="M137 216h86" stroke="#F4A06E" strokeOpacity=".5" strokeWidth="2" strokeDasharray="1 7" />
            <circle cx="180" cy="180" r="103" fill="none" stroke="#FFAB74" strokeOpacity=".16" strokeWidth="7" filter="url(#softGlow)" />
          </svg>
        </div>

        <div className="orbit-caption">
          <span className="caption-line" />
          <p><strong>THE HYPOTHESIS</strong><br />Interlocking fragments orbit a quiet centre — a connected system, made memorable.</p>
        </div>
      </section>

      <footer className="orbit-footer">
        <span>POCKET REFERENCE / EDUCATOR LOG</span>
        <span>RTO · 2025</span>
      </footer>

      <style>{`
        .orbit-stage { min-height: 100dvh; position: relative; overflow: hidden; isolation: isolate; background: #100A18; color: #F6EAF2; font-family: 'DM Sans', ui-sans-serif, sans-serif; padding: 30px 36px 28px; }
        .orbit-stage:after { content: ""; position: absolute; inset: 0; pointer-events: none; opacity: .22; background-image: radial-gradient(#f9d2e8 0.55px, transparent 0.55px); background-size: 5px 5px; mix-blend-mode: soft-light; }
        .orbit-grid { position: absolute; inset: 0; opacity: .16; background: linear-gradient(90deg, transparent 49.9%, #9b6dc4 50%, transparent 50.1%), linear-gradient(0deg, transparent 49.9%, #9b6dc4 50%, transparent 50.1%); background-size: 92px 92px; mask-image: radial-gradient(circle at 50% 52%, black, transparent 67%); }
        .orbit-header, .orbit-footer { position: relative; z-index: 2; display: flex; align-items: center; gap: 10px; color: #9C87AA; letter-spacing: .18em; font-size: 9px; font-weight: 700; }
        .brand-dot { width: 7px; height: 7px; border-radius: 50%; background: #FF9D70; box-shadow: 0 0 0 4px #ff9d7020; }
        .header-index { margin-left: auto; color: #6D597B; }
        .orbit-presentation { position: relative; z-index: 1; max-width: 620px; margin: 0 auto; display: flex; min-height: calc(100dvh - 108px); flex-direction: column; align-items: center; justify-content: center; }
        .orbit-copy { text-align: center; animation: orbit-in .75s ease both; }
        .kicker { color: #FF9D70; letter-spacing: .28em; font-size: 9px; font-weight: 800; margin: 0 0 12px; }
        .orbit-copy h1 { font-family: 'Fraunces', Georgia, serif; font-size: clamp(42px, 8vw, 62px); letter-spacing: -.055em; line-height: .9; margin: 0; font-weight: 500; }
        .lead { max-width: 270px; color: #BBA7C0; font-size: 12px; line-height: 1.55; margin: 16px auto 0; }
        .icon-frame { width: min(72vw, 360px); aspect-ratio: 1; position: relative; margin: 23px auto 16px; animation: orbit-in .9s .12s ease both; }
        .orbit-icon { width: 100%; height: 100%; position: relative; z-index: 2; display: block; }
        .orbit-ring { position: absolute; border: 1px solid #A56CCB; border-radius: 50%; left: 50%; top: 50%; transform: translate(-50%, -50%); pointer-events: none; }
        .ring-outer { width: 108%; height: 108%; opacity: .33; border-style: dashed; border-spacing: 8px; animation: orbit-spin 26s linear infinite; }
        .ring-inner { width: 91%; height: 91%; opacity: .16; border-color: #FF9D70; }
        .orbit-spark { position: absolute; z-index: 3; width: 5px; height: 5px; border-radius: 50%; background: #FFAC74; box-shadow: 0 0 0 5px #ffac7420; }
        .spark-a { top: 7%; left: 24%; } .spark-b { right: 11%; bottom: 23%; background: #E679A7; }
        .orbit-caption { display: flex; align-items: flex-start; gap: 13px; max-width: 270px; margin-top: 7px; animation: orbit-in .75s .22s ease both; }
        .caption-line { width: 22px; height: 1px; margin-top: 7px; background: #FF9D70; flex: none; }
        .orbit-caption p { color: #9F8AA8; font-size: 10px; line-height: 1.55; margin: 0; }
        .orbit-caption strong { color: #F4C2B0; letter-spacing: .18em; font-size: 8px; }
        .orbit-footer { justify-content: space-between; margin-top: 7px; color: #614B70; }
        @keyframes orbit-in { from { opacity: 0; transform: translateY(12px) scale(.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes orbit-spin { to { transform: translate(-50%, -50%) rotate(360deg); } }
        @media (max-width: 430px) { .orbit-stage { padding: 24px 22px; } .orbit-presentation { min-height: calc(100dvh - 92px); } .orbit-footer { font-size: 7px; } .orbit-copy h1 { font-size: 48px; } .icon-frame { margin-top: 19px; } }
      `}</style>
    </main>
  );
}