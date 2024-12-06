import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const TasksVsEventsParticipation = () => {
  // Temporary Data
  const tempTimeRecords = [
    { type: "task" },
    { type: "event" },
    { type: "task" },
    { type: "task" },
    { type: "event" },
    { type: "task" },
    { type: "event" },
    { type: "task" }
  ];

  // Calculate Counts
  const taskCount = tempTimeRecords.filter(
    (record) => record.type === "task"
  ).length;
  const eventCount = tempTimeRecords.filter(
    (record) => record.type === "event"
  ).length;

  // Chart Data Configuration
  const data = {
    labels: ["Tasks", "Events"],
    datasets: [
      {
        data: [taskCount, eventCount],
        backgroundColor: ["#36A2EB", "#FF6384"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384"]
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow container height to control the chart
    plugins: {
      legend: {
        display: true,
        position: "top"
      },
      tooltip: {
        callbacks: {
          title: (tooltipItems) => tooltipItems[0].label,
          label: (tooltipItem) =>
            `${tooltipItem.label}: ${
              data.datasets[0].data[tooltipItem.dataIndex]
            }`
        }
      }
    }
  };

  return (
    <div
      className="bg-gray-800 p-4 rounded-lg shadow-md"
      style={{ maxHeight: "400px" }}
    >
      <h3 className="text-lg font-semibold text-white mb-4">
        Tasks vs Events Participation
      </h3>
      <div className="relative h-[200px] sm:h-[150px] md:h-[200px] lg:h-[300px]">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default TasksVsEventsParticipation;
