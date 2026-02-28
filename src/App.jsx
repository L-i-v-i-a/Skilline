import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './pages/Login'

function App() {
  return (
    <>
    <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
    </>
  )
}

export default App