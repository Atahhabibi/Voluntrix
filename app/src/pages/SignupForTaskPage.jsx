import React, { useState } from "react";
import { Link, redirect, useLoaderData, useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaClock, FaUsers, FaStar } from "react-icons/fa";
import {  toast } from "react-toastify";
import { customFetch } from "../util/customFetch";
import { useMutation } from "@tanstack/react-query";

export const loader = async ({ params }) => {
  try {
    const response = await customFetch(`/tasks/${params.id}`); // Fetch task details by ID
    return response.data.task;
  } catch (error) {
    console.error("Failed to load task:", error);
    throw new Response("Task not found", { status: 404 });
  }
};

const SignupForTaskPage = () => {
  const task = useLoaderData(); // Task details loaded from the backend
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const token = localStorage.getItem("authToken");

  const signupMutation = useMutation({
    mutationFn: async () => {
      const response = await customFetch.post(
        `/tasks/${task._id}/signup`,
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
      toast.success("Successfully signed up for the task!");
      navigate("/tasks");
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
    signupMutation.mutate();
  };


  return (
    <div className="p-6 bg-gray-900 text-gray-200 min-h-screen flex flex-col items-center">
      {/* Page Title */}
      <div className="w-full max-w-3xl mb-6 text-center">
        <h1 className="text-4xl font-bold text-white">Sign Up for Task</h1>
        <p className="text-gray-400 mt-2">
          Join this task and contribute to your community while earning points!
        </p>
      </div>

      {/* Task Details Section */}
      <div className="w-full max-w-3xl">
        <div className="card w-full bg-gray-800 shadow-xl border border-gray-700">
          <div className="card-body">
            <h2 className="text-3xl font-bold text-white mb-4">{task.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-400">
              {/* Task Details */}
              <div className="flex items-center">
                <FaCalendarAlt className="text-blue-400 text-xl mr-3" />
                <span>Date: {task.date}</span>
              </div>
              <div className="flex items-center">
                <FaClock className="text-yellow-400 text-xl mr-3" />
                <span>Time: {task.time}</span>
              </div>
              <div className="flex items-center">
                <FaUsers className="text-green-400 text-xl mr-3" />
                <span>Volunteers Needed: {task.volunteers}</span>
              </div>
              <div className="flex items-center">
                <FaStar className="text-red-400 text-xl mr-3" />
                <span>Points: {task.points}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Signup Confirmation Section */}
      <div className="w-full max-w-3xl mt-6">
        <div className="card w-full bg-gray-800 shadow-xl border border-gray-700">
          <div className="card-body">
            <div className="container">
              {signupMutation.error?.response?.data?.message ? (
                <h3 className="text-2xl font-semibold text-white mb-4">
                  {signupMutation?.error?.response?.data?.message}
                </h3>
              ) : (
                <h3 className="text-2xl font-semibold text-white mb-4">
                  Confirm Your Signup
                </h3>
              )}
            </div>
            <p className="text-gray-400 mb-6">
              Are you sure you want to sign up for this task? This is a great
              opportunity to contribute and earn points for your efforts!
            </p>
            <div className="flex justify-between">
              {signupMutation?.error?.response?.data?.message ? (
                <Link to="/tasks" className="btn btn-secondary s">
                  BACK TO TASKS
                </Link>
              ) : (
                <div className="flex justify-between w-full">
                  <button
                    className="btn btn-secondary"
                    onClick={() => navigate(-1)} // Go back to the previous page
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={handleSignup}
                    disabled={isSubmitting}
                  >
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

export default SignupForTaskPage;
