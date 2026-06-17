import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { getQuestionCountForDomain } from "../data/domains";
import { QuizSetup } from "./QuizSetup";

describe("QuizSetup", () => {
  it("emits default setup values", async () => {
    const onStart = vi.fn();
    render(<QuizSetup maxCount={30} onCancel={() => undefined} onStart={onStart} />);

    await userEvent.click(screen.getByRole("button", { name: "Start" }));

    expect(onStart).toHaveBeenCalledWith({
      mode: "practice",
      domain: "all",
      count: 5,
    });
  });

  it("clamps submitted count to the selected domain size", async () => {
    const onStart = vi.fn();
    render(<QuizSetup maxCount={30} onCancel={() => undefined} onStart={onStart} />);

    await userEvent.selectOptions(screen.getByLabelText("Domain"), "agent-architecture");
    await userEvent.clear(screen.getByLabelText("Question count"));
    await userEvent.type(screen.getByLabelText("Question count"), "30");
    await userEvent.click(screen.getByRole("button", { name: "Start" }));

    expect(onStart).toHaveBeenCalledWith({
      mode: "practice",
      domain: "agent-architecture",
      count: getQuestionCountForDomain("agent-architecture"),
    });
  });

  it("shows the maximum question count for the selected domain", async () => {
    const onStart = vi.fn();
    render(<QuizSetup maxCount={60} onCancel={() => undefined} onStart={onStart} />);

    expect(screen.getByText("Max: 60")).toBeInTheDocument();

    await userEvent.selectOptions(screen.getByLabelText("Domain"), "agent-architecture");

    expect(screen.getByText(`Max: ${getQuestionCountForDomain("agent-architecture")}`)).toBeInTheDocument();
  });
});
