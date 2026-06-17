# AI Architect Learning

AI Architect Learning is an unofficial, local-first practice app for Claude Certified Architect - Foundations preparation. It provides original, source-backed quiz questions across Claude, agent architecture, tool use, MCP, Claude Code, prompting, structured output, context management, and reliability topics.

The project is open source, but it is not affiliated with Anthropic and does not contain official exam questions, exam dumps, or copied course quiz content.

## Features

- Dashboard with current streak, total answered, accuracy, weakest domains, and recent sessions.
- Practice mode with immediate answer feedback and explanations.
- Exam-style mode with explanations deferred until session review.
- Domain filtering for focused study.
- Static TypeScript question bank with source links for every question.
- Local browser progress only, stored in `localStorage`.
- Reset control for clearing progress in the current browser.
- Automated validation for question structure and source URL quality.

## Tech Stack

- React 19
- Vite 5
- TypeScript 5
- Vitest
- Testing Library
- lucide-react

## Requirements

- Node.js `>=22.12.0`
- npm

## Getting Started

Install dependencies:

```sh
npm ci
```

Run the development server:

```sh
npm run dev
```

Build for production:

```sh
npm run build
```

Preview a production build:

```sh
npm run preview
```

Run the test suite:

```sh
npm test
```

Run tests in watch mode:

```sh
npm run test:watch
```

## Project Structure

```text
src/
  components/        React UI for the dashboard, quiz setup, quiz flow, review, and settings
  data/              Static domains, question bank, and question-bank validation
  domain/            Shared domain types
  progress/          localStorage-backed progress adapter
  quiz/              Pure quiz session and scoring logic
  stats/             Derived dashboard metrics
  test/              Test setup
docs/
  content-sources.md Public source inventory and authoring rules
```

## Question Bank

The shipped question bank currently contains 30 original questions, with at least six questions in each supported domain:

- Agent architecture
- Tool design and MCP
- Claude Code workflows
- Prompting and structured output
- Context and reliability

Question content lives in `src/data/questions.ts`. Each question must:

- Have exactly four choices.
- Use a `correctChoiceId` that matches one of those choices.
- Explain every answer choice.
- Include at least one valid public source URL.
- Be original text written for this repository.

The validator in `src/data/validateQuestionBank.ts` enforces the structural rules during tests.

## Local Data

Progress is stored only in the learner's browser under the `localStorage` key:

```text
ai-architect-learning:progress:v1
```

There is no backend, account system, sync, telemetry, leaderboard, or server-side data store.

## Content Sources

The source inventory and content authoring rules are maintained in `docs/content-sources.md`. Use public documentation and learning resources for topic coverage, but do not copy proprietary certification material or course quiz questions unless a licence explicitly permits reuse.

## Licence

This project is licensed under the MIT License. See `LICENSE` for details.
