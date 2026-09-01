import { useEffect, useState } from "react";
import { Link } from "wouter";
import { useListStandards, useListQualityAreas } from "@workspace/api-client-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, LayoutList, ArrowRight, X } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export default function StandardsList() {
  useEffect(() => {
    document.title = "Standards | RTO Standards Companion";
  }, []);

  const [search, setSearch] = useState("");
  const [qaFilter, setQaFilter] = useState<string>("all");

  const { data: qualityAreas } = useListQualityAreas();
  const { data: standards, isLoading, isError } = useListStandards({
    search: search || undefined,
    qualityAreaId: qaFilter === "all" ? undefined : parseInt(qaFilter),
  });

  const activeQa = qualityAreas?.find((qa) => qa.id.toString() === qaFilter);

  return (
    <div className="space-y-5 pb-12 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-foreground">RTO Standards 2025</h1>
        <p className="mt-1 text-sm font-medium" style={{ color: "hsl(28,90%,62%)" }}>
          Browse or filter standards by quality area
        </p>
      </div>

      {/* QA filter buttons — stacked on mobile, pill row on md+ */}
      <div className="flex flex-col md:flex-row md:flex-wrap gap-2">
        <button
          onClick={() => setQaFilter("all")}
          className={`w-full md:w-auto text-left md:text-center px-4 py-2.5 md:py-1.5 rounded-xl md:rounded-full text-sm md:text-xs font-semibold border transition-all ${
            qaFilter === "all"
              ? "border-primary bg-primary/15 text-primary"
              : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground bg-card"
          }`}
        >
          All quality areas
        </button>
        {qualityAreas?.map((qa) => {
          const active = qaFilter === qa.id.toString();
          return (
            <button
              key={qa.id}
              onClick={() => setQaFilter(active ? "all" : qa.id.toString())}
              className={`w-full md:w-auto text-left md:text-center px-4 py-2.5 md:py-1.5 rounded-xl md:rounded-full text-sm md:text-xs font-semibold border transition-all ${
                active
                  ? "border-transparent font-bold"
                  : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground bg-card"
              }`}
              style={active ? { background: "hsl(28,90%,60%)", color: "#fff" } : undefined}
            >
              <span className="font-bold">{qa.code}</span>
              <span className="font-normal"> — {qa.title}</span>
            </button>
          );
        })}
      </div>

      {/* Search bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search standards…"
          className="pl-10 bg-card"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Active filter label */}
      {activeQa && (
        <p className="text-xs text-muted-foreground -mt-1">
          Showing{" "}
          <span className="font-semibold text-foreground">{activeQa.code}: {activeQa.title}</span>
          {" "}—{" "}
          <button
            onClick={() => setQaFilter("all")}
            className="underline hover:text-foreground transition-colors"
          >
            clear
          </button>
        </p>
      )}

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
      ) : isError ? (
        <div className="py-12 text-center text-destructive">Failed to load standards.</div>
      ) : standards && standards.length > 0 ? (
        <div className="space-y-3">
          {standards.map((std, index) => (
            <Link key={std.id} href={`/standards/${std.id}`}>
              <Card
                className="hover-elevate cursor-pointer hover:border-primary/50 transition-all group overflow-hidden"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CardContent className="p-4">
                  {/* Top row: code + QA chip + status (all screens) */}
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded shrink-0">
                      {std.code}
                    </span>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setQaFilter(
                          qaFilter === std.qualityAreaId.toString()
                            ? "all"
                            : std.qualityAreaId.toString()
                        );
                      }}
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border transition-all shrink-0 ${
                        qaFilter === std.qualityAreaId.toString()
                          ? "border-transparent text-white"
                          : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground bg-card"
                      }`}
                      style={
                        qaFilter === std.qualityAreaId.toString()
                          ? { background: "hsl(28,90%,60%)" }
                          : undefined
                      }
                    >
                      {std.qualityAreaCode}
                    </button>
                    <div className="ml-auto flex items-center gap-2 shrink-0">
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary hidden sm:block" />
                    </div>
                  </div>
                  {/* Title + intent */}
                  <h3 className="text-base font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
                    {std.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">{std.intent}</p>
                  {/* Strategy count — mobile only below title */}
                  <p className="text-[11px] text-muted-foreground/60 mt-2 sm:hidden">
                    {std.strategyCount} strategies
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <LayoutList className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-medium text-foreground">No standards found</h3>
          <p className="text-muted-foreground mt-2">Try adjusting your search or filters.</p>
          {(search || qaFilter !== "all") && (
            <Button
              variant="link"
              onClick={() => { setSearch(""); setQaFilter("all"); }}
              className="mt-4"
            >
              Clear filters
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
