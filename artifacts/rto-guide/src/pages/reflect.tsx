import { type ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { useListStandards, type StandardSummary } from "@workspace/api-client-react";
import {
  Activity,
  Check,
  ChevronDown,
  FileText,
  Mail,
  Filter,
  MapPinned,
  NotebookPen,
  PenLine,
  Search,
  ShieldCheck,
  Tag,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { Link, useLocation } from "wouter";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  DIARY_ENTRIES_UPDATED_EVENT,
  DIARY_STORAGE_KEY,
  DIARY_BACKUP_VERSION,
  isSafeResourceUrl,
  normaliseDiaryEntry,
  readDiaryBackup,
  uniqueStrings,
  type ActivityId,
  type PracticeEntry,
} from "@/lib/diary-backup";
import {
  createPracticeLogbookPdf,
  formatPracticeEntryForSharing,
  type PracticeEntryPresentation,
} from "@/lib/practice-export";
import {
  detectQualityAreas,
  QUALITY_AREAS,
} from "@/lib/quality-area-mapping";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type TagGroup = "keywords" | "principles" | "evidenceRules" | "customTags";

type ActivityTone = {
  badge: string;
  dot: string;
  surface: string;
  border: string;
  text: string;
};

type LogbookDetailsDraft = {
  duration: string;
  trainerUnderSupervision: boolean;
  supervisorName: string;
  uoc: string;
  resourceUrl: string;
  elearnShortname: string;
  classSize: string;
  date: string;
  trainersPresent: string;
};

interface TagOption {
  id: string;
  label: string;
  description?: string;
}

interface RestoreCandidate {
  fileName: string;
  entries: PracticeEntry[];
}

interface MergeSummary {
  added: number;
  skipped: number;
  replaced: number;
}

interface LegacyPracticeEntry {
  id: string;
  section?: "assessment" | "evidence";
  body: string;
  createdAt: string;
}

const STORAGE_KEY = DIARY_STORAGE_KEY;
const PREVIOUS_STORAGE_KEY = "rto-diary:v3";
const LEGACY_PRACTICE_STORAGE_KEY = "rto-practice-journal:v1";
const LEGACY_PRACTICE_MIGRATION_KEY = "rto-diary:v4:migrated-practice-v1";
const NOMINATED_EMAIL_STORAGE_KEY = "rto-diary:nominated-email:v1";
const MAX_BACKUP_FILE_SIZE = 5 * 1024 * 1024;

const ACTIVITY_TONES: Record<ActivityId, ActivityTone> = {
  preparation: {
    badge: "bg-sky-500/15 text-sky-200",
    dot: "bg-sky-400",
    surface: "bg-sky-500/[0.07]",
    border: "border-sky-400/30",
    text: "text-sky-200",
  },
  delivery: {
    badge: "bg-emerald-500/15 text-emerald-200",
    dot: "bg-emerald-400",
    surface: "bg-emerald-500/[0.07]",
    border: "border-emerald-400/30",
    text: "text-emerald-200",
  },
  assessment: {
    badge: "bg-amber-500/15 text-amber-200",
    dot: "bg-amber-400",
    surface: "bg-amber-500/[0.07]",
    border: "border-amber-400/30",
    text: "text-amber-200",
  },
  moderation: {
    badge: "bg-violet-500/15 text-violet-200",
    dot: "bg-violet-400",
    surface: "bg-violet-500/[0.07]",
    border: "border-violet-400/30",
    text: "text-violet-200",
  },
  validation: {
    badge: "bg-rose-500/15 text-rose-200",
    dot: "bg-rose-400",
    surface: "bg-rose-500/[0.07]",
    border: "border-rose-400/30",
    text: "text-rose-200",
  },
  "industry-engagement": {
    badge: "bg-orange-500/15 text-orange-200",
    dot: "bg-orange-400",
    surface: "bg-orange-500/[0.07]",
    border: "border-orange-400/30",
    text: "text-orange-200",
  },
  "industry-training": {
    badge: "bg-cyan-500/15 text-cyan-200",
    dot: "bg-cyan-400",
    surface: "bg-cyan-500/[0.07]",
    border: "border-cyan-400/30",
    text: "text-cyan-200",
  },
  "return-to-industry": {
    badge: "bg-lime-500/15 text-lime-200",
    dot: "bg-lime-400",
    surface: "bg-lime-500/[0.07]",
    border: "border-lime-400/30",
    text: "text-lime-200",
  },
  "professional-development": {
    badge: "bg-pink-500/15 text-pink-200",
    dot: "bg-pink-400",
    surface: "bg-pink-500/[0.07]",
    border: "border-pink-400/30",
    text: "text-pink-200",
  },
  "learning-design": {
    badge: "bg-blue-500/15 text-blue-200",
    dot: "bg-blue-400",
    surface: "bg-blue-500/[0.07]",
    border: "border-blue-400/30",
    text: "text-blue-200",
  },
  "instructional-design": {
    badge: "bg-fuchsia-500/15 text-fuchsia-200",
    dot: "bg-fuchsia-400",
    surface: "bg-fuchsia-500/[0.07]",
    border: "border-fuchsia-400/30",
    text: "text-fuchsia-200",
  },
  other: {
    badge: "bg-slate-500/15 text-slate-200",
    dot: "bg-slate-400",
    surface: "bg-slate-500/[0.07]",
    border: "border-slate-400/30",
    text: "text-slate-200",
  },
};

const ACTIVITIES: Array<{ id: ActivityId; label: string }> = [
  { id: "preparation", label: "Preparation" },
  { id: "delivery", label: "Delivery" },
  { id: "assessment", label: "Assessment" },
  { id: "moderation", label: "Moderation" },
  { id: "validation", label: "Validation" },
  { id: "industry-engagement", label: "Industry engagement" },
  { id: "industry-training", label: "Industry Training" },
  { id: "return-to-industry", label: "Return to Industry" },
  { id: "professional-development", label: "Professional development" },
  { id: "learning-design", label: "Learning design" },
  { id: "instructional-design", label: "Instructional design" },
  { id: "other", label: "Other" },
];

const KEYWORDS: TagOption[] = [
  { id: "learner-support", label: "Learner support" },
  { id: "reasonable-adjustment", label: "Reasonable adjustment" },
  { id: "training-design", label: "Training design" },
  { id: "assessment-judgement", label: "Assessment judgement" },
  { id: "industry-currency", label: "Industry currency" },
  { id: "resources-access", label: "Resources & access" },
  { id: "integrity", label: "Integrity" },
  { id: "validation", label: "Validation" },
  { id: "continuous-improvement", label: "Continuous improvement" },
  { id: "rpl-credit-transfer", label: "RPL & credit transfer" },
  { id: "workforce-capability", label: "Workforce capability" },
];

const PRINCIPLES: TagOption[] = [
  { id: "fair", label: "Fair" },
  { id: "flexible", label: "Flexible" },
  { id: "valid", label: "Valid" },
  { id: "reliable", label: "Reliable" },
];

const EVIDENCE_RULES: TagOption[] = [
  { id: "valid", label: "Valid" },
  { id: "sufficient", label: "Sufficient" },
  { id: "authentic", label: "Authentic" },
  { id: "current", label: "Current" },
];

const EMPTY_TAGS: Pick<
  PracticeEntry,
  "keywords" | "principles" | "evidenceRules" | "customTags"
> = {
  keywords: [],
  principles: [],
  evidenceRules: [],
  customTags: [],
};

function todayForInput() {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  return new Date(now.getTime() - offset * 60 * 1000).toISOString().slice(0, 10);
}

const EMPTY_LOGBOOK_DETAILS: LogbookDetailsDraft = {
  duration: "",
  trainerUnderSupervision: false,
  supervisorName: "",
  uoc: "",
  resourceUrl: "",
  elearnShortname: "",
  classSize: "",
  date: todayForInput(),
  trainersPresent: "",
};

function activityTone(id: ActivityId) {
  return ACTIVITY_TONES[id];
}

function formatLogbookDate(value: string) {
  if (!value) return "";
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleDateString("en-AU", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
}

function isValidResourceUrl(value: string) {
  return !value.trim() || isSafeResourceUrl(value.trim());
}

function classSizeForEntry(value: string) {
  if (!value.trim()) return null;
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed >= 0 ? parsed : null;
}

function hasValidClassSize(value: string) {
  return !value.trim() || classSizeForEntry(value) !== null;
}

function formatDuration(value: string) {
  const duration = value.trim();
  if (!duration) return "";
  const numericHours = Number(duration);
  return Number.isFinite(numericHours)
    ? `${duration} ${numericHours === 1 ? "hour" : "hours"}`
    : duration;
}

function logbookDetailsFromEntry(entry: PracticeEntry): LogbookDetailsDraft {
  return {
    duration: entry.duration,
    trainerUnderSupervision: entry.trainerUnderSupervision,
    supervisorName: entry.supervisorName,
    uoc: entry.uoc,
    resourceUrl: entry.resourceUrl,
    elearnShortname: entry.elearnShortname,
    classSize: entry.classSize === null ? "" : String(entry.classSize),
    date: entry.date,
    trainersPresent: entry.trainersPresent,
  };
}

function logbookDetailLines(entry: PracticeEntry) {
  return [
    entry.date ? `Logbook date: ${formatLogbookDate(entry.date)}` : "",
    entry.duration ? `Duration: ${formatDuration(entry.duration)}` : "",
    entry.uoc ? `UOC: ${entry.uoc}` : "",
    entry.classSize !== null ? `Class size: ${entry.classSize}` : "",
    entry.trainersPresent ? `Educators present: ${entry.trainersPresent}` : "",
    entry.elearnShortname ? `eLearn shortname: ${entry.elearnShortname}` : "",
    entry.resourceUrl ? `Resource: ${entry.resourceUrl}` : "",
    entry.trainerUnderSupervision ? "Educator under supervision: Yes" : "",
    entry.trainerUnderSupervision && entry.supervisorName
      ? `Supervisor: ${entry.supervisorName}`
      : "",
  ].filter(Boolean);
}

function getMergeSummary(
  currentEntries: PracticeEntry[],
  backupEntries: PracticeEntry[],
): MergeSummary {
  const currentIds = new Set(currentEntries.map((entry) => entry.id));
  const added = backupEntries.filter((entry) => !currentIds.has(entry.id)).length;

  return {
    added,
    skipped: backupEntries.length - added,
    replaced: 0,
  };
}

function mergeEntries(
  currentEntries: PracticeEntry[],
  backupEntries: PracticeEntry[],
): PracticeEntry[] {
  const currentIds = new Set(currentEntries.map((entry) => entry.id));
  const newEntries = backupEntries.filter((entry) => !currentIds.has(entry.id));

  return [...currentEntries, ...newEntries].sort(
    (left, right) =>
      new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime(),
  );
}

function readEntries(key: string): Record<string, unknown>[] {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(key) ?? "[]");
    if (Array.isArray(parsed)) {
      return parsed.filter(
        (entry): entry is Record<string, unknown> =>
          Boolean(entry) && typeof entry === "object",
      );
    }
    if (
      parsed &&
      typeof parsed === "object" &&
      Array.isArray((parsed as { entries?: unknown }).entries)
    ) {
      return (parsed as { entries: unknown[] }).entries.filter(
        (entry): entry is Record<string, unknown> =>
          Boolean(entry) && typeof entry === "object",
      );
    }
  } catch {
    // An unreadable local record must not stop the diary from opening.
  }
  return [];
}

