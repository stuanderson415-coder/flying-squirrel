import { Router, type IRouter } from "express";
import { and, desc, eq } from "drizzle-orm";
import { db, notesTable, standardsTable } from "@workspace/db";
import {
  ListNotesQueryParams,
  ListNotesResponse,
  CreateNoteBody,
  UpdateNoteParams,
  UpdateNoteBody,
  UpdateNoteResponse,
  DeleteNoteParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/notes", async (req, res): Promise<void> => {
  const params = ListNotesQueryParams.safeParse(req.query);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const conditions = [];
  if (params.data.standardId !== undefined) {
    conditions.push(eq(notesTable.standardId, params.data.standardId));
  }

  const baseQuery = db
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
    .orderBy(desc(notesTable.updatedAt));

  const rows =
    conditions.length === 0
      ? await baseQuery
      : await baseQuery.where(and(...conditions));

  res.json(ListNotesResponse.parse(rows));
});

router.post("/notes", async (req, res): Promise<void> => {
  const body = CreateNoteBody.safeParse(req.body);
  if (!body.success) {
    res.status(400).json({ error: body.error.message });
    return;
  }

  const [standard] = await db
    .select()
    .from(standardsTable)
    .where(eq(standardsTable.id, body.data.standardId));
  if (!standard) {
    res.status(404).json({ error: "Standard not found" });
    return;
  }

  const now = new Date();
  const [note] = await db
    .insert(notesTable)
    .values({
      standardId: body.data.standardId,
      body: body.data.body,
      createdAt: now,
      updatedAt: now,
    })
    .returning();

  if (!note) {
    res.status(500).json({ error: "Failed to create note" });
    return;
  }

  res.status(201).json({
    id: note.id,
    standardId: note.standardId,
    standardCode: standard.code,
    standardTitle: standard.title,
    body: note.body,
    createdAt: note.createdAt,
    updatedAt: note.updatedAt,
  });
});

router.put("/notes/:noteId", async (req, res): Promise<void> => {
  const params = UpdateNoteParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const body = UpdateNoteBody.safeParse(req.body);
  if (!body.success) {
    res.status(400).json({ error: body.error.message });
    return;
  }

  const now = new Date();
  const [note] = await db
    .update(notesTable)
    .set({ body: body.data.body, updatedAt: now })
    .where(eq(notesTable.id, params.data.noteId))
    .returning();

  if (!note) {
    res.status(404).json({ error: "Note not found" });
    return;
  }

  const [standard] = await db
    .select()
    .from(standardsTable)
    .where(eq(standardsTable.id, note.standardId));

  if (!standard) {
    res.status(500).json({ error: "Standard for note not found" });
    return;
  }

  res.json(
    UpdateNoteResponse.parse({
      id: note.id,
      standardId: note.standardId,
      standardCode: standard.code,
      standardTitle: standard.title,
      body: note.body,
      createdAt: note.createdAt,
      updatedAt: note.updatedAt,
    }),
  );
});

router.delete("/notes/:noteId", async (req, res): Promise<void> => {
  const params = DeleteNoteParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [note] = await db
    .delete(notesTable)
    .where(eq(notesTable.id, params.data.noteId))
    .returning();

  if (!note) {
    res.status(404).json({ error: "Note not found" });
    return;
  }

  res.sendStatus(204);
});

export default router;
