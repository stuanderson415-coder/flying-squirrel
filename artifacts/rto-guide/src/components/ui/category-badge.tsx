import { StrategyCategory } from "@workspace/api-client-react";
import { Badge } from "@/components/ui/badge";

const CATEGORY_CONFIG: Record<StrategyCategory, { label: string; className: string }> = {
  [StrategyCategory.classroom]: {
    label: "Classroom",
    className: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300",
  },
  [StrategyCategory.assessment]: {
    label: "Assessment",
    className: "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300",
  },
  [StrategyCategory.learner_support]: {
    label: "Learner Support",
    className: "bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900/30 dark:text-fuchsia-300",
  },
  [StrategyCategory.workforce]: {
    label: "Workforce",
    className: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300",
  },
  [StrategyCategory.governance]: {
    label: "Governance",
    className: "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300",
  },
  [StrategyCategory.compliance]: {
    label: "Compliance",
    className: "bg-slate-100 text-slate-800 dark:bg-slate-800/30 dark:text-slate-300",
  },
  [StrategyCategory.reflection]: {
    label: "Reflection",
    className: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300",
  },
};

export function CategoryBadge({ category }: { category: StrategyCategory }) {
  const config = CATEGORY_CONFIG[category] || { label: category, className: "bg-gray-100 text-gray-800" };
  return (
    <Badge variant="secondary" className={`font-medium border-0 ${config.className}`}>
      {config.label}
    </Badge>
  );
}
