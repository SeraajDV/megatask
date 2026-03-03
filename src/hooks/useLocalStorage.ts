import { useEffect } from "react";
import { STORAGE_KEY } from "../constants";
import type { ActivitySession } from "../types";

type StorageData = {
  sessions?: ActivitySession[];
  timerInputMinutes?: number;
};

export function useLocalStorage(
  sessions: ActivitySession[],
  timerInputMinutes: number,
  setSessions: (sessions: ActivitySession[]) => void,
  setTimerInputMinutes: (minutes: number) => void,
  setTimerSecondsLeft: (seconds: number) => void,
) {
  // Load from localStorage on mount
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw) as StorageData;

      if (parsed.sessions) {
        setSessions(parsed.sessions);
      }

      if (typeof parsed.timerInputMinutes === "number") {
        const minutes = Math.max(1, Math.min(180, parsed.timerInputMinutes));
        setTimerInputMinutes(minutes);
        setTimerSecondsLeft(minutes * 60);
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [setSessions, setTimerInputMinutes, setTimerSecondsLeft]);

  // Save to localStorage when data changes
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ sessions, timerInputMinutes }),
    );
  }, [sessions, timerInputMinutes]);
}
