export type LearningStyle = "little" | "explorer" | "independent" | "everyday";
export type LabMode = "learn" | "play";
export type Pane = "lesson" | "code" | "output";

export interface LessonCheck {
  input?: string;
  output: string;
  assertions?: string;
}

export interface Lesson {
  id: string;
  module: number;
  title: string;
  goal: string;
  explain: string[];
  young: string;
  everyday: string;
  example: string;
  starter?: string;
  exampleOutput: string;
  input?: string;
  challenge: string;
  prediction: { question: string; options: string[]; right: number; why: string };
  hints: string[];
  solution: string;
  constructs?: string[];
  checks: LessonCheck[];
}

export interface LabProgress {
  version: 1;
  style: LearningStyle;
  fontSize: number;
  lastLesson: string;
  drafts: Record<string, string>;
  inputs: Record<string, string>;
  predictions: Record<string, number>;
  completed: string[];
}

export interface DataFile { name: string; text: string }
export interface RunResult {
  stdout: string;
  inputs: { prompt: string; response: string }[];
  error?: { name: string; message: string; line?: number; detail?: string };
  files?: DataFile[];
  passed?: boolean;
  feedback?: string;
  cases?: number;
}
