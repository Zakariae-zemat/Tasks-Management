import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
  }

    try {
        const response = await axios.post('http://127.0.0.1:8080/auth/login', {
            username,
            password,
        });

        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.userId);

        setError('');

        navigate('/dashboard');
    } catch (err) {
        if (err.response) {
          setError(err.response.data);
      } else {
          setError('Server unreachable. Check your connection.');
      }
    }
};


  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 relative">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-2xl font-bold text-gray-900">Sign in to your account</h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-900">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)} // Update state on input change
              className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 focus:ring-gray-600"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-900">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update state on input change
              className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 focus:ring-gray-600"
              required
            />
          </div>
          <button
            type="submit"
            className="flex w-full justify-center bg-gray-500 px-3 py-1.5 text-sm font-semibold text-white shadow-sm rounded-md hover:bg-gray-600"
          >
            Sign in
          </button>
          {error && <p className="mt-2 text-center text-sm text-red-500">{error}</p>}
        </form>
        <p className="mt-10 text-center text-sm text-gray-500">
          Don't have an account?{' '}
          <Link to="/register" className="font-semibold text-gray-600 hover:text-gray-800">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
