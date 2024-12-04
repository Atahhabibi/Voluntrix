import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const EventAttendanceStatus = ({ events, isError, isLoading }) => {
  const totals = events.reduce(
    (acc, event) => {
      acc.totalAttended += event.totalAttended;
      acc.totalSignUp += event.totalSignUp;
      return acc;
    },
    { totalAttended: 0, totalSignUp: 0 }
  );
  const noSignups = events.length - (totals.totalAttended + totals.totalSignUp);

  // Chart Data Configuration
  const chartData = {
    labels: ["Total Attended", "Total Signed Up", "No Signups"],
    datasets: [
      {
        data: [totals.totalAttended, totals.totalSignUp, noSignups],
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

  if (isLoading) {
    return <div>Loading.....</div>;
  }
  if (isError) {
    return <div>Error.....</div>;
  }

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
