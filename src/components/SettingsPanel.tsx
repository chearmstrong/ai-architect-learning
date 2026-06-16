type SettingsPanelProps = {
  onResetProgress: () => void;
};

export function SettingsPanel({ onResetProgress }: SettingsPanelProps) {
  function handleReset() {
    const confirmed = window.confirm("Clear all local progress for this browser?");
    if (confirmed) {
      onResetProgress();
    }
  }

  return (
    <section className="panel settings-panel">
      <h2>Settings</h2>
      <p>Progress is stored only in this browser.</p>
      <button className="secondary-button danger-button" onClick={handleReset}>
        Reset progress
      </button>
    </section>
  );
}