function readStorage(key: string) {
  try {
    return { available: true, value: localStorage.getItem(key) };
  } catch {
    return { available: false, value: null };
  }
}

function readNominatedEmail() {
  try {
    return localStorage.getItem(NOMINATED_EMAIL_STORAGE_KEY) ?? "";
  } catch {
    return "";
  }
}

function persist(entries: PracticeEntry[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    return true;
  } catch {
    return false;
  }
}

function loadEntries(): { entries: PracticeEntry[]; storageAvailable: boolean } {
  const currentStorage = readStorage(STORAGE_KEY);
  const previousStorage = readStorage(PREVIOUS_STORAGE_KEY);
  const markerStorage = readStorage(LEGACY_PRACTICE_MIGRATION_KEY);
  let storageAvailable =
    currentStorage.available &&
    previousStorage.available &&
    markerStorage.available;
  const currentExists = currentStorage.value !== null;
  const source = currentExists
    ? readEntries(STORAGE_KEY)
    : readEntries(PREVIOUS_STORAGE_KEY);
  const entries = source
    .map(normaliseDiaryEntry)
    .filter((entry): entry is PracticeEntry => Boolean(entry))
    .map((entry) => ({
      ...entry,
      mappedQualityAreaCodes: uniqueStrings([
        ...entry.mappedQualityAreaCodes,
        ...detectQualityAreas(entry),
      ]),
    }));

  let importedLegacyEntries: PracticeEntry[] = [];
  if (markerStorage.value !== "true") {
    const knownIds = new Set(entries.map((entry) => entry.id));
    importedLegacyEntries = readEntries(LEGACY_PRACTICE_STORAGE_KEY)
      .map((entry) => entry as unknown as LegacyPracticeEntry)
      .filter(
        (entry) =>
          typeof entry.id === "string" &&
          typeof entry.body === "string" &&
          typeof entry.createdAt === "string" &&
          !knownIds.has(`legacy-practice-${entry.id}`),
      )
      .map((entry) => ({
        id: `legacy-practice-${entry.id}`,
        action: "",
        body: entry.body,
        createdAt: entry.createdAt,
        activity: entry.section === "assessment" ? "assessment" : "other",
        duration: "",
        trainerUnderSupervision: false,
        supervisorName: "",
        uoc: "",
        resourceUrl: "",
        elearnShortname: "",
        classSize: null,
        date: entry.createdAt.slice(0, 10),
        trainersPresent: "",
        keywords: [],
        principles:
          entry.section === "assessment" ? PRINCIPLES.map((item) => item.id) : [],
        evidenceRules:
          entry.section === "evidence"
            ? EVIDENCE_RULES.map((item) => item.id)
            : [],
        customTags: [],
        mappedStandardCodes: [],
        mappedQualityAreaCodes: [],
        legacyQualityAreas: [],
        tagSchemaVersion: 3,
      }));
  }

  const allEntries = [...entries, ...importedLegacyEntries].sort(
    (left, right) =>
      new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime(),
  );

  const needsWrite = !currentExists || importedLegacyEntries.length > 0;
  if (needsWrite && !persist(allEntries)) {
    storageAvailable = false;
  }
  if ((!needsWrite || storageAvailable) && markerStorage.value !== "true") {
    try {
      localStorage.setItem(LEGACY_PRACTICE_MIGRATION_KEY, "true");
    } catch {
      storageAvailable = false;
    }
  }

  return { entries: allEntries, storageAvailable };
}

function formatDate(iso: string) {
  const date = new Date(iso);
  return `${date.toLocaleDateString("en-AU", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  })} · ${date.toLocaleTimeString("en-AU", {
    hour: "numeric",
    minute: "2-digit",
  })}`;
}

function activityLabel(id: ActivityId) {
  return ACTIVITIES.find((activity) => activity.id === id)?.label ?? "Other";
}

function toggleValue(values: string[], value: string) {
  return values.includes(value)
    ? values.filter((item) => item !== value)
    : [...values, value];
}

function TagPicker({
  label,
  options,
  selected,
  onToggle,
}: {
  label: string;
  options: TagOption[];
  selected: string[];
  onToggle: (id: string) => void;
}) {
  return (
    <div className="space-y-2">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {options.map((option) => {
          const active = selected.includes(option.id);
          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={active}
              onClick={() => onToggle(option.id)}
              className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs transition-colors ${
                active
                  ? "border-primary/40 bg-primary/10 text-primary"
                  : "border-border bg-background text-muted-foreground hover:border-primary/30 hover:text-foreground"
              }`}
            >
              {active && <Check className="h-3 w-3" />}
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ActivityPicker({
  selected,
  onSelect,
}: {
  selected: ActivityId | null;
  onSelect: (activity: ActivityId) => void;
}) {
  return (
    <div className="space-y-2.5">
      <div className="flex items-center gap-2">
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
          1
        </span>
        <label
          htmlFor="practice-activity"
          className="text-sm font-semibold text-foreground"
        >
          Choose the activity
        </label>
      </div>
      <select
        id="practice-activity"
        value={selected ?? ""}
        onChange={(event) =>
          onSelect(event.target.value as ActivityId)
        }
        className="w-full rounded-xl border border-border bg-background px-3 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30"
      >
        <option value="" disabled>
          Select an activity type
        </option>
        {ACTIVITIES.map((activity) => (
          <option key={activity.id} value={activity.id}>
            {activity.label}
          </option>
        ))}
      </select>
      {selected && (
        <div
          className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium ${activityTone(selected).surface} ${activityTone(selected).border} ${activityTone(selected).text}`}
        >
          <span className={`h-2 w-2 rounded-full ${activityTone(selected).dot}`} />
          {activityLabel(selected)} practice area selected
        </div>
      )}
    </div>
  );
}

