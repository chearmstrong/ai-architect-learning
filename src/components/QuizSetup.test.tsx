import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
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
      count: 6,
    });
  });
});
