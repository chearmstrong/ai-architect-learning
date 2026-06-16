import { useState } from "react";
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
  const previousQuestion = session.questions[session.currentIndex - 1];
  const previousAnswer = previousQuestion ? session.answers[previousQuestion.id] : undefined;
  const shouldShowPreviousAnswer = Boolean(
    previousQuestion && previousAnswer?.isRevealed && !dismissedAnswerIds.has(previousQuestion.id),
  );
  const displayedQuestionIndex = shouldShowPreviousAnswer ? session.currentIndex - 1 : session.currentIndex;
  const question = shouldShowPreviousAnswer ? previousQuestion : session.questions[session.currentIndex];
  const answer = question ? session.answers[question.id] : undefined;

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

  return (
    <section className="quiz-card">
      <p className="eyebrow">
        Question {displayedQuestionIndex + 1} of {session.questions.length}
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

      {session.isComplete && shouldShowPreviousAnswer ? (
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
    </section>
  );
}
