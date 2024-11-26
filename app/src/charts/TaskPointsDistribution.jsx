import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const TaskPointsDistribution = () => {
  // Temporary Data
  const tempTasks = [
    { name: "Clean Prayer Hall", points: 10 },
    { name: "Setup Iftar", points: 20 },
    { name: "Organize Library", points: 15 },
    { name: "Distribute Zakat", points: 25 },
    { name: "Setup Ramadan Program", points: 30 }
  ];

  // Chart Data Configuration
  const data = {
    labels: tempTasks.map((task) => task.name), // Task names on x-axis
    datasets: [
      {
        label: "Points Distribution", // Dataset label
        data: tempTasks.map((task) => task.points), // Points on y-axis
        backgroundColor: "rgba(255, 206, 86, 0.6)", // Bar color
        hoverBackgroundColor: "rgba(255, 206, 86, 0.8)"
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "#ffffff" // White text for the legend
        }
      },
      tooltip: {
        callbacks: {
          title: (tooltipItems) => tooltipItems[0].label,
          label: (tooltipItem) =>
            `Points: ${data.datasets[0].data[tooltipItem.dataIndex]}`
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Tasks",
          font: {
            size: 14,
            weight: "bold"
          },
          color: "#ffffff" // White x-axis label
        },
        ticks: {
          color: "#ffffff" // White text for x-axis ticks
        }
      },
      y: {
        title: {
          display: true,
          text: "Points",
          font: {
            size: 14,
            weight: "bold"
          },
          color: "#ffffff" // White y-axis label
        },
        ticks: {
          color: "#ffffff", // White text for y-axis ticks
          stepSize: 5 // Adjust step size as needed
        }
      }
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-white mb-4">
        Task Points Distribution
      </h3>
      <div style={{ height: "300px" }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default TaskPointsDistribution;
