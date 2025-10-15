import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TeacherDashboard from "./components/TeacherDashboard";
import AdminDashboard from "./components/AdminDashboard";
import TeacherLogin from "./components/TeacherLogin";
import AdminLogin from "./components/AdminLogin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TeacherLogin />} />
        <Route path="/teacher" element={<TeacherDashboard />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
      </Routes>
    </Router>
  );
}

export default App;
