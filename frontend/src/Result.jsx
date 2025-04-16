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
      <div className="mt-10 text-xl text-center">No result data found.</div>
    );
  }

  // Debug: Log result to inspect data
  console.log(result);

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

  // Generate PDF report
  const generatePDF = () => {
    const input = resultRef.current; // Capture the specific div
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 10, 10);
      pdf.save("diabetes-prediction.pdf");
    });
  };

  return (
    <div className="max-w-xl p-6 mx-auto" ref={resultRef}>
      <h2 className="mb-4 text-2xl font-bold text-center">Prediction Result</h2>
      <div className="p-6 bg-white rounded shadow-md">
        <p>
          <strong>Prediction:</strong> {result.prediction}
        </p>
        <p>
          <strong>Probability:</strong> {probability}%
        </p>

        <div className="my-6">
          <Doughnut data={chartData} options={chartOptions} />
        </div>

        {/* Display feature importance */}
        {result.feature_importance && (
          <div className="mt-10">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">
              Feature Impact
            </h3>
            <Bar
              data={{
                labels: Object.keys(result.feature_importance),
                datasets: [
                  {
                    label: "Relative Importance",
                    data: Object.values(result.feature_importance),
                    backgroundColor: "#3B82F6",
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

        <div className="mt-6">
          <h3 className="mb-2 text-lg font-semibold text-gray-700">
            Personalized Tips
          </h3>
          <ul className="pl-5 list-disc text-gray-600">
            {result.prediction?.toLowerCase() === "positive" && (
              <>
                <li>
                  Consult a doctor for further tests and guidance on managing
                  diabetes risk.
                </li>
                {result.glucose > 125 && (
                  <li>
                    Reduce your sugar intake and monitor your glucose levels
                    regularly.
                  </li>
                )}
                {result.bmi > 30 && (
                  <li>
                    Try a balanced diet and regular exercise to reduce BMI.
                  </li>
                )}
                {result.age > 45 && (
                  <li>
                    Annual checkups are crucial as age increases diabetes risk.
                  </li>
                )}
              </>
            )}

            {result.prediction?.toLowerCase() === "negative" && (
              <>
                <li>Your risk is low. Keep up your healthy lifestyle!</li>
                {result.glucose <= 125 && (
                  <li>
                    Maintain a balanced diet to keep your glucose levels within
                    the healthy range.
                  </li>
                )}
                {result.bmi <= 30 && (
                  <li>
                    Continue with regular physical activity to maintain a
                    healthy weight.
                  </li>
                )}
                {result.age <= 45 && (
                  <li>Keep up with your routine health checkups.</li>
                )}
              </>
            )}
          </ul>
        </div>

        {/* Download PDF button */}
        <button
          onClick={generatePDF}
          className="w-full py-2 mt-4 text-white bg-purple-600 rounded hover:bg-purple-700"
        >
          Download Report (PDF)
        </button>

        {/* Timestamp */}
        <p className="text-sm text-gray-400 mt-4">
          Generated on: {new Date().toLocaleString()}
        </p>

        {/* Try again button */}
        <Link
          to="/predict"
          className="block mt-4 text-blue-600 hover:underline"
        >
          ← Try again with different values
        </Link>
      </div>
    </div>
  );
};

export default Result;
