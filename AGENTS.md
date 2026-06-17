# Repository Guidelines

## Project Structure & Module Organization

This is a local-first React 19, Vite, and TypeScript quiz app. Code lives in `src/`:

- `src/components/` contains React UI for the dashboard, setup, quiz flow, review, and settings.
- `src/data/` contains static domains, the question bank, and question-bank validation.
- `src/domain/` defines shared domain types.
- `src/progress/` stores browser `localStorage` progress logic.
- `src/quiz/` contains pure quiz session and scoring logic.
- `src/stats/` derives dashboard metrics.
- `src/test/` contains Vitest setup.

Documentation lives in `docs/`, especially `docs/content-sources.md` for source and authoring rules. Production output is generated in `dist/` and should not be edited by hand.

## Build, Test, and Development Commands

Use Node.js `>=22.12.0` and npm.

- `npm ci` installs dependencies from `package-lock.json`.
- `npm run dev` starts the Vite development server.
- `npm run build` runs TypeScript project builds and creates a production Vite build.
- `npm run preview` serves the production build locally.
- `npm test` runs the Vitest suite once.
- `npm run test:watch` runs Vitest in watch mode.

## Coding Style & Naming Conventions

Use TypeScript modules with explicit types at domain boundaries and keep pure logic separate from React components. Follow the existing style: two-space indentation, double quotes, semicolons, named exports for reusable modules, and PascalCase for components. Use camelCase for variables, functions, and file-local helpers. Test files are colocated beside the code they cover and use the `.test.ts` or `.test.tsx` suffix.

## Testing Guidelines

Tests use Vitest, jsdom, Testing Library, and jest-dom setup from `src/test/setup.ts`. Add focused tests for changes to quiz logic, progress persistence, stats calculations, question validation, and user-visible component behaviour. Run `npm test` before submitting changes. Question-bank edits must satisfy the validator in `src/data/validateQuestionBank.ts`.

## Commit & Pull Request Guidelines

Git history follows Conventional Commits, for example `feat(quiz): expand question bank and randomize sessions`, `fix(quiz): relabel shuffled answers`, and `docs: add readme and license`. Keep commits focused and use scopes when they clarify the area changed.

Pull requests should include a concise summary, testing performed, and any content-source or licence considerations. Include screenshots for meaningful UI changes. Link related issues when available and call out follow-up work explicitly.

## Security & Configuration Tips

The app stores learner progress only in browser `localStorage` under `ai-architect-learning:progress:v1`. Do not add backend persistence, telemetry, copied exam questions, or proprietary course quiz content without an explicit project decision and appropriate documentation updates.
