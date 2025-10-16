function AddTeacherModal({ show, onClose, newTeacher, setNewTeacher, handleAddTeacher }) {
  if (!show) return null; // hide if not shown

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-11/12 max-w-2xl relative shadow-xl overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Add New Teacher</h2>

        <form
              onSubmit={handleAddTeacher}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Teacher ID
                </label>
                <input
                  type="text"
                  value={newTeacher.teacherId}
                  onChange={(e) =>
                    setNewTeacher({ ...newTeacher, teacherId: e.target.value })
                  }
                  required
                  className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  value={newTeacher.firstName}
                  onChange={(e) =>
                    setNewTeacher({ ...newTeacher, firstName: e.target.value })
                  }
                  required
                  className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  value={newTeacher.lastName}
                  onChange={(e) =>
                    setNewTeacher({ ...newTeacher, lastName: e.target.value })
                  }
                  required
                  className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={newTeacher.phone}
                  onChange={(e) =>
                    setNewTeacher({ ...newTeacher, phone: e.target.value })
                  }
                  required
                  className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={newTeacher.email}
                  onChange={(e) =>
                    setNewTeacher({ ...newTeacher, email: e.target.value })
                  }
                  required
                  className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Gender
                </label>
                <select
                  value={newTeacher.gender}
                  onChange={(e) =>
                    setNewTeacher({ ...newTeacher, gender: e.target.value })
                  }
                  required
                  className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  value={newTeacher.subject}
                  onChange={(e) =>
                    setNewTeacher({ ...newTeacher, subject: e.target.value })
                  }
                  required
                  className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Aadhar Card
                </label>
                <input
                  type="text"
                  value={newTeacher.aadhar}
                  onChange={(e) =>
                    setNewTeacher({ ...newTeacher, aadhar: e.target.value })
                  }
                  required
                  className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Experience (Years)
                </label>
                <input
                  type="number"
                  min="0"
                  value={newTeacher.experience}
                  onChange={(e) =>
                    setNewTeacher({ ...newTeacher, experience: e.target.value })
                  }
                  required
                  className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={newTeacher.dob}
                  onChange={(e) =>
                    setNewTeacher({ ...newTeacher, dob: e.target.value })
                  }
                  required
                  className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-gray-700 font-medium mb-1">
                  Address
                </label>
                <textarea
                  value={newTeacher.address}
                  onChange={(e) =>
                    setNewTeacher({ ...newTeacher, address: e.target.value })
                  }
                  required
                  className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                ></textarea>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Created At
                </label>
                <input
                  type="date"
                  value={newTeacher.createdAt}
                  onChange={(e) =>
                    setNewTeacher({ ...newTeacher, createdAt: e.target.value })
                  }
                  required
                  className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={newTeacher.password}
                  onChange={(e) =>
                    setNewTeacher({ ...newTeacher, password: e.target.value })
                  }
                  required
                  className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-gray-700 font-medium mb-1">
                  Role
                </label>
                <input
                  type="text"
                  value={newTeacher.role || "Teacher"}
                  readOnly
                  className="w-full border rounded-lg px-3 py-2 bg-gray-100 text-gray-600"
                />
              </div>

              {/* Buttons */}
              <div className="sm:col-span-2 flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowAddTeacher(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                >
                  Add Teacher
                </button>
              </div>
            </form>

        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-red-600 text-xl font-bold"
        >
          ×
        </button>
      </div>
    </div>
  );
}

export default AddTeacherModal;
