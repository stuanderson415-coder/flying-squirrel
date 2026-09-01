import {
  pgTable,
  serial,
  text,
  integer,
  jsonb,
} from "drizzle-orm/pg-core";
import { standardsTable } from "./standards";

export const strategiesTable = pgTable("strategies", {
  id: serial("id").primaryKey(),
  standardId: integer("standard_id")
    .notNull()
    .references(() => standardsTable.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  steps: jsonb("steps").$type<string[]>().notNull().default([]),
  category: text("category").notNull(),
  effort: text("effort").notNull(),
  timeEstimate: text("time_estimate").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export type StrategyRow = typeof strategiesTable.$inferSelect;
