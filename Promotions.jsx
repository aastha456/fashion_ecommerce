// src/components/Promotions.js
import React from 'react';
import Fashion from "../assets/fashion.png";
import Sales from "../assets/sales.png";

const Promotions = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6 py-16 px-10">
      <div className="relative text-center">
        <img src={Fashion} alt="Modern Edge" className="w-full h-[300px] object-cover" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black/40">
          <h3 className="text-xl font-bold">Timeless fashion, modern edge</h3>
          <button className="mt-2 bg-black text-white px-4 py-2 rounded transition hover:bg-white hover:text-black hover:scale-105">
            Discover Now
          </button>
        </div>
      </div>
      <div className="relative text-center">
        <img src={Sales} alt="Clearance Sale" className="w-full h-[300px] object-cover" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black/40">
          <h3 className="text-xl font-bold">Clearance Sales Up to 70% off</h3>
          <button className="mt-2 bg-black text-white px-4 py-2 rounded transition hover:bg-white hover:text-black hover:scale-105">
            Discover Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default Promotions;
