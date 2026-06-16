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
    if (choiceIds.size !== question.choices.length) {
      errors.push(`${question.id} choice ids must be unique`);
    }

    if (!choiceIds.has(question.correctChoiceId)) {
      errors.push(`${question.id} correctChoiceId must match a choice id`);
    }

    const hasEveryChoiceExplanation = question.choices.every(
      (choice) =>
        typeof question.choiceExplanations[choice.id] === "string" &&
        question.choiceExplanations[choice.id].trim().length > 0,
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
