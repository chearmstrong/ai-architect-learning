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
      try {
        const raw = storage.getItem(STORAGE_KEY);
        if (!raw) {
          return emptyProgress();
        }

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
