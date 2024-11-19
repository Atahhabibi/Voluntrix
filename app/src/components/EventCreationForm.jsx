import React, { useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { Form, useActionData } from "react-router-dom";
import { customFetch } from "../util/customFetch";

export const action = async ({ request }) => {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    const response = await customFetch.post("/events", data);

    console.log(response);

    return { success: true, data: response };
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message || "An error occurred. Please try again.";
    console.error("Error while creating events:", error);

    return { success: false, error: errorMessage };
  }
};

const EventCreationForm = () => {
  

  const actionData = useActionData();

  const formRef = useRef();

  useEffect(() => {
    if (actionData?.success) {
      formRef.current.reset();
      toast.success("Created event successfully");
    } else if (actionData?.error) {
      formRef.current.reset();
      toast.error(actionData?.error);
    }
  }, [actionData]);

  return (
    <Form
      method="post"
      ref={formRef} // Attach ref to the form
      className="card bg-gray-800 p-8 shadow-md border border-gray-700 mb-[2rem]"
    >
      <h2 className="text-2xl text-white font-semibold mb-4">Create Event</h2>
      <div className="mb-4">
        <label className="text-white">Event Name</label>
        <input
          type="text"
          name="name"
          className="input input-bordered w-full mt-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="text-white">Event Date</label>
        <input
          type="date"
          name="date"
          className="input input-bordered w-full mt-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="text-white">Event Type</label>
        <input
          type="text"
          name="type"
          className="input input-bordered w-full mt-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="text-white">Event Time</label>
        <input
          type="time"
          name="time"
          className="input input-bordered w-full mt-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="text-white">Event Location</label>
        <input
          type="text"
          name="location"
          className="input input-bordered w-full mt-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="text-white">Event Description</label>
        <textarea
          name="description"
          className="textarea textarea-bordered w-full mt-2"
          required
        />
      </div>
      <button type="submit" className="btn btn-primary w-full">
        Create Event
      </button>
    </Form>
  );
};

export default EventCreationForm;
