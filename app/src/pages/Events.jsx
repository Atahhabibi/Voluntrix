import React, { useState, useEffect } from "react";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaInfoCircle,
  FaTrophy
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { formatDate, getToken } from "../util/dataHandlingFunctions";
import { PageError, PageLoading } from "../components";
import { useQuery } from "@tanstack/react-query";
import { fetchEventsTasksForAll } from "../util/dataHandlingFunctions";

const EventsPage = () => {
  const token = getToken();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data, isError, isLoading } = useQuery({
    queryKey: ["taskEventForAll"],
    queryFn: fetchEventsTasksForAll
  });

  const events = data?.data?.events || [];

  const [filter, setFilter] = useState({
    name: "",
    date: "",
    minPoints: 0
  });

  const [filteredEvents, setFilteredEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const applyFilters = () => {
      const filtered = events.filter((event) => {
        return (
          (!filter.name ||
            event.name.toLowerCase().includes(filter.name.toLowerCase())) &&
          (!filter.date || event.date === filter.date) &&
          (!filter.minPoints || event.points >= filter.minPoints)
        );
      });
      setFilteredEvents(filtered);
    };

    applyFilters();
  }, [filter, events]);

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const currentEvents = filteredEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  if (isLoading) {
    return <PageLoading />;
  }

  if (isError) {
    return <PageError />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-base-content p-6 md:p-12">
      <div className="container mx-auto max-w-5xl">
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

        {/* Filter Section */}
        <section className="mb-8 bg-gray-800 p-4 rounded-lg shadow-lg">
          <div className="flex flex-col md:flex-row w-full gap-4 items-end">
            <div className="flex-1">
              <label className="text-white mb-2 font-bold flex items-center gap-2">
                <FaInfoCircle /> Event Name
              </label>
              <input
                type="text"
                className="input input-bordered w-full bg-base-100"
                placeholder="Search by event name"
                value={filter.name}
                onChange={(e) => setFilter({ ...filter, name: e.target.value })}
              />
            </div>
            <div className="flex-1">
              <label className="text-white mb-2 font-bold flex items-center gap-2">
                <FaCalendarAlt /> Date
              </label>
              <input
                type="date"
                className="input input-bordered w-full bg-base-100"
                value={filter.date}
                onChange={(e) => setFilter({ ...filter, date: e.target.value })}
              />
            </div>
            <div className="flex-1">
              <label className="text-white mb-2 font-bold flex items-center gap-2">
                <FaTrophy /> Min Points
              </label>
              <input
                type="number"
                className="input input-bordered w-full bg-base-100"
                placeholder="Min Points"
                value={filter.minPoints}
                onChange={(e) =>
                  setFilter({ ...filter, minPoints: Number(e.target.value) })
                }
              />
            </div>
            <button
              onClick={() => setFilter({ name: "", date: "", minPoints: 0 })}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md transition"
            >
              Clear Filters
            </button>
          </div>
        </section>

        {/* Events Grid Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[600px] py-8">
          {currentEvents.length > 0 ? (
            currentEvents.map((event) => (
              <div
                key={event._id}
                className="bg-gray-800 shadow-lg rounded-lg p-4 border border-gray-700 flex flex-col"
                style={{ height: "16rem" }} // Fixed height for cards
              >
                <div className="flex-1">
                  <h2 className="text-xl font-semibold mb-2 text-blue-100 flex items-center gap-2">
                    <FaInfoCircle className="text-yellow-400" /> {event.name}
                  </h2>
                  <div className="text-sm text-gray-400 mb-2 flex items-center gap-2">
                    <FaCalendarAlt className="text-blue-400" />
                    <span>
                      <strong>Date:</strong> {formatDate(event.date)}
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
                <div className="mt-4">
                  <Link
                    to={token ? `/events/${event._id}` : "/login"}
                    className={`btn w-full text-center mt-auto rounded-lg shadow-md hover:shadow-lg ${
                      token
                        ? "bg-green-300 hover:bg-green-600 text-black"
                        : "bg-yellow-400 hover:bg-yellow-500 text-black"
                    }`}
                  >
                    {token ? "Learn More" : "Log in to Learn More"}
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-400 col-span-full">
              <p>
                No events are available at the moment. Please check back later!
              </p>
            </div>
          )}
        </section>
      </div>
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
  );
};

export default EventsPage;
