"use client";

import { useCallback, useEffect, useState } from "react";
type TimerMode = "focus" | "break";
// Time to minutes
const focusTime = 25;
const breakTime = 5;

export default function useTimer() {
  const [mode, setMode] = useState<TimerMode>("focus");
  const [timeLeft, setTimeLeft] = useState(focusTime * 60); // minutes in seconds
  const [isActive, setIsActive] = useState<boolean>(false);
  const [sessions, setSessions] = useState(0);

  const getDuration = useCallback((timerMode: TimerMode) => {
    return timerMode === "focus" ? focusTime * 60 : breakTime * 60;
  }, []);

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
  };
}
