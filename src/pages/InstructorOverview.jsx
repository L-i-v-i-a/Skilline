import React from 'react';
import { useOutletContext, Link } from 'react-router-dom';

export default function InstructorOverview() {
  // 1. Fallback to empty object to prevent "cannot destructure null" error
  const context = useOutletContext() || {}; 
  const { profileData } = context;

  // 2. Handle the loading state gracefully
  if (!profileData) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const stats = [
    { label: 'Total Courses', value: '3', icon: '📂', color: 'bg-indigo-50 text-indigo-600' },
    { label: 'Active Students', value: '142', icon: '👥', color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Pending Grades', value: '12', icon: '📥', color: 'bg-amber-50 text-amber-600' },
    { label: 'Total Revenue', value: '₦1.2M', icon: '💰', color: 'bg-blue-50 text-blue-600' },
  ];

  return (
    <div className="space-y-10 animate-fade-in">
      <header>
        <h1 className="text-4xl font-black text-[#2D3162]">
          Welcome, Prof. {profileData.last_name || 'Instructor'}! 🎓
        </h1>
        <p className="text-gray-400 font-medium mt-2">Here is what's happening with your courses today.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl mb-4 ${stat.color}`}>
              {stat.icon}
            </div>
            <p className="text-3xl font-black text-[#2D3162]">{stat.value}</p>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <div className="bg-[#1E293B] rounded-[3rem] p-10 text-white shadow-xl">
          <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link to="/instructor/courses/create" className="p-6 bg-white/10 rounded-3xl hover:bg-indigo-600 transition-all border border-white/5 group">
              <span className="text-2xl block mb-2 group-hover:scale-110 transition-transform">➕</span>
              <p className="font-bold">New Course</p>
            </Link>
            <Link to="/instructor/submissions" className="p-6 bg-white/10 rounded-3xl hover:bg-indigo-600 transition-all border border-white/5 group">
              <span className="text-2xl block mb-2 group-hover:scale-110 transition-transform">📝</span>
              <p className="font-bold">Grade Work</p>
            </Link>
          </div>
        </div>

        {/* Recent Performance */}
        <div className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-sm">
          <h2 className="text-2xl font-bold text-[#2D3162] mb-6">Course Engagement</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-transparent hover:border-indigo-100 transition-colors">
              <span className="font-bold text-[#2D3162]">Python for Beginners</span>
              <span className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-lg font-black text-sm">88%</span>
            </div>
            <div className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-transparent hover:border-indigo-100 transition-colors">
              <span className="font-bold text-[#2D3162]">UI/UX Mastery</span>
              <span className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-lg font-black text-sm">92%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
