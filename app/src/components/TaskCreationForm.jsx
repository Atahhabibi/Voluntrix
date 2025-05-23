import React, { useRef, useEffect, useState } from "react";
import { customFetch } from "../util/customFetch";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import TaskTable from "./TaskFormTable";


// TaskCreationForm Component
const TaskCreationForm = ({ taskToEdit, clearEditTask,tasks,setTaskToEdit }) => {

  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async (data) => {
      const response = await customFetch.post("/tasks", data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Task created successfully!");
      queryClient.invalidateQueries(["AppData"]);
     
    },
    onError: () => {
      toast.error("There was an error creating the task.");
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (taskId) => {
      await customFetch.delete(`/tasks/${taskId}`);
    },
    onSuccess: () => {
      toast.success("Task deleted successfully!");
      queryClient.invalidateQueries(["AppData"]);

    },
    onError: () => {
      toast.error("There was an error deleting the task.");
    }
  });

  const updateMutation = useMutation({
    mutationFn: async (data) => {
      const response = await customFetch.put(`/tasks/${data.id}`, data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Task updated successfully!");
      queryClient.invalidateQueries(["AppData"]);
      clearEditTask();
    },
    onError: () => {
      toast.error("There was an error updating the task.");
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

  const handleDelete = (taskId) => {
    deleteMutation.mutate(taskId);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Task Creation Form */}
      <form
        onSubmit={handleSubmit}
        ref={formRef}
        className="card bg-gray-800 p-6 sm:p-8 shadow-md border border-gray-700 space-y-4 sm:space-y-6"
      >
        <h2 className="text-lg sm:text-2xl text-white font-semibold text-center flex items-center justify-center gap-1 sm:gap-2">
          {taskToEdit ? (
            <>
              <FaEdit className="text-yellow-400 text-xl sm:text-2xl" />
              Edit Task
            </>
          ) : (
            <>
              <FaPlus className="text-green-400 text-xl sm:text-2xl" />
              Create Task
            </>
          )}
        </h2>

        <input type="hidden" name="id" />

        <div>
          <label className="text-white text-sm sm:text-base block mb-1 sm:mb-2">
            Task Title
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
            name="name"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="text-white text-sm sm:text-base block mb-1 sm:mb-2">
              Date
            </label>
            <input
              type="date"
              className="input input-bordered w-full"
              name="date"
              required
            />
          </div>
          <div>
            <label className="text-white text-sm sm:text-base block mb-1 sm:mb-2">
              Time
            </label>
            <input
              type="time"
              name="time"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="text-white text-sm sm:text-base block mb-1 sm:mb-2">
              Volunteers Needed
            </label>
            <input
              type="number"
              name="volunteers"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="text-white text-sm sm:text-base block mb-1 sm:mb-2">
              Points
            </label>
            <input
              type="number"
              name="points"
              className="input input-bordered w-full"
              required
            />
          </div>
        </div>

        <div className="w-full">
          <button type="submit" className="btn btn-primary w-full">
            {createMutation.isLoading
              ? "Creating..."
              : updateMutation.isLoading
              ? "Updating..."
              : taskToEdit
              ? "Update Task"
              : "Create Task"}
          </button>
        </div>
      </form>

      {/* Task Table */}
      <TaskTable
        tasks={tasks}
        onDelete={handleDelete}
        setTaskToEdit={setTaskToEdit}
      />
    </div>
  );
};

export default TaskCreationForm;
