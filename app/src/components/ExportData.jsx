// React component for exporting data with temporary data
import React from "react";

const ExportDataButton = () => {
  // Temporary data for demonstration purposes
  const tempData = [
    { user: "John", hoursWorked: 120, points: 10, role: "Volunteer" },
    { user: "Jane", hoursWorked: 150, points: 15, role: "Admin" },
    { user: "Alice", hoursWorked: 90, points: 8, role: "Volunteer" },
    { user: "Bob", hoursWorked: 200, points: 20, role: "Admin" },
  ];

  // Convert data to CSV format
  const convertToCSV = (data) => {
    const headers = Object.keys(data[0]);
    const rows = data.map((row) =>
      headers.map((header) => JSON.stringify(row[header], null, 2)).join(",")
    );
    return [headers.join(","), ...rows].join("\n");
  };

  // Trigger CSV file download
  const downloadCSV = (data, filename = "exported_data.csv") => {
    const csv = convertToCSV(data);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={() => downloadCSV(tempData)}
      className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg"
    >
      Export Data
    </button>
  );
};

export default ExportDataButton;
