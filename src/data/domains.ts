import { questions } from "./questions";
import type { Domain } from "../domain/types";

export const domainLabels: Record<Domain, string> = {
  "agent-architecture": "Agent architecture",
  "tool-mcp": "Tool design and MCP",
  "claude-code": "Claude Code workflows",
  "prompt-structured-output": "Prompting and structured output",
  "context-reliability": "Context and reliability",
};

export function getQuestionCountForDomain(domain: Domain | "all"): number {
  if (domain === "all") {
    return questions.length;
  }

  return questions.filter((question) => question.domain === domain).length;
}
