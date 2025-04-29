import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

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
    // Update form data with the input value
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const inputData = Object.values(formData).map(Number);
  
    try {
      const response = await axios.post(
        "https://diabetes-prediction-app-dm26.onrender.com/api/predict/",
        { input_data: inputData },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      const result = response.data;
      console.log("Prediction Result:", result);
  
      navigate("/result", { state: result });
    } catch (error) {
      console.error("Prediction Error:", error);
      alert("Prediction failed. Check console for details.");
    }
  };
  
  // Helper function to format labels
  const formatLabel = (key) => {
    return key
      .replace(/([A-Z])/g, " $1") // Add space before capital letters
      .replace(/_/g, " ") // Replace underscores with spaces
      .replace(/^./, (str) => str.toUpperCase()); // Capitalize the first letter
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
                  {/* Format the key for the label */}
                  {formatLabel(key)}
                </label>
                <input
                  type="text" // Change input type to text to accept both float and number
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
