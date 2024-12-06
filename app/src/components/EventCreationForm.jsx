import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { customFetch } from "../util/customFetch";
import { FaPlusCircle, FaEdit } from "react-icons/fa";
import EventFormTable from "./EventFormTable"; // Import the table component
import PageLoading from "./PageLoading";
import PageError from "./PageError";

const EventCreationForm = ({ eventToEdit = null, onComplete, clearEdit,events,isLoading,isError }) => {
  const formRef = useRef();
  const queryClient = useQueryClient();


  // React Query mutations for creating and updating events
  const createMutation = useMutation({
    mutationFn: async (newEvent) => {
      await customFetch.post("/events", newEvent);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["AppData"]); // Refetch events
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
      form.points.value = eventToEdit.points || 0;
      form.volunteersNeeded.value = eventToEdit.volunteersNeeded || 0;
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

  const handleEdit = (event) => {
    clearEdit();
    onComplete(event);
  };

  const handleDelete = async (event) => {
    try {
      await customFetch.delete(`/events/${event._id}`);
      queryClient.invalidateQueries(["AppData"]);
      toast.success("Event deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete the event.");
    }
  };

  if (isLoading) {
    return <PageLoading />;
  }
  if (isError) {
    return <PageError />;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 sm:p-8 shadow-md border border-gray-700 rounded-lg w-full"
      >
        <div className="text-center mb-6">
          {eventToEdit ? (
            <div className="flex flex-col items-center">
              <FaEdit className="text-blue-500 text-3xl sm:text-4xl mb-2 hidden sm:block" />
              <h2 className="text-lg sm:text-2xl text-white font-semibold">
                Edit Event
              </h2>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <FaPlusCircle className="text-green-500 text-3xl sm:text-4xl mb-2 hidden sm:block" />
              <h2 className="text-lg sm:text-2xl text-white font-semibold">
                Create Event
              </h2>
            </div>
          )}
        </div>

        <input type="hidden" name="id" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
          <div className="col-span-2">
            <label className="text-white text-sm sm:text-base block mb-1 sm:mb-2">
              Event Name
            </label>
            <input
              type="text"
              name="name"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label className="text-white text-sm sm:text-base block mb-1 sm:mb-2">
              Date
            </label>
            <input
              type="date"
              name="date"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label className="text-white text-sm sm:text-base block mb-1 sm:mb-2">
              Type
            </label>
            <input
              type="text"
              name="type"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="col-span-2 lg:col-span-1">
            <label className="text-white text-sm sm:text-base block mb-1 sm:mb-2">
              Time
            </label>
            <input
              type="time"
              name="time"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="text-white text-sm sm:text-base block mb-1 sm:mb-2">
              Points
            </label>
            <input
              type="number"
              name="points"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="text-white text-sm sm:text-base block mb-1 sm:mb-2">
              Volunteers Needed
            </label>
            <input
              type="number"
              name="volunteersNeeded"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="col-span-2">
            <label className="text-white text-sm sm:text-base block mb-1 sm:mb-2">
              Location
            </label>
            <input
              type="text"
              name="location"
              className="input input-bordered w-full"
              required
            />
          </div>
        </div>
        <div className="mb-4 sm:mb-6">
          <label className="text-white text-sm sm:text-base block mb-1 sm:mb-2">
            Description
          </label>
          <textarea
            name="description"
            className="textarea textarea-bordered w-full"
            rows="3"
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

      {/* Event Records Table */}
      <EventFormTable
        events={events}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default EventCreationForm;
