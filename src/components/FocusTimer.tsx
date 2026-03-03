import { formatDuration } from "../utils/formatDuration";

type FocusTimerProps = {
  timerSecondsLeft: number;
  isTimerRunning: boolean;
  timerInputMinutes: number;
  setTimerInputMinutes: (minutes: number) => void;
  toggleTimer: () => void;
  applyCustomTimer: () => void;
  setQuickTimer: (minutes: number) => void;
};

export function FocusTimer({
  timerSecondsLeft,
  isTimerRunning,
  timerInputMinutes,
  setTimerInputMinutes,
  toggleTimer,
  applyCustomTimer,
  setQuickTimer,
}: FocusTimerProps) {
  return (
    <article className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-5 shadow-lg">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Focus Timer</h2>
        <span className="rounded-md bg-primary/10 border border-primary/20 px-2 py-1 text-xs text-primary font-medium">
          T: Start/Pause
        </span>
      </div>

      <p className="mt-4 text-4xl font-semibold tracking-tight text-primary font-mono">
        {formatDuration(timerSecondsLeft)}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={toggleTimer}
          className="h-10 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground shadow-md transition hover:opacity-90 hover:shadow-lg">
          {isTimerRunning ? "Pause" : "Start"}
        </button>
        <button
          type="button"
          onClick={applyCustomTimer}
          className="h-10 rounded-lg border border-border/50 bg-secondary px-4 text-sm font-medium transition hover:bg-accent">
          Reset
        </button>
      </div>

      <div className="mt-4">
        <label
          htmlFor="minutes"
          className="text-sm text-muted-foreground">
          Minutes
        </label>
        <input
          id="minutes"
          type="number"
          min={1}
          max={180}
          value={timerInputMinutes}
          onChange={(event) =>
            setTimerInputMinutes(Number(event.target.value || 1))
          }
          className="mt-1 h-10 w-full rounded-lg border border-input bg-muted/30 px-3 text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-primary transition-all"
        />
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <button
          type="button"
          onClick={() => setQuickTimer(25)}
          className="h-9 rounded-lg border border-border/50 bg-secondary text-sm transition hover:bg-accent hover:border-primary/50">
          25m
        </button>
        <button
          type="button"
          onClick={() => setQuickTimer(50)}
          className="h-9 rounded-lg border border-border/50 bg-secondary text-sm transition hover:bg-accent hover:border-primary/50">
          50m
        </button>
        <button
          type="button"
          onClick={() => setQuickTimer(5)}
          className="h-9 rounded-lg border border-border/50 bg-secondary text-sm transition hover:bg-accent hover:border-primary/50">
          5m
        </button>
      </div>
    </article>
  );
}
