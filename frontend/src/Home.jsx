import React from 'react';
import Navbar from './Navbar';
import heroImage from './assets/background_image.jpg';
import aboutImage from './assets/diabetes-illustration.png'; // imported properly

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
      <section className="py-16 bg-gray-100" id="AboutUs">
        <div className="container flex flex-col items-center justify-between max-w-6xl px-6 mx-auto md:flex-row">
          {/* Text Side */}
          <div className="mb-8 md:w-1/2 md:mb-0 md:pr-10">
            <h2 className="mb-4 text-3xl font-bold">About Us</h2>
            <p className="mb-4 text-lg text-gray-700">
              Our mission is to provide accessible and reliable diabetes prediction tools that help individuals take control of their health.
            </p>
            <p className="text-lg text-gray-700">
              We use advanced machine learning models to predict the likelihood of developing diabetes based on user input. Our goal is to raise awareness and encourage proactive health management.
            </p>
          </div>

          {/* Image Side */}
          <div
            className="w-full h-64 bg-center bg-cover rounded-lg shadow-md md:w-1/2"
            style={{ backgroundImage: `url(${aboutImage})` }}
          ></div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="py-4 text-center text-white bg-blue-500">
        <p>&copy; 2025 Diabeto. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
