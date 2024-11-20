import React, { useRef } from "react";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { customFetch } from "../util/customFetch";

const EventCreationForm = () => {
  const formRef = useRef();
  const queryClient = useQueryClient();

  // React Query mutation to handle event creation
  const mutation = useMutation({
    mutationFn: async (newEvent) => {
      await customFetch.post("/events", newEvent);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["events"]); // Refetch events on success
      formRef.current.reset(); // Reset form
      toast.success("Created event successfully!");
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.message ||
        "An error occurred. Please try again.";
      toast.error(errorMessage);
    }
  });

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData);

    // Trigger the mutation
    mutation.mutate(data);
  };

  return (
    <form
      ref={formRef} // Attach ref to the form
      onSubmit={handleSubmit}
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
      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={mutation.isLoading}
      >
        {mutation.isLoading ? "Creating..." : "Create Event"}
      </button>
    </form>
  );
};

export default EventCreationForm;
