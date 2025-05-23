import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaTasks, FaClock, FaMedal } from "react-icons/fa";
import { Link, useLoaderData } from "react-router-dom";
import useUserData from "../util/useUserData";
import { BarChart, LineChart, TaskPointsDistribution } from "../charts";

export const loader = () => {
  return useUserData();
};

const RecordsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { timeRecordData, user } = useLoaderData();
  const totalPoints = user.totalPoints;

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage =7;


   const userPointsData = timeRecordData.map((item) => {
     return {
       createdAt: item.createdAt,
       totalPoints: item.pointsEarned
     };
   });

  const totalPages = Math.ceil(timeRecordData.length / recordsPerPage);

  const formatElapsedTime = (seconds) => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const currentRecords = timeRecordData.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 py-6 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Back to Dashboard Button */}
        <Link
          to="/userDashboard"
          className="flex items-center justify-center w-48 py-2 mb-6 text-white  rounded bg-blue-500 hover:bg-blue-600 transition"
        >
          <FaArrowLeft className="mr-2" />
          Back to Dashboard
        </Link>

        {/* Title */}
        <h1 className="text-4xl font-bold text-center text-white mb-8">
          <FaTasks className="inline mr-2" />
          Volunteer Time Records
        </h1>

        {/* Total Points Earned */}
        <div className="bg-gray-800 rounded-lg shadow-md mb-6 p-4 text-center">
          <h2 className="text-xl font-semibold text-yellow-400 mb-2">
            <FaMedal className="inline mr-2" />
            Total Points Earned
          </h2>
          <p className="text-3xl font-bold text-white">{totalPoints}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 py-3">
          <BarChart timeRecordData={timeRecordData} />
          <LineChart userPointsData={userPointsData} />
        </div>
        {/* Records Table */}
        <div className="flex flex-col min-h-[20rem]">
          <div className="flex-grow">
            <table className="w-full bg-gray-800 text-gray-200 rounded-lg shadow-md text-sm border-collapse border border-gray-700 min-h-[10rem]">
              <thead>
                <tr className="bg-gray-700 text-center">
                  <th className="px-4 py-2 border border-gray-700">
                    <FaTasks className="inline mr-1" /> Task Name
                  </th>
                  <th className="px-4 py-2 border border-gray-700">
                    <FaClock className="inline mr-1" /> Clock In
                  </th>
                  <th className="px-4 py-2 border border-gray-700">
                    <FaClock className="inline mr-1" /> Clock Out
                  </th>
                  <th className="px-4 py-2 border border-gray-700">
                    <FaClock className="inline mr-1" /> Time Spent
                  </th>
                  <th className="px-4 py-2 border border-gray-700">
                    <FaMedal className="inline mr-1" /> Points Earned
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentRecords.map((record, index) => (
                  <tr
                    key={index}
                    className="border-t border-gray-700 hover:bg-gray-700 text-center"
                  >
                    <td className="px-4 py-2 border border-gray-700">
                      {record.name}
                    </td>
                    <td className="px-4 py-2 border border-gray-700">
                      {new Date(record.clockIn).toLocaleString()}
                    </td>
                    <td className="px-4 py-2 border border-gray-700">
                      {new Date(record.clockOut).toLocaleString()}
                    </td>
                    <td className="px-4 py-2 border border-gray-700">
                      {formatElapsedTime(record.timeSpent)}
                    </td>
                    <td className="px-4 py-2 border border-gray-700">
                      {record.pointsEarned}
                    </td>
                  </tr>
                ))}
                {/* Add empty rows to maintain consistent table height */}
                {currentRecords.length < recordsPerPage &&
                  Array.from(
                    { length: recordsPerPage - currentRecords.length },
                    (_, index) => (
                      <tr
                        key={`empty-${index}`}
                        className="border-t border-gray-700 text-center"
                      >
                        <td className="px-4 py-2 border border-gray-700">
                          &nbsp;
                        </td>
                        <td className="px-4 py-2 border border-gray-700">
                          &nbsp;
                        </td>
                        <td className="px-4 py-2 border border-gray-700">
                          &nbsp;
                        </td>
                        <td className="px-4 py-2 border border-gray-700">
                          &nbsp;
                        </td>
                        <td className="px-4 py-2 border border-gray-700">
                          &nbsp;
                        </td>
                      </tr>
                    )
                  )}
              </tbody>
            </table>
          </div>
          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className="px-4 py-2 bg-gray-700 text-gray-200 rounded hover:bg-gray-600 transition disabled:opacity-50"
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="text-gray-400">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="px-4 py-2 bg-gray-700 text-gray-200 rounded hover:bg-gray-600 transition disabled:opacity-50"
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordsPage;
