# AI Architect Learning App Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the V1 local-first Claude Certified Architect practice app described in `docs/superpowers/specs/2026-06-16-ai-architect-learning-design.md`.

**Architecture:** A client-only React + Vite + TypeScript app. Static question data is validated at test time, quiz/session logic is pure TypeScript, and browser persistence is isolated behind a small local-storage adapter.

**Tech Stack:** React, Vite, TypeScript, Vitest, Testing Library, jsdom, lucide-react, CSS modules via plain CSS files.

---

## File Structure

- `package.json`: npm scripts and dependency declarations.
- `index.html`: Vite HTML entry.
- `vite.config.ts`: Vite and Vitest configuration.
- `tsconfig.json`, `tsconfig.node.json`: TypeScript configuration.
- `src/main.tsx`: React entrypoint.
- `src/App.tsx`: top-level app state and screen routing.
- `src/styles.css`: global responsive styling.
- `src/domain/types.ts`: shared domain, question, attempt, session, and stats types.
- `src/data/questions.ts`: curated static question bank.
- `src/data/validateQuestionBank.ts`: question-bank validation.
- `src/data/validateQuestionBank.test.ts`: validation tests.
- `src/quiz/quizEngine.ts`: pure quiz session creation and answer handling.
- `src/quiz/quizEngine.test.ts`: quiz engine tests.
- `src/progress/progressStore.ts`: local-storage adapter and corrupt-data fallback.
- `src/progress/progressStore.test.ts`: persistence tests.
- `src/stats/stats.ts`: derived dashboard metrics.
- `src/stats/stats.test.ts`: stats and streak tests.
- `src/components/Dashboard.tsx`: study dashboard.
- `src/components/QuizSetup.tsx`: quiz mode/domain/count selector.
- `src/components/QuizView.tsx`: active quiz screen.
- `src/components/SessionReview.tsx`: end-of-session review.
- `src/components/SettingsPanel.tsx`: reset control.
- `src/test/setup.ts`: Testing Library setup.

## Task 1: Scaffold The React/Vite Project

**Files:**
- Create: `package.json`
- Create: `index.html`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `tsconfig.node.json`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/styles.css`
- Create: `src/test/setup.ts`

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "ai-architect-learning",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "test": "vitest run",
    "test:watch": "vitest",
    "preview": "vite preview"
  },
  "dependencies": {
    "@vitejs/plugin-react": "^5.0.0",
    "vite": "^7.0.0",
    "typescript": "^5.8.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "lucide-react": "^0.468.0"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.6.0",
    "@testing-library/react": "^16.0.0",
    "@testing-library/user-event": "^14.5.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "jsdom": "^25.0.0",
    "vitest": "^2.1.0"
  }
}
```

- [ ] **Step 2: Create Vite and TypeScript config**

Create `vite.config.ts`:

```ts
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["src/test/setup.ts"],
  },
});
```

Create `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["DOM", "DOM.Iterable", "ES2022"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

Create `tsconfig.node.json`:

```json
{
  "compilerOptions": {
    "composite": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "allowSyntheticDefaultImports": true,
    "strict": true
  },
  "include": ["vite.config.ts"]
}
```

- [ ] **Step 3: Create app shell files**

Create `index.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AI Architect Learning</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

Create `src/test/setup.ts`:

```ts
import "@testing-library/jest-dom/vitest";
```

Create `src/main.tsx`:

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

Create `src/App.tsx`:

```tsx
export default function App() {
  return (
    <main className="app-shell">
      <section className="hero-panel">
        <p className="eyebrow">Unofficial practice</p>
        <h1>AI Architect Learning</h1>
        <p>
          Practice original Claude architect questions with local progress,
          explanations, and source-backed review.
        </p>
      </section>
    </main>
  );
}
```

Create `src/styles.css`:

```css
:root {
  color: #17201c;
  background: #f5f7f3;
  font-family:
    Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
}

button,
input,
select {
  font: inherit;
}

button {
  cursor: pointer;
}

.app-shell {
  min-height: 100vh;
  padding: 32px;
}

.hero-panel {
  max-width: 960px;
}

.eyebrow {
  color: #617268;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0;
  margin: 0 0 8px;
  text-transform: uppercase;
}

h1 {
  font-size: clamp(2rem, 4vw, 4rem);
  letter-spacing: 0;
  margin: 0 0 16px;
}

p {
  line-height: 1.6;
}
```

- [ ] **Step 4: Install dependencies**

Run: `npm install`

Expected: `package-lock.json` is created and dependencies install without errors.

- [ ] **Step 5: Verify scaffold**

Run: `npm run build`

Expected: TypeScript and Vite finish successfully and create `dist/`.

- [ ] **Step 6: Commit scaffold**

```bash
git add package.json package-lock.json index.html vite.config.ts tsconfig.json tsconfig.node.json src
git commit -m "chore: scaffold react vite app"
```

## Task 2: Add Domain Types And Static Question Bank Validation

**Files:**
- Create: `src/domain/types.ts`
- Create: `src/data/questions.ts`
- Create: `src/data/validateQuestionBank.ts`
- Create: `src/data/validateQuestionBank.test.ts`

- [ ] **Step 1: Write validation tests**

Create `src/data/validateQuestionBank.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import type { Question } from "../domain/types";
import { questions } from "./questions";
import { validateQuestionBank } from "./validateQuestionBank";

const validQuestion: Question = {
  id: "sample",
  domain: "agent-architecture",
  difficulty: "foundation",
  prompt: "Which design best preserves observability in a multi-agent system?",
  choices: [
    { id: "a", text: "Route all subagent work through a coordinator." },
    { id: "b", text: "Let subagents communicate privately." },
    { id: "c", text: "Store hidden state in each subagent." },
    { id: "d", text: "Avoid explicit task boundaries." }
  ],
  correctChoiceId: "a",
  explanation: "A coordinator keeps delegation and aggregation visible.",
  choiceExplanations: {
    a: "This is correct because coordinator-mediated delegation preserves observability.",
    b: "Private subagent communication makes behaviour harder to audit.",
    c: "Hidden state makes results hard to reproduce.",
    d: "Unclear task boundaries reduce reliability."
  },
  sources: [{ title: "Claude docs", url: "https://platform.claude.com/docs/en/intro" }]
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
      choiceExplanations: { a: "Only one explanation" }
    };
    expect(validateQuestionBank([invalid])).toContain("sample must explain every choice");
  });

  it("rejects questions without sources", () => {
    const invalid = { ...validQuestion, sources: [] };
    expect(validateQuestionBank([invalid])).toContain("sample must have at least one source");
  });

  it("keeps the shipped bank valid", () => {
    expect(validateQuestionBank(questions)).toEqual([]);
  });
});
```

