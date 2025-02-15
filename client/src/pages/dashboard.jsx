import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Track errors

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
  
    if (!userId || !token) {
      console.error('User ID or token not found in local storage.');
      setError('User authentication failed.');
      setLoading(false);
      return;
    }
  
    axios.get(`http://127.0.0.1:8080/api/tasks/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
          setTasks(response.data);
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
        setError('Failed to load tasks.');
      })
      .finally(() => setLoading(false)); // Stop loading after request completes
  }, []);

  if (loading) {
    return <div className="p-6 text-center text-lg font-semibold">Loading tasks...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">{error}</div>;
  }

  // Calculate the statistics.
  const stats = {
    toDo: tasks.filter(task => task.status === 'TO_DO').length,
    inProgress: tasks.filter(task => task.status === 'IN_PROGRESS').length,
    completed: tasks.filter(task => task.status === 'COMPLETED').length,
    overdue: tasks.filter(task => {
      if (!task.dueDate) return false;
      const dueDate = new Date(task.dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return dueDate < today && task.status !== 'COMPLETED';
    }).length,
  };

  const totalTasks = tasks.length;
  const donePercentage = totalTasks > 0 ? Math.round((stats.completed / totalTasks) * 100) : 0;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <p className="text-sm font-medium text-gray-500">To Do</p>
          <p className="mt-2 text-3xl font-bold text-gray-800">{stats.toDo}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <p className="text-sm font-medium text-gray-500">In Progress</p>
          <p className="mt-2 text-3xl font-bold text-gray-800">{stats.inProgress}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <p className="text-sm font-medium text-gray-500">Completed</p>
          <p className="mt-2 text-3xl font-bold text-gray-800">{stats.completed}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <p className="text-sm font-medium text-gray-500">Overdue</p>
          <p className="mt-2 text-3xl font-bold text-gray-800">{stats.overdue}</p>
        </div>
      </div>

      {/* Centered Percentage Card */}
      <div className="mt-10 flex justify-center">
        <div className="bg-blue-50 shadow rounded-lg p-8 text-center">
          <p className="text-lg font-medium text-blue-700">
            Tasks Completed Percentage
          </p>
          <p className="mt-4 text-6xl font-extrabold text-blue-900">
            {donePercentage}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
