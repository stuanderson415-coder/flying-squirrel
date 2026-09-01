import { eq, asc, and, ilike, or, sql, inArray } from "drizzle-orm";
import {
  db,
  qualityAreasTable,
  standardsTable,
  strategiesTable,
  progressTable,
  favoritesTable,
} from "@workspace/db";

interface StandardSummariesQuery {
  qualityAreaId?: number;
  search?: string;
}

export async function buildStandardSummaries(
  query: StandardSummariesQuery = {},
) {
  const conditions = [];
  if (query.qualityAreaId !== undefined) {
    conditions.push(eq(standardsTable.qualityAreaId, query.qualityAreaId));
  }
  if (query.search && query.search.trim().length > 0) {
    const term = `%${query.search.trim()}%`;
    conditions.push(
      or(
        ilike(standardsTable.title, term),
        ilike(standardsTable.code, term),
        ilike(standardsTable.intent, term),
        ilike(standardsTable.whatItMeans, term),
      ),
    );
  }

  const baseQuery = db
    .select({
      id: standardsTable.id,
      qualityAreaId: standardsTable.qualityAreaId,
      qualityAreaCode: qualityAreasTable.code,
      qualityAreaTitle: qualityAreasTable.title,
      code: standardsTable.code,
      title: standardsTable.title,
      intent: standardsTable.intent,
      sortOrder: standardsTable.sortOrder,
      strategyCount: sql<number>`(select count(*)::int from ${strategiesTable} where ${strategiesTable.standardId} = ${standardsTable.id})`,
      status: sql<string>`coalesce(${progressTable.status}, 'not_started')`,
    })
    .from(standardsTable)
    .innerJoin(
      qualityAreasTable,
      eq(qualityAreasTable.id, standardsTable.qualityAreaId),
    )
    .leftJoin(progressTable, eq(progressTable.standardId, standardsTable.id))
    .orderBy(
      asc(qualityAreasTable.sortOrder),
      asc(standardsTable.sortOrder),
      asc(standardsTable.code),
    );

  const rows =
    conditions.length === 0
      ? await baseQuery
      : await baseQuery.where(and(...conditions));

  return rows.map((r) => ({
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
}

interface StrategyQuery {
  standardId?: number;
  category?: string;
  effort?: string;
  ids?: number[];
}

export async function buildStrategies(query: StrategyQuery = {}) {
  const conditions = [];
  if (query.standardId !== undefined) {
    conditions.push(eq(strategiesTable.standardId, query.standardId));
  }
  if (query.category !== undefined) {
    conditions.push(eq(strategiesTable.category, query.category));
  }
  if (query.effort !== undefined) {
    conditions.push(eq(strategiesTable.effort, query.effort));
  }
  if (query.ids !== undefined) {
    if (query.ids.length === 0) {
      return [];
    }
    conditions.push(inArray(strategiesTable.id, query.ids));
  }

  const baseQuery = db
    .select({
      id: strategiesTable.id,
      standardId: strategiesTable.standardId,
      standardCode: standardsTable.code,
      standardTitle: standardsTable.title,
      qualityAreaId: standardsTable.qualityAreaId,
      qualityAreaCode: qualityAreasTable.code,
      title: strategiesTable.title,
      summary: strategiesTable.summary,
      steps: strategiesTable.steps,
      category: strategiesTable.category,
      effort: strategiesTable.effort,
      timeEstimate: strategiesTable.timeEstimate,
      sortOrder: strategiesTable.sortOrder,
      favorited: sql<boolean>`(${favoritesTable.strategyId} is not null)`,
    })
    .from(strategiesTable)
    .innerJoin(
      standardsTable,
      eq(standardsTable.id, strategiesTable.standardId),
    )
    .innerJoin(
      qualityAreasTable,
      eq(qualityAreasTable.id, standardsTable.qualityAreaId),
    )
    .leftJoin(
      favoritesTable,
      eq(favoritesTable.strategyId, strategiesTable.id),
    )
    .orderBy(
      asc(qualityAreasTable.sortOrder),
      asc(standardsTable.sortOrder),
      asc(strategiesTable.sortOrder),
      asc(strategiesTable.id),
    );

  const rows =
    conditions.length === 0
      ? await baseQuery
      : await baseQuery.where(and(...conditions));

  return rows.map((r) => ({
    id: r.id,
    standardId: r.standardId,
    standardCode: r.standardCode,
    standardTitle: r.standardTitle,
    qualityAreaId: r.qualityAreaId,
    qualityAreaCode: r.qualityAreaCode,
    title: r.title,
    summary: r.summary,
    steps: r.steps,
    category: r.category as
      | "classroom"
      | "assessment"
      | "learner_support"
      | "workforce"
      | "governance"
      | "compliance"
      | "reflection",
    effort: r.effort as "quick_win" | "ongoing" | "deep_change",
    timeEstimate: r.timeEstimate,
    favorited: Boolean(r.favorited),
  }));
}
