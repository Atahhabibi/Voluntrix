import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useLoaderData } from 'react-router-dom';

ChartJS.register(ArcElement, Tooltip, Legend);

const EventAttendanceStatus = () => {


  const data=useLoaderData(); 

  // Temporary Data
  const tempEvents = [
    { name: "Event 1", status: "not_attended" },
    { name: "Event 2", status: "completed" },
    { name: "Event 3", status: "pending" },
    { name: "Event 4", status: "completed" },
    { name: "Event 5", status: "not_attended" },
    { name: "Event 6", status: "pending" }
  ];

  // Count Event Statuses
  const statuses = tempEvents.reduce(
    (acc, event) => {
      acc[event.status]++;
      return acc;
    },
    { not_attended: 0, pending: 0, completed: 0 }
  );

  // Chart Data Configuration
  const chartData = {
    labels: ["Not Attended", "Pending", "Completed"],
    datasets: [
      {
        data: [statuses.not_attended, statuses.pending, statuses.completed],
        backgroundColor: ["#FF6384", "#FFCE56", "#36A2EB"],
        hoverBackgroundColor: ["#FF6384", "#FFCE56", "#36A2EB"]
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
