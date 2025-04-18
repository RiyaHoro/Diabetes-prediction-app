import React, { useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import { Doughnut, Bar } from "react-chartjs-2";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

ChartJS.register(ArcElement, Tooltip, Legend);

const Result = () => {
  const location = useLocation();
  const result = location.state;
  const resultRef = useRef();

  if (!result) {
    return (
      <div className="mt-10 text-xl text-center text-gray-800">
        No result data found.
      </div>
    );
  }

  const isPositive = result.prediction?.toLowerCase().trim() === "positive";

  // Always use the raw probability as "risk"
  const probability = Number(result.probability) || 0;
  const riskProb = probability * 100; // ensure percentage

  const glucose = result.glucose ?? 0;
  const bmi = result.bmi ?? 0;
  const age = result.age ?? 0;

  const chartData = {
    labels: ["Diabetes Risk", "Safe Zone"],
    datasets: [
      {
        label: "Diabetes Probability",
        data: [riskProb, 100 - riskProb],
        backgroundColor: ["red", "#22c55e"], // Red for Risk, Green for Safe
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom", // or "top"
        labels: {
          color: "#000", // sets label text color
          font: {
            size: 14,
            weight: "bold",
          },
        },
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
    <div className="min-h-screen bg-white flex flex-col">
      <header className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white text-center py-6 shadow">
        <h1 className="text-3xl font-bold">Prediction Result</h1>
        <p className="text-sm">Personalized Diabetes Risk Assessment</p>
      </header>

      <main
        ref={resultRef}
        className="flex flex-col lg:flex-row justify-center items-start p-8 gap-12 max-w-7xl mx-auto"
      >
        {/* Chart */}
        <div className="w-full lg:w-[55%] h-[400px] p-6 bg-white border rounded-lg shadow">
          <Doughnut data={chartData} />
        </div>

        {/* Details */}
        <div className="w-full lg:w-[55%] h-[400px] p-6 bg-white border rounded-lg shadow space-y-4 text-gray-800">
          <p className="text-xl">
            <strong>Prediction:</strong>{" "}
            <span
              className={`capitalize font-semibold ${
                isPositive ? "text-red-600" : "text-green-600"
              }`}
            >
              {result.prediction}
            </span>
          </p>
          <p className="text-xl">
            <strong>Probability:</strong> {riskProb.toFixed(3)}%
          </p>

          {result.feature_importance &&
            Object.keys(result.feature_importance).length > 0 && (
              <div className="h-[300px]">
  <h3 className="font-semibold mb-2">Feature Impact</h3>

  <Bar
    data={{
      labels: Object.keys(featureData),
      datasets: [
        {
          label: "Relative Importance",
          data: Object.values(featureData),
          backgroundColor: "#60a5fa",
        },
      ],
    }}
    options={{
      indexAxis: "y",
      plugins: { legend: { display: false } },
      scales: { x: { beginAtZero: true } },
    }}
  />
</div>

            )}

          {/* Tips */}
          <div>
            <h3 className="font-semibold mb-2">Personalized Tips</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              {isPositive ? (
                <>
                  <li>Consult a doctor for further medical advice.</li>
                  {glucose > 125 && <li>Monitor and reduce sugar intake.</li>}
                  {bmi > 30 && <li>Work on reducing your BMI.</li>}
                  {age > 45 && <li>Annual checkups are highly recommended.</li>}
                </>
              ) : (
                <>
                  <li>Your risk is low. Keep up the good work!</li>
                  {glucose <= 125 && <li>Maintain healthy glucose levels.</li>}
                  {bmi <= 30 && (
                    <li>Stay active to maintain a healthy weight.</li>
                  )}
                  {age <= 45 && <li>Regular checkups will help stay ahead.</li>}
                </>
              )}
            </ul>
          </div>
          <button
            onClick={generatePDF}
            className="w-full py-2 mt-4 font-medium border border-black rounded-full hover:bg-black hover:text-white transition"
          >
            Download Report (PDF)
          </button>
          <p className="text-xs text-gray-500 text-center mt-4">
            Generated on: {new Date().toLocaleString()}
          </p>
          <Link
            to="/predict"
            className="block text-center text-sm text-blue-600 hover:underline mt-2"
          >
            ← Try again with different values
          </Link>
        </div>
      </main>
      <footer className="h-32 bg-gray-400 text-center text-sm text-black-600 py-4 mt-10 border-t">
        <p>
          🔍 This prediction is not a medical diagnosis. For accurate health
          assessment, consult a healthcare professional.
        </p>
        <p className="mt-2">
          📅 Report generated on {new Date().toLocaleDateString()}
        </p>
        <p className="mt-2">© 2025 Diabetes Prediction App</p>
      </footer>
    </div>
  );
};

export default Result;
