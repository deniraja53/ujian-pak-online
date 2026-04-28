export enum QuestionType {
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  MATCHING = 'MATCHING',
  FILL_IN = 'FILL_IN',
  ESSAY = 'ESSAY',
}

export interface MatchingOption {
  label: string;
  text: string;
}

export interface Question {
  id: number;
  type: QuestionType;
  question: string;
  options?: string[]; // For PG
  matchingOptions?: MatchingOption[]; // For Jodohkan
  correctAnswer: string;
  score: number;
}

export interface ExamData {
  title: string;
  year: string;
  school: string;
  subject: string;
  class: string;
  durationMinutes: number;
  questions: Question[];
}

export interface StudentInfo {
  name: string;
  school: string;
}

export interface Violation {
  type: 'FOCUS_LOST' | 'FULLSCREEN_EXIT' | 'TAB_SWITCH';
  timestamp: string;
}

export interface ExamSession {
  student: StudentInfo;
  startTime: string;
  endTime?: string;
  answers: Record<number, string>;
  violations: Violation[];
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'TERMINATED';
}

export interface ExamResult {
  score: number;
  totalScore: number;
  correctCount: number;
  wrongCount: number;
  essayCount: number; // For manual review
  violations: number;
}
