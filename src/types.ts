export type TabType = 'lesson' | 'simulator' | 'practice' | 'challenge' | 'guide';

export interface QuestionData {
  id: string;
  questionNumber: number;
  type: 'numeric' | 'power_exponent' | 'true_false' | 'expression' | 'open_text';
  base?: number | string;
  promptPrefix?: string;
  promptSuffix?: string;
  expectedAnswer: string; // can be pipe separated like "1/x|x^-1"
  hint?: string;
  explanation?: string;
  modelAnswer?: string;
}

export interface PartData {
  id: string;
  partNumber: string;
  title: string;
  subtitle?: string;
  instructions?: string;
  questions: QuestionData[];
}

export interface WorksheetData {
  id: 'practice' | 'challenge';
  title: string;
  code: string;
  subtitle: string;
  description: string;
  parts: PartData[];
}

export interface RunSheetStep {
  id: number;
  durationMinutes: number;
  title: string;
  summary: string;
  teacherSay?: string;
  keyPrompt?: string;
}

export interface CommonMistake {
  mistake: string;
  correction: string;
  explanation: string;
  example: string;
}
