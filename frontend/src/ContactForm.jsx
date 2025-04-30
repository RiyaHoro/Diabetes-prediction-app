import React, { useState } from "react";
import axios from "axios";
import hero from "./assets/contactus.jpg";
import Navbar from "./Navbar";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Show loading state
    setStatus("Sending...");
    try {
      await axios.post(
        "https://diabetes-prediction-app-dm26.onrender.com/api/contact/",
        form
      );
      setStatus("Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus("Could not send message. Please try again.");
    } finally {
      setIsLoading(false); // Hide loading state after completion
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-cyan-400 to-teal-200 px-4">
      <div className="bg-white rounded-xl shadow-xl flex flex-col md:flex-row w-full max-w-4xl overflow-hidden">
        {/* Left: Form */}
        <div className="w-full p-8 md:w-1/2">
          <h2 className="text-center font-serif text-4xl font-bold mb-6 text-blue-800">
            Contact us
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="name"
              placeholder="Name"
              className="w-full p-3 rounded-lg bg-blue-50 border border-blue-200 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded-lg bg-blue-50 border border-blue-200 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              value={form.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Message"
              className="w-full p-3 rounded-lg bg-blue-50 border border-blue-200 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              rows={4}
              value={form.message}
              onChange={handleChange}
              required
            />
            <button
              type="submit"
              className="w-full font-serif bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
            >
              Send Message
            </button>
          </form>
          {status && (
            <p className="mt-4 text-sm text-center text-cyan-600">{status}</p>
          )}
        </div>

        {/* Right: Image or Placeholder */}
        <div className="w-full md:w-1/2 items-center justify-center bg-blue-200 rounded-tr-xl rounded-br-xl overflow-hidden">
          <img
            src={hero}
            alt="Contact illustration"
            className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-300"
          />
        </div>
      </div>
    </div>
  );
}
