import React, { useState,useEffect } from "react";
import {
  FaEdit,
  FaTrashAlt,
  FaCalendarAlt,
  FaClock,
  FaSearch,
  FaTag,
  FaMapMarkerAlt,
  FaArrowLeft,
  FaRegCalendarCheck,
  FaUsers
} from "react-icons/fa";
import EventCreationForm from "../components/EventCreationForm";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { customFetch } from "../util/customFetch";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import { FaTrophy } from "react-icons/fa6";
import useAppData from "../util/CustomHooks/useAppData";
import { formatDate } from "../util/dataHandlingFunctions";

const EventManagementPage = () => {
  const [nameFilter, setNameFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [eventToEdit, setEventToEdit] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
  window.scrollTo(0,0)
  }, [eventToEdit])

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useAppData();

  const events = data?.events?.data || [];

  // Mutation for deleting an event
  const deleteEventMutation = useMutation({
    mutationFn: async (eventId) => {
      await customFetch.delete(`/events/${eventId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["AppData"]);
      toast.success("Event deleted successfully!");
      setShowModal(false);
    },
    onError: () => {
      toast.error("Error deleting event.");
    }
  });

  const handleDeleteClick = (event) => {
    setEventToDelete(event);
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (eventToDelete) {
      deleteEventMutation.mutate(eventToDelete._id);
    }
  };

  const handleClearFilters = () => {
    setNameFilter("");
    setTypeFilter("");
    setDateFilter("");
    setCurrentPage(1);
  };

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

  if (isLoading) {
    return <div className="text-center text-white">Loading events...</div>;
  }
  if (isError) {
    return <div className="text-center text-white">Error....</div>;
  }

  return (
    <div className="p-6 bg-gray-900 text-gray-200 min-h-screen">
      <div className="w-full max-w-screen-xl mx-auto">
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
            eventToEdit={eventToEdit}
            clearEdit={() => setEventToEdit(null)}
          />
        </div>

        {events.length === 0 ? (
          <div className="text-xl text-center">
            There is not events available , Create one
          </div>
        ) : (
          <div>
            {/* Filter Section */}
            <div className="mb-8 p-4 rounded-lg bg-gray-800 shadow-lg">
              <h2 className="text-2xl font-semibold text-white flex items-center mb-4">
                <FaSearch className="text-yellow-400 mr-2" />
                Filter and Search Events
              </h2>
              <form className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 items-end">
                <div>
                  <label className="block text-white mb-1">
                    Search by Name
                  </label>
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
                  <label className="block text-white mb-1">
                    Filter by Type
                  </label>
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
                  <label className="block text-white mb-1">
                    Filter by Date
                  </label>
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
                <div>
                  <button
                    type="button"
                    onClick={handleClearFilters}
                    className="p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition w-full"
                  >
                    Clear Filters
                  </button>
                </div>
              </form>
            </div>

            {/* Events Section */}
            {events.length === 0 ? (
              <div className="text-center text-gray-500 text-lg">
                No events available.
              </div>
            ) : currentEvents.length === 0 ? (
              <div className="text-center text-gray-500 text-lg min-h-[800px] p-8">
                No events match your filter criteria.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 min-h-[800px] p-8">
                {currentEvents.map((event) => (
                  <div
                    key={event.id}
                    className="p-6 rounded-lg shadow-xl bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:shadow-2xl transition-shadow duration-300 flex flex-col min-h-[400px] max-h-[400px] border max-w-[400px]"
                  >
                    <h3 className="text-lg font-bold text-white mb-7 text-center">
                      {event.name}
                    </h3>
                    <div className="text-gray-400 flex items-center mb-2">
                      <FaTag className="mr-2 text-blue-400" />
                      <p>Type: {event.type}</p>
                    </div>
                    <div className="text-gray-400 flex items-center mb-2">
                      <FaCalendarAlt className="mr-2 text-yellow-400" />
                      <p>Date: {formatDate(event.date)}</p>
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

                    <div className="text-gray-400 flex items-center mb-2">
                      <FaUsers className="mr-2 text-green-400" />
                      <p>Volunteers: {event.volunteersNeeded}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mt-auto ">
                      <button
                        onClick={() => setEventToEdit(event)}
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
              </div>
            )}

            {/* Pagination */}
            {filteredEvents.length > 0 && (
              <div className="bottom-4 w-full flex justify-center space-x-4 mt-9">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 text-white"
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }).map((_, idx) => (
                  <button
                    key={idx + 1}
                    onClick={() => setCurrentPage(idx + 1)}
                    className={`px-4 py-2 rounded ${
                      currentPage === idx + 1
                        ? "bg-blue-500 text-white"
                        : "bg-gray-700 text-gray-400 hover:bg-gray-600"
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
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
            )}
          </div>
        )}

        {/* Delete Confirmation Modal */}
        <DeleteConfirmationModal
          isOpen={showModal}
          onConfirm={confirmDelete}
          onCancel={() => setShowModal(false)}
        />
      </div>
    </div>
  );
};

export default EventManagementPage;
