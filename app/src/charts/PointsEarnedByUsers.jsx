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

const PointsEarnedByUsers = () => {
  const { data, isLoading, isError } = useAppData();
  const users = data?.users?.data || [];

  // Extract usernames and points for the chart
  const usernames = users.map((user) => user.username);
  const points = users.map((user) => (user.points === 0 ? 15 : user.points)); // Assign minimal value for zero points

  // Chart Data Configuration
  const chartData = {
    labels: usernames.map(() => ""), // Empty x-axis labels
    datasets: [
      {
        label: "Points Earned", // Dataset label
        data: points, // Points for each user
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
          title: (tooltipItems) => {
            const index = tooltipItems[0].dataIndex;
            return usernames[index]; // Show username in tooltip
          },
          label: (tooltipItem) => {
            const pointValue =
              chartData.datasets[0].data[tooltipItem.dataIndex];
            return `Points Earned: ${pointValue === 15? 0 : pointValue}`; // Show 0 in tooltip for minimal column
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
          color: "#ffffff" // Empty ticks since labels are empty
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

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error...</div>;
  }

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
