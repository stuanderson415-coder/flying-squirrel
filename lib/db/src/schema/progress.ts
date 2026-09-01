import { pgTable, integer, text, timestamp } from "drizzle-orm/pg-core";
import { standardsTable } from "./standards";

export const progressTable = pgTable("progress", {
  standardId: integer("standard_id")
    .primaryKey()
    .references(() => standardsTable.id, { onDelete: "cascade" }),
  status: text("status").notNull().default("not_started"),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type ProgressRow = typeof progressTable.$inferSelect;
