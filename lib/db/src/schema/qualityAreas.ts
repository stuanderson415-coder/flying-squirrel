import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";

export const qualityAreasTable = pgTable("quality_areas", {
  id: serial("id").primaryKey(),
  code: text("code").notNull().unique(),
  title: text("title").notNull(),
  tagline: text("tagline").notNull(),
  description: text("description").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export type QualityAreaRow = typeof qualityAreasTable.$inferSelect;
