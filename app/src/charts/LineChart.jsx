import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const LineChart = ({ userPointsData }) => {

  const labels = userPointsData.map((item) =>
    new Date(item.createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric"
    })
  );


  let points=0; 

  const dataPoints=userPointsData.map((item)=>{
    points+=item.totalPoints;
    return points;

  })


  const data = {
    labels, // X-axis (Dates)
    datasets: [
      {
        label: "Points Growth",
        data:dataPoints, // Y-axis (Cumulative Points)
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        tension: 0.4
      }
    ]
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-white mb-4">
        User Points Growth Over Time
      </h3>
      <Line data={data} options={{ responsive: true }} />
    </div>
  );
};

export default LineChart;
