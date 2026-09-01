import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import jigsawHero from "@/assets/jigsaw-hero.png";

const SESSION_KEY = "rto-guide:splash-seen";

const FEATURES = [
  "4 quality areas · 23 Outcome Standards",
  "Track your progress standard by standard",
  "Keep a private educator practice record",
  "Works on desktop, tablet and mobile",
];

interface SplashScreenProps {
  onDismiss: () => void;
}

/* ── Shared fade/rise keyframes ──────────────────────────────────────────── */
const KEYFRAMES = `
  @keyframes splashRise {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes splashFadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
`;

/* ── Mobile layout (< md) ────────────────────────────────────────────────── */
function MobileSplash({ onDismiss }: SplashScreenProps) {
  return (
    <div className="relative z-10 h-full w-full max-w-[440px] mx-auto flex flex-col">
      {/* Jigsaw hero — top half */}
      <div
        className="relative flex-shrink-0 overflow-hidden"
        style={{
          height: "36%",
          animation: "splashFadeIn 700ms 80ms cubic-bezier(0.22,1,0.36,1) both",
        }}
      >
        <img
          src={jigsawHero}
          alt=""
          className="w-full h-full object-cover"
          style={{ objectPosition: "center 30%" }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-28 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, hsl(240,6%,8%))" }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "hsl(265,60%,20%,0.25)" }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col px-7 pt-2 pb-4">
        <div style={{ animation: "splashRise 700ms 250ms cubic-bezier(0.22,1,0.36,1) both" }}>
          <p className="text-[10px] uppercase tracking-[0.3em] font-sans mb-2" style={{ color: "hsl(28,90%,58%)" }}>
            VET Educator Support
          </p>
          <h1 className="font-sans leading-none tracking-tight">
            <span className="block font-semibold text-[1.75rem] text-foreground/90">RTO Standards</span>
            <span
              className="block font-black text-[3.25rem] leading-none bg-gradient-to-br from-[hsl(28,90%,68%)] via-[hsl(280,90%,78%)] to-[hsl(255,80%,65%)] bg-clip-text text-transparent"
              style={{ letterSpacing: "-0.03em" }}
            >
              Companion
            </span>
          </h1>
        </div>

        <div
          className="flex items-center gap-3 mt-2"
          style={{ animation: "splashFadeIn 500ms 220ms cubic-bezier(0.22,1,0.36,1) both" }}
        >
          <span className="h-px flex-1 bg-border/60" />
          <span className="text-[9px] font-sans font-medium tracking-[0.28em] uppercase text-foreground/40">
            Practice · Reflect · Embed
          </span>
          <span className="h-px flex-1 bg-border/60" />
        </div>

        <p
          className="mt-2 text-sm text-foreground/55 leading-relaxed"
          style={{ animation: "splashFadeIn 500ms 300ms cubic-bezier(0.22,1,0.36,1) both" }}
        >
          Professional log and reflective diary for VET Educators.
        </p>

        <button
          onClick={onDismiss}
          className="mt-auto group inline-flex items-center justify-center gap-3 w-full py-3.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold tracking-wide hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/25 hover:-translate-y-0.5"
          style={{ animation: "splashFadeIn 500ms 400ms cubic-bezier(0.22,1,0.36,1) both" }}
          data-testid="button-enter-splash"
        >
          Enter the guide
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>

        <div
          className="flex items-center justify-between mt-4"
          style={{ animation: "splashFadeIn 500ms 520ms cubic-bezier(0.22,1,0.36,1) both" }}
        >
          <p className="text-[8px] uppercase tracking-[0.14em] text-foreground/25">
            Made in Fastigiata Homelab · Free to use, fork or distribute under MIT License · 2026
          </p>
          <button
            onClick={onDismiss}
            className="text-[11px] text-foreground/35 hover:text-foreground/70 transition-colors"
            data-testid="button-skip-splash"
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Desktop landing page (md+) ─────────────────────────────────────────── */
function DesktopSplash({ onDismiss }: SplashScreenProps) {
  return (
    <div className="relative z-10 h-full w-full flex items-stretch">

      {/* Left: brand + copy + CTA */}
      <div
        className="flex flex-col justify-center px-16 xl:px-24 w-[52%] shrink-0"
        style={{ animation: "splashRise 700ms 100ms cubic-bezier(0.22,1,0.36,1) both" }}
      >
        {/* Edition label */}
        <p className="text-xs uppercase tracking-[0.35em] font-semibold mb-3" style={{ color: "hsl(28,90%,58%)" }}>
          VET Educator Support
        </p>

        {/* Title */}
        <h1 className="font-sans leading-none tracking-tight mb-6">
          <span className="block font-semibold text-4xl xl:text-5xl text-foreground/90 mb-1">
            RTO Standards
          </span>
          <span
            className="block font-black text-6xl xl:text-7xl leading-none bg-gradient-to-br from-[hsl(28,90%,68%)] via-[hsl(280,90%,78%)] to-[hsl(255,80%,65%)] bg-clip-text text-transparent"
            style={{ letterSpacing: "-0.03em" }}
          >
            Companion
          </span>
        </h1>

        {/* Description */}
        <p className="text-base text-foreground/55 leading-relaxed max-w-sm mb-8">
          Professional log and reflective diary for VET Educators.
        </p>

        {/* Feature list */}
        <ul className="space-y-3 mb-10">
          {FEATURES.map((f) => (
            <li key={f} className="flex items-start gap-3 text-sm text-foreground/70">
              <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "hsl(265,80%,70%)" }} />
              {f}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="flex items-center gap-4">
          <button
            onClick={onDismiss}
            className="group inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold tracking-wide hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/25 hover:-translate-y-0.5"
            data-testid="button-enter-splash"
          >
            Enter the guide
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
          <button
            onClick={onDismiss}
            className="text-sm text-foreground/35 hover:text-foreground/70 transition-colors"
            data-testid="button-skip-splash"
          >
            Skip →
          </button>
        </div>

        {/* Tagline */}
        <p className="mt-10 text-[10px] tracking-[0.3em] uppercase text-foreground/25">
          Practice · Reflect · Embed
        </p>
        <p className="mt-4 text-[9px] uppercase tracking-[0.18em] text-foreground/25">
          Made in Fastigiata Homelab · Free to use, fork or distribute under MIT License · 2026
        </p>

      </div>

      {/* Right: jigsaw image */}
      <div
        className="flex-1 relative overflow-hidden"
        style={{ animation: "splashFadeIn 900ms 60ms cubic-bezier(0.22,1,0.36,1) both" }}
      >
        <img
          src={jigsawHero}
          alt=""
          className="w-full h-full object-cover"
          style={{ objectPosition: "center 30%" }}
        />
        {/* Fade left edge into background */}
        <div
          className="absolute inset-y-0 left-0 w-40 pointer-events-none"
          style={{ background: "linear-gradient(to right, hsl(240,6%,8%), transparent)" }}
        />
        {/* Purple tint */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "hsl(265,60%,15%,0.35)" }}
        />
      </div>
    </div>
  );
}

/* ── Outer wrapper (handles animation + layout switching) ────────────────── */
function SplashContent({ onDismiss }: SplashScreenProps) {
  const [leaving, setLeaving] = useState(false);

  const handleDismiss = () => {
    setLeaving(true);
    window.setTimeout(onDismiss, 500);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " " || e.key === "Escape") {
        e.preventDefault();
        handleDismiss();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[100] overflow-hidden transition-opacity duration-500 ${leaving ? "opacity-0" : "opacity-100"}`}
      style={{ background: "hsl(240, 6%, 8%)" }}
    >
      {/* Grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(hsl(0,0%,100%) 0.5px, transparent 0.5px)",
          backgroundSize: "3px 3px",
        }}
      />

      {/* OPEN SOURCE EDITION banner */}
      <div
        className="absolute top-0 left-0 right-0 z-20 flex items-center justify-center gap-2.5 py-2 px-4 pointer-events-none"
        style={{
          background: "hsl(0,0%,100%,0.06)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          borderBottom: "1px solid hsl(0,0%,100%,0.08)",
        }}
      >
        {/* OSI / FOSS logo */}
        <svg
          viewBox="0 0 64 64"
          width="16"
          height="16"
          aria-label="Open Source Initiative"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ opacity: 0.7 }}
        >
          <circle cx="32" cy="32" r="29" stroke="hsl(28,90%,65%)" strokeWidth="4" />
          <circle cx="32" cy="20" r="7" fill="hsl(28,90%,65%)" />
          <line x1="32" y1="27" x2="32" y2="46" stroke="hsl(28,90%,65%)" strokeWidth="5" strokeLinecap="round" />
          <line x1="32" y1="33" x2="13" y2="22" stroke="hsl(28,90%,65%)" strokeWidth="4.5" strokeLinecap="round" />
          <line x1="32" y1="33" x2="51" y2="22" stroke="hsl(28,90%,65%)" strokeWidth="4.5" strokeLinecap="round" />
          <line x1="32" y1="46" x2="18" y2="58" stroke="hsl(28,90%,65%)" strokeWidth="4.5" strokeLinecap="round" />
          <line x1="32" y1="46" x2="46" y2="58" stroke="hsl(28,90%,65%)" strokeWidth="4.5" strokeLinecap="round" />
        </svg>
        <span
          className="text-[9px] font-semibold uppercase tracking-[0.3em]"
          style={{ color: "hsl(0,0%,100%,0.45)", fontFamily: "'DM Sans', sans-serif" }}
        >
          Open Source Edition
        </span>
      </div>

      {/* Mobile layout — shown below md breakpoint */}
      <div className="md:hidden h-full">
        <MobileSplash onDismiss={handleDismiss} />
      </div>

      {/* Desktop layout — shown at md and above */}
      <div className="hidden md:flex h-full">
        <DesktopSplash onDismiss={handleDismiss} />
      </div>

      <style>{KEYFRAMES}</style>
    </div>
  );
}

/* ── Public export ───────────────────────────────────────────────────────── */
export function SplashScreen() {
  const [show, setShow] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      if (window.location.search.includes("nosplash=1")) {
        setShow(false);
        return;
      }
      const seen = window.sessionStorage.getItem(SESSION_KEY);
      setShow(seen !== "1");
    } catch {
      setShow(false);
    }
  }, []);

  const handleDismiss = () => {
    try {
      window.sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // ignore
    }
    setShow(false);
  };

  if (!show) return null;
  return <SplashContent onDismiss={handleDismiss} />;
}
