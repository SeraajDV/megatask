import type { ActivitySession } from "../types";
import { ExportPDFButton } from "../utils/exportPDF";
import { formatDuration } from "../utils/formatDuration";

type RecentActivityProps = {
  sessions: ActivitySession[];
  totalTracked: number;
  todayTracked: number;
};

export function RecentActivity({
  sessions,
  totalTracked,
  todayTracked,
}: RecentActivityProps) {
  return (
    <section className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-5 shadow-lg">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">Recent Activity</h2>
        <ExportPDFButton
          sessions={sessions}
          totalTracked={totalTracked}
          todayTracked={todayTracked}
        />
      </div>

      <div className="mt-4 space-y-2">
        {sessions.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No sessions yet. Start your first task.
          </p>
        ) : (
          sessions.slice(0, 12).map((session) => (
            <article
              key={session.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border/50 bg-secondary/50 px-3 py-2 transition hover:bg-accent/50">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{session.title}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(session.startAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  {" - "}
                  {new Date(session.endAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <p className="text-sm font-semibold">
                {formatDuration(session.durationSeconds)}
              </p>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
