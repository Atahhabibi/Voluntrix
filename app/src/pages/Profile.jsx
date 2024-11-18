import React from "react";
import { FaClock, FaStar, FaTasks, FaEnvelope, FaPhone } from "react-icons/fa";

const VolunteerProfilePage = ({ volunteer }) => {
  // Example volunteer details (replace with actual data as needed)
  const sampleVolunteer = {
    name: "Ahmed Khan",
    profileImage: "https://via.placeholder.com/150",
    email: "ahmed.khan@example.com",
    phone: "+123456789",
    totalHoursWorked: 150,
    totalPointsEarned: 450,
    tasksCompleted: [
      { name: "Eid Parking Management", date: "2024-06-10", points: 20 },
      { name: "Community Cleanup", date: "2024-06-15", points: 15 },
      { name: "Charity Drive Assistance", date: "2024-07-01", points: 25 }
    ]
  };

  const volunteerData = volunteer || sampleVolunteer;

  return (
    <div className="p-6 bg-gray-900 text-gray-200 min-h-screen flex justify-center">
      <div className="w-full max-w-3xl">
        {/* Profile Card */}
        <div className="card w-full bg-gray-800 shadow-xl mb-6 border border-gray-700">
          <div className="card-body flex items-center flex-col">
            <img
              src={volunteerData.profileImage}
              alt={`${volunteerData.name}'s profile`}
              className="w-32 h-32 rounded-full mb-4 object-cover shadow-lg"
            />
            <h2 className="card-title text-3xl font-bold text-white mb-1">
              {volunteerData.name}
            </h2>
            <div className="text-gray-400 flex flex-col items-center space-y-2">
              <p className="flex items-center">
                <FaEnvelope className="text-blue-400 mr-2" />
                {volunteerData.email}
              </p>
              <p className="flex items-center">
                <FaPhone className="text-green-400 mr-2" />
                {volunteerData.phone}
              </p>
            </div>
          </div>
        </div>

        {/* Summary Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
          <div className="flex items-center p-4 bg-gray-800 rounded-lg shadow-md border border-gray-700">
            <FaClock className="text-4xl text-blue-400 mr-4" />
            <div>
              <p className="text-3xl font-semibold text-white">
                {volunteerData.totalHoursWorked}
              </p>
              <p className="text-gray-400">Hours Worked</p>
            </div>
          </div>
          <div className="flex items-center p-4 bg-gray-800 rounded-lg shadow-md border border-gray-700">
            <FaStar className="text-4xl text-yellow-400 mr-4" />
            <div>
              <p className="text-3xl font-semibold text-white">
                {volunteerData.totalPointsEarned}
              </p>
              <p className="text-gray-400">Points Earned</p>
            </div>
          </div>
          <div className="flex items-center p-4 bg-gray-800 rounded-lg shadow-md border border-gray-700">
            <FaTasks className="text-4xl text-green-400 mr-4" />
            <div>
              <p className="text-3xl font-semibold text-white">
                {volunteerData.tasksCompleted.length}
              </p>
              <p className="text-gray-400">Tasks Completed</p>
            </div>
          </div>
        </div>

        {/* Tasks Completed Section */}
        <div className="card w-full bg-gray-800 shadow-xl mb-6 border border-gray-700">
          <div className="card-body">
            <h3 className="text-2xl font-bold text-white mb-4">
              Completed Tasks
            </h3>
            <ul className="space-y-4">
              {volunteerData.tasksCompleted.map((task, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-gray-700 rounded-lg p-4"
                >
                  <div>
                    <h4 className="text-xl font-semibold text-white">
                      {task.name}
                    </h4>
                    <p className="text-gray-400">Date: {task.date}</p>
                  </div>
                  <div className="flex items-center text-yellow-400">
                    <FaStar className="mr-2" />
                    <p>{task.points} Points</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerProfilePage;
