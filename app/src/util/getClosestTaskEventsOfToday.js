const getClosestTaskEventsOfToday = (tasks, events) => {

  // Get the current time
  const now = new Date();


  // Add type 'task' or 'event' and normalize the structure
  const allItems = [
    ...tasks.map((task) => ({ type: "task", item: task })),
    ...events.map((event) => ({ type: "event", item: event }))
  ];

  // Filter for tasks and events happening today and after the current time
  const upcomingTodayItems = allItems.filter(({ item }) => {
    const itemDate = item.date.split("T")[0];
    const itemTime = item.time; // Assuming time is in "HH:mm" or "HH:mm AM/PM" format
    const itemDateTime = new Date(`${itemDate}T${itemTime}`);

    return (
      itemDateTime.toDateString() === now.toDateString() && itemDateTime > now
    );
  });

  if (!upcomingTodayItems.length) {
    return null; // Return null if no upcoming tasks or events for today
  }

  // Find the closest item based on time
  const closestItem = upcomingTodayItems.reduce((closest, current) => {
    const closestTime = new Date(
      `${closest.item.date.split("T")[0]}T${closest.item.time}`
    ).getTime();
    const currentTime = new Date(
      `${current.item.date.split("T")[0]}T${current.item.time}`
    ).getTime();

    return currentTime < closestTime ? current : closest;
  });

  // Return an object with the type and closest item
  return closestItem;
};

export default getClosestTaskEventsOfToday;
