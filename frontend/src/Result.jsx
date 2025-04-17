import React, { useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import { Doughnut, Bar } from "react-chartjs-2";
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
      <div className="mt-10 text-xl text-center text-gray-800">
        No result data found.
      </div>
    );
  }

  const probability = Number(result.probability) || 0;
  const isPositive = result.prediction === "Positive";

  const chartData = {
    labels: ["Diabetes Risk", "Safe Zone"],
    datasets: [
      {
        label: "Diabetes Probability",
        data: isPositive
          ? [probability, 100 - probability]
          : [100 - probability, probability],
        backgroundColor: isPositive
          ? ["#ef4444", "#10b981"] // red, green for positive
          : ["#10b981", "#ef4444"], // green, red for negative
        borderWidth: 1,
      },
    ],
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
      {/* Header */}
      <header className="bg-gradient-to-r from-pink-500 to-red-500 text-white text-center py-6 shadow">
        <h1 className="text-3xl font-bold">Prediction Result</h1>
        <p className="text-sm">Personalized Diabetes Risk Assessment</p>
      </header>

      {/* Main Content */}
      <main
        ref={resultRef}
        className="flex flex-col lg:flex-row justify-center items-start p-6 gap-10 max-w-6xl mx-auto"
      >
        {/* Left: Chart */}
        <div className="w-full lg:w-1/2 p-4 bg-white border rounded-lg shadow">
          <Doughnut data={chartData} />
        </div>

        {/* Right: Result Details */}
        <div className="w-full lg:w-1/2 p-6 bg-white border rounded-lg shadow space-y-4 text-gray-800">
          <p>
            <strong>Prediction:</strong>{" "}
            <span className="capitalize font-semibold text-lg">
              {result.prediction}
            </span>
          </p>
          <p>
            <strong>Probability:</strong> {probability}%
          </p>

          {/* Feature Importance */}
          {result.feature_importance && (
            <div>
              <h3 className="font-semibold mb-2">Feature Impact</h3>
              <Bar
                data={{
                  labels: Object.keys(result.feature_importance),
                  datasets: [
                    {
                      label: "Relative Importance",
                      data: Object.values(result.feature_importance),
                      backgroundColor: "#60a5fa",
                    },
                  ],
                }}
                options={{
                  indexAxis: "y",
                  plugins: { legend: { display: false } },
                  scales: { x: { beginAtZero: true, max: 1 } },
                }}
              />
            </div>
          )}

          {/* Tips Section */}
          <div>
            <h3 className="font-semibold mb-2">Personalized Tips</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              {isPositive ? (
                <>
                  <li>Consult a doctor for further medical advice.</li>
                  {result.glucose > 125 && (
                    <li>Monitor and reduce sugar intake.</li>
                  )}
                  {result.bmi > 30 && <li>Work on reducing your BMI.</li>}
                  {result.age > 45 && (
                    <li>Annual checkups are highly recommended.</li>
                  )}
                </>
              ) : (
                <>
                  <li>Your risk is low. Keep up the good work!</li>
                  {result.glucose <= 125 && (
                    <li>Maintain healthy glucose levels.</li>
                  )}
                  {result.bmi <= 30 && (
                    <li>Stay active to maintain a healthy weight.</li>
                  )}
                  {result.age <= 45 && (
                    <li>Regular checkups will help stay ahead.</li>
                  )}
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
    </div>
  );
};

export default Result;
