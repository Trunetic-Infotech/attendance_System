import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [adminEmail, setadminEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!adminEmail || !password) {
      setError("Please enter both Admin Email and Password");
      return;
    }

    // Retrieve registered admin from localStorage
    const registeredAdmin = JSON.parse(localStorage.getItem("registeredAdmin"));

    if (registeredAdmin) {
      // match email and password correctly
      if (
        adminEmail === registeredAdmin.email &&
        password === registeredAdmin.password
      ) {
        localStorage.setItem("admin", JSON.stringify({ email: adminEmail }));
        navigate("/admin-dashboard");
      } else {
        setError("Invalid credentials");
      }
    } else {
      setError("No admin registered. Please register first.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-100 to-purple-300">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Admin Login
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Admin Email
            </label>
            <input
              type="text"
              value={adminEmail}
              onChange={(e) => setadminEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
              placeholder="Enter your Email"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
              placeholder="Enter password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white font-semibold py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-gray-600 text-center mt-4">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/admin")}
            className="text-purple-600 cursor-pointer hover:underline font-medium"
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;
