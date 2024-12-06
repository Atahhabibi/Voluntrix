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
import useAppData from "../util/CustomHooks/useAppData";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const TaskPointsDistribution = ({tasks,isLoading,isError}) => {


  const taskPoints = tasks.map((task) => task.points);

  // Chart Data Configuration
  const data = {
    labels: tasks.map(() => ""), // Empty x-axis labels
    datasets: [
      {
        label: "Points Distribution",
        data: taskPoints,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        hoverBackgroundColor: "rgba(75, 192, 192, 0.8)"
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
          title: (tooltipItems) => {
            // Display task name on hover
            const index = tooltipItems[0].dataIndex;
            return tasks[index].name;
          },
          label: (tooltipItem) =>
            `Points: ${data.datasets[0].data[tooltipItem.dataIndex]}`
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
          color: "#ffffff"
        },
        ticks: {
          color: "#ffffff" // Hide ticks since labels are empty
        }
      },
      y: {
        title: {
          display: true,
          text: "Points",
          font: {
            size: 14,
            weight: "bold"
          },
          color: "#ffffff"
        },
        ticks: {
          color: "#ffffff",
          stepSize: 10
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
  <div
    className="bg-gray-800 p-4 rounded-lg shadow-md"
    style={{
      maxHeight: window.innerWidth >= 1024 ? "400px" : "250px", // Adjust max height based on screen width
      height: "100%" // Ensure it takes the full height of the container
    }}
  >
    <h3 className="text-lg font-semibold text-white mb-4">
      Task Points Distribution
    </h3>
    <div className="relative h-[200px] sm:h-[150px] md:h-[200px] lg:h-[300px]">
      {/* Responsive height for chart container */}
      <Bar data={data} options={options} />
    </div>
  </div>
);

};

export default TaskPointsDistribution;
