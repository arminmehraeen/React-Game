import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaTrophy, FaArrowLeft, FaMedal, FaGamepad } from "react-icons/fa";
import { useGame } from "../context/GameContext";

const HighScores = () => {
  const navigate = useNavigate();
  const { highScores, stats } = useGame();
  const medals = ["🥇", "🥈", "🥉"];
  return <main className="app-shell min-h-screen px-4 py-8 sm:px-6 sm:py-10"><div className="ambient ambient-one" /><div className="relative z-10 mx-auto max-w-3xl">
    <header className="mb-7 flex items-center justify-between"><button onClick={() => navigate("/")} className="secondary-button"><FaArrowLeft /> Back</button><div className="text-right"><p className="eyebrow">YOUR PERSONAL BESTS</p><h1 className="text-2xl font-black text-white sm:text-3xl">Leaderboard</h1></div></header>
    <section className="hero-panel p-5 sm:p-8"><div className="flex items-center gap-4"><div className="brand-mark"><FaTrophy /></div><div><h2 className="text-xl font-extrabold text-white">Hall of fame</h2><p className="text-sm text-slate-400">Your top ten scores, saved on this device.</p></div></div>
      <div className="mt-6 grid grid-cols-3 gap-3"><div className="mini-stat"><strong>{stats.gamesPlayed}</strong><span>Matches</span></div><div className="mini-stat"><strong>{stats.wins}</strong><span>Wins</span></div><div className="mini-stat"><strong>{stats.bestStreak}</strong><span>Best streak</span></div></div>
      {highScores.length === 0 ? <div className="empty-state mt-6"><FaMedal className="text-4xl text-amber-300" /><h3 className="mt-4 text-lg font-bold text-white">Your legend starts here</h3><p className="mt-2 text-sm text-slate-400">Win a match to put your first score on the board.</p></div> :
      <div className="mt-6 space-y-3">{highScores.map((item, index) => <motion.div key={item.id || `${item.playerName}-${item.score}-${index}`} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * .04 }} className={`leader-row ${index === 0 ? "leader-first" : ""}`}><div className="leader-rank">{medals[index] || String(index + 1).padStart(2, "0")}</div><div className="min-w-0 flex-1"><p className="truncate font-bold text-white">{item.playerName || "Player One"}</p><p className="mt-1 text-xs text-slate-500">{item.date || "Personal best"}</p></div><div className="text-right"><strong className="block text-xl font-black text-white">{item.score}</strong><span className="text-[10px] tracking-widest text-slate-500">POINTS</span></div></motion.div>)}</div>}
      <button onClick={() => navigate("/game")} className="primary-button mt-6 w-full justify-center"><FaGamepad /> Play for a new record</button>
    </section>
  </div></main>;
};
export default HighScores;
