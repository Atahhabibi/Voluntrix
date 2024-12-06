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

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const VolunteerAvailability = ({ tasks, isLoading, isError }) => {
  // Prepare chart data
  const volunteersNeeded = tasks.map((task) => task.volunteersNeeded); // Volunteers needed for each task

  // Chart Data Configuration
  const data = {
    labels: tasks.map(() => ""), // Empty x-axis labels
    datasets: [
      {
        label: "Volunteers Needed",
        data: volunteersNeeded, // Number of volunteers needed
        backgroundColor: "rgba(255, 159, 64, 0.6)",
        hoverBackgroundColor: "rgba(255, 159, 64, 0.8)"
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow dynamic height
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
          title: (tooltipItems) =>
            tasks[tooltipItems[0].dataIndex]?.name || "Unknown Task", // Show task name in tooltip
          label: (tooltipItem) =>
            `Volunteers Needed: ${data.datasets[0].data[tooltipItem.dataIndex]}`
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Tasks (Hover to View Details)",
          font: {
            size: 14,
            weight: "bold"
          },
          color: "#ffffff" // White x-axis title
        },
        ticks: {
          color: "#ffffff" // Hide ticks since labels are empty
        }
      },
      y: {
        title: {
          display: true,
          text: "Volunteers Needed",
          font: {
            size: 14,
            weight: "bold"
          },
          color: "#ffffff" // White y-axis title
        },
        ticks: {
          color: "#ffffff", // White text for y-axis ticks
          stepSize: 1
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
    <div
      className="bg-gray-800 p-4 rounded-lg shadow-md "
      style={{ maxHeight: "400px" }}
    >
      <h3 className="text-lg font-semibold text-white mb-4">
        Volunteer Availability
      </h3>
      <div className="relative h-[200px] sm:h-[150px] md:h-[200px] lg:h-[300px]">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default VolunteerAvailability;
