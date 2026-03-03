import { useHotkey } from "@tanstack/react-hotkeys";
import { useRef } from "react";
import { ActivityTracker } from "./components/ActivityTracker";
import { FocusTimer } from "./components/FocusTimer";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { RecentActivity } from "./components/RecentActivity";
import { StatsCard } from "./components/StatsCard";
import { useActivityTracker } from "./hooks/useActivityTracker";
import { useFocusTimer } from "./hooks/useFocusTimer";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useNow } from "./hooks/useNow";
import { formatDuration } from "./utils/formatDuration";
import { isTypingTarget } from "./utils/isTypingTarget";

export default function App() {
  const now = useNow();
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    activityInput,
    setActivityInput,
    activeSession,
    sessions,
    setSessions,
    startTracking,
    toggleTracking,
    clearAllSessions,
    trackedSeconds,
    todaySeconds,
    activeDuration,
  } = useActivityTracker(now);

  const {
    timerInputMinutes,
    setTimerInputMinutes,
    timerSecondsLeft,
    setTimerSecondsLeft,
    isTimerRunning,
    timerFinishedCount,
    setQuickTimer,
    applyCustomTimer,
    toggleTimer,
  } = useFocusTimer();

  useLocalStorage(
    sessions,
    timerInputMinutes,
    setSessions,
    setTimerInputMinutes,
    setTimerSecondsLeft,
  );

  // Keyboard shortcuts
  useHotkey(
    "Space",
    (event) => {
      if (isTypingTarget()) return;
      event.preventDefault();
      toggleTracking();
    },
    { preventDefault: true },
  );

  useHotkey(
    "Mod+Enter",
    (event) => {
      event.preventDefault();
      if (!activeSession) {
        startTracking();
      }
    },
    { preventDefault: true },
  );

  useHotkey(
    "Mod+K",
    (event) => {
      event.preventDefault();
      inputRef.current?.focus();
      inputRef.current?.select();
    },
    { preventDefault: true },
  );

  useHotkey(
    "T",
    (event) => {
      if (isTypingTarget()) return;
      event.preventDefault();
      toggleTimer();
    },
    { preventDefault: true },
  );

  useHotkey(
    "R",
    (event) => {
      if (isTypingTarget()) return;
      event.preventDefault();
      applyCustomTimer();
    },
    { preventDefault: true },
  );

  useHotkey("Alt+1", () => setQuickTimer(25));
  useHotkey("Alt+2", () => setQuickTimer(50));
  useHotkey("Alt+3", () => setQuickTimer(5));

  useHotkey(
    "Mod+Shift+Backspace",
    (event) => {
      event.preventDefault();
      clearAllSessions();
    },
    { preventDefault: true },
  );

  return (
    <main className="min-h-screen bg-linear-to-br from-background via-background to-muted/20 text-foreground">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 md:px-8">
        <Header />

        <section className="grid gap-4 sm:grid-cols-3">
          <StatsCard
            label="Total tracked"
            value={formatDuration(trackedSeconds)}
          />
          <StatsCard
            label="Today"
            value={formatDuration(todaySeconds)}
          />
          <StatsCard
            label="Focus sessions done"
            value={String(timerFinishedCount)}
          />
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <ActivityTracker
            activityInput={activityInput}
            setActivityInput={setActivityInput}
            activeSession={activeSession}
            activeDuration={activeDuration}
            toggleTracking={toggleTracking}
            inputRef={inputRef}
          />

          <FocusTimer
            timerSecondsLeft={timerSecondsLeft}
            isTimerRunning={isTimerRunning}
            timerInputMinutes={timerInputMinutes}
            setTimerInputMinutes={setTimerInputMinutes}
            toggleTimer={toggleTimer}
            applyCustomTimer={applyCustomTimer}
            setQuickTimer={setQuickTimer}
          />
        </section>

        <RecentActivity
          sessions={sessions}
          totalTracked={trackedSeconds}
          todayTracked={todaySeconds}
        />

        <Footer />
      </div>
    </main>
  );
}
