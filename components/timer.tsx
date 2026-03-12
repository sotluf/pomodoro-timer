"use client";

import useTimer from "@/hooks/useTimer";

export default function Timer() {
  const {
    mode,
    timeLeft,
    toggleTimer,
    isActive,
    resetTimer,
    switchMode,
    sessions,
    setTimerOption,
  } = useTimer();

  // Format timeLeft from seconds to mm:ss
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  return (
    <div className="max-w-md bg-white shadow-xl w-full p-6 rounded-xl">
      <select
        onChange={(e) => {
          const value = (e.target as HTMLSelectElement).value;
          if (value === "25/5") setTimerOption(25, 5);
          if (value === "50/10") setTimerOption(50, 10);
          if (value === "90/20") setTimerOption(90, 20);
        }}
        className="justify-center p-2 mb-4 rounded-lg cursor-pointer w-full text-center"
      >
        <option value="25/5">25 min focus / 5 min break</option>
        <option value="50/10">50 min focus / 10 min break</option>
        <option value="90/20">90 min focus / 20 min break</option>
      </select>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-medium">
          {mode === "focus" ? "Focus Time" : "Break Time"}
        </h2>
        <div className="text-sm text-gray-500">Sessions: {sessions}</div>
      </div>

      <div
        className={`text-6xl font-bold text-center mb-6 ${mode === "focus" ? "text-red-500" : "text-green-500"}`}
      >
        {formattedTime}
      </div>

      <div className="flex justify-center gap-4 mb-4">
        <button
          onClick={toggleTimer}
          className="bg-yellow-500 hover:bg-yellow-600 px-5 py-2 text-white rounded-lg cursor-pointer"
        >
          {isActive ? "Pause" : "Start"}
        </button>
        <button
          onClick={resetTimer}
          className="bg-gray-200 hover:bg-gray-300 px-5 py-2 rounded-lg cursor-pointer"
        >
          Reset
        </button>
      </div>

      <button
        onClick={() => switchMode()}
        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg cursor-pointer"
      >
        Switch to {mode === "focus" ? "Break" : "Focus"}
      </button>
    </div>
  );
}
