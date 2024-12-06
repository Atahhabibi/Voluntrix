import React, { useState,useEffect } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaMapMarkerAlt, FaInfoCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { customFetch } from "./../util/customFetch";
import { useMutation } from "@tanstack/react-query";
import { formatDate } from "../util/dataHandlingFunctions";

export const loader = async ({ params }) => {
  try {
    const response = await customFetch(`/events/${params.id}`);
    return response.data.event;
  } catch (error) {
    console.error("Failed to load event:", error);
    throw new Response("Event not found", { status: 404 });
  }
};

const EventDetailsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const event = useLoaderData();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const token = localStorage.getItem("authToken");

  const EventSignUpMuation = useMutation({
    mutationFn: async () => {
      const response = await customFetch.post(
        `/events/${event._id}/signup`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      return response.data;
    },

    onSuccess: () => {
      toast.success("Event signup succesfully");
      navigate("/events");
    },
    onError: (error) => {
      const errorMsg =
        error?.response?.data?.message ||
        "An error occurred. Please try again.";
      toast.error(errorMsg);
      return errorMsg;
    }
  });

  const handleSignup = async () => {
    setIsSubmitting(true);
    EventSignUpMuation.mutate();
  };

  return (
    <div className="p-6 bg-gray-900 text-gray-200 min-h-screen flex flex-col items-center">
      {/* Page Title */}
      <div className="w-full max-w-3xl mb-6 text-center">
        <h1 className="text-4xl font-bold text-white">Sign Up for Event</h1>
        <p className="text-gray-400 mt-2">
          Join this event and contribute to your community while earning points!
        </p>
      </div>

      {/* Event Details Section */}
      <div className="w-full max-w-3xl">
        <div className="card w-full bg-gray-800 shadow-xl border border-gray-700">
          <div className="card-body">
            <h2 className="text-3xl font-bold text-white mb-4">{event.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-400">
              <div className="flex items-center">
                <FaCalendarAlt className="text-blue-400 text-xl mr-3" />
                <span>Date: {formatDate(event.date)}</span>
              </div>
              <div className="flex items-center">
                <FaMapMarkerAlt className="text-green-400 text-xl mr-3" />
                <span>Location: {event.location}</span>
              </div>
            </div>
            <p className="text-gray-300 mt-4">{event.description}</p>
          </div>
        </div>
      </div>

      {/* Signup Confirmation Section */}
      <div className="w-full max-w-3xl mt-6">
        <div className="card w-full bg-gray-800 shadow-xl border border-gray-700">
          <div className="card-body">
            <div className="container">
              {EventSignUpMuation.error?.response?.data?.message ? (
                <h3 className="text-2xl font-semibold text-white mb-4">
                  {EventSignUpMuation.error.response.data.message}
                </h3>
              ) : (
                <h3 className="text-2xl font-semibold text-white mb-4">
                  Confirm Your Signup
                </h3>
              )}
            </div>
            <p className="text-gray-400 mb-6">
              Are you sure you want to sign up for this event? By signing up,
              you’ll actively contribute to the community and earn points for
              your valuable participation.
            </p>
            <div className="flex justify-between">
              {EventSignUpMuation.error?.response?.data?.message ? (
                <Link to="/events" className="btn btn-secondary font-semibold">
                  BACK TO EVENTS
                </Link>
              ) : (
                <div className="flex justify-between w-full">
                  <button
                    className="btn btn-secondary"
                    onClick={() => navigate(-1)}
                  >
                    Cancel
                  </button>
                  <button className="btn btn-primary" onClick={handleSignup}>
                    {isSubmitting ? "Signing Up..." : "Confirm Signup"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;
