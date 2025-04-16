import React from 'react';
import Navbar from './Navbar';
import heroImage from './assets/background_image.jpg';
import AboutUs from './AboutUs';
import Insights from './Insights';

const Home = () => {
  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <section
        className="flex items-center justify-center min-h-screen bg-blue-500 bg-center bg-cover"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="max-w-3xl px-4 mx-auto text-center">
          <h1 className="mb-4 text-6xl font-semibold text-white">
            Welcome to Diabeto
          </h1>
          <p className="mb-6 text-lg text-white">
            Get personalized diabetes risk predictions based on your health data.
          </p>
          <a
            href="#prediction"
            className="px-6 py-3 text-lg font-semibold text-gray-800 transition duration-300 ease-in-out bg-yellow-400 rounded-full hover:bg-yellow-500"
          >
            Start Prediction
          </a>
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
      <footer className="py-4 text-center text-white bg-blue-500">
        <p>&copy; 2025 Diabeto. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
