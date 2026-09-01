import { isSafeResourceUrl, type PracticeEntry } from "@/lib/diary-backup";

export type PracticeEntryPresentation = {
  activityLabel: string;
  tagLabels: string[];
  mappedStandardLabels: string[];
};

type PdfPage = {
  commands: string[];
  y: number;
};

const PAGE_WIDTH = 595.28;
const PAGE_HEIGHT = 841.89;
const PAGE_MARGIN = 48;
const BODY_FONT_SIZE = 10.5;
const BODY_LINE_HEIGHT = 15;

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

function formatRecordedDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : `${date.toLocaleDateString("en-AU", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      })} · ${date.toLocaleTimeString("en-AU", {
        hour: "numeric",
        minute: "2-digit",
      })}`;
}

function formatDuration(value: string) {
  const duration = value.trim();
  if (!duration) return "";
  const numericHours = Number(duration);
  return Number.isFinite(numericHours)
    ? `${duration} ${numericHours === 1 ? "hour" : "hours"}`
    : duration;
}

function entryDetailLines(entry: PracticeEntry) {
  return [
    entry.date ? `Logbook date: ${formatLogbookDate(entry.date)}` : "",
    entry.duration ? `Duration: ${formatDuration(entry.duration)}` : "",
    entry.uoc ? `UOC: ${entry.uoc}` : "",
    entry.classSize !== null ? `Class size: ${entry.classSize}` : "",
    entry.trainersPresent ? `Educators present: ${entry.trainersPresent}` : "",
    entry.elearnShortname ? `eLearn shortname: ${entry.elearnShortname}` : "",
    entry.resourceUrl && isSafeResourceUrl(entry.resourceUrl)
      ? `Resource: ${entry.resourceUrl}`
      : "",
    entry.trainerUnderSupervision ? "Educator under supervision: Yes" : "",
    entry.trainerUnderSupervision && entry.supervisorName
      ? `Supervisor: ${entry.supervisorName}`
      : "",
  ].filter(Boolean);
}

export function formatPracticeEntryForSharing(
  entry: PracticeEntry,
  presentation: PracticeEntryPresentation,
) {
  const lines = [
    `Activity: ${presentation.activityLabel}`,
    `Record created: ${formatRecordedDate(entry.createdAt)}`,
    ...entryDetailLines(entry),
    "",
    "Action",
    entry.action.trim() || "Not recorded",
    "",
    "Reflection",
    entry.body.trim() || "Not recorded",
    "",
    `Tags: ${
      presentation.tagLabels.length
        ? presentation.tagLabels.join(", ")
        : "None selected"
    }`,
    `Imported legacy tags: ${
      entry.legacyQualityAreas.length
        ? entry.legacyQualityAreas.join(", ")
        : "None"
    }`,
    `Mapped Outcome Standards: ${
      presentation.mappedStandardLabels.length
        ? presentation.mappedStandardLabels.join("; ")
        : "Not mapped"
    }`,
  ];

  if (entry.tsmDraft?.title && entry.tsmDraft.body) {
    lines.push(
      "",
      "TSM draft",
      `Title: ${entry.tsmDraft.title}`,
      entry.tsmDraft.body,
    );
  }

  return lines.join("\n");
}

function cleanPdfText(value: string) {
  return value
    .replaceAll("\\", "\\\\")
    .replaceAll("(", "\\(")
    .replaceAll(")", "\\)")
    .replace(/[–—]/g, "-")
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/·/g, "-")
    .replace(/[^\x20-\x7E]/g, "?");
}

function wrapPdfText(value: string, fontSize: number) {
  const maxCharacters = Math.max(
    28,
    Math.floor((PAGE_WIDTH - PAGE_MARGIN * 2) / (fontSize * 0.53)),
  );
  const wrapped: string[] = [];

  for (const paragraph of value.split(/\r?\n/)) {
    const words = paragraph.trim().split(/\s+/).filter(Boolean);
    if (words.length === 0) {
      wrapped.push("");
      continue;
    }

    let line = "";
    for (const word of words) {
      if (word.length > maxCharacters) {
        if (line) wrapped.push(line);
        for (let start = 0; start < word.length; start += maxCharacters) {
          wrapped.push(word.slice(start, start + maxCharacters));
        }
        line = "";
      } else if (!line) {
        line = word;
      } else if (`${line} ${word}`.length <= maxCharacters) {
        line = `${line} ${word}`;
      } else {
        wrapped.push(line);
        line = word;
      }
    }
    if (line) wrapped.push(line);
  }

  return wrapped;
}

