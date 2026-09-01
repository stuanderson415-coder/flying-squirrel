import { Router, type IRouter } from "express";
import { eq, asc, sql } from "drizzle-orm";
import {
  db,
  qualityAreasTable,
  standardsTable,
  progressTable,
} from "@workspace/db";
import {
  ListQualityAreasResponse,
  GetQualityAreaParams,
  GetQualityAreaResponse,
} from "@workspace/api-zod";
import { buildStandardSummaries } from "../lib/builders";

const router: IRouter = Router();

router.get("/quality-areas", async (_req, res): Promise<void> => {
  const areas = await db
    .select()
    .from(qualityAreasTable)
    .orderBy(asc(qualityAreasTable.sortOrder));

  const counts = await db
    .select({
      qualityAreaId: standardsTable.qualityAreaId,
      total: sql<number>`count(${standardsTable.id})::int`,
      embedded: sql<number>`sum(case when coalesce(${progressTable.status}, 'not_started') = 'embedded' then 1 else 0 end)::int`,
      inProgress: sql<number>`sum(case when coalesce(${progressTable.status}, 'not_started') = 'in_progress' then 1 else 0 end)::int`,
      planning: sql<number>`sum(case when coalesce(${progressTable.status}, 'not_started') = 'planning' then 1 else 0 end)::int`,
      notStarted: sql<number>`sum(case when coalesce(${progressTable.status}, 'not_started') = 'not_started' then 1 else 0 end)::int`,
    })
    .from(standardsTable)
    .leftJoin(progressTable, eq(progressTable.standardId, standardsTable.id))
    .groupBy(standardsTable.qualityAreaId);

  const countByArea = new Map(counts.map((c) => [c.qualityAreaId, c]));

  const result = areas.map((area) => {
    const c = countByArea.get(area.id);
    return {
      id: area.id,
      code: area.code,
      title: area.title,
      tagline: area.tagline,
      description: area.description,
      standardCount: c?.total ?? 0,
      embeddedCount: c?.embedded ?? 0,
      inProgressCount: c?.inProgress ?? 0,
      planningCount: c?.planning ?? 0,
      notStartedCount: c?.notStarted ?? 0,
    };
  });

  res.json(ListQualityAreasResponse.parse(result));
});

router.get("/quality-areas/:qualityAreaId", async (req, res): Promise<void> => {
  const params = GetQualityAreaParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [area] = await db
    .select()
    .from(qualityAreasTable)
    .where(eq(qualityAreasTable.id, params.data.qualityAreaId));

  if (!area) {
    res.status(404).json({ error: "Quality area not found" });
    return;
  }

  const standards = await buildStandardSummaries({
    qualityAreaId: area.id,
  });

  res.json(
    GetQualityAreaResponse.parse({
      id: area.id,
      code: area.code,
      title: area.title,
      tagline: area.tagline,
      description: area.description,
      standards,
    }),
  );
});

export default router;
