import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-[#f442a6] shadow-lg z-50">
      <div className="flex items-center justify-between px-4 md:px-8 h-16 max-w-6xl mx-auto">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-white">Diabeto</h1>

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white text-3xl focus:outline-none"
          >
            {menuOpen ? "✖" : "☰"}
          </button>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-6 text-white text-lg gap-4">
          <li><a href="#Home" className="hover:text-blue-200">Home</a></li>
          <li><a href="#AboutUs" className="hover:text-blue-200">About Us</a></li>
          <li><Link to="/predict" className="hover:text-blue-200">Predict</Link></li>
          <li><a href="#Insights" className="hover:text-blue-200">Insights</a></li>
          <li>
            <a
              href="https://www.google.com/maps/search/diabetologist+near+me"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black px-4 py-2 rounded-full font-semibold hover:bg-blue-500 transition shadow-sm"
            >
              🩺 Consult a Doctor
            </a>
          </li>
        </ul>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#f442a6] px-4 pb-4">
          <ul className="flex flex-col space-y-4 text-white text-lg">
            <li><a href="#Home" onClick={() => setMenuOpen(false)} className="hover:text-blue-200">Home</a></li>
            <li><a href="#AboutUs" onClick={() => setMenuOpen(false)} className="hover:text-blue-200">About Us</a></li>
            <li><Link to="/predict" onClick={() => setMenuOpen(false)} className="hover:text-blue-200">Predict</Link></li>
            <li><a href="#Insights" onClick={() => setMenuOpen(false)} className="hover:text-blue-200">Insights</a></li>
            <li>
              <a
                href="https://www.google.com/maps/search/diabetologist+near+me"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="bg-white text-black text-center px-4 py-2 rounded-full font-semibold hover:bg-blue-100 transition shadow-sm"
              >
                🩺 Consult a Doctor
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
