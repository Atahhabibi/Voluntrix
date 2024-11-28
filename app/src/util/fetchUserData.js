export const fetchUserData = async () => {
  try {
    console.log("Fetching user data...");
    const userResponse = await customFetch("/user");
    console.log("User data response:", userResponse);

    const recordTimeResponse = await customFetch("/time-records");
    console.log("Time records response:", recordTimeResponse);

    const user = userResponse.data.user;
    if (!user) {
      throw new Error("User not found. Try logging in again.");
    }

    let tasks = [];
    let events = [];

    if (user.events?.length > 0 || user.tasks?.length > 0) {
      const detailResponse = await customFetch.post("/tasks/IdList", {
        taskids: user.tasks,
        eventIds: user.events
      });
      console.log("Detail response:", detailResponse);

      tasks = detailResponse.data.data.tasks || [];
      events = detailResponse.data.data.events || [];
    }

    return {
      user,
      tasks,
      events,
      timeRecordData: recordTimeResponse.data.data || []
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
