import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TeacherDashboard from "./components/TeacherDashboard";
import AdminDashboard from "./components/AdminDashboard";
import TeacherLogin from "./components/TeacherLogin";
import AdminLogin from "./components/AdminLogin";
import AdminRegister from "./components/AdminRegister";
import StudentList from "./components/StudentList";
import TeacherList from "./components/TeacherList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TeacherLogin />} />
        <Route path="/teacher" element={<TeacherDashboard />} />
        <Route path="/admin" element={<AdminRegister/>} />
        <Route path="/admin-login" element={<AdminLogin/>}/>
        <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
        <Route path="/students" element={<StudentList/>}/>
        <Route path="/teacher-list" element={<TeacherList/>}/>
      </Routes>
    </Router>
  );
}

export default App;
