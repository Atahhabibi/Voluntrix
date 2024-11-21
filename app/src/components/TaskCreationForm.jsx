import React, { useRef, useEffect } from "react";
import { customFetch } from "../util/customFetch";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const TaskCreationForm = ({ taskToEdit, clearEditTask }) => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async (data) => {
      const response = await customFetch.post("/tasks", data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Task created successfully ");
      queryClient.invalidateQueries(["Tasks"]);
      
    },
    onError: () => {
      toast.error("There is some error in Creating ");
    }
  });


  const updateMutation = useMutation({
    mutationFn: async (data) => {
      const response = await customFetch.put(`/tasks/${data.id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["Tasks"]);
      toast.success("Task udpated successfully ");
      clearEditTask(); 
    },
    onError: () => {
      toast.error("There is some error in Updating ");
    }
  });

  const formRef = useRef();

  useEffect(() => {
    const form = formRef.current;

    if (taskToEdit && form) {
      form.name.value = taskToEdit.name || "";
      form.date.value = taskToEdit.date || "";
      form.time.value = taskToEdit.time || "";
      form.volunteers.value = taskToEdit.volunteers || 0;
      form.points.value = taskToEdit.points || 0;
      form.id.value = taskToEdit._id || ""; // Hidden field for the task ID
    }
  }, [taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    let formData = new FormData(form);
    formData = Object.fromEntries(formData);

    if (taskToEdit) {
      updateMutation.mutate(formData);
      formRef.current.reset();
    } else {
      createMutation.mutate(formData);
      formRef.current.reset();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      ref={formRef}
      className="card bg-gray-800 p-8 shadow-md border border-gray-700 mb-[2rem]"
    >
      <h2 className="text-2xl text-white font-semibold mb-4">
        {taskToEdit ? "Edit Task" : "Create Task"}
      </h2>
      <input type="hidden" name="id" />
      <div className="mb-4">
        <label className="text-white">Task Title</label>
        <input
          type="text"
          className="input input-bordered w-full mt-2"
          name="name"
          required
        />
      </div>
      <div className="mb-4">
        <label className="text-white">Date</label>
        <input
          type="date"
          className="input input-bordered w-full mt-2"
          name="date"
          required
        />
      </div>
      <div className="mb-4">
        <label className="text-white">Time</label>
        <input
          type="time"
          name="time"
          className="input input-bordered w-full mt-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="text-white">Volunteers Needed</label>
        <input
          type="number"
          name="volunteers"
          className="input input-bordered w-full mt-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="text-white">Points</label>
        <input
          type="number"
          name="points"
          className="input input-bordered w-full mt-2"
          required
        />
      </div>
      <button type="submit" className="btn btn-primary w-full">
        {createMutation.isLoading
          ? "Creating..."
          : updateMutation.isLoading
          ? "Updating..."
          : taskToEdit
          ? "Update Task"
          : "Create Task"}
      </button>
    </form>
  );
};

export default TaskCreationForm;
