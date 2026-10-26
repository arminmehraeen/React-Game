import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHandRock, FaHandPaper, FaHandScissors, FaArrowLeft, FaBolt, FaKeyboard } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useGame } from "../context/GameContext";

const choices = [
  { name: "Rock", label: "Rock", emoji: "✊", icon: <FaHandRock />, key: "R", tone: "rock", beats: "Scissors" },
  { name: "Paper", label: "Paper", emoji: "✋", icon: <FaHandPaper />, key: "P", tone: "paper", beats: "Rock" },
  { name: "Scissors", label: "Scissors", emoji: "✌️", icon: <FaHandScissors />, key: "S", tone: "scissors", beats: "Paper" },
];
const outcome = (player, cpu) => player === cpu ? "draw" : choices.find((item) => item.name === player)?.beats === cpu ? "win" : "lose";
const counter = { Rock: "Paper", Paper: "Scissors", Scissors: "Rock" };

function pickComputer(difficulty, history) {
  if (difficulty === "hard" && history.length && Math.random() < .62) return counter[history[history.length - 1]];
  if (difficulty === "easy" && history.length && Math.random() < .55) return choices.find((item) => item.beats === history[history.length - 1])?.name || "Rock";
  return choices[Math.floor(Math.random() * choices.length)].name;
}

