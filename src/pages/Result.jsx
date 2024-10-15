import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaHome, FaReply } from "react-icons/fa"; // Importing Font Awesome icons

const Result = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { userChoice, computerChoice } = state;

  const getResult = () => {
    if (userChoice === computerChoice) return "It's a tie!";
    if (
      (userChoice === "Rock" && computerChoice === "Scissors") ||
      (userChoice === "Paper" && computerChoice === "Rock") ||
      (userChoice === "Scissors" && computerChoice === "Paper")
    ) {
      return "You Win!";
    }
    return "You Lose!";
  };

  return (
    <div
      className="flex flex-col items-center justify-center w-full h-full fixed bg-cover bg-center"
      style={{
        backgroundImage:
          "url('src/assets/d2hd73xxwvaa1.jpg')",
      }}
    >
      {/* Card container for result */}
      <div className="bg-white/80 backdrop-blur-md p-10 rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold text-center mb-8">{getResult()}</h2>
        
        <div className="text-center">
          <p className="mb-1 text-xl font-medium">You chose: {userChoice}</p>
          <p className="mb-5 text-xl font-medium">
            Computer chose: {computerChoice}
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => navigate("/game")}
            className="px-8 py-4 mx-1 bg-blue-600 text-white rounded-lg text-lg shadow-lg transition transform hover:scale-105 hover:bg-blue-500"
          >
            <FaReply className="text-6xl text-gray-800" /> Try Again
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-8 py-4 mx-1 bg-blue-600 text-white rounded-lg text-lg shadow-lg transition transform hover:scale-105 hover:bg-blue-500"
          >
            <FaHome className="text-6xl text-gray-800" /> Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;
