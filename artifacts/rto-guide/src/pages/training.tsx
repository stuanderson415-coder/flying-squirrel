import { useEffect, useState } from "react";
import { Link } from "wouter";
import {
  getGetDashboardSummaryQueryKey,
  getListQualityAreasQueryKey,
  getListStandardsQueryKey,
  useGetDashboardSummary,
  useListQualityAreas,
  useListStandards,
} from "@workspace/api-client-react";
import type {
  QualityAreaSummary,
  StandardSummary,
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import {
  ArrowRight,
  CheckCircle2,
  Circle,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import trainingHero from "@/assets/training-hero.png";

type ModuleStatus = "completed" | "in-progress" | "not-started";

interface TrainingModule {
  id: number;
  number: number;
  title: string;
  description: string;
  standards: StandardSummary[];
  progress: number;
  status: ModuleStatus;
}

function getModuleStatus(standards: StandardSummary[]): ModuleStatus {
  if (
    standards.length > 0 &&
    standards.every((standard) => standard.status === "embedded")
  ) {
    return "completed";
  }

  if (standards.some((standard) => standard.status !== "not_started")) {
    return "in-progress";
  }

  return "not-started";
}

function buildModules(
  qualityAreas: QualityAreaSummary[],
  standards: StandardSummary[],
): TrainingModule[] {
  return qualityAreas.map((area, index) => {
    const areaStandards = standards.filter(
      (standard) => standard.qualityAreaId === area.id,
    );
    const embeddedCount = areaStandards.filter(
      (standard) => standard.status === "embedded",
    ).length;
    const inProgressCount = areaStandards.filter(
      (standard) => standard.status === "in_progress",
    ).length;
    const progress =
      areaStandards.length === 0
        ? 0
        : Math.round(
            ((embeddedCount + inProgressCount * 0.5) /
              areaStandards.length) *
              100,
          );

    return {
      id: area.id,
      number: index + 1,
      title: area.title,
      description: area.description,
      standards: areaStandards,
      progress,
      status: getModuleStatus(areaStandards),
    };
  });
}

function TrainingLoading() {
  return (
    <div
      className="space-y-4 animate-in fade-in duration-300"
      data-testid="training-loading"
      aria-label="Loading Training"
    >
      <div className="space-y-2">
        <Skeleton className="h-3 w-28" />
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-full max-w-xl" />
      </div>
      <Skeleton className="h-36 w-full rounded-2xl" />
      <Skeleton className="h-20 w-full rounded-2xl" />
      <Skeleton className="h-20 w-full rounded-2xl" />
    </div>
  );
}

function TrainingError({
  retry,
  retrying,
}: {
  retry: () => void;
  retrying: boolean;
}) {
  return (
    <div
      className="rounded-2xl border border-destructive/30 bg-destructive/5 px-5 py-12 text-center"
      data-testid="training-error"
      role="alert"
    >
      <RefreshCw className="mx-auto mb-3 h-7 w-7 text-destructive/80" />
      <h1 className="text-lg font-semibold text-foreground">
        Training is temporarily unavailable
      </h1>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
        We couldn&apos;t load the live course structure and progress. Your
        saved progress has not been changed. Try again to reconnect.
      </p>
      <Button
        type="button"
        onClick={retry}
        disabled={retrying}
        className="mt-5"
        data-testid="button-training-retry"
      >
        {retrying ? (
          <Loader2 className="animate-spin" />
        ) : (
          <RefreshCw />
        )}
        {retrying ? "Reconnecting…" : "Retry Training"}
      </Button>
    </div>
  );
}

export default function TrainingPage() {
  const queryClient = useQueryClient();
  const [retrying, setRetrying] = useState(false);

  useEffect(() => {
    document.title = "Training | RTO Standards Companion";
  }, []);

  const qualityAreasQuery = useListQualityAreas({
    query: {
      queryKey: getListQualityAreasQueryKey(),
      refetchOnMount: "always",
    },
  });
  const standardsQuery = useListStandards(undefined, {
    query: {
      queryKey: getListStandardsQueryKey(),
      refetchOnMount: "always",
    },
  });
  const dashboardQuery = useGetDashboardSummary({
    query: {
      queryKey: getGetDashboardSummaryQueryKey(),
      refetchOnMount: "always",
    },
  });

  const retryTraining = async () => {
    setRetrying(true);
    try {
      await Promise.all([
        queryClient.refetchQueries({
          queryKey: getListQualityAreasQueryKey(),
          type: "active",
        }),
        queryClient.refetchQueries({
          queryKey: getListStandardsQueryKey(),
          type: "active",
        }),
        queryClient.refetchQueries({
          queryKey: getGetDashboardSummaryQueryKey(),
          type: "active",
        }),
      ]);
    } finally {
      setRetrying(false);
    }
  };

  const loading =
    retrying ||
    qualityAreasQuery.isLoading ||
    qualityAreasQuery.isFetching ||
    standardsQuery.isLoading ||
    standardsQuery.isFetching ||
    dashboardQuery.isLoading ||
    dashboardQuery.isFetching;
  const failed =
    qualityAreasQuery.isError ||
    standardsQuery.isError ||
    dashboardQuery.isError ||
    !dashboardQuery.data;

  if (loading) {
    return <TrainingLoading />;
  }

  if (failed) {
    return <TrainingError retry={retryTraining} retrying={retrying} />;
  }

  const qualityAreas = qualityAreasQuery.data ?? [];
  const standards = standardsQuery.data ?? [];
  const dashboard = dashboardQuery.data;
  const modules = buildModules(qualityAreas, standards);
  const overallPercent = Math.round(dashboard.overallPercentComplete);
  const completedModules = modules.filter(
    (module) => module.status === "completed",
  ).length;

  return (
    <div
      className="space-y-5 animate-in fade-in duration-500"
      data-testid="training-page"
    >
      <header>
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Training course
        </p>
        <h1 className="mt-1 text-2xl font-sans font-medium leading-tight text-foreground">
          Implementing the new Standards in your training practice
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          A practical onboarding course for trainers and assessors moving from
          the 2015 to the 2025 RTO Standards.
        </p>
      </header>

      <section className="relative overflow-hidden rounded-2xl border border-primary/20 bg-card">
        <div className="relative h-36 overflow-hidden">
          <img
            src={trainingHero}
            alt="Trainer working with adult learners around a workbench"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          <div className="absolute left-4 top-3 rounded-md bg-primary/90 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-primary-foreground">
            Live course
          </div>
        </div>
        <div className="relative -mt-2 p-5">
          <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
            <span>
              {completedModules} of {modules.length} modules complete
            </span>
            <span className="font-semibold tabular-nums text-foreground">
              {overallPercent}%
            </span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-foreground/10">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${overallPercent}%` }}
            />
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            {standards.length} live standards mapped into {modules.length}{" "}
            quality area modules.
          </p>
        </div>
      </section>

      <section aria-labelledby="training-modules-heading" className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <h2
            id="training-modules-heading"
            className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground/80"
          >
            Course modules
          </h2>
          <span className="text-xs text-muted-foreground">Live progress</span>
        </div>
        {modules.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
            No training modules are available right now.
          </div>
        ) : (
          modules.map((module) => <ModuleCard key={module.id} module={module} />)
        )}
      </section>
    </div>
  );
}

function ModuleCard({ module }: { module: TrainingModule }) {
  const [expanded, setExpanded] = useState(false);
  const statusLabel =
    module.status === "completed"
      ? "Complete"
      : module.status === "in-progress"
        ? "In progress"
        : "Not started";

  return (
    <article
      className={`overflow-hidden rounded-xl border bg-card transition-colors ${
        module.status === "in-progress"
          ? "border-primary/40"
          : "border-border"
      }`}
      data-testid={`training-module-${module.id}`}
    >
      <button
        type="button"
        onClick={() => setExpanded((current) => !current)}
        aria-expanded={expanded}
        className="w-full p-4 text-left"
      >
        <div className="flex items-start gap-3">
          <div
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-medium ${
              module.status === "completed"
                ? "bg-primary/15 text-primary"
                : module.status === "in-progress"
                  ? "bg-primary/20 text-primary"
                  : "bg-muted text-muted-foreground"
            }`}
          >
            {module.status === "completed" ? (
              <CheckCircle2 className="h-4 w-4" />
            ) : (
              module.number
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-sm font-medium text-foreground">
              {module.title}
            </h3>
            <div className="mt-1 flex items-center gap-2 text-[11px] text-muted-foreground">
              {module.status === "completed" ? (
                <CheckCircle2 className="h-3 w-3 text-primary" />
              ) : (
                <Circle className="h-3 w-3" />
              )}
              <span>{statusLabel}</span>
              <span>·</span>
              <span>
                {module.standards.length}{" "}
                {module.standards.length === 1 ? "standard" : "standards"}
              </span>
            </div>
            {module.progress > 0 && (
              <div className="mt-2 h-1 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary/75"
                  style={{ width: `${module.progress}%` }}
                />
              </div>
            )}
          </div>
          <ArrowRight
            className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${
              expanded ? "rotate-90" : ""
            }`}
          />
        </div>
      </button>

      {expanded && (
        <div className="space-y-3 px-4 pb-4 pl-[60px]">
          <p className="text-xs leading-relaxed text-muted-foreground">
            {module.description}
          </p>
          <div className="overflow-hidden rounded-xl border border-border">
            {module.standards.map((standard, index) => (
              <Link
                key={standard.id}
                href={`/standards/${standard.id}`}
                className={`flex items-center gap-3 px-3 py-2.5 transition-colors hover:bg-primary/5 ${
                  index < module.standards.length - 1
                    ? "border-b border-border/50"
                    : ""
                }`}
              >
                {standard.status === "embedded" ? (
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                ) : (
                  <Circle className="h-4 w-4 shrink-0 text-muted-foreground/50" />
                )}
                <span className="min-w-0 flex-1 text-xs leading-snug text-muted-foreground">
                  <span className="mr-1.5 text-[10px] text-primary/80">
                    {standard.code}
                  </span>
                  {standard.title}
                </span>
                <span className="shrink-0 text-[10px] text-muted-foreground/50">
                  {standard.status === "embedded" ? "Complete" : "Open"}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}