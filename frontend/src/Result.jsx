import React, { useRef, useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const Result = () => {
  const location = useLocation();
  const result = location.state;
  const resultRef = useRef();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (result) {
      console.log("Result data:", result); // Debug
      setLoading(false);
    }
  }, [result]);

  if (loading) {
    return (
      <div className="mt-10 text-xl text-center text-gray-800">Loading...</div>
    );
  }

  if (!result) {
    return (
      <div className="mt-10 text-xl text-center text-gray-800">
        No result data found.
      </div>
    );
  }

  const isPositive = result.prediction?.toLowerCase().trim() === "positive";
  const probability = Number(result.probability) || 0;
  const riskProb = probability * 100;

  const { glucose, bmi, age } = result;

  // Doughnut chart
  const chartData = {
    labels: ["Diabetes Risk", "Safe Zone"],
    datasets: [
      {
        label: "Diabetes Probability",
        data: [riskProb, 100 - riskProb],
        backgroundColor: ["#FF6347", "#32CD32"], // Colors that pop
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#333",
          font: {
            size: 14,
            weight: "bold",
          },
        },
      },
    },
  };

  // Input features chart
  const inputFeatures = {
    Pregnancies: Number(result.pregnancies) || 0,
    Glucose: Number(result.glucose) || 0,
    BloodPressure: Number(result.blood_pressure) || 0,
    SkinThickness: Number(result.skin_thickness) || 0,
    Insulin: Number(result.insulin) || 0,
    BMI: Number(result.bmi) || 0,
    DiabetesPedigreeFunction: Number(result.diabetes_pedigree_function) || 0,
    Age: Number(result.age) || 0,
  };

  const inputChartData = {
    labels: Object.keys(inputFeatures),
    datasets: [
      {
        label: "User Input Values",
        data: Object.values(inputFeatures),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const inputChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: { font: { size: 14, weight: "bold" } },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Features",
          font: { size: 16, weight: "bold" },
        },
        ticks: {
          autoSkip: false,
          maxRotation: 45,
          minRotation: 45,
        },
      },
      y: {
        title: {
          display: true,
          text: "Feature Value",
          font: { size: 16, weight: "bold" },
        },
        beginAtZero: true,
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
    <div className="min-h-screen bg-gradient-to-r from-pink-500 to-red-500 flex flex-col">
      <header className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white text-center py-8 shadow-lg">
        <h1 className="text-4xl font-bold tracking-wide">Prediction Result</h1>
        <p className="text-lg font-semibold">Personalized Diabetes Risk Assessment</p>
      </header>

      <main
        ref={resultRef}
        className="flex flex-col gap-12 p-10 max-w-7xl mx-auto"
      >
        {/* Top Section: Doughnut Chart + Prediction Info */}
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          {/* Doughnut Chart */}
          <div className="flex-1 p-6 bg-white border rounded-lg shadow-lg flex justify-center items-center h-[400px]">
            <Doughnut
              data={chartData}
              options={chartOptions}
              width={300}
              height={300}
            />
          </div>

          {/* Prediction Details + Tips + PDF */}
          <div className="flex-1 p-6 bg-white border rounded-lg shadow-lg space-y-4 text-gray-800">
            <p className="text-2xl font-semibold">
              <strong>Prediction:</strong>{" "}
              <span
                className={`capitalize font-semibold ${isPositive ? "text-red-600" : "text-green-600"}`}
              >
                {result.prediction}
              </span>
            </p>
            <p className="text-xl">
              <strong>Probability:</strong> {riskProb.toFixed(3)}%
            </p>

            {/* Tips */}
            <div>
              <h3 className="font-semibold text-xl mb-2">Personalized Tips</h3>
              <ul className="list-disc pl-5 space-y-1 text-lg">
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
                    {bmi <= 30 && <li>Stay active to maintain a healthy weight.</li>}
                    {age <= 45 && <li>Regular checkups will help stay ahead.</li>}
                  </>
                )}
              </ul>
            </div>

            <button
              onClick={generatePDF}
              className="w-full py-3 mt-6 font-medium bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-full hover:opacity-80 transition"
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
        </div>

        {/* Bottom Section: Input Feature Values */}
        <div className="w-full h-[400px] p-6 bg-white border rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Input Feature Values</h2>
          <Bar data={inputChartData} options={inputChartOptions} />
        </div>
      </main>

      <footer className="h-32 bg-gray-800 text-center text-sm text-white py-6 mt-12 border-t">
        <p>
          🔍 This prediction is not a medical diagnosis. For accurate health
          assessment, consult a healthcare professional.
        </p>
        <p className="mt-2">© 2025 Diabetes Prediction App</p>
      </footer>
    </div>
  );
};

export default Result;
