import React from "react";
import { FaCalendarAlt, FaMapMarkerAlt, FaInfoCircle } from "react-icons/fa";
import { useLoaderData } from "react-router-dom";
import { customFetch } from "./../util/customFetch";

export const loader = async ({ params }) => {
  try {
    const response = await customFetch(`/events/${params.id}`);
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    return {
      success: false,
      error: "Something went wrong"
    };
  }
};

const EventDetailsPage = () => {
  const data = useLoaderData();

  const event = data?.data?.event;

  if (!event) {
    return (
      <p className="text-red-500">Event not found or an error occurred.</p>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 text-base-content p-6 md:p-12">
      <div className="container mx-auto max-w-4xl bg-base-300 rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold mb-6 text-white flex items-center gap-2">
          <FaInfoCircle className="text-yellow-400" /> {event.name}
        </h1>
        <div className="text-lg text-gray-300 mb-6">
          <p className="flex items-center gap-2">
            <FaCalendarAlt className="text-blue-400" />
            <strong>Date:</strong> {event.date}
          </p>
          <p className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-green-400" />
            <strong>Location:</strong> {event.location}
          </p>
        </div>
        <p className="text-gray-300 leading-relaxed">{event.description}</p>
      </div>
    </div>
  );
};

export default EventDetailsPage;
