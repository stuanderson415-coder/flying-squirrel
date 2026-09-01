export function LargeMeasurePiece() {
  return (
    <main className="measure-stage" aria-label="RTO Standards Companion app icon concept">
      <div className="measure-grain" aria-hidden="true" />
      <header className="measure-header">
        <span className="measure-knot" />
        <span>RTO STANDARDS COMPANION</span>
        <span className="measure-index">03 / 03</span>
      </header>

      <section className="measure-layout">
        <div className="measure-copy">
          <p className="measure-kicker">STANDARDS AS MEASUREMENT</p>
          <h1>Large<br /><em>Measure</em> Piece</h1>
          <p>A bold pocket mark for educators checking every part of the practice against the standard.</p>
        </div>

        <div className="hero-icon-wrap">
          <div className="icon-measurements" aria-hidden="true">
            <span>80%</span><i /><span>ONE PIECE</span>
          </div>
          <IconMark label="Large RTO Standards Companion icon" />
        </div>

        <aside className="measure-note">
          <span className="note-rule" />
          <p><strong>THE HYPOTHESIS</strong><br />One oversized piece makes the system instantly recognisable. A warm measuring edge keeps the purpose practical, not abstract.</p>
        </aside>
      </section>

      <section className="scale-checks" aria-label="App icon scale checks">
        <div className="scale-heading"><span>LEGIBILITY CHECK</span><i />HOME-SCREEN SCALES</div>
        <div className="scale-row">
          <Scale size={64} text="64 px" />
          <Scale size={32} text="32 px" />
          <Scale size={20} text="20 px" />
        </div>
      </section>

      <footer className="measure-footer">
        <span>PRIVATE GUIDE / EDUCATOR LOG</span>
        <span>AUSTRALIAN VET · 2025</span>
      </footer>

      <style>{`
        .measure-stage { min-height:100dvh; box-sizing:border-box; position:relative; overflow:hidden; isolation:isolate; background:#100916; color:#f7ebf3; padding:30px 38px 22px; font-family:'DM Sans', ui-sans-serif, sans-serif; }
        .measure-stage:before { content:""; position:absolute; inset:0; z-index:-2; background:radial-gradient(circle at 50% 42%, #2f1745 0, #170c22 38%, #100916 72%); }
        .measure-stage:after { content:""; position:absolute; inset:20px; z-index:-1; border:1px solid rgba(211,162,244,.12); border-radius:18px; pointer-events:none; }
        .measure-grain { position:absolute; inset:0; opacity:.19; pointer-events:none; background-image:radial-gradient(#e5c4ef .5px,transparent .7px); background-size:5px 5px; mix-blend-mode:soft-light; }
        .measure-header,.measure-footer { position:relative; z-index:2; display:flex; align-items:center; gap:10px; font-size:9px; letter-spacing:.19em; font-weight:800; color:#aa94b6; }
        .measure-knot { width:8px; height:8px; border-radius:2px; background:#f18953; transform:rotate(45deg); box-shadow:0 0 0 4px rgba(241,137,83,.15); }
        .measure-index { margin-left:auto; color:#75617f; }
        .measure-layout { width:min(975px,100%); min-height:calc(100dvh - 171px); margin:auto; display:grid; grid-template-columns:1fr minmax(340px,440px) 1fr; align-items:center; gap:30px; }
        .measure-copy { animation:measure-rise .75s both; }
        .measure-kicker { margin:0 0 14px; color:#f39a63; letter-spacing:.23em; font-size:9px; font-weight:800; }
        .measure-copy h1 { margin:0; font-family:'Fraunces',Georgia,serif; font-size:clamp(42px,5.2vw,67px); line-height:.85; letter-spacing:-.075em; font-weight:500; }
        .measure-copy h1 em { color:#d9a8fb; font-style:italic; font-weight:400; }
        .measure-copy > p:last-child { max-width:230px; margin:22px 0 0; color:#bba9c2; font-size:12px; line-height:1.65; }
        .hero-icon-wrap { position:relative; width:100%; max-width:440px; aspect-ratio:1; animation:measure-rise .8s .1s both; }
        .icon-measurements { position:absolute; z-index:3; left:-20px; top:9%; color:#f5a271; font-family:'Space Mono',monospace; font-size:8px; letter-spacing:.06em; display:grid; grid-template-columns:auto 44px auto; align-items:center; gap:7px; transform:rotate(-16deg); opacity:.78; }
        .icon-measurements i { height:1px; background:#f5a271; display:block; }
        .large-icon { display:block; width:100%; height:100%; filter:drop-shadow(0 20px 17px rgba(3,1,6,.45)); }
        .measure-note { align-self:end; margin-bottom:9%; display:flex; gap:12px; max-width:225px; animation:measure-rise .7s .22s both; }
        .note-rule { display:block; width:25px; height:1px; margin-top:8px; flex:none; background:#f29a65; }
        .measure-note p { margin:0; color:#a895ae; font-size:10px; line-height:1.6; }
        .measure-note strong { color:#efc1a7; font-size:8px; letter-spacing:.18em; }
        .scale-checks { position:relative; z-index:2; width:min(975px,100%); margin:-22px auto 17px; padding:13px 0 12px; border-top:1px solid rgba(207,160,236,.18); border-bottom:1px solid rgba(207,160,236,.12); }
        .scale-heading { color:#8d7999; display:flex; align-items:center; gap:10px; letter-spacing:.16em; font-size:8px; font-weight:800; }
        .scale-heading i { width:34px; height:1px; background:#ed9160; display:block; }
        .scale-row { display:flex; align-items:flex-end; justify-content:center; gap:clamp(25px,6vw,80px); margin-top:10px; }
        .scale { display:flex; align-items:center; gap:9px; color:#a997b0; font-family:'Space Mono',monospace; font-size:8px; letter-spacing:.06em; }
        .scale-icon { padding:3px; display:grid; place-items:center; border-radius:8px; background:#1c1128; box-shadow:inset 0 0 0 1px rgba(209,157,237,.12); }
        .scale-icon svg { display:block; }
        .measure-footer { justify-content:space-between; color:#685374; font-size:8px; }
        @keyframes measure-rise { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        @media (max-width:760px) { .measure-stage { padding:24px 23px 19px; } .measure-stage:after { inset:12px; } .measure-layout { min-height:auto; padding:58px 0 25px; grid-template-columns:1fr; gap:23px; text-align:center; } .measure-copy > p:last-child { margin:18px auto 0; } .hero-icon-wrap { width:min(86vw,390px); margin:auto; order:2; } .measure-note { order:3; margin:0 auto; text-align:left; } .scale-checks { margin:0 auto 16px; } .scale-row { justify-content:space-between; gap:4px; } .scale { gap:5px; } .measure-footer { font-size:6.5px; } .icon-measurements { left:-5px; } }
      `}</style>
    </main>
  );
}

