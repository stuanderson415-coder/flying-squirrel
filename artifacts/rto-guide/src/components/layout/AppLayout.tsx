import { useEffect, useState, type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import {
  DIARY_ENTRIES_UPDATED_EVENT,
  DIARY_STORAGE_KEY,
} from "@/lib/diary-backup";
import {
  BookOpen,
  Github,
  Home,
  LayoutList,
  NotebookPen,
  Archive,
  Star,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

const NAV_ITEMS = [
  { href: "/", label: "Home", icon: Home, match: (l: string) => l === "/" },
  {
    href: "/standards",
    label: "Standards",
    icon: LayoutList,
    match: (l: string) =>
      l.startsWith("/standards") || l.startsWith("/quality-areas"),
  },
  {
    href: "/practice",
    label: "Practice",
    icon: NotebookPen,
    match: (l: string) => l.startsWith("/practice") || l.startsWith("/reflect"),
  },
  {
    href: "/record",
    label: "Educator Log",
    icon: Archive,
    match: (l: string) => l.startsWith("/record"),
  },
  {
    href: "/reference",
    label: "Reference",
    icon: BookOpen,
    match: (l: string) => l.startsWith("/reference") || l.startsWith("/glossary"),
  },
];

export function AppLayout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [reflectionCount, setReflectionCount] = useState(0);

  useEffect(() => {
    const syncReflectionCount = () => {
      try {
        const stored = JSON.parse(
          window.localStorage.getItem(DIARY_STORAGE_KEY) ?? "[]",
        ) as unknown;
        setReflectionCount(Array.isArray(stored) ? stored.length : 0);
      } catch {
        setReflectionCount(0);
      }
    };

    syncReflectionCount();
    window.addEventListener("storage", syncReflectionCount);
    window.addEventListener(DIARY_ENTRIES_UPDATED_EVENT, syncReflectionCount);
    return () => {
      window.removeEventListener("storage", syncReflectionCount);
      window.removeEventListener(
        DIARY_ENTRIES_UPDATED_EVENT,
        syncReflectionCount,
      );
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex overflow-x-hidden w-full">

      {/* ── Desktop left sidebar ───────────────────────────────────────── */}
      <aside
        className="hidden md:flex flex-col fixed inset-y-0 left-0 z-20 w-56 border-r border-border/50"
        style={{ background: "hsl(var(--sidebar))" }}
      >
        {/* Sidebar logo */}
        <div className="px-5 pt-7 pb-5 border-b border-border/40">
          <Link href="/">
            <div className="cursor-pointer">
              <p className="text-[9px] uppercase tracking-[0.25em] font-semibold" style={{ color: "hsl(28,90%,60%)" }}>2026 Edition</p>
              <p className="text-sm font-bold text-foreground leading-tight mt-0.5">RTO Standards<br/>Companion</p>
            </div>
          </Link>
        </div>

        {/* Sidebar nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const active = item.match(location);
            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all ${
                    active
                      ? "bg-primary/15 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                  }`}
                  data-testid={`sidebar-nav-${item.label.toLowerCase()}`}
                  onClick={() => window.scrollTo({ top: 0 })}
                >
                  <item.icon
                    className="w-4 h-4 shrink-0"
                    strokeWidth={active ? 2.4 : 1.8}
                  />
                   <span className="text-sm font-medium">{item.label}</span>
                   {item.href === "/record" && (
                     <span
                       className="ml-auto min-w-5 rounded-full bg-primary/15 px-1.5 py-0.5 text-center text-[10px] font-semibold text-primary"
                        aria-label={`${reflectionCount} ${reflectionCount === 1 ? "entry" : "entries"} to date`}
                     >
                       {reflectionCount}
                     </span>
                   )}
                  {active && (
                    <span
                       className={`${item.href === "/record" ? "" : "ml-auto "}w-1.5 h-1.5 rounded-full`}
                      style={{ background: "hsl(28,90%,62%)" }}
                    />
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar footer */}
        <div className="px-5 py-4 border-t border-border/40 space-y-2">
          <a
            href="https://www.asqa.gov.au/standards"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] text-muted-foreground/50 hover:text-muted-foreground transition-colors tracking-wide uppercase flex items-center gap-1"
          >
            ASQA Standards 2025 ↗
          </a>
          <a
            href="https://www.asqa.gov.au/newsroom/asqacast"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] text-muted-foreground/50 hover:text-muted-foreground transition-colors tracking-wide uppercase flex items-center gap-1"
          >
            ASQAcast ↗
          </a>
          <a
            href="https://github.com/stuanderson415-coder/RTO-Standards-Companion"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] text-muted-foreground/50 hover:text-muted-foreground transition-colors tracking-wide flex items-center gap-1"
            aria-label="Open source repository on GitHub"
          >
            <Github className="w-3 h-3" />
            Open source · MIT ↗
          </a>
          <div className="pt-2 border-t border-border/30 space-y-1">
            <p className="text-[9px] uppercase tracking-[0.12em] text-muted-foreground/40">
              Made in Fastigiata Homelab · Free to use, fork or distribute under MIT License · 2026
            </p>
            <p className="text-[8px] uppercase tracking-[0.12em] text-muted-foreground/30">
              Version 6
            </p>
          </div>
        </div>
      </aside>

      {/* ── Main column ────────────────────────────────────────────────── */}
      <div className="flex-1 min-w-0 md:ml-56 flex flex-col min-h-screen">

        {/* Top bar */}
        <header className="sticky top-0 z-10 bg-background/85 backdrop-blur-xl border-b border-border/50">
          <div className="px-4 pt-4 pb-3 flex items-center justify-between gap-3 max-w-4xl mx-auto">

            {/* App name — mobile only (desktop has sidebar); tapping goes home */}
            <Link href="/" className="flex-1 md:flex-none">
              <span className="md:hidden">
                <span className="text-sm font-bold text-foreground tracking-tight">RTO Standards <span style={{ color: "hsl(28,90%,62%)" }}>Companion</span></span>
              </span>
              {/* Desktop: show current section label */}
              <span className="hidden md:block text-sm font-semibold text-foreground/70 tracking-wide">
                {NAV_ITEMS.find((n) => n.match(location))?.label ?? ""}
              </span>
            </Link>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <a
                href="https://github.com/stuanderson415-coder/RTO-Standards-Companion"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[10px] text-muted-foreground/50 hover:text-muted-foreground transition-colors tracking-wide"
                aria-label="Open source repository on GitHub"
              >
                <Github className="w-3 h-3" />
                <span>Open source</span>
              </a>
              <Link href="/favorites">
                <button
                  className="w-9 h-9 rounded-full bg-muted/50 flex items-center justify-center hover:bg-muted transition-colors"
                  aria-label="Saved favorites"
                  data-testid="button-header-favorites"
                >
                  <Star className="w-4 h-4" style={{ color: "hsl(28,90%,62%)" }} />
                </button>
              </Link>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 px-5 pt-5 pb-28 md:pb-10 overflow-x-hidden max-w-4xl mx-auto w-full">
          {children}
        </main>

        {/* ── Mobile-only bottom tab bar ──────────────────────────────── */}
        <nav
          className="md:hidden fixed bottom-0 left-0 right-0 z-30"
          aria-label="Primary"
        >
          <div className="mx-3 mb-3 rounded-2xl bg-card/90 backdrop-blur-xl border border-border shadow-2xl shadow-black/40">
            <div className="grid grid-cols-5 gap-1 p-2">
              {NAV_ITEMS.map((item) => {
                const active = item.match(location);
                return (
                  <Link key={item.href} href={item.href}>
                    <div
                      className={`flex flex-col items-center justify-center gap-1 py-2 rounded-xl cursor-pointer transition-all ${
                        active
                          ? "bg-primary/15 text-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                      }`}
                      data-testid={`tab-${item.label.toLowerCase()}`}
                      onClick={() => window.scrollTo({ top: 0 })}
                    >
                      <item.icon
                        className="w-[18px] h-[18px]"
                        strokeWidth={active ? 2.4 : 1.8}
                      />
                      <span className="text-[10px] font-medium leading-none">
                        {item.label}
                      </span>
                       {item.href === "/record" && (
                         <span className="min-w-4 rounded-full bg-primary/15 px-1 text-[9px] font-semibold leading-3 text-primary">
                           {reflectionCount}
                         </span>
                       )}
                      {active && (
                        <span
                          className="w-1 h-1 rounded-full"
                          style={{ background: "hsl(28,90%,62%)" }}
                        />
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
