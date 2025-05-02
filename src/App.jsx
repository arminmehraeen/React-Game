import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GameProvider } from "./context/GameContext";
import Menu from "./pages/Menu";
import Game from "./pages/Game";
import Result from "./pages/Result";
import HighScores from "./pages/HighScores";
import Settings from "./pages/Settings";

function App() {
  return (
    <GameProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500">
          <Routes>
            <Route path="/" element={<Menu />} />
            <Route path="/game" element={<Game />} />
            <Route path="/result" element={<Result />} />
            <Route path="/high-scores" element={<HighScores />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Menu />} />
          </Routes>
        </div>
      </Router>
    </GameProvider>
  );
}

export default App;
