import React, { useState } from "react";

function TeacherDashboard() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [students, setStudents] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [teacherDetails, setTeacherDetails] = useState({
    teacherName: "",
    className: "",
    subject: "",
  });
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All"); // All / Present / Absent

  // Simulate a class of 30 students
  const generateClassAttendance = () => {
    const totalStudents = 30;
    const absentCount = Math.floor(Math.random() * 6); // 0-5 absent
    const absentIndexes = new Set();

    while (absentIndexes.size < absentCount) {
      absentIndexes.add(Math.floor(Math.random() * totalStudents));
    }

    return Array.from({ length: totalStudents }).map((_, i) => ({
      id: i + 1,
      roll: `${100 + i + 1}`,
      name: `Student ${i + 1}`,
      status: absentIndexes.has(i) ? "Absent" : "Present",
    }));
  };

  // Handle file upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return alert("No file selected!");
    if (!file.type.startsWith("image/")) return alert("Invalid file type!");
    setSelectedImage(file);
  };

  // Process Attendance
  const handleProcessAttendance = () => {
    if (!selectedImage) return alert("Please upload an image first.");
    setIsProcessing(true);
    setTimeout(() => {
      const classAttendance = generateClassAttendance();
      setStudents(classAttendance);
      setIsProcessing(false);
    }, 2000);
  };

  // Send to Admin
  const handleSendToAdmin = () => {
    if (!teacherDetails.teacherName || !teacherDetails.className || !teacherDetails.subject) {
      alert("Please fill all teacher details before sending!");
      return;
    }

    if (students.length === 0) {
      alert("Attendance list is empty!");
      return;
    }

    const payload = {
      teacher: teacherDetails.teacherName,
      class: teacherDetails.className,
      subject: teacherDetails.subject,
      students,
    };

    console.log("Sending to admin:", payload);
    setTimeout(() => {
      alert("Attendance sent to admin successfully!");
      // Optional: Reset after sending
      setStudents([]);
      setSelectedImage(null);
      setTeacherDetails({ teacherName: "", className: "", subject: "" });
      setSearch("");
      setFilterStatus("All");
    }, 1000);
  };

  // Download CSV
  const handleDownload = () => {
    if (students.length === 0) return alert("No attendance to download.");
    const header = ["Roll No", "Name", "Status"];
    const rows = filteredStudents.map((s) => [s.roll, s.name, s.status]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [header, ...rows].map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `attendance_${teacherDetails.className || "class"}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered students based on search and status
  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.roll.includes(search);
    const matchesStatus =
      filterStatus === "All" ? true : s.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Count present and absent
  const totalStudents = students.length;
  const totalAbsent = students.filter((s) => s.status === "Absent").length;
  const totalPresent = totalStudents - totalAbsent;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      {/* Header */}
      <header className="w-full max-w-5xl flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Teacher Dashboard</h1>
        <p className="text-gray-600 font-medium">{new Date().toLocaleDateString()}</p>
      </header>

      {/* Upload Section */}
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Upload or Capture Group Photo
        </h2>
        <div className="flex flex-col items-center space-y-4">
          <label className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg cursor-pointer transition">
            Upload Photo
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>

          <button
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition"
            onClick={() => alert("Camera capture not implemented")}
          >
            Capture from Camera
          </button>

          {selectedImage && (
            <div className="mt-4">
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Preview"
                className="rounded-xl w-72 h-72 object-cover border"
              />
            </div>
          )}

          <button
            onClick={handleProcessAttendance}
            disabled={!selectedImage || isProcessing}
            className={`${
              isProcessing
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            } text-white font-medium py-2 px-6 rounded-lg transition`}
          >
            {isProcessing ? "Processing..." : "Process Attendance"}
          </button>
        </div>
      </div>

      {/* Summary Boxes */}
      {students.length > 0 && (
        <div className="w-full max-w-6xl grid grid-cols-2 sm:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-2xl shadow p-6 text-center">
            <h2 className="text-lg font-semibold text-gray-700">Total Students</h2>
            <p className="text-3xl font-bold text-blue-600 mt-2">{totalStudents}</p>
          </div>
          <div className="bg-white rounded-2xl shadow p-6 text-center">
            <h2 className="text-lg font-semibold text-gray-700">Present</h2>
            <p className="text-3xl font-bold text-green-600 mt-2">{totalPresent}</p>
          </div>
          <div className="bg-white rounded-2xl shadow p-6 text-center">
            <h2 className="text-lg font-semibold text-gray-700">Absent</h2>
            <p className="text-3xl font-bold text-red-600 mt-2">{totalAbsent}</p>
          </div>
        </div>
      )}

      {/* Teacher Details */}
      {students.length > 0 && (
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-md p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Teacher Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Teacher Name"
              value={teacherDetails.teacherName}
              onChange={(e) =>
                setTeacherDetails({ ...teacherDetails, teacherName: e.target.value })
              }
              className="border rounded-xl py-2 px-4 shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <input
              type="text"
              placeholder="Class"
              value={teacherDetails.className}
              onChange={(e) =>
                setTeacherDetails({ ...teacherDetails, className: e.target.value })
              }
              className="border rounded-xl py-2 px-4 shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <input
              type="text"
              placeholder="Subject"
              value={teacherDetails.subject}
              onChange={(e) =>
                setTeacherDetails({ ...teacherDetails, subject: e.target.value })
              }
              className="border rounded-xl py-2 px-4 shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>
        </div>
      )}

      {/* Search & Filter */}
      {students.length > 0 && (
        <div className="w-full max-w-4xl flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search by name or roll number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-2/3 border rounded-xl py-2 px-4 shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border rounded-xl py-2 px-4 shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
          >
            <option value="All">All</option>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>
        </div>
      )}

      {/* Attendance Results */}
      {students.length > 0 && (
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-md p-6 max-h-[60vh] overflow-y-auto">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Attendance Results</h3>
          <div className="space-y-3">
            {filteredStudents.map((student) => (
              <div
                key={student.id}
                className="flex justify-between items-center border-b py-3"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-bold text-gray-700">
                    {student.roll}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{student.name}</p>
                  </div>
                </div>
                <p
                  className={`font-medium ${
                    student.status === "Present" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {student.status}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-end mt-6 space-x-2">
            <button
              onClick={handleDownload}
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition"
            >
              Download CSV
            </button>
            <button
              onClick={handleSendToAdmin}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-5 rounded-lg font-medium transition"
            >
              Send to Admin
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TeacherDashboard;
