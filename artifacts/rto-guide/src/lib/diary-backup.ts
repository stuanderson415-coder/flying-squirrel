export type ActivityId =
  | "preparation"
  | "delivery"
  | "assessment"
  | "moderation"
  | "validation"
  | "industry-engagement"
  | "industry-training"
  | "return-to-industry"
  | "professional-development"
  | "learning-design"
  | "instructional-design"
  | "other";

export interface PracticeEntry {
  id: string;
  action: string;
  body: string;
  createdAt: string;
  activity: ActivityId;
  duration: string;
  trainerUnderSupervision: boolean;
  supervisorName: string;
  uoc: string;
  resourceUrl: string;
  elearnShortname: string;
  classSize: number | null;
  date: string;
  trainersPresent: string;
  keywords: string[];
  principles: string[];
  evidenceRules: string[];
  customTags: string[];
  mappedStandardCodes: string[];
  mappedQualityAreaCodes: string[];
  legacyQualityAreas: string[];
  tsmDraft?: {
    title: string;
    body: string;
  };
  tagSchemaVersion: number;
  [key: string]: unknown;
}

export interface DiaryBackup {
  format: typeof DIARY_BACKUP_FORMAT;
  version: typeof DIARY_BACKUP_VERSION;
  exportedAt: string;
  entries: PracticeEntry[];
}

export const DIARY_BACKUP_FORMAT = "rto-practice-diary";
export const DIARY_BACKUP_VERSION = 2;
export const FIRST_VERSIONED_DIARY_BACKUP_VERSION = 1;
export const DIARY_STORAGE_KEY = "rto-diary:v4";
export const DIARY_ENTRIES_UPDATED_EVENT = "rto-diary:updated";

const ACTIVITIES: ActivityId[] = [
  "preparation",
  "delivery",
  "assessment",
  "moderation",
  "validation",
  "industry-engagement",
  "industry-training",
  "return-to-industry",
  "professional-development",
  "learning-design",
  "instructional-design",
  "other",
];

const LEGACY_THEME_TO_KEYWORD: Record<string, string> = {
  "design-delivery": "training-design",
  "industry-relevance": "industry-currency",
  "learner-support": "learner-support",
  "workforce-capability": "workforce-capability",
  "governance-improvement": "continuous-improvement",
};

export function uniqueStrings(value: unknown) {
  return Array.from(
    new Set(
      Array.isArray(value)
        ? value.filter((item): item is string => typeof item === "string")
        : [],
    ),
  );
}

export function isSafeResourceUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function normaliseResourceUrl(value: unknown) {
  const url = typeof value === "string" ? value.trim() : "";
  return isSafeResourceUrl(url) ? url : "";
}

export function isDiaryActivity(value: unknown): value is ActivityId {
  return ACTIVITIES.includes(value as ActivityId);
}

function activityForLegacyEntry(entry: Record<string, unknown>): ActivityId {
  if (isDiaryActivity(entry.activity)) return entry.activity;
  if (entry.section === "assessment" || entry.section === "evidence") {
    return "assessment";
  }
  return "other";
}

