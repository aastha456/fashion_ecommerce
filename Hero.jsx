// src/components/Hero.js
import React from 'react';
import HeroImg from "../assets/Rectangle1.png";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative text-center py-0">
      <img src={HeroImg} alt="Fashion model" className="w-full h-auto object-cover" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-black">
        <h1 className="text-4xl font-bold">Effortless style, timeless fashion</h1>
        <button
          className="mt-4 bg-black text-white py-2 px-4 rounded transition hover:bg-white hover:text-black hover:scale-105"
          onClick={() => navigate("/collection")}
        >
          Shop Now
        </button>
      </div>
    </section>
  );
};

export default Hero;
