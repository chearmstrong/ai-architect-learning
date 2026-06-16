import { BarChart3, Flame, Target, Trophy } from "lucide-react";
import { domainLabels } from "../data/domains";
import type { DashboardStats } from "../stats/stats";
import { SettingsPanel } from "./SettingsPanel";

type DashboardProps = {
  stats: DashboardStats;
  onStartQuiz: () => void;
  onResetProgress: () => void;
};

export function Dashboard({ stats, onStartQuiz, onResetProgress }: DashboardProps) {
  const streakLabel = stats.currentStreak === 1 ? "day" : "days";

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
          <strong>
            {stats.currentStreak} {streakLabel}
          </strong>
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
                <span>{domainLabels[domain.domain]}</span>
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
