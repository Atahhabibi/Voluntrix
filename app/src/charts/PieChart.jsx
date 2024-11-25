import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ tasks = 5, events = 3 }) => {
  const data = {
    labels: ["Tasks", "Events"],
    datasets: [
      {
        label: "Participation",
        data: [tasks, events],
        backgroundColor: [
          "rgba(54, 162, 235, 0.6)", // Blue for Tasks
          "rgba(255, 206, 86, 0.6)" // Yellow for Events
        ],
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true, // Ensures aspect ratio is maintained
    aspectRatio: 2, // Decreases the height by increasing the width-to-height ratio
    plugins: {
      legend: {
        display: true,
        position: "left", // Position the legend to the right
        labels: {
          color: "#ffffff" // Legend text color
        }
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.raw || 0;
            const total = tasks + events;
            const percentage = ((value / total) * 100).toFixed(2);
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      }
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-white mb-4">
        Task and Event Participation
      </h3>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
