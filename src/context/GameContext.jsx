import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const GameContext = createContext(null);
const STATE_KEY = "rps-arena-state-v2";

const defaultSettings = {
  playerName: "Player One",
  soundEnabled: true,
  vibrationEnabled: true,
  theme: "aurora",
  difficulty: "normal",
  bestOf: 5,
};

const defaultStats = {
  gamesPlayed: 0,
  wins: 0,
  losses: 0,
  draws: 0,
  totalPoints: 0,
  currentStreak: 0,
  bestStreak: 0,
};

function readState() {
  try {
    const current = localStorage.getItem(STATE_KEY);
    if (current) {
      const parsed = JSON.parse(current);
      return {
        settings: { ...defaultSettings, ...(parsed.settings || {}) },
        stats: { ...defaultStats, ...(parsed.stats || {}) },
        highScores: Array.isArray(parsed.highScores) ? parsed.highScores : [],
      };
    }

    // Migrate data from the original app without discarding existing records.
    const oldSettings = JSON.parse(localStorage.getItem("gameSettings") || "{}");
    const oldScores = JSON.parse(localStorage.getItem("highScores") || "[]");
    return {
      settings: { ...defaultSettings, ...oldSettings },
      stats: defaultStats,
      highScores: Array.isArray(oldScores) ? oldScores : [],
    };
  } catch {
    return { settings: defaultSettings, stats: defaultStats, highScores: [] };
  }
}

export function GameProvider({ children }) {
  const [initialState] = useState(readState);
  const [settings, setSettings] = useState(initialState.settings);
  const [stats, setStats] = useState(initialState.stats);
  const [highScores, setHighScores] = useState(initialState.highScores);

  useEffect(() => {
    try {
      localStorage.setItem(STATE_KEY, JSON.stringify({ settings, stats, highScores }));
      localStorage.setItem("gameSettings", JSON.stringify(settings));
      localStorage.setItem("highScores", JSON.stringify(highScores));
    } catch {
      // Keep the game playable if browser storage is unavailable.
    }
  }, [settings, stats, highScores]);

  const updateSettings = (next) => setSettings((current) => ({ ...current, ...next }));

  const recordMatch = ({ result, score = 0 }) => {
    setStats((current) => {
      const won = result === "win";
      const lost = result === "lose";
      const streak = won ? current.currentStreak + 1 : 0;
      return {
        ...current,
        gamesPlayed: current.gamesPlayed + 1,
        wins: current.wins + (won ? 1 : 0),
        losses: current.losses + (lost ? 1 : 0),
        draws: current.draws + (result === "draw" ? 1 : 0),
        totalPoints: current.totalPoints + score,
        currentStreak: streak,
        bestStreak: Math.max(current.bestStreak, streak),
      };
    });

    if (score > 0) {
      const entry = {
        id: Date.now(),
        score,
        date: new Date().toLocaleDateString(),
        playerName: settings.playerName?.trim() || "Player One",
      };
      setHighScores((current) => [...current, entry].sort((a, b) => b.score - a.score).slice(0, 10));
    }
  };

  const resetProgress = () => {
    setStats(defaultStats);
    setHighScores([]);
  };

  const value = useMemo(() => ({
    settings, updateSettings, stats, highScores, recordMatch, resetProgress,
  }), [settings, stats, highScores]);

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) throw new Error("useGame must be used inside GameProvider");
  return context;
}
