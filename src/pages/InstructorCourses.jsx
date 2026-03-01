import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_BASE = 'https://skilline-backend.onrender.com/api';

export default function InstructorCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAssignModal, setShowAssignModal] = useState(null); // Stores course ID
  const [assignData, setAssignData] = useState({ title: '', description: '', due_date: '', max_score: 100 });

  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const res = await axios.get(`${API_BASE}/student/instructor/courses/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCourses(res.data.results || []);
    } catch (err) {
      console.error("Fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCourses(); }, []);

  const handleCreateAssignment = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('accessToken');
      await axios.post(`${API_BASE}/student/instructor/courses/${showAssignModal}/assignments/create/`, 
        assignData, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Assignment Created!");
      setShowAssignModal(null);
      setAssignData({ title: '', description: '', due_date: '', max_score: 100 });
    } catch {
      alert("Error creating assignment");
    }
  };

  if (loading) return <div className="p-20 text-center animate-pulse text-indigo-600">Loading your curriculum...</div>;

  return (
    <div className="space-y-10 animate-fade-in">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-[#2D3162]">My Courses</h1>
          <p className="text-gray-400">Manage your content and student engagement.</p>
        </div>
        <Link to="/instructor/courses/create" className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200">
          + New Course
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {courses.map(course => (
          <div key={course.id} className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                📚
              </div>
              <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-[10px] font-black uppercase">
                Active
              </span>
            </div>
            
            <h3 className="text-xl font-bold text-[#2D3162] mb-2">{course.title}</h3>
            <p className="text-gray-400 text-sm line-clamp-2 mb-6">{course.description}</p>

            <div className="flex items-center gap-6 mb-8 py-4 border-y border-gray-50">
              <div>
                <p className="text-lg font-black text-[#2D3162]">₦{course.price}</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase">Price</p>
              </div>
              <div className="h-8 w-[1px] bg-gray-100"></div>
              <div>
                <p className="text-lg font-black text-[#2D3162]">{course.students_count || 0}</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase">Enrolled</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => setShowAssignModal(course.id)}
                className="flex-1 bg-slate-50 text-[#2D3162] py-4 rounded-2xl font-bold text-xs hover:bg-indigo-50 hover:text-indigo-600 transition-all"
              >
                + Add Assignment
              </button>
              <Link to={`/instructor/courses/${course.id}/students`} className="bg-slate-50 p-4 rounded-2xl text-gray-400 hover:text-indigo-600">
                👥
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Assignment Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-[#2D3162]/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-xl rounded-[3rem] p-10 shadow-2xl animate-pop-in">
            <h2 className="text-2xl font-black text-[#2D3162] mb-6">New Assignment</h2>
            <form onSubmit={handleCreateAssignment} className="space-y-4">
              <input 
                type="text" placeholder="Assignment Title" 
                className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 ring-indigo-500"
                onChange={e => setAssignData({...assignData, title: e.target.value})} required
              />
              <textarea 
                placeholder="Instructions..." 
                className="w-full p-4 bg-slate-50 border-none rounded-2xl h-32 focus:ring-2 ring-indigo-500"
                onChange={e => setAssignData({...assignData, description: e.target.value})} required
              />
              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="datetime-local" 
                  className="p-4 bg-slate-50 border-none rounded-2xl text-sm"
                  onChange={e => setAssignData({...assignData, due_date: e.target.value})} required
                />
                <input 
                  type="number" placeholder="Max Score" 
                  className="p-4 bg-slate-50 border-none rounded-2xl text-sm"
                  onChange={e => setAssignData({...assignData, max_score: e.target.value})} required
                />
              </div>
              <div className="flex gap-4 mt-6">
                <button type="button" onClick={() => setShowAssignModal(null)} className="flex-1 py-4 font-bold text-gray-400">Cancel</button>
                <button type="submit" className="flex-1 bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-200">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}