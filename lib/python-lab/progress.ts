import { lessons, learningStyles } from "./curriculum";
import type { LabProgress } from "./types";

export const STORAGE_KEY = "nisan-python-lab-v1";
export const MAX_CODE_LENGTH = 30000;
export const MAX_INPUT_LENGTH = 10000;
// Enough for every allowed draft/input, even when JSON must escape each character.
export const MAX_BACKUP_BYTES = 12000000;
const ids = new Set(lessons.map(lesson => lesson.id));
const draftIds = new Set([...ids, "playground"]);

export function freshProgress(): LabProgress {
  return { version: 1, style: "everyday", fontSize: 16, lastLesson: lessons[0].id, drafts: {}, inputs: {}, predictions: {}, completed: [] };
}

function textMap(value: unknown, limit: number): Record<string, string> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return Object.fromEntries(Object.entries(value).filter(([key, text]) => draftIds.has(key) && typeof text === "string" && text.length <= limit));
}

export function parseProgress(value: unknown): LabProgress {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("Choose a Python Lab progress backup.");
  const record = value as Record<string, unknown>;
  if (record.version !== 1) throw new Error("This backup uses a different format. Your current work has been kept.");
  const result = freshProgress();
  if (learningStyles.some(style => style.id === record.style)) result.style = record.style as LabProgress["style"];
  if (typeof record.fontSize === "number" && Number.isFinite(record.fontSize)) result.fontSize = Math.max(14, Math.min(24, record.fontSize));
  if (typeof record.lastLesson === "string" && ids.has(record.lastLesson)) result.lastLesson = record.lastLesson;
  result.drafts = textMap(record.drafts, MAX_CODE_LENGTH);
  result.inputs = textMap(record.inputs, MAX_INPUT_LENGTH);
  if (Array.isArray(record.completed)) result.completed = [...new Set(record.completed.filter((id): id is string => typeof id === "string" && ids.has(id)))];
  if (record.predictions && typeof record.predictions === "object" && !Array.isArray(record.predictions)) {
    result.predictions = Object.fromEntries(Object.entries(record.predictions).filter(([id, choice]) => {
      const lesson = lessons.find(item => item.id === id);
      return lesson && Number.isInteger(choice) && Number(choice) >= 0 && Number(choice) < lesson.prediction.options.length;
    }));
  }
  return result;
}

export function downloadText(name: string, text: string, type = "text/plain;charset=utf-8") {
  const url = URL.createObjectURL(new Blob([text], { type }));
  const link = document.createElement("a");
  link.href = url;
  link.download = name;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
