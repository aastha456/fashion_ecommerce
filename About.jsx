import React, { useEffect, useState } from "react";
import AboutImage from "../assets/about.png"; 
import { Link } from "react-router-dom";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Trigger the effects after the component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200); // Delay the effect for smoother transition
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col md:flex-row items-center justify-between px-10 py-16 space-y-8 md:space-y-0 md:space-x-10">
      {/* Left: Text Content with fade-in effect */}
      <div className={`md:w-1/2 ${isVisible ? 'opacity-100 transition-opacity duration-1000' : 'opacity-0'}`}>
        <h2 className="text-3xl font-semibold mb-4">About Us</h2>
        <p className="text-gray-700 mb-4">
          At WearNova, we believe fashion is more than just clothing, it’s an extension of your identity. It’s about embracing confidence, pushing boundaries, and redefining style on your own terms.
        </p>
        <p className="text-gray-700 mb-4">
          Our designs are crafted for those who lead with individuality, who express themselves unapologetically, and who believe that true style isn’t about following trends but setting them. We don’t just create clothing, we curate a feeling, one that empowers you to move through the world with boldness, grace, and authenticity.
        </p>
        <p className="text-gray-700 mb-6">
          Each piece in our collection is designed to blend elegance with ease, ensuring that fashion never feels forced but always feels right. Whether you're making a statement or keeping it effortlessly minimal, WearNova is here to complement your journey, because confidence isn’t worn, it’s owned.
        </p>
        <p className="text-gray-700 mb-6">
          WearNova is more than a brand. It’s a movement. A celebration of self-expression, fearless individuality, and the power of owning your narrative, one outfit at a time.
        </p>
        <p className="text-gray-700 mb-6">
          Step into WearNova. Wear confidence. Own your style.
        </p>

        <Link to="/collection">
          <button className="border border-gray-900 px-6 py-2 rounded-md text-gray-900 hover:bg-gray-900 hover:text-white transition">
            Shop Now
          </button>
        </Link>
      </div>

      {/* Right: Image Section with zoom effect */}
      <div className="md:w-1/2 flex justify-center overflow-hidden relative">
        <div className="w-full h-full">
          <img
            src={AboutImage}
            alt="Fashion Model"
            className={`w-full h-full object-cover transition-transform duration-1000 ease-in-out ${isVisible ? 'scale-100' : 'scale-110'}`}
          />
        </div>
      </div>
    </div>
  );
};

export default About;
