import {
  pgTable,
  serial,
  text,
  integer,
  jsonb,
} from "drizzle-orm/pg-core";
import { qualityAreasTable } from "./qualityAreas";

export const standardsTable = pgTable("standards", {
  id: serial("id").primaryKey(),
  qualityAreaId: integer("quality_area_id")
    .notNull()
    .references(() => qualityAreasTable.id, { onDelete: "cascade" }),
  code: text("code").notNull().unique(),
  title: text("title").notNull(),
  intent: text("intent").notNull(),
  whatItMeans: text("what_it_means").notNull(),
  keyPractices: jsonb("key_practices").$type<string[]>().notNull().default([]),
  evidenceExamples: jsonb("evidence_examples")
    .$type<string[]>()
    .notNull()
    .default([]),
  sortOrder: integer("sort_order").notNull().default(0),
});

export type StandardRow = typeof standardsTable.$inferSelect;
