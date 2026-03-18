"use client";

import usePlaylist from "@/hooks/usePlaylist";
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

  const {
    playlist,
    isPlaying,
    trackIndex,
    nextTrack,
    prevTrack,
    audioRef,
    togglePlay,
  } = usePlaylist();

  // Format timeLeft from seconds to mm:ss
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  return (
    <>
      <div className="w-full max-w-md mx-auto flex flex-row gap-3 mb-6">
        <div className="bg-white shadow-xl rounded-xl p-2 flex-1 flex items-center justify-center h-20">
          {/* Timer options */}
          <select
            onChange={(e) => {
              const value = (e.target as HTMLSelectElement).value;
              if (value === "25/5") setTimerOption(25, 5);
              if (value === "50/10") setTimerOption(50, 10);
              if (value === "90/20") setTimerOption(90, 20);
            }}
            className="p-2 rounded-lg cursor-pointer w-full text-center"
          >
            <option value="25/5">25 min focus / 5 min break</option>
            <option value="50/10">50 min focus / 10 min break</option>
            <option value="90/20">90 min focus / 20 min break</option>
          </select>
        </div>
        {/* Audio controls */}
        <div className="bg-white shadow-xl rounded-xl flex-none aspect-square w-28 flex flex-col items-center justify-center p-1 h-20 group">
          <div className="relative flex items-center justify-center mb-1">
            <svg
              className={`transition-transform duration-200 ${isPlaying ? "animate-spin" : ""} group-hover:scale-90`}
              width="70"
              height="70"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="24"
                cy="24"
                r="22"
                fill="#222"
                stroke="#888"
                strokeWidth="2"
              />
              <circle
                cx="24"
                cy="24"
                r="18"
                stroke="#444"
                strokeWidth="1"
                strokeDasharray="3 4"
              />
              <circle cx="24" cy="24" r="6" fill="#fff" />
              <circle cx="24" cy="24" r="2" fill="#888" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button
                onClick={prevTrack}
                className="px-1 py-0.5 bg-gray-200 rounded hover:bg-gray-300 text-xs"
                aria-label="Previous track"
              >
                ⏮
              </button>
              <button
                onClick={togglePlay}
                className="px-1 py-0.5 bg-gray-200 rounded hover:bg-gray-300 text-xs"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? "⏸" : "▶"}
              </button>
              <button
                onClick={nextTrack}
                className="px-1 py-0.5 bg-gray-200 rounded hover:bg-gray-300 text-xs"
                aria-label="Next track"
              >
                ⏭
              </button>
            </div>
          </div>
          {/* Audio element */}
          <audio
            src={playlist[trackIndex]?.url}
            ref={audioRef}
            style={{ display: "none" }}
          />
        </div>
      </div>
      {/* Timer display */}
      <div className="w-full max-w-md mx-auto bg-white shadow-xl p-6 rounded-xl">
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
    </>
  );
}
