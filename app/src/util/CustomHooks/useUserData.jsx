import { useQuery } from "@tanstack/react-query";
import { customFetch } from "../customFetch";
import { useParams } from "react-router-dom";

const useUserData = () => {
  const { id } = useParams(); // Extract `id` from URL parameters

  return useQuery({
    queryKey: id ? ["UserData", id] : ["UserData"], // Include `id` in queryKey for caching
    queryFn: async () => {
      try {
        if (id) {
          // Fetch data for the specific volunteer by ID
          const volunteerResponse = await customFetch(`/volunteer/${id}`);
          const { volunteer, tasks, events, timeRecords } =
            volunteerResponse.data.data;

          return {
            volunteer: volunteer || null,
            tasks: tasks || [],
            events: events || [],
            timeRecords: timeRecords || []
          };
        } else {
          // Fetch general data
          const [
            userResponse,
            tasksResponse,
            eventsResponse,
            timeRecordResponse
          ] = await Promise.all([
            customFetch("/user"),
            customFetch("/tasks"),
            customFetch("/events"),
            customFetch("/time-records")
          ]);

          return {
            user: userResponse?.data || [],
            tasks: tasksResponse?.data || [],
            events: eventsResponse?.data || [],
            timeRecords: timeRecordResponse?.data || []
          };
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        throw new Error("Failed to fetch user data");
      }
    },
    enabled: !!id || !id // Ensures the query runs whether `id` is present or not
  });
};

export default useUserData;
