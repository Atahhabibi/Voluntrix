import React from "react";
import { Line } from "react-chartjs-2";

const VolunteerHoursOverTime = () => {
  const data = {
    labels: ["January", "February", "March", "April"],
    datasets: [
      {
        label: "Total Hours",
        data: [50, 100, 150, 200],
        borderColor: "#36A2EB",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        tension: 0.4,
        fill: true
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" }
    }
  };

  return (
    <div className="card w-full bg-gray-800 shadow-xl mb-6 border border-gray-700 p-4 ">
      {/* Flex container for centered title */}
      <div className="flex justify-center">
        <h2 className="card-title text-lg font-semibold text-white mb-6">
          Volunteer Hours Over Time
        </h2>
      </div>
      {/* Set custom width and height for the chart */}
      <Line data={data} options={options} width={540} height={320} />
    </div>
  );
};

export default VolunteerHoursOverTime;
