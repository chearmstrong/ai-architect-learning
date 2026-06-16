import { beforeEach, describe, expect, it } from "vitest";
import type { Attempt, CompletedSession } from "../domain/types";
import { createProgressStore } from "./progressStore";

const attempt: Attempt = {
  questionId: "agent-architecture-001",
  sessionId: "session-1",
  mode: "practice",
  selectedChoiceId: "a",
  isCorrect: true,
  answeredAt: "2026-06-16T10:00:00.000Z",
};

const session: CompletedSession = {
  id: "session-1",
  mode: "practice",
  questionIds: ["agent-architecture-001"],
  completedAt: "2026-06-16T10:01:00.000Z",
};

describe("progressStore", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("starts empty", () => {
    const store = createProgressStore(localStorage);
    expect(store.load()).toEqual({ attempts: [], sessions: [] });
  });

  it("persists attempts and sessions", () => {
    const store = createProgressStore(localStorage);
    store.save({ attempts: [attempt], sessions: [session] });
    expect(store.load()).toEqual({ attempts: [attempt], sessions: [session] });
  });

  it("falls back to empty progress when saved data is corrupt", () => {
    localStorage.setItem("ai-architect-learning:progress:v1", "{not-json");
    const store = createProgressStore(localStorage);
    expect(store.load()).toEqual({ attempts: [], sessions: [] });
  });

  it("falls back to empty progress when reading storage fails", () => {
    const storage = {
      getItem: () => {
        throw new Error("storage unavailable");
      },
      setItem: () => undefined,
      removeItem: () => undefined,
      clear: () => undefined,
      key: () => null,
      length: 0,
    } satisfies Storage;

    const store = createProgressStore(storage);
    expect(store.load()).toEqual({ attempts: [], sessions: [] });
  });

  it("clears saved progress", () => {
    const store = createProgressStore(localStorage);
    store.save({ attempts: [attempt], sessions: [session] });
    store.clear();
    expect(store.load()).toEqual({ attempts: [], sessions: [] });
  });
});
