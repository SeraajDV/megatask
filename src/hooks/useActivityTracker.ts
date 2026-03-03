import { useMemo, useState } from "react";
import type { ActiveSession, ActivitySession } from "../types";

export function useActivityTracker(now: number) {
  const [activityInput, setActivityInput] = useState("");
  const [activeSession, setActiveSession] = useState<ActiveSession | null>(
    null,
  );
  const [sessions, setSessions] = useState<ActivitySession[]>([]);

  const startTracking = () => {
    const title = activityInput.trim() || "Untitled coding session";
    setActiveSession({ title, startAt: Date.now() });
  };

  const stopTracking = () => {
    if (!activeSession) return;

    const endAt = Date.now();
    const durationSeconds = Math.max(
      1,
      Math.floor((endAt - activeSession.startAt) / 1000),
    );

    const finished: ActivitySession = {
      id: crypto.randomUUID(),
      title: activeSession.title,
      startAt: activeSession.startAt,
      endAt,
      durationSeconds,
    };

    setSessions((prev) => [finished, ...prev]);
    setActiveSession(null);
    setActivityInput("");
  };

  const toggleTracking = () => {
    if (activeSession) {
      stopTracking();
      return;
    }

    startTracking();
  };

  const clearAllSessions = () => {
    setSessions([]);
    setActiveSession(null);
  };

  const trackedSeconds = useMemo(() => {
    const savedTotal = sessions.reduce(
      (sum, session) => sum + session.durationSeconds,
      0,
    );

    if (!activeSession) return savedTotal;

    const activeSeconds = Math.max(
      1,
      Math.floor((now - activeSession.startAt) / 1000),
    );
    return savedTotal + activeSeconds;
  }, [sessions, activeSession, now]);

  const todaySeconds = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStart = today.getTime();

    return sessions
      .filter((session) => session.startAt >= todayStart)
      .reduce((sum, session) => sum + session.durationSeconds, 0);
  }, [sessions]);

  const activeDuration = activeSession
    ? Math.max(1, Math.floor((now - activeSession.startAt) / 1000))
    : 0;

  return {
    activityInput,
    setActivityInput,
    activeSession,
    sessions,
    setSessions,
    startTracking,
    stopTracking,
    toggleTracking,
    clearAllSessions,
    trackedSeconds,
    todaySeconds,
    activeDuration,
  };
}
