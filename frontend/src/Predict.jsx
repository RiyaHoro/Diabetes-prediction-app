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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = { input_data: Object.values(formData) };

    try {
      const response = await fetch('http://127.0.0.1:8000/predict/', {
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
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center py-12 px-6">
      <div className="max-w-lg w-full bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">Predict Diabetes</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {Object.keys(formData).map((key) => (
              <div key={key} className="flex flex-col">
                <label htmlFor={key} className="text-sm font-medium text-gray-700">{key.replace(/([A-Z])/g, ' $1').toUpperCase()}</label>
                <input
                  type="number"
                  id={key}
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  className="mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder={`Enter ${key}`}
                  required
                />
              </div>
            ))}
          </div>
          
          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-md shadow-lg hover:bg-blue-700 transition duration-300">
            Predict
          </button>
        </form>
      </div>
    </div>
  );
};

export default Predict;
