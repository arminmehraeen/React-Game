import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaGamepad, FaTrophy, FaCog, FaBolt, FaFire, FaChartLine } from "react-icons/fa";
import { useGame } from "../context/GameContext";

const Menu = () => {
  const navigate = useNavigate();
  const { highScores, stats, settings } = useGame();
  const winRate = stats.gamesPlayed ? Math.round((stats.wins / stats.gamesPlayed) * 100) : 0;

  const actions = [
    { title: "Play Arena", detail: "Jump into a new match", icon: <FaGamepad />, action: () => navigate("/game"), accent: "violet" },
    { title: "Leaderboard", detail: "Your best runs, ranked", icon: <FaTrophy />, action: () => navigate("/high-scores"), accent: "amber" },
    { title: "Customize", detail: "Make the arena yours", icon: <FaCog />, action: () => navigate("/settings"), accent: "cyan" },
  ];

  return (
    <main className="app-shell flex min-h-screen items-center justify-center px-4 py-10 sm:px-6">
      <div className="ambient ambient-one" /><div className="ambient ambient-two" />
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55 }} className="relative z-10 w-full max-w-5xl">
        <header className="mb-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="brand-mark"><FaBolt /></div>
            <div><p className="eyebrow">ARCADE / 001</p><p className="text-sm font-bold tracking-wide text-white">RPS ARENA</p></div>
          </div>
          <button onClick={() => navigate("/settings")} className="icon-button" aria-label="Open settings"><FaCog /></button>
        </header>

        <section className="hero-panel overflow-hidden">
          <div className="hero-grid" />
          <div className="relative grid gap-10 p-6 sm:p-10 md:grid-cols-[1.15fr_.85fr] md:items-center">
            <div>
              <span className="status-pill"><span className="status-dot" /> READY TO PLAY</span>
              <h1 className="hero-title mt-5">Your next<br /><span className="gradient-text">winning streak</span><br />starts here.</h1>
              <p className="mt-5 max-w-lg text-sm leading-7 text-slate-300 sm:text-base">Read the move. Trust your instinct. Outplay the machine in a refreshed rock, paper, scissors arena.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <motion.button whileHover={{ y: -2 }} whileTap={{ scale: .98 }} onClick={() => navigate("/game")} className="primary-button"><FaGamepad /> Start a match <span aria-hidden="true">↗</span></motion.button>
                <button onClick={() => navigate("/high-scores")} className="secondary-button"><FaTrophy /> Leaderboard</button>
              </div>
              <p className="mt-5 text-xs text-slate-400">Signed in locally as <span className="font-semibold text-slate-200">{settings.playerName || "Player One"}</span></p>
            </div>
            <div className="showcase-card">
              <div className="showcase-top"><span className="eyebrow">THE CLASSIC TRIO</span><span className="live-chip">LIVE</span></div>
              <div className="choice-orbit">
                <motion.div animate={{ y: [0, -7, 0], rotate: [-4, 4, -4] }} transition={{ repeat: Infinity, duration: 4 }} className="orbit-choice orbit-rock">✊</motion.div>
                <motion.div animate={{ y: [0, 7, 0], rotate: [4, -4, 4] }} transition={{ repeat: Infinity, duration: 4.5 }} className="orbit-choice orbit-paper">✋</motion.div>
                <motion.div animate={{ y: [0, -5, 0], rotate: [-3, 3, -3] }} transition={{ repeat: Infinity, duration: 3.8 }} className="orbit-choice orbit-scissors">✌️</motion.div>
                <div className="orbit-center"><FaBolt /></div>
              </div>
              <div className="showcase-footer"><span>BEST OF {settings.bestOf || 5}</span><span>•</span><span>{settings.difficulty || "normal"} difficulty</span></div>
            </div>
          </div>
        </section>

        <section className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            { label: "Matches played", value: stats.gamesPlayed, icon: <FaGamepad />, tone: "violet" },
            { label: "Win rate", value: `${winRate}%`, icon: <FaChartLine />, tone: "cyan" },
            { label: "Best streak", value: stats.bestStreak, icon: <FaFire />, tone: "orange" },
            { label: "Top score", value: highScores[0]?.score || 0, icon: <FaTrophy />, tone: "amber" },
          ].map((stat, index) => <motion.div key={stat.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .1 + index * .07 }} className="stat-card">
            <div className={`stat-icon ${stat.tone}`}>{stat.icon}</div><p className="stat-value">{stat.value}</p><p className="stat-label">{stat.label}</p>
          </motion.div>)}
        </section>

        <section className="mt-7 grid gap-3 md:grid-cols-3">
          {actions.map((item, index) => <motion.button key={item.title} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .2 + index * .08 }} whileHover={{ y: -3 }} onClick={item.action} className="action-card text-left">
            <span className={`action-icon ${item.accent}`}>{item.icon}</span><span className="mt-4 block text-base font-bold text-white">{item.title}</span><span className="mt-1 block text-sm text-slate-400">{item.detail}</span><span className="action-arrow">↗</span>
          </motion.button>)}
        </section>
        <footer className="mt-7 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500"><span>RPS ARENA <span className="mx-1">/</span> BUILT FOR YOUR NEXT REMATCH</span><span>Progress is saved on this device.</span></footer>
      </motion.div>
    </main>
  );
};

export default Menu;
