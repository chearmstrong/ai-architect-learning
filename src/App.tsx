import { useMemo, useState } from "react";
import { Dashboard } from "./components/Dashboard";
import { QuizSetup, type QuizSetupValues } from "./components/QuizSetup";
import { QuizView } from "./components/QuizView";
import { SessionReview } from "./components/SessionReview";
import { questions } from "./data/questions";
import type { Attempt, CompletedSession } from "./domain/types";
import { createProgressStore } from "./progress/progressStore";
import type { ProgressState } from "./progress/progressStore";
import { answerQuestion, createQuizSession, finishSession, type QuizSession } from "./quiz/quizEngine";
import { calculateDashboardStats } from "./stats/stats";

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
  const [storageWarning, setStorageWarning] = useState<string | null>(null);
  const stats = useMemo(() => calculateDashboardStats(progress, new Date()), [progress]);

  function persistProgress(next: ProgressState) {
    setProgress(next);
    try {
      progressStore.save(next);
      setStorageWarning(null);
    } catch {
      setStorageWarning("Progress is available for this session, but this browser could not save it locally.");
    }
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
    if (finished.questions.length === 0 || Object.keys(finished.answers).length === 0) {
      setActiveSession(null);
      setScreen("dashboard");
      return;
    }

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
      {storageWarning ? <p className="warning-banner">{storageWarning}</p> : null}
      {screen === "dashboard" ? (
        <Dashboard
          stats={stats}
          onStartQuiz={() => setScreen("setup")}
          onResetProgress={() => {
            progressStore.clear();
            setProgress({ attempts: [], sessions: [] });
            setStorageWarning(null);
          }}
        />
      ) : null}
      {screen === "setup" ? (
        <QuizSetup maxCount={questions.length} onCancel={() => setScreen("dashboard")} onStart={startQuiz} />
      ) : null}
      {screen === "quiz" && activeSession ? (
        <QuizView
          key={activeSession.id}
          session={activeSession}
          onAnswer={answerActiveQuestion}
          onEmptyBack={() => {
            setActiveSession(null);
            setScreen("dashboard");
          }}
          onFinish={finishActiveSession}
        />
      ) : null}
      {screen === "review" && activeSession ? (
        <SessionReview session={activeSession} onDone={() => setScreen("dashboard")} />
      ) : null}
    </main>
  );
}
