import type { QueryKey, UseMutationOptions, UseMutationResult, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import type { AddFavoriteBody, CreateNoteBody, DashboardSummary, Favorite, FeaturedStrategy, HealthStatus, ListNotesParams, ListStandardsParams, ListStrategiesParams, Note, ProgressEntry, QualityAreaDetail, QualityAreaSummary, SetProgressBody, StandardDetail, StandardSummary, Strategy, UpdateNoteBody } from "./api.schemas";
import { customFetch } from "../custom-fetch";
import type { ErrorType, BodyType } from "../custom-fetch";
type AwaitedInput<T> = PromiseLike<T> | T;
type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;
type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];
/**
 * Returns server health status
 * @summary Health check
 */
export declare const getHealthCheckUrl: () => string;
export declare const healthCheck: (options?: RequestInit) => Promise<HealthStatus>;
export declare const getHealthCheckQueryKey: () => readonly ["/api/healthz"];
export declare const getHealthCheckQueryOptions: <TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData> & {
    queryKey: QueryKey;
};
export type HealthCheckQueryResult = NonNullable<Awaited<ReturnType<typeof healthCheck>>>;
export type HealthCheckQueryError = ErrorType<unknown>;
/**
 * @summary Health check
 */
export declare function useHealthCheck<TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * Returns the four quality areas of the RTO Standards 2025 with a summary of standards and progress.
 * @summary List all quality areas
 */
export declare const getListQualityAreasUrl: () => string;
export declare const listQualityAreas: (options?: RequestInit) => Promise<QualityAreaSummary[]>;
export declare const getListQualityAreasQueryKey: () => readonly ["/api/quality-areas"];
export declare const getListQualityAreasQueryOptions: <TData = Awaited<ReturnType<typeof listQualityAreas>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listQualityAreas>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listQualityAreas>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListQualityAreasQueryResult = NonNullable<Awaited<ReturnType<typeof listQualityAreas>>>;
export type ListQualityAreasQueryError = ErrorType<unknown>;
/**
 * @summary List all quality areas
 */
export declare function useListQualityAreas<TData = Awaited<ReturnType<typeof listQualityAreas>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listQualityAreas>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * Returns a quality area with all of its nested standards.
 * @summary Get a single quality area
 */