- [ ] **Step 2: Run tests to verify failure**

Run: `npm test -- src/data/validateQuestionBank.test.ts`

Expected: FAIL because `src/domain/types.ts`, `src/data/questions.ts`, and `src/data/validateQuestionBank.ts` do not exist.

- [ ] **Step 3: Add shared types**

Create `src/domain/types.ts`:

```ts
export type Domain =
  | "agent-architecture"
  | "tool-mcp"
  | "claude-code"
  | "prompt-structured-output"
  | "context-reliability";

export type Difficulty = "foundation" | "applied" | "scenario";

export type QuizMode = "practice" | "exam";

export type Choice = {
  id: string;
  text: string;
};

export type SourceLink = {
  title: string;
  url: string;
};

export type Question = {
  id: string;
  domain: Domain;
  difficulty: Difficulty;
  prompt: string;
  choices: Choice[];
  correctChoiceId: string;
  explanation: string;
  choiceExplanations: Record<string, string>;
  sources: SourceLink[];
};

export type Attempt = {
  questionId: string;
  sessionId: string;
  mode: QuizMode;
  selectedChoiceId: string;
  isCorrect: boolean;
  answeredAt: string;
};

export type CompletedSession = {
  id: string;
  mode: QuizMode;
  questionIds: string[];
  completedAt: string;
};
```

- [ ] **Step 4: Add initial static questions**

Create `src/data/questions.ts`:

```ts
import type { Question } from "../domain/types";

export const questions: Question[] = [
  {
    id: "agent-architecture-001",
    domain: "agent-architecture",
    difficulty: "foundation",
    prompt:
      "A coordinator delegates document analysis to three specialised subagents. What is the safest way to give each subagent the context it needs?",
    choices: [
      { id: "a", text: "Pass the relevant document text, prior findings, and output requirements explicitly in each subagent task." },
      { id: "b", text: "Assume every subagent can read the coordinator's full conversation history." },
      { id: "c", text: "Ask subagents to infer missing requirements from their names." },
      { id: "d", text: "Store hidden shared state outside the task prompts." }
    ],
    correctChoiceId: "a",
    explanation:
      "Subagents should receive the context they need explicitly. That keeps delegation observable and avoids relying on hidden or unavailable state.",
    choiceExplanations: {
      a: "Correct. Explicit context passing makes the task reproducible and auditable.",
      b: "Incorrect. Isolated agent contexts should not be assumed to inherit the coordinator history.",
      c: "Incorrect. Agent names are not a reliable substitute for task requirements.",
      d: "Incorrect. Hidden shared state makes behaviour harder to test and review."
    },
    sources: [
      {
        title: "Claude docs: Intro to Claude",
        url: "https://platform.claude.com/docs/en/intro"
      }
    ]
  },
  {
    id: "tool-mcp-001",
    domain: "tool-mcp",
    difficulty: "applied",
    prompt:
      "A Claude integration has two similar tools, `search_customer` and `lookup_order`. What most directly reduces incorrect tool selection?",
    choices: [
      { id: "a", text: "Write distinct tool descriptions that explain when each tool should be used and what it returns." },
      { id: "b", text: "Give both tools short descriptions so the model has less context to process." },
      { id: "c", text: "Hide input constraints and validate only after execution." },
      { id: "d", text: "Use the same schema for every tool so selection is uniform." }
    ],
    correctChoiceId: "a",
    explanation:
      "Tool descriptions are a primary signal for tool choice. Distinct descriptions with usage guidance reduce ambiguity between overlapping tools.",
    choiceExplanations: {
      a: "Correct. Clear descriptions help the model choose the right tool.",
      b: "Incorrect. Overly terse descriptions increase ambiguity.",
      c: "Incorrect. Input constraints should be visible before the tool call.",
      d: "Incorrect. Uniform schemas do not explain semantic differences between tools."
    },
    sources: [
      {
        title: "Claude docs: Tool use",
        url: "https://platform.claude.com/docs/en/build-with-claude/tool-use"
      }
    ]
  },
  {
    id: "structured-output-001",
    domain: "prompt-structured-output",
    difficulty: "foundation",
    prompt:
      "For an extraction workflow where some fields may be absent, which schema design best reduces fabrication?",
    choices: [
      { id: "a", text: "Make absent fields nullable and reserve required fields for data that is always available." },
      { id: "b", text: "Mark every field required so the model always returns complete JSON." },
      { id: "c", text: "Avoid schemas and ask for JSON in prose." },
      { id: "d", text: "Use free-text fields for all values." }
    ],
    correctChoiceId: "a",
    explanation:
      "Nullable fields allow the model to represent missing information directly instead of guessing. Required fields should be used only when the data is always present.",
    choiceExplanations: {
      a: "Correct. Nullable optional data supports honest absence.",
      b: "Incorrect. Required unavailable fields pressure the model to invent values.",
      c: "Incorrect. Prose JSON instructions are weaker than schema-constrained output.",
      d: "Incorrect. Free-text fields lose validation and increase ambiguity."
    },
    sources: [
      {
        title: "Claude docs: Structured outputs",
        url: "https://platform.claude.com/docs/en/build-with-claude/structured-outputs"
      }
    ]
  },
  {
    id: "context-reliability-001",
    domain: "context-reliability",
    difficulty: "applied",
    prompt:
      "A long-running support conversation accumulates large tool results. What should the architect do first to reduce context pressure?",
    choices: [
      { id: "a", text: "Return only fields the model needs and summarise older conversation state carefully." },
      { id: "b", text: "Append every raw API response forever." },
      { id: "c", text: "Remove the system prompt after the first turn." },
      { id: "d", text: "Ask the user to repeat all key facts each time." }
    ],
    correctChoiceId: "a",
    explanation:
      "Context includes tool results, system instructions, and message history. Reducing unnecessary tool output and carefully preserving important state lowers context pressure.",
    choiceExplanations: {
      a: "Correct. Smaller tool results and careful summarisation preserve useful context.",
      b: "Incorrect. Raw responses can quickly waste context.",
      c: "Incorrect. System instructions remain important across turns.",
      d: "Incorrect. The app should manage context rather than shifting that burden to the user."
    },
    sources: [
      {
        title: "Claude docs: Context windows",
        url: "https://platform.claude.com/docs/en/build-with-claude/context-windows"
      }
    ]
  },
  {
    id: "claude-code-001",
    domain: "claude-code",
    difficulty: "foundation",
    prompt:
      "A team wants shared Claude Code instructions for a repository. Where should those instructions live?",
    choices: [
      { id: "a", text: "In a repository-level CLAUDE.md or project Claude configuration committed with the code." },
      { id: "b", text: "Only in one developer's home-directory configuration." },
      { id: "c", text: "Only in the pull request description." },
      { id: "d", text: "In an untracked local note." }
    ],
    correctChoiceId: "a",
    explanation:
      "Shared project instructions should live with the repository so all contributors and agent sessions can use the same guidance.",
    choiceExplanations: {
      a: "Correct. Repository-level instructions are shared and reviewable.",
      b: "Incorrect. User-level configuration is personal and not shared with the team.",
      c: "Incorrect. Pull request descriptions are not persistent project instructions.",
      d: "Incorrect. Untracked notes are invisible to other contributors."
    },
    sources: [
      {
        title: "Claude Code docs: Memory",
        url: "https://code.claude.com/docs/en/memory"
      }
    ]
  }
];
```

