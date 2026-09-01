import {
  pgTable,
  serial,
  integer,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { standardsTable } from "./standards";

export const notesTable = pgTable("notes", {
  id: serial("id").primaryKey(),
  standardId: integer("standard_id")
    .notNull()
    .references(() => standardsTable.id, { onDelete: "cascade" }),
  body: text("body").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type NoteRow = typeof notesTable.$inferSelect;
