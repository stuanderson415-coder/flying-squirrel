import { useState } from "react";
import { Link } from "wouter";
import { Strategy } from "@workspace/api-client-react";
import { 
  useAddFavorite, 
  useRemoveFavorite, 
  getListFavoritesQueryKey, 
  getListStrategiesQueryKey, 
  getGetStandardQueryKey, 
  getGetDashboardSummaryQueryKey 
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Clock, CheckCircle2, Share2 } from "lucide-react";
import { CategoryBadge } from "./ui/category-badge";
import { EffortBadge } from "./ui/effort-badge";
import { useToast } from "@/hooks/use-toast";

export function StrategyCard({ strategy, showStandardLink = false }: { strategy: Strategy, showStandardLink?: boolean }) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [isHovered, setIsHovered] = useState(false);

  const addFavorite = useAddFavorite();
  const removeFavorite = useRemoveFavorite();

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const isFav = strategy.favorited;

    if (isFav) {
      removeFavorite.mutate(
        { strategyId: strategy.id },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: getListFavoritesQueryKey() });
            queryClient.invalidateQueries({ queryKey: getListStrategiesQueryKey() });
            queryClient.invalidateQueries({ queryKey: getGetStandardQueryKey(strategy.standardId) });
            queryClient.invalidateQueries({ queryKey: getGetDashboardSummaryQueryKey() });
            toast({ title: "Removed from favorites" });
          }
        }
      );
    } else {
      addFavorite.mutate(
        { data: { strategyId: strategy.id } },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: getListFavoritesQueryKey() });
            queryClient.invalidateQueries({ queryKey: getListStrategiesQueryKey() });
            queryClient.invalidateQueries({ queryKey: getGetStandardQueryKey(strategy.standardId) });
            queryClient.invalidateQueries({ queryKey: getGetDashboardSummaryQueryKey() });
            toast({ title: "Added to favorites", description: "Saved to your favorites list." });
          }
        }
      );
    }
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url = `${window.location.origin}${window.location.pathname.replace(/\/$/, "")}/standards/${strategy.standardId}`;
    navigator.clipboard.writeText(url).then(() => {
      toast({
        title: "Link copied!",
        description: `Share Standard ${strategy.standardCode} — "${strategy.title}" with colleagues.`,
      });
    }).catch(() => {
      toast({ title: "Standard link", description: `Standard ${strategy.standardCode}: ${strategy.title}` });
    });
  };

  const isMutating = addFavorite.isPending || removeFavorite.isPending;

  return (
    <Card 
      className="h-full flex flex-col hover-elevate transition-all border-border hover:border-primary/40 group overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="pb-3 relative">
        <div className="flex justify-between items-start gap-4">
          <div className="space-y-2.5">
            <div className="flex flex-wrap gap-2">
              <span>
                <CategoryBadge category={strategy.category} />
              </span>
              <span>
                <EffortBadge effort={strategy.effort} />
              </span>
            </div>
            {showStandardLink && (
              <Link href={`/standards/${strategy.standardId}`} className="text-xs font-medium text-primary hover:underline inline-block">
                Standard {strategy.standardCode}
              </Link>
            )}
            <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
              {strategy.title}
            </CardTitle>
          </div>
          <div className="flex flex-col gap-1 shrink-0 -mt-1 -mr-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950/30 transition-colors z-10"
              onClick={handleFavoriteToggle}
              disabled={isMutating}
              title="Save to favorites"
            >
              <Star className={`w-5 h-5 transition-all ${strategy.favorited ? "fill-amber-500 text-amber-500" : isHovered ? "text-amber-500" : ""}`} />
              <span className="sr-only">Toggle favorite</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors z-10"
              onClick={handleShare}
              title="Copy link to share with colleagues"
            >
              <Share2 className="w-4 h-4" />
              <span className="sr-only">Share strategy</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 pb-4">
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {strategy.summary}
        </p>
        
        {strategy.steps.length > 0 && (
          <div className="space-y-2 mt-4">
            <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider">How to do it:</h4>
            <ul className="space-y-2">
              {strategy.steps.slice(0, 2).map((step, i) => (
                <li key={i} className="flex gap-2 text-sm text-muted-foreground items-start">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span className="line-clamp-2">{step}</span>
                </li>
              ))}
              {strategy.steps.length > 2 && (
                <li className="text-xs text-primary font-medium pl-6">
                  + {strategy.steps.length - 2} more steps
                </li>
              )}
            </ul>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-0 border-t mt-auto px-6 py-3 bg-muted/20">
        <div className="flex items-center text-xs text-muted-foreground gap-1.5">
          <Clock className="w-3.5 h-3.5" />
          {strategy.timeEstimate}
        </div>
      </CardFooter>
    </Card>
  );
}