function createPdfBlob(pages: PdfPage[]) {
  const pageObjectStart = 5;
  const pageObjects = pages.flatMap((page, index) => {
    const pageObject = pageObjectStart + index * 2;
    const contentObject = pageObject + 1;
    const content = `${page.commands.join("\n")}\n`;

    return [
      `${pageObject} 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_WIDTH} ${PAGE_HEIGHT}] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${contentObject} 0 R >>\nendobj\n`,
      `${contentObject} 0 obj\n<< /Length ${content.length} >>\nstream\n${content}endstream\nendobj\n`,
    ];
  });
  const pageReferences = pages
    .map((_, index) => `${pageObjectStart + index * 2} 0 R`)
    .join(" ");
  const objects = [
    "1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n",
    `2 0 obj\n<< /Type /Pages /Kids [${pageReferences}] /Count ${pages.length} >>\nendobj\n`,
    "3 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n",
    "4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj\n",
    ...pageObjects,
  ];
  let pdf = "%PDF-1.4\n%RTO\n";
  const offsets = [0];

  objects.forEach((object) => {
    offsets.push(pdf.length);
    pdf += object;
  });

  const crossReferenceOffset = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.slice(1).forEach((offset) => {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${crossReferenceOffset}\n%%EOF`;

  return new Blob([pdf], { type: "application/pdf" });
}

export function createPracticeLogbookPdf(
  entries: PracticeEntry[],
  presentationForEntry: (entry: PracticeEntry) => PracticeEntryPresentation,
  exportedAt = new Date(),
) {
  const pages: PdfPage[] = [];

  const beginPage = (continued = false) => {
    const page: PdfPage = {
      commands: [],
      y: PAGE_HEIGHT - PAGE_MARGIN,
    };
    pages.push(page);
    if (continued) {
      page.commands.push(
        `BT /F2 10 Tf 1 0 0 1 ${PAGE_MARGIN} ${page.y.toFixed(2)} Tm (${cleanPdfText(
          "VET Educator Professional Log - continued",
        )}) Tj ET`,
      );
      page.y -= 25;
    }
    return page;
  };

  let page = beginPage();
  const addRule = () => {
    if (page.y - 10 < PAGE_MARGIN) {
      page = beginPage(true);
    }
    page.commands.push(
      `0.78 G 0.6 w ${PAGE_MARGIN} ${(page.y - 4).toFixed(2)} m ${(PAGE_WIDTH - PAGE_MARGIN).toFixed(2)} ${(page.y - 4).toFixed(2)} l S 0 G`,
    );
    page.y -= 13;
  };
  const addText = (
    value: string,
    size = BODY_FONT_SIZE,
    font = "F1",
    marginAfter = 2,
  ) => {
    const lines = wrapPdfText(value, size);
    lines.forEach((line) => {
      const lineHeight = size * 1.32;
      if (page.y - lineHeight < PAGE_MARGIN) {
        page = beginPage(true);
      }
      if (line) {
        page.commands.push(
          `BT /${font} ${size} Tf 1 0 0 1 ${PAGE_MARGIN} ${page.y.toFixed(2)} Tm (${cleanPdfText(
            line,
          )}) Tj ET`,
        );
      }
      page.y -= lineHeight;
    });
    page.y -= marginAfter;
  };
  const addParagraph = (value: string) => {
    const lines = wrapPdfText(value, BODY_FONT_SIZE);
    lines.forEach((line) => {
      if (page.y - BODY_LINE_HEIGHT < PAGE_MARGIN) {
        page = beginPage(true);
      }
      if (line) {
        page.commands.push(
          `BT /F1 ${BODY_FONT_SIZE} Tf 1 0 0 1 ${PAGE_MARGIN} ${page.y.toFixed(2)} Tm (${cleanPdfText(
            line,
          )}) Tj ET`,
        );
      }
      page.y -= BODY_LINE_HEIGHT;
    });
    page.y -= 4;
  };

  addText("VET Educator Professional Log", 20, "F2", 7);
  addText("Private practice record export", 12, "F1", 12);
  addRule();
  addText(
    `Exported: ${exportedAt.toLocaleDateString("en-AU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })}`,
  );
  addText(
    `Entries included: ${entries.length} ${entries.length === 1 ? "record" : "records"}`,
    BODY_FONT_SIZE,
    "F2",
    16,
  );

  if (entries.length === 0) {
    addText("No saved educator log entries were in this record at the time of export.");
  }

  entries.forEach((entry, index) => {
    const presentation = presentationForEntry(entry);
    addRule();
    addText(`Entry ${index + 1}: ${presentation.activityLabel}`, 14, "F2", 5);
    addText(`Record created: ${formatRecordedDate(entry.createdAt)}`, 9.5, "F1", 7);
    entryDetailLines(entry).forEach((line) => addText(line, 9.5, "F1", 1));
    addText("Action", 11, "F2", 2);
    addParagraph(entry.action.trim() || "Not recorded");
    addText("Reflection", 11, "F2", 2);
    addParagraph(entry.body.trim() || "Not recorded");
    addText(
      `Tags: ${
        presentation.tagLabels.length
          ? presentation.tagLabels.join(", ")
          : "None selected"
      }`,
      9.5,
      "F1",
      2,
    );
    addText(
      `Imported legacy tags: ${
        entry.legacyQualityAreas.length
          ? entry.legacyQualityAreas.join(", ")
          : "None"
      }`,
      9.5,
      "F1",
      2,
    );
    addText(
      `Mapped Outcome Standards: ${
        presentation.mappedStandardLabels.length
          ? presentation.mappedStandardLabels.join("; ")
          : "Not mapped"
      }`,
      9.5,
      "F1",
      6,
    );

    if (entry.tsmDraft?.title && entry.tsmDraft.body) {
      addText("TSM draft", 11, "F2", 2);
      addText(`Title: ${entry.tsmDraft.title}`, 9.5, "F1", 3);
      addParagraph(entry.tsmDraft.body);
    }
  });

  pages.forEach((currentPage, index) => {
    currentPage.commands.push(
      `BT /F1 8 Tf 1 0 0 1 ${PAGE_MARGIN} 28 Tm (${cleanPdfText(
        `VET Educator Professional Log - page ${index + 1} of ${pages.length}`,
      )}) Tj ET`,
    );
  });

  return createPdfBlob(pages);
}