import React, { useState, useEffect } from "react";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaInfoCircle,
  FaTrophy
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const EventsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const events = useSelector((store) => store.events.events);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const totalPages = Math.ceil(events.length / itemsPerPage);

  const currentEvents = events.slice(
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

  return (
    <div className="min-h-screen bg-gray-900 text-base-content p-6 md:p-12">
      <div className="container mx-auto max-w-7xl">
        {/* Header Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-white tracking-widest">
            Upcoming Events
          </h1>
          <p className="text-lg text-gray-300">
            Join our upcoming events to connect with the community and make a
            difference.
          </p>
        </section>

        {/* Events Grid Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentEvents.map((event) => (
            <div
              key={event.id}
              className="bg-gray-800 shadow-lg rounded-lg p-4 border border-gray-700 flex flex-col justify-between"
              style={{ minHeight: "13rem" }} // Reduced height
            >
              <div>
                <h2 className="text-xl font-semibold mb-2 text-blue-100 flex items-center gap-2">
                  <FaInfoCircle className="text-yellow-400" /> {event.name}
                </h2>
                <div className="text-sm text-gray-400 mb-2 flex items-center gap-2">
                  <FaCalendarAlt className="text-blue-400" />
                  <span>
                    <strong>Date:</strong> {event.date}
                  </span>
                </div>
                <div className="text-sm text-gray-400 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-green-400" />
                  <span>
                    <strong>Location:</strong> {event.location}
                  </span>
                </div>
                <div className="text-sm text-gray-400 flex items-center gap-2 mt-1">
                  <FaTrophy className="text-green-400" />
                  <span>
                    <strong>Points:</strong> {event.points}
                  </span>
                </div>
              </div>
              <Link
                to={`/events/${event._id}`}
                className="btn text-black bg-green-300 w-full text-center mt-6 hover:bg-green-600 rounded-lg shadow-md hover:shadow-lg"
              >
                Learn More
              </Link>
            </div>
          ))}
        </section>

        {/* Pagination Section */}
        <div className="flex justify-center items-center space-x-4 mt-8">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded bg-gray-700 text-gray-400 hover:bg-gray-600 disabled:opacity-50"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
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
    </div>
  );
};

export default EventsPage;
