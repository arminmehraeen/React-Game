import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaVolumeUp, FaVolumeMute, FaMobile, FaMoon, FaSun } from 'react-icons/fa';
import { useGame } from '../context/GameContext';

const Settings = () => {
  const navigate = useNavigate();
  const { settings, updateSettings } = useGame();

  const themes = [
    { id: 'default', name: 'Default', icon: <FaSun className="text-yellow-500" /> },
    { id: 'dark', name: 'Dark', icon: <FaMoon className="text-gray-700" /> },
    { id: 'neon', name: 'Neon', icon: <span className="text-pink-500">✨</span> },
  ];

  const difficulties = [
    { id: 'easy', name: 'Easy' },
    { id: 'normal', name: 'Normal' },
    { id: 'hard', name: 'Hard' },
  ];

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
          <h1 className="text-4xl font-bold text-gray-800">Settings</h1>
          <div className="w-8" />
        </div>

        <div className="space-y-8">
          {/* Sound Settings */}
          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Sound & Vibration</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {settings.soundEnabled ? (
                    <FaVolumeUp className="text-2xl text-blue-500" />
                  ) : (
                    <FaVolumeMute className="text-2xl text-gray-400" />
                  )}
                  <span className="text-lg text-gray-700">Sound Effects</span>
                </div>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => updateSettings({ soundEnabled: !settings.soundEnabled })}
                  className={`w-14 h-7 rounded-full p-1 transition-colors ${
                    settings.soundEnabled ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                >
                  <motion.div
                    animate={{ x: settings.soundEnabled ? 28 : 0 }}
                    className="w-5 h-5 bg-white rounded-full shadow-md"
                  />
                </motion.button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <FaMobile className={`text-2xl ${settings.vibrationEnabled ? 'text-blue-500' : 'text-gray-400'}`} />
                  <span className="text-lg text-gray-700">Vibration</span>
                </div>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => updateSettings({ vibrationEnabled: !settings.vibrationEnabled })}
                  className={`w-14 h-7 rounded-full p-1 transition-colors ${
                    settings.vibrationEnabled ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                >
                  <motion.div
                    animate={{ x: settings.vibrationEnabled ? 28 : 0 }}
                    className="w-5 h-5 bg-white rounded-full shadow-md"
                  />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Theme Selection */}
          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Theme</h2>
            <div className="grid grid-cols-3 gap-4">
              {themes.map((theme) => (
                <motion.button
                  key={theme.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => updateSettings({ theme: theme.id })}
                  className={`p-4 rounded-xl flex flex-col items-center space-y-2 ${
                    settings.theme === theme.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-white/50 text-gray-700'
                  }`}
                >
                  <div className="text-2xl">{theme.icon}</div>
                  <span className="font-medium">{theme.name}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Difficulty Selection */}
          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Difficulty</h2>
            <div className="grid grid-cols-3 gap-4">
              {difficulties.map((difficulty) => (
                <motion.button
                  key={difficulty.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => updateSettings({ difficulty: difficulty.id })}
                  className={`p-4 rounded-xl text-center font-medium ${
                    settings.difficulty === difficulty.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-white/50 text-gray-700'
                  }`}
                >
                  {difficulty.name}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          className="mt-8 w-full bg-blue-500 text-white py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors"
        >
          Save Settings
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Settings; 