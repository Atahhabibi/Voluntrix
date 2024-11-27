import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip);

const BarChart = ({ timeRecordData}) => {

    const minutesWorked = timeRecordData.map((item) =>
      (item.timeSpent / 60).toFixed(0)
    );

    const nameList = timeRecordData.map((item) => item.name);




  const data = {
    labels: nameList, // Task names for x-axis
    datasets: [
      {
        label: "Minutes Worked",
        data: minutesWorked, // Data points in minutes
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        hoverBackgroundColor: "rgba(54, 162, 235, 0.8)"
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display:false,
      },
      tooltip: {
        callbacks: {
          // Tooltip shows task name and minutes worked
          title: (tooltipItems) => nameList[tooltipItems[0].dataIndex],
          label: (tooltipItem) => `Minutes Worked: ${tooltipItem.raw}`
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Task Names",
          color: "#FFFFFF",
          font: {
            size: 14,
            weight: "bold"
          }
        },
        ticks: {
          display: false // Hide task names on x-axis
        }
      },
      y: {
        title: {
          display: true,
          text: "Minutes Worked",
          color: "#FFFFFF",
          font: {
            size: 14,
            weight: "bold"
          }
        },
        ticks: {
          color: "#FFFFFF"
        }
      }
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-white mb-4">
        Minutes Worked by Tasks
      </h3>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
