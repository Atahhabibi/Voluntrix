const categorizeTasksAndEvents = (tasks, events) => {
  // Helper function to categorize based on the first volunteerAssigned status
  const categorizeItem = (item) => {
    if (!item.volunteersAssigned.length) {
      return { ...item, status: "not_sign_up" };
    }
    const userStatus = item.volunteersAssigned[0]?.status || "not_sign_up";
    return { ...item, status: userStatus };
  };

  // Categorize tasks and events
  const tasksWithStatus = tasks.map(categorizeItem);
  const eventsWithStatus = events.map(categorizeItem);

  // Filter for completed, pending (signedUp), and not signed up
  const completedTasks = tasksWithStatus.filter(
    (item) => item.status === "completed"
  );
  const completedEvents = eventsWithStatus.filter(
    (item) => item.status === "completed"
  );

  const pendingTasks = tasksWithStatus.filter(
    (item) => item.status === "signedUp"
  );
  const pendingEvents = eventsWithStatus.filter(
    (item) => item.status === "signedUp"
  );

  const notSignedUpTasks = tasksWithStatus.filter(
    (item) => item.status === "not_sign_up"
  );
  const notSignedUpEvents = eventsWithStatus.filter(
    (item) => item.status === "not_sign_up"
  );

  return {
    completedTasks,
    completedEvents,
    pendingTasks,
    pendingEvents,
    notSignedUpTasks,
    notSignedUpEvents
  };
};

export default categorizeTasksAndEvents;
