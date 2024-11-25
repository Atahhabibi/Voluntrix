import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = ({ completedTasks = 4, pendingTasks = 2 }) => {
  const data = {
    labels: ["Completed", "Pending"],
    datasets: [
      {
        label: "Task Completion Status",
        data: [completedTasks, pendingTasks],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)", // Green for Completed
          "rgba(255, 99, 132, 0.6)" // Red for Pending
        ],
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true, // Ensures aspect ratio is maintained
    aspectRatio: 2, // Decreases the height by increasing the width-to-height ratio
    cutout: "70%", // Creates the donut effect
    plugins: {
      legend: {
        position: "left", 
        display: true,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.raw || 0;
            const total = completedTasks + pendingTasks;
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
        Task Completion Status
      </h3>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DonutChart;
