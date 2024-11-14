import React from "react";
import { Bar } from "react-chartjs-2";

const PointsDistributionByVolunteer = () => {
  const data = {
    labels: ["Ahmed", "Fatima", "John", "Ali"],
    datasets: [
      {
        label: "Points Earned",
        data: [80, 120, 60, 40],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50"]
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
    <div className="card w-full bg-gray-800 shadow-xl mb-6 border border-gray-700 p-4">
      <h2 className="card-title text-lg font-semibold text-white">
        Points Distribution by Volunteer
      </h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default PointsDistributionByVolunteer;
