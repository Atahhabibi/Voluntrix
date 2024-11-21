import React from "react";
import { FaCalendarAlt, FaMapMarkerAlt, FaInfoCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

const EventsPage = () => {

  const events =useSelector((store)=>store.events.events); 

  return (
    <div className="min-h-screen bg-base-200 text-base-content p-6 md:p-12">
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
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-base-300 shadow-lg rounded-lg p-4 border border-gray-700 flex flex-col justify-between"
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
              </div>
              <Link
                to={`/events/${event._id}`}
                className="mt-auto btn btn-primary w-full text-center"
              >
                Learn More
              </Link>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default EventsPage;
