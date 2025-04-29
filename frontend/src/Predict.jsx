import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';  // Add this import for axios

const Predict = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    pregnancies: "",
    glucose: "",
    blood_pressure: "",
    skin_thickness: "",
    insulin: "",
    bmi: "",
    diabetes_pedigree_function: "",
    age: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const API_URL =
    "https://diabetes-prediction-app-dm26.onrender.com/api/predict/";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = { input_data: Object.values(formData).map(Number) };

    try {
      const response = await axios.post(API_URL, requestData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = response.data;
      console.log(result);

      navigate("/result", { state: result });
    } catch (error) {
      console.error("Prediction Error:", error);
      alert("Prediction failed. Check console for details.");
    }
  };

  const formatLabel = (key) => {
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/_/g, " ")
      .replace(/^./, (str) => str.toUpperCase());
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 py-12 bg-gradient-to-r from-blue-500 via-purple-300 to-pink-200 bg-[length:200%_200%] animate-clouds">
      <div className="w-full max-w-2xl p-8 bg-white shadow-lg rounded-xl">
        <Link
          to="/"
          className="inline-block px-4 py-2 mt-0 mb-4 text-blue-600 hover:underline"
        >
          ← Go back to home page
        </Link>
        <h2 className="mb-6 text-3xl font-semibold text-center text-blue-600">
          Predict Diabetes
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
            {Object.keys(formData).map((key) => (
              <div key={key} className="flex flex-col">
                <label
                  htmlFor={key}
                  className="text-sm font-medium text-gray-700"
                >
                  {formatLabel(key)}
                </label>
                <input
                  type="text"
                  id={key}
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  className="p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder={`Enter ${key}`}
                  required
                />
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-full py-3 text-white transition duration-300 bg-blue-600 rounded-md shadow-lg hover:bg-blue-700"
          >
            Predict
          </button>
        </form>
      </div>
    </div>
  );
};

export default Predict;
