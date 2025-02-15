import React from "react";

const TaskCard = ({ id, title, description, status, priority, dueDate, onStatusChange, onEdit, onDelete }) => {
  
   // Handle Drag Start
   const handleDragStart = (e) => {
    e.dataTransfer.setData("taskId", id);
    e.currentTarget.classList.add("opacity-1"); // Temporary effect while dragging
  };

  // Remove opacity after drag
  const handleDragEnd = (e) => {
    e.currentTarget.classList.remove("opacity-50");
  };

  return (
    <div
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className="p-4 bg-white rounded shadow cursor-grab transition-all hover:shadow-lg border border-gray-300"
    >
      {/* Action Buttons */}
      <div className="flex justify-between items-center">
        <h4 className="text-md font-bold text-gray-800">{title}</h4>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(id)}
            className="p-1 bg-gray-300 text-white rounded hover:bg-gray-400"
            title="Edit Task"
          >
            ✏️
          </button>
          
          <button
            onClick={() => onDelete(id)}
            className="p-1 bg-gray-300 text-white rounded hover:bg-red-400"
            title="Delete Task"
          >
            🗑
          </button>
        </div>
      </div>
      <p className="text-sm text-gray-600 mt-2">{description}</p>

      <div className="mt-4 flex justify-between items-center">
        {/* Status Dropdown */}
        <select
          value={status}
          onChange={(e) => onStatusChange(id, e.target.value)}
          className={`text-xs font-semibold px-2 py-1 rounded ${
            status === "TO_DO"
              ? "bg-blue-100 text-blue-600"
              : status === "IN_PROGRESS"
              ? "bg-yellow-100 text-yellow-600"
              : "bg-green-100 text-green-600"
          }`}
        >
          <option value="TO_DO">To Do</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Done</option>
        </select>

        {/* Priority Label */}
        <span
          className={`text-xs font-semibold px-2 py-1 rounded ${
            priority === "HIGH"
              ? "bg-red-100 text-red-600"
              : priority === "MEDIUM"
              ? "bg-yellow-100 text-yellow-600"
              : "bg-green-100 text-green-600"
          }`}
        >
          {priority}
        </span>
      </div>

      {/* Due Date */}
      {dueDate && (
        <p className="text-xs text-gray-500 mt-2">
          Due: <span className="font-semibold">{dueDate}</span>
        </p>
      )}

    </div>
  );
};

export default TaskCard;
