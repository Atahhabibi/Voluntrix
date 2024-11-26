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

const VolunteerAvailability = () => {
  // Temporary Data
  const tempTasks = [
    { name: "Clean Prayer Hall", volunteers: 5 },
    { name: "Setup Iftar", volunteers: 8 },
    { name: "Organize Library", volunteers: 3 },
    { name: "Distribute Zakat", volunteers: 10 },
    { name: "Setup Ramadan Program", volunteers: 6 }
  ];

  // Chart Data Configuration
  const data = {
    labels: tempTasks.map((task) => task.name),
    datasets: [
      {
        label: "Volunteers Needed",
        data: tempTasks.map((task) => task.volunteers),
        backgroundColor: "rgba(255, 159, 64, 0.6)"
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top"
      },
      tooltip: {
        callbacks: {
          title: (tooltipItems) => tempTasks[tooltipItems[0].dataIndex].name,
          label: (tooltipItem) => `Volunteers Needed: ${tooltipItem.raw}`
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Tasks",
          font: {
            size: 14,
            weight: "bold"
          }
        }
      },
      y: {
        title: {
          display: true,
          text: "Volunteers Needed",
          font: {
            size: 14,
            weight: "bold"
          }
        },
        ticks: {
          stepSize: 1
        }
      }
    }
  };

return (
  <div className="bg-gray-800 p-4 rounded-lg shadow-md">
    <h3 className="text-lg font-semibold text-white mb-4">
      Volunteer Availability
    </h3>
    <div style={{ height: "300px" }}>
      <Bar data={data} options={options} />
    </div>
  </div>
);

};

export default VolunteerAvailability;
