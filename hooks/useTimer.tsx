"use client";

import { useCallback, useEffect, useState } from "react";
type TimerMode = "focus" | "break";

export default function useTimer() {
  // Time to minutes
  const [focusDuration, setFocusDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);

  const [mode, setMode] = useState<TimerMode>("focus");
  const [timeLeft, setTimeLeft] = useState(focusDuration * 60); // Minutes in seconds
  const [isActive, setIsActive] = useState<boolean>(false);
  const [sessions, setSessions] = useState(0);

  const getDuration = useCallback(
    (timerMode: TimerMode) => {
      return timerMode === "focus" ? focusDuration * 60 : breakDuration * 60;
    },
    [focusDuration, breakDuration],
  );

  // Function to set timer options
  const setTimerOption = (focus: number, br: number) => {
    setFocusDuration(focus);
    setBreakDuration(br);

    setMode("focus");
    setIsActive(false);
    setTimeLeft(focus * 60);
  };

  const toggleTimer = () => {
    setIsActive((prev) => !prev);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(getDuration(mode));
  };

  const switchMode = useCallback(
    (completedFocus = false) => {
      const newMode = mode === "focus" ? "break" : "focus";
      // Increment sessions only if a focus session was completed
      if (completedFocus && mode === "focus") {
        setSessions((prev) => prev + 1);
      }

      setMode(newMode);
      setTimeLeft(getDuration(newMode));
    },
    [mode, getDuration],
  );

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          return prev - 1;
        });
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive]);

  // Automatically switch mode when time runs out
  useEffect(() => {
    if (timeLeft === 0) {
      switchMode(true);
    }
  }, [timeLeft, switchMode]);

  return {
    mode,
    timeLeft,
    toggleTimer,
    isActive,
    resetTimer,
    switchMode,
    sessions,
    setTimerOption,
  };
}
