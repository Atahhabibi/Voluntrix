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
import useAppData from "../util/CustomHooks/useAppData";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const HoursWorkedByUsers = () => {
  const { data, isLoading, isError } = useAppData();
  const users = data?.users?.data || [];

  // Extract usernames and hours worked for the chart
  const usernames = users.map((user) => user.username);
  const hoursWorked = users.map(
    (user) => (user.hoursWorked === 0 ? 2 : user.hoursWorked) // Assign minimal value for zero hours
  );

  // Chart Data Configuration
  const chartData = {
    labels: users.map(() => ""), // Empty labels for x-axis
    datasets: [
      {
        label: "Hours Worked", // Dataset label
        data: hoursWorked, // Hours worked for each user
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
        position: "top",
        labels: {
          color: "#ffffff" // White text for the legend
        }
      },
      tooltip: {
        callbacks: {
          title: (tooltipItems) => usernames[tooltipItems[0].dataIndex], // Show username in tooltip
          label: (tooltipItem) => {
            const value = chartData.datasets[0].data[tooltipItem.dataIndex];
            return `Hours Worked: ${value === 2 ? 0 : value}`; // Display 0 in tooltip for minimal column
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Users (Hover to View Details)",
          font: {
            size: 14,
            weight: "bold"
          },
          color: "#ffffff" // White x-axis title
        },
        ticks: {
          color: "#ffffff" // Hide ticks since labels are empty
        }
      },
      y: {
        title: {
          display: true,
          text: "Hours Worked",
          font: {
            size: 14,
            weight: "bold"
          },
          color: "#ffffff" // White y-axis title
        },
        ticks: {
          color: "#ffffff", // White text for y-axis ticks
          stepSize: 5 // Adjust step size for better readability
        }
      }
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading data...</div>;
  }

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
