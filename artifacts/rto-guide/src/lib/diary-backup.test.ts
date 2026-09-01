import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  DIARY_BACKUP_VERSION,
  readDiaryBackup,
} from "./diary-backup.ts";
import { detectQualityAreas } from "./quality-area-mapping.ts";

const fixtureDirectory = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "diary-backup-fixtures",
);

async function readFixture(name: string) {
  return JSON.parse(
    await readFile(resolve(fixtureDirectory, name), "utf8"),
  ) as unknown;
}

test("accepts a current versioned backup", async () => {
  const result = readDiaryBackup(await readFixture("valid-v2.json"));

  assert.equal(result.status, "valid");
  if (result.status !== "valid") return;
  assert.equal(result.sourceVersion, DIARY_BACKUP_VERSION);
  assert.equal(result.migrated, false);
  assert.equal(result.entries[0]?.activity, "assessment");
  assert.equal(result.entries[0]?.duration, "");
  assert.equal(result.entries[0]?.classSize, null);
  assert.equal(result.entries[0]?.trainerUnderSupervision, false);
  assert.equal(result.entries[0]?.supervisorName, "");
});

test("keeps Trainer Logbook fields and new activity areas in current backups", () => {
  const result = readDiaryBackup({
    format: "rto-practice-diary",
    version: DIARY_BACKUP_VERSION,
    exportedAt: "2026-08-22T00:00:00.000Z",
    entries: [
      {
        id: "learning-design-entry",
        action: "Reviewed the blended delivery resources.",
        body: "Reviewed new blended delivery resources.",
        createdAt: "2026-08-22T00:00:00.000Z",
        activity: "learning-design",
        duration: "90 minutes",
        trainerUnderSupervision: true,
        supervisorName: "Casey Supervisor",
        uoc: "TAEDEL411",
        resourceUrl: "https://example.com/webinar",
        elearnShortname: "TAEDEL411-2026",
        classSize: 14,
        date: "2026-08-22",
        trainersPresent: "A. Trainer, B. Trainer",
        keywords: ["training-design"],
        principles: [],
        evidenceRules: [],
        customTags: [],
        mappedStandardCodes: [],
        legacyQualityAreas: [],
        tagSchemaVersion: 3,
      },
    ],
  });

  assert.equal(result.status, "valid");
  if (result.status !== "valid") return;
  assert.equal(result.entries[0]?.activity, "learning-design");
  assert.equal(result.entries[0]?.action, "Reviewed the blended delivery resources.");
  assert.equal(result.entries[0]?.duration, "90 minutes");
  assert.equal(result.entries[0]?.trainerUnderSupervision, true);
  assert.equal(result.entries[0]?.supervisorName, "Casey Supervisor");
  assert.equal(result.entries[0]?.uoc, "TAEDEL411");
  assert.equal(result.entries[0]?.resourceUrl, "https://example.com/webinar");
  assert.equal(result.entries[0]?.elearnShortname, "TAEDEL411-2026");
  assert.equal(result.entries[0]?.classSize, 14);
  assert.equal(result.entries[0]?.date, "2026-08-22");
  assert.equal(result.entries[0]?.trainersPresent, "A. Trainer, B. Trainer");
});

test("keeps Industry Training and Return to Industry activities in current backups", () => {
  const result = readDiaryBackup({
    format: "rto-practice-diary",
    version: DIARY_BACKUP_VERSION,
    exportedAt: "2026-08-23T00:00:00.000Z",
    entries: [
      {
        id: "industry-training-entry",
        action: "Completed industry training.",
        body: "",
        createdAt: "2026-08-23T00:00:00.000Z",
        activity: "industry-training",
        duration: "2.5",
        trainerUnderSupervision: false,
        keywords: [],
        principles: [],
        evidenceRules: [],
        customTags: [],
        mappedStandardCodes: [],
        legacyQualityAreas: [],
        tagSchemaVersion: 3,
      },
      {
        id: "return-to-industry-entry",
        action: "Worked alongside industry staff.",
        body: "",
        createdAt: "2026-08-23T01:00:00.000Z",
        activity: "return-to-industry",
        duration: "4",
        trainerUnderSupervision: false,
        keywords: [],
        principles: [],
        evidenceRules: [],
        customTags: [],
        mappedStandardCodes: [],
        legacyQualityAreas: [],
        tagSchemaVersion: 3,
      },
    ],
  });

  assert.equal(result.status, "valid");
  if (result.status !== "valid") return;
  assert.deepEqual(
    result.entries.map((entry) => entry.activity),
    ["industry-training", "return-to-industry"],
  );
});