export function normaliseDiaryEntry(
  raw: Record<string, unknown>,
): PracticeEntry | null {
  if (
    typeof raw.id !== "string" ||
    typeof raw.body !== "string" ||
    typeof raw.createdAt !== "string"
  ) {
    return null;
  }

  const legacyThemes = uniqueStrings(raw.themes)
    .map((theme) => LEGACY_THEME_TO_KEYWORD[theme])
    .filter((theme): theme is string => Boolean(theme));

  return {
    ...raw,
    id: raw.id,
    action: typeof raw.action === "string" ? raw.action : "",
    body: raw.body,
    createdAt: raw.createdAt,
    activity: activityForLegacyEntry(raw),
    duration: typeof raw.duration === "string" ? raw.duration : "",
    trainerUnderSupervision: raw.trainerUnderSupervision === true,
    supervisorName:
      typeof raw.supervisorName === "string" ? raw.supervisorName : "",
    uoc: typeof raw.uoc === "string" ? raw.uoc : "",
    resourceUrl: normaliseResourceUrl(raw.resourceUrl),
    elearnShortname:
      typeof raw.elearnShortname === "string" ? raw.elearnShortname : "",
    classSize:
      typeof raw.classSize === "number" &&
      Number.isInteger(raw.classSize) &&
      raw.classSize >= 0
        ? raw.classSize
        : null,
    date:
      typeof raw.date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(raw.date)
        ? raw.date
        : raw.createdAt.slice(0, 10),
    trainersPresent:
      typeof raw.trainersPresent === "string" ? raw.trainersPresent : "",
    keywords: uniqueStrings(raw.keywords ?? legacyThemes),
    principles: uniqueStrings(raw.principles),
    evidenceRules: uniqueStrings(raw.evidenceRules),
    customTags: uniqueStrings(raw.customTags),
    mappedStandardCodes: uniqueStrings(
      raw.mappedStandardCodes ?? raw.standardCodes,
    ),
    mappedQualityAreaCodes: uniqueStrings(
      raw.mappedQualityAreaCodes ?? raw.legacyQualityAreas,
    ).filter((code) => /^QA[1-4]$/.test(code)),
    legacyQualityAreas: uniqueStrings(raw.legacyQualityAreas ?? raw.qas),
    tsmDraft:
      isRecord(raw.tsmDraft) &&
      typeof raw.tsmDraft.title === "string" &&
      typeof raw.tsmDraft.body === "string"
        ? { title: raw.tsmDraft.title, body: raw.tsmDraft.body }
        : undefined,
    tagSchemaVersion: 3,
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function hasCurrentEntryShape(entry: Record<string, unknown>) {
  return (
    isDiaryActivity(entry.activity) &&
    entry.tagSchemaVersion === 3 &&
    isStringArray(entry.keywords) &&
    isStringArray(entry.principles) &&
    isStringArray(entry.evidenceRules) &&
    isStringArray(entry.customTags) &&
    isStringArray(entry.mappedStandardCodes) &&
    isStringArray(entry.legacyQualityAreas)
  );
}

function hasVersionOneEntryShape(entry: Record<string, unknown>) {
  const hasLegacyTags =
    (entry.tagSchemaVersion === undefined ||
      entry.tagSchemaVersion === 2) &&
    isStringArray(entry.standardCodes) &&
    isStringArray(entry.qas) &&
    isStringArray(entry.themes) &&
    isStringArray(entry.principles) &&
    isStringArray(entry.evidenceRules);

  return hasCurrentEntryShape(entry) || hasLegacyTags;
}

function validateEntryBasics(
  rawEntry: unknown,
  entryIds: Set<string>,
  isCompatibleVersionOne: boolean,
) {
  if (
    !isRecord(rawEntry) ||
    typeof rawEntry.id !== "string" ||
    rawEntry.id.length === 0 ||
    entryIds.has(rawEntry.id) ||
    typeof rawEntry.body !== "string" ||
    typeof rawEntry.createdAt !== "string" ||
    !Number.isFinite(Date.parse(rawEntry.createdAt))
  ) {
    return false;
  }

  return isCompatibleVersionOne
    ? hasVersionOneEntryShape(rawEntry)
    : hasCurrentEntryShape(rawEntry);
}

function migrateEntries(
  entries: unknown[],
  isCompatibleVersionOne: boolean,
): PracticeEntry[] | null {
  const migratedEntries: PracticeEntry[] = [];
  const entryIds = new Set<string>();

  for (const rawEntry of entries) {
    if (!validateEntryBasics(rawEntry, entryIds, isCompatibleVersionOne)) {
      return null;
    }

    const entry = normaliseDiaryEntry(rawEntry as Record<string, unknown>);
    if (!entry) return null;

    entryIds.add(entry.id);
    migratedEntries.push(entry);
  }

  return migratedEntries;
}

export type DiaryBackupReadResult =
  | {
      status: "valid";
      entries: PracticeEntry[];
      sourceVersion: number;
      migrated: boolean;
    }
  | {
      status: "future";
      version: number;
    }
  | {
      status: "invalid";
      reason: "format" | "version" | "metadata" | "entries";
    };

export function readDiaryBackup(value: unknown): DiaryBackupReadResult {
  if (!isRecord(value) || value.format !== DIARY_BACKUP_FORMAT) {
    return { status: "invalid", reason: "format" };
  }

  if (
    typeof value.version !== "number" ||
    !Number.isInteger(value.version) ||
    value.version < FIRST_VERSIONED_DIARY_BACKUP_VERSION
  ) {
    return { status: "invalid", reason: "version" };
  }

  if (value.version > DIARY_BACKUP_VERSION) {
    return { status: "future", version: value.version };
  }

  if (
    typeof value.exportedAt !== "string" ||
    !Number.isFinite(Date.parse(value.exportedAt))
  ) {
    return { status: "invalid", reason: "metadata" };
  }

  if (!Array.isArray(value.entries)) {
    return { status: "invalid", reason: "entries" };
  }

  const entries = migrateEntries(
    value.entries,
    value.version === FIRST_VERSIONED_DIARY_BACKUP_VERSION,
  );
  if (!entries) return { status: "invalid", reason: "entries" };

  return {
    status: "valid",
    entries,
    sourceVersion: value.version,
    migrated: value.version !== DIARY_BACKUP_VERSION,
  };
}

export function createDiaryBackup(
  entries: PracticeEntry[],
  exportedAt = new Date().toISOString(),
): DiaryBackup {
  return {
    format: DIARY_BACKUP_FORMAT,
    version: DIARY_BACKUP_VERSION,
    exportedAt,
    entries,
  };
}