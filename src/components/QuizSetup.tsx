import { useState } from "react";
import { getQuestionCountForDomain } from "../data/domains";
import type { Domain, QuizMode } from "../domain/types";

export type QuizSetupValues = {
  mode: QuizMode;
  domain: Domain | "all";
  count: number;
};

type QuizSetupProps = {
  maxCount: number;
  onCancel: () => void;
  onStart: (values: QuizSetupValues) => void;
};

const domainOptions: Array<{ value: Domain | "all"; label: string }> = [
  { value: "all", label: "All domains" },
  { value: "agent-architecture", label: "Agent architecture" },
  { value: "tool-mcp", label: "Tool design and MCP" },
  { value: "claude-code", label: "Claude Code workflows" },
  { value: "prompt-structured-output", label: "Prompting and structured output" },
  { value: "context-reliability", label: "Context and reliability" },
];

export function QuizSetup({ maxCount, onCancel, onStart }: QuizSetupProps) {
  const [selectedDomain, setSelectedDomain] = useState<Domain | "all">("all");
  const selectedMaxCount = selectedDomain === "all" ? maxCount : getQuestionCountForDomain(selectedDomain);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const domain = form.get("domain") as Domain | "all";
    const availableCount = getQuestionCountForDomain(domain);
    const requestedCount = Number(form.get("count"));
    const safeMaximum = Math.max(availableCount, 1);
    const count = Number.isFinite(requestedCount)
      ? Math.min(Math.max(requestedCount, 1), safeMaximum)
      : 1;

    onStart({
      mode: form.get("mode") as QuizMode,
      domain,
      count,
    });
  }

  return (
    <form className="panel quiz-setup" onSubmit={handleSubmit}>
      <h1>Start quiz</h1>

      <label>
        Mode
        <select name="mode" defaultValue="practice">
          <option value="practice">Practice - show explanations immediately</option>
          <option value="exam">Exam-style - review explanations at the end</option>
        </select>
      </label>

      <label>
        Domain
        <select
          name="domain"
          defaultValue="all"
          onChange={(event) => setSelectedDomain(event.currentTarget.value as Domain | "all")}
        >
          {domainOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label>
        <span className="label-row">
          Question count
          <span>Max: {selectedMaxCount}</span>
        </span>
        <input
          aria-label="Question count"
          required
          min={1}
          max={maxCount}
          name="count"
          type="number"
          defaultValue={Math.min(5, maxCount)}
        />
      </label>

      <div className="button-row">
        <button type="button" className="secondary-button" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="primary-button">
          Start
        </button>
      </div>
    </form>
  );
}
