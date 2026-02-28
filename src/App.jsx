import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Home from './pages/Home'
import RegisterCard from './pages/RegisterCard'
import StudentRegister from './pages/StudentRegister'
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
          <Route path="/student-reg" element={<StudentRegister />} />
        </Routes>
    </>
  )
}

export default App