# AI Architect Learning App Design

## Context

This project will be an unofficial, open-source, local-first practice app for Claude Certified Architect - Foundations preparation.

The app will use public source material only. It must not copy proprietary exam questions, claim affiliation with Anthropic, or imply that its practice content is official. Questions will be original, source-backed, and reviewable in the repository.

The initial content strategy is:

- Use official Anthropic, Claude, Claude Code, MCP, and related platform documentation as canonical sources.
- Use the public `paullarionov/claude-certified-architect` repository as a community study-orientation source for topic mapping, not as copied question content.
- Require every question explanation to include at least one source link.

## Product Scope

V1 is a curated practice app optimised for a fast, useful study loop.

Included in V1:

- Dashboard with current streak, total answered, overall accuracy, recent session summary, and weakest domains.
- Practice mode with immediate feedback after each question.
- Exam-style mode where answers are collected first and explanations are shown during session review.
- Domain filtering for focused practice.
- Static curated question bank stored in the repository.
- Local-storage persistence only: no accounts, backend, sync, telemetry, or server-side data.
- Source links shown with every explanation.
- Settings/reset control for clearing local progress.

Out of scope for V1:

- User-authored questions.
- Backend sync or cloud accounts.
- Official exam dumps or copied certification questions.
- Paid features.
- Full course/module pages.
- Public leaderboards or social features.

## Curriculum Domains

The first question bank will use these domains:

- Agent architecture and orchestration.
- Tool design and MCP integration.
- Claude Code configuration and workflows.
- Prompt engineering and structured output.
- Context management and reliability.

These domains align with public community study guidance and map cleanly to official documentation areas such as Claude API, tool use, Claude Code, MCP, prompt engineering, and context management.

## Architecture

The app will be a client-only React + Vite + TypeScript project.

Core modules:

- `questionBank`: static question data, domains, choices, explanations, wrong-answer rationales, source links, and difficulty.
- `quizEngine`: question selection, active session state, answer scoring, and practice vs exam-style reveal rules.
- `progressStore`: local-storage adapter for attempts, streak data, domain stats, and session history.
- `stats`: derived dashboard metrics from raw attempts.
- `ui`: dashboard, quiz setup, quiz screen, answer review, domain filters, and settings/reset controls.

The rest of the app should not call `localStorage` directly. All persistence should go through `progressStore`, making storage behaviour easier to test and change later.

## Data Model

Questions will be stored as static typed data.

```ts
type Question = {
  id: string;
  domain: Domain;
  difficulty: "foundation" | "applied" | "scenario";
  prompt: string;
  choices: Array<{ id: string; text: string }>;
  correctChoiceId: string;
  explanation: string;
  choiceExplanations: Record<string, string>;
  sources: Array<{ title: string; url: string }>;
};
```

Question data rules:

- Each question must have exactly four choices.
- `correctChoiceId` must match one choice.
- Every choice must have a corresponding explanation.
- `sources` must contain at least one valid URL.
- The prompt and answer choices must be original text, not copied exam questions.

Progress data will store raw attempts rather than only aggregate counters.

```ts
type Attempt = {
  questionId: string;
  sessionId: string;
  mode: "practice" | "exam";
  selectedChoiceId: string;
  isCorrect: boolean;
  answeredAt: string;
};
```

Streaks, domain accuracy, total answered, weakest domains, and recent-session summaries should be derived from attempts and completed sessions where practical. Avoid storing duplicated totals unless a future performance issue justifies it.

## User Experience

The first screen is the study dashboard, not a marketing landing page.

Dashboard:

- Current streak.
- Total answered.
- Overall accuracy.
- Recent sessions.
- Weakest domains.
- Primary actions for practice and exam-style sessions.

Quiz setup:

- Select mode: Practice or Exam-style.
- Select domain filter: all domains or one domain.
- Select question count.

Practice mode:

- Learner answers one question.
- App immediately shows correctness, the main explanation, wrong-answer rationale, and source links.
- Learner continues to the next question.

Exam-style mode:

- Learner answers all questions without seeing feedback.
- App shows a session review at the end.
- Review includes score, missed questions, domain breakdown, explanations, wrong-answer rationales, and source links.

Settings/reset:

- Learner can clear local progress after confirming the action.
- Reset must not affect the static question bank.

## Error Handling

Because all data is local, most errors will come from corrupt local storage or invalid question data.

- If local-storage parsing fails, the app should ignore the corrupt saved progress, start with empty progress, and offer a reset.
- If storage writes fail, the app should continue the active session in memory and show a non-blocking warning.
- Invalid question-bank data should fail tests before release rather than being handled silently in production.
- Empty filtered question sets should show a clear empty state and ask the learner to choose another domain.

## Testing And Verification

Automated tests:

- `quizEngine` scoring and session completion.
- Practice vs exam-style reveal rules.
- Streak calculation across calendar days.
- Domain stats and weakest-domain derivation.
- Local-storage adapter read/write and corrupt-data fallback.
- Question-bank validation: four choices, valid answer ID, all choice explanations present, at least one source URL.

Browser verification:

- Dashboard renders correctly on desktop and mobile.
- Practice mode answer feedback appears immediately.
- Exam-style mode delays explanations until review.
- Progress persists across reloads.
- Reset clears progress after confirmation.

## Future Extensions

After V1, the app can add:

- Learning modules with short topic summaries and reading links.
- Spaced repetition scheduling.
- Import/export of local progress.
- Larger exam simulation with timing, domain weighting, and pass-readiness estimates.
- Optional local-only custom question import.

These should build on the same question and attempt data model rather than requiring a backend.