function LogbookFields({
  details,
  onChange,
}: {
  details: LogbookDetailsDraft;
  onChange: (details: LogbookDetailsDraft) => void;
}) {
  const update = <Key extends keyof LogbookDetailsDraft>(
    key: Key,
    value: LogbookDetailsDraft[Key],
  ) => onChange({ ...details, [key]: value });

  return (
    <fieldset className="rounded-xl border border-border/70 bg-muted/20 p-3 sm:p-4">
      <legend className="px-1 text-sm font-semibold text-foreground">
        Educator Logbook details
      </legend>
      <div className="mt-2 rounded-lg border border-border bg-background p-3">
        <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
          <input
            type="checkbox"
            checked={details.trainerUnderSupervision}
            onChange={(event) => update("trainerUnderSupervision", event.target.checked)}
            className="h-4 w-4 rounded border-border accent-primary"
          />
          Educator under supervision
        </label>
        {details.trainerUnderSupervision && (
          <label className="mt-3 block space-y-1.5">
            <span className="text-xs font-medium text-foreground">Supervisor Name</span>
            <input
              value={details.supervisorName}
              onChange={(event) => update("supervisorName", event.target.value)}
              placeholder="Supervisor's full name"
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
            />
          </label>
        )}
      </div>
      <div className="mt-2 grid gap-3 sm:grid-cols-2">
        <label className="space-y-1.5">
          <span className="text-xs font-medium text-foreground">Date</span>
          <input
            type="date"
            value={details.date}
            onChange={(event) => update("date", event.target.value)}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
          />
        </label>
        <label className="space-y-1.5">
          <span className="text-xs font-medium text-foreground">Duration (hours)</span>
          <input
            type="number"
            min="0"
            step="0.25"
            inputMode="decimal"
            value={details.duration}
            onChange={(event) => update("duration", event.target.value)}
            placeholder="e.g. 2"
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
          />
        </label>
        <label className="space-y-1.5">
          <span className="text-xs font-medium text-foreground">
            UOC <span className="font-normal text-muted-foreground">(unit of competency)</span>
          </span>
          <input
            value={details.uoc}
            onChange={(event) => update("uoc", event.target.value)}
            placeholder="e.g. TAEDEL411"
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
          />
        </label>
        <label className="space-y-1.5">
          <span className="text-xs font-medium text-foreground">
            Class size <span className="font-normal text-muted-foreground">(No. learners)</span>
          </span>
          <input
            type="number"
            min="0"
            step="1"
            value={details.classSize}
            onChange={(event) => update("classSize", event.target.value)}
            placeholder="e.g. 18"
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
          />
        </label>
        <label className="space-y-1.5">
          <span className="text-xs font-medium text-foreground">Educators Present</span>
          <input
            value={details.trainersPresent}
            onChange={(event) => update("trainersPresent", event.target.value)}
            placeholder="Names separated by commas"
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
          />
          <span className="block text-[11px] text-muted-foreground">
            Names separated by commas
          </span>
        </label>
        <label className="space-y-1.5">
          <span className="text-xs font-medium text-foreground">eLearn shortname</span>
          <input
            value={details.elearnShortname}
            onChange={(event) => update("elearnShortname", event.target.value)}
            placeholder="e.g. TAEDEL411-2025"
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
          />
        </label>
        <label className="space-y-1.5 sm:col-span-2">
          <span className="text-xs font-medium text-foreground">
            URL <span className="font-normal text-muted-foreground">(webinar or online resource)</span>
          </span>
          <input
            type="url"
            value={details.resourceUrl}
            onChange={(event) => update("resourceUrl", event.target.value)}
            placeholder="https://…"
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
          />
        </label>
      </div>
    </fieldset>
  );
}

function LogbookDetailsSummary({ entry }: { entry: PracticeEntry }) {
  const details = [
    entry.date
      ? { label: "Date", value: formatLogbookDate(entry.date) }
      : null,
    entry.duration ? { label: "Duration", value: formatDuration(entry.duration) } : null,
    entry.uoc ? { label: "UOC", value: entry.uoc } : null,
    entry.classSize !== null
      ? { label: "Class size", value: `${entry.classSize} learners` }
      : null,
    entry.trainersPresent
      ? { label: "Educators present", value: entry.trainersPresent }
      : null,
    entry.elearnShortname
      ? { label: "eLearn", value: entry.elearnShortname }
      : null,
  ].filter(
    (detail): detail is { label: string; value: string } => Boolean(detail),
  );

  return (
    <div className="mt-4 space-y-2 rounded-xl border border-border/60 bg-muted/20 p-3">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        Educator Logbook details
      </p>
      <dl className="grid gap-x-4 gap-y-2 text-xs sm:grid-cols-2 lg:grid-cols-3">
        {details.map((detail) => (
          <div key={detail.label}>
            <dt className="text-muted-foreground">{detail.label}</dt>
            <dd className="mt-0.5 font-medium text-foreground">{detail.value}</dd>
          </div>
        ))}
        {entry.trainerUnderSupervision && (
          <div>
            <dt className="text-muted-foreground">Supervision</dt>
            <dd className="mt-0.5 font-medium text-foreground">
              {entry.supervisorName
                ? `Educator under supervision — ${entry.supervisorName}`
                : "Educator under supervision"}
            </dd>
          </div>
        )}
      </dl>
      {isSafeResourceUrl(entry.resourceUrl) && (
        <a
          href={entry.resourceUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex max-w-full break-all text-xs font-medium text-primary hover:text-primary/80"
        >
          Open webinar or online resource
        </a>
      )}
    </div>
  );
}

function TagFields({
  tags,
  onChange,
}: {
  tags: Pick<
    PracticeEntry,
    "keywords" | "principles" | "evidenceRules" | "customTags"
  >;
  onChange: (
    next: Pick<
      PracticeEntry,
      "keywords" | "principles" | "evidenceRules" | "customTags"
    >,
  ) => void;
}) {
  const [customTag, setCustomTag] = useState("");
  const toggle = (group: TagGroup, id: string) => {
    onChange({ ...tags, [group]: toggleValue(tags[group], id) });
  };

  const addCustomTag = () => {
    const value = customTag.trim().replace(/\s+/g, " ");
    if (!value || tags.customTags.includes(value)) return;
    onChange({ ...tags, customTags: [...tags.customTags, value] });
    setCustomTag("");
  };

  return (
    <div className="space-y-4">
      <TagPicker
        label="Keywords from the Standards"
        options={KEYWORDS}
        selected={tags.keywords}
        onToggle={(id) => toggle("keywords", id)}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <TagPicker
          label="Principles of Assessment"
          options={PRINCIPLES}
          selected={tags.principles}
          onToggle={(id) => toggle("principles", id)}
        />
        <TagPicker
          label="Rules of Evidence"
          options={EVIDENCE_RULES}
          selected={tags.evidenceRules}
          onToggle={(id) => toggle("evidenceRules", id)}
        />
      </div>
      <div className="space-y-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Your own tags
        </p>
        <div className="flex flex-wrap gap-1.5">
          {tags.customTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => toggle("customTags", tag)}
              className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-2.5 py-1 text-xs text-foreground hover:border-destructive/35 hover:text-destructive"
              title="Remove this tag"
            >
              {tag}
              <X className="h-3 w-3" />
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            value={customTag}
            onChange={(event) => setCustomTag(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                addCustomTag();
              }
            }}
            placeholder="Add a tag of your own"
            className="min-w-0 flex-1 rounded-lg border border-border bg-background px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-primary/30"
          />
          <button
            type="button"
            onClick={addCustomTag}
            disabled={!customTag.trim()}
            className="rounded-lg border border-border px-3 py-2 text-xs font-medium text-foreground hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
          >
            Add tag
          </button>
        </div>
      </div>
    </div>
  );
}

function displayTagOptions(
  entry: PracticeEntry,
): Array<{ label: string; id: string; group: TagGroup }> {
  const resolve = (ids: string[], options: TagOption[], group: TagGroup) =>
    ids.map((id) => ({
      id,
      group,
      label: options.find((option) => option.id === id)?.label ?? id,
    }));
  return [
    ...resolve(entry.keywords, KEYWORDS, "keywords"),
    ...resolve(entry.principles, PRINCIPLES, "principles"),
    ...resolve(entry.evidenceRules, EVIDENCE_RULES, "evidenceRules"),
    ...entry.customTags.map((tag) => ({
      id: tag,
      group: "customTags" as const,
      label: tag,
    })),
  ];
}

