import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="p-4 bg-[#f442a6] shadow-md fixed w-full h-16 z-50">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-white">Diabeto</h1>

        {/* Hamburger for mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white text-3xl focus:outline-none"
          >
            {menuOpen ? "✖" : "☰"}
          </button>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center justify-center space-x-12 text-lg font-normal">
          <li>
          <a href="#Home" className="text-white hover:text-blue-300">
              Home
            </a>
          </li>
          <li>
            <a href="#AboutUs" className="text-white hover:text-blue-300">
              About Us
            </a>
          </li>
          <li>
            <Link to="/predict" className="text-white hover:text-blue-300">
              Predict
            </Link>
          </li>
          <li>
          <a href="#Insights" className="text-white hover:text-blue-300" >
              Insights
            </a>
          </li>
        </ul>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="md:hidden flex flex-col items-start mt-4 space-y-4 text-lg font-normal pl-4">
          <li>
            <Link to="/" className="text-white hover:text-blue-300" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <a href="#AboutUs" className="text-white hover:text-blue-300" onClick={() => setMenuOpen(false)}>
              About Us
            </a>
          </li>
          <li>
            <Link to="/predict" className="text-white hover:text-blue-300" onClick={() => setMenuOpen(false)}>
              Predict
            </Link>
          </li>
          <li>
          <a href="#Insights" className="text-white hover:text-blue-300" onClick={() => setMenuOpen(false)}>
              Insights
            </a>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
