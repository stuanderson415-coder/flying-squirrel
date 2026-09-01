import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, progressTable, standardsTable } from "@workspace/db";
import {
  ListProgressResponse,
  SetProgressParams,
  SetProgressBody,
  SetProgressResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/progress", async (_req, res): Promise<void> => {
  const rows = await db.select().from(progressTable);
  res.json(
    ListProgressResponse.parse(
      rows.map((row) => ({
        standardId: row.standardId,
        status: row.status as
          | "not_started"
          | "planning"
          | "in_progress"
          | "embedded",
        updatedAt: row.updatedAt,
      })),
    ),
  );
});

router.put("/progress/:standardId", async (req, res): Promise<void> => {
  const params = SetProgressParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const body = SetProgressBody.safeParse(req.body);
  if (!body.success) {
    res.status(400).json({ error: body.error.message });
    return;
  }

  const [standard] = await db
    .select({ id: standardsTable.id })
    .from(standardsTable)
    .where(eq(standardsTable.id, params.data.standardId));
  if (!standard) {
    res.status(404).json({ error: "Standard not found" });
    return;
  }

  const now = new Date();
  const [row] = await db
    .insert(progressTable)
    .values({
      standardId: params.data.standardId,
      status: body.data.status,
      updatedAt: now,
    })
    .onConflictDoUpdate({
      target: progressTable.standardId,
      set: { status: body.data.status, updatedAt: now },
    })
    .returning();

  if (!row) {
    res.status(500).json({ error: "Failed to update progress" });
    return;
  }

  res.json(
    SetProgressResponse.parse({
      standardId: row.standardId,
      status: row.status as
        | "not_started"
        | "planning"
        | "in_progress"
        | "embedded",
      updatedAt: row.updatedAt,
    }),
  );
});

export default router;
