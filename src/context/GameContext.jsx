import React, { createContext, useContext, useState, useEffect } from 'react';

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const [highScores, setHighScores] = useState(() => {
    const saved = localStorage.getItem('highScores');
    return saved ? JSON.parse(saved) : [];
  });

  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('gameSettings');
    return saved ? JSON.parse(saved) : {
      soundEnabled: true,
      vibrationEnabled: true,
      theme: 'default',
      difficulty: 'normal'
    };
  });

  useEffect(() => {
    localStorage.setItem('highScores', JSON.stringify(highScores));
  }, [highScores]);

  useEffect(() => {
    localStorage.setItem('gameSettings', JSON.stringify(settings));
  }, [settings]);

  const addHighScore = (score) => {
    const newScore = {
      id: Date.now(),
      score,
      date: new Date().toLocaleDateString(),
      playerName: 'Player' // You can add a name input feature later
    };
    
    setHighScores(prev => {
      const newScores = [...prev, newScore].sort((a, b) => b.score - a.score).slice(0, 10);
      return newScores;
    });
  };

  const updateSettings = (newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <GameContext.Provider value={{
      highScores,
      addHighScore,
      settings,
      updateSettings
    }}>
      {children}
    </GameContext.Provider>
  );
}; 