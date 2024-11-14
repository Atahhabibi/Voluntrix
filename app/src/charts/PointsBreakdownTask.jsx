import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PointsBreakdownByTask = () => {
  const data = {
    labels: ["Setup", "Parking Assistance", "Crowd Control", "Cleanup"],
    datasets: [
      {
        label: "Points",
        data: [30, 40, 20, 10],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50"]
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false // Hide the default legend
      }
    }
  };

  return (
    <div className="card w-full bg-gray-800 shadow-xl mb-6 border border-gray-700 p-4">
      {/* Centered Title */}
      <h2 className="card-title text-lg font-semibold text-white text-center mb-4">
        Points Breakdown by Task
      </h2>
      {/* Flex container to keep legend beside chart on all screens */}
      <div className="flex flex-row justify-center items-center space-x-8">
        {/* Responsive Pie chart container with full height */}
        <div className="w-[12rem] h-[12rem] sm:w-[16rem] sm:h-[16rem] md:w-[18rem] md:h-[18rem] lg:w-[20rem] lg:h-[20rem]">
          <Pie data={data} options={options} />
        </div>
        {/* Custom legend beside chart on all screen sizes */}
        <div className="space-y-4 text-white">
          {data.labels.map((label, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div
                className="w-4 h-4 rounded-full"
                style={{
                  backgroundColor: data.datasets[0].backgroundColor[index]
                }}
              ></div>
              <span className="text-sm font-medium">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PointsBreakdownByTask;
