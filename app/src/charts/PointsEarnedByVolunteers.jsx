import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const PointsEarnedByVolunteers = () => {
  const data = {
    labels: ["Ahmed", "Fatima", "John", "Ali"],
    datasets: [
      {
        label: "Points Earned",
        data: [80, 120, 60, 40],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50"],
        borderColor: "#333",
        borderWidth: 1,
        barThickness: 40, // Adjusts the width of each bar
        maxBarThickness: 40 // Sets a maximum width for bars on responsive layouts
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false }, // Hides the legend from the top of the chart
      tooltip: { enabled: true }
    },
    scales: {
      y: { beginAtZero: true }
    }
  };

  return (
    <div className="card w-full bg-gray-800 shadow-xl mb-6 border border-gray-700 p-4">
      {/* Flex container for centered title */}
      <div className="flex justify-center">
        <h2 className="card-title text-lg font-semibold text-white mb-3">
          Points Earned by Volunteers
        </h2>
      </div>
      <Bar data={data} options={options} width={540} height={320} />
    </div>
  );
};

export default PointsEarnedByVolunteers;
