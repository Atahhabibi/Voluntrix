import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import moment from "moment";

const TaskReminder = ({ pendingTask }) => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Ensure the array is not empty and extract the first task
    if (!pendingTask || !pendingTask.length) {
      return;
    }

    const task = pendingTask[0]; // Get the first task from the array

    if (!task.name || !task.date || !task.time) {
      return;
    }

    // Parse and validate date and time
    const eventDateTime = moment(
      `${task.date} ${task.time}`,
      "YYYY-MM-DD HH:mm",
      true // Strict validation
    );

    if (!eventDateTime.isValid()) {
      return;
    }

    const hasShown = localStorage.getItem("reminderShown");

    // Format the date and time
    const formattedDate = eventDateTime.format("dddd, MMMM Do YYYY");
    const formattedTime = eventDateTime.format("h:mm A");

    // Generate reminder message
    const newMessage = `Reminder: You are scheduled for "${task.name}" on ${formattedDate} at ${formattedTime}`;
    setMessage(newMessage);

    // Show toast notification if it hasn't been shown
    if (hasShown !== "true") {
      localStorage.setItem("reminderShown", "true");
      toast.warn(newMessage);
    }
  }, [pendingTask]);

  return <>{message ? <p>{message}</p> : <p>Loading your reminder...</p>}</>;
};

export default TaskReminder;
