import React, { useState } from "react";
import Pagination from "./Pagination";

const PointsDistributionTable = ({
  events,
  users,
  tasks,
  isLoading,
  isError
}) => {
  // Handle loading or error states
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading data...</div>;
  }

  // Calculate points distribution for each user
  const calculatePointsDistribution = () => {
    const userPoints = users.map((user) => {
      const tasksCompleted = tasks.filter((task) =>
        task.volunteersAssigned.some(
          (volunteer) =>
            volunteer.volunteerId === user._id &&
            volunteer.status === "completed"
        )
      );

      const eventsAttended = events.filter((event) =>
        event.volunteersAssigned.some(
          (volunteer) =>
            volunteer.volunteerId === user._id &&
            volunteer.status === "completed"
        )
      );

      const totalPoints = [
        ...tasksCompleted.map((task) => task.points),
        ...eventsAttended.map((event) => event.points)
      ].reduce((acc, points) => acc + points, 0);

      return {
        username: user.username,
        points: totalPoints,
        tasks: tasksCompleted.length,
        events: eventsAttended.length
      };
    });

    return userPoints;
  };

  const allVolunteers = calculatePointsDistribution();

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 3;

  const totalPages = Math.ceil(allVolunteers.length / recordsPerPage);
  const currentVolunteers = allVolunteers.slice(
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

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md ">
      <h3 className="text-lg font-semibold text-white mb-4">
        Points Distribution by Volunteers
      </h3>
      <div className="overflow-y-auto max-h-64">
        <table className="table-auto w-full text-gray-400">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="px-4 py-2">Username</th>
              <th className="px-4 py-2">Total Points</th>
              <th className="px-4 py-2">Tasks Completed</th>
              <th className="px-4 py-2">Events Attended</th>
            </tr>
          </thead>
          <tbody>
            {currentVolunteers.length > 0 ? (
              currentVolunteers.map((volunteer, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-600" : "bg-gray-700"
                  } hover:bg-gray-500 transition`}
                >
                  <td className="px-4 py-2 text-center">
                    {volunteer.username}
                  </td>
                  <td className="px-4 py-2 text-center">{volunteer.points}</td>
                  <td className="px-4 py-2 text-center">{volunteer.tasks}</td>
                  <td className="px-4 py-2 text-center">{volunteer.events}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-400">
                  No data available.
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

export default PointsDistributionTable;
