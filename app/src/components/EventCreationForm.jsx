// EventCreationForm.jsx
import React, { useState } from "react";
import { toast } from "react-toastify";
import { customFetch } from "../util/customFetch"; // Assuming you have this utility function

const EventCreationForm = () => {
  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventDescription, setEventDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await customFetch.post("/events", {
        title: eventTitle,
        date: eventDate,
        time: eventTime,
        description: eventDescription
      });
      toast.success("Event created successfully!");
      // Optionally, reset the form after submission
      setEventTitle("");
      setEventDate("");
      setEventTime("");
      setEventDescription("");
    } catch (error) {
      toast.error("Error creating event. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card bg-gray-800 p-8 shadow-md border border-gray-700 mb-[2rem]"
    >
      <h2 className="text-2xl text-white font-semibold mb-4">Create Event</h2>
      <div className="mb-4">
        <label className="text-white">Event Title</label>
        <input
          type="text"
          className="input input-bordered w-full mt-2"
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="text-white">Event Date</label>
        <input
          type="date"
          className="input input-bordered w-full mt-2"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="text-white">Event Time</label>
        <input
          type="time"
          className="input input-bordered w-full mt-2"
          value={eventTime}
          onChange={(e) => setEventTime(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="text-white">Event Description</label>
        <textarea
          className="textarea textarea-bordered w-full mt-2"
          value={eventDescription}
          onChange={(e) => setEventDescription(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary w-full">
        Create Event
      </button>
    </form>
  );
};

export default EventCreationForm;
