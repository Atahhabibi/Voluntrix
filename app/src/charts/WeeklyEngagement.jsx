import React, { useEffect } from "react";
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

  useEffect(() => {
    
  }, [window.innerWidth])

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

  const dataPoints = labels.map((day) => groupedData[day] || 0);

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
        Weekly Engagement
      </h3>
      <div className="relative h-[200px] sm:h-[150px] md:h-[200px] lg:h-[300px] ">
        <Line data={data} />
      </div>
    </div>
  );
};

export default WeeklyEngagement;
