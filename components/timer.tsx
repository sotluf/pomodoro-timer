"use client";

import usePlaylist from "@/hooks/usePlaylist";
import useTimer from "@/hooks/useTimer";
import {
  PauseIcon,
  PlayIcon,
  SkipBackIcon,
  SkipForwardIcon,
} from "@phosphor-icons/react";

// Color palette
const COLORS = {
  primary: "#b2180a",
  secondary: "#ee7c01",
  accent: "#9ea040",
  accentDark: "#8d8f36",
  card: "#f5edd8",
  cardDark: "#e9e1ca",
  text: "#4c4802",
  textLight: "#f5edd8",
};

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
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  const isFocus = mode === "focus";

  return (
    <>
      {/* Playlist */}
      <div className="w-full max-w-md mx-auto mb-6">
        <div
          className="shadow-xl rounded-xl px-3 py-2 flex items-center gap-3 min-h-14"
          style={{ background: COLORS.card }}
        >
          {/* Playlist controls */}
          <div className="relative flex flex-col items-center gap-1 shrink-0 group">
            <span
              className="text-5xl select-none"
              style={{
                display: "inline-block",
                animation: isPlaying
                  ? "pulse-icon 1s ease-in-out infinite"
                  : "none",
              }}
            >
              🍅
            </span>
            <div className="flex gap-1 overflow-hidden max-h-0 opacity-0 group-hover:max-h-6 group-hover:opacity-100 transition-all duration-200">
              {[
                {
                  onClick: prevTrack,
                  icon: <SkipBackIcon size={16} weight="fill" />,
                  label: "Previous",
                },
                {
                  onClick: togglePlay,
                  icon: isPlaying ? (
                    <PauseIcon size={16} weight="fill" />
                  ) : (
                    <PlayIcon size={16} weight="fill" />
                  ),
                  label: isPlaying ? "Pause" : "Play",
                },
                {
                  onClick: nextTrack,
                  icon: <SkipForwardIcon size={16} weight="fill" />,
                  label: "Next",
                },
              ].map(({ onClick, icon, label }) => (
                <button
                  key={label}
                  onClick={onClick}
                  aria-label={label}
                  className="rounded flex items-center justify-center cursor-pointer border-none"
                  style={{ color: COLORS.primary }}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>
          <div
            className="w-px h-7 opacity-20 shrink-0"
            style={{ background: COLORS.primary }}
          />

          <select
            onChange={(e) => {
              const v = e.target.value;
              if (v === "25/5") setTimerOption(25, 5);
              if (v === "50/10") setTimerOption(50, 10);
              if (v === "90/20") setTimerOption(90, 20);
            }}
            className="flex-1 bg-transparent border-none outline-none cursor-pointer font-medium text-md"
            style={{ color: COLORS.primary }}
          >
            <option value="25/5">25 min focus / 5 min break</option>
            <option value="50/10">50 min focus / 10 min break</option>
            <option value="90/20">90 min focus / 20 min break</option>
          </select>

          <audio
            src={playlist[trackIndex]?.url}
            ref={audioRef}
            className="hidden"
          />
        </div>
      </div>

      {/* Timer */}
      <div
        className="w-full max-w-md mx-auto shadow-xl p-6 rounded-xl"
        style={{ background: COLORS.cardDark }}
      >
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-xl font-bold" style={{ color: COLORS.text }}>
            {isFocus ? "Focus Time" : "Break Time"}
          </h2>
          <div
            className="text-md rounded-4xl px-8 py-1"
            style={{ background: COLORS.accent, color: COLORS.textLight }}
          >
            Sessions: {sessions}
          </div>
        </div>

        <div
          className="font-bagel text-7xl font-bold text-center mb-10"
          style={{ color: isFocus ? COLORS.primary : COLORS.secondary }}
        >
          {formattedTime}
        </div>

        <div className="flex justify-center gap-4 mb-2">
          {[
            { onClick: toggleTimer, label: isActive ? "Pause" : "Start" },
            { onClick: resetTimer, label: "Reset" },
          ].map(({ onClick, label }) => (
            <button
              key={label}
              onClick={onClick}
              className="px-17 py-1 rounded-4xl cursor-pointer font-bold"
              style={{ background: COLORS.text, color: COLORS.textLight }}
            >
              {label}
            </button>
          ))}
        </div>

        <button
          onClick={() => switchMode()}
          className="w-full py-2 rounded-4xl cursor-pointer font-bold"
          style={{ background: COLORS.accent, color: COLORS.textLight }}
          onMouseOver={(e) =>
            (e.currentTarget.style.background = COLORS.accentDark)
          }
          onMouseOut={(e) => (e.currentTarget.style.background = COLORS.accent)}
        >
          Switch to {isFocus ? "Break" : "Focus"}
        </button>
      </div>
    </>
  );
}
