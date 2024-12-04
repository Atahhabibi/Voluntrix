import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from "chart.js";
import useAppData from "../util/CustomHooks/useAppData";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const NewUsersOverTime = ({users,isLoading,isError}) => {
 
  // Group Users by Date
  const groupedData = users.reduce((acc, user) => {
    const date = new Date(user.createdAt).toLocaleDateString("en-US");
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});


  // Generate Labels and Data Points
  const labels = Object.keys(groupedData); // Dates
  const dataPoints = Object.values(groupedData); // Count of users per date

  // Chart Data Configuration
  const data = {
    labels,
    datasets: [
      {
        label: "New Users",
        data: dataPoints,
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        tension: 0.4
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
          color: "#ffffff"
        }
      },
      tooltip: {
        callbacks: {
          title: (tooltipItems) => tooltipItems[0].label,
          label: (tooltipItem) =>
            `New Users: ${data.datasets[0].data[tooltipItem.dataIndex]}`
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
          font: {
            size: 14,
            weight: "bold"
          },
          color: "#ffffff"
        },
        ticks: {
          color: "#ffffff"
        }
      },
      y: {
        title: {
          display: true,
          text: "Number of New Users",
          font: {
            size: 14,
            weight: "bold"
          },
          color: "#ffffff"
        },
        ticks: {
          color: "#ffffff",
          stepSize: 1 // Adjust step size for better readability
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
        New Users Over Time
      </h3>
      <div style={{ height: "300px" }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default NewUsersOverTime;
