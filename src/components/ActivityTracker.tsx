import type { RefObject } from "react";
import type { ActiveSession } from "../types";
import { formatDuration } from "../utils/formatDuration";

type ActivityTrackerProps = {
  activityInput: string;
  setActivityInput: (value: string) => void;
  activeSession: ActiveSession | null;
  activeDuration: number;
  toggleTracking: () => void;
  inputRef: RefObject<HTMLInputElement | null>;
};

export function ActivityTracker({
  activityInput,
  setActivityInput,
  activeSession,
  activeDuration,
  toggleTracking,
  inputRef,
}: ActivityTrackerProps) {
  return (
    <article className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-5 shadow-lg">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">Activity Tracker</h2>
        <span className="rounded-md bg-primary/10 border border-primary/20 px-2 py-1 text-xs text-primary font-medium">
          Space: Start/Stop
        </span>
      </div>

      <div className="mt-4 flex flex-col gap-3">
        <label
          htmlFor="activity"
          className="text-sm text-muted-foreground">
          What are you working on?
        </label>
        <input
          id="activity"
          ref={inputRef}
          className="h-11 rounded-lg border border-input bg-muted/30 px-3 text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-primary transition-all"
          placeholder="e.g. Refactor auth hooks"
          value={activityInput}
          onChange={(event) => setActivityInput(event.target.value)}
        />

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={toggleTracking}
            className="h-10 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground shadow-md transition hover:opacity-90 hover:shadow-lg">
            {activeSession ? "Stop Tracking" : "Start Tracking"}
          </button>
          <button
            type="button"
            onClick={() => {
              inputRef.current?.focus();
              inputRef.current?.select();
            }}
            className="h-10 rounded-lg border border-border/50 bg-secondary px-4 text-sm font-medium transition hover:bg-accent">
            Focus Input
          </button>
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-border/50 bg-muted/20 p-4">
        {activeSession ? (
          <>
            <p className="text-xs text-muted-foreground">Now tracking</p>
            <p className="mt-1 font-medium">{activeSession.title}</p>
            <p className="mt-2 text-xl font-semibold text-primary">
              {formatDuration(activeDuration)}
            </p>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">
            No active task. Start one with{" "}
            <kbd className="rounded border border-primary/30 bg-primary/10 px-1.5 py-0.5 text-xs text-primary font-mono">
              Space
            </kbd>
            .
          </p>
        )}
      </div>
    </article>
  );
}
