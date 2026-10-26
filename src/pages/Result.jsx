import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaTrophy, FaRedoAlt, FaHome, FaBolt } from "react-icons/fa";

const Result = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  if (!state) return <main className="app-shell flex min-h-screen items-center justify-center p-5"><section className="hero-panel max-w-lg p-8 text-center"><h1 className="text-3xl font-black text-white">No match yet</h1><p className="my-4 text-slate-400">Play a match first to see your results.</p><button onClick={() => navigate("/game")} className="primary-button mx-auto"><FaRedoAlt /> Start a match</button></section></main>;

  const { result = "draw", score = 0, playerRounds = 0, cpuRounds = 0, rounds = [], playerName = "Player One" } = state;
  const won = result === "win";
  const heading = won ? "Victory is yours!" : result === "lose" ? "So close. Run it back." : "A perfectly even match.";
  const emoji = won ? "🏆" : result === "lose" ? "⚡" : "🤝";

  return <main className="app-shell flex min-h-screen items-center justify-center px-4 py-10">
    <div className="ambient ambient-one" /><div className="ambient ambient-two" />
    <motion.section initial={{ opacity: 0, y: 20, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="hero-panel relative z-10 w-full max-w-3xl p-6 text-center sm:p-10">
      <div className="result-emblem">{emoji}</div><p className="eyebrow mt-5">MATCH REPORT / FINAL</p><h1 className="mt-3 text-3xl font-black text-white sm:text-5xl">{heading}</h1><p className="mt-3 text-slate-400">{playerName}, every round makes you sharper.</p>
      <div className="scoreboard mx-auto mt-7"><div><span className="score-number">{playerRounds}</span><span className="score-name">YOU</span></div><span className="score-divider">:</span><div><span className="score-number">{cpuRounds}</span><span className="score-name">CPU</span></div></div>
      <div className="mx-auto mt-6 grid max-w-xl grid-cols-2 gap-3"><div className="result-stat"><span><FaBolt /></span><strong>+{score}</strong><small>POINTS EARNED</small></div><div className="result-stat"><span><FaTrophy /></span><strong>{rounds.length}</strong><small>ROUNDS PLAYED</small></div></div>
      {rounds.length > 0 && <div className="mt-6 text-left"><p className="eyebrow mb-3">ROUND BREAKDOWN</p><div className="space-y-2">{rounds.map((item, index) => <div key={index} className="round-row"><span>Round {item.round}</span><span>{item.playerChoice} <span className="text-slate-600">vs</span> {item.computerChoice}</span><strong className={`result-${item.result}`}>{item.result.toUpperCase()}</strong></div>)}</div></div>}
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><motion.button whileHover={{ y: -2 }} whileTap={{ scale: .98 }} onClick={() => navigate("/game")} className="primary-button justify-center"><FaRedoAlt /> Rematch</motion.button><button onClick={() => navigate("/high-scores")} className="secondary-button justify-center"><FaTrophy /> View leaderboard</button><button onClick={() => navigate("/")} className="secondary-button justify-center"><FaHome /> Main menu</button></div>
    </motion.section>
  </main>;
};

export default Result;
