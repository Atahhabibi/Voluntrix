import { useQuery } from "@tanstack/react-query";
import { customFetch } from "../customFetch";

const useAppData = () => {
  return useQuery({
    queryKey: ["AppData"],
    queryFn: async () => {
      try {
        // Fetch data in parallel using Promise.all
        const [
          UsersResponse,
          TasksResponse,
          EventResponse,
          TimeRecordsResponse,
          adminResponse
        ] = await Promise.all([
          customFetch("/admin-volunteers"),
          customFetch("/admin-tasks"),
          customFetch("/admin-events"),
          customFetch("/admin-time-records"),
          customFetch('/admin') 
        ]);

        return {
          tasks: TasksResponse?.data || [],
          events: EventResponse?.data || [],
          users: UsersResponse?.data || [],
          volunteerTimeRecords: TimeRecordsResponse?.data || [],
          admin:adminResponse?.data ||{}
        };
      } catch (error) {
        console.error("Error fetching app data:", error);
        throw new Error("Failed to fetch app data");
      }
    }
  });
};

export default useAppData;
