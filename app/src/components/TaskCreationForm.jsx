import React, { useRef ,useEffect } from "react";
import { Form, redirect, useActionData} from "react-router-dom";
import { customFetch } from "../util/customFetch";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const response = await customFetch.post("/tasks", data);
    return { success: true, data: response };
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message || "An error occurred. Please try again.";
    console.error("Error while creating task:", error);

    return { success: false, error: errorMessage };
  }
};

const TaskCreationForm = () => {
  const actionData = useActionData();

  const formRef = useRef();

useEffect(() => {
  if (actionData?.success) {
    formRef.current.reset();
    toast.success("Created task successfully");
  } else if (actionData?.error) {
    formRef.current.reset();
    toast.error(actionData?.error);
  }
}, [actionData]);


  return (
    <Form
      method="post"
      ref={formRef}
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
