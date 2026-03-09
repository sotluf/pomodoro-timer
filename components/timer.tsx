"use client";

import useTimer from "@/hooks/useTimer";

export default function Timer() {
  const { mode, timeLeft, toggleTimer, isActive, resetTimer, switchMode } =
    useTimer();

  // Format timeLeft from seconds to mm:ss
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  return (
    <div className="max-w-sm bg-white shadow-xl w-full p-6 rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-medium">
          {mode === "focus" ? "Focus Time" : "Break Time"}
        </h2>
        <div className="text-sm text-gray-500">Sessions: 1</div>
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
        onClick={switchMode}
        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg cursor-pointer"
      >
        Switch to {mode === "focus" ? "Break" : "Focus"}
      </button>
    </div>
  );
}
