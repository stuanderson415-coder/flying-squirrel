import { Router, type IRouter } from "express";
import { desc, eq, sql } from "drizzle-orm";
import {
  db,
  qualityAreasTable,
  standardsTable,
  strategiesTable,
  progressTable,
  notesTable,
  favoritesTable,
} from "@workspace/db";
import { GetDashboardSummaryResponse } from "@workspace/api-zod";
import { buildStrategies } from "../lib/builders";

const router: IRouter = Router();

router.get("/dashboard/summary", async (_req, res): Promise<void> => {
  const [totals] = await db
    .select({
      totalStandards: sql<number>`count(distinct ${standardsTable.id})::int`,
      totalStrategies: sql<number>`(select count(*)::int from ${strategiesTable})`,
    })
    .from(standardsTable);

  // Per-standard status (defaulting to 'not_started') joined with quality area.
  const perAreaCounts = await db
    .select({
      qualityAreaId: qualityAreasTable.id,
      qualityAreaCode: qualityAreasTable.code,
      qualityAreaTitle: qualityAreasTable.title,
      sortOrder: qualityAreasTable.sortOrder,
      total: sql<number>`count(${standardsTable.id})::int`,
      embedded: sql<number>`sum(case when coalesce(${progressTable.status}, 'not_started') = 'embedded' then 1 else 0 end)::int`,
      inProgress: sql<number>`sum(case when coalesce(${progressTable.status}, 'not_started') = 'in_progress' then 1 else 0 end)::int`,
      planning: sql<number>`sum(case when coalesce(${progressTable.status}, 'not_started') = 'planning' then 1 else 0 end)::int`,
      notStarted: sql<number>`sum(case when coalesce(${progressTable.status}, 'not_started') = 'not_started' then 1 else 0 end)::int`,
    })
    .from(qualityAreasTable)
    .leftJoin(
      standardsTable,
      eq(standardsTable.qualityAreaId, qualityAreasTable.id),
    )
    .leftJoin(progressTable, eq(progressTable.standardId, standardsTable.id))
    .groupBy(qualityAreasTable.id)
    .orderBy(qualityAreasTable.sortOrder);

  const qualityAreaProgress = perAreaCounts.map((c) => ({
    qualityAreaId: c.qualityAreaId,
    qualityAreaCode: c.qualityAreaCode,
    qualityAreaTitle: c.qualityAreaTitle,
    standardCount: c.total ?? 0,
    embeddedCount: c.embedded ?? 0,
    inProgressCount: c.inProgress ?? 0,
    planningCount: c.planning ?? 0,
    notStartedCount: c.notStarted ?? 0,
    percentComplete:
      (c.total ?? 0) === 0
        ? 0
        : Math.round(
            (((c.embedded ?? 0) + (c.inProgress ?? 0) * 0.5) /
              (c.total ?? 1)) *
              100,
          ),
  }));

  const embeddedCount = qualityAreaProgress.reduce(
    (acc, q) => acc + q.embeddedCount,
    0,
  );
  const inProgressCount = qualityAreaProgress.reduce(
    (acc, q) => acc + q.inProgressCount,
    0,
  );
  const planningCount = qualityAreaProgress.reduce(
    (acc, q) => acc + q.planningCount,
    0,
  );
  const notStartedCount = qualityAreaProgress.reduce(
    (acc, q) => acc + q.notStartedCount,
    0,
  );
  const totalStandards = totals?.totalStandards ?? 0;
  const totalStrategies = totals?.totalStrategies ?? 0;

  const overallPercentComplete =
    totalStandards === 0
      ? 0
      : Math.round(
          ((embeddedCount + inProgressCount * 0.5) / totalStandards) * 100,
        );

  const [favoriteAgg] = await db
    .select({
      count: sql<number>`count(*)::int`,
    })
    .from(favoritesTable);

  const [noteAgg] = await db
    .select({
      count: sql<number>`count(*)::int`,
    })
    .from(notesTable);

  const recentNotes = await db
    .select({
      id: notesTable.id,
      standardId: notesTable.standardId,
      standardCode: standardsTable.code,
      standardTitle: standardsTable.title,
      body: notesTable.body,
      createdAt: notesTable.createdAt,
      updatedAt: notesTable.updatedAt,
    })
    .from(notesTable)
    .innerJoin(standardsTable, eq(standardsTable.id, notesTable.standardId))
    .orderBy(desc(notesTable.updatedAt))
    .limit(4);

  const recentlyUpdatedRows = await db
    .select({
      id: standardsTable.id,
      qualityAreaId: standardsTable.qualityAreaId,
      qualityAreaCode: qualityAreasTable.code,
      qualityAreaTitle: qualityAreasTable.title,
      code: standardsTable.code,
      title: standardsTable.title,
      intent: standardsTable.intent,
      strategyCount: sql<number>`(select count(*)::int from ${strategiesTable} where ${strategiesTable.standardId} = ${standardsTable.id})`,
      status: progressTable.status,
      updatedAt: progressTable.updatedAt,
    })
    .from(progressTable)
    .innerJoin(standardsTable, eq(standardsTable.id, progressTable.standardId))
    .innerJoin(
      qualityAreasTable,
      eq(qualityAreasTable.id, standardsTable.qualityAreaId),
    )
    .orderBy(desc(progressTable.updatedAt))
    .limit(5);

  const recentlyUpdatedStandards = recentlyUpdatedRows.map((r) => ({
    id: r.id,
    qualityAreaId: r.qualityAreaId,
    qualityAreaCode: r.qualityAreaCode,
    qualityAreaTitle: r.qualityAreaTitle,
    code: r.code,
    title: r.title,
    intent: r.intent,
    strategyCount: r.strategyCount ?? 0,
    status: r.status as
      | "not_started"
      | "planning"
      | "in_progress"
      | "embedded",
  }));

  // Featured strategy of the day
  const all = await buildStrategies();
  const today = new Date();
  const dayKey =
    today.getUTCFullYear() * 10000 +
    (today.getUTCMonth() + 1) * 100 +
    today.getUTCDate();
  const idx = all.length === 0 ? 0 : dayKey % all.length;
  const strategy = all[idx];

  if (!strategy) {
    res.status(500).json({ error: "No strategies seeded" });
    return;
  }

  const rationaleByEffort = {
    quick_win:
      "A small move you can make this week — pick it up, try it, and see what shifts.",
    ongoing:
      "Worth weaving into your regular rhythm — modest each time, big over a year.",
    deep_change:
      "A bigger piece of work, but the kind that changes the shape of how you teach.",
  } as const;

  res.json(
    GetDashboardSummaryResponse.parse({
      totalStandards,
      totalStrategies,
      embeddedCount,
      inProgressCount,
      planningCount,
      notStartedCount,
      overallPercentComplete,
      favoriteCount: favoriteAgg?.count ?? 0,
      noteCount: noteAgg?.count ?? 0,
      qualityAreaProgress,
      recentNotes,
      recentlyUpdatedStandards,
      featured: {
        strategy,
        rationale: rationaleByEffort[strategy.effort],
      },
    }),
  );
});

export default router;
