"use client";
import { useEffect, useRef, useState } from "react";

export default function usePlaylist() {
  // Playlist music (local audio files in public/music)
  const playlist = [
    {
      name: "Lo-Fi Hip Hop",
      url: encodeURI("/music/lofi hip hop mix.mp3"),
    },
    {
      name: "Less talk... more action",
      url: encodeURI("/music/Less talk....  more action.mp3"),
    },
    {
      name: "Quiet night with rain sound",
      url: encodeURI("/music/anemoia nostalgia for a time or a place one has never known.mp3"),
    },
  ];

  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const nextTrack = () => {
    setTrackIndex((prev) => {
      const next = (prev + 1) % playlist.length;
      return next;
    });
    // Automatically start playing when switching tracks
    setIsPlaying(true);
  };

  const prevTrack = () => {
    setTrackIndex((prev) => {
      const next = prev === 0 ? playlist.length - 1 : prev - 1;
      return next;
    });
    // Automatically start playing when switching tracks
    setIsPlaying(true);
  };

  // Toggle play/pause
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  // Load the new track and play
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [trackIndex]);

  // Automatically play next track when current one ends
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handleEnded = () => {
      nextTrack();
    };
    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [audioRef, nextTrack]);

  return {
    playlist,
    trackIndex,
    nextTrack,
    prevTrack,
    isPlaying,
    audioRef,
    togglePlay,
  };
}
