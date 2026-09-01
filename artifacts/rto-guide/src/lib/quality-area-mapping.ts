import type { ActivityId, PracticeEntry } from "./diary-backup";

export type QualityAreaCode = "QA1" | "QA2" | "QA3" | "QA4";

export const QUALITY_AREAS: Array<{
  code: QualityAreaCode;
  title: string;
}> = [
  { code: "QA1", title: "Training and Assessment" },
  { code: "QA2", title: "VET Student Support" },
  { code: "QA3", title: "VET Workforce" },
  { code: "QA4", title: "Governance" },
];

const ACTIVITY_QUALITY_AREAS: Partial<Record<ActivityId, QualityAreaCode[]>> = {
  preparation: ["QA1"],
  delivery: ["QA1"],
  assessment: ["QA1"],
  moderation: ["QA1"],
  validation: ["QA1"],
  "industry-engagement": ["QA1"],
  "industry-training": ["QA3"],
  "return-to-industry": ["QA3"],
  "professional-development": ["QA3"],
  "learning-design": ["QA1"],
  "instructional-design": ["QA1"],
};

const TAG_QUALITY_AREAS: Record<string, QualityAreaCode[]> = {
  "learner-support": ["QA2"],
  "reasonable-adjustment": ["QA2"],
  "training-design": ["QA1"],
  "assessment-judgement": ["QA1"],
  "industry-currency": ["QA1", "QA3"],
  "resources-access": ["QA1", "QA2"],
  integrity: ["QA4"],
  validation: ["QA1"],
  "continuous-improvement": ["QA4"],
  "rpl-credit-transfer": ["QA1", "QA2"],
  "workforce-capability": ["QA3"],
  fair: ["QA1"],
  flexible: ["QA1"],
  valid: ["QA1"],
  reliable: ["QA1"],
  sufficient: ["QA1"],
  authentic: ["QA1"],
  current: ["QA1"],
};

const TEXT_TERMS: Record<QualityAreaCode, string[]> = {
  QA1: [
    "assessment",
    "assessor",
    "competency",
    "delivery",
    "industry engagement",
    "learning design",
    "moderation",
    "recognition of prior learning",
    "rpl",
    "training",
    "training product",
    "unit of competency",
    "validation",
  ],
  QA2: [
    "accessibility",
    "complaint",
    "credit transfer",
    "learner support",
    "reasonable adjustment",
    "student support",
    "vet student",
    "wellbeing",
  ],
  QA3: [
    "credential",
    "currency",
    "professional development",
    "return to industry",
    "trainer capability",
    "trainer development",
    "vet workforce",
    "workforce capability",
  ],
  QA4: [
    "accountability",
    "continuous improvement",
    "governance",
    "integrity",
    "leadership",
    "risk management",
    "self assurance",
    "self-assurance",
  ],
};

function normaliseText(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function includesTerm(text: string, term: string) {
  const normalisedTerm = normaliseText(term);
  return ` ${text} `.includes(` ${normalisedTerm} `);
}

export function detectQualityAreas(
  entry: Pick<
    PracticeEntry,
    | "action"
    | "activity"
    | "body"
    | "customTags"
    | "evidenceRules"
    | "keywords"
    | "principles"
    | "uoc"
  >,
): QualityAreaCode[] {
  const scores = new Map<QualityAreaCode, number>();
  const addScore = (code: QualityAreaCode, score: number) =>
    scores.set(code, (scores.get(code) ?? 0) + score);

  ACTIVITY_QUALITY_AREAS[entry.activity]?.forEach((code) => addScore(code, 2));

  const selectedTags = [
    ...entry.keywords,
    ...entry.principles,
    ...entry.evidenceRules,
  ];
  selectedTags.forEach((tag) =>
    TAG_QUALITY_AREAS[tag]?.forEach((code) => addScore(code, 3)),
  );

  const text = normaliseText(
    [entry.action, entry.body, entry.uoc, ...entry.customTags].join(" "),
  );
  QUALITY_AREAS.forEach(({ code }) => {
    TEXT_TERMS[code].forEach((term) => {
      if (includesTerm(text, term)) addScore(code, 1);
    });
  });

  return QUALITY_AREAS.map(({ code }) => code).filter(
    (code) => (scores.get(code) ?? 0) >= 2,
  );
}