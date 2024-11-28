import React, { useState } from "react";
import {
  FaEdit,
  FaTrashAlt,
  FaCalendarAlt,
  FaClock,
  FaSearch,
  FaTag,
  FaMapMarkerAlt,
  FaArrowLeft,
  FaRegCalendarCheck
} from "react-icons/fa";
import EventCreationForm from "../components/EventCreationForm";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { customFetch } from "../util/customFetch";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FaTrophy } from "react-icons/fa6";

const EventManagementPage = () => {
  const [nameFilter, setNameFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [eventToEdit, setEventToEdit] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const queryClient = useQueryClient();

  // Fetch events
  const { data: events = [], isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const response = await customFetch.get("/events");
      return response.data.events;
    }
  });

  console.log(events);

  // Mutation for creating an event
  const createEventMutation = useMutation({
    mutationFn: async (newEvent) => {
      await customFetch.post("/events", newEvent);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["events"]);
      toast.success("Event created successfully!");
    }
  });

  // Filter events
  const filteredEvents = events.filter((event) => {
    return (
      (nameFilter
        ? event.name.toLowerCase().includes(nameFilter.toLowerCase())
        : true) &&
      (typeFilter
        ? event.type.toLowerCase().includes(typeFilter.toLowerCase())
        : true) &&
      (dateFilter ? event.date === dateFilter : true)
    );
  });

  // Pagination
  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const currentEvents = filteredEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDeleteClick = (event) => {
    setEventToDelete(event);
    setShowModal(true);
  };

  const handleEditClick = (event) => {
    setEventToEdit(event);
  };

  const clearEdit = () => {
    setEventToEdit(null);
  };

  const confirmDelete = async () => {
    try {
      await customFetch.delete(`/events/${eventToDelete._id}`);
      queryClient.invalidateQueries(["events"]);
      toast.success("Event deleted successfully!");
      setShowModal(false);
      setEventToDelete(null);
    } catch (error) {
      toast.error("Error deleting event.");
      console.error("Error deleting event: ", error);
    }
  };

  if (isLoading) {
    return <div className="text-center text-white">Loading events...</div>;
  }

  return (
    <div className="p-6 bg-gray-900 text-gray-200 min-h-screen">
      <div className="w-full max-w-screen-xl mx-auto">
        <div className="flex justify-start mb-4">
          <Link
            to="/adminDashboard"
            className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white shadow-md"
          >
            <FaArrowLeft className="mr-2" />
            Back to Dashboard
          </Link>
        </div>
        {/* Page Header */}

        {/* Header Section */}
        <div className="w-full max-w-screen-xl mx-auto text-center mb-8">
          <h1 className="text-4xl font-bold text-white flex items-center justify-center mb-2">
            <FaRegCalendarCheck className="text-blue-500 mr-3" />
            Event Management Portal
          </h1>
          <p className="text-lg text-gray-400 flex items-center justify-center">
            <FaCalendarAlt className="text-yellow-400 mr-2" />
            Plan, organize, and track events seamlessly.
          </p>
        </div>

        {/* Event Creation Section */}
        <div className="mb-8">
          <EventCreationForm
            onSubmit={(newEvent) => createEventMutation.mutate(newEvent)}
            eventToEdit={eventToEdit}
            clearEdit={clearEdit}
          />
        </div>

        {/* Filter Section */}
        <div className="mb-8 p-4 rounded-lg bg-gray-800 shadow-lg">
          <h2 className="text-2xl font-semibold text-white flex items-center mb-4">
            <FaSearch className="text-yellow-400 mr-2" />
            Filter and Search Events
          </h2>
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

        {/* Events Section */}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 min-h-[800px]  p-8">
          {currentEvents.map((event) => (
            <div
              key={event.id}
              className="p-6 rounded-lg shadow-xl bg-gradient-to-br from-gray-800 to-gray-900  border-gray-700 hover:shadow-2xl transition-shadow duration-300 flex flex-col min-h-[400px] max-h-[400px] border max-w-[400px]"
            >
              {/* Event Name */}
              <h3 className="text-lg font-bold text-white mb-7 text-center">
                {event.name}
              </h3>

              {/* Event Details */}
              <div className="text-gray-400 flex items-center mb-2">
                <FaTag className="mr-2 text-blue-400" />
                <p>Type: {event.type}</p>
              </div>
              <div className="text-gray-400 flex items-center mb-2">
                <FaCalendarAlt className="mr-2 text-yellow-400" />
                <p>Date: {event.date}</p>
              </div>
              <div className="text-gray-400 flex items-center mb-2">
                <FaClock className="mr-2 text-green-400" />
                <p>Time: {event.time}</p>
              </div>
              <div className="text-gray-400 flex items-center mb-2">
                <FaMapMarkerAlt className="mr-2 text-red-400" />
                <p>Location: {event.location}</p>
              </div>
              <div className="text-gray-400 flex items-center mb-2">
                <FaTrophy className="mr-2 text-yellow-500" />
                <p>Points: {event.points}</p>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 mt-auto ">
                <button
                  onClick={() => handleEditClick(event)}
                  className="p-2 bg-yellow-500 rounded text-white flex items-center justify-center hover:bg-yellow-600 transition-colors"
                >
                  <FaEdit className="mr-1" /> Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(event)}
                  className="p-2 bg-red-600 rounded text-white flex items-center justify-center hover:bg-red-700 transition-colors"
                >
                  <FaTrashAlt className="mr-1" /> Delete
                </button>
              </div>
            </div>
          ))}

          {/* If no events, show a placeholder */}
          {currentEvents.length === 0 && (
            <div className="col-span-full text-center text-gray-500">
              No events available.
            </div>
          )}
        </div>
        {/* Pagination */}
        <div className="bottom-4 w-full flex justify-center space-x-4 mt-9">
          {/* Previous Button */}
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 text-white"
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {/* Pagination Buttons */}
          {totalPages > 3 && currentPage > 2 && (
            <button
              onClick={() => setCurrentPage(1)}
              className="px-4 py-2 rounded bg-gray-700 text-gray-400 hover:bg-gray-600"
            >
              1
            </button>
          )}
          {totalPages > 3 && currentPage > 2 && (
            <span className="px-2 text-gray-400">...</span>
          )}
          {Array.from({ length: totalPages })
            .map((_, idx) => idx + 1)
            .filter(
              (page) => totalPages <= 4 || Math.abs(page - currentPage) <= 2
            )
            .map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded ${
                  page === currentPage
                    ? "bg-blue-500 text-white"
                    : "bg-gray-700 text-gray-400 hover:bg-gray-600"
                }`}
              >
                {page}
              </button>
            ))}
          {totalPages > 3 && currentPage < totalPages - 1 && (
            <span className="px-2 text-gray-400">...</span>
          )}
          {totalPages > 3 && currentPage < totalPages - 1 && (
            <button
              onClick={() => setCurrentPage(totalPages)}
              className="px-4 py-2 rounded bg-gray-700 text-gray-400 hover:bg-gray-600"
            >
              {totalPages}
            </button>
          )}

          {/* Next Button */}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 text-white"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
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
