import { StrategyEffort } from "@workspace/api-client-react";
import { Badge } from "@/components/ui/badge";

const EFFORT_CONFIG: Record<StrategyEffort, { label: string; className: string }> = {
  [StrategyEffort.quick_win]: {
    label: "Quick Win",
    className: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
  },
  [StrategyEffort.ongoing]: {
    label: "Ongoing",
    className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  },
  [StrategyEffort.deep_change]: {
    label: "Deep Change",
    className: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  },
};

export function EffortBadge({ effort }: { effort: StrategyEffort }) {
  const config = EFFORT_CONFIG[effort] || { label: effort, className: "bg-gray-100 text-gray-800" };
  return (
    <Badge variant="outline" className={`font-medium border-0 ${config.className}`}>
      {config.label}
    </Badge>
  );
}
