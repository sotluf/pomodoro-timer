"use client";

import { useEffect, useState } from "react";
type TimerMode = "focus" | "break";
// Time to minutes
const focusTime = 25;
const breakTime = 5;

export default function useTimer() {
  const [mode, setMode] = useState<TimerMode>("focus");
  const [timeLeft, setTimeLeft] = useState(focusTime * 60); // minutes in seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (interval) clearInterval(interval);
    };
  }, []);

  return {
    mode,
    timeLeft,
  };
}
