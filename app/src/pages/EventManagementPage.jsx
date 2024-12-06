import React, { useState, useEffect } from "react";
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
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import { FaTrophy } from "react-icons/fa6";
import useAppData from "../util/CustomHooks/useAppData";
import { formatDate } from "../util/dataHandlingFunctions";
import { PageError, PageLoading } from "../components";

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
    window.scrollTo(0, 0);
  }, [eventToEdit]);

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useAppData();

  const events = data?.events?.data || [];

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

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const currentEvents = filteredEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (isLoading) {
    return <PageLoading />;
  }
  if (isError) {
    return <PageError />;
  }

  return (
    <div className="p-4 md:p-6 bg-gray-900 text-gray-200 min-h-screen">
      <div className="max-w-4xl lg:max-w-screen-xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-4xl font-bold text-white flex items-center justify-center mb-2">
            <FaRegCalendarCheck className="text-blue-500 mr-3" />
            Event Management Portal
          </h1>
          <p className="text-sm md:text-lg text-gray-400 flex items-center justify-center">
            <FaCalendarAlt className="text-yellow-400 mr-2" />
            Plan, organize, and track events seamlessly.
          </p>
        </div>

        {/* Event Creation Section */}
        <div className="mb-6 md:mb-8">
          <EventCreationForm
            eventToEdit={eventToEdit}
            clearEdit={() => setEventToEdit(null)}
            events={events}
            isLoading={isLoading}
            isError={isError}
          />
        </div>

        {/* Filter Section */}
        <div className="mb-6 p-4 rounded-lg bg-gray-800 shadow-lg">
          <h2 className="text-lg md:text-2xl font-semibold text-white mb-4">
            Filter and Search Events
          </h2>
          <form className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 items-end">
            <div>
              <label className="block text-white mb-1">Search by Name</label>
              <input
                type="text"
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
                placeholder="e.g., Charity"
                className="w-full bg-gray-700 text-white rounded p-2"
              />
            </div>
            <div>
              <label className="block text-white mb-1">Filter by Type</label>
              <input
                type="text"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                placeholder="e.g., Community"
                className="w-full bg-gray-700 text-white rounded p-2"
              />
            </div>
            <div>
              <label className="block text-white mb-1">Filter by Date</label>
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full bg-gray-700 text-white rounded p-2"
              />
            </div>
            <button
              type="button"
              onClick={handleClearFilters}
              className="p-2 bg-red-500 text-white rounded w-full hover:bg-red-600 transition"
            >
              Clear Filters
            </button>
          </form>
        </div>

        {/* Events Section */}
        <div className="min-h-[800px]">
          {events.length === 0 ? (
            <div className="text-center text-gray-500 text-lg">
              No events available. Create one!
            </div>
          ) : currentEvents.length === 0 ? (
            <div className="text-center text-gray-500 text-lg">
              No events match your filter criteria.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentEvents.map((event) => (
                <div
                  key={event._id}
                  className="p-4 bg-gray-800 text-white rounded shadow-lg flex flex-col"
                >
                  <h3 className="text-lg font-bold mb-2">{event.name}</h3>
                  <p className="text-sm text-gray-400 mb-2">
                    <FaTag className="inline mr-1 text-blue-400" />
                    Type: {event.type}
                  </p>
                  <p className="text-sm text-gray-400 mb-2">
                    <FaCalendarAlt className="inline mr-1 text-yellow-400" />
                    Date: {formatDate(event.date)}
                  </p>
                  <p className="text-sm text-gray-400 mb-2">
                    <FaClock className="inline mr-1 text-green-400" />
                    Time: {event.time}
                  </p>
                  <p className="text-sm text-gray-400 mb-2">
                    <FaMapMarkerAlt className="inline mr-1 text-red-400" />
                    Location: {event.location}
                  </p>
                  <p className="text-sm text-gray-400">
                    <FaTrophy className="inline mr-1 text-yellow-500" />
                    Points: {event.points}
                  </p>
                  <div className="mt-4 flex justify-between">
                    <button
                      onClick={() => setEventToEdit(event)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      <FaEdit className="inline mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(event)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      <FaTrashAlt className="inline mr-1" />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8 space-x-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx + 1)}
              className={`px-3 py-1 rounded ${
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
            className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={showModal}
        onConfirm={confirmDelete}
        onCancel={() => setShowModal(false)}
      />
    </div>
  );
};

export default EventManagementPage;
