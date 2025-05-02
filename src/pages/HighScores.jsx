import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaTrophy, FaArrowLeft } from 'react-icons/fa';
import { useGame } from '../context/GameContext';

const HighScores = () => {
  const navigate = useNavigate();
  const { highScores } = useGame();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 max-w-2xl w-full"
      >
        <div className="flex items-center justify-between mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            <FaArrowLeft className="text-2xl" />
          </motion.button>
          <h1 className="text-4xl font-bold text-gray-800">High Scores</h1>
          <div className="w-8" /> {/* Spacer for alignment */}
        </div>

        {highScores.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <FaTrophy className="text-6xl text-yellow-500 mx-auto mb-4" />
            <p className="text-xl text-gray-600">No scores yet. Play the game to set some records!</p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {highScores.map((score, index) => (
              <motion.div
                key={score.id}
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/50 backdrop-blur-sm rounded-xl p-4 shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      index === 0 ? 'bg-yellow-400' :
                      index === 1 ? 'bg-gray-300' :
                      index === 2 ? 'bg-amber-600' :
                      'bg-blue-500'
                    }`}>
                      <span className="text-white font-bold">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{score.playerName}</h3>
                      <p className="text-sm text-gray-600">{score.date}</p>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-800">
                    {score.score}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/game')}
          className="mt-8 w-full bg-blue-500 text-white py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors"
        >
          Play Now
        </motion.button>
      </motion.div>
    </div>
  );
};

export default HighScores; 