import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/api/users/register", {
                username,
                email,
                password,
            });

            setError(""); // Clear errors
            navigate("/login"); // Redirect to login after successful registration
        } catch (err) {
            if (err.response) {
                setError(err.response.data);
            } else {
                setError('Server unreachable. Check your connection.');
            }
        }
    };

    return (
        <div className="max-w-4xl mx-auto font-[sans-serif]">
            <div className="text-center mb-16">
                <h4 className="text-gray-800 text-3xl font-bold">Sign up</h4>
            </div>

            <form onSubmit={handleRegister}>
                <div className="grid sm:grid-cols-2 gap-8">
                    <div>
                        <label className="text-gray-800 text-sm mb-2 block">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                            placeholder="Enter a Username"
                            required
                        />
                    </div>
                    <div>
                        <label className="text-gray-800 text-sm mb-2 block">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div>
                        <label className="text-gray-800 text-sm mb-2 block">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                            placeholder="Enter password"
                            required
                        />
                    </div>
                    <div>
                        <label className="text-gray-800 text-sm mb-2 block">Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                            placeholder="Confirm password"
                            required
                        />
                    </div>
                </div>

                <div className="!mt-12">
                    <button
                        type="submit"
                        className="py-3.5 px-7 text-sm font-semibold tracking-wider rounded-md text-white bg-cyan-500 hover:bg-cyan-600 focus:outline-none"
                    >
                        Sign up
                    </button>
                </div>
                {error && <p className="text-red-500 mt-4">{error}</p>}
            </form>
            <p className="text-center text-sm/6 text-gray-500">
                Already have an account?{" "}
                <Link to="/login" className="font-semibold text-cyan-600 hover:text-cyan-800">
                    Sign in
                </Link>
            </p>
        </div>
    );
};

export default Register;
