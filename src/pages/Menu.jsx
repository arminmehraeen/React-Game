import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const navigate = useNavigate();

  useEffect(() => {

    const timer = setTimeout(() => {
      navigate("/game");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);


  return (
    <div
      className="flex flex-col items-center justify-center w-full h-full fixed bg-cover bg-center"
      style={{
        backgroundImage:
          "url('src/assets/d2hd73xxwvaa1.jpg')",
      }}
    >
      <div className="bg-white/50 backdrop-blur-md rounded-lg p-10 shadow-2xl">
        <h1 className="text-5xl font-extrabold mb-8 text-gray-800">
          Rock Paper Scissors
        </h1>
        <p className="text-lg text-gray-600">Starting game in 2 seconds...</p>
      </div>
    </div>
  );
};

export default Menu;
