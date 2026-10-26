import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft, FaVolumeUp, FaMobileAlt, FaMoon, FaSun, FaBolt, FaTrashAlt } from "react-icons/fa";
import { useGame } from "../context/GameContext";

const Toggle = ({ label, detail, checked, onChange, icon }) => <div className="setting-row"><div className="flex items-center gap-3"><span className="setting-icon">{icon}</span><div><p className="font-bold text-white">{label}</p><p className="mt-1 text-xs text-slate-500">{detail}</p></div></div><button type="button" role="switch" aria-checked={checked} aria-label={label} onClick={onChange} className={`toggle-track ${checked ? "toggle-on" : ""}`}><span className="toggle-thumb" /></button></div>;

const Settings = () => {
  const navigate = useNavigate();
  const { settings, updateSettings, resetProgress } = useGame();
  const [name, setName] = useState(settings.playerName || "Player One");
  const [confirmReset, setConfirmReset] = useState(false);
  const themes = [{ id: "aurora", name: "Aurora", icon: <FaBolt /> }, { id: "dark", name: "Midnight", icon: <FaMoon /> }, { id: "light", name: "Daylight", icon: <FaSun /> }, { id: "neon", name: "Cyber", icon: <span>✦</span> }];
  return <main className="app-shell min-h-screen px-4 py-8 sm:px-6 sm:py-10"><div className="ambient ambient-two" /><div className="relative z-10 mx-auto max-w-3xl">
    <header className="mb-7 flex items-center justify-between"><button onClick={() => navigate("/")} className="secondary-button"><FaArrowLeft /> Back</button><div className="text-right"><p className="eyebrow">MAKE IT YOURS</p><h1 className="text-2xl font-black text-white sm:text-3xl">Settings</h1></div></header>
    <section className="hero-panel space-y-7 p-5 sm:p-8">
      <div><h2 className="section-heading">Player profile</h2><p className="section-description">Your name appears in the arena and on your score records.</p><label htmlFor="player-name" className="mt-4 block text-xs font-bold uppercase tracking-widest text-slate-400">Display name</label><input id="player-name" maxLength={22} value={name} onChange={(event) => setName(event.target.value)} className="field-input mt-2" placeholder="Enter your name" /></div>
      <div><h2 className="section-heading">Match format</h2><p className="section-description">Choose how long each match lasts.</p><div className="mt-4 grid grid-cols-3 gap-3">{[1, 3, 5].map((count) => <button key={count} onClick={() => updateSettings({ bestOf: count })} className={`option-card ${Number(settings.bestOf) === count ? "option-active" : ""}`}><strong>Best of {count}</strong><span>{Math.ceil(count / 2)} to win</span></button>)}</div></div>
      <div><h2 className="section-heading">Difficulty</h2><p className="section-description">The computer adapts its strategy to the selected level.</p><div className="mt-4 grid grid-cols-3 gap-3">{[{ id: "easy", title: "Easy", detail: "Relaxed" }, { id: "normal", title: "Normal", detail: "Balanced" }, { id: "hard", title: "Hard", detail: "Clever AI" }].map((item) => <button key={item.id} onClick={() => updateSettings({ difficulty: item.id })} className={`option-card ${settings.difficulty === item.id ? "option-active" : ""}`}><strong>{item.title}</strong><span>{item.detail}</span></button>)}</div></div>
      <div><h2 className="section-heading">Appearance</h2><p className="section-description">Pick the atmosphere for your arena.</p><div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">{themes.map((theme) => <button key={theme.id} onClick={() => updateSettings({ theme: theme.id })} className={`theme-option ${settings.theme === theme.id ? "theme-active" : ""}`}><span>{theme.icon}</span><strong>{theme.name}</strong></button>)}</div></div>
      <div><h2 className="section-heading">Experience</h2><div className="mt-3"><Toggle label="Sound effects" detail="Subtle audio feedback" checked={settings.soundEnabled} onChange={() => updateSettings({ soundEnabled: !settings.soundEnabled })} icon={<FaVolumeUp />} /><Toggle label="Vibration" detail="Haptic feedback on supported devices" checked={settings.vibrationEnabled} onChange={() => updateSettings({ vibrationEnabled: !settings.vibrationEnabled })} icon={<FaMobileAlt />} /></div></div>
      <div className="flex flex-col gap-3 sm:flex-row"><motion.button whileTap={{ scale: .98 }} onClick={() => { updateSettings({ playerName: name.trim() || "Player One" }); navigate("/"); }} className="primary-button flex-1 justify-center">Save preferences</motion.button><button onClick={() => { if (confirmReset) { resetProgress(); setConfirmReset(false); } else setConfirmReset(true); }} className="danger-button justify-center"><FaTrashAlt /> {confirmReset ? "Confirm reset" : "Reset records"}</button></div>
      {confirmReset && <p className="text-xs text-rose-300">Click “Confirm reset” again to clear your match statistics and leaderboard. Your settings will stay saved.</p>}
    </section>
  </div></main>;
};
export default Settings;
