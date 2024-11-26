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

const TimeSpentOnTasksAndEvents = () => {
  // Temporary Data
  const tempTimeRecords = [
    { clockIn: "2024-11-20T08:00:00Z", timeSpent: 3600 }, // 1 hour in seconds
    { clockIn: "2024-11-20T12:00:00Z", timeSpent: 1800 }, // 30 minutes
    { clockIn: "2024-11-21T09:00:00Z", timeSpent: 5400 }, // 1.5 hours
    { clockIn: "2024-11-22T10:00:00Z", timeSpent: 7200 }, // 2 hours
    { clockIn: "2024-11-23T11:00:00Z", timeSpent: 3000 }, // 50 minutes
    { clockIn: "2024-11-24T14:00:00Z", timeSpent: 6000 } // 1 hour, 40 minutes
  ];

  // Group Data by Date
  const groupedData = tempTimeRecords.reduce((acc, record) => {
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

return (
  <div className="bg-gray-800 p-4 rounded-lg shadow-md">
    <h3 className="text-lg font-semibold text-white mb-4">
      Time Spent on Tasks and Events
    </h3>
    <div style={{ height: "300px" }}>
      <Line data={data} options={options} />
    </div>
  </div>
);

};

export default TimeSpentOnTasksAndEvents;
