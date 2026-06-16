import { describe, expect, it } from "vitest";
import type { Attempt, CompletedSession } from "../domain/types";
import { calculateDashboardStats } from "./stats";

const attempts: Attempt[] = [
  {
    questionId: "agent-architecture-001",
    sessionId: "s1",
    mode: "practice",
    selectedChoiceId: "a",
    isCorrect: true,
    answeredAt: "2026-06-15T10:00:00.000Z",
  },
  {
    questionId: "tool-mcp-001",
    sessionId: "s2",
    mode: "practice",
    selectedChoiceId: "b",
    isCorrect: false,
    answeredAt: "2026-06-16T10:00:00.000Z",
  },
];

const sessions: CompletedSession[] = [
  { id: "s1", mode: "practice", questionIds: ["agent-architecture-001"], completedAt: "2026-06-15T10:01:00.000Z" },
  { id: "s2", mode: "practice", questionIds: ["tool-mcp-001"], completedAt: "2026-06-16T10:01:00.000Z" },
];

describe("calculateDashboardStats", () => {
  it("returns empty metrics for empty progress", () => {
    const stats = calculateDashboardStats({ attempts: [], sessions: [] }, new Date("2026-06-16T12:00:00.000Z"));
    expect(stats).toEqual({
      totalAnswered: 0,
      accuracy: 0,
      currentStreak: 0,
      weakestDomains: [],
      recentSessions: [],
    });
  });

  it("calculates totals and accuracy", () => {
    const stats = calculateDashboardStats({ attempts, sessions }, new Date("2026-06-16T12:00:00.000Z"));
    expect(stats.totalAnswered).toBe(2);
    expect(stats.accuracy).toBe(50);
  });

  it("calculates current streak from completed session days", () => {
    const stats = calculateDashboardStats({ attempts, sessions }, new Date("2026-06-16T12:00:00.000Z"));
    expect(stats.currentStreak).toBe(2);
  });

  it("keeps a yesterday-only streak active", () => {
    const stats = calculateDashboardStats(
      {
        attempts: [],
        sessions: [
          {
            id: "s1",
            mode: "practice",
            questionIds: ["agent-architecture-001"],
            completedAt: "2026-06-15T10:01:00.000Z",
          },
        ],
      },
      new Date("2026-06-16T12:00:00.000Z"),
    );
    expect(stats.currentStreak).toBe(1);
  });

  it("breaks a streak when there is a gap before yesterday", () => {
    const stats = calculateDashboardStats(
      {
        attempts: [],
        sessions: [
          {
            id: "s1",
            mode: "practice",
            questionIds: ["agent-architecture-001"],
            completedAt: "2026-06-14T10:01:00.000Z",
          },
        ],
      },
      new Date("2026-06-16T12:00:00.000Z"),
    );
    expect(stats.currentStreak).toBe(0);
  });

  it("counts multiple sessions on the same day as one streak day", () => {
    const stats = calculateDashboardStats(
      {
        attempts: [],
        sessions: [
          { id: "s1", mode: "practice", questionIds: ["agent-architecture-001"], completedAt: "2026-06-16T10:01:00.000Z" },
          { id: "s2", mode: "practice", questionIds: ["tool-mcp-001"], completedAt: "2026-06-16T18:01:00.000Z" },
        ],
      },
      new Date("2026-06-16T20:00:00.000Z"),
    );
    expect(stats.currentStreak).toBe(1);
  });

  it("finds weakest domains using question lookup", () => {
    const stats = calculateDashboardStats({ attempts, sessions }, new Date("2026-06-16T12:00:00.000Z"));
    expect(stats.weakestDomains[0]).toEqual({
      domain: "tool-mcp",
      accuracy: 0,
      answered: 1,
    });
  });

  it("returns recent sessions newest first", () => {
    const stats = calculateDashboardStats({ attempts, sessions }, new Date("2026-06-16T12:00:00.000Z"));
    expect(stats.recentSessions).toEqual([
      {
        id: "s2",
        mode: "practice",
        completedAt: "2026-06-16T10:01:00.000Z",
        questionCount: 1,
        correctCount: 0,
        accuracy: 0,
      },
      {
        id: "s1",
        mode: "practice",
        completedAt: "2026-06-15T10:01:00.000Z",
        questionCount: 1,
        correctCount: 1,
        accuracy: 100,
      },
    ]);
  });

  it("ignores unknown question ids for domain stats", () => {
    const stats = calculateDashboardStats(
      {
        attempts: [
          {
            questionId: "unknown-question",
            sessionId: "s1",
            mode: "practice",
            selectedChoiceId: "a",
            isCorrect: false,
            answeredAt: "2026-06-16T10:00:00.000Z",
          },
        ],
        sessions: [],
      },
      new Date("2026-06-16T12:00:00.000Z"),
    );
    expect(stats.weakestDomains).toEqual([]);
  });
});
