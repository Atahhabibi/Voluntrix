import { useQuery } from "@tanstack/react-query";
import useUserData from "./useUserData";

export const useUserDataQuery = () => {
  return useQuery({
    queryKey: ["userData"],
    queryFn: useUserData,
    staleTime: 0,
    retry: 1
  });
};

export const getClosestPendingWithType = (tasks, events) => {
  // Helper function to check if a date is today
  const isToday = (date) => {
    const today = new Date();
    const targetDate = new Date(`${date}T00:00:00`); // Ensure consistent time zone
    return (
      today.getFullYear() === targetDate.getFullYear() &&
      today.getMonth() === targetDate.getMonth() &&
      today.getDate() === targetDate.getDate()
    );
  };

  // Filter tasks and events for pending status and due today
  const pendingTasks = tasks
    .filter((task) => {
      const result = task.status === "pending" && isToday(task.date);

      return result;
    })
    .map((task) => ({ type: "task", item: task }));

  const pendingEvents = events
    .filter((event) => {
      const result = event.status === "pending" && isToday(event.date);

      return result;
    })
    .map((event) => ({ type: "event", item: event }));

  const pendingItems = [...pendingTasks, ...pendingEvents];

  if (pendingItems.length === 0) {
    return [];
  }

  const currentDateTime = new Date();

  const closest = pendingItems.reduce((closestItem, currentItem) => {
    const currentItemDateTime = new Date(
      `${currentItem.item.date}T${currentItem.item.time}:00`
    );
    const closestItemDateTime = new Date(
      `${closestItem.item.date}T${closestItem.item.time}:00`
    );

    return Math.abs(currentItemDateTime - currentDateTime) <
      Math.abs(closestItemDateTime - currentDateTime)
      ? currentItem
      : closestItem;
  });

  return [closest];
};



export const fetchTasksAndEvents = async () => {
  try {
    // Fetch user data
    const userResponse = await customFetch("/user");
    const user = userResponse.data?.user;

    if (!user) {
      throw new Error("User not found. Please log in again.");
    }

    // Fetch time records
    const recordTimeResponse = await customFetch("/time-records");
    const timeRecordData = recordTimeResponse.data?.data || [];

    // Check if user has associated tasks or events
    if (user.tasks?.length > 0 || user.events?.length > 0) {
      const detailResponse = await customFetch.post("/tasks/IdList", {
        taskids: user.tasks,
        eventIds: user.events,
      });

      const tasks = detailResponse.data?.data?.tasks || [];
      const events = detailResponse.data?.data?.events || [];

      return {
        user,
        tasks,
        events,
        timeRecordData,
      };
    }

    // Return empty tasks/events if none are associated with the user
    return {
      user,
      tasks: [],
      events: [],
      timeRecordData,
    };
  } catch (error) {
    console.error("Error fetching tasks and events:", error);
    throw new Error(error.message || "Failed to fetch tasks and events.");
  }
};


export const parseJwt = (token) => {
  if (!token) return null;
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (error) {
    console.error("Invalid token format", error);
    return null;
  }
};


export const getTopVolunteers = (volunteers, topN = 5) => {
  // Filter out non-volunteers (e.g., admin users)
  const onlyVolunteers = volunteers.filter(
    (volunteer) => volunteer.role === "volunteer"
  );

  // Sort volunteers by totalPoints in descending order
  const sortedVolunteers = onlyVolunteers.sort(
    (a, b) => b.totalPoints - a.totalPoints
  );

  // Return the top N volunteers
  return sortedVolunteers.slice(0, topN);
};


export function calculatePointsAndHours(tasks, events, timeRecords) {
  // Sum points from tasks
  const taskPoints = tasks.reduce(
    (total, task) => total + (task.points || 0),
    0
  );

  // Sum points from events
  const eventPoints = events.reduce(
    (total, event) => total + (event.points || 0),
    0
  );

  // Calculate total points distributed
  const totalPointsDistributed = taskPoints + eventPoints;

  // Calculate total time spent in hours from timeRecords
  const totalVolunteerHours =
    timeRecords.reduce((total, record) => total + (record.timeSpent || 0), 0) /
    3600; // Convert seconds to hours

  // Return the results as an object
  return {
    totalPointsDistributed,
    totalVolunteerHours: totalVolunteerHours.toFixed(2) // Rounded to two decimals
  };
}





