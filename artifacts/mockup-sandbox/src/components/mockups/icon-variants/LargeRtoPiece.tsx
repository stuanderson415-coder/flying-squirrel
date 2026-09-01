export function LargeRtoPiece() {
  const piecePath =
    "M92 36c0-14 11-25 25-25s25 11 25 25c0 8-4 15-10 20h60c10 0 18 8 18 18v51c5-6 12-10 20-10 14 0 25 11 25 25s-11 25-25 25c-8 0-15-4-20-10v57c0 10-8 18-18 18h-58c5-5 8-12 8-20 0-14-11-25-25-25s-25 11-25 25c0 8 3 15 8 20H60c-10 0-18-8-18-18v-56c5 6 12 10 20 10 14 0 25-11 25-25s-11-25-25-25c-8 0-15 4-20 10V79c0-10 8-18 18-18h42c-6-6-10-15-10-25Z";

  const sizes = [
    { size: 64, label: "64 px", note: "home screen" },
    { size: 32, label: "32 px", note: "app switcher" },
    { size: 20, label: "20 px", note: "tiny utility" },
  ];

  return (
    <main className="large-piece-stage" aria-label="Large RTO Piece app icon presentation">
      <div className="piece-noise" aria-hidden="true" />
      <header className="piece-header">
        <div className="brand-lockup">
          <span className="brand-mark" />
          <span>RTO STANDARDS COMPANION</span>
        </div>
        <span className="header-count">ICON STUDY / 03</span>
      </header>

      <section className="piece-layout">
        <div className="piece-intro">
          <p className="piece-kicker">DIRECT RECOGNITION</p>
          <h1>Large<br /><em>RTO</em> Piece</h1>
          <p className="piece-lead">
            One useful thing, made unmistakable. A single oversized piece turns
            the guide into a pocket signal for educators.
          </p>
          <div className="hypothesis">
            <span className="hypothesis-rule" />
            <p><strong>THE HYPOTHESIS</strong><br />A familiar connection shape carries the name inside its own seam — no badge, no extra metaphor.</p>
          </div>
        </div>

        <div className="piece-showcase">
          <div className="halo halo-one" aria-hidden="true" />
          <div className="halo halo-two" aria-hidden="true" />
          <div className="icon-card">
            <svg viewBox="0 0 280 280" className="hero-icon" role="img" aria-labelledby="piece-title piece-desc">
              <title id="piece-title">Large RTO Piece</title>
              <desc id="piece-desc">A single light purple jigsaw piece with the letters RTO inset into its centre.</desc>
              <defs>
                <linearGradient id="pieceLilac" x1="44" y1="18" x2="225" y2="255" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#D6B8FF" />
                  <stop offset=".45" stopColor="#A978EB" />
                  <stop offset="1" stopColor="#7446B5" />
                </linearGradient>
                <linearGradient id="pieceEdge" x1="48" y1="20" x2="232" y2="260" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#F0DFFF" />
                  <stop offset=".55" stopColor="#B58AF4" />
                  <stop offset="1" stopColor="#5B328D" />
                </linearGradient>
                <filter id="pieceDrop" x="-30%" y="-30%" width="170%" height="180%">
                  <feDropShadow dx="0" dy="18" stdDeviation="13" floodColor="#050207" floodOpacity=".8" />
                </filter>
                <clipPath id="pieceClip"><path d={piecePath} transform="translate(0 0) scale(.9) translate(16 16)" /></clipPath>
              </defs>
              <circle cx="140" cy="140" r="119" fill="#1B1028" stroke="#9D6BE8" strokeOpacity=".18" />
              <circle cx="140" cy="140" r="105" fill="none" stroke="#F0A06D" strokeOpacity=".2" strokeWidth="1" strokeDasharray="1 8" />
              <g filter="url(#pieceDrop)">
                <path d={piecePath} transform="translate(0 0) scale(.9) translate(16 16)" fill="url(#pieceLilac)" stroke="#E1C8FF" strokeOpacity=".82" strokeWidth="2" />
                <path d={piecePath} transform="translate(0 0) scale(.9) translate(16 16)" fill="none" stroke="url(#pieceEdge)" strokeOpacity=".55" strokeWidth="7" />
                <g clipPath="url(#pieceClip)">
                  <path d="M66 118h135M66 169h135" stroke="#FFAD73" strokeOpacity=".28" strokeWidth="1.5" strokeDasharray="2 7" />
                  <path d="M82 77c38 19 74 18 113-2" fill="none" stroke="#F3DFFF" strokeOpacity=".32" strokeWidth="2" />
                  <circle cx="204" cy="97" r="22" fill="#E77DA5" fillOpacity=".2" />
                </g>
              </g>
              <g fill="#271238" fontFamily="'Space Mono', monospace" fontWeight="700" textAnchor="middle">
                <text x="140" y="151" fontSize="45" letterSpacing="-4">RTO</text>
              </g>
              <path d="M88 177h104" stroke="#F8D3C2" strokeOpacity=".58" strokeWidth="2" />
              <path d="M101 187h78" stroke="#FFAA74" strokeOpacity=".55" strokeWidth="1" strokeDasharray="1 5" />
              <circle cx="60" cy="56" r="3" fill="#FFAD73" />
              <circle cx="224" cy="224" r="3" fill="#E77DA5" />
            </svg>
            <div className="icon-card-foot"><span>PRIMARY MARK</span><span>01 — 01</span></div>
          </div>
        </div>
      </section>

      <section className="scale-section" aria-labelledby="scale-title">
        <div className="scale-heading">
          <p className="piece-kicker">READS AT A GLANCE</p>
          <h2 id="scale-title">Scale checks</h2>
          <p>Inset lettering stays legible as the mark gets smaller.</p>
        </div>
        <div className="scale-row">
          {sizes.map((item) => (
            <div className="scale-check" key={item.size}>
              <div className="scale-icon-wrap" style={{ width: item.size + 28, height: item.size + 28 }}>
                <svg viewBox="0 0 280 280" className="scale-icon" role="img" aria-label={`${item.label} RTO Piece`}>
                  <defs><linearGradient id={`smallLilac${item.size}`} x1="40" y1="10" x2="230" y2="270"><stop stopColor="#D6B8FF" /><stop offset="1" stopColor="#7446B5" /></linearGradient></defs>
                  <path d={piecePath} transform="translate(0 0) scale(.9) translate(16 16)" fill={`url(#smallLilac${item.size})`} stroke="#E2CCFF" strokeWidth="2" />
                  <text x="140" y="154" fill="#281339" fontFamily="'Space Mono', monospace" fontWeight="700" textAnchor="middle" fontSize="44" letterSpacing="-4">RTO</text>
                </svg>
              </div>
              <strong>{item.label}</strong>
              <span>{item.note}</span>
            </div>
          ))}
        </div>
      </section>

      <footer className="piece-footer"><span>POCKET REFERENCE / EDUCATOR LOG</span><span>RTO · 2025</span></footer>

      <style>{`
        .large-piece-stage { min-height:100dvh; overflow:hidden; isolation:isolate; position:relative; padding:30px 38px 26px; color:#F8EEF8; background:#100812; font-family:'DM Sans',ui-sans-serif,sans-serif; }
        .large-piece-stage:before { content:""; position:absolute; inset:0; z-index:-2; background:radial-gradient(ellipse at 70% 37%,#321A4C 0%,#180D22 38%,#100812 73%); }
        .piece-noise { position:fixed; inset:0; z-index:4; pointer-events:none; opacity:.16; background-image:radial-gradient(#f5d8ec .5px,transparent .5px); background-size:5px 5px; mix-blend-mode:soft-light; }
        .piece-header,.piece-footer { display:flex; align-items:center; position:relative; z-index:2; color:#9C86AB; font-size:9px; font-weight:700; letter-spacing:.18em; }
        .brand-lockup { display:flex; align-items:center; gap:10px; }.brand-mark { width:7px; height:7px; background:#FF9D70; transform:rotate(45deg); }.header-count { margin-left:auto; color:#6C5879; }
        .piece-layout { max-width:1000px; margin:0 auto; display:grid; grid-template-columns: .85fr 1.15fr; align-items:center; gap:42px; min-height:405px; }
        .piece-intro { animation:pieceIn .75s ease both; }.piece-kicker { margin:0 0 13px; color:#FF9D70; font-size:9px; font-weight:800; letter-spacing:.28em; }
        h1 { margin:0; font-family:'Fraunces',Georgia,serif; font-size:clamp(46px,7vw,76px); font-weight:500; letter-spacing:-.065em; line-height:.84; } h1 em { color:#C59AF7; font-style:normal; }
        .piece-lead { color:#BDA9C3; font-size:12px; line-height:1.55; max-width:265px; margin:22px 0 0; }
        .hypothesis { display:flex; gap:12px; margin-top:31px; max-width:290px; }.hypothesis-rule { width:22px; height:1px; background:#FF9D70; margin-top:7px; flex:none; }.hypothesis p { margin:0; color:#9F8BA8; font-size:10px; line-height:1.52; }.hypothesis strong { color:#F4C2B0; font-size:8px; letter-spacing:.17em; }
        .piece-showcase { position:relative; display:flex; justify-content:center; animation:pieceIn .9s .1s ease both; }.icon-card { width:min(42vw,375px); padding:21px 21px 16px; background:#191022; border:1px solid #6D498B; box-shadow:0 18px 45px #05020780, inset 0 0 0 1px #e0bfff0b; transform:rotate(2deg); }.hero-icon { display:block; width:100%; height:auto; }.icon-card-foot { display:flex; justify-content:space-between; padding-top:8px; color:#786383; font-size:8px; letter-spacing:.18em; }.halo { position:absolute; border:1px solid #B275E9; border-radius:50%; pointer-events:none; }.halo-one { width:83%; aspect-ratio:1; opacity:.17; transform:rotate(-18deg); }.halo-two { width:106%; aspect-ratio:1; border-color:#FF9D70; border-style:dashed; opacity:.13; transform:rotate(28deg); }
        .scale-section { max-width:1000px; margin:2px auto 0; display:flex; align-items:center; border-top:1px solid #4A3157; padding-top:20px; animation:pieceIn .75s .2s ease both; }.scale-heading { flex:1; }.scale-heading .piece-kicker { margin-bottom:8px; }.scale-heading h2 { margin:0; font-family:'Fraunces',Georgia,serif; font-size:27px; font-weight:500; letter-spacing:-.04em; }.scale-heading p:last-child { margin:5px 0 0; color:#8F7B99; font-size:10px; }
        .scale-row { display:flex; gap:27px; padding-right:24px; }.scale-check { display:flex; align-items:center; flex-direction:column; gap:5px; color:#C9B6D0; }.scale-icon-wrap { display:grid; place-items:center; background:#1A1025; border:1px solid #4C3260; }.scale-icon { width:82%; height:82%; }.scale-check strong { color:#F2DCEB; font-size:10px; letter-spacing:.05em; }.scale-check span { color:#776580; font-size:8px; }
        .piece-footer { justify-content:space-between; margin-top:25px; color:#604C6D; }.piece-footer span { font-size:8px; }
        @keyframes pieceIn { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        @media (max-width:720px) { .large-piece-stage { padding:24px 22px 20px; }.piece-layout { grid-template-columns:1fr; gap:18px; min-height:0; padding:42px 0 28px; }.piece-intro { text-align:center; }.piece-lead { margin-left:auto; margin-right:auto; }.hypothesis { margin:23px auto 0; text-align:left; }.piece-showcase { order:-1; }.icon-card { width:min(68vw,310px); }.scale-section { display:block; }.scale-heading { text-align:center; }.scale-row { justify-content:center; padding:18px 0 0; gap:16px; }.piece-footer { margin-top:28px; font-size:7px; } }
      `}</style>
    </main>
  );
}

export default LargeRtoPiece;