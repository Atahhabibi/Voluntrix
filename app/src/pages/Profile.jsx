import React from "react";
import {
  FaClock,
  FaStar,
  FaTasks,
  FaEnvelope,
  FaUserCircle,
  FaEdit
} from "react-icons/fa";
import { useLoaderData, Link } from "react-router-dom";
import { customFetch } from "../util/customFetch";

export const loader = async ({ params }) => {
  try {
    const response = await customFetch(`/users/${params.id}`);
    const volunteer = response.data.volunteer;

    if (
      (volunteer.tasks && volunteer.tasks.length > 0) ||
      (volunteer.events && volunteer.length > 0)
    ) {
      const detailResponse = await customFetch.post("/tasks/IdList", {
        taskids: volunteer.tasks,
        eventIds: volunteer.events
      });

      return {
        volunteer,
        tasks: detailResponse?.data?.data?.tasks,
        events: detailResponse?.data?.data?.events
      };
    }
  } catch (error) {
    console.log(error);
    throw new Response("Failed to load volunteer data.", { status: 500 });
  }
};

const VolunteerProfilePage = () => {
  const {tasks,volunteer,events} = useLoaderData();





  return (
  
    <div className="p-6 bg-gray-900 text-gray-200 min-h-screen">
      <div className="w-full max-w-6xl mx-auto">
        {/* Profile Section */}
        <div className="card w-full bg-gray-800 shadow-lg mb-6 border border-gray-700">
          <div className="card-body flex flex-col items-center">
            <img
              src={volunteer?.profileImage}
              alt={`${volunteer.username}'s profile`}
              className="w-32 h-32 rounded-full object-cover shadow-md mb-4"
            />
            <h2 className="text-3xl font-bold text-white mb-2">
              {volunteer?.username}
            </h2>
            <div className="text-gray-400 space-y-1 mb-4">
              <p className="flex items-center text-lg">
                <FaEnvelope className="text-blue-400 mr-2" />
                {volunteer?.email}
              </p>
              <p className="flex items-center text-lg justify-center">
                <FaUserCircle className="text-green-400 mr-2 " />
                Role: {volunteer?.role}
              </p>
            </div>

            {volunteer.role === "volunteer" && (
              <Link
                className="btn btn-outline btn-primary flex items-center"
                to={`/editProfile/${volunteer?._id}`}
              >
                <FaEdit className="mr-2" /> Edit Profile
              </Link>
            )}
          </div>
        </div>

        {/* Summary Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
          <div className="flex items-center p-4 bg-gray-800 rounded-lg shadow-md border border-gray-700">
            <FaClock className="text-5xl text-blue-400 mr-4" />
            <div>
              <p className="text-3xl font-semibold text-white">
                {volunteer.hoursWorked}
              </p>
              <p className="text-gray-400">Hours Worked</p>
            </div>
          </div>
          <div className="flex items-center p-4 bg-gray-800 rounded-lg shadow-md border border-gray-700">
            <FaStar className="text-5xl text-yellow-400 mr-4" />
            <div>
              <p className="text-3xl font-semibold text-white">
                {volunteer.points}
              </p>
              <p className="text-gray-400">Points Earned</p>
            </div>
          </div>
          <div className="flex items-center p-4 bg-gray-800 rounded-lg shadow-md border border-gray-700">
            <FaTasks className="text-5xl text-green-400 mr-4" />
            <div>
              <p className="text-3xl font-semibold text-white">
                {volunteer?.tasks?.length}
              </p>
              <p className="text-gray-400">Tasks Completed</p>
            </div>
          </div>
        </div>

        {/* Tasks and Events Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Assigned Tasks */}
          <div className="card bg-gray-800 shadow-lg border border-gray-700">
            <div className="card-body">
              <h3 className="text-2xl font-bold text-white mb-4">
                Assigned Tasks
              </h3>
              {tasks.length > 0 ? (
                <ul className="space-y-4">
                  {tasks.map((task, index) => (
                    <li
                      key={index}
                      className="flex items-center p-3 bg-gray-700 rounded-lg shadow-md"
                    >
                      <FaTasks className="text-green-400 mr-3" />
                      <span className="text-white">
                        {task.name || "Task Name"}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400">No assigned tasks to show.</p>
              )}
            </div>
          </div>

          {/* Assigned Events */}
          <div className="card bg-gray-800 shadow-lg border border-gray-700">
            <div className="card-body">
              <h3 className="text-2xl font-bold text-white mb-4">
                Assigned Events
              </h3>
              {events.length > 0 ? (
                <ul className="space-y-4">
                  {events.map((event, index) => (
                    <li
                      key={index}
                      className="flex items-center p-3 bg-gray-700 rounded-lg shadow-md"
                    >
                      <FaTasks className="text-yellow-400 mr-3" />
                      <span className="text-white">
                        {event.name || "Event Name"}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400">No assigned events to show.</p>
              )}
            </div>
          </div>

          {/* Completed Tasks */}
          <div className="card bg-gray-800 shadow-lg border border-gray-700">
            <div className="card-body">
              <h3 className="text-2xl font-bold text-white mb-4">
                Completed Tasks
              </h3>
              {tasks.length > 0 ? (
                <ul className="space-y-4">
                  {tasks.map((task, index) => (
                    <li
                      key={index}
                      className="flex items-center p-3 bg-gray-700 rounded-lg shadow-md"
                    >
                      <FaTasks className="text-green-400 mr-3" />
                      <span className="text-white">
                        {task.name || "Task Name"}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400">No completed tasks to show.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerProfilePage;
