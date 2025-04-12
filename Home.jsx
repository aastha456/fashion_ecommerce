// src/pages/Home.js
import React from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import NewArrivals from "../components/NewArrivals";
import Essentials from "../components/Essentials";
import Promotions from "../components/Promotions";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleViewNewArrivals = () => {
    navigate("/collection/new-arrivals");
  };

  return (
    <div className="font-sans">
      <Hero />
      <NewArrivals handleViewNewArrivals={handleViewNewArrivals} />
      <Essentials />
      <Promotions />
    </div>
  );
};

export default Home;
