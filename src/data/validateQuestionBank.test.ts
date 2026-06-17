import { describe, expect, it } from "vitest";
import type { Question } from "../domain/types";
import { questions } from "./questions";
import { validateQuestionBank } from "./validateQuestionBank";
import { domainLabels, getQuestionCountForDomain } from "./domains";

const validQuestion: Question = {
  id: "sample",
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
};

describe("validateQuestionBank", () => {
  it("accepts valid questions", () => {
    expect(validateQuestionBank([validQuestion])).toEqual([]);
  });

  it("rejects questions without exactly four choices", () => {
    const invalid = { ...validQuestion, choices: validQuestion.choices.slice(0, 3) };
    expect(validateQuestionBank([invalid])).toContain("sample must have exactly four choices");
  });

  it("rejects invalid correct answer ids", () => {
    const invalid = { ...validQuestion, correctChoiceId: "z" };
    expect(validateQuestionBank([invalid])).toContain("sample correctChoiceId must match a choice id");
  });

  it("rejects missing choice explanations", () => {
    const invalid = {
      ...validQuestion,
      choiceExplanations: { a: "Only one explanation" },
    };
    expect(validateQuestionBank([invalid])).toContain("sample must explain every choice");
  });

  it("rejects questions without sources", () => {
    const invalid = { ...validQuestion, sources: [] };
    expect(validateQuestionBank([invalid])).toContain("sample must have at least one source");
  });

  it("rejects duplicate question ids", () => {
    expect(validateQuestionBank([validQuestion, validQuestion])).toContain("sample must be unique");
  });

  it("rejects invalid source URLs", () => {
    const invalid = { ...validQuestion, sources: [{ title: "Broken", url: "not a url" }] };
    expect(validateQuestionBank([invalid])).toContain("sample source must be a valid URL");
  });

  it("rejects duplicate choice ids", () => {
    const invalid = {
      ...validQuestion,
      choices: [
        { id: "a", text: "First option." },
        { id: "a", text: "Duplicate option." },
        { id: "b", text: "Second option." },
        { id: "c", text: "Third option." },
      ],
      choiceExplanations: {
        a: "Ambiguous duplicate explanation.",
        b: "Second explanation.",
        c: "Third explanation.",
      },
    };
    expect(validateQuestionBank([invalid])).toContain("sample choice ids must be unique");
  });

  it("keeps the shipped bank valid", () => {
    expect(validateQuestionBank(questions)).toEqual([]);
  });

  it("ships a useful first practice bank across every domain", () => {
    expect(questions).toHaveLength(60);

    for (const domain of Object.keys(domainLabels) as Array<keyof typeof domainLabels>) {
      expect(getQuestionCountForDomain(domain)).toBeGreaterThanOrEqual(6);
    }
  });
});
