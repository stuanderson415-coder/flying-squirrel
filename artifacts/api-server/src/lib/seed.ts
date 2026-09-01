import {
  db,
  qualityAreasTable,
  standardsTable,
  strategiesTable,
} from "@workspace/db";
import { eq } from "drizzle-orm";
import { SEED_QUALITY_AREAS } from "./seedData";

export async function seedIfEmpty(): Promise<void> {
  for (const [areaIndex, qa] of SEED_QUALITY_AREAS.entries()) {
    const [insertedArea] = await db
      .insert(qualityAreasTable)
      .values({
        code: qa.code,
        title: qa.title,
        tagline: qa.tagline,
        description: qa.description,
        sortOrder: areaIndex,
      })
      .onConflictDoUpdate({
        target: qualityAreasTable.code,
        set: {
          title: qa.title,
          tagline: qa.tagline,
          description: qa.description,
          sortOrder: areaIndex,
        },
      })
      .returning();

    if (!insertedArea) {
      throw new Error(`Failed to insert quality area ${qa.code}`);
    }

    for (const [stdIndex, std] of qa.standards.entries()) {
      const [insertedStd] = await db
        .insert(standardsTable)
        .values({
          qualityAreaId: insertedArea.id,
          code: std.code,
          title: std.title,
          intent: std.intent,
          whatItMeans: std.whatItMeans,
          keyPractices: std.keyPractices,
          evidenceExamples: std.evidenceExamples,
          sortOrder: stdIndex,
        })
        .onConflictDoUpdate({
          target: standardsTable.code,
          set: {
            qualityAreaId: insertedArea.id,
            title: std.title,
            intent: std.intent,
            whatItMeans: std.whatItMeans,
            keyPractices: std.keyPractices,
            evidenceExamples: std.evidenceExamples,
            sortOrder: stdIndex,
          },
        })
        .returning();

      if (!insertedStd) {
        throw new Error(`Failed to insert standard ${std.code}`);
      }

      const existingStrategy = await db
        .select({ id: strategiesTable.id })
        .from(strategiesTable)
        .where(eq(strategiesTable.standardId, insertedStd.id))
        .limit(1);

      if (existingStrategy.length === 0) {
        for (const [stratIndex, strat] of std.strategies.entries()) {
          await db.insert(strategiesTable).values({
            standardId: insertedStd.id,
            title: strat.title,
            summary: strat.summary,
            steps: strat.steps,
            category: strat.category,
            effort: strat.effort,
            timeEstimate: strat.timeEstimate,
            sortOrder: stratIndex,
          });
        }
      }
    }
  }
}
