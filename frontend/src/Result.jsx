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
import axios from "axios";

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
  const [topFeature, setTopFeature] = useState("");
  const [isFeedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [thankYouMessage, setThankYouMessage] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("");

  useEffect(() => {
    if (result) {
      const features = {
        Pregnancies: Number(result.pregnancies) || 0,
        Glucose: Number(result.glucose) || 0,
        BloodPressure: Number(result.blood_pressure) || 0,
        SkinThickness: Number(result.skin_thickness) || 0,
        Insulin: Number(result.insulin) || 0,
        BMI: Number(result.bmi) || 0,
        DiabetesPedigreeFunction:
          Number(result.diabetes_pedigree_function) || 0,
        Age: Number(result.age) || 0,
      };

      const values = Object.values(features);
      const keys = Object.keys(features);
      const maxIndex = values.indexOf(Math.max(...values));
      setTopFeature(keys[maxIndex]);
      setLoading(false);
    }
  }, [result]);

  const generatePDF = () => {
    const input = resultRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("diabetes-prediction-report.pdf");
    });
  };

  const handleFeedback = (emoji) => {
    setSelectedEmoji(emoji);

    axios
      .post(
        "https://diabetes-prediction-app-dm26.onrender.com/api/feedback/",
        {
          emoji: emoji,
          comment: feedback,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setThankYouMessage("Thank you for your feedback!");
      })
      .catch((error) => {
        console.error("Feedback submission error:", error);
        setThankYouMessage("Error: Could not submit feedback.");
      });

    setTimeout(() => {
      setSelectedEmoji("");
      setFeedback("");
      setThankYouMessage("");
      setFeedbackModalOpen(false);
    }, 3000);
  };

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

  const chartData = {
    labels: ["Diabetes Risk", "Safe Zone"],
    datasets: [
      {
        label: "Diabetes Probability",
        data: [riskProb, 100 - riskProb],
        backgroundColor: ["#FF4C4C", "#4CAF50"],
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
          font: { size: 14, weight: "bold" },
        },
      },
    },
  };

  const inputFeatures = {
    Pregnancies: Number(result.pregnancies),
    Glucose: Number(result.glucose),
    BloodPressure: Number(result.blood_pressure),
    SkinThickness: Number(result.skin_thickness),
    Insulin: Number(result.insulin),
    BMI: Number(result.bmi),
    DiabetesPedigreeFunction: Number(result.diabetes_pedigree_function),
    Age: Number(result.age),
  };

  const inputChartData = {
    labels: Object.keys(inputFeatures),
    datasets: [
      {
        label: "Input Values",
        data: Object.values(inputFeatures),
        backgroundColor: [
          "#7FB3D5",
          "#76D7C4",
          "#F7DC6F",
          "#F1948A",
          "#BB8FCE",
          "#85C1E9",
          "#F5B7B1",
          "#A3E4D7",
        ],
        borderWidth: 1,
      },
    ],
  };

  const inputChartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
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
        beginAtZero: true,
        title: {
          display: true,
          text: "Value",
          font: { size: 16, weight: "bold" },
        },
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-400 to-red-400 flex flex-col">
      <header className="text-white text-center py-8 shadow-md">
        <h1 className="text-4xl font-bold">Prediction Result</h1>
        <p className="text-lg mt-2">Personalized Diabetes Risk Assessment</p>
      </header>

      <main ref={resultRef} className="p-6 max-w-6xl mx-auto space-y-10">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-1 bg-white p-6 rounded-lg shadow-lg flex justify-center items-center">
            <Doughnut data={chartData} options={chartOptions} />
          </div>

          <div className="flex-1 bg-white p-6 rounded-lg shadow-lg space-y-4 text-gray-800">
            <p className="text-2xl">
              <strong>Prediction:</strong>{" "}
              <span className={isPositive ? "text-red-600" : "text-green-600"}>
                {result.prediction}
              </span>
            </p>
            <p className="text-xl">
              <strong>Probability:</strong> {riskProb.toFixed(3)}%
            </p>
            <p className="text-lg">
              <strong>Most Influencing Feature:</strong>{" "}
              <span className="font-semibold text-purple-700">
                {topFeature}
              </span>
            </p>

            <div>
              <h3 className="text-xl font-semibold">Tips</h3>
              <ul className="list-disc ml-6 text-base space-y-1">
                {isPositive ? (
                  <>
                    <li>Consult a doctor for further advice.</li>
                    {glucose > 125 && <li>Monitor and reduce sugar intake.</li>}
                    {bmi > 30 && <li>Consider working on weight management.</li>}
                    {age > 45 && <li>Get annual health checkups.</li>}
                  </>
                ) : (
                  <>
                    <li>Your risk is low. Keep it up!</li>
                    {glucose <= 125 && <li>Maintain healthy sugar levels.</li>}
                    {bmi <= 30 && <li>Stay active and maintain your BMI.</li>}
                  </>
                )}
              </ul>
            </div>

            <button
              onClick={generatePDF}
              className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition"
            >
              Download PDF Report
            </button>

            <p className="text-xs text-center text-gray-500">
              Report generated on: {new Date().toLocaleString()}
            </p>
            <Link
              to="/predict"
              className="block mt-2 text-blue-600 hover:underline text-center"
            >
              ← Predict with new values
            </Link>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">
            Feature Value Chart
          </h3>
          <Bar data={inputChartData} options={inputChartOptions} />
        </div>

        <div className="flex flex-col items-center space-y-4">
          {!isFeedbackModalOpen ? (
            <button
              onClick={() => setFeedbackModalOpen(true)}
              className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-lg shadow-md transition"
            >
              Give Feedback
            </button>
          ) : (
            <>
              <h3 className="text-lg text-white">How was your experience?</h3>
              <div className="flex space-x-4">
                {["😞", "😐", "😊", "😍", "🤩"].map((emoji, index) => (
                  <button
                    key={index}
                    onClick={() => handleFeedback(emoji)}
                    className="text-3xl hover:scale-110 transition-transform"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
              {thankYouMessage && (
                <p className="text-white mt-2">{thankYouMessage}</p>
              )}
            </>
          )}
        </div>
      </main>

      <footer className="bg-gray-800 text-white text-center py-4 mt-8">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Diabetes Prediction App. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
};

export default Result;