export declare const getGetQualityAreaUrl: (qualityAreaId: number) => string;
export declare const getQualityArea: (qualityAreaId: number, options?: RequestInit) => Promise<QualityAreaDetail>;
export declare const getGetQualityAreaQueryKey: (qualityAreaId: number) => readonly [`/api/quality-areas/${number}`];
export declare const getGetQualityAreaQueryOptions: <TData = Awaited<ReturnType<typeof getQualityArea>>, TError = ErrorType<void>>(qualityAreaId: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getQualityArea>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getQualityArea>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetQualityAreaQueryResult = NonNullable<Awaited<ReturnType<typeof getQualityArea>>>;
export type GetQualityAreaQueryError = ErrorType<void>;
/**
 * @summary Get a single quality area
 */
export declare function useGetQualityArea<TData = Awaited<ReturnType<typeof getQualityArea>>, TError = ErrorType<void>>(qualityAreaId: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getQualityArea>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary List all standards (optionally filtered by quality area)
 */
export declare const getListStandardsUrl: (params?: ListStandardsParams) => string;
export declare const listStandards: (params?: ListStandardsParams, options?: RequestInit) => Promise<StandardSummary[]>;
export declare const getListStandardsQueryKey: (params?: ListStandardsParams) => readonly ["/api/standards", ...ListStandardsParams[]];
export declare const getListStandardsQueryOptions: <TData = Awaited<ReturnType<typeof listStandards>>, TError = ErrorType<unknown>>(params?: ListStandardsParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listStandards>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listStandards>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListStandardsQueryResult = NonNullable<Awaited<ReturnType<typeof listStandards>>>;
export type ListStandardsQueryError = ErrorType<unknown>;
/**
 * @summary List all standards (optionally filtered by quality area)
 */
export declare function useListStandards<TData = Awaited<ReturnType<typeof listStandards>>, TError = ErrorType<unknown>>(params?: ListStandardsParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listStandards>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Get a standard with its strategies
 */
export declare const getGetStandardUrl: (standardId: number) => string;
export declare const getStandard: (standardId: number, options?: RequestInit) => Promise<StandardDetail>;
export declare const getGetStandardQueryKey: (standardId: number) => readonly [`/api/standards/${number}`];
export declare const getGetStandardQueryOptions: <TData = Awaited<ReturnType<typeof getStandard>>, TError = ErrorType<void>>(standardId: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getStandard>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getStandard>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetStandardQueryResult = NonNullable<Awaited<ReturnType<typeof getStandard>>>;
export type GetStandardQueryError = ErrorType<void>;
/**
 * @summary Get a standard with its strategies
 */
export declare function useGetStandard<TData = Awaited<ReturnType<typeof getStandard>>, TError = ErrorType<void>>(standardId: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getStandard>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary List strategies (optionally filtered)
 */
export declare const getListStrategiesUrl: (params?: ListStrategiesParams) => string;
export declare const listStrategies: (params?: ListStrategiesParams, options?: RequestInit) => Promise<Strategy[]>;
export declare const getListStrategiesQueryKey: (params?: ListStrategiesParams) => readonly ["/api/strategies", ...ListStrategiesParams[]];
export declare const getListStrategiesQueryOptions: <TData = Awaited<ReturnType<typeof listStrategies>>, TError = ErrorType<unknown>>(params?: ListStrategiesParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listStrategies>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listStrategies>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListStrategiesQueryResult = NonNullable<Awaited<ReturnType<typeof listStrategies>>>;
export type ListStrategiesQueryError = ErrorType<unknown>;
/**
 * @summary List strategies (optionally filtered)
 */
export declare function useListStrategies<TData = Awaited<ReturnType<typeof listStrategies>>, TError = ErrorType<unknown>>(params?: ListStrategiesParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listStrategies>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * Returns a single rotating strategy to spotlight on the dashboard.
 * @summary Get a featured "strategy of the day"
 */
export declare const getGetFeaturedStrategyUrl: () => string;
export declare const getFeaturedStrategy: (options?: RequestInit) => Promise<FeaturedStrategy>;
export declare const getGetFeaturedStrategyQueryKey: () => readonly ["/api/strategies/featured"];
export declare const getGetFeaturedStrategyQueryOptions: <TData = Awaited<ReturnType<typeof getFeaturedStrategy>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getFeaturedStrategy>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getFeaturedStrategy>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetFeaturedStrategyQueryResult = NonNullable<Awaited<ReturnType<typeof getFeaturedStrategy>>>;
export type GetFeaturedStrategyQueryError = ErrorType<unknown>;
/**
 * @summary Get a featured "strategy of the day"
 */
export declare function useGetFeaturedStrategy<TData = Awaited<ReturnType<typeof getFeaturedStrategy>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getFeaturedStrategy>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Get the educator's progress for every standard
 */
export declare const getListProgressUrl: () => string;
export declare const listProgress: (options?: RequestInit) => Promise<ProgressEntry[]>;
export declare const getListProgressQueryKey: () => readonly ["/api/progress"];
export declare const getListProgressQueryOptions: <TData = Awaited<ReturnType<typeof listProgress>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listProgress>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listProgress>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListProgressQueryResult = NonNullable<Awaited<ReturnType<typeof listProgress>>>;
export type ListProgressQueryError = ErrorType<unknown>;
/**
 * @summary Get the educator's progress for every standard
 */
export declare function useListProgress<TData = Awaited<ReturnType<typeof listProgress>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listProgress>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Set or update progress for a standard
 */
export declare const getSetProgressUrl: (standardId: number) => string;
export declare const setProgress: (standardId: number, setProgressBody: SetProgressBody, options?: RequestInit) => Promise<ProgressEntry>;
export declare const getSetProgressMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof setProgress>>, TError, {
        standardId: number;
        data: BodyType<SetProgressBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof setProgress>>, TError, {
    standardId: number;
    data: BodyType<SetProgressBody>;
}, TContext>;
export type SetProgressMutationResult = NonNullable<Awaited<ReturnType<typeof setProgress>>>;
export type SetProgressMutationBody = BodyType<SetProgressBody>;
export type SetProgressMutationError = ErrorType<unknown>;
/**
 * @summary Set or update progress for a standard
 */
export declare const useSetProgress: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof setProgress>>, TError, {
        standardId: number;
        data: BodyType<SetProgressBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof setProgress>>, TError, {
    standardId: number;
    data: BodyType<SetProgressBody>;
}, TContext>;
/**
 * @summary List all reflection notes
 */
export declare const getListNotesUrl: (params?: ListNotesParams) => string;
export declare const listNotes: (params?: ListNotesParams, options?: RequestInit) => Promise<Note[]>;
export declare const getListNotesQueryKey: (params?: ListNotesParams) => readonly ["/api/notes", ...ListNotesParams[]];
export declare const getListNotesQueryOptions: <TData = Awaited<ReturnType<typeof listNotes>>, TError = ErrorType<unknown>>(params?: ListNotesParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listNotes>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listNotes>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListNotesQueryResult = NonNullable<Awaited<ReturnType<typeof listNotes>>>;
export type ListNotesQueryError = ErrorType<unknown>;
/**
 * @summary List all reflection notes
 */
export declare function useListNotes<TData = Awaited<ReturnType<typeof listNotes>>, TError = ErrorType<unknown>>(params?: ListNotesParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listNotes>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Create a new reflection note
 */
export declare const getCreateNoteUrl: () => string;
export declare const createNote: (createNoteBody: CreateNoteBody, options?: RequestInit) => Promise<Note>;
export declare const getCreateNoteMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createNote>>, TError, {
        data: BodyType<CreateNoteBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createNote>>, TError, {
    data: BodyType<CreateNoteBody>;
}, TContext>;
export type CreateNoteMutationResult = NonNullable<Awaited<ReturnType<typeof createNote>>>;
export type CreateNoteMutationBody = BodyType<CreateNoteBody>;
export type CreateNoteMutationError = ErrorType<unknown>;
/**
 * @summary Create a new reflection note
 */
export declare const useCreateNote: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createNote>>, TError, {
        data: BodyType<CreateNoteBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createNote>>, TError, {
    data: BodyType<CreateNoteBody>;
}, TContext>;
/**
 * @summary Update a reflection note
 */
export declare const getUpdateNoteUrl: (noteId: number) => string;
export declare const updateNote: (noteId: number, updateNoteBody: UpdateNoteBody, options?: RequestInit) => Promise<Note>;
export declare const getUpdateNoteMutationOptions: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateNote>>, TError, {
        noteId: number;
        data: BodyType<UpdateNoteBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updateNote>>, TError, {
    noteId: number;
    data: BodyType<UpdateNoteBody>;
}, TContext>;
export type UpdateNoteMutationResult = NonNullable<Awaited<ReturnType<typeof updateNote>>>;
export type UpdateNoteMutationBody = BodyType<UpdateNoteBody>;
export type UpdateNoteMutationError = ErrorType<void>;
/**
 * @summary Update a reflection note
 */
export declare const useUpdateNote: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateNote>>, TError, {
        noteId: number;
        data: BodyType<UpdateNoteBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof updateNote>>, TError, {
    noteId: number;
    data: BodyType<UpdateNoteBody>;
}, TContext>;
/**
 * @summary Delete a reflection note
 */
export declare const getDeleteNoteUrl: (noteId: number) => string;
export declare const deleteNote: (noteId: number, options?: RequestInit) => Promise<void>;
export declare const getDeleteNoteMutationOptions: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteNote>>, TError, {
        noteId: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof deleteNote>>, TError, {
    noteId: number;
}, TContext>;
export type DeleteNoteMutationResult = NonNullable<Awaited<ReturnType<typeof deleteNote>>>;
export type DeleteNoteMutationError = ErrorType<void>;
/**
 * @summary Delete a reflection note
 */
export declare const useDeleteNote: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteNote>>, TError, {
        noteId: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof deleteNote>>, TError, {
    noteId: number;
}, TContext>;
/**
 * @summary List favorited strategies
 */
export declare const getListFavoritesUrl: () => string;
export declare const listFavorites: (options?: RequestInit) => Promise<Favorite[]>;
export declare const getListFavoritesQueryKey: () => readonly ["/api/favorites"];
export declare const getListFavoritesQueryOptions: <TData = Awaited<ReturnType<typeof listFavorites>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listFavorites>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listFavorites>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListFavoritesQueryResult = NonNullable<Awaited<ReturnType<typeof listFavorites>>>;
export type ListFavoritesQueryError = ErrorType<unknown>;
/**
 * @summary List favorited strategies
 */
export declare function useListFavorites<TData = Awaited<ReturnType<typeof listFavorites>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listFavorites>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Add a strategy to favorites
 */
export declare const getAddFavoriteUrl: () => string;
export declare const addFavorite: (addFavoriteBody: AddFavoriteBody, options?: RequestInit) => Promise<Favorite>;
export declare const getAddFavoriteMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof addFavorite>>, TError, {
        data: BodyType<AddFavoriteBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof addFavorite>>, TError, {
    data: BodyType<AddFavoriteBody>;
}, TContext>;
export type AddFavoriteMutationResult = NonNullable<Awaited<ReturnType<typeof addFavorite>>>;
export type AddFavoriteMutationBody = BodyType<AddFavoriteBody>;
export type AddFavoriteMutationError = ErrorType<unknown>;
/**
 * @summary Add a strategy to favorites
 */
export declare const useAddFavorite: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof addFavorite>>, TError, {
        data: BodyType<AddFavoriteBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof addFavorite>>, TError, {
    data: BodyType<AddFavoriteBody>;
}, TContext>;
/**
 * @summary Remove a strategy from favorites
 */
export declare const getRemoveFavoriteUrl: (strategyId: number) => string;
export declare const removeFavorite: (strategyId: number, options?: RequestInit) => Promise<void>;
export declare const getRemoveFavoriteMutationOptions: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof removeFavorite>>, TError, {
        strategyId: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof removeFavorite>>, TError, {
    strategyId: number;
}, TContext>;
export type RemoveFavoriteMutationResult = NonNullable<Awaited<ReturnType<typeof removeFavorite>>>;
export type RemoveFavoriteMutationError = ErrorType<void>;
/**
 * @summary Remove a strategy from favorites
 */
export declare const useRemoveFavorite: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof removeFavorite>>, TError, {
        strategyId: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof removeFavorite>>, TError, {
    strategyId: number;
}, TContext>;
/**
 * Returns aggregate stats across the whole guide — total standards, progress breakdown, per-quality-area progress, recent notes, and favorited count.
 * @summary Get the dashboard summary
 */
export declare const getGetDashboardSummaryUrl: () => string;
export declare const getDashboardSummary: (options?: RequestInit) => Promise<DashboardSummary>;
export declare const getGetDashboardSummaryQueryKey: () => readonly ["/api/dashboard/summary"];
export declare const getGetDashboardSummaryQueryOptions: <TData = Awaited<ReturnType<typeof getDashboardSummary>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getDashboardSummary>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getDashboardSummary>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetDashboardSummaryQueryResult = NonNullable<Awaited<ReturnType<typeof getDashboardSummary>>>;
export type GetDashboardSummaryQueryError = ErrorType<unknown>;
/**
 * @summary Get the dashboard summary
 */
export declare function useGetDashboardSummary<TData = Awaited<ReturnType<typeof getDashboardSummary>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getDashboardSummary>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export {};
//# sourceMappingURL=api.d.ts.map