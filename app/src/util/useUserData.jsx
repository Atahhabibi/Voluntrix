
import { customFetch } from "./customFetch";

const useUserData=async()=>{

try {
  const userResponse = await customFetch("/user");
  const recordTimeResponse = await customFetch("/time-records");


  const timeRecordData = recordTimeResponse.data.data || [];
  const user =userResponse.data.user;

  if (!user) {
    throw new Error("User not  found ,Try log in again ");
  }

  if (user) {
    if (
      (user.events && user.events.length > 0) ||
      (user.tasks && user.tasks.length > 0)
    ) {
      const detailResponse = await customFetch.post("/tasks/IdList", {
        taskids: user.tasks,
        eventIds: user.events
      });

      const tasks = detailResponse.data.data.tasks;
      const events = detailResponse.data.data.events;

      return {
        user,
        tasks,
        events,
        timeRecordData,
      };
    }
  }

  return {
    user,
    tasks: [],
    events: [],
    timeRecordData:[],
  };
} catch (error) {
  console.log(error);
  return error;
}


}


export default useUserData; 













