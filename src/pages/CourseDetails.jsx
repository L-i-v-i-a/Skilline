import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const API_BASE = 'https://skilline-backend.onrender.com/api';

export default function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [activeTab, setActiveTab] = useState('materials'); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const headers = { Authorization: `Bearer ${token}` };

        // Fetch course details and assignments in parallel
        const [courseRes, assignRes] = await Promise.all([
          axios.get(`${API_BASE}/courses/${id}/`, { headers }),
          axios.get(`${API_BASE}/courses/${id}/assignments/`, { headers })
        ]);

        setCourse(courseRes.data);
        setAssignments(assignRes.data.results || assignRes.data);
      } catch (err) {
        console.error("Error fetching course details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [id]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-40 space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-600 border-gray-200"></div>
      <p className="text-gray-400 font-bold animate-pulse">Loading Course Room...</p>
    </div>
  );

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
      {/* 1. Hero Header */}
      <div className="bg-[#1E293B] rounded-[3rem] p-8 md:p-14 text-white relative overflow-hidden shadow-2xl">
        <div className="relative z-10">
          <Link to="/student/dashboard" className="text-indigo-400 text-xs font-black uppercase tracking-widest flex items-center gap-2 mb-8 hover:text-white transition-all">
            ← Back to Dashboard
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight uppercase tracking-tighter">
                {course?.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-[10px] font-black uppercase tracking-widest text-gray-400">
                <span className="bg-indigo-600 text-white px-4 py-1 rounded-lg">ID: #{id}</span>
                <span className="flex items-center gap-2">👤 {course?.instructor_name || 'Expert Instructor'}</span>
                <span className="flex items-center gap-2">📅 Joined: {new Date(course?.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-indigo-600 opacity-20 rounded-full blur-[100px]"></div>
      </div>

      {/* 2. Navigation Tabs */}
      <div className="flex gap-2 p-2 bg-slate-100/50 rounded-[2rem] w-fit">
        {['materials', 'assignments'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-10 py-4 rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest transition-all ${
              activeTab === tab 
              ? 'bg-white text-indigo-600 shadow-sm' 
              : 'text-gray-400 hover:text-[#2D3162]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 3. Tab Content */}
      <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-sm border border-gray-100 min-h-[500px]">
        {activeTab === 'materials' ? (
          <div className="space-y-10">
            <div>
              <h2 className="text-2xl font-black text-[#2D3162] mb-4">Course Brief</h2>
              <p className="text-gray-500 leading-relaxed text-lg font-medium">{course?.description}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {/* Dynamic Video Material */}
              {course?.intro_video && (
                <div className="p-8 bg-slate-50 rounded-[2.5rem] border-2 border-transparent hover:border-indigo-100 transition-all group">
                  <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">🎥</div>
                  <p className="font-black text-[#2D3162] text-xl mb-2">Introduction Masterclass</p>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-6">Course Intro Video</p>
                  <a href={course.intro_video} target="_blank" rel="noreferrer" className="inline-block bg-[#2D3162] text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-indigo-600 transition-colors">
                    Watch Now
                  </a>
                </div>
              )}

              {/* Course Graphics/Resources */}
              <div className="p-8 bg-slate-50 rounded-[2.5rem] border-2 border-transparent hover:border-indigo-100 transition-all group">
                <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">📂</div>
                <p className="font-black text-[#2D3162] text-xl mb-2">Learning Assets</p>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-6">PDFs & Source Files</p>
                <button className="bg-white border-2 border-slate-200 text-[#2D3162] px-8 py-3 rounded-xl font-bold text-sm hover:border-indigo-600 transition-all">
                  Access Files
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <h2 className="text-2xl font-black text-[#2D3162]">Curriculum Assignments</h2>
            <div className="grid gap-4">
              {assignments.length > 0 ? assignments.map((task) => (
                <div key={task.id} className="group flex flex-col md:flex-row md:items-center justify-between gap-6 p-8 bg-white border-2 border-slate-50 rounded-[2.5rem] hover:border-indigo-50 hover:shadow-xl transition-all">
                  <div className="flex gap-6 items-start">
                    <div className="w-14 h-14 bg-[#1E293B] text-white rounded-2xl flex items-center justify-center shrink-0 text-xl font-bold">
                      {task.id}
                    </div>
                    <div>
                      <h4 className="font-black text-[#2D3162] text-xl mb-1">{task.title}</h4>
                      <p className="text-sm text-gray-400 font-medium line-clamp-1 mb-3">{task.description}</p>
                      <div className="flex items-center gap-4">
                         <span className="text-[10px] font-black text-white bg-indigo-600 px-3 py-1 rounded-md uppercase tracking-widest">
                          Max Points: {task.max_score}
                        </span>
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                          Due: {new Date(task.due_date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Link 
                    to={`/student/assignments/${task.id}/submit`}
                    className="bg-[#2D3162] text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 transition-all text-center shadow-lg shadow-indigo-100"
                  >
                    Submit Work
                  </Link>
                </div>
              )) : (
                <div className="text-center py-20 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-100">
                  <p className="text-4xl mb-4">🍵</p>
                  <h3 className="text-lg font-bold text-[#2D3162]">All clear!</h3>
                  <p className="text-gray-400 font-medium">No assignments have been posted for this module yet.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}