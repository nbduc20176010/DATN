import React from "react";

import { Routes, Route } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import AdminLayout from "./components/template/AdminLayout";
import TeacherLayout from "./components/template/TeacherLayout";
import AdminClass from "./pages/class/AdminClass";
import {
    Signin,
    StudentDashboard,
    TeacherDashboard,
    TeacherManager,
    AdminDashboard,
    AdminManager,
    Missing,
    TeacherClass,
} from "./pages/export";

function App() {
    return (
        <Routes>
            <Route path="signin" element={<Signin />} />
            {/* student route */}
            <Route element={<RequireAuth />}>
                <Route path="/" element={<StudentDashboard />} />
                <Route path="teacher" element={<TeacherLayout />}>
                    <Route path="" element={<TeacherDashboard />} />
                    <Route path="manager" element={<TeacherManager />} />
                    <Route path="class/:id" element={<TeacherClass />} />
                </Route>
                <Route path="admin" element={<AdminLayout />}>
                    <Route path="" element={<AdminDashboard />} />
                    <Route path="manager" element={<AdminManager />} />
                    <Route path="class/:id" element={<AdminClass />} />
                </Route>
            </Route>
            <Route path="*" element={<Missing />} />
        </Routes>
    );
}

export default App;
