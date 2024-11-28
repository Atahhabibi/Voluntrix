const getClosestPending = (tasks, events) => {
  // Filter tasks and events for pending status
  const pendingItems = [
    ...tasks.filter((task) => task.status === "pending"),
    ...events.filter((event) => event.status === "pending")
  ];

  if (pendingItems.length === 0) {
    return pendingItems;  
  }

  // Get the current date and time
  const currentDateTime = new Date();

  // Find the closest date and time
  const closest = pendingItems.reduce((closestItem, currentItem) => {
    const currentItemDateTime = new Date(
      `${currentItem.date}T${currentItem.time}`
    );
    const closestItemDateTime = new Date(
      `${closestItem.date}T${closestItem.time}`
    );

    return Math.abs(currentItemDateTime - currentDateTime) <
      Math.abs(closestItemDateTime - currentDateTime)
      ? currentItem
      : closestItem;
  });

  return [closest];
};

export default getClosestPending;
