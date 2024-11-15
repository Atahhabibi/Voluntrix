import React, { useState } from "react";
import { FaEdit, FaTrashAlt, FaCalendarAlt, FaClock, FaSearch, FaTag } from "react-icons/fa";

import { events } from "../eventData";
const EventManagementPage = () => {
  const [nameFilter, setNameFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

  const filteredEvents = events.filter((event) => {
    return (
      (nameFilter ? event.name.toLowerCase().includes(nameFilter.toLowerCase()) : true) &&
      (typeFilter ? event.type.toLowerCase().includes(typeFilter.toLowerCase()) : true) &&
      (dateFilter ? event.date === dateFilter : true)
    );
  });

  const handleDeleteClick = (event) => {
    setEventToDelete(event);
    setShowModal(true);
  };

  const confirmDelete = () => {
    // Add delete logic here
    setShowModal(false);
    setEventToDelete(null);
  };

  return (
    <div className="p-6 bg-gray-900 text-gray-200 min-h-screen">
      <div className="w-full max-w-screen-xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-6">Event Management</h2>

        {/* Filter Section */}
        <div className="mb-6 p-4 rounded-lg bg-gray-800 shadow-lg">
          <h3 className="text-xl font-semibold text-white mb-4">Filter Events</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label className="block text-white mb-1">Search by Name</label>
              <div className="flex items-center bg-gray-700 rounded p-2">
                <FaSearch className="text-gray-400 mr-2" />
                <input
                  type="text"
                  value={nameFilter}
                  onChange={(e) => setNameFilter(e.target.value)}
                  placeholder="e.g., Charity"
                  className="w-full bg-transparent text-white outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-white mb-1">Filter by Type</label>
              <div className="flex items-center bg-gray-700 rounded p-2">
                <FaTag className="text-gray-400 mr-2" />
                <input
                  type="text"
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  placeholder="e.g., Community"
                  className="w-full bg-transparent text-white outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-white mb-1">Filter by Date</label>
              <div className="flex items-center bg-gray-700 rounded p-2">
                <FaCalendarAlt className="text-gray-400 mr-2" />
                <input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="w-full bg-transparent text-white outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Event Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event) => (
            <div key={event.id} className="p-4 rounded-lg bg-gray-800 shadow-lg">
              <div className="flex flex-col space-y-2">
                <h3 className="text-2xl font-semibold text-white mb-2">{event.name}</h3>
                <div className="text-gray-400 flex items-center space-x-2">
                  <FaTag />
                  <p>Type: {event.type}</p>
                </div>
                <div className="text-gray-400 flex items-center space-x-2">
                  <FaCalendarAlt />
                  <p>Date: {event.date}</p>
                </div>
                <div className="text-gray-400 flex items-center space-x-2">
                  <FaClock />
                  <p>Time: {event.time}</p>
                </div>

                <div className="flex justify-end space-x-3 mt-4">
                  <button
                    onClick={() => alert("Edit functionality here")}
                    className="p-2 bg-yellow-500 rounded text-white flex items-center"
                  >
                    <FaEdit className="mr-1" /> Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(event)}
                    className="p-2 bg-red-600 rounded text-white flex items-center"
                  >
                    <FaTrashAlt className="mr-1" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Delete Confirmation Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
            <div className="bg-gray-900 p-6 rounded shadow-lg text-center">
              <h3 className="text-2xl text-white mb-4">Confirm Deletion</h3>
              <p className="text-gray-400 mb-6">
                Are you sure you want to delete "{eventToDelete?.name}"?
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 rounded text-white"
                >
                  Delete
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-600 rounded text-white"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventManagementPage;
