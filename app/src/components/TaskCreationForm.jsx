import React from "react";
import { Form, redirect } from "react-router-dom";
import { customFetch } from "../util/customFetch";
import { toast } from "react-toastify";

export const action = async ({ request }) => {

  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    console.log("Form data from action:", data);

    const response = await customFetch.post("/tasks", data);
    console.log("Server response:", response);

    // Show success notification
    toast.success("Task created successfully!");
    return redirect("/adminDashboard/task-management"); 

  } catch (error) {
    // Handle and log the error
    const errorMessage =
      error?.response?.data?.message || "An error occurred. Please try again.";
    console.error("Error while creating task:", error);

    // Show error notification
    toast.error(errorMessage);

    return null; // Return null to indicate failure (no redirection)
  }

};

const TaskCreationForm = () => {
  return (
    <Form
      method="post"
      className="card bg-gray-800 p-8 shadow-md border border-gray-700 mb-[2rem]"
    >
      <h2 className="text-2xl text-white font-semibold mb-4">Create Task</h2>
      <div className="mb-4">
        <label className="text-white">Task Title</label>
        <input
          type="text"
          className="input input-bordered w-full mt-2"
          name="name"
          required
        />
      </div>
      <div className="mb-4">
        <label className="text-white">Date</label>
        <input
          type="date"
          className="input input-bordered w-full mt-2"
          name="date"
          required
        />
      </div>
      <div className="mb-4">
        <label className="text-white">Time</label>
        <input
          type="time"
          name="time"
          className="input input-bordered w-full mt-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="text-white">Volunteers Needed</label>
        <input
          type="number"
          name="volunteers"
          className="input input-bordered w-full mt-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="text-white">Points</label>
        <input
          type="number"
          name="points"
          className="input input-bordered w-full mt-2"
          required
        />
      </div>
      <button type="submit" className="btn btn-primary w-full">
        Create Task
      </button>
    </Form>
  );
};

export default TaskCreationForm;
