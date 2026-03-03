import { useEffect, useState } from "react";
import { DEFAULT_TIMER_MINUTES } from "../constants";

export function useFocusTimer() {
  const [timerInputMinutes, setTimerInputMinutes] = useState(
    DEFAULT_TIMER_MINUTES,
  );
  const [timerSecondsLeft, setTimerSecondsLeft] = useState(
    DEFAULT_TIMER_MINUTES * 60,
  );
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerFinishedCount, setTimerFinishedCount] = useState(0);

  useEffect(() => {
    if (!isTimerRunning) return;

    const interval = window.setInterval(() => {
      setTimerSecondsLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(interval);
          setIsTimerRunning(false);
          setTimerFinishedCount((count) => count + 1);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [isTimerRunning]);

  const setQuickTimer = (minutes: number) => {
    const safeMinutes = Math.max(1, Math.min(180, minutes));
    setTimerInputMinutes(safeMinutes);
    setTimerSecondsLeft(safeMinutes * 60);
    setIsTimerRunning(false);
  };

  const applyCustomTimer = () => {
    const safeMinutes = Math.max(1, Math.min(180, timerInputMinutes));
    setTimerInputMinutes(safeMinutes);
    setTimerSecondsLeft(safeMinutes * 60);
    setIsTimerRunning(false);
  };

  const toggleTimer = () => {
    setIsTimerRunning((prev) => !prev);
  };

  return {
    timerInputMinutes,
    setTimerInputMinutes,
    timerSecondsLeft,
    setTimerSecondsLeft,
    isTimerRunning,
    timerFinishedCount,
    setQuickTimer,
    applyCustomTimer,
    toggleTimer,
  };
}
