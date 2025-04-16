import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Predict = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    pregnancies: '',
    glucose: '',
    blood_pressure: '',
    skin_thickness: '',
    insulin: '',
    bmi: '',
    diabetes_pedigree_function: '',
    age: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const API_URL = "https://diabetes-prediction-app-dm26.onrender.com/api/predict/";

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const requestData = { input_data: Object.values(formData).map(Number) };
  
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
  
      const result = await response.json();
      console.log(result);
  
      // Redirect to result page and pass data
      navigate('/result', { state: result });
    } catch (error) {
      console.error("Error:", error);
      alert("Prediction failed. Check console for details.");
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen px-6 py-12 bg-gray-50">
      <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-xl">
        <h2 className="mb-6 text-3xl font-semibold text-center text-blue-600">Predict Diabetes</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {Object.keys(formData).map((key) => (
              <div key={key} className="flex flex-col">
                <label htmlFor={key} className="text-sm font-medium text-gray-700">{key.replace(/([A-Z])/g, ' $1').toUpperCase()}</label>
                <input
                  type="number"
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
          
          <button type="submit" className="w-full py-3 text-white transition duration-300 bg-blue-600 rounded-md shadow-lg hover:bg-blue-700">
            Predict
          </button>
        </form>
      </div>
    </div>
  );
};

export default Predict;
