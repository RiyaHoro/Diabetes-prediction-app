import React from 'react';
import { Link } from "react-router-dom";
import Navbar from './Navbar';
import heroImage from './assets/background_image.png';
import AboutUs from './AboutUs';
import Insights from './Insights';
import Predict from './Predict';

const Home = () => {
  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <section id='Home'
        className="flex items-center justify-center min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="pt-16 max-w-3xl px-4 mx-auto text-center animate-slide-up ">
          <h1 className="mb-4 text-6xl font-semibold text-white ">
            Welcome to Diabeto
          </h1>
          <p className="mb-6 text-lg text-white">
            Get personalized diabetes risk predictions based on your health data.
          </p>
          
            <Link to="/Predict" className="px-6 py-3 text-lg font-semibold text-gray-800 
            transition duration-300 ease-in-out bg-yellow-400 rounded-full hover:bg-yellow-500">
                    Start Prediction
            </Link>
            
        </div>
      </section>

      {/* About Us Section */}
      <section id="AboutUs">
        <AboutUs />
      </section>
      

      <section id="Insights">
        <Insights />
      </section>

      {/* Footer Section */}
      <footer className="py-4 text-center text-white bg-[#f442a6]">
        <p>&copy; 2025 Diabeto. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
