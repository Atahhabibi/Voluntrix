import React, { useState } from "react";
import { FaEdit, FaTrashAlt, FaCalendarAlt, FaClock, FaSearch, FaTag } from "react-icons/fa";
import { events } from "../eventData";
import EventCreationForm from "../components/EventCreationForm";

const EventManagementPage = () => {
  const [nameFilter, setNameFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filtered events based on the selected filters
  const filteredEvents = events.filter((event) => {
    return (
      (nameFilter ? event.name.toLowerCase().includes(nameFilter.toLowerCase()) : true) &&
      (typeFilter ? event.type.toLowerCase().includes(typeFilter.toLowerCase()) : true) &&
      (dateFilter ? event.date === dateFilter : true)
    );
  });

  // Calculate total pages
  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);

  // Get current page items
  const currentEvents = filteredEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle previous and next buttons
  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

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

        <EventCreationForm />

        {/* Filter Section */}
        <div className="mb-6 p-4 rounded-lg bg-gray-800 shadow-lg">
          <h3 className="text-xl font-semibold text-white mb-4">
            Filter Events
          </h3>
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

        {/* Events Container with Pagination at Bottom */}
        <div className="flex flex-col justify-between h-[700px]">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-6">
            {Array.from({ length: itemsPerPage }, (_, index) => {
              const event = currentEvents[index];
              return (
                <div
                  key={index}
                  className={`p-4 rounded-lg shadow-lg ${
                    event ? "bg-gray-800" : "bg-transparent"
                  }`}
                >
                  {event ? (
                    <div className="flex flex-col space-y-2">
                      <h3 className="text-2xl font-semibold text-white mb-2">
                        {event.name}
                      </h3>
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
                  ) : (
                    <div className="invisible">Placeholder</div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center space-x-4 mt-6">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded bg-gray-700 text-gray-400 hover:bg-gray-600 disabled:opacity-50"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 rounded ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-700 text-gray-400"
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded bg-gray-700 text-gray-400 hover:bg-gray-600 disabled:opacity-50"
            >
              Next
            </button>
          </div>
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
