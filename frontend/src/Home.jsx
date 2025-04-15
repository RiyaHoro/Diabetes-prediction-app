// Home.jsx
import React from 'react';
import Navbar from './Navbar';
import heroImage from './assets/diabetes-illustration.png'; // Ensure the image path is correct

const Home = () => {
  return (
    <div>
    <Navbar />
    <div className="min-h-screen flex flex-col">
      {/* Welcome Section */}
      <section className="flex-1 flex items-center justify-center bg-blue-500" style={{ height: '100vh' }}>
        <div className="flex flex-col md:flex-row items-center justify-center max-w-6xl mx-auto px-4">
          <div className="text-center md:text-left md:w-1/2">
            <h2 className="text-4xl text-white font-bold mb-4">Welcome to Diabeto</h2>
            <p className="text-white mb-4">Predict your risk of diabetes with our easy-to-use prediction tool.</p>
          </div>
          <div className="md:w-1/2">
            <img src={heroImage} alt="Diabetes Illustration" className="w-full h-50 object-cover" />
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="flex-1 flex items-center justify-center bg-gray-100" style={{ height: '100vh' }}>
        <div className="text-center px-6 md:px-12 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">About Us</h2>
          <p className="text-lg text-gray-700 mb-4">
            Our mission is to provide accessible and reliable diabetes prediction tools that can help individuals take control of their health.
          </p>
          <p className="text-lg text-gray-700">
            We use advanced machine learning models to predict the likelihood of developing diabetes based on a set of user inputs. Our goal is to raise awareness and encourage proactive health management.
          </p>
        </div>
      </section>
    </div>
    </div>
  );
};

export default Home;
