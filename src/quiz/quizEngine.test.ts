import { describe, expect, it } from "vitest";
import type { Question } from "../domain/types";
import { answerQuestion, createQuizSession, finishSession } from "./quizEngine";

const questions: Question[] = [
  {
    id: "agent-architecture-001",
    domain: "agent-architecture",
    difficulty: "foundation",
    prompt: "Which design best preserves observability in a multi-agent system?",
    choices: [
      { id: "a", text: "Route all subagent work through a coordinator." },
      { id: "b", text: "Let subagents communicate privately." },
      { id: "c", text: "Store hidden state in each subagent." },
      { id: "d", text: "Avoid explicit task boundaries." },
    ],
    correctChoiceId: "a",
    explanation: "A coordinator keeps delegation and aggregation visible.",
    choiceExplanations: {
      a: "This is correct because coordinator-mediated delegation preserves observability.",
      b: "Private subagent communication makes behaviour harder to audit.",
      c: "Hidden state makes results hard to reproduce.",
      d: "Unclear task boundaries reduce reliability.",
    },
    sources: [{ title: "Claude docs", url: "https://platform.claude.com/docs/en/intro" }],
  },
  {
    id: "tool-mcp-001",
    domain: "tool-mcp",
    difficulty: "applied",
    prompt: "What most directly reduces incorrect tool selection?",
    choices: [
      { id: "a", text: "Write distinct tool descriptions." },
      { id: "b", text: "Use shorter descriptions." },
      { id: "c", text: "Hide input constraints." },
      { id: "d", text: "Use the same schema for every tool." },
    ],
    correctChoiceId: "a",
    explanation: "Distinct descriptions reduce ambiguity.",
    choiceExplanations: {
      a: "Correct. Clear descriptions help tool selection.",
      b: "Incorrect. Terse descriptions can increase ambiguity.",
      c: "Incorrect. Constraints should be visible before tool calls.",
      d: "Incorrect. Shared schemas do not explain semantic differences.",
    },
    sources: [{ title: "Claude docs: Tool use", url: "https://platform.claude.com/docs/en/build-with-claude/tool-use" }],
  },
];

describe("quizEngine", () => {
  it("creates a practice session filtered by domain and count", () => {
    const session = createQuizSession({
      questions,
      mode: "practice",
      domain: "agent-architecture",
      count: 1,
      now: new Date("2026-06-16T10:00:00.000Z")
    });

    expect(session.mode).toBe("practice");
    expect(session.questions).toHaveLength(1);
    expect(session.questions[0].domain).toBe("agent-architecture");
  });

  it("uses a caller-provided session id when supplied", () => {
    const session = createQuizSession({
      questions,
      mode: "practice",
      domain: "all",
      count: 1,
      now: new Date("2026-06-16T10:00:00.000Z"),
      sessionId: "session-custom-1"
    });

    expect(session.id).toBe("session-custom-1");
  });

  it("creates distinct default session ids for the same millisecond", () => {
    const now = new Date("2026-06-16T10:00:00.000Z");
    const first = createQuizSession({
      questions,
      mode: "practice",
      domain: "all",
      count: 1,
      now
    });
    const second = createQuizSession({
      questions,
      mode: "practice",
      domain: "all",
      count: 1,
      now
    });

    expect(first.id).toMatch(/^session-1781604000000-/);
    expect(second.id).toMatch(/^session-1781604000000-/);
    expect(first.id).not.toBe(second.id);
  });

  it("marks an empty session complete", () => {
    const session = createQuizSession({
      questions,
      mode: "practice",
      domain: "claude-code",
      count: 1,
      now: new Date("2026-06-16T10:00:00.000Z")
    });

    expect(session.questions).toEqual([]);
    expect(session.isComplete).toBe(true);
  });

  it("reveals feedback immediately in practice mode", () => {
    const session = createQuizSession({
      questions,
      mode: "practice",
      domain: "agent-architecture",
      count: 1,
      now: new Date("2026-06-16T10:00:00.000Z")
    });

    const updated = answerQuestion(session, session.questions[0].correctChoiceId, new Date("2026-06-16T10:01:00.000Z"));
    expect(updated.answers[session.questions[0].id]?.isRevealed).toBe(true);
  });

  it("advances the current index and completes after the last answer", () => {
    const session = createQuizSession({
      questions,
      mode: "practice",
      domain: "agent-architecture",
      count: 1,
      now: new Date("2026-06-16T10:00:00.000Z")
    });

    const updated = answerQuestion(session, session.questions[0].correctChoiceId, new Date("2026-06-16T10:01:00.000Z"));
    expect(updated.currentIndex).toBe(1);
    expect(updated.isComplete).toBe(true);
  });

  it("delays feedback in exam mode", () => {
    const session = createQuizSession({
      questions,
      mode: "exam",
      domain: "agent-architecture",
      count: 1,
      now: new Date("2026-06-16T10:00:00.000Z")
    });

    const updated = answerQuestion(session, session.questions[0].correctChoiceId, new Date("2026-06-16T10:01:00.000Z"));
    expect(updated.answers[session.questions[0].id]?.isRevealed).toBe(false);
  });

  it("marks all answers revealed when a session is finished", () => {
    const session = createQuizSession({
      questions,
      mode: "exam",
      domain: "agent-architecture",
      count: 1,
      now: new Date("2026-06-16T10:00:00.000Z")
    });

    const answered = answerQuestion(session, session.questions[0].correctChoiceId, new Date("2026-06-16T10:01:00.000Z"));
    const finished = finishSession(answered);
    expect(finished.answers[session.questions[0].id]?.isRevealed).toBe(true);
  });
});
