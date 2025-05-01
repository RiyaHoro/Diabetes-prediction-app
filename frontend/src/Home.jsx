import React, { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import heroImageWebP from './assets/background_image.webp';
import heroImageJPG from './assets/background_image.jpg';

// Lazy load components to reduce initial bundle size
const AboutUs = lazy(() => import('./AboutUs'));
const Insights = lazy(() => import('./Insights'));
const ContactForm = lazy(() => import('./ContactForm'));

const Home = () => {
  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <section
        id="Home"
        className="relative flex items-center justify-center min-h-screen bg-gray-900"
      >
        {/* Responsive Hero Image */}
        <picture>
          <source srcSet={heroImageWebP} type="image/webp" />
          <img
            src={heroImageJPG}
            alt="Hero"
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
            fetchpriority="high"
            width="1920"
            height="1080"
          />
        </picture>

        {/* Overlay Content */}
        <div className="relative z-10 pt-16 max-w-3xl px-4 mx-auto text-center animate-slide-up">
          <h1 className="mb-4 text-6xl font-semibold text-white">
            Welcome to Diabeto
          </h1>
          <p className="mb-6 text-lg text-white">
            Get personalized diabetes risk predictions based on your health data.
          </p>
          <Link
            to="/Predict"
            className="px-6 py-3 text-lg font-semibold text-gray-800 transition duration-300 ease-in-out bg-yellow-400 rounded-full hover:bg-yellow-500"
          >
            Start Prediction
          </Link>
        </div>
      </section>

      {/* Lazy-loaded Sections */}
      <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
        <section id="AboutUs">
          <AboutUs />
        </section>

        <section id="Insights">
          <Insights />
        </section>

        <section id="ContactUs">
          <ContactForm />
        </section>
      </Suspense>

      {/* Footer */}
      <footer className="py-4 text-center text-white bg-[#f442a6]">
        <p>&copy; 2025 Diabeto. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
