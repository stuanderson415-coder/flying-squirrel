import { useEffect } from "react";
import { useParams, Link } from "wouter";
import {
  useGetQualityArea,
  getGetQualityAreaQueryKey,
} from "@workspace/api-client-react";
import { ArrowLeft, ExternalLink, LayoutList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function QualityAreaDetail() {
  const { qualityAreaId } = useParams();
  const id = parseInt(qualityAreaId || "0");
  
  const { data: qualityArea, isLoading, isError } = useGetQualityArea(id, {
    query: {
      enabled: !!id,
      queryKey: getGetQualityAreaQueryKey(id),
    },
  });

  useEffect(() => {
    if (qualityArea) {
      document.title = `${qualityArea.code} | RTO Standards Companion`;
    }
  }, [qualityArea]);

  if (isLoading) {
    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <div>
          <Skeleton className="h-4 w-24 mb-4" />
          <Skeleton className="h-10 w-64 mb-2" />
          <Skeleton className="h-6 w-96 mb-6" />
          <Skeleton className="h-20 w-full" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  if (isError || !qualityArea) {
    return (
      <div className="py-20 text-center flex flex-col items-center">
        <h2 className="text-xl font-medium text-destructive mb-2">Quality Area Not Found</h2>
        <p className="text-muted-foreground mb-6">We couldn't find the quality area you're looking for.</p>
        <Link href="/standards">
          <Button variant="outline"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Standards</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-500">
      <Link href="/standards" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-2">
        <ArrowLeft className="w-4 h-4 mr-1" /> Back to all standards
      </Link>

      <div>
        <div className="inline-block px-3 py-1 mb-4 rounded-full bg-primary/10 text-primary font-medium text-sm border border-primary/20">
          {qualityArea.code}
        </div>
        <h1 className="text-3xl md:text-4xl font-sans font-bold text-foreground mb-3">{qualityArea.title}</h1>
        <p className="text-xl text-primary font-medium mb-6">{qualityArea.tagline}</p>
        
        <Card className="bg-card border-border shadow-sm">
          <CardContent className="p-6 space-y-4">
            <p className="text-base text-muted-foreground leading-relaxed">{qualityArea.description}</p>
            <div className="pt-2 border-t border-border/50 flex items-center justify-between">
              <p className="text-xs text-muted-foreground/70 italic">
                Paraphrased for practical use — always verify against the official standards.
              </p>
              <a
                href="https://www.asqa.gov.au/standards"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors shrink-0 ml-4"
              >
                ASQA <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6 pt-4 border-t">
        <h2 className="text-2xl font-sans font-bold flex items-center gap-2">
          <LayoutList className="w-6 h-6 text-primary" />
          Standards in this area
        </h2>

        <div className="grid gap-4">
          {qualityArea.standards.map((std, index) => (
            <Link key={std.id} href={`/standards/${std.id}`}>
              <Card className="hover-elevate cursor-pointer hover:border-primary/50 transition-all group overflow-hidden" style={{ animationDelay: `${index * 50}ms` }}>
                <CardContent className="p-5">
                  <div className="space-y-2 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded shrink-0">
                        {std.code}
                      </span>
                    </div>
                    <h3 className="text-base font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
                      {std.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{std.intent}</p>
                    <p className="text-[11px] text-muted-foreground/60">{std.strategyCount} strategies</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