- [ ] **Step 5: Add validator implementation**

Create `src/data/validateQuestionBank.ts`:

```ts
import type { Question } from "../domain/types";

export function validateQuestionBank(bank: Question[]): string[] {
  const errors: string[] = [];
  const ids = new Set<string>();

  for (const question of bank) {
    if (ids.has(question.id)) {
      errors.push(`${question.id} must be unique`);
    }
    ids.add(question.id);

    if (question.choices.length !== 4) {
      errors.push(`${question.id} must have exactly four choices`);
    }

    const choiceIds = new Set(question.choices.map((choice) => choice.id));
    if (!choiceIds.has(question.correctChoiceId)) {
      errors.push(`${question.id} correctChoiceId must match a choice id`);
    }

    const hasEveryChoiceExplanation = question.choices.every(
      (choice) => typeof question.choiceExplanations[choice.id] === "string" && question.choiceExplanations[choice.id].trim().length > 0,
    );
    if (!hasEveryChoiceExplanation) {
      errors.push(`${question.id} must explain every choice`);
    }

    if (question.sources.length < 1) {
      errors.push(`${question.id} must have at least one source`);
    }

    for (const source of question.sources) {
      try {
        new URL(source.url);
      } catch {
        errors.push(`${question.id} source must be a valid URL`);
      }
    }
  }

  return errors;
}
```

- [ ] **Step 6: Run validation tests**

Run: `npm test -- src/data/validateQuestionBank.test.ts`

Expected: PASS.

- [ ] **Step 7: Commit question data foundation**

```bash
git add src/domain src/data
git commit -m "feat: add source-backed question bank"
```

## Task 3: Implement Local Progress Storage

**Files:**
- Create: `src/progress/progressStore.ts`
- Create: `src/progress/progressStore.test.ts`

- [ ] **Step 1: Write persistence tests**

Create `src/progress/progressStore.test.ts`:

```ts
import { beforeEach, describe, expect, it } from "vitest";
import type { Attempt, CompletedSession } from "../domain/types";
import { createProgressStore } from "./progressStore";

const attempt: Attempt = {
  questionId: "agent-architecture-001",
  sessionId: "session-1",
  mode: "practice",
  selectedChoiceId: "a",
  isCorrect: true,
  answeredAt: "2026-06-16T10:00:00.000Z"
};

const session: CompletedSession = {
  id: "session-1",
  mode: "practice",
  questionIds: ["agent-architecture-001"],
  completedAt: "2026-06-16T10:01:00.000Z"
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

  it("clears saved progress", () => {
    const store = createProgressStore(localStorage);
    store.save({ attempts: [attempt], sessions: [session] });
    store.clear();
    expect(store.load()).toEqual({ attempts: [], sessions: [] });
  });
});
```

- [ ] **Step 2: Run tests to verify failure**

Run: `npm test -- src/progress/progressStore.test.ts`

Expected: FAIL because `progressStore.ts` does not exist.

- [ ] **Step 3: Add storage adapter**

Create `src/progress/progressStore.ts`:

```ts
import type { Attempt, CompletedSession } from "../domain/types";

export type ProgressState = {
  attempts: Attempt[];
  sessions: CompletedSession[];
};

const STORAGE_KEY = "ai-architect-learning:progress:v1";

const emptyProgress = (): ProgressState => ({ attempts: [], sessions: [] });

function isProgressState(value: unknown): value is ProgressState {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Partial<ProgressState>;
  return Array.isArray(candidate.attempts) && Array.isArray(candidate.sessions);
}

export function createProgressStore(storage: Storage) {
  return {
    load(): ProgressState {
      const raw = storage.getItem(STORAGE_KEY);
      if (!raw) {
        return emptyProgress();
      }

      try {
        const parsed = JSON.parse(raw);
        return isProgressState(parsed) ? parsed : emptyProgress();
      } catch {
        return emptyProgress();
      }
    },

    save(progress: ProgressState): void {
      storage.setItem(STORAGE_KEY, JSON.stringify(progress));
    },

    clear(): void {
      storage.removeItem(STORAGE_KEY);
    },
  };
}
```

- [ ] **Step 4: Run persistence tests**

Run: `npm test -- src/progress/progressStore.test.ts`

Expected: PASS.

- [ ] **Step 5: Commit progress storage**

```bash
git add src/progress
git commit -m "feat: persist local progress"
```

## Task 4: Implement Quiz Engine

**Files:**
- Create: `src/quiz/quizEngine.ts`
- Create: `src/quiz/quizEngine.test.ts`

- [ ] **Step 1: Write quiz engine tests**

Create `src/quiz/quizEngine.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { questions } from "../data/questions";
import { answerQuestion, createQuizSession, finishSession } from "./quizEngine";

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
```

- [ ] **Step 2: Run tests to verify failure**

Run: `npm test -- src/quiz/quizEngine.test.ts`

Expected: FAIL because `quizEngine.ts` does not exist.

- [ ] **Step 3: Implement quiz engine**

Create `src/quiz/quizEngine.ts`:

```ts
import type { Domain, Question, QuizMode } from "../domain/types";

export type QuizAnswer = {
  selectedChoiceId: string;
  isCorrect: boolean;
  answeredAt: string;
  isRevealed: boolean;
};

export type QuizSession = {
  id: string;
  mode: QuizMode;
  questions: Question[];
  currentIndex: number;
  startedAt: string;
  answers: Record<string, QuizAnswer>;
  isComplete: boolean;
};

export type CreateQuizSessionInput = {
  questions: Question[];
  mode: QuizMode;
  domain: Domain | "all";
  count: number;
  now: Date;
};

export function createQuizSession(input: CreateQuizSessionInput): QuizSession {
  const filtered =
    input.domain === "all"
      ? input.questions
      : input.questions.filter((question) => question.domain === input.domain);

  return {
    id: `session-${input.now.getTime()}`,
    mode: input.mode,
    questions: filtered.slice(0, input.count),
    currentIndex: 0,
    startedAt: input.now.toISOString(),
    answers: {},
    isComplete: false,
  };
}

export function answerQuestion(session: QuizSession, selectedChoiceId: string, now: Date): QuizSession {
  const currentQuestion = session.questions[session.currentIndex];
  if (!currentQuestion) {
    return session;
  }

  const isCorrect = selectedChoiceId === currentQuestion.correctChoiceId;
  const answers = {
    ...session.answers,
    [currentQuestion.id]: {
      selectedChoiceId,
      isCorrect,
      answeredAt: now.toISOString(),
      isRevealed: session.mode === "practice",
    },
  };

  const nextIndex = Math.min(session.currentIndex + 1, session.questions.length - 1);
  const answeredCount = Object.keys(answers).length;

  return {
    ...session,
    answers,
    currentIndex: nextIndex,
    isComplete: answeredCount === session.questions.length,
  };
}

export function finishSession(session: QuizSession): QuizSession {
  const revealedAnswers = Object.fromEntries(
    Object.entries(session.answers).map(([questionId, answer]) => [
      questionId,
      { ...answer, isRevealed: true },
    ]),
  );

  return {
    ...session,
    answers: revealedAnswers,
    isComplete: true,
  };
}
```

- [ ] **Step 4: Run quiz engine tests**

Run: `npm test -- src/quiz/quizEngine.test.ts`

Expected: PASS.

- [ ] **Step 5: Commit quiz engine**

```bash
git add src/quiz
git commit -m "feat: add quiz session engine"
```

## Task 5: Implement Derived Study Stats

**Files:**
- Create: `src/stats/stats.ts`
- Create: `src/stats/stats.test.ts`

- [ ] **Step 1: Write stats tests**

Create `src/stats/stats.test.ts`:

```ts
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
    answeredAt: "2026-06-15T10:00:00.000Z"
  },
  {
    questionId: "tool-mcp-001",
    sessionId: "s2",
    mode: "practice",
    selectedChoiceId: "b",
    isCorrect: false,
    answeredAt: "2026-06-16T10:00:00.000Z"
  }
];

const sessions: CompletedSession[] = [
  { id: "s1", mode: "practice", questionIds: ["agent-architecture-001"], completedAt: "2026-06-15T10:01:00.000Z" },
  { id: "s2", mode: "practice", questionIds: ["tool-mcp-001"], completedAt: "2026-06-16T10:01:00.000Z" }
];

describe("calculateDashboardStats", () => {
  it("calculates totals and accuracy", () => {
    const stats = calculateDashboardStats({ attempts, sessions }, new Date("2026-06-16T12:00:00.000Z"));
    expect(stats.totalAnswered).toBe(2);
    expect(stats.accuracy).toBe(50);
  });

  it("calculates current streak from completed session days", () => {
    const stats = calculateDashboardStats({ attempts, sessions }, new Date("2026-06-16T12:00:00.000Z"));
    expect(stats.currentStreak).toBe(2);
  });

  it("finds weakest domains using question lookup", () => {
    const stats = calculateDashboardStats({ attempts, sessions }, new Date("2026-06-16T12:00:00.000Z"));
    expect(stats.weakestDomains[0]).toEqual({
      domain: "tool-mcp",
      accuracy: 0,
      answered: 1
    });
  });
});
```

- [ ] **Step 2: Run tests to verify failure**

Run: `npm test -- src/stats/stats.test.ts`

Expected: FAIL because `stats.ts` does not exist.

- [ ] **Step 3: Implement stats derivation**

Create `src/stats/stats.ts`:

```ts
import { questions } from "../data/questions";
import type { Domain } from "../domain/types";
import type { ProgressState } from "../progress/progressStore";

export type DomainStat = {
  domain: Domain;
  accuracy: number;
  answered: number;
};

export type DashboardStats = {
  totalAnswered: number;
  accuracy: number;
  currentStreak: number;
  weakestDomains: DomainStat[];
};

const questionDomainById = new Map(questions.map((question) => [question.id, question.domain]));

function toDay(value: string | Date): string {
  return new Date(value).toISOString().slice(0, 10);
}

function previousDay(day: string): string {
  const date = new Date(`${day}T00:00:00.000Z`);
  date.setUTCDate(date.getUTCDate() - 1);
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
    .sort((a, b) => a.accuracy - b.accuracy || b.answered - a.answered)
    .slice(0, 3);

  return {
    totalAnswered,
    accuracy,
    currentStreak,
    weakestDomains,
  };
}
```

- [ ] **Step 4: Run stats tests**

Run: `npm test -- src/stats/stats.test.ts`

Expected: PASS.

- [ ] **Step 5: Commit stats**

```bash
git add src/stats
git commit -m "feat: derive study dashboard stats"
```

## Task 6: Build Dashboard And Quiz Setup UI

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/styles.css`
- Create: `src/components/Dashboard.tsx`
- Create: `src/components/QuizSetup.tsx`

- [ ] **Step 1: Create dashboard component**

Create `src/components/Dashboard.tsx`:

```tsx
import { BarChart3, Flame, Target, Trophy } from "lucide-react";
import type { DashboardStats } from "../stats/stats";

type DashboardProps = {
  stats: DashboardStats;
  onStartQuiz: () => void;
};