const Game = () => {
  const navigate = useNavigate();
  const { settings, recordMatch } = useGame();
  const target = Math.ceil((Number(settings.bestOf) || 5) / 2);
  const [round, setRound] = useState(1);
  const [playerRounds, setPlayerRounds] = useState(0);
  const [cpuRounds, setCpuRounds] = useState(0);
  const [playerChoice, setPlayerChoice] = useState(null);
  const [cpuChoice, setCpuChoice] = useState(null);
  const [roundResult, setRoundResult] = useState(null);
  const [phase, setPhase] = useState("ready");
  const [history, setHistory] = useState([]);
  const [countdown, setCountdown] = useState(3);
  const [rounds, setRounds] = useState([]);
  const [finished, setFinished] = useState(false);

  const finishMatch = (finalPlayer, finalCpu, finalRounds) => {
    const result = finalPlayer > finalCpu ? "win" : finalPlayer < finalCpu ? "lose" : "draw";
    const wins = finalRounds.filter((item) => item.result === "win").length;
    const score = wins * 100 + (result === "win" ? 150 : result === "draw" ? 40 : 15) + Math.max(0, wins - 1) * 25;
    recordMatch({ result, score });
    setFinished(true);
    window.setTimeout(() => navigate("/result", { state: { result, score, playerRounds: finalPlayer, cpuRounds: finalCpu, rounds: finalRounds, playerName: settings.playerName } }), 500);
  };

  const playRound = (choice) => {
    if (phase !== "ready" || finished) return;
    setPlayerChoice(choice);
    setCpuChoice(null);
    setRoundResult(null);
    setPhase("countdown");
    setCountdown(3);
    if (settings.vibrationEnabled && typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate(35);
  };

  useEffect(() => {
    if (phase !== "countdown") return undefined;
    if (countdown === 0) {
      const comp = pickComputer(settings.difficulty, history);
      const result = outcome(playerChoice, comp);
      const nextRounds = [...rounds, { round, playerChoice, computerChoice: comp, result }];
      const nextPlayer = playerRounds + (result === "win" ? 1 : 0);
      const nextCpu = cpuRounds + (result === "lose" ? 1 : 0);
      setCpuChoice(comp);
      setRoundResult(result);
      setRounds(nextRounds);
      setHistory((current) => [...current, playerChoice]);
      setPlayerRounds(nextPlayer);
      setCpuRounds(nextCpu);
      setPhase("revealed");
      if (nextPlayer >= target || nextCpu >= target || round >= Number(settings.bestOf || 5)) {
        window.setTimeout(() => finishMatch(nextPlayer, nextCpu, nextRounds), 1300);
      }
      return undefined;
    }
    const timer = window.setTimeout(() => setCountdown((value) => value - 1), 650);
    return () => window.clearTimeout(timer);
  }, [phase, countdown, playerChoice]);

  useEffect(() => {
    if (phase !== "revealed" || finished) return undefined;
    if (playerRounds >= target || cpuRounds >= target || round >= Number(settings.bestOf || 5)) return undefined;
    const timer = window.setTimeout(() => {
      setRound((value) => value + 1);
      setPlayerChoice(null);
      setCpuChoice(null);
      setRoundResult(null);
      setPhase("ready");
    }, 1100);
    return () => window.clearTimeout(timer);
  }, [phase, finished]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.repeat || phase !== "ready") return;
      const match = choices.find((item) => item.key.toLowerCase() === event.key.toLowerCase());
      if (match) playRound(match.name);
      if (event.key === "Escape") navigate("/");
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [phase, navigate, playerChoice, finished]);

  const currentResult = roundResult ? ({ win: "Round won!", lose: "Round lost", draw: "It's a draw" }[roundResult]) : "Make your move";
  const progress = Math.min(100, (round / Number(settings.bestOf || 5)) * 100);

  return (
    <main className="app-shell min-h-screen px-4 py-6 sm:px-6 sm:py-10">
      <div className="ambient ambient-one" /><div className="ambient ambient-two" />
      <div className="relative z-10 mx-auto max-w-5xl">
        <header className="mb-8 flex items-center justify-between gap-4">
          <button onClick={() => navigate("/")} className="secondary-button"><FaArrowLeft /> <span>Exit arena</span></button>
          <div className="text-right"><p className="eyebrow">MATCH IN PROGRESS</p><p className="text-sm font-bold text-white">{settings.playerName || "Player One"} <span className="text-slate-500">vs</span> CPU</p></div>
        </header>

        <section className="hero-panel p-5 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div><span className="status-pill"><span className="status-dot" /> BEST OF {settings.bestOf || 5}</span><h1 className="mt-4 text-3xl font-black text-white sm:text-4xl">Choose your move.</h1><p className="mt-2 text-sm text-slate-400">First to {target} rounds wins the match.</p></div>
            <div className="scoreboard"><div><span className="score-number">{playerRounds}</span><span className="score-name">YOU</span></div><span className="score-divider">:</span><div><span className="score-number">{cpuRounds}</span><span className="score-name">CPU</span></div></div>
          </div>
          <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-white/5"><motion.div animate={{ width: `${progress}%` }} className="h-full rounded-full bg-gradient-to-r from-violet-400 to-cyan-300" /></div>
          <div className="mt-2 flex justify-between text-xs text-slate-500"><span>Round {round} / {settings.bestOf || 5}</span><span>{settings.difficulty || "normal"} AI</span></div>

          <div className="versus-stage mt-7">
            <div className="player-display"><span className="player-tag">YOUR MOVE</span><AnimatePresence mode="wait"><motion.div key={playerChoice || "you"} initial={{ opacity: 0, scale: .7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .7 }} className={`big-choice ${playerChoice ? "selected" : ""}`}>{playerChoice ? choices.find((item) => item.name === playerChoice)?.emoji : "?"}</motion.div></AnimatePresence><span className="player-label">{playerChoice || "Pick below"}</span></div>
            <div className="versus-center"><span className="versus-line" /><span className="versus-badge">VS</span><span className="versus-line" /></div>
            <div className="player-display"><span className="player-tag">OPPONENT</span><AnimatePresence mode="wait"><motion.div key={cpuChoice || phase} initial={{ opacity: 0, scale: .7, rotate: -12 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} exit={{ opacity: 0, scale: .7 }} className={`big-choice ${cpuChoice ? "selected" : ""}`}>{cpuChoice ? choices.find((item) => item.name === cpuChoice)?.emoji : phase === "countdown" ? countdown || "!" : "?"}</motion.div></AnimatePresence><span className="player-label">{cpuChoice || "Waiting for reveal"}</span></div>
          </div>

          <AnimatePresence mode="wait"><motion.div key={currentResult} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className={`round-status ${roundResult ? `result-${roundResult}` : ""}`}>{phase === "countdown" ? <><FaBolt className="inline mr-2" /> {countdown > 0 ? "Locking in your move…" : "Reveal!"}</> : currentResult}</motion.div></AnimatePresence>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {choices.map((choice) => <motion.button key={choice.name} whileHover={phase === "ready" ? { y: -5, scale: 1.015 } : {}} whileTap={{ scale: .98 }} disabled={phase !== "ready" || finished} onClick={() => playRound(choice.name)} className={`move-card move-${choice.tone} ${playerChoice === choice.name ? "move-selected" : ""}`}>
              <span className="move-emoji">{choice.emoji}</span><span className="mt-3 block text-lg font-extrabold text-white">{choice.label}</span><span className="mt-1 block text-xs text-slate-400">Press {choice.key}</span><span className="move-card-icon">{choice.icon}</span>
            </motion.button>)}
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500"><span><FaKeyboard className="mr-1 inline" /> Keyboard shortcuts: R / P / S</span><span>{phase === "ready" ? "Choose carefully." : finished ? "Match complete…" : "One moment…"}</span></div>
        </section>
        <div className="mt-4 grid grid-cols-3 gap-3">{rounds.map((item, index) => <div key={index} className="round-chip"><span>ROUND {item.round}</span><strong className={`result-${item.result}`}>{item.result === "win" ? "WIN" : item.result === "lose" ? "LOSS" : "DRAW"}</strong><small>{item.playerChoice} · {item.computerChoice}</small></div>)}</div>
      </div>
    </main>
  );
};

export default Game;
