
import { customFetch } from "./customFetch";

const useUserData=async()=>{

const token = localStorage.getItem("authToken");

if (!token) {
  throw new Error("No token found,please log in again");
}

try {
  const resposne = await customFetch("/user", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const user = resposne.data.user;

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
        events
      };
    }
  }

  return {
    user,
    tasks: [],
    events: []
  };
} catch (error) {
  console.log(error);
  return error;
}


}


export default useUserData; 













