// src/components/Essentials.js
import React from 'react';
import Sweater from "../assets/sweater.png";
import Dress from "../assets/dress.png";
import Shirt from "../assets/shirt.png";
import Pants from "../assets/pant.png";
import { useNavigate } from "react-router-dom";

const Essentials = () => {
  const navigate = useNavigate();

  const navigateToCategory = (category) => {
    navigate(`/collection/${category}`);
  };

  return (
    <section className="py-16 px-10">
      <div className="grid grid-cols-3 grid-rows-2 gap-4">
        <div className="mb-8">
          <h2 className="text-3xl font-semibold text-left">Essentials of Seasons</h2>
        </div>

        {/* Sweaters */}
        <div
          className="relative group cursor-pointer"
          onClick={() => navigateToCategory("sweaters")}
        >
          <img
            src={Sweater}
            alt="Sweaters"
            className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-black font-bold text-lg px-2 py-1 rounded">Sweaters</p>
          </div>
        </div>

        {/* Dresses */}
        <div
          className="relative group row-span-2 cursor-pointer"
          onClick={() => navigateToCategory("dresses")}
        >
          <img
            src={Dress}
            alt="Dresses"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-black font-bold text-lg px-2 py-1 rounded">Dresses</p>
          </div>
        </div>

        {/* Shirts */}
        <div
          className="relative group cursor-pointer"
          onClick={() => navigateToCategory("shirts")}
        >
          <img
            src={Shirt}
            alt="Shirts"
            className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-black font-bold text-lg px-2 py-1 rounded">Shirts</p>
          </div>
        </div>

        {/* Pants */}
        <div
          className="relative group cursor-pointer"
          onClick={() => navigateToCategory("pants")}
        >
          <img
            src={Pants}
            alt="Pants"
            className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-black font-bold text-lg px-2 py-1 rounded">Pants</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Essentials;
