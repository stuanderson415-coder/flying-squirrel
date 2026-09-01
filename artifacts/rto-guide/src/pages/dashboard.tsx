import { useEffect, useState } from "react";
import { Link } from "wouter";
import { useGetDashboardSummary } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowRight,
  BarChart2,
  BookOpen,
  ExternalLink,
  Play,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { StandardsReference } from "@/components/standards-reference";
import {
  DIARY_ENTRIES_UPDATED_EVENT,
  DIARY_STORAGE_KEY,
} from "@/lib/diary-backup";
import jigsawHero from "@/assets/jigsaw-hero.png";


function getDayGreeting(): string {
  const now = new Date();
  const day = now.toLocaleDateString("en-AU", { weekday: "long" });
  const hour = now.getHours();
  const period = hour < 12 ? "morning" : hour < 17 ? "afternoon" : "evening";
  return `${day} ${period}`;
}

export default function Dashboard() {
  useEffect(() => {
    document.title = "Dashboard | RTO Standards Companion";
  }, []);

  const { data: summary, isLoading, isError } = useGetDashboardSummary();
  const [entryCount, setEntryCount] = useState(0);

  useEffect(() => {
    const syncEntryCount = () => {
      try {
        const stored = JSON.parse(
          window.localStorage.getItem(DIARY_STORAGE_KEY) ?? "[]",
        ) as unknown;
        setEntryCount(Array.isArray(stored) ? stored.length : 0);
      } catch {
        setEntryCount(0);
      }
    };

    syncEntryCount();
    window.addEventListener("storage", syncEntryCount);
    window.addEventListener(DIARY_ENTRIES_UPDATED_EVENT, syncEntryCount);
    return () => {
      window.removeEventListener("storage", syncEntryCount);
      window.removeEventListener(DIARY_ENTRIES_UPDATED_EVENT, syncEntryCount);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-14 w-full rounded-2xl" />
        <Skeleton className="h-36 w-full rounded-2xl" />
        <Skeleton className="h-28 w-full rounded-2xl" />
        <Skeleton className="h-48 w-full rounded-2xl" />
      </div>
    );
  }

  if (isError || !summary) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center space-y-3">
        <h2 className="text-base font-semibold text-destructive">
          Failed to load dashboard
        </h2>
        <p className="text-xs text-muted-foreground">Please try refreshing.</p>
      </div>
    );
  }

  const entryProgress = Math.min(entryCount * 8, 100);

  return (
    <div className="space-y-3 animate-in fade-in duration-500">

      {/* Jigsaw image strip — full bleed with greeting overlaid */}
      <div className="relative -mx-5 -mt-5 h-36 overflow-hidden">
        <img
          src={jigsawHero}
          alt=""
          className="w-full h-full object-cover"
          style={{ objectPosition: "center 35%" }}
        />
        {/* Dark overlay — deepens to near-black at bottom */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.1) 35%, hsl(240,6%,5%) 100%)",
          }}
        />
        {/* Greeting overlaid at bottom-left */}
        <div className="absolute bottom-0 left-0 px-5 pb-3">
          <p className="text-[10px] uppercase tracking-[0.25em] font-sans" style={{ color: "hsl(28,90%,62%)" }}>
            {getDayGreeting()}
          </p>
          <h1 className="text-xl font-bold text-white mt-0.5 tracking-tight leading-none">
            Welcome back.
          </h1>
        </div>
      </div>

      {/* Educator log progress card — orange */}
      <div className="relative overflow-hidden rounded-2xl border border-orange-500/25 bg-gradient-to-br from-orange-500/20 via-orange-500/5 to-card p-4">
        <div
          className="absolute -right-10 -top-10 h-44 w-44 rounded-full opacity-25 blur-3xl pointer-events-none"
          style={{ background: "hsl(28, 90%, 62%)" }}
        />
        <div className="relative">
          <div className="flex items-center justify-between">
            <div className="text-[10px] uppercase tracking-[0.25em] font-semibold" style={{ color: "hsl(28,90%,62%)" }}>
              Your educator log
            </div>
            <span className="text-[11px] font-medium text-muted-foreground">
              {entryCount} {entryCount === 1 ? "entry" : "entries"}
            </span>
          </div>
          <div
            role="progressbar"
            aria-label="Educator log entries"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={entryProgress}
            className="mt-4 h-2 overflow-hidden rounded-full bg-orange-500/15"
          >
            <div
              className="h-full rounded-full bg-[hsl(28,90%,62%)] transition-all duration-700"
              style={{ width: `${entryProgress}%` }}
            />
          </div>
          <p className="mt-2 text-[11px] text-muted-foreground">
            Every entry adds to your professional record.
          </p>
        </div>
      </div>

      <StandardsReference />

      {/* NCVER National Statistics */}
      <section className="space-y-2">
        <SectionHeader icon={BarChart2} title="National VET Statistics" />
        <div className="rounded-2xl bg-card border border-border overflow-hidden">
          {/* Stats grid */}
          <div className="grid grid-cols-2 divide-x divide-y divide-border/60">
            <div className="p-3.5">
              <p className="text-[22px] font-bold text-foreground leading-none">5.1<span className="text-sm font-semibold text-muted-foreground ml-0.5">M</span></p>
              <p className="text-[10px] text-muted-foreground mt-1 leading-snug">Total VET students<br/><span className="text-foreground/60">2.2M in nationally recognised programs</span></p>
            </div>
            <div className="p-3.5">
              <p className="text-[22px] font-bold leading-none" style={{ color: "hsl(28,90%,62%)" }}>62.4<span className="text-sm font-semibold ml-0.5">%</span></p>
              <p className="text-[10px] text-muted-foreground mt-1 leading-snug">Completers with improved<br/>employment status</p>
            </div>
            <div className="p-3.5">
              <p className="text-[22px] font-bold text-foreground leading-none">89.3<span className="text-sm font-semibold text-muted-foreground ml-0.5">%</span></p>
              <p className="text-[10px] text-muted-foreground mt-1 leading-snug">Overall training satisfaction</p>
            </div>
            <div className="p-3.5">
              <p className="text-[22px] font-bold leading-none" style={{ color: "hsl(28,90%,62%)" }}>282<span className="text-sm font-semibold ml-0.5">K+</span></p>
              <p className="text-[10px] text-muted-foreground mt-1 leading-snug">Apprentices & trainees<br/><span className="text-foreground/60">91.8% employed after completing</span></p>
            </div>
            <div className="p-3.5">
              <p className="text-[22px] font-bold text-foreground leading-none">266<span className="text-sm font-semibold text-muted-foreground ml-0.5">K+</span></p>
              <p className="text-[10px] text-muted-foreground mt-1 leading-snug">VET in Schools students</p>
            </div>
            <div className="p-3.5">
              <p className="text-[22px] font-bold leading-none" style={{ color: "hsl(28,90%,62%)" }}>49.0<span className="text-sm font-semibold ml-0.5">%</span></p>
              <p className="text-[10px] text-muted-foreground mt-1 leading-snug">Qualification completion rate<br/><span className="text-foreground/60">55.5% at diploma level & above</span></p>
            </div>
          </div>
          {/* Funding bar */}
          <div className="px-4 py-3 border-t border-border/60 flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-[10px] uppercase tracking-[0.2em] font-semibold mb-0.5" style={{ color: "hsl(28,90%,62%)" }}>Government Funding</p>
              <p className="text-sm font-bold text-foreground">$10.0 billion</p>
              <p className="text-[10px] text-muted-foreground leading-snug">Supporting delivery, employer assistance and training systems</p>
            </div>
          </div>
          {/* NCVER dashboard link */}
          <a
            href="https://www.ncver.edu.au/research-and-statistics/statistics/vet-statistics-dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3 border-t border-border/60 hover:bg-muted/30 transition-colors group"
          >
            <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: "hsl(28,90%,62%,0.12)" }}>
              <BarChart2 className="w-3.5 h-3.5" style={{ color: "hsl(28,90%,62%)" }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] uppercase tracking-[0.18em] font-semibold" style={{ color: "hsl(28,90%,62%)" }}>NCVER</p>
              <p className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">Latest VET Statistics Dashboard</p>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-muted-foreground/50 group-hover:text-primary transition-colors shrink-0" />
          </a>
        </div>
      </section>

      {/* ASQA Resources */}
      <section className="space-y-3">
        <SectionHeader icon={Play} title="ASQA Resources" />

        {/* ASQA YouTube channel link */}
        <a
          href="https://youtube.com/@asqavideos?si=uOGxv4OQkSYio6Xs"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-4 py-3 rounded-xl bg-card border border-border hover:border-primary/40 transition-all group"
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"
            style={{ background: "hsl(0,80%,55%,0.15)" }}
          >
            <Play className="w-3.5 h-3.5 ml-0.5" style={{ color: "hsl(0,80%,60%)" }} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] uppercase tracking-[0.18em] font-semibold" style={{ color: "hsl(0,80%,60%)" }}>YouTube</p>
            <p className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors leading-tight">
              ASQA on YouTube
            </p>
          </div>
          <ExternalLink className="w-3.5 h-3.5 text-muted-foreground/50 group-hover:text-primary transition-colors shrink-0" />
        </a>

        {/* ASQAcast */}
        <a
          href="https://www.asqa.gov.au/newsroom/asqacast"
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-2xl bg-card border border-border hover:border-primary/40 overflow-hidden transition-all group"
        >
          <div className="flex items-stretch gap-0">
            <div
              className="w-1.5 shrink-0"
              style={{ background: "linear-gradient(to bottom, hsl(28,90%,60%), hsl(265,80%,65%))" }}
            />
            <div className="flex-1 p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center shrink-0 group-hover:bg-primary/25 transition-colors">
                <Play className="w-4 h-4 text-primary ml-0.5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs uppercase tracking-widest font-semibold mb-0.5" style={{ color: "hsl(28,90%,62%)" }}>ASQAcast</p>
                <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
                  ASQA's podcast and video series
                </p>
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                  Hear directly from ASQA on standards interpretation, audit insights, and quality practice across the VET sector.
                </p>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
            </div>
          </div>
        </a>
      </section>

      {/* Recent reflections */}
      <section>
        <div className="flex items-center justify-between mb-2">
          <SectionHeader icon={BookOpen} title="Recent reflections" inline />
          <Link
            href="/notes"
            className="text-[11px] text-primary hover:text-primary/80 inline-flex items-center gap-0.5"
          >
            All <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        {summary.recentNotes.length > 0 ? (
          <div className="space-y-2">
            {summary.recentNotes.slice(0, 3).map((note) => (
              <Link key={note.id} href={`/standards/${note.standardId}`}>
                <div className="rounded-xl bg-card border border-border p-3 cursor-pointer hover:border-primary/40 transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono uppercase text-primary/80 tracking-wider">
                      Standard {note.standardCode}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {new Date(note.updatedAt).toLocaleDateString(undefined, {
                        day: "numeric",
                        month: "short",
                      })}
                    </span>
                  </div>
                  <p className="text-xs text-foreground/85 line-clamp-2 leading-relaxed">
                    {note.body}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-border p-4 text-center">
            <BookOpen className="w-4 h-4 text-muted-foreground mx-auto mb-1.5" />
            <p className="text-xs text-muted-foreground">
              No reflections yet. Add notes as you work through the standards.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

function SectionHeader({
  icon: Icon,
  title,
  inline,
  warm,
}: {
  icon: LucideIcon;
  title: string;
  inline?: boolean;
  warm?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-2 ${inline ? "" : "mb-2.5"} text-foreground`}
    >
      <Icon
        className="w-3 h-3"
        style={{ color: "hsl(28,90%,60%)" }}
      />
      <h2 className="text-[10px] uppercase tracking-[0.2em] font-semibold text-foreground/75">
        {title}
      </h2>
    </div>
  );
}

function DotStat({ n, label, cls }: { n: number; label: string; cls: string }) {
  return (
    <span className="flex items-center gap-1">
      <span className={`w-1.5 h-1.5 rounded-full ${cls}`} />
      <span className="tabular-nums">{n}</span> {label}
    </span>
  );
}
