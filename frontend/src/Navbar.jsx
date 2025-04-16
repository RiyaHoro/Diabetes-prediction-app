import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="p-4 bg-[#f442a6] shadow-md">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-white">Diabetes Prediction</h1>
        <ul className="flex mx-auto space-x-12"> {/* Centering the list with space between */}
          <li>
            <Link
              to="/"
              className="text-white transition duration-300 hover:text-blue-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="#AboutUs"
              className="text-white transition duration-300 hover:text-blue-300"
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              to="/predict"
              className="text-white transition duration-300 hover:text-blue-300"
            >
              Predict
            </Link>
          </li>
          <li>
            <Link
              to="/insights"
              className="text-white transition duration-300 hover:text-blue-300"
            >
              Insights
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
