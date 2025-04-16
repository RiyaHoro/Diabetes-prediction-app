import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="p-4 bg-[#f442a6] shadow-md">
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
        <ul className="hidden md:flex space-x-12 text-lg font-bold">
          <li>
            <Link to="/" className="text-white hover:text-blue-300">
              Home
            </Link>
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
            <Link to="/insights" className="text-white hover:text-blue-300">
              Insights
            </Link>
          </li>
        </ul>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="md:hidden flex flex-col items-start mt-4 space-y-4 text-lg font-bold pl-4">
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
            <Link to="/insights" className="text-white hover:text-blue-300" onClick={() => setMenuOpen(false)}>
              Insights
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
