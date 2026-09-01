import { Router, type IRouter } from "express";
import { desc, eq } from "drizzle-orm";
import { db, favoritesTable, strategiesTable } from "@workspace/db";
import {
  ListFavoritesResponse,
  AddFavoriteBody,
  RemoveFavoriteParams,
} from "@workspace/api-zod";
import { buildStrategies } from "../lib/builders";

const router: IRouter = Router();

router.get("/favorites", async (_req, res): Promise<void> => {
  const rows = await db
    .select()
    .from(favoritesTable)
    .orderBy(desc(favoritesTable.createdAt));

  if (rows.length === 0) {
    res.json(ListFavoritesResponse.parse([]));
    return;
  }

  const strategies = await buildStrategies({
    ids: rows.map((r) => r.strategyId),
  });
  const byId = new Map(strategies.map((s) => [s.id, s]));

  const result = rows
    .map((row) => {
      const strategy = byId.get(row.strategyId);
      if (!strategy) return null;
      return {
        strategyId: row.strategyId,
        strategy,
        createdAt: row.createdAt,
      };
    })
    .filter((entry): entry is NonNullable<typeof entry> => entry !== null);

  res.json(ListFavoritesResponse.parse(result));
});

router.post("/favorites", async (req, res): Promise<void> => {
  const body = AddFavoriteBody.safeParse(req.body);
  if (!body.success) {
    res.status(400).json({ error: body.error.message });
    return;
  }

  const [strategy] = await db
    .select()
    .from(strategiesTable)
    .where(eq(strategiesTable.id, body.data.strategyId));
  if (!strategy) {
    res.status(404).json({ error: "Strategy not found" });
    return;
  }

  const now = new Date();
  await db
    .insert(favoritesTable)
    .values({ strategyId: body.data.strategyId, createdAt: now })
    .onConflictDoNothing({ target: favoritesTable.strategyId });

  const [row] = await db
    .select()
    .from(favoritesTable)
    .where(eq(favoritesTable.strategyId, body.data.strategyId));

  if (!row) {
    res.status(500).json({ error: "Failed to add favorite" });
    return;
  }

  const [hydrated] = await buildStrategies({ ids: [body.data.strategyId] });
  if (!hydrated) {
    res.status(500).json({ error: "Failed to hydrate favorite" });
    return;
  }

  res.status(201).json({
    strategyId: row.strategyId,
    strategy: hydrated,
    createdAt: row.createdAt,
  });
});

router.delete("/favorites/:strategyId", async (req, res): Promise<void> => {
  const params = RemoveFavoriteParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [row] = await db
    .delete(favoritesTable)
    .where(eq(favoritesTable.strategyId, params.data.strategyId))
    .returning();

  if (!row) {
    res.status(404).json({ error: "Favorite not found" });
    return;
  }

  res.sendStatus(204);
});

export default router;
