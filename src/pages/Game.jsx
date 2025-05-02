import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHandRock, FaHandPaper, FaHandScissors } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useGame } from "../context/GameContext";

const choices = [
  { name: "Rock", icon: <FaHandRock className="text-6xl" />, color: "bg-red-500" },
  { name: "Paper", icon: <FaHandPaper className="text-6xl" />, color: "bg-blue-500" },
  { name: "Scissors", icon: <FaHandScissors className="text-6xl" />, color: "bg-green-500" },
];

const Game = () => {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [score, setScore] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const navigate = useNavigate();
  const { settings, addHighScore } = useGame();

  const handleChoice = (choice) => {
    if (settings.vibrationEnabled && navigator.vibrate) {
      navigator.vibrate(50);
    }

    setIsAnimating(true);
    setUserChoice(choice);
    
    // Computer choice with delay
    setTimeout(() => {
      const compChoice = choices[Math.floor(Math.random() * choices.length)].name;
      setComputerChoice(compChoice);
      
      // Calculate result
      const result = calculateResult(choice, compChoice);
      if (result === 'win') {
        setScore(prev => prev + 1);
      }
      
      // Show result and navigate
      setShowResult(true);
      setTimeout(() => {
        const newScore = score + (result === 'win' ? 1 : 0);
        if (result === 'win') {
          addHighScore(newScore);
        }
        navigate("/result", { 
          state: { 
            userChoice: choice, 
            computerChoice: compChoice,
            score: newScore
          } 
        });
      }, 1500);
    }, 1000);
  };

  const calculateResult = (user, computer) => {
    if (user === computer) return 'draw';
    if (
      (user === 'Rock' && computer === 'Scissors') ||
      (user === 'Paper' && computer === 'Rock') ||
      (user === 'Scissors' && computer === 'Paper')
    ) return 'win';
    return 'lose';
  };

  // Apply theme based on settings
  const getThemeClasses = () => {
    switch (settings.theme) {
      case 'dark':
        return 'from-gray-900 to-gray-700';
      case 'neon':
        return 'from-pink-500 to-purple-500';
      default:
        return 'from-purple-600 to-blue-500';
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getThemeClasses()} flex items-center justify-center p-4`}>
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 max-w-2xl w-full"
      >
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">Rock Paper Scissors</h2>
          <p className="text-xl text-gray-600">Score: {score}</p>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {choices.map((choice) => (
            <motion.button
              key={choice.name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleChoice(choice.name)}
              disabled={isAnimating}
              className={`${choice.color} p-6 rounded-xl shadow-lg transform transition-all duration-200 hover:shadow-xl disabled:opacity-50`}
            >
              <div className="flex flex-col items-center space-y-3">
                <motion.div
                  animate={isAnimating && userChoice === choice.name ? {
                    rotate: [0, 360],
                    scale: [1, 1.2, 1]
                  } : {}}
                  transition={{ duration: 0.5 }}
                >
                  {choice.icon}
                </motion.div>
                <span className="text-white text-xl font-semibold">{choice.name}</span>
              </div>
            </motion.button>
          ))}
        </div>

        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-8 text-center"
            >
              <p className="text-2xl font-bold text-gray-800">
                {calculateResult(userChoice, computerChoice) === 'win' ? 'You Win! 🎉' : 
                 calculateResult(userChoice, computerChoice) === 'lose' ? 'You Lose! 😢' : 
                 'It\'s a Draw! 🤝'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Game;
