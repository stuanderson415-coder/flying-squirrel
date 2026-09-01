import { pgTable, integer, timestamp } from "drizzle-orm/pg-core";
import { strategiesTable } from "./strategies";

export const favoritesTable = pgTable("favorites", {
  strategyId: integer("strategy_id")
    .primaryKey()
    .references(() => strategiesTable.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type FavoriteRow = typeof favoritesTable.$inferSelect;
