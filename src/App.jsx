import { Routes, Route } from 'react-router-dom';
import { Outlet } from 'react-router-dom'; // We will use this in the Layout fix
import Home from './pages/Home';
import Login from './pages/Login';
import RegisterCard from './pages/RegisterCard';
import StudentRegister from './pages/StudentRegister';
import InstructorRegister from './pages/InstructorRegister';
import VerifyOtp from './pages/VerifyOtp';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import StudentDashboardLayout from './pages/StudentDashboardLayout';
import StudentCourses from './pages/StudentCourses';
import CourseDetails from './pages/CourseDetails';
import StudentResults from './pages/StudentResults';
import StudentNotification from './pages/StudentNoification';
import StudentProfile from './pages/StudentProfile';
import StudentOverview from './pages/tudentOverview';
import InstructorDashboardLayout from './components/InstructorDashboardLayout';
import MyCourses from './pages/MyCourses';
import SubmitAssignment from './pages/SubmitAssignment';  

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

      {/* Nested Student Routes */}
      {/* The Layout wraps all these paths */}
      <Route path="/student" element={<StudentDashboardLayout />}>
        <Route path="dashboard" element={<StudentOverview />} /> {/* Create a simple Overview component */}
        <Route path="courses" element={<StudentCourses />} />
        <Route path="assignments" element={<CourseDetails />} />
        <Route path="results" element={<StudentResults />} />
        <Route path="notifications" element={<StudentNotification />} />
        <Route path="profile" element={<StudentProfile />} />
      </Route>

      {/* Instructor Portal */}
      <Route path="/instructor" element={<InstructorDashboardLayout />}>
        <Route path="dashboard" element={<div>Instructor Overview Stats</div>} />
        <Route path="courses" element={<InstructorCourses />} />
        <Route path="courses/create" element={<CreateCourse />} />
        <Route path="submissions" element={<div>Grading Area</div>} />
        <Route index element={<Navigate to="/instructor/dashboard" replace />} />
      </Route>
    </Routes>
  );
}

export default App;