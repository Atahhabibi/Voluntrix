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

const HoursWorkedByUsers = () => {
  // Temporary Data
  const tempUsers = [
    { username: "User1", hoursWorked: 40 },
    { username: "User2", hoursWorked: 35 },
    { username: "User3", hoursWorked: 50 },
    { username: "User4", hoursWorked: 25 },
    { username: "User5", hoursWorked: 45 }
  ];

  // Chart Data Configuration
  const chartData = {
    labels: tempUsers.map((user) => user.username), // Usernames on x-axis
    datasets: [
      {
        label: "Hours Worked", // Dataset label
        data: tempUsers.map((user) => user.hoursWorked), // Hours worked for each user
        backgroundColor: "rgba(75, 192, 192, 0.6)", // Bar color
        hoverBackgroundColor: "rgba(75, 192, 192, 0.8)"
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top"
      },
      tooltip: {
        callbacks: {
          title: (tooltipItems) => tooltipItems[0].label,
          label: (tooltipItem) =>
            `Hours Worked: ${chartData.datasets[0].data[tooltipItem.dataIndex]}`
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
          }
        }
      },
      y: {
        title: {
          display: true,
          text: "Hours Worked",
          font: {
            size: 14,
            weight: "bold"
          }
        },
        ticks: {
          stepSize: 5 // Adjust step size for readability
        }
      }
    }
  };

return (
  <div className="bg-gray-800 p-4 rounded-lg shadow-md">
    <h3 className="text-lg font-semibold text-white mb-4">
      Hours Worked by Users
    </h3>
    <div style={{ height: "300px" }}>
      <Bar data={chartData} options={options} />
    </div>
  </div>
);

};

export default HoursWorkedByUsers;
