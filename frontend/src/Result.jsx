import React from 'react';
import { useLocation } from 'react-router-dom';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Result = () => {
  const location = useLocation();
  const result = location.state;

  if (!result) {
    return <div className="text-center mt-10 text-xl">No result data found.</div>;
  }

  const probability = Number(result.probability) || 0;

  const chartData = {
    labels: ['Diabetes Risk', 'Safe Zone'],
    datasets: [
      {
        label: 'Diabetes Probability',
        data:
          result.prediction === 'positive'
            ? [probability, 100 - probability]
            : [100 - probability, probability],
        backgroundColor: ['#EF4444', '#10B981'], // red and green
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4">Prediction Result</h2>
      <div className="bg-white shadow-md rounded p-6">
        <p><strong>Prediction:</strong> {result.prediction}</p>
        <p><strong>Probability:</strong> {probability}%</p>

        <div className="my-6">
          <Doughnut data={chartData} options={chartOptions} />
        </div>

        {result.prediction === 'positive' ? (
          <div className="text-red-600 font-medium">
            <p>You are at high risk for diabetes. Please consult a doctor, eat healthy, and exercise regularly.</p>
          </div>
        ) : (
          <div className="text-green-600">
            <p>Your risk is low. Keep up your healthy lifestyle!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Result;
