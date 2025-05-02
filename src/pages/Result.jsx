import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHandRock, FaHandPaper, FaHandScissors } from "react-icons/fa";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userChoice, computerChoice, score } = location.state || {};

  const getIcon = (choice) => {
    switch (choice) {
      case "Rock":
        return <FaHandRock className="text-8xl" />;
      case "Paper":
        return <FaHandPaper className="text-8xl" />;
      case "Scissors":
        return <FaHandScissors className="text-8xl" />;
      default:
        return null;
    }
  };

  const getResult = () => {
    if (userChoice === computerChoice) return "draw";
    if (
      (userChoice === "Rock" && computerChoice === "Scissors") ||
      (userChoice === "Paper" && computerChoice === "Rock") ||
      (userChoice === "Scissors" && computerChoice === "Paper")
    ) {
      return "win";
    }
    return "lose";
  };

  const result = getResult();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 max-w-2xl w-full"
      >
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">Game Result</h2>
          <p className="text-xl text-gray-600">Score: {score}</p>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="text-center"
          >
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">Your Choice</h3>
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 360],
              }}
              transition={{ duration: 1 }}
              className="flex justify-center"
            >
              {getIcon(userChoice)}
            </motion.div>
            <p className="mt-4 text-xl font-medium text-gray-600">{userChoice}</p>
          </motion.div>

          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="text-center"
          >
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">Computer's Choice</h3>
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, -360],
              }}
              transition={{ duration: 1 }}
              className="flex justify-center"
            >
              {getIcon(computerChoice)}
            </motion.div>
            <p className="mt-4 text-xl font-medium text-gray-600">{computerChoice}</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <h2 className={`text-3xl font-bold ${
            result === 'win' ? 'text-green-600' :
            result === 'lose' ? 'text-red-600' :
            'text-blue-600'
          }`}>
            {result === 'win' ? 'You Win! 🎉' :
             result === 'lose' ? 'You Lose! 😢' :
             'It\'s a Draw! 🤝'}
          </h2>
        </motion.div>

        <div className="flex justify-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/game")}
            className="bg-blue-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors"
          >
            Play Again
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/")}
            className="bg-gray-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-gray-600 transition-colors"
          >
            Main Menu
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Result;
