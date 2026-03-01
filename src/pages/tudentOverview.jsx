import React from 'react';
import { useOutletContext, Link } from 'react-router-dom';

const StudentOverview = () => {
  const { profileData } = useOutletContext();

  const stats = [
    { label: 'Enrolled Courses', value: '4', icon: '📚', color: 'bg-blue-50 text-blue-600' },
    { label: 'Completed Tasks', value: '12', icon: '✅', color: 'bg-green-50 text-green-600' },
    { label: 'Average Grade', value: '88%', icon: '🏆', color: 'bg-orange-50 text-orange-600' },
    { label: 'Hours Spent', value: '24h', icon: '⏱️', color: 'bg-purple-50 text-purple-600' },
  ];

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Welcome Header */}
      <header>
        <h1 className="text-4xl font-black text-[#2D3162]">
          Welcome back, {profileData?.first_name || 'Student'}! 👋
        </h1>
        <p className="text-gray-400 font-medium mt-2">
          You have <span className="text-[#F97316] font-bold">2 assignments</span> due this week. Keep up the great work!
        </p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex items-center gap-5">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-2xl font-black text-[#2D3162]">{stat.value}</p>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Continue Learning Card */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-[#2D3162]">Continue Learning</h2>
            <Link to="/student/courses" className="text-[#F97316] font-bold text-sm hover:underline">View All</Link>
          </div>
          
          <div className="space-y-6">
            {/* Mock Active Course */}
            <div className="flex flex-col md:flex-row items-center gap-6 p-4 rounded-[2rem] hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
              <div className="w-full md:w-32 h-24 bg-[#2D3162] rounded-2xl flex items-center justify-center text-3xl">💻</div>
              <div className="flex-1 w-full text-center md:text-left">
                <h4 className="font-bold text-[#2D3162] text-lg">Full Stack Web Development</h4>
                <p className="text-sm text-gray-400 mb-4">Module 4: React Context API</p>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#F97316]" style={{ width: '75%' }}></div>
                </div>
              </div>
              <button className="bg-[#2D3162] text-white px-6 py-3 rounded-xl font-bold text-sm">Resume</button>
            </div>
          </div>
        </div>

        {/* Notifications / Activity Feed */}
        <div className="bg-[#2D3162] rounded-[2.5rem] p-8 text-white shadow-xl">
          <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-2 h-2 mt-2 rounded-full bg-green-400 shrink-0"></div>
              <div>
                <p className="text-sm font-bold">Assignment Graded</p>
                <p className="text-xs text-gray-400">UI/UX Design Fundamentals</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-2 h-2 mt-2 rounded-full bg-orange-400 shrink-0"></div>
              <div>
                <p className="text-sm font-bold">New Course Content</p>
                <p className="text-xs text-gray-400">Database Administration</p>
              </div>
            </div>
          </div>
          
          <Link 
            to="/student/notifications" 
            className="mt-10 block text-center py-4 bg-white/10 rounded-2xl font-bold text-sm hover:bg-white/20 transition-all"
          >
            Check All Notifications
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StudentOverview;