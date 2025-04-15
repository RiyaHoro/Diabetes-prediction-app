import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-900 p-4">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl">Diabetes Prediction</h1>
        <ul className="flex space-x-6">
          <li><Link to="/" className="text-white hover:text-gray-300">Home</Link></li>
          <li><Link to="#AboutUs" className="text-white hover:text-gray-300">About Us</Link></li>
          <li><Link to="/predict" className="text-white hover:text-gray-300">Predict</Link></li>
          <li><Link to="/insights" className="text-white hover:text-gray-300">Insights</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
