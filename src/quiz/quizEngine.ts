import type { Domain, Question, QuizMode } from "../domain/types";

export type QuizAnswer = {
  selectedChoiceId: string;
  isCorrect: boolean;
  answeredAt: string;
  isRevealed: boolean;
};

export type QuizSession = {
  id: string;
  mode: QuizMode;
  questions: Question[];
  currentIndex: number;
  startedAt: string;
  answers: Record<string, QuizAnswer>;
  isComplete: boolean;
};

export type CreateQuizSessionInput = {
  questions: Question[];
  mode: QuizMode;
  domain: Domain | "all";
  count: number;
  now: Date;
  sessionId?: string;
};

function createSessionId(now: Date): string {
  const randomPart =
    typeof globalThis.crypto?.randomUUID === "function"
      ? globalThis.crypto.randomUUID()
      : Math.random().toString(36).slice(2);
  return `session-${now.getTime()}-${randomPart}`;
}

export function createQuizSession(input: CreateQuizSessionInput): QuizSession {
  const filtered =
    input.domain === "all"
      ? input.questions
      : input.questions.filter((question) => question.domain === input.domain);
  const selectedQuestions = filtered.slice(0, input.count);

  return {
    id: input.sessionId ?? createSessionId(input.now),
    mode: input.mode,
    questions: selectedQuestions,
    currentIndex: 0,
    startedAt: input.now.toISOString(),
    answers: {},
    isComplete: selectedQuestions.length === 0,
  };
}

export function answerQuestion(session: QuizSession, selectedChoiceId: string, now: Date): QuizSession {
  const currentQuestion = session.questions[session.currentIndex];
  if (!currentQuestion) {
    return session;
  }

  const isCorrect = selectedChoiceId === currentQuestion.correctChoiceId;
  const answers = {
    ...session.answers,
    [currentQuestion.id]: {
      selectedChoiceId,
      isCorrect,
      answeredAt: now.toISOString(),
      isRevealed: session.mode === "practice",
    },
  };

  const answeredCount = Object.keys(answers).length;

  return {
    ...session,
    answers,
    currentIndex: session.currentIndex + 1,
    isComplete: answeredCount === session.questions.length,
  };
}

export function finishSession(session: QuizSession): QuizSession {
  const revealedAnswers = Object.fromEntries(
    Object.entries(session.answers).map(([questionId, answer]) => [
      questionId,
      { ...answer, isRevealed: true },
    ]),
  );

  return {
    ...session,
    answers: revealedAnswers,
    isComplete: true,
  };
}
