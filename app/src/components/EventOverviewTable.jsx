import React, { useState } from "react";
import Pagination from "./Pagination"; // Import the reusable Pagination component

const EventOverviewTable = ({ events, isLoading, isError }) => {
  // Handle loading or error states
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading events...</div>;
  }

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 3;

  const totalPages = Math.ceil(events.length / recordsPerPage);
  const currentEvents = events.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  // Pagination Handlers
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  // Map status dynamically based on `volunteersAssigned`
  const getStatus = (event) => {
    if (event.volunteersAssigned.length === 0) {
      return "Not Started";
    }
    const firstVolunteerStatus =
      event.volunteersAssigned[0]?.status || "Not Started";
    if (firstVolunteerStatus === "completed") return "Completed";
    if (firstVolunteerStatus === "signedUp") return "Pending";
    return "Not Started";
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-lg font-semibold text-white mb-4">Event Overview</h3>
      <div className="overflow-y-auto max-h-64">
        <table className="table-auto w-full text-gray-400">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="px-4 py-2">Event Name</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Location</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentEvents.length > 0 ? (
              currentEvents.map((event, index) => (
                <tr
                  key={event._id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-600" : "bg-gray-700"
                  } hover:bg-gray-500 transition`}
                >
                  <td className="px-4 py-2 text-center">{event.name}</td>
                  <td className="px-4 py-2 text-center">
                    {new Date(event.date).toLocaleDateString("en-US")}
                  </td>
                  <td className="px-4 py-2 text-center">{event.type}</td>
                  <td className="px-4 py-2 text-center">{event.location}</td>
                  <td className="px-4 py-2 text-center">{getStatus(event)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-400">
                  No events available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Reusable Pagination Component */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </div>
  );
};

export default EventOverviewTable;
