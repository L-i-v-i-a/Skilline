import { Routes, Route } from "react-router-dom";
import Blog from "./pages/Blog";
import Careers from "./pages/Careers";
import AboutUs from "./pages/AboutUs";    
import { useNavigate } from "react-router-dom";
import React from "react";
import { Outlet } from "react-router-dom"; // We will use this in the Layout fix
import Home from "./pages/Home";
import Login from "./pages/Login";
import RegisterCard from "./pages/RegisterCard";
import StudentRegister from "./pages/StudentRegister";
import InstructorRegister from "./pages/InstructorRegister";
import VerifyOtp from "./pages/VerifyOtp";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import StudentDashboardLayout from "./pages/StudentDashboardLayout";
import StudentCourses from "./pages/StudentCourses";
import CourseDetails from "./pages/CourseDetails";
import StudentResults from "./pages/StudentResults";
import StudentNotification from "./pages/StudentNoification";
import StudentProfile from "./pages/StudentProfile";
import StudentOverview from "./pages/tudentOverview";
import InstructorDashboardLayout from "./components/InstructorDashboardLayout";
import InstructorCourses from "./pages/InstructorCourses";
import CreateCourse from "./pages/CreateCourse";
import InstructorSubmissions from "./pages/InstructorSubmissions";
import InstructorProfile from "./pages/InstructorProfile";
import InstructorOverview from "./pages/InstructorOverview";
import MyCourses from "./pages/MyCourses";
import SubmitAssignment from "./pages/SubmitAssignment";
import CourseAssignments from "./pages/CoursesAssignment";

const Navigate = ({ to, replace }) => {
  const navigate = useNavigate();
  React.useEffect(() => {
    navigate(to, { replace });
  }, [to, replace, navigate]);
  return null;
};
function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register-page" element={<RegisterCard />} />
      <Route path="/reg-student" element={<StudentRegister />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route path="/reg-instructor" element={<InstructorRegister />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/careers" element={<Careers />} />
      <Route path="/aboutus" element={<AboutUs />} />  

      {/* Nested Student Routes */}
      {/* The Layout wraps all these paths */}
      <Route path="/student" element={<StudentDashboardLayout />}>
        <Route path="dashboard" element={<StudentOverview />} />{" "}
        {/* Create a simple Overview component */}
        <Route path="courses" element={<StudentCourses />} />
        <Route path="assignments" element={<CourseDetails />} />
        <Route path="results" element={<StudentResults />} />
        <Route path="notifications" element={<StudentNotification />} />
        <Route path="profile" element={<StudentProfile />} />
      </Route>

      {/* Instructor Portal */}
      <Route path="/instructor" element={<InstructorDashboardLayout />}>
        {/* 2. THESE PATHS ARE RELATIVE (Notice no starting slash) */}
        <Route path="dashboard" element={<InstructorOverview />} />
        <Route path="courses" element={<InstructorCourses />} />
        <Route path="courses/create" element={<CreateCourse />} />
        <Route path="submissions" element={<InstructorSubmissions />} />
        <Route path="profile" element={<InstructorProfile />} />
        <Route
          path="/instructor/courses/:courseId/assignments"
          element={<CourseAssignments />}
        />

        {/* 3. DEFAULT REDIRECT */}
        <Route
          index
          element={<Navigate to="/instructor/dashboard" replace />}
        />
      </Route>
    </Routes>
  );
}

export default App;
