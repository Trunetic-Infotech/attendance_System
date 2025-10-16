import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddStudentModal from "../modals/AddStudentModal";
import AddTeacherModal from "../modals/AddTeacherModal";

function AdminDashboard() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showAddTeacher, setShowAddTeacher] = useState(false);
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [newTeacher, setNewTeacher] = useState({
    teacherId: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    gender: "",
    subject: "",
    aadhar: "",
    experience: "",
    dob: "",
    address: "",
    createdAt: "",
    password: "",
    role: "Teacher",
  });

  const [newStudent, setNewStudent] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    address: "",
    aadhar: "",
    classId: "",
    subClassId: "",
    createdAt: "",
    updatedAt: "",
    image: null,
  });

  const attendanceRecords = [
    { id: 1, className: "10A", date: "2025-10-13", present: 28, absent: 2 },
    { id: 2, className: "9B", date: "2025-10-13", present: 30, absent: 0 },
    { id: 3, className: "8C", date: "2025-10-12", present: 25, absent: 5 },
  ];

  const handleViewDetails = (record) => setSelectedRecord(record);
  const closeModal = () => setSelectedRecord(null);

  const filteredRecords = attendanceRecords.filter(
    (r) =>
      r.className.toLowerCase().includes(search.toLowerCase()) ||
      r.date.includes(search)
  );

  // Download CSV
  const handleDownload = () => {
    const header = ["Class", "Date", "Present", "Absent"];
    const rows = attendanceRecords.map((r) => [
      r.className,
      r.date,
      r.present,
      r.absent,
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [header, ...rows].map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "attendance_records.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Add Teacher Handler
  const handleAddTeacher = (e) => {
    e.preventDefault();
    console.log("New Teacher Added:", newTeacher);
    alert(`Teacher ${newTeacher.name} added successfully!`);
    setShowAddTeacher(false);
    setNewTeacher({ name: "", subject: "", email: "" });
  };

  const handleAddStudent = (e) => {
    e.preventDefault();
    console.log("New Student Added:", newStudent);
    alert(`Student ${newStudent.firstName} added successfully!`);
    setShowAddStudent(false);
    setNewStudent({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      gender: "",
      dob: "",
      address: "",
      aadhar: "",
      classId: "",
      subClassId: "",
      createdAt: "",
      updatedAt: "",
      image: null,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      {/* Header */}
      <header className="w-full max-w-6xl flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-600 font-medium">
          {new Date().toLocaleDateString()}
        </p>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-6xl mb-8">
        <div
          className="bg-white rounded-2xl shadow p-6 text-center cursor-pointer hover:shadow-lg transition"
          onClick={() => navigate("/students")} // ✅ lowercase function
        >
          <h2 className="text-lg font-semibold text-gray-700">
            Total Students
          </h2>
          <p className="text-3xl font-bold text-blue-600 mt-2">320</p>
        </div>

       <div
          className="bg-white rounded-2xl shadow p-6 text-center cursor-pointer hover:shadow-lg transition"
          onClick={() => navigate("/teacher-list")} // ✅ lowercase function
        >
          <h2 className="text-lg font-semibold text-gray-700">
            Total Teachers
          </h2>
          <p className="text-3xl font-bold text-green-600 mt-2">320</p>
        </div>
      </div>

      {/* Search + Download + Add Teacher */}
      <div className="w-full max-w-6xl mb-4 flex flex-wrap gap-3 justify-between items-center">
        <input
          type="text"
          placeholder="Search by class or date..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border rounded-xl py-2 px-4 shadow-sm focus:ring-2 focus:ring-blue-400 outline-none min-w-[250px]"
        />
        <div className="flex gap-2">
          <button
            onClick={handleDownload}
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition"
          >
            Download CSV
          </button>
          <button
            onClick={() => setShowAddTeacher(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
          >
            Add Teacher
          </button>
          <button
            onClick={() => setShowAddStudent(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition"
          >
            Add Student
          </button>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-md overflow-hidden">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-200 text-gray-800">
            <tr>
              <th className="py-3 px-4 text-left">Class</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-center">Present</th>
              <th className="py-3 px-4 text-center">Absent</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((record) => (
              <tr
                key={record.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="py-3 px-4">{record.className}</td>
                <td className="py-3 px-4">{record.date}</td>
                <td className="py-3 px-4 text-center text-green-600 font-medium">
                  {record.present}
                </td>
                <td className="py-3 px-4 text-center text-red-600 font-medium">
                  {record.absent}
                </td>
                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => handleViewDetails(record)}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-4 rounded-lg transition text-sm"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
            {filteredRecords.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-6 text-gray-500 font-medium"
                >
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Details Modal */}
      {selectedRecord &&
        (() => {
          const totalStudents = selectedRecord.present + selectedRecord.absent;
          const absentIndexes = new Set();
          while (absentIndexes.size < selectedRecord.absent) {
            absentIndexes.add(Math.floor(Math.random() * totalStudents));
          }

          return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
              <div className="bg-white rounded-2xl p-6 w-11/12 max-w-lg relative shadow-xl max-h-[80vh] overflow-y-auto">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  {selectedRecord.className} - {selectedRecord.date}
                </h2>
                <p className="text-gray-700 mb-4">
                  Present: {selectedRecord.present} | Absent:{" "}
                  {selectedRecord.absent}
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {Array.from({ length: totalStudents }).map((_, i) => {
                    const isAbsent = absentIndexes.has(i);
                    return (
                      <div
                        key={i}
                        className={`flex items-center space-x-2 rounded-xl p-2 ${
                          isAbsent
                            ? "bg-red-100 border border-red-300"
                            : "bg-green-100 border border-green-300"
                        }`}
                      >
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${
                            isAbsent ? "bg-red-400" : "bg-green-400"
                          }`}
                        >
                          {String.fromCharCode(65 + (i % 26))}
                        </div>
                        <p
                          className={`font-medium ${
                            isAbsent ? "text-red-700" : "text-green-700"
                          }`}
                        >
                          Student {i + 1} ({isAbsent ? "Absent" : "Present"})
                        </p>
                      </div>
                    );
                  })}
                </div>

                <button
                  onClick={closeModal}
                  className="absolute top-2 right-3 text-gray-500 hover:text-red-600 text-xl font-bold"
                >
                  ×
                </button>
              </div>
            </div>
          );
        })()}

       <AddTeacherModal
      show={showAddTeacher}
      onClose={() => setShowAddTeacher(false)}
      newTeacher={newTeacher}
      setNewTeacher={setNewTeacher}
      handleAddTeacher={handleAddTeacher}
    />

    <AddStudentModal
      show={showAddStudent}
      onClose={() => setShowAddStudent(false)}
      newStudent={newStudent}
      setNewStudent={setNewStudent}
      handleAddStudent={handleAddStudent}
    />
    </div>
  );
}

export default AdminDashboard;
