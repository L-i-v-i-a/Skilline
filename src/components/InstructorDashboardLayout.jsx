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
      if (!token) { navigate('/login'); return; }
      
      const res = await axios.get(`${API_BASE}/profile/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Safety check: Ensure only instructors can access this layout
      if (res.data.role !== 'instructor') {
        navigate('/student/dashboard');
        return;
      }
      setProfile(res.data);
    } catch (err) {
      navigate('/login');
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

  if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans">
      {/* Sidebar (Similar to Student but different color accent if preferred) */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#1E293B] text-white transition-transform lg:translate-x-0 lg:static ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-8 flex flex-col h-full">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center font-bold rotate-12">I</div>
            <span className="text-2xl font-bold tracking-tight">Skilline <span className="text-xs opacity-50 block">PRO</span></span>
          </div>
          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
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
          <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>☰</button>
          <div className="ml-auto flex items-center gap-4">
            <div className="text-right">
              <p className="text-[#2D3162] font-black text-sm">{profile?.first_name} {profile?.last_name}</p>
              <span className="text-[10px] font-bold text-indigo-500 uppercase">Instructor</span>
            </div>
            <img src={profile?.profile_image || 'https://via.placeholder.com/40'} className="w-12 h-12 rounded-full border-2 border-indigo-500 object-cover" alt="pfp" />
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