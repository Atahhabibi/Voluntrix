import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import useAppData from "../util/CustomHooks/useAppData";

ChartJS.register(ArcElement, Tooltip, Legend);

const UserParticipationOverview = () => {
  const { data, isLoading, isError } = useAppData();

  // Extract admin and volunteer data
  const allAdmins = data?.allAdmins?.allAdmins || [];
  const volunteers = data?.users?.data || [];

  const adminCount = allAdmins.filter(
    (admin) => admin.role !== "super-admin"
  ).length;

 

  // Calculate volunteer count
  const volunteerCount = volunteers.length;

  // Chart Data Configuration
  const chartData = {
    labels: ["Admins", "Volunteers"],
    datasets: [
      {
        data: [adminCount, volunteerCount], // Admins and Volunteers count
        backgroundColor: ["#36A2EB", "#FF6384"], // Colors for chart slices
        hoverBackgroundColor: ["#36A2EB", "#FF6384"]
      }
    ]
  };

  const options = {
    responsive: true,
    aspectRatio: 2, // Width-to-height ratio
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
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error fetching data...</div>;
  }

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-white mb-4">
        User Participation Overview
      </h3>
      <div style={{ height: "300px" }}>
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
};

export default UserParticipationOverview;
