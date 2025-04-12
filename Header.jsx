import React, { useState, useEffect, useRef, useContext} from "react";
import searchIcon from "../assets/iconamoon_search-light.svg";
import profileIcon from "../assets/iconamoon_profile-light.svg";
import heartIcon from "../assets/solar_heart-linear.svg";
import bagIcon from "../assets/weui_shop-outlined.svg";
import arrowupIcon from "../assets/weui_arrow-outlinedup.svg";
import menuIcon from "../assets/material-symbols-light_menu-rounded.svg";
import dropdown from "../assets/dropdown_icon.png";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Header = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  
  const dropdownRef = useRef(null);

  const {getCartCount, getWishlistCount} = useContext(ShopContext);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="flex items-center justify-between px-4 py-4 shadow-md bg-white relative">
      {/* Mobile: Menu Icon Left, Logo Center */}
      <div className="relative flex w-full items-center justify-center lg:hidden">
        {/* Menu Icon (left) */}
        <div className="absolute left-0">
          <img
            onClick={() => setVisible(true)}
            src={menuIcon}
            className="w-6 h-6 cursor-pointer"
            alt="menu"
          />
        </div>

        {/* Centered Logo */}
        <Link
          to="/"
          className="text-2xl font-medium tracking-wide"
          style={{ fontFamily: "Inspiration, sans-serif" }}
        >
          WearNova
        </Link>

        {/* Right Icons */}
        <div className="absolute right-0 flex space-x-4 items-center">
          <Link to="/wishlist" className="relative">
            <img src={heartIcon} alt="Wishlist" className="w-5 h-5" />
            <p className="absolute -top-1 -right-1 w-5 h-5 text-xs text-center leading-5 bg-black text-white rounded-full">
                {getWishlistCount()}
              </p>
          </Link>
          <Link to="/cart" className="relative">
            <img src={bagIcon} alt="Cart" className="w-5 h-5" />
            <p className="absolute -top-1 -right-1 w-5 h-5 text-xs text-center leading-5 bg-black text-white rounded-full">
                {getCartCount()}
              </p>
          </Link>
        </div>
      </div>

      {/* Desktop: Full Layout */}
      <div className="hidden lg:flex w-full justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-medium tracking-wide"
          style={{ fontFamily: "Inspiration, sans-serif" }}
        >
          WearNova
        </Link>

        {/* Navigation */}
        <nav className="flex space-x-8 text-lg font-light">
          <Link to="/collection" className="hover:underline">Shop Now</Link>
          <Link to="/about" className="hover:underline">About</Link>
          <Link to="/Contact-us" className="hover:underline">Contact Us</Link>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="flex items-center hover:underline focus:outline-none"
            >
              More Options
              <img
                src={arrowupIcon}
                alt="arrow"
                className={`ml-1 w-4 h-4 transform transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>
            {isDropdownOpen && (
              <div className="absolute left-0 top-full mt-2 w-48 bg-white shadow-md border border-gray-200 rounded-lg z-50">
                <ul>
                  <li><Link to="/styleguide" className="block px-4 py-2 hover:bg-gray-100">Style Guide</Link></li>
                  <li><Link to="/Customer-support" className="block px-4 py-2 hover:bg-gray-100">Customer Support</Link></li>
                  <li><Link to="/Returns-and-refunds" className="block px-4 py-2 hover:bg-gray-100">Returns & Exchange</Link></li>
                  <li><Link to="/Privacy-policy" className="block px-4 py-2 hover:bg-gray-100">Privacy Policy</Link></li>
                </ul>
              </div>
            )}
          </div>
        </nav>

        {/* Icons */}
        <div className="flex space-x-6 items-center">
          <Link to="/wishlist" className="relative">
            <img src={heartIcon} alt="Wishlist" className="w-6 h-6" />
            <p className="absolute -top-1 -right-1 w-5 h-5 text-xs text-center leading-5 bg-black text-white rounded-full">
                {getWishlistCount()}
              </p>
          </Link>
          <Link to="/cart" className="relative">
            <img src={bagIcon} alt="Cart" className="w-6 h-6" />
              <p className="absolute -top-1 -right-1 w-5 h-5 text-xs text-center leading-5 bg-black text-white rounded-full">
                {getCartCount()}
              </p>
          
          </Link>
          <Link to="/login">
            <img src={profileIcon} alt="Profile" className="w-6 h-6" />
          </Link>
          <Link to="/search">
            <img src={searchIcon} alt="Search" className="w-6 h-6" />
          </Link>
        </div>
      </div>

      {/* Sidebar menu (Mobile only) */}
      <div
        className={`fixed top-0 left-0 h-full bg-white z-50 shadow-md transition-all duration-300 ${
          visible ? "w-64" : "w-0"
        } overflow-hidden`}
      >
        <div className="p-4">
          <div onClick={() => setVisible(false)} className="flex items-center gap-3 mb-6 cursor-pointer">
            <img src={dropdown} className="h-4 rotate-180" alt="Back" />
            <span>Back</span>
          </div>
          <nav>
            <ul className="flex flex-col space-y-4 text-lg font-light">
              <li><Link onClick={() => setVisible(false)} to="/collection" className="hover:underline">Shop Now</Link></li>
              <li><Link onClick={() => setVisible(false)} to="/about" className="hover:underline">About</Link></li>
              <li><Link onClick={() => setVisible(false)} to="/Contact-us" className="hover:underline">Contact Us</Link></li>
              <li><Link onClick={() => setVisible(false)} to="/styleguide" className="hover:underline">Style Guide</Link></li>
              <li><Link onClick={() => setVisible(false)} to="/Customer-support" className="hover:underline">Customer Support</Link></li>
              <li><Link onClick={() => setVisible(false)} to="/Returns-and-refunds" className="hover:underline">Returns & Exchange</Link></li>
              <li><Link onClick={() => setVisible(false)} to="/Privacy-policy" className="hover:underline">Privacy Policy</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
