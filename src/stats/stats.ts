import { questions } from "../data/questions";
import type { Domain, QuizMode } from "../domain/types";
import type { ProgressState } from "../progress/progressStore";

export type DomainStat = {
  domain: Domain;
  accuracy: number;
  answered: number;
};

export type RecentSessionStat = {
  id: string;
  mode: QuizMode;
  completedAt: string;
  questionCount: number;
  correctCount: number;
  accuracy: number;
};

export type DashboardStats = {
  totalAnswered: number;
  accuracy: number;
  currentStreak: number;
  weakestDomains: DomainStat[];
  recentSessions: RecentSessionStat[];
};

const questionDomainById = new Map(questions.map((question) => [question.id, question.domain]));

function toDay(value: string | Date): string {
  const date = new Date(value);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function previousDay(day: string): string {
  const [year, month, dateOfMonth] = day.split("-").map(Number);
  const date = new Date(year, month - 1, dateOfMonth);
  date.setDate(date.getDate() - 1);
  return toDay(date);
}

function calculateStreak(sessionDays: Set<string>, now: Date): number {
  let cursor = toDay(now);
  let streak = 0;

  if (!sessionDays.has(cursor)) {
    cursor = previousDay(cursor);
  }

  while (sessionDays.has(cursor)) {
    streak += 1;
    cursor = previousDay(cursor);
  }

  return streak;
}

export function calculateDashboardStats(progress: ProgressState, now: Date): DashboardStats {
  const totalAnswered = progress.attempts.length;
  const correct = progress.attempts.filter((attempt) => attempt.isCorrect).length;
  const accuracy = totalAnswered === 0 ? 0 : Math.round((correct / totalAnswered) * 100);

  const sessionDays = new Set(progress.sessions.map((session) => toDay(session.completedAt)));
  const currentStreak = calculateStreak(sessionDays, now);

  const domainBuckets = new Map<Domain, { correct: number; answered: number }>();
  for (const attempt of progress.attempts) {
    const domain = questionDomainById.get(attempt.questionId);
    if (!domain) {
      continue;
    }

    const bucket = domainBuckets.get(domain) ?? { correct: 0, answered: 0 };
    bucket.answered += 1;
    bucket.correct += attempt.isCorrect ? 1 : 0;
    domainBuckets.set(domain, bucket);
  }

  const weakestDomains = Array.from(domainBuckets.entries())
    .map(([domain, bucket]) => ({
      domain,
      accuracy: Math.round((bucket.correct / bucket.answered) * 100),
      answered: bucket.answered,
    }))
    .sort((a, b) => a.accuracy - b.accuracy || b.answered - a.answered || a.domain.localeCompare(b.domain))
    .slice(0, 3);

  const recentSessions = [...progress.sessions]
    .sort((a, b) => b.completedAt.localeCompare(a.completedAt))
    .slice(0, 5)
    .map((session) => {
      const sessionAttempts = progress.attempts.filter((attempt) => attempt.sessionId === session.id);
      const correctCount = sessionAttempts.filter((attempt) => attempt.isCorrect).length;
      const questionCount = session.questionIds.length;

      return {
        id: session.id,
        mode: session.mode,
        completedAt: session.completedAt,
        questionCount,
        correctCount,
        accuracy: questionCount === 0 ? 0 : Math.round((correctCount / questionCount) * 100),
      };
    });

  return {
    totalAnswered,
    accuracy,
    currentStreak,
    weakestDomains,
    recentSessions,
  };
}
