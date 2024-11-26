import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const TaskCompletionStatus = () => {
  // Temporary Data
  const tempTasks = [
    { name: "Task 1", status: "not_signed_up" },
    { name: "Task 2", status: "completed" },
    { name: "Task 3", status: "pending" },
    { name: "Task 4", status: "completed" },
    { name: "Task 5", status: "not_signed_up" },
    { name: "Task 6", status: "pending" }
  ];

  // Count statuses
  const statuses = tempTasks.reduce(
    (acc, task) => {
      acc[task.status]++;
      return acc;
    },
    { not_signed_up: 0, pending: 0, completed: 0 }
  );

  // Chart Data Configuration
  const chartData = {
    labels: ["Not Signed Up", "Pending", "Completed"],
    datasets: [
      {
        data: [statuses.not_signed_up, statuses.pending, statuses.completed],
        backgroundColor: ["#FF6384", "#FFCE56", "#36A2EB"],
        hoverBackgroundColor: ["#FF6384", "#FFCE56", "#36A2EB"]
      }
    ]
  };

  const options = {
    responsive: true,
    aspectRatio: 2,
    plugins: {
      legend: {
        display: true,
        position: "left"
      },
      tooltip: {
        callbacks: {
          title: (tooltipItems) => tooltipItems[0].label,
          label: (tooltipItem) =>
            `${tooltipItem.label}: ${
              chartData.datasets[0].data[tooltipItem.dataIndex]
            }`
        }
      }
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-white mb-4">
        Task Completion Status
      </h3>
      <div style={{ height: "300px" }}>
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
};

export default TaskCompletionStatus;
