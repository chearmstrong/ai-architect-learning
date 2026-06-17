import { useEffect, useState } from "react";
import type { Question } from "../domain/types";
import type { QuizAnswer, QuizSession } from "../quiz/quizEngine";

type QuizViewProps = {
  session: QuizSession;
  onAnswer: (choiceId: string) => void;
  onEmptyBack: () => void;
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

export function QuizView({ session, onAnswer, onEmptyBack, onFinish }: QuizViewProps) {
  const [dismissedAnswerIds, setDismissedAnswerIds] = useState<Set<string>>(() => new Set());
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const previousQuestion = session.questions[session.currentIndex - 1];
  const previousAnswer = previousQuestion ? session.answers[previousQuestion.id] : undefined;
  const shouldShowPreviousAnswer = Boolean(
    previousQuestion && previousAnswer?.isRevealed && !dismissedAnswerIds.has(previousQuestion.id),
  );
  const displayedQuestionIndex = shouldShowPreviousAnswer ? session.currentIndex - 1 : session.currentIndex;
  const question = shouldShowPreviousAnswer ? previousQuestion : session.questions[session.currentIndex];
  const answer = question ? session.answers[question.id] : undefined;
  const canEndEarly = !session.isComplete && session.questions.length > 0;
  const currentQuestionId = question?.id ?? null;

  useEffect(() => {
    setSelectedChoiceId(null);
  }, [currentQuestionId]);

  if (!question) {
    if (session.isComplete && session.questions.length > 0) {
      return (
        <section className="panel">
          <h1>Quiz complete</h1>
          <button className="primary-button" onClick={onFinish}>
            Review session
          </button>
        </section>
      );
    }

    return (
      <section className="panel">
        <h1>No questions available</h1>
        <button className="primary-button" onClick={onEmptyBack}>
          Back to dashboard
        </button>
      </section>
    );
  }

  const isAnswered = Boolean(answer);
  const requiresSubmit = session.mode === "exam" && !isAnswered;

  function handleChoice(choiceId: string) {
    if (requiresSubmit) {
      setSelectedChoiceId(choiceId);
      return;
    }

    onAnswer(choiceId);
  }

  function handleSubmitAnswer() {
    if (selectedChoiceId) {
      onAnswer(selectedChoiceId);
    }
  }

  return (
    <section className="quiz-card">
      <p className="eyebrow">
        Question {displayedQuestionIndex + 1} of {session.questions.length}
      </p>
      <h1>{question.prompt}</h1>

      <div className="choice-grid" key={question.id}>
        {question.choices.map((choice) => (
          <button
            key={`${question.id}-${choice.id}`}
            className={choice.id === selectedChoiceId ? "choice-button selected" : "choice-button"}
            disabled={isAnswered}
            type="button"
            aria-pressed={requiresSubmit ? choice.id === selectedChoiceId : undefined}
            onClick={() => handleChoice(choice.id)}
          >
            <span>{choice.id.toUpperCase()}</span>
            {choice.text}
          </button>
        ))}
      </div>

      {requiresSubmit ? (
        <p className="selection-hint" aria-live="polite">
          {selectedChoiceId
            ? `Selected ${selectedChoiceId.toUpperCase()}. Submit when ready.`
            : "Select an answer, then submit it when ready."}
        </p>
      ) : null}

      {answer ? <Explanation question={question} answer={answer} /> : null}

      <div className="quiz-actions">
        {requiresSubmit ? (
          <button className="primary-button" type="button" disabled={!selectedChoiceId} onClick={handleSubmitAnswer}>
            Submit answer
          </button>
        ) : session.isComplete && shouldShowPreviousAnswer ? (
          <button className="primary-button" onClick={onFinish}>
            Review session
          </button>
        ) : shouldShowPreviousAnswer ? (
          <button
            className="primary-button"
            onClick={() => {
              if (question) {
                setDismissedAnswerIds((current) => new Set(current).add(question.id));
              }
            }}
          >
            Continue
          </button>
        ) : session.isComplete ? (
          <button className="primary-button" onClick={onFinish}>
            Review session
          </button>
        ) : null}
        {canEndEarly ? (
          <button className="secondary-button" type="button" onClick={onFinish}>
            End quiz
          </button>
        ) : null}
      </div>
    </section>
  );
}
