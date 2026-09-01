import { ExternalLink, HelpCircle, FileText, BookOpen } from "lucide-react";
import { Link } from "wouter";

export function StandardsReference() {
  return (
    <div className="rounded-2xl bg-card border border-border overflow-hidden">
      {/* Who is ASQA */}
      <a
        href="https://www.asqa.gov.au"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-start gap-3 p-4 hover:bg-muted/30 transition-colors group border-b border-border/60"
      >
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
          style={{ background: "hsl(28,90%,62%,0.12)" }}
        >
          <HelpCircle className="w-4 h-4" style={{ color: "hsl(28,90%,62%)" }} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] uppercase tracking-[0.2em] font-semibold mb-0.5" style={{ color: "hsl(28,90%,62%)" }}>
            Who is ASQA?
          </p>
          <p className="text-[12px] text-muted-foreground leading-relaxed">
            The Australian Skills Quality Authority — national regulator for vocational education and training, responsible for registering RTOs and auditing compliance with the Standards.
          </p>
        </div>
        <ExternalLink className="w-3.5 h-3.5 text-muted-foreground/50 group-hover:text-primary transition-colors shrink-0 mt-1" />
      </a>

      {/* Legislation */}
      <a
        href="https://www.legislation.gov.au/C2011A00012/latest"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-start gap-3 p-4 hover:bg-muted/30 transition-colors group border-b border-border/60"
      >
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
          style={{ background: "hsl(28,90%,62%,0.12)" }}
        >
          <FileText className="w-4 h-4" style={{ color: "hsl(28,90%,62%)" }} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] uppercase tracking-[0.2em] font-semibold mb-0.5" style={{ color: "hsl(28,90%,62%)" }}>
            Legislation
          </p>
          <p className="text-[12px] text-muted-foreground leading-relaxed">
            National Vocational Education and Training Regulator Act 2011 — the legislative foundation for ASQA's regulatory authority.
          </p>
        </div>
        <ExternalLink className="w-3.5 h-3.5 text-muted-foreground/50 group-hover:text-primary transition-colors shrink-0 mt-1" />
      </a>

      {/* Outcome Standards — internal link */}
      <Link
        href="/standards"
        className="flex items-start gap-3 p-4 hover:bg-muted/30 transition-colors group"
      >
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
          style={{ background: "hsl(28,90%,62%,0.12)" }}
        >
          <BookOpen className="w-4 h-4" style={{ color: "hsl(28,90%,62%)" }} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] uppercase tracking-[0.2em] font-semibold mb-0.5" style={{ color: "hsl(28,90%,62%)" }}>
            Outcome Standards
          </p>
          <p className="text-[12px] text-foreground leading-relaxed">
            23 outcome standards across four quality areas. Start exploring them here.
          </p>
        </div>
      </Link>
    </div>
  );
}
