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

const PointsEarnedByUsers = () => {
  // Temporary Data
  const tempUsers = [
    { username: "User1", points: 120 },
    { username: "User2", points: 150 },
    { username: "User3", points: 90 },
    { username: "User4", points: 200 },
    { username: "User5", points: 180 }
  ];

  // Chart Data Configuration
  const chartData = {
    labels: tempUsers.map((user) => user.username), // Usernames on x-axis
    datasets: [
      {
        label: "Points Earned", // Dataset label
        data: tempUsers.map((user) => user.points), // Points for each user
        backgroundColor: "rgba(153, 102, 255, 0.6)", // Bar color
        hoverBackgroundColor: "rgba(153, 102, 255, 0.8)"
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
          color: "#ffffff" // White text for legend
        }
      },
      tooltip: {
        callbacks: {
          title: (tooltipItems) => tooltipItems[0].label,
          label: (tooltipItem) =>
            `Points Earned: ${
              chartData.datasets[0].data[tooltipItem.dataIndex]
            }`
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Users",
          font: {
            size: 14,
            weight: "bold"
          },
          color: "#ffffff" // White x-axis title
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
          color: "#ffffff" // White y-axis title
        },
        ticks: {
          color: "#ffffff", // White text for y-axis ticks
          stepSize: 20 // Adjust step size for readability
        }
      }
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-white mb-4">
        Points Earned by Users
      </h3>
      <div style={{ height: "300px" }}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default PointsEarnedByUsers;