function PracticeOverview({
  entries,
  standards,
}: {
  entries: PracticeEntry[];
  standards: StandardSummary[];
}) {
  const mappedCounts = useMemo(() => {
    const counts = new Map<string, number>();
    entries.forEach((entry) => {
      const qualityAreas = new Set(entry.mappedQualityAreaCodes);
      standards.forEach((standard) => {
        if (
          qualityAreas.has(standard.qualityAreaCode) ||
          entry.mappedStandardCodes.includes(standard.code)
        ) {
          counts.set(standard.code, (counts.get(standard.code) ?? 0) + 1);
        }
      });
    });
    return counts;
  }, [entries, standards]);
  const mappedQualityAreas = new Set(
    entries.flatMap((entry) => entry.mappedQualityAreaCodes),
  );
  const activitiesUsed = new Set(entries.map((entry) => entry.activity));

  return (
    <section className="rounded-2xl border border-primary/15 bg-primary/[0.035] p-4 sm:p-5">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
            Educator Log
          </p>
          <h2 className="mt-1 text-lg font-semibold text-foreground">
            Entries to Date overview
          </h2>
        </div>
        <p className="max-w-xs text-xs leading-relaxed text-muted-foreground">
          This is your private cumulative Educator Log of practice and development, not a formal
          compliance judgement.
        </p>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-border/70 bg-card/70 p-3">
          <p className="text-2xl font-semibold text-foreground">{entries.length}</p>
          <p className="text-xs text-muted-foreground">Recorded entries</p>
        </div>
        <div className="rounded-xl border border-border/70 bg-card/70 p-3">
          <p className="text-2xl font-semibold text-foreground">
            {activitiesUsed.size}
          </p>
          <p className="text-xs text-muted-foreground">Activity types recorded</p>
        </div>
        <div className="rounded-xl border border-border/70 bg-card/70 p-3">
          <p className="text-2xl font-semibold text-foreground">
            {mappedQualityAreas.size}
          </p>
          <p className="text-xs text-muted-foreground">Quality areas mapped</p>
        </div>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_1.25fr]">
        <div>
          <p className="mb-2 text-xs font-semibold text-foreground">
            Activity coverage
          </p>
          <div className="grid grid-cols-2 gap-1.5">
            {ACTIVITIES.map((activity) => {
              const used = activitiesUsed.has(activity.id);
              const tone = activityTone(activity.id);
              return (
                <div
                  key={activity.id}
                  className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-[11px] ${
                    used
                      ? `${tone.surface} ${tone.text}`
                      : "bg-background/60 text-muted-foreground"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      used ? tone.dot : "bg-border"
                    }`}
                  />
                  {activity.label}
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <p className="mb-2 text-xs font-semibold text-foreground">
            Standards covered by your mapped quality areas
          </p>
          <div className="flex flex-wrap gap-1.5">
            {standards.map((standard) => {
              const count = mappedCounts.get(standard.code) ?? 0;
              return (
                <span
                  key={standard.code}
                  title={`${standard.title}${count ? ` · ${count} record${count === 1 ? "" : "s"}` : ""}`}
                  className={`rounded-md border px-2 py-1 text-[11px] font-medium ${
                    count
                      ? "border-primary/35 bg-primary/10 text-primary"
                      : "border-border bg-background/60 text-muted-foreground/55"
                  }`}
                >
                  {standard.code}
                  {count ? ` · ${count}` : ""}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function QualityAreaMappingInline({
  entry,
}: {
  entry: PracticeEntry;
}) {
  const mappedAreas = new Set(entry.mappedQualityAreaCodes);

  return (
    <div className="border-t border-border/60 pt-3">
      <div className="flex flex-wrap gap-1.5">
        {QUALITY_AREAS.map((area) => {
          const active = mappedAreas.has(area.code);
          return (
            <span
              key={area.code}
              className={`rounded-md border px-2 py-1 text-[11px] font-medium ${
                active
                  ? "border-primary/35 bg-primary/10 text-primary"
                  : "border-border bg-background/60 text-muted-foreground/55"
              }`}
              title={area.title}
            >
              {area.code} · {area.title}
            </span>
          );
        })}
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Quality areas are suggested automatically from the activity, action,
        reflection and tags. This is a reflection aid, not a compliance decision.
      </p>
    </div>
  );
}

export default function ReflectPage() {
  const { toast } = useToast();
  const [location] = useLocation();
  const isRecordView = location.startsWith("/record");
  const { data: standards = [] } = useListStandards();
  const [loaded] = useState(loadEntries);
  const [entries, setEntries] = useState<PracticeEntry[]>(loaded.entries);
  const restoreInputRef = useRef<HTMLInputElement>(null);
  const [storageWarning, setStorageWarning] = useState(!loaded.storageAvailable);
  const [activity, setActivity] = useState<ActivityId | null>(null);
  const [action, setAction] = useState("");
  const [body, setBody] = useState("");
  const [logbookDetails, setLogbookDetails] = useState<LogbookDetailsDraft>(
    EMPTY_LOGBOOK_DETAILS,
  );
  const [tags, setTags] = useState(EMPTY_TAGS);
  const [activityFilter, setActivityFilter] = useState<"all" | ActivityId>("all");
  const [keywordFilter, setKeywordFilter] = useState("all");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editActivity, setEditActivity] = useState<ActivityId>("other");
  const [editAction, setEditAction] = useState("");
  const [editBody, setEditBody] = useState("");
  const [editLogbookDetails, setEditLogbookDetails] =
    useState<LogbookDetailsDraft>(EMPTY_LOGBOOK_DETAILS);
  const [editTags, setEditTags] = useState(EMPTY_TAGS);
  const [mappingEntryId, setMappingEntryId] = useState<string | null>(null);
  const [snapshotEntryIds, setSnapshotEntryIds] = useState<string[]>([]);
  const [snapshotEmail, setSnapshotEmail] = useState(readNominatedEmail);
  const [tsmEntryId, setTsmEntryId] = useState<string | null>(null);
  const [tsmDraftTitle, setTsmDraftTitle] = useState("");
  const [tsmDraftBody, setTsmDraftBody] = useState("");
  const [restoreCandidate, setRestoreCandidate] =
    useState<RestoreCandidate | null>(null);

  useEffect(() => {
    document.title = isRecordView
      ? "Educator Log | RTO Standards Companion"
      : "Educator Logbook | RTO Standards Companion";
  }, [isRecordView]);

  useEffect(() => {
    try {
      const email = snapshotEmail.trim();
      if (email) {
        localStorage.setItem(NOMINATED_EMAIL_STORAGE_KEY, email);
      } else {
        localStorage.removeItem(NOMINATED_EMAIL_STORAGE_KEY);
      }
    } catch {
      setStorageWarning(true);
    }
  }, [snapshotEmail]);

  const filteredEntries = useMemo(
    () =>
      entries.filter(
        (entry) =>
          (activityFilter === "all" || entry.activity === activityFilter) &&
          (keywordFilter === "all" || entry.keywords.includes(keywordFilter)),
      ),
    [entries, activityFilter, keywordFilter],
  );

  const updateEntries = (updater: (current: PracticeEntry[]) => PracticeEntry[]) => {
    const next = updater(entries);
    const wasPersisted = persist(next);
    setEntries(next);
    window.dispatchEvent(new Event(DIARY_ENTRIES_UPDATED_EVENT));
    if (!wasPersisted) setStorageWarning(true);
    return wasPersisted;
  };

  const handlePdfExport = () => {
    if (entries.length === 0) return;

    try {
      const pdf = createPracticeLogbookPdf(entries, exportPresentationForEntry);
      const url = URL.createObjectURL(pdf);
      const link = document.createElement("a");
      link.href = url;
      link.download = `rto-educator-logbook-${new Date().toISOString().slice(0, 10)}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 0);
      toast({
        title: "PDF logbook downloaded",
        description: `${entries.length} ${entries.length === 1 ? "entry" : "entries"} included.`,
      });
    } catch {
      toast({
        title: "Couldn’t create PDF logbook",
        description: "Your practice record is still stored in this browser.",
        variant: "destructive",
      });
    }
  };

  const handleRestoreFile = async (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    if (file.size > MAX_BACKUP_FILE_SIZE) {
      toast({
        title: "Backup file is too large",
        description: "Choose a Practice backup smaller than 5 MB.",
        variant: "destructive",
      });
      return;
    }

    try {
      const parsed = JSON.parse(await file.text()) as unknown;
      const result = readDiaryBackup(parsed);
      if (result.status === "future") {
        toast({
          title: "Backup needs a newer guide",
          description: `This backup uses version ${result.version}, but this guide supports version ${DIARY_BACKUP_VERSION}. Update the guide before restoring it. Your current diary was not changed.`,
          variant: "destructive",
        });
        return;
      }
      if (result.status !== "valid") throw new Error("Invalid practice backup");

      setRestoreCandidate({
        fileName: file.name,
        entries: result.entries,
      });
    } catch {
      toast({
        title: "Backup not recognised",
        description:
          "Choose a valid Practice JSON backup exported from this app.",
        variant: "destructive",
      });
    }
  };

  const handleRestoreConfirm = (mode: "merge" | "replace") => {
    if (!restoreCandidate) return;

    const nextEntries =
      mode === "merge"
        ? mergeEntries(entries, restoreCandidate.entries)
        : restoreCandidate.entries;
    const wasPersisted = persist(nextEntries);
    setEntries(nextEntries);
    setActivityFilter("all");
    setKeywordFilter("all");
    setEditingId(null);
    setMappingEntryId(null);
    setSnapshotEntryIds([]);
    setRestoreCandidate(null);
    if (!wasPersisted) setStorageWarning(true);
    toast(
      mode === "merge"
        ? wasPersisted
          ? {
              title: "Practice backup merged",
              description: `${nextEntries.length - entries.length} new ${nextEntries.length - entries.length === 1 ? "entry" : "entries"} added from ${restoreCandidate.fileName}; matching entries were kept.`,
            }
          : {
              title: "Backup merged for this session",
              description:
                "This browser could not save local storage, so the merged record may not survive a refresh.",
            }
        : wasPersisted
          ? {
              title: "Practice record restored",
              description: `${restoreCandidate.entries.length} ${restoreCandidate.entries.length === 1 ? "entry" : "entries"} restored from ${restoreCandidate.fileName}.`,
            }
          : {
              title: "Record restored for this session",
              description:
                "This browser could not save local storage, so the restored record may not survive a refresh.",
            },
    );
  };

  const saveEntry = () => {
    const recordedAction = action.trim();
    const reflection = body.trim();
    if (!activity || !recordedAction) {
      toast({
        title: "Add an action before saving",
        description: "Describe what you did, changed, reviewed or followed up.",
        variant: "destructive",
      });
      return;
    }
    if (!isValidResourceUrl(logbookDetails.resourceUrl)) {
      toast({
        title: "Enter a valid resource URL",
        description: "Use a full http:// or https:// webinar or online resource link.",
        variant: "destructive",
      });
      return;
    }
    if (!hasValidClassSize(logbookDetails.classSize)) {
      toast({
        title: "Enter a whole-number class size",
        description: "Class size must be zero or a positive number of learners.",
        variant: "destructive",
      });
      return;
    }
    const entry: PracticeEntry = {
      id: `practice-${Date.now()}`,
      action: recordedAction,
      body: reflection,
      createdAt: new Date().toISOString(),
      activity,
      duration: logbookDetails.duration.trim(),
      trainerUnderSupervision: logbookDetails.trainerUnderSupervision,
      supervisorName: logbookDetails.supervisorName.trim(),
      uoc: logbookDetails.uoc.trim(),
      resourceUrl: logbookDetails.resourceUrl.trim(),
      elearnShortname: logbookDetails.elearnShortname.trim(),
      classSize: classSizeForEntry(logbookDetails.classSize),
      date: logbookDetails.date,
      trainersPresent: logbookDetails.trainersPresent.trim(),
      ...tags,
      mappedStandardCodes: [],
      mappedQualityAreaCodes: [],
      legacyQualityAreas: [],
      tagSchemaVersion: 3,
    };
    entry.mappedQualityAreaCodes = detectQualityAreas(entry);
    const wasPersisted = updateEntries((current) => [entry, ...current]);
    setActivity(null);
    setAction("");
    setBody("");
    setLogbookDetails({ ...EMPTY_LOGBOOK_DETAILS, date: todayForInput() });
    setTags(EMPTY_TAGS);
    toast(
      wasPersisted
        ? {
            title: "Practice entry saved",
            description: "You can map it to Outcome Standards below when ready.",
          }
        : {
            title: "Entry kept for this session",
            description:
              "This browser could not save local storage. Try again after checking browser storage settings.",
          },
    );
  };

  const saveEdit = () => {
    if (!editingId || !editAction.trim()) return;
    if (!isValidResourceUrl(editLogbookDetails.resourceUrl)) {
      toast({
        title: "Enter a valid resource URL",
        description: "Use a full http:// or https:// webinar or online resource link.",
        variant: "destructive",
      });
      return;
    }
    if (!hasValidClassSize(editLogbookDetails.classSize)) {
      toast({
        title: "Enter a whole-number class size",
        description: "Class size must be zero or a positive number of learners.",
        variant: "destructive",
      });
      return;
    }
    const wasPersisted = updateEntries((current) =>
      current.map((entry) =>
        entry.id === editingId
          ? (() => {
              const updatedEntry = {
              ...entry,
              activity: editActivity,
                action: editAction.trim(),
              body: editBody.trim(),
              duration: editLogbookDetails.duration.trim(),
              trainerUnderSupervision: editLogbookDetails.trainerUnderSupervision,
              supervisorName: editLogbookDetails.supervisorName.trim(),
              uoc: editLogbookDetails.uoc.trim(),
              resourceUrl: editLogbookDetails.resourceUrl.trim(),
              elearnShortname: editLogbookDetails.elearnShortname.trim(),
              classSize: classSizeForEntry(editLogbookDetails.classSize),
              date: editLogbookDetails.date,
              trainersPresent: editLogbookDetails.trainersPresent.trim(),
              ...editTags,
              };
              return {
                ...updatedEntry,
                mappedQualityAreaCodes: detectQualityAreas(updatedEntry),
              };
            })()
          : entry,
      ),
    );
    setEditingId(null);
    toast(
      wasPersisted
        ? { title: "Practice entry updated" }
        : {
            title: "Change kept for this session",
            description: "This browser could not save local storage.",
          },
    );
  };

  const beginEdit = (entry: PracticeEntry) => {
    setEditingId(entry.id);
    setEditActivity(entry.activity);
    setEditAction(entry.action);
    setEditBody(entry.body);
    setEditLogbookDetails(logbookDetailsFromEntry(entry));
    setEditTags({
      keywords: entry.keywords,
      principles: entry.principles,
      evidenceRules: entry.evidenceRules,
      customTags: entry.customTags,
    });
  };

  const standardTitles = new Map(
    standards.map((standard) => [standard.code, standard.title]),
  );

  const exportPresentationForEntry = (
    entry: PracticeEntry,
  ): PracticeEntryPresentation => ({
    activityLabel: activityLabel(entry.activity),
    tagLabels: displayTagOptions(entry).map((tag) => {
      if (tag.group === "principles") return `Principle: ${tag.label}`;
      if (tag.group === "evidenceRules") return `Evidence: ${tag.label}`;
      return tag.label;
    }),
    mappedStandardLabels: entry.mappedStandardCodes.map((code) => {
      const title = standardTitles.get(code);
      return title ? `${code} — ${title}` : code;
    }),
  });

  const buildTsmDraft = (entry: PracticeEntry) => {
    const tags = displayTagOptions(entry).map((tag) => tag.label);
    const mappings = entry.mappedStandardCodes.map((code) => {
      const title = standardTitles.get(code);
      return title ? `${code} — ${title}` : code;
    });
    return [
      `Activity: ${activityLabel(entry.activity)}`,
      `Record created: ${formatDate(entry.createdAt)}`,
      ...logbookDetailLines(entry),
      "",
      "Action",
      entry.action || "Not recorded",
      "",
      "Reflection",
      entry.body || "Not recorded",
      "",
      `Tags: ${tags.length ? tags.join(", ") : "None selected"}`,
      `Mapped Outcome Standards: ${mappings.length ? mappings.join("; ") : "Not mapped"}`,
      "",
      "TSM notes / evidence",
      "Add the evidence reference, action, outcome or follow-up needed in your own Training and Skills Matrix.",
    ].join("\n");
  };

  const openTsmDraft = (entry: PracticeEntry) => {
    setTsmEntryId(entry.id);
    setTsmDraftTitle(
      entry.tsmDraft?.title ??
        `${activityLabel(entry.activity)} practice — ${formatDate(entry.createdAt)}`,
    );
    setTsmDraftBody(entry.tsmDraft?.body ?? buildTsmDraft(entry));
  };

  const saveTsmDraft = () => {
    if (!tsmEntryId || !tsmDraftTitle.trim() || !tsmDraftBody.trim()) return;
    const wasPersisted = updateEntries((current) =>
      current.map((entry) =>
        entry.id === tsmEntryId
          ? {
              ...entry,
              tsmDraft: {
                title: tsmDraftTitle.trim(),
                body: tsmDraftBody.trim(),
              },
            }
          : entry,
      ),
    );
    toast(
      wasPersisted
        ? { title: "TSM draft saved to this browser" }
        : {
            title: "TSM draft kept for this session",
            description: "This browser could not save local storage.",
          },
    );
  };

  const hasFilters = activityFilter !== "all" || keywordFilter !== "all";
  const snapshotEntries = entries.filter((entry) =>
    snapshotEntryIds.includes(entry.id),
  );
  const taggedEntries = entries.filter(
    (entry) =>
      displayTagOptions(entry).length > 0 ||
      entry.mappedQualityAreaCodes.length > 0 ||
      entry.mappedStandardCodes.length > 0 ||
      entry.legacyQualityAreas.length > 0,
  );
  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    snapshotEmail.trim(),
  );
  const hasCurrentTsmDraft = Boolean(
    tsmEntryId && tsmDraftTitle.trim() && tsmDraftBody.trim(),
  );
  const mergeSummary = restoreCandidate
    ? getMergeSummary(entries, restoreCandidate.entries)
    : null;

  const shareSnapshotByEmail = () => {
    if (!emailIsValid) return;
    const selectedTsmDraft = entries.find((entry) => entry.id === tsmEntryId);
    const hasTsmDraft =
      selectedTsmDraft &&
      tsmDraftTitle.trim() &&
      tsmDraftBody.trim();
    if (!hasTsmDraft && snapshotEntries.length === 0) return;

    const snapshot = hasTsmDraft
      ? [`${tsmDraftTitle.trim()}`, "", tsmDraftBody.trim()].join("\n")
      : snapshotEntries
      .map((entry) =>
        formatPracticeEntryForSharing(entry, exportPresentationForEntry(entry)),
      )
      .join("\n\n---\n\n");
    window.location.href = `mailto:${encodeURIComponent(snapshotEmail.trim())}?subject=${encodeURIComponent(
          hasTsmDraft ? `TSM draft — ${tsmDraftTitle.trim()}` : "My educator practice snapshot",
    )}&body=${encodeURIComponent(snapshot)}`;
    toast({
      title: hasTsmDraft
        ? "Opening your email app with the TSM draft"
        : "Opening your email app with the selected snapshot",
    });
  };

  const emailEntry = (entry: PracticeEntry) => {
    if (!emailIsValid) {
      toast({
        title: "Add a nominated email address first",
        description: "Set it in the Record outputs section before emailing an entry.",
        variant: "destructive",
      });
      return;
    }

    const presentation = exportPresentationForEntry(entry);
    window.location.href = `mailto:${encodeURIComponent(snapshotEmail.trim())}?subject=${encodeURIComponent(
      `Educator logbook entry — ${presentation.activityLabel}`,
    )}&body=${encodeURIComponent(
      formatPracticeEntryForSharing(entry, presentation),
    )}`;
    toast({ title: "Opening your email app with this entry" });
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6 pb-16 animate-in fade-in duration-500">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
          {isRecordView ? "View your log" : "Educator Logbook"}
        </p>
        <h1 className="mt-1 flex items-center gap-2 text-2xl font-bold text-foreground">
          {isRecordView ? "Educator Professional Log" : "Create an Entry"}
          {isRecordView && (
            <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-semibold text-primary">
              {entries.length} Entries to Date
            </span>
          )}
          {isRecordView ? (
            <FileText className="h-5 w-5 text-primary" />
          ) : (
            <NotebookPen className="h-5 w-5 text-primary" />
          )}
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {isRecordView
            ? "Review saved actions and reflections, connect them to Outcome Standards and prepare a TSM-ready draft when you need one."
            : "Choose the activity, add useful logbook details, then record what happened."}
        </p>
      </header>

      {storageWarning && (
        <div
          role="status"
          className="rounded-xl border border-amber-500/25 bg-amber-500/10 px-4 py-3 text-xs leading-relaxed text-amber-200"
        >
          This browser could not access local storage. Your entries can be
          viewed for this session, but may not survive a refresh. Check your
          browser privacy or storage settings before continuing.
        </div>
      )}

      {isRecordView && (
        <section className="rounded-2xl border border-border bg-card p-4 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  Record outputs &amp; backup
                </p>
                <p className="mt-1 max-w-xl text-xs leading-relaxed text-muted-foreground">
                  Download a readable PDF logbook, restore a JSON backup, or
                  send individual entries through your email app.
                  Your entries never leave this browser unless you choose to
                  download or email them.
                </p>
              </div>
            </div>
            <div className="flex shrink-0 flex-wrap gap-2">
              <button
                type="button"
                onClick={handlePdfExport}
                disabled={entries.length === 0}
                data-testid="button-export-logbook-pdf"
                title={
                  entries.length === 0
                    ? "Add an entry before downloading a PDF logbook."
                    : undefined
                }
                className="inline-flex min-h-9 items-center justify-center gap-2 rounded-xl bg-primary px-3 py-2 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <FileText className="h-3.5 w-3.5" />
                Download PDF logbook
              </button>
              <button
                type="button"
                onClick={() => restoreInputRef.current?.click()}
                data-testid="button-restore-diary"
                className="inline-flex min-h-9 items-center justify-center gap-2 rounded-xl border border-border px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-muted/60"
              >
                <Upload className="h-3.5 w-3.5" />
                Restore record
              </button>
              <input
                ref={restoreInputRef}
                id="diary-restore-file"
                type="file"
                accept=".json,application/json"
                onChange={handleRestoreFile}
                data-testid="input-restore-diary"
                className="sr-only"
              />
            </div>
          </div>
          <div className="mt-4 border-t border-border/60 pt-4 sm:flex sm:items-start sm:justify-between sm:gap-5">
            <div>
              <label
                htmlFor="snapshot-email"
                className="text-xs font-medium text-foreground"
              >
                Nominated email address
              </label>
              <p className="mt-1 max-w-xl text-[11px] leading-relaxed text-muted-foreground">
                Saved only in this browser. It is used when you email an
                individual entry or a selected snapshot.
              </p>
            </div>
            <div className="mt-2 w-full sm:mt-0 sm:max-w-sm">
              <input
                id="snapshot-email"
                type="email"
                value={snapshotEmail}
                onChange={(event) => setSnapshotEmail(event.target.value)}
                placeholder="name@example.com"
                aria-invalid={Boolean(snapshotEmail) && !emailIsValid}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-primary/30 aria-[invalid=true]:border-destructive"
              />
              {!emailIsValid && (
                <p className="mt-1 text-[11px] text-muted-foreground">
                  Enter a valid address before emailing a record.
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      {isRecordView && <PracticeOverview entries={entries} standards={standards} />}

      {!isRecordView && (
      <section className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-primary" />
            <h2 className="text-base font-semibold text-foreground">
              Create an Entry
            </h2>
          </div>
          <Link
            href="/record"
            className="inline-flex items-center justify-center gap-1.5 self-start rounded-lg border border-border px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-muted/60 sm:self-auto"
          >
            <FileText className="h-3.5 w-3.5" />
            View Educator Log
          </Link>
        </div>
          <div className="space-y-5">
          <ActivityPicker selected={activity} onSelect={setActivity} />
          <LogbookFields
            details={logbookDetails}
            onChange={setLogbookDetails}
          />
          <div className="space-y-2.5">
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                2
              </span>
                <label htmlFor="practice-action" className="text-sm font-semibold text-foreground">
                  Action
                </label>
              </div>
              <p className="text-xs text-muted-foreground">
                Describe the activity, What did you do?
              </p>
              <Textarea
                id="practice-action"
                value={action}
                onChange={(event) => setAction(event.target.value)}
                placeholder="Describe the activity, What did you do?"
                className="min-h-[110px] resize-y bg-background text-sm leading-relaxed"
                rows={4}
              />
            </div>
            <div className="space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  3
                </span>
                <label htmlFor="practice-entry" className="text-sm font-semibold text-foreground">
                Reflection <span className="font-normal text-muted-foreground">(optional)</span>
              </label>
            </div>
            <Textarea
              id="practice-entry"
              value={body}
              onChange={(event) => setBody(event.target.value)}
              placeholder="What did you prepare, deliver, observe, review or learn? (Optional)"
              className="min-h-[150px] resize-y bg-background text-sm leading-relaxed"
              rows={6}
            />
          </div>
          <details className="group rounded-xl border border-border/70 bg-muted/20">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-3 py-3 text-sm font-medium text-foreground">
              <span className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                    4
                </span>
                Add helpful tags
              </span>
              <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" />
            </summary>
            <div className="border-t border-border/70 p-3">
              <p className="mb-4 text-xs leading-relaxed text-muted-foreground">
                Use a small number of keywords for your own retrieval. Quality
                areas are suggested automatically after the entry is saved.
              </p>
              <TagFields tags={tags} onChange={setTags} />
            </div>
          </details>
          <div className="flex flex-col-reverse gap-3 border-t border-border/60 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted-foreground">
              Your entries stay in this browser and are never sent to the API.
            </p>
            <button
              type="button"
              onClick={saveEntry}
              disabled={!activity || !action.trim()}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <NotebookPen className="h-3.5 w-3.5" />
              Save to Educator Log
            </button>
          </div>
        </div>
      </section>
      )}

      {isRecordView && (
        <>
      <section aria-labelledby="record-heading">
        <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              Educator Log
            </p>
            <h2 id="record-heading" className="mt-1 text-lg font-semibold text-foreground">
              VET Educator Professional Log
            </h2>
          </div>
          {entries.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <label className="sr-only" htmlFor="activity-filter">
                Filter by activity
              </label>
              <select
                id="activity-filter"
                value={activityFilter}
                onChange={(event) =>
                  setActivityFilter(event.target.value as "all" | ActivityId)
                }
                className="rounded-lg border border-border bg-card px-2.5 py-1.5 text-xs text-foreground outline-none focus:ring-2 focus:ring-primary/30"
              >
                <option value="all">All activities</option>
                {ACTIVITIES.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
              <label className="sr-only" htmlFor="keyword-filter">
                Filter by keyword
              </label>
              <select
                id="keyword-filter"
                value={keywordFilter}
                onChange={(event) => setKeywordFilter(event.target.value)}
                className="rounded-lg border border-border bg-card px-2.5 py-1.5 text-xs text-foreground outline-none focus:ring-2 focus:ring-primary/30"
              >
                <option value="all">All keywords</option>
                {KEYWORDS.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
              {hasFilters && (
                <button
                  type="button"
                  onClick={() => {
                    setActivityFilter("all");
                    setKeywordFilter("all");
                  }}
                  className="inline-flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3.5 w-3.5" />
                  Clear
                </button>
              )}
            </div>
          )}
        </div>

        {entries.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card py-14 text-center">
            <Tag className="mx-auto mb-3 h-5 w-5 text-muted-foreground/45" />
            <p className="text-sm font-medium text-foreground">No practice entries yet</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Start in Practice to record your first activity.
            </p>
            <Link
              href="/practice"
              className="mt-3 inline-flex text-xs font-medium text-primary hover:text-primary/80"
            >
              Go to Practice
            </Link>
          </div>
        ) : filteredEntries.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card py-12 text-center">
            <Filter className="mx-auto mb-3 h-5 w-5 text-muted-foreground/45" />
            <p className="text-sm text-muted-foreground">
              No entries match these filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setActivityFilter("all");
                setKeywordFilter("all");
              }}
              className="mt-2 text-xs font-medium text-primary hover:text-primary/80"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredEntries.map((entry) => {
              const isEditing = editingId === entry.id;
              const tagLabels = displayTagOptions(entry);
              const tone = activityTone(entry.activity);
              return (
                <article
                  key={entry.id}
                  className={`rounded-2xl border bg-card p-4 shadow-sm ${tone.border}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${tone.badge}`}>
                        {activityLabel(entry.activity)}
                      </span>
                      <p className="mt-1.5 text-[11px] text-muted-foreground">
                        {formatDate(entry.createdAt)}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-1">
                      {!isEditing && (
                        <button
                          type="button"
                          onClick={() => beginEdit(entry)}
                          className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-primary"
                          aria-label="Edit practice entry"
                        >
                          <PenLine className="h-3.5 w-3.5" />
                        </button>
                      )}
                      {!isEditing && (
                        <button
                          type="button"
                          onClick={() => emailEntry(entry)}
                          disabled={!emailIsValid}
                          className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
                          aria-label="Email this practice entry"
                          title={
                            emailIsValid
                              ? "Email this entry"
                              : "Add a nominated email address above to email this entry"
                          }
                        >
                          <Mail className="h-3.5 w-3.5" />
                        </button>
                      )}
                      {!isEditing && (
                        <button
                          type="button"
                          onClick={() => openTsmDraft(entry)}
                          className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-primary"
                          aria-label="Draft a TSM entry from this educator log entry"
                          title="Draft a TSM entry"
                        >
                          <FileText className="h-3.5 w-3.5" />
                        </button>
                      )}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button
                            type="button"
                            className="rounded-md p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                            aria-label="Delete practice entry"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete this practice entry?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This removes it from this browser&apos;s local record.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() =>
                                updateEntries((current) =>
                                  current.filter((currentEntry) => currentEntry.id !== entry.id),
                                )
                              }
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>

                  {isEditing ? (
                    <div className="mt-4 space-y-4">
                      <ActivityPicker
                        selected={editActivity}
                        onSelect={setEditActivity}
                      />
                      <LogbookFields
                        details={editLogbookDetails}
                        onChange={setEditLogbookDetails}
                      />
                      <div className="space-y-1.5">
                        <label
                          htmlFor={`edit-action-${entry.id}`}
                          className="text-xs font-medium text-foreground"
                        >
                          Action
                        </label>
                        <Textarea
                          id={`edit-action-${entry.id}`}
                          value={editAction}
                          onChange={(event) => setEditAction(event.target.value)}
                          className="min-h-[110px] resize-y text-sm"
                          rows={4}
                          autoFocus
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label
                          htmlFor={`edit-reflection-${entry.id}`}
                          className="text-xs font-medium text-foreground"
                        >
                          Reflection <span className="font-normal text-muted-foreground">(optional)</span>
                        </label>
                        <Textarea
                          id={`edit-reflection-${entry.id}`}
                          value={editBody}
                          onChange={(event) => setEditBody(event.target.value)}
                          className="min-h-[110px] resize-y text-sm"
                          rows={4}
                        />
                      </div>
                      <details className="rounded-xl border border-border/70 bg-muted/20 p-3">
                        <summary className="cursor-pointer text-xs font-medium text-foreground">
                          Edit helpful tags
                        </summary>
                        <div className="mt-4">
                          <TagFields tags={editTags} onChange={setEditTags} />
                        </div>
                      </details>
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setEditingId(null)}
                          className="rounded-lg px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={saveEdit}
                          disabled={!editAction.trim()}
                          className="rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-40"
                        >
                          Save changes
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {entry.action ? (
                        <div className="mt-4">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                            Action
                          </p>
                          <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">
                            {entry.action}
                          </p>
                        </div>
                      ) : null}
                      {entry.body ? (
                        <div className="mt-4">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                            Reflection
                          </p>
                          <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">
                            {entry.body}
                          </p>
                        </div>
                      ) : null}
                      {!entry.action && !entry.body && (
                        <p className="mt-4 text-sm text-muted-foreground">
                          No action or reflection text was recorded.
                        </p>
                      )}
                      <LogbookDetailsSummary entry={entry} />
                      {tagLabels.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {tagLabels.map((tag) => (
                            <button
                              key={`${tag.group}-${tag.id}`}
                              type="button"
                              onClick={() => {
                                if (tag.group === "keywords") {
                                  setKeywordFilter(tag.id);
                                }
                              }}
                              className={`rounded-full px-2 py-1 text-[10px] font-medium ${
                                tag.group === "keywords"
                                  ? "bg-muted text-muted-foreground hover:text-primary"
                                  : "bg-secondary text-secondary-foreground"
                              }`}
                              title={
                                tag.group === "keywords"
                                  ? "Filter by this keyword"
                                  : undefined
                              }
                            >
                              {tag.group === "principles" ? "Principle: " : ""}
                              {tag.group === "evidenceRules" ? "Evidence: " : ""}
                              {tag.label}
                            </button>
                          ))}
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => openTsmDraft(entry)}
                        className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80"
                      >
                        <FileText className="h-3.5 w-3.5" />
                        {entry.tsmDraft ? "Open TSM draft" : "Draft a TSM entry"}
                      </button>
                    </>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </section>

      {tsmEntryId && (
        <section
          aria-labelledby="tsm-draft-heading"
          className="rounded-2xl border border-primary/20 bg-primary/[0.035] p-4 shadow-sm sm:p-5"
        >
          <div className="flex flex-col gap-2 border-b border-primary/15 pb-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                TSM draft
              </p>
              <h2 id="tsm-draft-heading" className="mt-1 text-lg font-semibold text-foreground">
                Prepare an entry for your Training and Skills Matrix
              </h2>
              <p className="mt-1 max-w-2xl text-xs leading-relaxed text-muted-foreground">
                This is your editable, browser-local draft. Adapt it to the format
                your organisation uses before saving or emailing it to yourself.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setTsmEntryId(null)}
              className="self-start rounded-lg px-2 py-1 text-xs text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              Close draft
            </button>
          </div>
          <div className="mt-4 space-y-3">
            <div className="space-y-1.5">
              <label htmlFor="tsm-draft-title" className="text-xs font-medium text-foreground">
                Entry title
              </label>
              <input
                id="tsm-draft-title"
                value={tsmDraftTitle}
                onChange={(event) => setTsmDraftTitle(event.target.value)}
                placeholder="TSM entry title"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="tsm-draft-body" className="text-xs font-medium text-foreground">
                TSM entry details
              </label>
              <Textarea
                id="tsm-draft-body"
                value={tsmDraftBody}
                onChange={(event) => setTsmDraftBody(event.target.value)}
                className="min-h-[260px] resize-y bg-background text-sm leading-relaxed"
                rows={12}
              />
            </div>
            <div className="flex flex-col gap-3 border-t border-primary/15 pt-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-muted-foreground">
                Saving keeps this draft in this browser and in your Practice backup.
              </p>
              <button
                type="button"
                onClick={saveTsmDraft}
                disabled={!tsmDraftTitle.trim() || !tsmDraftBody.trim()}
                className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Save TSM draft
              </button>
            </div>
          </div>
        </section>
      )}

      <section
        aria-labelledby="mapping-heading"
        className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5"
      >
        <div className="flex flex-col gap-3 border-b border-border/60 pb-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              Map
            </p>
            <h2 id="mapping-heading" className="mt-1 text-lg font-semibold text-foreground">
              Quality area mapping
            </h2>
            <p className="mt-1 max-w-2xl text-xs leading-relaxed text-muted-foreground">
              The words in each activity, action, reflection and tag are compared
              with the four official quality areas. Matching areas colour the
              related Standards chips above. This is not a compliance decision.
            </p>
          </div>
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:min-w-[220px]">
            <button
              type="button"
              onClick={shareSnapshotByEmail}
              disabled={
                !emailIsValid ||
                (!hasCurrentTsmDraft && snapshotEntries.length === 0)
              }
              className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Mail className="h-3.5 w-3.5" />
              {hasCurrentTsmDraft
                ? "Email TSM draft"
                : "Email selected snapshot"}
              {!hasCurrentTsmDraft && snapshotEntries.length > 0
                ? ` (${snapshotEntries.length})`
                : ""}
            </button>
            <p className="text-[11px] leading-relaxed text-muted-foreground">
              Uses the nominated email address above.
            </p>
            {!emailIsValid && (
              <p className="text-[11px] text-muted-foreground">
                Add a valid nominated email address to share the snapshot.
              </p>
            )}
          </div>
        </div>

        {taggedEntries.length === 0 ? (
          <div className="py-10 text-center">
            <MapPinned className="mx-auto mb-3 h-5 w-5 text-muted-foreground/45" />
            <p className="text-sm font-medium text-foreground">
              No mappable practice entries yet
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Add an activity with relevant words or tags to see its suggested
              quality area mapping here. Older entries with saved mappings are
              included too.
            </p>
          </div>
        ) : (
          <div className="mt-4 space-y-2">
            <p className="text-xs text-muted-foreground">
              Tick any entries you want to include in an email snapshot for your
              existing TSM system.
            </p>
            {taggedEntries.map((entry) => {
              const entryTags = displayTagOptions(entry);
              const open = mappingEntryId === entry.id;
              const selectedForSnapshot = snapshotEntryIds.includes(entry.id);
              const tone = activityTone(entry.activity);
              return (
                <div
                  key={entry.id}
                  className={`rounded-xl border bg-background/40 ${tone.border}`}
                >
                  <div className="flex items-start gap-3 p-3">
                    <input
                      id={`snapshot-${entry.id}`}
                      type="checkbox"
                      checked={selectedForSnapshot}
                      onChange={() =>
                        setSnapshotEntryIds((current) =>
                          current.includes(entry.id)
                            ? current.filter((id) => id !== entry.id)
                            : [...current, entry.id],
                        )
                      }
                      className="mt-1 h-4 w-4 rounded border-border accent-primary"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setMappingEntryId((current) =>
                          current === entry.id ? null : entry.id,
                        )
                      }
                      className="min-w-0 flex-1 text-left"
                      aria-expanded={open}
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${tone.badge}`}>
                          {activityLabel(entry.activity)}
                        </span>
                        <span className="text-[11px] text-muted-foreground">
                          {formatDate(entry.createdAt)}
                        </span>
                        {entry.mappedQualityAreaCodes.length > 0 && (
                          <span className="text-[10px] font-medium text-primary">
                            {entry.mappedQualityAreaCodes.length} quality{" "}
                            {entry.mappedQualityAreaCodes.length === 1 ? "area" : "areas"}
                          </span>
                        )}
                      </div>
                      {entry.action && (
                        <p className="mt-1.5 line-clamp-2 text-sm text-foreground/85">
                          <span className="mr-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                            Action
                          </span>
                          {entry.action}
                        </p>
                      )}
                      {entry.body && (
                        <p className="mt-1 line-clamp-2 text-sm text-foreground/85">
                          <span className="mr-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                            Reflection
                          </span>
                          {entry.body}
                        </p>
                      )}
                      <div className="mt-2 flex flex-wrap gap-1">
                        {entryTags.slice(0, 5).map((tag) => (
                          <span
                            key={`${tag.group}-${tag.id}`}
                            className="rounded-full bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground"
                          >
                            {tag.label}
                          </span>
                        ))}
                        {entryTags.length > 5 && (
                          <span className="text-[10px] text-muted-foreground">
                            +{entryTags.length - 5}
                          </span>
                        )}
                        {entry.legacyQualityAreas.map((area) => (
                          <span
                            key={`legacy-${area}`}
                            className="rounded-full border border-amber-500/25 bg-amber-500/10 px-1.5 py-0.5 text-[10px] text-amber-200"
                            title="Imported from an earlier Quality Area tag"
                          >
                            Imported {area}
                          </span>
                        ))}
                      </div>
                    </button>
                    <label
                      htmlFor={`snapshot-${entry.id}`}
                      className="sr-only"
                    >
                      Include this entry in email snapshot
                    </label>
                  </div>
                  {open && (
                    <div className="border-t border-border/60 px-3 pb-3 pt-2">
                      <QualityAreaMappingInline
                        entry={entry}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>
        </>
      )}

      {isRecordView && <AlertDialog
        open={restoreCandidate !== null}
        onOpenChange={(open) => {
          if (!open) setRestoreCandidate(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Apply this Practice backup?</AlertDialogTitle>
            <AlertDialogDescription>
              Choose whether to merge the backup into this browser&apos;s record
              or replace the record entirely. The backup contains{" "}
              {restoreCandidate?.entries.length ?? 0}{" "}
              {restoreCandidate?.entries.length === 1 ? "entry" : "entries"} from{" "}
              <span className="font-medium text-foreground">
                {restoreCandidate?.fileName}
              </span>
              .
            </AlertDialogDescription>
          </AlertDialogHeader>
          {restoreCandidate && (
            <div className="space-y-3 rounded-xl border border-border bg-muted/20 p-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                  Merge preview
                </p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  Your current reflections stay unchanged. Matching IDs are
                  skipped, so importing a backup never duplicates or overwrites
                  an existing reflection.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                {(
                  [
                    ["Added", mergeSummary?.added ?? 0],
                    ["Skipped", mergeSummary?.skipped ?? 0],
                    ["Replaced", mergeSummary?.replaced ?? 0],
                  ] as const
                ).map(([label, count]) => (
                  <div
                    key={label}
                    className="rounded-lg border border-border bg-background px-2 py-2"
                  >
                    <p className="text-base font-semibold text-foreground">{count}</p>
                    <p className="text-[10px] text-muted-foreground">{label}</p>
                  </div>
                ))}
              </div>
              <p className="text-[11px] leading-relaxed text-muted-foreground">
                Replace instead would discard all {entries.length} current{" "}
                {entries.length === 1 ? "entry" : "entries"} and keep only the
                backup.
              </p>
            </div>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleRestoreConfirm("replace")}
              className="border border-border bg-background text-foreground hover:bg-muted"
            >
              Replace record
            </AlertDialogAction>
            <AlertDialogAction onClick={() => handleRestoreConfirm("merge")}>
              Merge into record
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>}
    </div>
  );
}