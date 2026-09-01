import { ProgressStatus } from "@workspace/api-client-react";
import { Badge } from "@/components/ui/badge";

const STATUS_CONFIG: Record<ProgressStatus, { label: string; className: string }> = {
  [ProgressStatus.not_started]: {
    label: "Not Started",
    className: "bg-muted text-muted-foreground hover:bg-muted",
  },
  [ProgressStatus.planning]: {
    label: "Planning",
    className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 hover:bg-blue-100",
  },
  [ProgressStatus.in_progress]: {
    label: "In Progress",
    className: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 hover:bg-orange-100",
  },
  [ProgressStatus.embedded]: {
    label: "Embedded",
    className: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 hover:bg-green-100",
  },
};

export function StatusBadge({ status }: { status: ProgressStatus }) {
  const config = STATUS_CONFIG[status];
  return (
    <Badge variant="outline" className={`font-medium border-0 ${config.className}`}>
      {config.label}
    </Badge>
  );
}
