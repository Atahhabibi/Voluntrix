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

const WeeklyEngagement = ({ timeRecords, isLoading, isError }) => {

  const validTimeRecords = timeRecords || [];


  const groupedData = validTimeRecords.reduce((acc, record) => {
    const day = new Date(record.clockIn).toLocaleDateString("en-US", {
      weekday: "long"
    });
    acc[day] = (acc[day] || 0) + 1;
    return acc;
  }, {});

  const labels = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];

  // Map data points for each day, filling missing days with 0
  const dataPoints = labels.map((day) => groupedData[day] || 0);

  // Chart data configuration
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

  // Handle loading or error states
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading data...</div>;
  }

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-white mb-4">
        Weekly Engagement
      </h3>
      <div style={{ height: "300px" }}>
        <Line data={data} />
      </div>
    </div>
  );
};

export default WeeklyEngagement;
