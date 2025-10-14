import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function TeacherDashboard() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [students, setStudents] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  // Handle file upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) setSelectedImage(URL.createObjectURL(file));
  };

  // Simulate attendance processing
  const handleProcessAttendance = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setStudents([
        { id: 1, name: "Aarav Sharma", match: "98%", status: "Present" },
        { id: 2, name: "Priya Patel", match: "92%", status: "Present" },
        { id: 3, name: "Rohan Das", match: "0%", status: "Absent" },
      ]);
      setIsProcessing(false);
    }, 2000);
  };

  // Navigate to Admin
  const handleSendToAdmin = () => {
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      {/* Header */}
      <header className="w-full max-w-5xl flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Teacher Dashboard</h1>
        <p className="text-gray-600 font-medium">
          {new Date().toLocaleDateString()}
        </p>
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

          <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition">
            Capture from Camera
          </button>

          {selectedImage && (
            <div className="mt-4">
              <img
                src={selectedImage}
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
            } text-white font-medium py-2 px-6 rounded-lg transition`}>
            {isProcessing ? "Processing..." : "Process Attendance"}
          </button>
        </div>
      </div>

      {/* Attendance Results */}
      {students.length > 0 && (
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Attendance Results
          </h3>
          <div className="space-y-3">
            {students.map((student) => (
              <div
                key={student.id}
                className="flex justify-between items-center border-b py-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-bold text-gray-700">
                    {student.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      {student.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      Match: {student.match}
                    </p>
                  </div>
                </div>
                <p
                  className={`font-medium ${
                    student.status === "Present"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}>
                  {student.status}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-end mt-6">
            <button
              onClick={handleSendToAdmin}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-5 rounded-lg font-medium transition">
              Send to Admin
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TeacherDashboard;
