import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const API_BASE = 'https://skilline-backend.onrender.com/api';

export default function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [activeTab, setActiveTab] = useState('materials'); // 'materials' or 'assignments'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };

        const [courseRes, assignRes] = await Promise.all([
          axios.get(`${API_BASE}/students/courses/${id}/`, { headers }),
          axios.get(`${API_BASE}/students/courses/${id}/assignments/`, { headers })
        ]);

        setCourse(courseRes.data);
        setAssignments(assignRes.data.results);
      } catch (err) {
        console.error("Error fetching course details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [id]);

  if (loading) return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#F97316]"></div></div>;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* 1. Hero Header */}
      <div className="bg-[#2D3162] rounded-[3rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
        <div className="relative z-10 max-w-3xl">
          <Link to="/student/courses" className="text-orange-400 text-sm font-bold flex items-center gap-2 mb-6 hover:text-white transition-colors">
            ← Back to My Courses
          </Link>
          <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">{course?.title}</h1>
          <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-gray-300">
            <span className="flex items-center gap-2">👤 {course?.instructor || 'Instructor Name'}</span>
            <span className="flex items-center gap-2">📅 Created: {new Date(course?.created_at).toLocaleDateString()}</span>
            <span className="bg-[#F97316] text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase">Active</span>
          </div>
        </div>
        {/* Decorative background shape */}
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#F97316] opacity-10 rounded-full blur-3xl"></div>
      </div>

      {/* 2. Navigation Tabs */}
      <div className="flex gap-4 border-b border-gray-100 pb-2">
        {['materials', 'assignments'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-8 py-4 rounded-t-3xl font-bold text-sm transition-all capitalize ${
              activeTab === tab 
              ? 'bg-white text-[#F97316] border-t-4 border-[#F97316] shadow-sm' 
              : 'text-gray-400 hover:text-[#2D3162]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 3. Tab Content */}
      <div className="bg-white rounded-b-[2.5rem] rounded-tr-[2.5rem] p-8 md:p-10 shadow-sm border border-gray-50 min-h-[400px]">
        {activeTab === 'materials' ? (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#2D3162]">Learning Resources</h2>
            <p className="text-gray-500 leading-relaxed">{course?.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              {/* Mock Material Cards */}
              <div className="flex items-center gap-4 p-5 bg-slate-50 rounded-2xl border border-transparent hover:border-[#F97316] transition-all cursor-pointer group">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform">📄</div>
                <div>
                  <p className="font-bold text-[#2D3162]">Course Syllabus.pdf</p>
                  <p className="text-xs text-gray-400">1.2 MB • PDF Document</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-5 bg-slate-50 rounded-2xl border border-transparent hover:border-[#F97316] transition-all cursor-pointer group">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform">🎥</div>
                <div>
                  <p className="font-bold text-[#2D3162]">Introduction Video.mp4</p>
                  <p className="text-xs text-gray-400">45 MB • Video File</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#2D3162]">Pending Assignments</h2>
            <div className="space-y-4">
              {assignments.length > 0 ? assignments.map((task) => (
                <div key={task.id} className="group flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-white border-2 border-slate-50 rounded-[2rem] hover:border-orange-100 hover:shadow-lg transition-all">
                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 bg-[#2D3162] text-white rounded-2xl flex items-center justify-center shrink-0">📝</div>
                    <div>
                      <h4 className="font-bold text-[#2D3162] text-lg">{task.title}</h4>
                      <p className="text-sm text-gray-400 line-clamp-1">{task.description}</p>
                      <p className="text-[10px] font-black text-[#F97316] uppercase mt-2 tracking-widest">
                        Due: {new Date(task.due_date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Link 
                    to={`/student/assignments/${task.id}/submit`}
                    className="bg-[#2D3162] text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-[#F97316] transition-all text-center"
                  >
                    Submit Work
                  </Link>
                </div>
              )) : (
                <div className="text-center py-10 text-gray-400">No assignments posted for this course yet.</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}