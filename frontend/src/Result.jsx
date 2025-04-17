import React, { useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import { Doughnut } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

ChartJS.register(ArcElement, Tooltip, Legend);

const Result = () => {
  const location = useLocation();
  const result = location.state;
  const resultRef = useRef();

  if (!result) {
    return (
      <div className="mt-10 text-xl text-center text-white">
        No result data found.
      </div>
    );
  }

  const probability = Number(result.probability) || 0;

  const chartData = {
    labels: ["Diabetes Risk", "Safe Zone"],
    datasets: [
      {
        label: "Diabetes Probability",
        data:
          result.prediction === "positive"
            ? [probability, 100 - probability]
            : [100 - probability, probability],
        backgroundColor: ["#EF4444", "#10B981"], // red and green
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  const generatePDF = () => {
    const input = resultRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 10, 10);
      pdf.save("diabetes-prediction.pdf");
    });
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center px-4 py-10"
    >
      <div
        className="max-w-xl w-full p-8 rounded-2xl shadow-2xl bg-white/60 backdrop-blur-md text-white"
        ref={resultRef}
      >
        <h2 className="mb-6 text-4xl font-bold text-center text-white drop-shadow-lg">
          Prediction Result
        </h2>

        <div className="space-y-6">
          <p className="text-lg font-semibold">
            <strong>Prediction:</strong> {result.prediction}
          </p>
          <p className="text-lg font-semibold">
            <strong>Probability:</strong> {probability}%
          </p>

          <div className="my-6">
            <Doughnut data={chartData} options={chartOptions} />
          </div>

          {result.feature_importance && (
            <div>
              <h3 className="mb-3 text-xl font-semibold text-white drop-shadow-lg">
                Feature Impact
              </h3>
              <Bar
                data={{
                  labels: Object.keys(result.feature_importance),
                  datasets: [
                    {
                      label: "Relative Importance",
                      data: Object.values(result.feature_importance),
                      backgroundColor: "#93C5FD",
                    },
                  ],
                }}
                options={{
                  indexAxis: "y",
                  plugins: {
                    legend: { display: false },
                  },
                  scales: {
                    x: { beginAtZero: true, max: 1 },
                  },
                }}
              />
            </div>
          )}

          <div>
            <h3 className="mb-3 text-xl font-semibold text-white drop-shadow-lg">
              Personalized Tips
            </h3>
            <ul className="pl-5 list-disc text-white/90">
              {result.prediction?.toLowerCase() === "positive" && (
                <>
                  <li>Consult a doctor for further tests and guidance.</li>
                  {result.glucose > 125 && (
                    <li>Reduce sugar intake and monitor glucose levels regularly.</li>
                  )}
                  {result.bmi > 30 && (
                    <li>Consider a balanced diet and regular exercise to reduce BMI.</li>
                  )}
                  {result.age > 45 && (
                    <li>Annual checkups are crucial to manage diabetes risk.</li>
                  )}
                </>
              )}

              {result.prediction?.toLowerCase() === "negative" && (
                <>
                  <li>Your risk is low. Keep up your healthy lifestyle!</li>
                  {result.glucose <= 125 && (
                    <li>Maintain a balanced diet to keep glucose levels healthy.</li>
                  )}
                  {result.bmi <= 30 && (
                    <li>Continue with regular physical activity to maintain a healthy weight.</li>
                  )}
                  {result.age <= 45 && (
                    <li>Keep up with your routine health checkups.</li>
                  )}
                </>
              )}
            </ul>
          </div>

          <button
            onClick={generatePDF}
            className="w-full py-3 mt-6 font-semibold text-white bg-purple-700 rounded-lg hover:bg-purple-800 transition-all duration-300"
          >
            Download Report (PDF)
          </button>

          <p className="text-sm text-white/70 mt-4">
            Generated on: {new Date().toLocaleString()}
          </p>

          <Link
            to="/predict"
            className="block mt-4 text-blue-200 hover:underline transition-all duration-300"
          >
            ← Try again with different values
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Result;
