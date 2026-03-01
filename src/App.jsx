import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Home from './pages/Home'
import RegisterCard from './pages/RegisterCard'
import StudentRegister from './pages/StudentRegister'
import InstructorRegister from './pages/InstructorRegister'
import VerifyOtp from './pages/VerifyOtp'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
function App() {
  return (
    <>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
        <Routes>
          <Route path="/register-page" element={<RegisterCard />} />
        </Routes>
        <Routes>
          <Route path="/reg-student" element={<StudentRegister />} />
        </Routes>
        <Routes>
          <Route path="/verify-otp" element={<VerifyOtp />} />
        </Routes>
        <Routes>
          <Route path="/reg-instructor" element={<InstructorRegister />} />
        </Routes>
        <Routes>
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
        <Routes>
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
    </>
  )
}

export default App