function Scale({ size, text }: { size: number; text: string }) {
  return <div className="scale"><div className="scale-icon"><IconMark size={size} /></div><span>{text}</span></div>;
}

function IconMark({ size, label }: { size?: number; label?: string }) {
  return (
    <svg className={size ? undefined : "large-icon"} width={size} height={size} viewBox="0 0 256 256" role={label ? "img" : undefined} aria-label={label}>
      <defs>
        <linearGradient id="piece-violet" x1="53" y1="28" x2="204" y2="230" gradientUnits="userSpaceOnUse">
          <stop stopColor="#b276f4" /><stop offset=".54" stopColor="#7436ae" /><stop offset="1" stopColor="#4a206f" />
        </linearGradient>
        <linearGradient id="measure-ember" x1="53" y1="208" x2="202" y2="181" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffbe7a" /><stop offset="1" stopColor="#ef714b" />
        </linearGradient>
      </defs>
      <rect x="8" y="8" width="240" height="240" rx="54" fill="#1b1028" stroke="#c997ee" strokeOpacity=".2" />
      <path d="M66 40h48c-7 7-9 17-4 26 6 11 19 15 30 9 10-5 14-19 8-29-1-3-4-6-6-8h48c14 0 26 12 26 26v52c-8-6-18-8-28-3-13 7-17 23-10 35 7 12 23 16 35 9 1-2 3-3 4-5v48c0 14-12 26-26 26h-49c6-7 8-16 4-25-5-12-19-17-30-11-12 5-17 19-11 30 2 3 4 5 7 7H65c-14 0-26-12-26-26v-51c7 6 17 9 27 4 12-6 17-20 11-32-6-12-20-17-31-11-3 1-5 3-7 5V66c0-14 12-26 27-26Z" fill="url(#piece-violet)" stroke="#d3a2f3" strokeWidth="3" strokeLinejoin="round" />
      <path d="M47 197h163" stroke="url(#measure-ember)" strokeWidth="10" strokeLinecap="round" />
      <g stroke="#ffcf9e" strokeWidth="5" strokeLinecap="round">
        <path d="M65 197v-23" /><path d="M96 197v-13" /><path d="M128 197v-23" /><path d="M160 197v-13" /><path d="M191 197v-23" />
      </g>
      <path d="M48 214h160" stroke="#ef7751" strokeOpacity=".35" strokeWidth="2" strokeDasharray="2 7" />
    </svg>
  );
}