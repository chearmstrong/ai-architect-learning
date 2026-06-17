import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import App from "./App";

describe("App", () => {
  it("renders the scaffold heading", () => {
    render(<App />);
    expect(screen.getByRole("heading", { name: "AI Architect Learning" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "View source on GitHub" })).toHaveAttribute(
      "href",
      "https://github.com/chearmstrong/ai-architect-learning",
    );
  });

  it("shows practice feedback immediately and persists the completed session", async () => {
    localStorage.clear();
    const random = vi.spyOn(Math, "random").mockReturnValue(0.999);
    render(<App />);

    await userEvent.click(screen.getByRole("button", { name: "Start quiz" }));
    await userEvent.selectOptions(screen.getByLabelText("Domain"), "agent-architecture");
    await userEvent.clear(screen.getByLabelText("Question count"));
    await userEvent.type(screen.getByLabelText("Question count"), "1");
    await userEvent.click(screen.getByRole("button", { name: "Start" }));
    await userEvent.click(screen.getByRole("button", { name: /Pass the relevant document text/ }));

    expect(screen.getByRole("heading", { name: "Correct" })).toBeInTheDocument();
    expect(screen.getByText(/Explicit context passing/)).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "Review session" }));
    expect(screen.getByRole("heading", { name: "1 / 1 correct" })).toBeInTheDocument();
    expect(screen.getByText("Agent architecture")).toBeInTheDocument();

    const saved = JSON.parse(localStorage.getItem("ai-architect-learning:progress:v1") ?? "{}");
    expect(saved.attempts).toHaveLength(1);
    expect(saved.sessions).toHaveLength(1);

    await userEvent.click(screen.getByRole("button", { name: "Back to dashboard" }));
    expect(screen.getByRole("heading", { name: "Recent sessions" })).toBeInTheDocument();
    expect(screen.getByText("1/1 correct")).toBeInTheDocument();

    random.mockRestore();
  });

  it("delays exam feedback until review", async () => {
    localStorage.clear();
    const random = vi.spyOn(Math, "random").mockReturnValue(0.999);
    render(<App />);

    await userEvent.click(screen.getByRole("button", { name: "Start quiz" }));
    await userEvent.selectOptions(screen.getByLabelText("Mode"), "exam");
    await userEvent.selectOptions(screen.getByLabelText("Domain"), "agent-architecture");
    await userEvent.clear(screen.getByLabelText("Question count"));
    await userEvent.type(screen.getByLabelText("Question count"), "1");
    await userEvent.click(screen.getByRole("button", { name: "Start" }));
    await userEvent.click(screen.getByRole("button", { name: /Pass the relevant document text/ }));

    expect(screen.queryByRole("heading", { name: "Correct" })).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "Review session" }));
    expect(screen.getByText(/Subagents should receive the context/)).toBeInTheDocument();

    random.mockRestore();
  });

  it("lets a quiz end early and saves answered progress", async () => {
    localStorage.clear();
    const random = vi.spyOn(Math, "random").mockReturnValue(0.999);
    render(<App />);

    await userEvent.click(screen.getByRole("button", { name: "Start quiz" }));
    await userEvent.selectOptions(screen.getByLabelText("Domain"), "agent-architecture");
    await userEvent.clear(screen.getByLabelText("Question count"));
    await userEvent.type(screen.getByLabelText("Question count"), "5");
    await userEvent.click(screen.getByRole("button", { name: "Start" }));
    await userEvent.click(screen.getByRole("button", { name: /Pass the relevant document text/ }));
    await userEvent.click(screen.getByRole("button", { name: "End quiz" }));

    expect(screen.getByRole("heading", { name: "1 / 1 correct" })).toBeInTheDocument();

    const saved = JSON.parse(localStorage.getItem("ai-architect-learning:progress:v1") ?? "{}");
    expect(saved.attempts).toHaveLength(1);
    expect(saved.sessions).toHaveLength(1);
    expect(saved.sessions[0].questionIds).toEqual(["agent-architecture-001"]);

    random.mockRestore();
  });

  it("clears local progress after reset confirmation", async () => {
    localStorage.setItem(
      "ai-architect-learning:progress:v1",
      JSON.stringify({
        attempts: [
          {
            questionId: "agent-architecture-001",
            sessionId: "s1",
            mode: "practice",
            selectedChoiceId: "a",
            isCorrect: true,
            answeredAt: "2026-06-16T10:00:00.000Z",
          },
        ],
        sessions: [
          {
            id: "s1",
            mode: "practice",
            questionIds: ["agent-architecture-001"],
            completedAt: "2026-06-16T10:01:00.000Z",
          },
        ],
      }),
    );
    const confirm = vi.spyOn(window, "confirm").mockReturnValue(true);

    render(<App />);
    expect(screen.getByText("1")).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "Reset progress" }));

    expect(confirm).toHaveBeenCalledWith("Clear all local progress for this browser?");
    expect(localStorage.getItem("ai-architect-learning:progress:v1")).toBeNull();
    expect(screen.getByText("No attempts yet. Start a quiz to build your domain profile.")).toBeInTheDocument();

    confirm.mockRestore();
  });

  it("keeps in-memory progress and shows a warning when local save fails", async () => {
    localStorage.clear();
    const random = vi.spyOn(Math, "random").mockReturnValue(0.999);
    const setItem = vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("storage unavailable");
    });

    render(<App />);

    await userEvent.click(screen.getByRole("button", { name: "Start quiz" }));
    await userEvent.selectOptions(screen.getByLabelText("Domain"), "agent-architecture");
    await userEvent.clear(screen.getByLabelText("Question count"));
    await userEvent.type(screen.getByLabelText("Question count"), "1");
    await userEvent.click(screen.getByRole("button", { name: "Start" }));
    await userEvent.click(screen.getByRole("button", { name: /Pass the relevant document text/ }));
    await userEvent.click(screen.getByRole("button", { name: "Review session" }));

    expect(screen.getByText("Progress is available for this session, but this browser could not save it locally.")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "1 / 1 correct" })).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "Back to dashboard" }));
    expect(screen.getByText("1/1 correct")).toBeInTheDocument();

    setItem.mockRestore();
    random.mockRestore();
  });
});
