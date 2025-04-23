import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Image imports
import healthy from "./assets/healthy_food.jpg";
import doctor from "./assets/consult_doctor.jpg";
import Exercise from "./assets/Exercise.jpg";
import lose_weight from "./assets/lose_weight.jpg";
import monitor from "./assets/monitor_blood_sugar.jpg";
import stay_active from "./assets/stay_active.jpg";

// Global diabetes data (in millions)
const diabetesData = [
  { year: "2010", number: 285 },
  { year: "2012", number: 300 },
  { year: "2014", number: 320 },
  { year: "2016", number: 340 },
  { year: "2018", number: 360 },
  { year: "2020", number: 380 },
];

const Insights = () => {
  const modelAccuracy = 92; // Replace with dynamic value if needed

  return (
    <section className="py-16 bg-[#d7aef3]" id="Insights">
      <div className="container px-6 mx-auto max-w-7xl md:px-12">
        {/* Title */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-semibold text-blue-800">
            Diabetes Insights & Model Accuracy
          </h2>
          <p className="mt-4 text-xl text-gray-700">
            Learn more about the global impact of diabetes and the accuracy of our prediction model.
          </p>
        </div>

        {/* Statistics and Accuracy */}
        <div className="grid gap-6 mb-10 md:grid-cols-2">
          {/* Diabetes Stats */}
          <div className="p-8 bg-white border-2 border-blue-500 rounded-lg shadow-lg">
            <h3 className="mb-4 text-2xl font-semibold text-blue-600">
              Diabetes Statistics Around the World
            </h3>
            <p className="mb-4 text-lg text-gray-700">
              The number of people living with diabetes has been increasing globally. Below is a bar chart showing the number of people diagnosed with diabetes from 2010 to 2020.
            </p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={diabetesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis label={{ value: 'Millions', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="number" fill="#4CAF50" />
              </BarChart>
            </ResponsiveContainer>
            <p className="mt-4 text-sm text-gray-600">
              Source: World Health Organization (WHO) Global Report on Diabetes, 2021.
            </p>
          </div>

          {/* Model Accuracy Box */}
          <div className="p-8 bg-white border-2 border-blue-500 rounded-lg shadow-lg">
            <h3 className="mb-4 text-2xl font-semibold text-blue-600">Model Accuracy</h3>
            <p className="mb-4 text-lg text-gray-700">
              Our diabetes prediction model has been trained and evaluated for accuracy. The accuracy reflects how well the model predicts the likelihood of developing diabetes based on user input.
            </p>
            <div className="p-6 text-center bg-blue-100 border-2 border-blue-500 rounded-lg">
              <h4 className="mb-2 text-3xl font-semibold text-blue-600">
                Accuracy: {modelAccuracy}%
              </h4>
              <p className="text-lg text-gray-700">
                Our model performs with {modelAccuracy}% accuracy in predicting diabetes risk.
              </p>
            </div>
          </div>
        </div>

        {/* Health Measures */}
        <div className="p-8 mb-10 bg-white border-2 border-blue-500 rounded-lg shadow-lg">
          <h3 className="mb-4 text-3xl font-semibold text-blue-600">Health Measures to Take</h3>
          <p className="mb-4 text-xl text-gray-700">
            If you're at risk of diabetes or already diagnosed, there are several health measures you can take to manage the condition and prevent complications. Here's a guide to help you stay healthy:
          </p>

          {/* First row */}
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <img src={healthy} alt="Healthy Diet" className="object-cover w-48 h-48 mx-auto mb-4 rounded-full shadow-lg" />
              <h4 className="mb-2 text-2xl font-semibold text-blue-600">Healthy Diet</h4>
              <p className="text-lg text-gray-700">
                A balanced diet rich in vegetables, whole grains, and lean proteins is essential for managing diabetes.
              </p>
            </div>
            <div className="text-center">
              <img src={Exercise} alt="Exercise" className="object-cover w-48 h-48 mx-auto mb-4 rounded-full shadow-lg" />
              <h4 className="mb-2 text-2xl font-semibold text-blue-600">Exercise Regularly</h4>
              <p className="text-lg text-gray-700">
                Aim for at least 30 minutes of physical activity most days to help control blood sugar levels.
              </p>
            </div>
            <div className="text-center">
              <img src={monitor} alt="Monitor Blood Sugar" className="object-cover w-48 h-48 mx-auto mb-4 rounded-full shadow-lg" />
              <h4 className="mb-2 text-2xl font-semibold text-blue-600">Monitor Blood Sugar</h4>
              <p className="text-lg text-gray-700">
                Regularly check your blood sugar levels to ensure they remain in a healthy range.
              </p>
            </div>
          </div>

          {/* Second row */}
          <div className="grid gap-8 mt-8 md:grid-cols-3">
            <div className="text-center">
              <img src={lose_weight} alt="Lose Weight" className="object-cover w-48 h-48 mx-auto mb-4 rounded-full shadow-lg" />
              <h4 className="mb-2 text-2xl font-semibold text-blue-600">Lose Weight</h4>
              <p className="text-lg text-gray-700">
                Losing even a small amount of weight can improve blood sugar control and overall health.
              </p>
            </div>
            <div className="text-center">
              <img src={doctor} alt="Consult Doctor" className="object-cover w-48 h-48 mx-auto mb-4 rounded-full shadow-lg" />
              <h4 className="mb-2 text-2xl font-semibold text-blue-600">Consult Healthcare Providers</h4>
              <p className="text-lg text-gray-700">
                Regular consultations with doctors can help ensure proper management and monitoring of diabetes.
              </p>
            </div>
            <div className="text-center">
              <img src={stay_active} alt="Stay Active" className="object-cover w-48 h-48 mx-auto mb-4 rounded-full shadow-lg" />
              <h4 className="mb-2 text-2xl font-semibold text-blue-600">Stay Active</h4>
              <p className="text-lg text-gray-700">
                Regular movement and physical activity help prevent diabetes complications and improve overall well-being.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="mb-4 text-lg text-gray-700">
            Want more personalized advice or assistance? Reach out to us!
          </p>
          <a
            href="#contact"
            className="px-6 py-3 text-lg font-semibold text-white transition duration-300 bg-blue-600 rounded-full hover:bg-blue-700"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default Insights;
