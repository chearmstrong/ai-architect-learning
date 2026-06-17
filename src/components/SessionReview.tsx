import { domainLabels } from "../data/domains";
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
              <span>{domainLabels[item.domain]}</span>
              <strong>
                {item.correct}/{item.total}
              </strong>
            </li>
          ))}
        </ul>
        <button className="primary-button review-summary-button" onClick={onDone}>
          Back to dashboard
        </button>
      </div>

      {session.questions.map((question) => {
        const answer = session.answers[question.id];
        const selectedChoice = question.choices.find((choice) => choice.id === answer?.selectedChoiceId);
        const correctChoice = question.choices.find((choice) => choice.id === question.correctChoiceId);
        return (
          <article className="panel review-item" key={question.id}>
            <h2>{question.prompt}</h2>
            <p className={answer?.isCorrect ? "result-label correct-text" : "result-label incorrect-text"}>
              {answer?.isCorrect ? "Correct" : "Missed"}
            </p>
            <p>
              Your answer:{" "}
              <strong>
                {selectedChoice?.text ?? "No answer recorded"}
              </strong>
            </p>
            {!answer?.isCorrect ? (
              <p>
                Correct answer: <strong>{correctChoice?.text}</strong>
              </p>
            ) : null}
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
