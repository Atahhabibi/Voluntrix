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

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const TimeSpentOnTasksAndEvents = ({ timeRecords, isLoading, isError }) => {
  // Ensure timeRecords is valid
  const validTimeRecords = timeRecords || [];

  // Group Data by Date
  const groupedData = validTimeRecords.reduce((acc, record) => {
    const date = new Date(record.clockIn).toLocaleDateString("en-US");
    acc[date] = (acc[date] || 0) + record.timeSpent;
    return acc;
  }, {});

  // Generate Labels and Data Points
  const labels = Object.keys(groupedData); // Dates
  const dataPoints = Object.values(groupedData).map((seconds) =>
    (seconds / 60).toFixed(2)
  ); // Convert to minutes

  // Chart Data Configuration
  const data = {
    labels,
    datasets: [
      {
        label: "Time Spent (Minutes)",
        data: dataPoints,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4
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
          label: (tooltipItem) => `Time Spent: ${tooltipItem.raw} minutes`
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
          }
        }
      },
      y: {
        title: {
          display: true,
          text: "Time Spent (Minutes)",
          font: {
            size: 14,
            weight: "bold"
          }
        }
      }
    }
  };

  // Handle loading or error states
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading data...</div>;
  }

  return (
    <div
      className="bg-gray-800 p-4 rounded-lg shadow-md"
      style={{
        maxHeight: window.innerWidth >= 1024 ? "400px" : "250px", // Adjust max height based on screen width
        height: "100%" // Ensure it takes the full height of the container
      }}
    >
      <h3 className="text-lg font-semibold text-white mb-4">
        Time Spent on Tasks and Events
      </h3>
      <div className="relative h-[200px] sm:h-[250px] md:h-[300px] lg:h-[400px]">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default TimeSpentOnTasksAndEvents;
