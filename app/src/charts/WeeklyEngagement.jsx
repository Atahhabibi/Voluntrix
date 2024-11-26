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

const WeeklyEngagement = () => {
  // Temporary Data
  const tempTimeRecords = [
    { clockIn: "2024-11-20T08:00:00Z" }, // Wednesday
    { clockIn: "2024-11-21T09:00:00Z" }, // Thursday
    { clockIn: "2024-11-22T10:00:00Z" }, // Friday
    { clockIn: "2024-11-23T11:00:00Z" }, // Saturday
    { clockIn: "2024-11-20T12:00:00Z" }, // Wednesday
    { clockIn: "2024-11-21T13:00:00Z" }, // Thursday
    { clockIn: "2024-11-24T14:00:00Z" } // Sunday
  ];

  // Group Data by Day of the Week
  const groupedData = tempTimeRecords.reduce((acc, record) => {
    const day = new Date(record.clockIn).toLocaleDateString("en-US", {
      weekday: "long"
    });
    acc[day] = (acc[day] || 0) + 1;
    return acc;
  }, {});

  // Define Labels (Days of the Week)
  const labels = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];

  // Map Data Points for Each Day
  const dataPoints = labels.map((day) => groupedData[day] || 0);

  // Chart Data Configuration
  const data = {
    labels,
    datasets: [
      {
        label: "Engagement Count",
        data: dataPoints,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        tension: 0.4
      }
    ]
  };

return (
  <div className="bg-gray-800 p-4 rounded-lg shadow-md">
    <h3 className="text-lg font-semibold text-white mb-4">Weekly Engagement</h3>
    <div style={{ height: "300px" }}>
      <Line data={data} />
    </div>
  </div>
);

};

export default WeeklyEngagement;
