import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useLoaderData } from "react-router-dom";

ChartJS.register(ArcElement, Tooltip, Legend);

const EventAttendanceStatus = () => {
  const data = useLoaderData();

  // Example Event Data with total signups for each event
  const events = [
    { name: "Event 1", attended: 10, pending: 5, total: 20 },
    { name: "Event 2", attended: 15, pending: 8, total: 30 },
    { name: "Event 3", attended: 5, pending: 2, total: 10 },
    { name: "Event 4", attended: 20, pending: 6, total: 40 },
    { name: "Event 5", attended: 12, pending: 10, total: 30 }
  ];

  // Calculate Totals
  const totals = events.reduce(
    (acc, event) => {
      acc.attended += event.attended;
      acc.pending += event.pending;
      acc.noSignups += event.total - (event.attended + event.pending); // Calculate no signups
      return acc;
    },
    { attended: 0, pending: 0, noSignups: 0 }
  );

  // Chart Data Configuration
  const chartData = {
    labels: ["Attended", "Pending", "No Signups"],
    datasets: [
      {
        data: [totals.attended, totals.pending, totals.noSignups],
        backgroundColor: ["#36A2EB", "#FFCE56", "#FF6384"],
        hoverBackgroundColor: ["#36A2EB", "#FFCE56", "#FF6384"]
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows height customization
    plugins: {
      legend: {
        display: true,
        position: "left",
        labels: {
          color: "#ffffff" // White text for the legend
        }
      },
      tooltip: {
        callbacks: {
          title: (tooltipItems) => tooltipItems[0].label,
          label: (tooltipItem) =>
            `${tooltipItem.label}: ${
              chartData.datasets[0].data[tooltipItem.dataIndex]
            }`
        }
      }
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-white mb-4">
        Event Attendance Status
      </h3>
      <div style={{ height: "300px" }}>
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
};

export default EventAttendanceStatus;