test("maps training and assessment activity to QA1", () => {
  assert.deepEqual(
    detectQualityAreas({
      action: "Validated assessment tools and reviewed assessment judgements.",
      activity: "validation",
      body: "",
      customTags: [],
      evidenceRules: ["valid"],
      keywords: ["assessment-judgement"],
      principles: ["reliable"],
      uoc: "TAEASS412",
    }),
    ["QA1"],
  );
});

test("maps learner support, workforce and governance language by quality area", () => {
  assert.deepEqual(
    detectQualityAreas({
      action:
        "Reviewed reasonable adjustment, professional development and risk management.",
      activity: "other",
      body: "",
      customTags: ["learner support", "workforce capability"],
      evidenceRules: [],
      keywords: [
        "reasonable-adjustment",
        "workforce-capability",
        "continuous-improvement",
      ],
      principles: [],
      uoc: "",
    }),
    ["QA2", "QA3", "QA4"],
  );
});

test("does not suggest a quality area without a meaningful match", () => {
  assert.deepEqual(
    detectQualityAreas({
      action: "Attended a meeting.",
      activity: "other",
      body: "",
      customTags: [],
      evidenceRules: [],
      keywords: [],
      principles: [],
      uoc: "",
    }),
    [],
  );
});

test("accepts an activity-only record when the reflection is optional", () => {
  const result = readDiaryBackup({
    format: "rto-practice-diary",
    version: DIARY_BACKUP_VERSION,
    exportedAt: "2026-08-22T00:00:00.000Z",
    entries: [
      {
        id: "activity-only-entry",
        body: "",
        createdAt: "2026-08-22T00:00:00.000Z",
        activity: "delivery",
        keywords: ["resources-access"],
        principles: [],
        evidenceRules: [],
        customTags: [],
        mappedStandardCodes: [],
        legacyQualityAreas: [],
        tagSchemaVersion: 3,
      },
    ],
  });

  assert.equal(result.status, "valid");
  if (result.status !== "valid") return;
  assert.equal(result.entries[0]?.body, "");
  assert.equal(result.entries[0]?.action, "");
  assert.equal(result.entries[0]?.activity, "delivery");
});

test("removes unsafe resource URL schemes during backup restore", () => {
  const result = readDiaryBackup({
    format: "rto-practice-diary",
    version: DIARY_BACKUP_VERSION,
    exportedAt: "2026-08-22T00:00:00.000Z",
    entries: [
      {
        id: "unsafe-resource-entry",
        body: "Reviewed an online resource.",
        createdAt: "2026-08-22T00:00:00.000Z",
        activity: "delivery",
        resourceUrl: "javascript:alert('unsafe')",
        keywords: [],
        principles: [],
        evidenceRules: [],
        customTags: [],
        mappedStandardCodes: [],
        legacyQualityAreas: [],
        tagSchemaVersion: 3,
      },
    ],
  });

  assert.equal(result.status, "valid");
  if (result.status !== "valid") return;
  assert.equal(result.entries[0]?.resourceUrl, "");
});

test("migrates the legacy version one tag shape before restore", async () => {
  const result = readDiaryBackup(await readFixture("legacy-v1.json"));

  assert.equal(result.status, "valid");
  if (result.status !== "valid") return;
  assert.equal(result.sourceVersion, 1);
  assert.equal(result.migrated, true);
  assert.deepEqual(result.entries[0]?.keywords, ["training-design"]);
  assert.deepEqual(result.entries[0]?.mappedStandardCodes, ["1.2"]);
  assert.equal(result.entries[0]?.activity, "other");
  assert.equal(result.entries[0]?.tagSchemaVersion, 3);
});

test("rejects malformed backups without returning entries", async () => {
  const result = readDiaryBackup(await readFixture("malformed.json"));

  assert.deepEqual(result, { status: "invalid", reason: "entries" });
});

test("identifies future backups without attempting to restore them", async () => {
  const result = readDiaryBackup(await readFixture("future-v3.json"));

  assert.deepEqual(result, { status: "future", version: 3 });
});