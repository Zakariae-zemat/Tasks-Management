import React, { useState, useEffect } from "react";
import axios from "axios";
import AddTaskForm from "../Components/AddTask";
import TaskCard from "../Components/TaskCard";

const TaskBoard = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      console.error("User ID or token not found in local storage.");
      setError("User authentication failed.");
      setLoading(false);
      return;
    }

    axios
      .get(`http://127.0.0.1:8080/api/tasks/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
        setError("Failed to load tasks.");
      })
      .finally(() => setLoading(false));
  }, []);

  // Filter tasks by date range
  const filteredTasks = tasks.filter((task) => {
    if (!startDate && !endDate) return true;
    const taskDate = new Date(task.dueDate);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    return (!start || taskDate >= start) && (!end || taskDate <= end);
  });

  const handleStatusChange = (id, newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );

    axios
      .put(`http://127.0.0.1:8080/api/tasks/${id}`, { status: newStatus }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .catch((error) => console.error("Error updating task:", error));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://127.0.0.1:8080/api/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      })
      .catch((error) => console.error("Error deleting task:", error));
  };

  const handleEdit = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    setEditingTask(taskToEdit);
    setShowForm(true);
  };

  // Drag and Drop Logic
  const allowDrop = (e) => e.preventDefault();

  const handleDrop = (e, newStatus) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === parseInt(taskId) ? { ...task, status: newStatus } : task
      )
    );

    handleStatusChange(taskId, newStatus);
  };


  if (loading) return <div className="text-center p-6">Loading tasks...</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {error && <div className="p-4 bg-red-100 text-red-600 rounded mb-4">{error}</div>}

      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <button
          className="px-4 py-2 text-sm font-semibold text-blue-600 border border-blue-600 rounded hover:bg-blue-100"
          onClick={() => {
            setEditingTask(null);
            setShowForm(true);
          }}
        >
          Add Task
        </button>

        {/* Date Filtering */}
        <div className="flex items-center gap-2">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="p-2 text-sm border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="p-2 text-sm border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
      </div>

      {/* Task Columns */}
      <div className="grid grid-cols-3 gap-4">
        {["TO_DO", "IN_PROGRESS", "COMPLETED"].map((status) => (
          <div
            key={status}
            onDragOver={allowDrop}
            onDrop={(e) => handleDrop(e, status)}
            className="p-4 bg-white rounded-lg shadow-md min-h-[200px] border border-gray-300"
          >
            <h3 className="text-lg font-bold text-gray-700 mb-4">
              {status === "TO_DO"
                ? "To Do"
                : status === "IN_PROGRESS"
                ? "In Progress"
                : "Done"}
            </h3>
            <div className="space-y-4">
              {filteredTasks
                .filter((task) => task.status === status)
                .map((task) => (
                  <TaskCard
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    description={task.description}
                    priority={task.priority}
                    dueDate={task.dueDate}
                    status={task.status}
                    onStatusChange={handleStatusChange}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>

      {showForm && <AddTaskForm task={editingTask} onClose={() => setShowForm(false)} />}
    </div>
  );
};

export default TaskBoard;
