import { Router, type IRouter } from "express";
import {
  ListStrategiesQueryParams,
  ListStrategiesResponse,
  GetFeaturedStrategyResponse,
} from "@workspace/api-zod";
import { buildStrategies } from "../lib/builders";

const router: IRouter = Router();

router.get("/strategies", async (req, res): Promise<void> => {
  const params = ListStrategiesQueryParams.safeParse(req.query);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const strategies = await buildStrategies({
    standardId: params.data.standardId,
    category: params.data.category,
    effort: params.data.effort,
  });

  res.json(ListStrategiesResponse.parse(strategies));
});

router.get("/strategies/featured", async (_req, res): Promise<void> => {
  const all = await buildStrategies();
  if (all.length === 0) {
    res.status(404).json({ error: "No strategies available" });
    return;
  }

  // Deterministic "strategy of the day" — same one for the whole calendar day,
  // changes daily so the dashboard feels alive.
  const today = new Date();
  const dayKey =
    today.getUTCFullYear() * 10000 +
    (today.getUTCMonth() + 1) * 100 +
    today.getUTCDate();
  const idx = dayKey % all.length;
  const strategy = all[idx];

  if (!strategy) {
    res.status(404).json({ error: "No strategies available" });
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
    GetFeaturedStrategyResponse.parse({
      strategy,
      rationale: rationaleByEffort[strategy.effort],
    }),
  );
});

export default router;
