import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import moment from "moment";

const TaskReminder = ({ pendingTask }) => {
  const [message, setMessage] = useState("");

  if (!pendingTask) {
    return;
  }

  useEffect(() => {
    if (!pendingTask || !pendingTask.item) {
      console.warn("No valid pendingTask data provided:", pendingTask);
      setMessage("No task or event scheduled.");
      return;
    }

    const { type, item } = pendingTask;

    // Validate required fields
    if (!item.name || !item.date || !item.time) {
      console.warn("Missing required fields in task or event:", item);
      setMessage("Invalid task or event data.");
      return;
    }

    // Parse date and time
    const itemDate = item.date.split("T")[0];
    const eventDateTime = moment(
      `${itemDate} ${item.time}`,
      "YYYY-MM-DD HH:mm"
    );

    if (!eventDateTime.isValid()) {
      console.warn("Invalid date or time format:", item.date, item.time);
      setMessage("Invalid date or time format.");
      return;
    }

    // Check if the event is in the future
    const now = moment();
    if (eventDateTime.isBefore(now)) {
      console.warn(
        "The task or event has already passed:",
        eventDateTime.toString()
      );
      setMessage("This task or event has already passed.");
      return;
    }

    // Generate reminder message
    const formattedDate = eventDateTime.format("dddd, MMMM Do YYYY");
    const formattedTime = eventDateTime.format("h:mm A");
    const newMessage = `Reminder: You are scheduled for a "${type}" named "${item.name}" on ${formattedDate} at ${formattedTime}.`;

    setMessage(newMessage);

    // Show the reminder toast
    const reminderKey = `reminderShown_${item._id}`;
    const hasShown = localStorage.getItem(reminderKey);
    if (!hasShown) {
      localStorage.setItem(reminderKey, "true");
      toast.warn(newMessage);
    }
  }, [pendingTask]);

  return <>{message ? <>{message}</> : <>Loading reminder...</>}</>;
};

export default TaskReminder;
