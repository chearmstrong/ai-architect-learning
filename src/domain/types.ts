export type Domain =
  | "agent-architecture"
  | "tool-mcp"
  | "claude-code"
  | "prompt-structured-output"
  | "context-reliability";

export type Difficulty = "foundation" | "applied" | "scenario";

export type QuizMode = "practice" | "exam";

export type Choice = {
  id: string;
  text: string;
};

export type SourceLink = {
  title: string;
  url: string;
};

export type Question = {
  id: string;
  domain: Domain;
  difficulty: Difficulty;
  prompt: string;
  choices: Choice[];
  correctChoiceId: string;
  explanation: string;
  choiceExplanations: Record<string, string>;
  sources: SourceLink[];
};

export type Attempt = {
  questionId: string;
  sessionId: string;
  mode: QuizMode;
  selectedChoiceId: string;
  isCorrect: boolean;
  answeredAt: string;
};

export type CompletedSession = {
  id: string;
  mode: QuizMode;
  questionIds: string[];
  completedAt: string;
};
