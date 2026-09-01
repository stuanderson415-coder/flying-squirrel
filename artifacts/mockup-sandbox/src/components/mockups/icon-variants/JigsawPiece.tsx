import { useState } from "react";

const piecePath =
  "M120 94H241C241 72 258 55 280 55C302 55 319 72 319 94H440V215C462 215 479 232 479 254C479 276 462 293 440 293V414H319C319 436 302 453 280 453C258 453 241 436 241 414H120V293C98 293 81 276 81 254C81 232 98 215 120 215V94Z";

export function JigsawPiece() {
  const [focused, setFocused] = useState(false);

  return (
    <main className="min-h-[100dvh] overflow-hidden bg-[#100c17] px-6 py-8 text-[#f8f0ea] sm:px-10 sm:py-10">
      <div className="mx-auto flex min-h-[calc(100dvh-4rem)] max-w-[720px] flex-col justify-between">
        <header className="flex items-start justify-between">
          <div>
            <p className="font-['Space_Mono'] text-[10px] uppercase tracking-[0.24em] text-[#aaa0b8]">
              RTO Standards Companion
            </p>
            <p className="mt-2 text-sm text-[#6f6478]">Icon study / 01</p>
          </div>
          <button
            type="button"
            onClick={() => setFocused((value) => !value)}
            className="rounded-full border border-[#3a2c46] px-3 py-1.5 font-['Space_Mono'] text-[10px] uppercase tracking-[0.16em] text-[#d7a9bb] transition-transform duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#f47b4b]"
            aria-pressed={focused}
          >
            {focused ? "Detail on" : "Inspect detail"}
          </button>
        </header>

        <section className="relative flex flex-1 items-center justify-center py-12">
          <div className="absolute h-[360px] w-[360px] rounded-full bg-[#42245d]/30 blur-3xl" />
          <div
            className={`relative aspect-square w-[min(76vw,460px)] transition-transform duration-500 ${
              focused ? "scale-[1.04]" : "scale-100"
            }`}
          >
            <svg
              viewBox="0 0 560 560"
              className="h-full w-full drop-shadow-[0_28px_38px_rgba(0,0,0,0.42)]"
              role="img"
              aria-label="A warm orange jigsaw piece with a subtle RTO inset"
            >
              <defs>
                <linearGradient id="ember" x1="90" y1="60" x2="450" y2="500" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#ffad68" />
                  <stop offset="0.5" stopColor="#f47b4b" />
                  <stop offset="1" stopColor="#cc416c" />
                </linearGradient>
                <linearGradient id="inset" x1="178" y1="180" x2="382" y2="380" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#28163b" />
                  <stop offset="1" stopColor="#412052" />
                </linearGradient>
                <filter id="soft">
                  <feGaussianBlur stdDeviation="5" />
                </filter>
              </defs>
              <path d={piecePath} fill="#07060b" opacity=".38" transform="translate(0 14)" filter="url(#soft)" />
              <path d={piecePath} fill="url(#ember)" stroke="#ffc28b" strokeWidth="3" />
              <path
                d="M166 146H251C251 132 262 121 276 121C290 121 301 132 301 146H386V231C400 231 411 242 411 256C411 270 400 281 386 281V366H301C301 380 290 391 276 391C262 391 251 380 251 366H166V281C152 281 141 270 141 256C141 242 152 231 166 231V146Z"
                fill="url(#inset)"
                opacity={focused ? "0.96" : "0.78"}
                stroke="#ffb477"
                strokeOpacity=".34"
                strokeWidth="2"
              />
              <g fill="#f8dfd2" fontFamily="DM Sans, sans-serif" fontWeight="700" textAnchor="middle">
                <text x="225" y="263" fontSize="62" letterSpacing="-5">R</text>
                <text x="276" y="263" fontSize="62" letterSpacing="-5">T</text>
                <text x="327" y="263" fontSize="62" letterSpacing="-5">O</text>
              </g>
              <path d="M194 300H360" stroke="#f47b4b" strokeWidth="3" strokeLinecap="round" opacity=".9" />
            </svg>
          </div>
        </section>

        <footer className="flex items-end justify-between gap-6 border-t border-[#2b2234] pt-5">
          <div>
            <p className="font-['Fraunces'] text-xl text-[#f8f0ea]">The clearest cue wins.</p>
            <p className="mt-1 max-w-[360px] text-xs leading-5 text-[#8e8295]">
              A single confident piece carries the memory. Look closer: RTO is tucked into the join.
            </p>
          </div>
          <span className="shrink-0 font-['Space_Mono'] text-[10px] uppercase tracking-[0.16em] text-[#f47b4b]">
            Pocket reference
          </span>
        </footer>
      </div>
    </main>
  );
}