import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import {
  db,
  qualityAreasTable,
  standardsTable,
  progressTable,
} from "@workspace/db";
import {
  ListStandardsQueryParams,
  ListStandardsResponse,
  GetStandardParams,
  GetStandardResponse,
} from "@workspace/api-zod";
import { buildStandardSummaries, buildStrategies } from "../lib/builders";

const router: IRouter = Router();

router.get("/standards", async (req, res): Promise<void> => {
  const params = ListStandardsQueryParams.safeParse(req.query);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const standards = await buildStandardSummaries({
    qualityAreaId: params.data.qualityAreaId,
    search: params.data.search,
  });

  res.json(ListStandardsResponse.parse(standards));
});

router.get("/standards/:standardId", async (req, res): Promise<void> => {
  const params = GetStandardParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [row] = await db
    .select({
      standard: standardsTable,
      qualityArea: qualityAreasTable,
    })
    .from(standardsTable)
    .innerJoin(
      qualityAreasTable,
      eq(qualityAreasTable.id, standardsTable.qualityAreaId),
    )
    .where(eq(standardsTable.id, params.data.standardId));

  if (!row) {
    res.status(404).json({ error: "Standard not found" });
    return;
  }

  const strategies = await buildStrategies({ standardId: row.standard.id });

  const [progressRow] = await db
    .select()
    .from(progressTable)
    .where(eq(progressTable.standardId, row.standard.id));

  res.json(
    GetStandardResponse.parse({
      id: row.standard.id,
      qualityAreaId: row.qualityArea.id,
      qualityAreaCode: row.qualityArea.code,
      qualityAreaTitle: row.qualityArea.title,
      code: row.standard.code,
      title: row.standard.title,
      intent: row.standard.intent,
      whatItMeans: row.standard.whatItMeans,
      keyPractices: row.standard.keyPractices,
      evidenceExamples: row.standard.evidenceExamples,
      strategies,
      progress: progressRow
        ? {
            standardId: progressRow.standardId,
            status: progressRow.status as
              | "not_started"
              | "planning"
              | "in_progress"
              | "embedded",
            updatedAt: progressRow.updatedAt,
          }
        : undefined,
    }),
  );
});

export default router;
