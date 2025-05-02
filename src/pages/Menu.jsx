import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaGamepad, FaTrophy, FaCog } from "react-icons/fa";
import { useGame } from "../context/GameContext";

const Menu = () => {
  const navigate = useNavigate();
  const { highScores } = useGame();

  const menuItems = [
    {
      title: "Play Game",
      icon: <FaGamepad className="text-4xl" />,
      onClick: () => navigate("/game"),
      color: "bg-blue-500",
    },
    {
      title: "High Scores",
      icon: <FaTrophy className="text-4xl" />,
      onClick: () => navigate("/high-scores"),
      color: "bg-yellow-500",
      badge: highScores.length > 0 ? highScores[0].score : null,
    },
    {
      title: "Settings",
      icon: <FaCog className="text-4xl" />,
      onClick: () => navigate("/settings"),
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 max-w-2xl w-full"
      >
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-gray-800 mb-4">Rock Paper Scissors</h1>
          <p className="text-xl text-gray-600">Choose your destiny!</p>
        </motion.div>

        <div className="grid gap-6">
          {menuItems.map((item, index) => (
            <motion.button
              key={item.title}
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={item.onClick}
              className={`${item.color} p-6 rounded-xl shadow-lg transform transition-all duration-200 hover:shadow-xl relative`}
            >
              <div className="flex items-center justify-center space-x-4">
                <div className="text-white">{item.icon}</div>
                <span className="text-white text-2xl font-semibold">{item.title}</span>
              </div>
              {item.badge && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-white text-blue-500 rounded-full w-8 h-8 flex items-center justify-center font-bold shadow-lg"
                >
                  {item.badge}
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-gray-600">Made with ❤️ using React</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Menu;
