import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminRegister() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    gender: "",
    aadhar: "",
    dob: "",
    address: "",
    createdAt: "",
    password: "",
  });

  const handleSubmit = (e) => {
  e.preventDefault();

  // Save the admin in localStorage
  localStorage.setItem("registeredAdmin", JSON.stringify(admin));

  alert("Admin registered successfully!");
  setAdmin({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    gender: "",
    aadhar: "",
    dob: "",
    address: "",
    createdAt: "",
    password: "",
  });

  navigate("/admin-login"); // redirect
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-100 via-purple-300 to-purple-400 p-6">
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Admin Register
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {/* First Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              First Name
            </label>
            <input
              type="text"
              value={admin.firstName}
              onChange={(e) =>
                setAdmin({ ...admin, firstName: e.target.value })
              }
              // required
              className="w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Last Name
            </label>
            <input
              type="text"
              value={admin.lastName}
              onChange={(e) =>
                setAdmin({ ...admin, lastName: e.target.value })
              }
              // required
              className="w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              value={admin.phone}
              onChange={(e) => setAdmin({ ...admin, phone: e.target.value })}
              // required
              className="w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              value={admin.email}
              onChange={(e) => setAdmin({ ...admin, email: e.target.value })}
              // required
              className="w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Gender</label>
            <select
              value={admin.gender}
              onChange={(e) => setAdmin({ ...admin, gender: e.target.value })}
              // required
              className="w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Aadhar */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Aadhar Card</label>
            <input
              type="text"
              value={admin.aadhar}
              onChange={(e) => setAdmin({ ...admin, aadhar: e.target.value })}
              // required
              className="w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Date of Birth</label>
            <input
              type="date"
              value={admin.dob}
              onChange={(e) => setAdmin({ ...admin, dob: e.target.value })}
              // required
              className="w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Address</label>
            <input
              type="text"
              value={admin.address}
              onChange={(e) => setAdmin({ ...admin, address: e.target.value })}
              // required
              className="w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Created At */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Created At</label>
            <input
              type="date"
              value={admin.createdAt}
              onChange={(e) =>
                setAdmin({ ...admin, createdAt: e.target.value })
              }
              // required
              className="w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              value={admin.password}
              onChange={(e) => setAdmin({ ...admin, password: e.target.value })}
              // required
              className="w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Submit Button */}
          <div className="sm:col-span-2 lg:col-span-3 flex justify-center mt-6">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition"
            >
              Register Admin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default AdminRegister;