export function Dashboard({ stats, onStartQuiz }: DashboardProps) {
  return (
    <section className="dashboard" aria-labelledby="dashboard-title">
      <div className="dashboard-header">
        <div>
          <p className="eyebrow">Unofficial practice</p>
          <h1 id="dashboard-title">AI Architect Learning</h1>
        </div>
        <button className="primary-button" onClick={onStartQuiz}>
          <Target size={18} aria-hidden="true" />
          Start quiz
        </button>
      </div>

      <div className="metric-grid">
        <article className="metric">
          <Flame size={20} aria-hidden="true" />
          <span>Streak</span>
          <strong>{stats.currentStreak} days</strong>
        </article>
        <article className="metric">
          <BarChart3 size={20} aria-hidden="true" />
          <span>Answered</span>
          <strong>{stats.totalAnswered}</strong>
        </article>
        <article className="metric">
          <Trophy size={20} aria-hidden="true" />
          <span>Accuracy</span>
          <strong>{stats.accuracy}%</strong>
        </article>
      </div>

      <section className="panel">
        <h2>Weakest domains</h2>
        {stats.weakestDomains.length === 0 ? (
          <p>No attempts yet. Start a quiz to build your domain profile.</p>
        ) : (
          <ul className="domain-list">
            {stats.weakestDomains.map((domain) => (
              <li key={domain.domain}>
                <span>{domain.domain}</span>
                <strong>{domain.accuracy}%</strong>
              </li>
            ))}
          </ul>
        )}
      </section>
    </section>
  );
}
```

- [ ] **Step 2: Create quiz setup component**

Create `src/components/QuizSetup.tsx`:

```tsx
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
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    onStart({
      mode: form.get("mode") as QuizMode,
      domain: form.get("domain") as Domain | "all",
      count: Number(form.get("count")),
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
        <select name="domain" defaultValue="all">
          {domainOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label>
        Question count
        <input min={1} max={maxCount} name="count" type="number" defaultValue={Math.min(5, maxCount)} />
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
```

- [ ] **Step 3: Wire dashboard and setup into `App.tsx`**

Replace `src/App.tsx` with:

```tsx
import { useMemo, useState } from "react";
import { questions } from "./data/questions";
import { createProgressStore } from "./progress/progressStore";
import { calculateDashboardStats } from "./stats/stats";
import { Dashboard } from "./components/Dashboard";
import { QuizSetup, type QuizSetupValues } from "./components/QuizSetup";

type Screen = "dashboard" | "setup";

const progressStore = createProgressStore(window.localStorage);

export default function App() {
  const [screen, setScreen] = useState<Screen>("dashboard");
  const [progress] = useState(() => progressStore.load());
  const stats = useMemo(() => calculateDashboardStats(progress, new Date()), [progress]);

  function startQuiz(_values: QuizSetupValues) {
    setScreen("dashboard");
  }

  return (
    <main className="app-shell">
      {screen === "dashboard" ? (
        <Dashboard stats={stats} onStartQuiz={() => setScreen("setup")} />
      ) : (
        <QuizSetup maxCount={questions.length} onCancel={() => setScreen("dashboard")} onStart={startQuiz} />
      )}
    </main>
  );
}
```

- [ ] **Step 4: Extend styles**

Append to `src/styles.css`:

```css
.dashboard,
.quiz-setup {
  max-width: 1080px;
}

.dashboard-header,
.button-row {
  align-items: center;
  display: flex;
  gap: 16px;
  justify-content: space-between;
}

.primary-button,
.secondary-button {
  align-items: center;
  border: 0;
  border-radius: 8px;
  display: inline-flex;
  font-weight: 700;
  gap: 8px;
  min-height: 44px;
  padding: 0 16px;
}

.primary-button {
  background: #1f6f55;
  color: #ffffff;
}

.secondary-button {
  background: #e3e8df;
  color: #17201c;
}

.metric-grid {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin: 28px 0;
}

.metric,
.panel {
  background: #ffffff;
  border: 1px solid #dfe6dc;
  border-radius: 8px;
  padding: 20px;
}

.metric {
  display: grid;
  gap: 8px;
}

.metric span,
.domain-list span {
  color: #617268;
}

.metric strong {
  font-size: 1.8rem;
}

.domain-list {
  display: grid;
  gap: 10px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.domain-list li {
  align-items: center;
  border-top: 1px solid #edf1ea;
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
}

label {
  display: grid;
  font-weight: 700;
  gap: 8px;
  margin: 16px 0;
}

select,
input {
  border: 1px solid #c8d2c4;
  border-radius: 8px;
  min-height: 44px;
  padding: 0 12px;
}

@media (max-width: 720px) {
  .app-shell {
    padding: 20px;
  }

  .dashboard-header,
  .button-row {
    align-items: stretch;
    flex-direction: column;
  }

  .metric-grid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 5: Verify UI compiles**

Run: `npm run build`

Expected: PASS.

- [ ] **Step 6: Commit dashboard/setup UI**

```bash
git add src/App.tsx src/styles.css src/components
git commit -m "feat: add dashboard and quiz setup"
```

## Task 7: Build Quiz Flow And Review

**Files:**
- Modify: `src/App.tsx`
- Create: `src/components/QuizView.tsx`
- Create: `src/components/SessionReview.tsx`
- Modify: `src/styles.css`

- [ ] **Step 1: Create quiz view component**

Create `src/components/QuizView.tsx`:

```tsx
import type { Question } from "../domain/types";
import type { QuizAnswer, QuizSession } from "../quiz/quizEngine";

type QuizViewProps = {
  session: QuizSession;
  onAnswer: (choiceId: string) => void;
  onFinish: () => void;
};

function Explanation({ question, answer }: { question: Question; answer: QuizAnswer }) {
  if (!answer.isRevealed) {
    return null;
  }

  return (
    <section className={answer.isCorrect ? "feedback correct" : "feedback incorrect"}>
      <h2>{answer.isCorrect ? "Correct" : "Review this one"}</h2>
      <p>{question.explanation}</p>
      <p>{question.choiceExplanations[answer.selectedChoiceId]}</p>
      <div className="source-list">
        {question.sources.map((source) => (
          <a key={source.url} href={source.url} target="_blank" rel="noreferrer">
            {source.title}
          </a>
        ))}
      </div>
    </section>
  );
}

export function QuizView({ session, onAnswer, onFinish }: QuizViewProps) {
  const question = session.questions[session.currentIndex];
  const answer = question ? session.answers[question.id] : undefined;

  if (!question) {
    return (
      <section className="panel">
        <h1>No questions available</h1>
        <button className="primary-button" onClick={onFinish}>
          Back to dashboard
        </button>
      </section>
    );
  }

  const isAnswered = Boolean(answer);

  return (
    <section className="quiz-card">
      <p className="eyebrow">
        Question {session.currentIndex + 1} of {session.questions.length}
      </p>
      <h1>{question.prompt}</h1>

      <div className="choice-grid">
        {question.choices.map((choice) => (
          <button
            key={choice.id}
            className="choice-button"
            disabled={isAnswered}
            onClick={() => onAnswer(choice.id)}
          >
            <span>{choice.id.toUpperCase()}</span>
            {choice.text}
          </button>
        ))}
      </div>

      {answer ? <Explanation question={question} answer={answer} /> : null}

      {session.isComplete ? (
        <button className="primary-button" onClick={onFinish}>
          Review session
        </button>
      ) : null}
    </section>
  );
}
```

- [ ] **Step 2: Create session review component**

Create `src/components/SessionReview.tsx`:

```tsx
import type { QuizSession } from "../quiz/quizEngine";

type SessionReviewProps = {
  session: QuizSession;
  onDone: () => void;
};

export function SessionReview({ session, onDone }: SessionReviewProps) {
  const correct = Object.values(session.answers).filter((answer) => answer.isCorrect).length;
  const total = session.questions.length;

  return (
    <section className="review">
      <div className="panel">
        <p className="eyebrow">Session review</p>
        <h1>
          {correct} / {total} correct
        </h1>
        <button className="primary-button" onClick={onDone}>
          Back to dashboard
        </button>
      </div>

      {session.questions.map((question) => {
        const answer = session.answers[question.id];
        return (
          <article className="panel review-item" key={question.id}>
            <h2>{question.prompt}</h2>
            <p>
              Your answer:{" "}
              <strong>{question.choices.find((choice) => choice.id === answer?.selectedChoiceId)?.text}</strong>
            </p>
            <p>{question.explanation}</p>
            {answer ? <p>{question.choiceExplanations[answer.selectedChoiceId]}</p> : null}
            <div className="source-list">
              {question.sources.map((source) => (
                <a key={source.url} href={source.url} target="_blank" rel="noreferrer">
                  {source.title}
                </a>
              ))}
            </div>
          </article>
        );
      })}
    </section>
  );
}
```

- [ ] **Step 3: Wire quiz flow into `App.tsx`**

Replace `src/App.tsx` with:

```tsx
import { useMemo, useState } from "react";
import { questions } from "./data/questions";
import type { Attempt, CompletedSession } from "./domain/types";
import { createProgressStore, type ProgressState } from "./progress/progressStore";
import { answerQuestion, createQuizSession, finishSession, type QuizSession } from "./quiz/quizEngine";
import { calculateDashboardStats } from "./stats/stats";
import { Dashboard } from "./components/Dashboard";
import { QuizSetup, type QuizSetupValues } from "./components/QuizSetup";
import { QuizView } from "./components/QuizView";
import { SessionReview } from "./components/SessionReview";

type Screen = "dashboard" | "setup" | "quiz" | "review";

const progressStore = createProgressStore(window.localStorage);

function sessionToProgress(session: QuizSession): { attempts: Attempt[]; completedSession: CompletedSession } {
  const attempts = Object.entries(session.answers).map(([questionId, answer]) => ({
    questionId,
    sessionId: session.id,
    mode: session.mode,
    selectedChoiceId: answer.selectedChoiceId,
    isCorrect: answer.isCorrect,
    answeredAt: answer.answeredAt,
  }));

  return {
    attempts,
    completedSession: {
      id: session.id,
      mode: session.mode,
      questionIds: session.questions.map((question) => question.id),
      completedAt: new Date().toISOString(),
    },
  };
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("dashboard");
  const [progress, setProgress] = useState<ProgressState>(() => progressStore.load());
  const [activeSession, setActiveSession] = useState<QuizSession | null>(null);
  const stats = useMemo(() => calculateDashboardStats(progress, new Date()), [progress]);

  function persistProgress(next: ProgressState) {
    setProgress(next);
    progressStore.save(next);
  }

  function startQuiz(values: QuizSetupValues) {
    const session = createQuizSession({
      questions,
      mode: values.mode,
      domain: values.domain,
      count: values.count,
      now: new Date(),
    });
    setActiveSession(session);
    setScreen("quiz");
  }

  function answerActiveQuestion(choiceId: string) {
    if (!activeSession) {
      return;
    }
    setActiveSession(answerQuestion(activeSession, choiceId, new Date()));
  }

  function finishActiveSession() {
    if (!activeSession) {
      return;
    }
    const finished = finishSession(activeSession);
    const result = sessionToProgress(finished);
    persistProgress({
      attempts: [...progress.attempts, ...result.attempts],
      sessions: [...progress.sessions, result.completedSession],
    });
    setActiveSession(finished);
    setScreen("review");
  }

  return (
    <main className="app-shell">
      {screen === "dashboard" ? (
        <Dashboard stats={stats} onStartQuiz={() => setScreen("setup")} />
      ) : null}
      {screen === "setup" ? (
        <QuizSetup maxCount={questions.length} onCancel={() => setScreen("dashboard")} onStart={startQuiz} />
      ) : null}
      {screen === "quiz" && activeSession ? (
        <QuizView session={activeSession} onAnswer={answerActiveQuestion} onFinish={finishActiveSession} />
      ) : null}
      {screen === "review" && activeSession ? (
        <SessionReview session={activeSession} onDone={() => setScreen("dashboard")} />
      ) : null}
    </main>
  );
}
```

- [ ] **Step 4: Add quiz styles**

Append to `src/styles.css`:

```css
.quiz-card,
.review {
  max-width: 960px;
}

.choice-grid {
  display: grid;
  gap: 12px;
  margin: 24px 0;
}

.choice-button {
  align-items: start;
  background: #ffffff;
  border: 1px solid #d3ddcf;
  border-radius: 8px;
  color: #17201c;
  display: grid;
  gap: 10px;
  grid-template-columns: 32px 1fr;
  min-height: 64px;
  padding: 16px;
  text-align: left;
}

.choice-button span {
  align-items: center;
  background: #e9efe6;
  border-radius: 999px;
  display: inline-flex;
  font-weight: 800;
  height: 28px;
  justify-content: center;
  width: 28px;
}

.choice-button:disabled {
  cursor: default;
  opacity: 0.76;
}

.feedback {
  border-radius: 8px;
  margin: 20px 0;
  padding: 18px;
}

.feedback.correct {
  background: #e5f4eb;
  border: 1px solid #a5d8b8;
}

.feedback.incorrect {
  background: #fff0e3;
  border: 1px solid #e8bd91;
}

.source-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.source-list a {
  color: #1f6f55;
  font-weight: 700;
}

.review {
  display: grid;
  gap: 16px;
}
```

- [ ] **Step 5: Run build and tests**

Run: `npm test`

Expected: PASS.

Run: `npm run build`

Expected: PASS.

- [ ] **Step 6: Commit quiz flow**

```bash
git add src/App.tsx src/components/QuizView.tsx src/components/SessionReview.tsx src/styles.css
git commit -m "feat: add practice and exam quiz flows"
```

## Task 8: Add Reset Control

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/components/Dashboard.tsx`
- Create: `src/components/SettingsPanel.tsx`
- Modify: `src/styles.css`

- [ ] **Step 1: Add settings panel**

Create `src/components/SettingsPanel.tsx`:

```tsx
type SettingsPanelProps = {
  onResetProgress: () => void;
};

export function SettingsPanel({ onResetProgress }: SettingsPanelProps) {
  function handleReset() {
    const confirmed = window.confirm("Clear all local progress for this browser?");
    if (confirmed) {
      onResetProgress();
    }
  }

  return (
    <section className="panel settings-panel">
      <h2>Settings</h2>
      <p>Progress is stored only in this browser.</p>
      <button className="secondary-button danger-button" onClick={handleReset}>
        Reset progress
      </button>
    </section>
  );
}
```

- [ ] **Step 2: Render settings from dashboard**

Modify `src/components/Dashboard.tsx` props and render:

```tsx
import { BarChart3, Flame, Target, Trophy } from "lucide-react";
import { SettingsPanel } from "./SettingsPanel";
import type { DashboardStats } from "../stats/stats";

type DashboardProps = {
  stats: DashboardStats;
  onStartQuiz: () => void;
  onResetProgress: () => void;
};

export function Dashboard({ stats, onStartQuiz, onResetProgress }: DashboardProps) {
  return (
    <section className="dashboard" aria-labelledby="dashboard-title">
      <div className="dashboard-header">
        <div>
          <p className="eyebrow">Unofficial practice</p>
          <h1 id="dashboard-title">AI Architect Learning</h1>
        </div>
        <button className="primary-button" onClick={onStartQuiz}>
          <Target size={18} aria-hidden="true" />
          Start quiz
        </button>
      </div>

      <div className="metric-grid">
        <article className="metric">
          <Flame size={20} aria-hidden="true" />
          <span>Streak</span>
          <strong>{stats.currentStreak} days</strong>
        </article>
        <article className="metric">
          <BarChart3 size={20} aria-hidden="true" />
          <span>Answered</span>
          <strong>{stats.totalAnswered}</strong>
        </article>
        <article className="metric">
          <Trophy size={20} aria-hidden="true" />
          <span>Accuracy</span>
          <strong>{stats.accuracy}%</strong>
        </article>
      </div>

      <section className="panel">
        <h2>Weakest domains</h2>
        {stats.weakestDomains.length === 0 ? (
          <p>No attempts yet. Start a quiz to build your domain profile.</p>
        ) : (
          <ul className="domain-list">
            {stats.weakestDomains.map((domain) => (
              <li key={domain.domain}>
                <span>{domain.domain}</span>
                <strong>{domain.accuracy}%</strong>
              </li>
            ))}
          </ul>
        )}
      </section>

      <SettingsPanel onResetProgress={onResetProgress} />
    </section>
  );
}
```

- [ ] **Step 3: Wire reset in `App.tsx`**

Change the dashboard render in `src/App.tsx` to:

```tsx
<Dashboard
  stats={stats}
  onStartQuiz={() => setScreen("setup")}
  onResetProgress={() => {
    progressStore.clear();
    setProgress({ attempts: [], sessions: [] });
  }}
/>
```

- [ ] **Step 4: Add reset styles**

Append to `src/styles.css`:

```css
.settings-panel {
  margin-top: 16px;
}

.danger-button {
  border: 1px solid #c77d6b;
  color: #8b2f22;
}
```

- [ ] **Step 5: Run complete automated verification**

Run: `npm test`

Expected: PASS.

Run: `npm run build`

Expected: PASS.

- [ ] **Step 6: Run local browser verification**

Run: `npm run dev`

Expected: Vite prints a local URL such as `http://localhost:5173/`.

Open the app in the browser and verify:

- Dashboard is the first screen.
- Start quiz opens setup.
- Practice mode shows explanation and source links immediately after answering.
- Exam-style mode shows explanations only after session review.
- Reload preserves answered count and accuracy.
- Reset progress clears dashboard metrics after confirmation.
- Layout works at desktop width and mobile width.

- [ ] **Step 7: Commit reset and final verification changes**

```bash
git add src/App.tsx src/components/Dashboard.tsx src/components/SettingsPanel.tsx src/styles.css
git commit -m "feat: add local progress reset"
```

## Task 9: Add Spec Coverage Polish

**Files:**
- Modify: `src/stats/stats.ts`
- Modify: `src/stats/stats.test.ts`
- Modify: `src/App.tsx`
- Modify: `src/components/Dashboard.tsx`
- Modify: `src/components/SessionReview.tsx`
- Modify: `src/styles.css`

- [ ] **Step 1: Extend stats tests for recent sessions**

Modify `src/stats/stats.test.ts` by adding this test inside the existing `describe` block:

```ts
  it("returns recent sessions newest first", () => {
    const stats = calculateDashboardStats({ attempts, sessions }, new Date("2026-06-16T12:00:00.000Z"));
    expect(stats.recentSessions).toEqual([
      {
        id: "s2",
        mode: "practice",
        completedAt: "2026-06-16T10:01:00.000Z",
        questionCount: 1,
        correctCount: 0,
        accuracy: 0
      },
      {
        id: "s1",
        mode: "practice",
        completedAt: "2026-06-15T10:01:00.000Z",
        questionCount: 1,
        correctCount: 1,
        accuracy: 100
      }
    ]);
  });
```

- [ ] **Step 2: Run stats tests to verify failure**

Run: `npm test -- src/stats/stats.test.ts`

Expected: FAIL because `recentSessions` is not yet returned.

- [ ] **Step 3: Add recent sessions to stats**

Modify `src/stats/stats.ts` so the exported types and return value include recent sessions:

```ts
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
  return new Date(value).toISOString().slice(0, 10);
}

function previousDay(day: string): string {
  const date = new Date(`${day}T00:00:00.000Z`);
  date.setUTCDate(date.getUTCDate() - 1);
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
    .sort((a, b) => a.accuracy - b.accuracy || b.answered - a.answered)
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
```

- [ ] **Step 4: Add recent sessions and storage warning to dashboard**

Modify `src/components/Dashboard.tsx` to accept `storageWarning` and render recent sessions:

```tsx
import { BarChart3, Flame, Target, Trophy } from "lucide-react";
import { SettingsPanel } from "./SettingsPanel";
import type { DashboardStats } from "../stats/stats";

type DashboardProps = {
  stats: DashboardStats;
  storageWarning: string | null;
  onStartQuiz: () => void;
  onResetProgress: () => void;
};

export function Dashboard({ stats, storageWarning, onStartQuiz, onResetProgress }: DashboardProps) {
  return (
    <section className="dashboard" aria-labelledby="dashboard-title">
      <div className="dashboard-header">
        <div>
          <p className="eyebrow">Unofficial practice</p>
          <h1 id="dashboard-title">AI Architect Learning</h1>
        </div>
        <button className="primary-button" onClick={onStartQuiz}>
          <Target size={18} aria-hidden="true" />
          Start quiz
        </button>
      </div>

      {storageWarning ? <p className="warning-banner">{storageWarning}</p> : null}

      <div className="metric-grid">
        <article className="metric">
          <Flame size={20} aria-hidden="true" />
          <span>Streak</span>
          <strong>{stats.currentStreak} days</strong>
        </article>
        <article className="metric">
          <BarChart3 size={20} aria-hidden="true" />
          <span>Answered</span>
          <strong>{stats.totalAnswered}</strong>
        </article>
        <article className="metric">
          <Trophy size={20} aria-hidden="true" />
          <span>Accuracy</span>
          <strong>{stats.accuracy}%</strong>
        </article>
      </div>

      <section className="panel">
        <h2>Weakest domains</h2>
        {stats.weakestDomains.length === 0 ? (
          <p>No attempts yet. Start a quiz to build your domain profile.</p>
        ) : (
          <ul className="domain-list">
            {stats.weakestDomains.map((domain) => (
              <li key={domain.domain}>
                <span>{domain.domain}</span>
                <strong>{domain.accuracy}%</strong>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="panel">
        <h2>Recent sessions</h2>
        {stats.recentSessions.length === 0 ? (
          <p>No completed sessions yet.</p>
        ) : (
          <ul className="session-list">
            {stats.recentSessions.map((session) => (
              <li key={session.id}>
                <span>{new Date(session.completedAt).toLocaleDateString()}</span>
                <strong>
                  {session.correctCount}/{session.questionCount} correct
                </strong>
              </li>
            ))}
          </ul>
        )}
      </section>

      <SettingsPanel onResetProgress={onResetProgress} />
    </section>
  );
}
```

- [ ] **Step 5: Handle storage write failures in `App.tsx`**

Modify `src/App.tsx` to track and render a non-blocking storage warning. Add this state near the other state declarations:

```tsx
const [storageWarning, setStorageWarning] = useState<string | null>(null);
```

Replace `persistProgress` with:

```tsx
function persistProgress(next: ProgressState) {
  setProgress(next);
  try {
    progressStore.save(next);
    setStorageWarning(null);
  } catch {
    setStorageWarning("Progress is available for this session, but this browser could not save it locally.");
  }
}
```

Change the dashboard render to pass the warning:

```tsx
<Dashboard
  stats={stats}
  storageWarning={storageWarning}
  onStartQuiz={() => setScreen("setup")}
  onResetProgress={() => {
    progressStore.clear();
    setProgress({ attempts: [], sessions: [] });
    setStorageWarning(null);
  }}
/>
```

- [ ] **Step 6: Add domain breakdown to session review**

Modify `src/components/SessionReview.tsx` to include domain breakdown:

```tsx
import type { Domain } from "../domain/types";
import type { QuizSession } from "../quiz/quizEngine";

type SessionReviewProps = {
  session: QuizSession;
  onDone: () => void;
};

function getDomainBreakdown(session: QuizSession) {
  const buckets = new Map<Domain, { correct: number; total: number }>();

  for (const question of session.questions) {
    const answer = session.answers[question.id];
    const bucket = buckets.get(question.domain) ?? { correct: 0, total: 0 };
    bucket.total += 1;
    bucket.correct += answer?.isCorrect ? 1 : 0;
    buckets.set(question.domain, bucket);
  }

  return Array.from(buckets.entries()).map(([domain, bucket]) => ({
    domain,
    correct: bucket.correct,
    total: bucket.total,
  }));
}

export function SessionReview({ session, onDone }: SessionReviewProps) {
  const correct = Object.values(session.answers).filter((answer) => answer.isCorrect).length;
  const total = session.questions.length;
  const domainBreakdown = getDomainBreakdown(session);

  return (
    <section className="review">
      <div className="panel">
        <p className="eyebrow">Session review</p>
        <h1>
          {correct} / {total} correct
        </h1>
        <ul className="domain-list">
          {domainBreakdown.map((item) => (
            <li key={item.domain}>
              <span>{item.domain}</span>
              <strong>
                {item.correct}/{item.total}
              </strong>
            </li>
          ))}
        </ul>
        <button className="primary-button" onClick={onDone}>
          Back to dashboard
        </button>
      </div>

      {session.questions.map((question) => {
        const answer = session.answers[question.id];
        return (
          <article className="panel review-item" key={question.id}>
            <h2>{question.prompt}</h2>
            <p>
              Your answer:{" "}
              <strong>{question.choices.find((choice) => choice.id === answer?.selectedChoiceId)?.text}</strong>
            </p>
            <p>{question.explanation}</p>
            {answer ? <p>{question.choiceExplanations[answer.selectedChoiceId]}</p> : null}
            <div className="source-list">
              {question.sources.map((source) => (
                <a key={source.url} href={source.url} target="_blank" rel="noreferrer">
                  {source.title}
                </a>
              ))}
            </div>
          </article>
        );
      })}
    </section>
  );
}
```

- [ ] **Step 7: Add polish styles**

Append to `src/styles.css`:

```css
.warning-banner {
  background: #fff7d6;
  border: 1px solid #e6ce69;
  border-radius: 8px;
  margin: 16px 0;
  padding: 12px 14px;
}

.session-list {
  display: grid;
  gap: 10px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.session-list li {
  align-items: center;
  border-top: 1px solid #edf1ea;
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
}
```

- [ ] **Step 8: Run complete automated verification**

Run: `npm test`

Expected: PASS.

Run: `npm run build`

Expected: PASS.

- [ ] **Step 9: Run local browser verification**

Run: `npm run dev`

Expected: Vite prints a local URL such as `http://localhost:5173/`.

Open the app in the browser and verify:

- Dashboard is the first screen.
- Dashboard shows recent sessions after completing at least one quiz.
- Start quiz opens setup.
- Practice mode shows explanation and source links immediately after answering.
- Exam-style mode shows explanations only after session review.
- Session review shows score, source links, and domain breakdown.
- Reload preserves answered count and accuracy.
- Reset progress clears dashboard metrics after confirmation.
- Layout works at desktop width and mobile width.

- [ ] **Step 10: Commit final polish**

```bash
git add src/App.tsx src/components/Dashboard.tsx src/components/SessionReview.tsx src/styles.css src/stats
git commit -m "feat: complete local study workflow"
```

## Final Completion Check

- [ ] Run `git status --short` and confirm only intentional files are changed.
- [ ] Run `npm test` and confirm all tests pass.
- [ ] Run `npm run build` and confirm the production build passes.
- [ ] Confirm the app has no backend, account, telemetry, or network persistence.
- [ ] Confirm every shipped question has at least one source link.
- [ ] Confirm the final response includes the local dev URL if the dev server is still running.
