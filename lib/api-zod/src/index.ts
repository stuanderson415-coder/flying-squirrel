export * from "./generated/api";

// Re-export non-conflicting type interfaces from the schema types module.
// Body type interfaces (AddFavoriteBody, CreateNoteBody, SetProgressBody,
// UpdateNoteBody) are intentionally omitted because the same names already
// exist as Zod schemas in ./generated/api. Consumers can use
// `z.infer<typeof CreateNoteBody>` to get the body type.
export type {
  DashboardSummary,
  Favorite,
  FeaturedStrategy,
  HealthStatus,
  ListNotesParams,
  ListStandardsParams,
  ListStrategiesParams,
  Note,
  ProgressEntry,
  QualityAreaDetail,
  QualityAreaProgress,
  QualityAreaSummary,
  StandardDetail,
  StandardSummary,
  Strategy,
} from "./generated/types";

export {
  ProgressStatus,
  StrategyCategory,
  StrategyEffort,
} from "./generated/types";
