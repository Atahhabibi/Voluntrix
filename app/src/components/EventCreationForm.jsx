import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { customFetch } from "../util/customFetch";

const EventCreationForm = ({ eventToEdit = null, onComplete, clearEdit }) => {
  const formRef = useRef();
  const queryClient = useQueryClient();

  // React Query mutations for creating and updating events
  const createMutation = useMutation({
    mutationFn: async (newEvent) => {
      await customFetch.post("/events", newEvent);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["events"]); // Refetch events
      formRef.current.reset(); // Reset form
      toast.success("Event created successfully!");
      onComplete?.(); // Optional callback
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.message ||
        "An error occurred while creating the event.";
      toast.error(errorMessage);
    }
  });

  const updateMutation = useMutation({
    mutationFn: async (updatedEvent) => {
      await customFetch.put(`/events/${eventToEdit._id}`, updatedEvent);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["events"]); // Refetch events
      formRef.current.reset(); // Reset form
      toast.success("Event updated successfully!");
      onComplete?.(); // Optional callback
      clearEdit();
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.message ||
        "An error occurred while updating the event.";
      toast.error(errorMessage);
    }
  });

  // Populate form fields with `eventToEdit` data if editing
  useEffect(() => {
    if (eventToEdit && formRef.current) {
      const form = formRef.current;
      form.name.value = eventToEdit.name || "";
      form.date.value = eventToEdit.date || "";
      form.type.value = eventToEdit.type || "";
      form.time.value = eventToEdit.time || "";
      form.location.value = eventToEdit.location || "";
      form.description.value = eventToEdit.description || "";
    }
  }, [eventToEdit]);

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData);

    if (eventToEdit) {
      updateMutation.mutate(data); // Update existing event
    } else {
      createMutation.mutate(data); // Create new event
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="card bg-gray-800 p-8 shadow-md border border-gray-700 mb-[2rem]"
    >
      <h2 className="text-2xl text-white font-semibold mb-4">
        {eventToEdit ? "Edit Event" : "Create Event"}
      </h2>
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
        disabled={createMutation.isLoading || updateMutation.isLoading}
      >
        {createMutation.isLoading
          ? "Creating..."
          : updateMutation.isLoading
          ? "Updating..."
          : eventToEdit
          ? "Update Event"
          : "Create Event"}
      </button>
    </form>
  );
};

export default EventCreationForm;
