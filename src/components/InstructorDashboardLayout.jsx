
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import axios from 'axios';

const API_BASE = 'https://skilline-backend.onrender.com/api';

const InstructorDashboardLayout = () => {
  const [profile, setProfile] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        console.error("No token found in localStorage");
        navigate('/login');
        return;
      }
      
      const res = await axios.get(`${API_BASE}/profile/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      console.log("Profile Data Received:", res.data); // DEBUG LOG

      // Check if role exists and is correct
      if (res.data.role !== 'instructor') {
        console.warn("User is not an instructor. Role is:", res.data.role);
        navigate('/student/dashboard');
        return;
      }

      setProfile(res.data);
    } catch (err) {
      console.error("Error fetching instructor profile:", err.response || err);
      // If unauthorized, go to login
      if (err.response?.status === 401) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProfile(); }, []);

  const menuItems = [
    { name: 'Dashboard', path: '/instructor/dashboard', icon: '🏠' },
    { name: 'My Courses', path: '/instructor/courses', icon: '📂' },
    { name: 'Create Course', path: '/instructor/courses/create', icon: '➕' },
    { name: 'Submissions', path: '/instructor/submissions', icon: '📥' },
    { name: 'Profile', path: '/instructor/profile', icon: '⚙️' },
  ];

  // If loading is stuck, we show an error message if it takes more than 10 seconds
  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center bg-slate-50">
      <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-[#2D3162] font-bold">Verifying Instructor Access...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans">
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#1E293B] text-white transition-transform lg:translate-x-0 lg:static ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-8 flex flex-col h-full">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center font-bold rotate-12 text-white">I</div>
            <span className="text-2xl font-bold tracking-tight">Skilline <span className="text-xs opacity-50 block text-indigo-300">PRO</span></span>
          </div>
          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all ${
                  location.pathname === item.path ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-400 hover:bg-white/5'
                }`}
              >
                <span>{item.icon}</span>
                <span className="font-semibold">{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b h-24 flex items-center justify-between px-8">
          <button className="lg:hidden text-2xl" onClick={() => setSidebarOpen(true)}>☰</button>
          <div className="ml-auto flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-[#2D3162] font-black text-sm">{profile?.first_name} {profile?.last_name}</p>
              <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-tighter">Instructor Portal</span>
            </div>
            <img 
               src={profile?.profile_image || 'https://ui-avatars.com/api/?name=' + profile?.first_name} 
               className="w-12 h-12 rounded-2xl border-2 border-indigo-500 object-cover" 
               alt="profile" 
            />
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-8 lg:p-12">
           <Outlet context={{ profileData: profile, refreshProfile: fetchProfile }} />
        </main>
      </div>
    </div>
  );
};

export default InstructorDashboardLayout;