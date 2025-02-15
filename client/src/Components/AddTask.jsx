import React, { useState, useEffect } from "react";
import axios from "axios";

const AddTaskForm = ({ task, onClose }) => {
  // Initialize form state with default or existing task values
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "MEDIUM",
    status: "TO_DO",
    dueDate: "",
  });

  // Pre-fill form when editing an existing task
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        priority: task.priority || "MEDIUM",
        status: task.status || "TO_DO",
        dueDate: task.dueDate || "",
      });
    }
  }, [task]);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId"); // Get the userId from local storage
  
    if (!token || !userId) {
      console.error("Authentication failed: Missing token or userId.");
      return;
    }
  
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  
    const taskData = {
      ...formData,
      user: { id: userId }, // Attach the user information
    };
  
    const url = task
      ? `http://127.0.0.1:8080/api/tasks/${task.id}` // For updating
      : "http://127.0.0.1:8080/api/tasks"; // For adding
  
    console.log("Sending Request:", {
      method: task ? "PUT" : "POST",
      url,
      headers,
      body: taskData,
    });
  
    if (task) {
      // Update Task (PUT request)
      axios
        .put(url, taskData, { headers })
        .then(() => {
          onClose(); // Close the form after updating
          window.location.reload(); // Refresh to show updated task
        })
        .catch((error) => console.error("Error updating task:", error));
    } else {
      // Create Task (POST request)
      axios
        .post(url, taskData, { headers })
        .then(() => {
          onClose(); // Close the form after adding
          window.location.reload(); // Refresh to show new task
        })
        .catch((error) => console.error("Error adding task:", error));
    }
  };
  
  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-lg font-bold mb-4">{task ? "Update Task" : "Add Task"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              rows="3"
            ></textarea>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium">Priority</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
              <option value="LOW">Low</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="TO_DO">To Do</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Done</option>
            </select>
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-sm font-medium">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border rounded hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {task ? "Update Task" : "Add Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskForm;
