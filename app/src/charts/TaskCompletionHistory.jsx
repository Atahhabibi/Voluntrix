import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const TaskCompletionHistory = () => {
  const data = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Points Earned",
        data: [10, 20, 15, 30],
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        tension: 0.4,
        fill: true
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true, position: "top" }
    }
  };

  return (
    <div className="card w-full bg-gray-800 shadow-xl mb-6 border border-gray-700 p-4">
      <h2 className="card-title text-lg font-semibold text-white mb-4">
        Task Completion History
      </h2>
      <Line data={data} options={options} width={640} height={320} />
    </div>
  );
};

export default TaskCompletionHistory;
