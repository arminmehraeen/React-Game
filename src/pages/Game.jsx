import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHandRock, FaHandPaper, FaHandScissors } from "react-icons/fa"; // Importing Font Awesome icons

const choices = [
  { name: "Rock", icon: <FaHandRock className="text-6xl text-gray-800" /> },
  { name: "Paper", icon: <FaHandPaper className="text-6xl text-gray-800" /> },
  { name: "Scissors", icon: <FaHandScissors className="text-6xl text-gray-800" /> },
];

const Game = () => {
  const [userChoice, setUserChoice] = useState(null);
  const navigate = useNavigate();

  const handleChoice = (choice) => {
    setUserChoice(choice);
    const computerChoice =
      choices[Math.floor(Math.random() * choices.length)].name;
    navigate("/result", { state: { userChoice: choice, computerChoice } });
  };

  return (
    <div
      className="flex flex-col items-center justify-center w-full h-full fixed bg-cover bg-center"
      style={{
        backgroundImage:
          "url('src/assets/d2hd73xxwvaa1.jpg')",
      }}
    >
      {/* Card container */}
      <div className="bg-white/80 backdrop-blur-md p-10 rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold text-center mb-8">Choose your option</h2>

        {/* Choices as icons */}
        <div className="flex justify-center space-x-8">
          {choices.map((choice) => (
            <button
              key={choice.name}
              onClick={() => handleChoice(choice.name)}
              className="flex flex-col items-center space-y-2 p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition transform hover:scale-105"
            >
              {choice.icon}
              <span className="text-xl font-medium">{choice.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Game;
