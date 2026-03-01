import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const API_BASE = 'https://skilline-backend.onrender.com/api';

const StudentDashboardLayout = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // We define this as a standalone function so child components 
  // can trigger a re-fetch after they update the profile via API.
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      const res = await axios.get(`${API_BASE}/profile/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfile(res.data);
    } catch (err) {
      console.error("Profile fetch error:", err);
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [navigate]);

  const menuItems = [
    { name: 'Overview', path: '/student/dashboard', icon: '📊' },
    { name: 'My Courses', path: '/student/courses', icon: '📚' },
    { name: 'Assignments', path: '/student/assignments', icon: '📝' },
    { name: 'Results', path: '/student/results', icon: '🏆' },
    { name: 'Notifications', path: '/student/notifications', icon: '🔔' },
    { name: 'Profile Settings', path: '/student/profile', icon: '⚙️' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#F97316]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      {/* MOBILE SIDEBAR OVERLAY */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#2D3162] text-white transition-transform duration-300 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="p-8 flex flex-col h-full">
          {/* Brand */}
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-[#F97316] rounded-xl flex items-center justify-center font-bold text-lg rotate-12 shadow-lg shadow-orange-500/20">
              <span className="-rotate-12 text-white">S</span>
            </div>
            <span className="text-2xl font-bold tracking-tight">Skilline</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-3">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-200 ${
                  location.pathname === item.path 
                    ? 'bg-[#F97316] text-white shadow-lg shadow-orange-500/30' 
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-semibold">{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Logout */}
          <button 
            onClick={() => { localStorage.clear(); navigate('/login'); }}
            className="flex items-center gap-4 px-5 py-4 mt-auto text-gray-400 hover:text-red-400 hover:bg-red-400/5 rounded-2xl transition-all"
          >
            <span className="text-xl">🚪</span>
            <span className="font-semibold">Logout</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* TOP BAR */}
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-30 border-b border-gray-100 h-24 flex items-center justify-between px-8 lg:px-12">
          <button 
            className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg" 
            onClick={() => setSidebarOpen(true)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
          
          <div className="flex items-center gap-6 ml-auto">
            {/* Quick Actions / Role Badge */}
            <div className="hidden md:flex flex-col items-end">
              <p className="text-[#2D3162] font-black text-sm tracking-tight leading-none mb-1">
                {profile?.first_name} {profile?.last_name}
              </p>
              <span className="bg-orange-50 text-[#F97316] text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md">
                {profile?.role}
              </span>
            </div>

            {/* Profile Link - Wraps the image */}
            <Link to="/student/profile" className="relative group">
              <div className="w-12 h-12 rounded-full border-2 border-white ring-2 ring-gray-50 overflow-hidden transition-transform group-hover:scale-105 group-hover:ring-[#F97316]/30">
                <img 
                  src={profile?.profile_image || 'https://via.placeholder.com/150'} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
            </Link>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-12">
          <div className="max-w-6xl mx-auto">
            {/* We pass the fetchProfile function as a prop 'refreshProfile' 
               to child components using React Router's Outlet or children.
               This allows the 'Profile Settings' page to trigger a refresh 
               in the Header image instantly after a user updates their photo.
            */}
            {React.cloneElement(children, { refreshProfile: fetchProfile, profileData: profile })}
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboardLayout;