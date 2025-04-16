import React from 'react';
import { useLocation } from 'react-router-dom';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Result = () => {
  const location = useLocation();
  const result = location.state;


  if (!result) {
    return <div className="mt-10 text-xl text-center">No result data found.</div>;
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
    <div className="max-w-xl p-6 mx-auto">
      <h2 className="mb-4 text-2xl font-bold text-center">Prediction Result</h2>
      <div className="p-6 bg-white rounded shadow-md">
        <p><strong>Prediction:</strong> {result.prediction}</p>
        <p><strong>Probability:</strong> {probability}%</p>

        <div className="my-6">
          <Doughnut data={chartData} options={chartOptions} />
        </div>

        {result.prediction === 'Positive' ? (
          <div className="font-medium text-red-600">
            <p>You are at high risk for diabetes. Please consult a doctor, eat healthy, and exercise regularly.</p>
          </div>
        ) : (
          <div className="font-medium text-green-600">
            <p>Your risk is low. Keep up your healthy lifestyle!</p>
          </div>
        )}
      </div>
      
    </div>
  );
};

export default Result;
