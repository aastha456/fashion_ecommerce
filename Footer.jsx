import React from 'react';
import { Link } from "react-router-dom"
import facebookIcon from "../assets/ic_baseline-facebook.svg";
import instagramIcon from "../assets/mdi_instagram.svg";
import twitterIcon from "../assets/proicons_x-twitter.svg";

const Footer = () => {
  return (
    <footer className="bg-white px-4 py-6 sm:px-16 sm:py-10">
      <div className="border-t border-black-300 w-full mb-8"></div>

      {/* Top Section */}
      <div className="flex flex-col sm:flex-row justify-between sm:space-x-16 pb-8 border-b">
        {/* Logo Section */}
        <div className="text-center sm:text-left mb-4 sm:mb-0">
          <h3 className="text-3xl font-medium" style={{ fontFamily: "Inspiration, sans-serif" }}>
            WearNova
          </h3>
        </div>

        {/* Navigation Section */}
        <div className="flex flex-col sm:flex-row sm:space-x-16 text-center sm:text-left">
          <div className="mb-4 sm:mb-0">
            <h4 className="font-semibold mb-2">Shop</h4>
            <ul className="text-gray-600 space-y-1">
              <li><Link to="/collection" className="hover:underline">Shop Now</Link></li>
              <li><Link to="/collection/new-arrivals" className="hover:underline">New Arrivals</Link></li>
              <li><Link to="#" className="hover:underline">Trending Styles</Link></li>
            </ul>
          </div>

          <div className="mb-4 sm:mb-0">
            <h4 className="font-semibold mb-2">Customer Support</h4>
            <ul className="text-gray-600 space-y-1">
              <li><Link to="/FAQs" className="hover:underline">FAQs</Link></li>
              <li><Link to="/Orders-and-delivery" className="hover:underline">Shipping & Delivery</Link></li>
              <li><Link to="/Returns-and-refunds" className="hover:underline">Returns & Exchange</Link></li>
              <li><Link to="/Contact-us" className="hover:underline">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section (visible only on web, hidden on mobile) */}
        <div className="max-w-sm mb-4 sm:mb-0 hidden sm:block">
          <h4 className="font-semibold mb-2">Stay Ahead with Fashion Trends</h4>
          <p className="text-gray-600 text-sm mb-4">
            Subscribe to our newsletter for the latest trends, features, and exclusive offers just for you.
          </p>
          <div className="flex flex-col sm:flex-row items-center sm:items-start">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="border rounded-full px-4 py-2 flex-grow mb-2 sm:mb-0 focus:outline-none"
            />
            <button className="bg-black text-white px-6 py-2 rounded-full">
              Subscribe
            </button>
          </div>

          {/* Follow Us Section Below Newsletter */}
          <div className="mt-6 flex justify-center sm:justify-start space-x-4">
            <a href="#"><img src={facebookIcon} alt="Facebook" className="w-5 h-5" /></a>
            <a href="#"><img src={instagramIcon} alt="Instagram" className="w-5 h-5" /></a>
            <a href="#"><img src={twitterIcon} alt="Twitter X" className="w-5 h-5" /></a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex justify-center items-center mt-6 text-sm text-gray-600">
        <p>© 2025 WearNova. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 