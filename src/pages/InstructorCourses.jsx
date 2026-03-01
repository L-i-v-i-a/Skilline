import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_BASE = 'https://skilline-backend.onrender.com/api';

export default function InstructorCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal States
  const [showAssignModal, setShowAssignModal] = useState(null); 
  const [showEditModal, setShowEditModal] = useState(null); // Stores the full course object for editing
  
  // Form States
  const [assignData, setAssignData] = useState({ title: '', description: '', due_date: '', max_score: 100, course_id: '' });
  const [editData, setEditData] = useState({ title: '', description: '', price: '' });
  const [submitting, setSubmitting] = useState(false);

  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const res = await axios.get(`${API_BASE}/student/instructor/courses/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCourses(res.data.results || res.data || []);
    } catch (err) {
      console.error("Fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCourses(); }, []);

  // --- ASSIGNMENT LOGIC ---
  const openAssignModal = (course) => {
    setShowAssignModal(course.id);
    setAssignData({ ...assignData, course_id: course.id }); // Hidden course_id added here
  };

  const handleCreateAssignment = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const token = localStorage.getItem('accessToken');
      await axios.post(`${API_BASE}/instructor/courses/${showAssignModal}/assignments/create/`, 
        assignData, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Assignment Published!");
      setShowAssignModal(null);
    } catch {
      alert("Error creating assignment.");
    } finally { setSubmitting(false); }
  };

  // --- EDIT COURSE LOGIC ---
  const openEditModal = (course) => {
    setShowEditModal(course.id);
    setEditData({ title: course.title, description: course.description, price: course.price });
  };

  const handleUpdateCourse = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const token = localStorage.getItem('accessToken');
      await axios.patch(`${API_BASE}/instructor/courses/${showEditModal}/update/`, 
        editData, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Course Updated!");
      setShowEditModal(null);
      fetchCourses(); // Refresh list
    } catch {
      alert("Error updating course.");
    } finally { setSubmitting(false); }
  };

  if (loading) return <div className="p-20 text-center animate-pulse text-indigo-600 font-bold">Loading...</div>;

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-[#2D3162]">My Courses</h1>
          <p className="text-gray-400">Manage your curriculum and students.</p>
        </div>
        <Link to="/instructor/courses/create" className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-black transition-all shadow-lg">
          + New Course
        </Link>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {courses.map(course => (
          <div key={course.id} className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">📚</div>
              <span className="bg-emerald-50 text-emerald-600 px-4 py-1 rounded-full text-[10px] font-black uppercase">Active</span>
            </div>
            
            <h3 className="text-2xl font-bold text-[#2D3162] mb-2">{course.title}</h3>
            <p className="text-gray-400 text-sm line-clamp-2 mb-6 h-10">{course.description}</p>

            <div className="flex items-center gap-6 mb-8 py-5 border-y border-slate-50 font-bold text-[#2D3162]">
              <div>
                <p className="text-xl font-black">₦{Number(course.price).toLocaleString()}</p>
                <p className="text-[10px] text-gray-400 uppercase">Price</p>
              </div>
              <div className="h-10 w-[1px] bg-gray-100"></div>
              <div>
                <p className="text-xl font-black">{course.students_count || 0}</p>
                <p className="text-[10px] text-gray-400 uppercase">Enrolled</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => openAssignModal(course)} className="flex-1 bg-indigo-50 text-indigo-600 py-4 rounded-2xl font-bold text-xs hover:bg-indigo-600 hover:text-white transition-all">
                + Add Assignment
              </button>
              <Link to={`/instructor/courses/${course.id}/students`} className="bg-slate-50 p-4 rounded-2xl text-gray-400 hover:text-indigo-600">👥</Link>
              <button onClick={() => openEditModal(course)} className="bg-slate-50 p-4 rounded-2xl text-gray-400 hover:text-indigo-600">⚙️</button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL 1: CREATE ASSIGNMENT */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-[#1E293B]/60 backdrop-blur-md z-[100] flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-xl rounded-[3.5rem] p-12 shadow-2xl animate-pop-in">
            <h2 className="text-3xl font-black text-[#2D3162] mb-6">New Assignment</h2>
            <form onSubmit={handleCreateAssignment} className="space-y-5">
              {/* Note: course_id is already in assignData but we don't show an input for it */}
              <input type="text" placeholder="Task Title" className="w-full p-5 bg-slate-50 border-none rounded-[1.5rem] focus:ring-2 ring-indigo-500 font-bold"
                onChange={e => setAssignData({...assignData, title: e.target.value})} required />
              
              <textarea placeholder="Instructions..." className="w-full p-5 bg-slate-50 border-none rounded-[1.5rem] h-32 focus:ring-2 ring-indigo-500"
                onChange={e => setAssignData({...assignData, description: e.target.value})} required />
              
              <div className="grid grid-cols-2 gap-4">
                <input type="datetime-local" className="p-4 bg-slate-50 border-none rounded-[1.5rem] font-bold text-xs"
                  onChange={e => setAssignData({...assignData, due_date: e.target.value})} required />
                <input type="number" placeholder="Max Score" className="p-4 bg-slate-50 border-none rounded-[1.5rem] font-bold"
                  onChange={e => setAssignData({...assignData, max_score: e.target.value})} required />
              </div>

              <div className="flex gap-4 mt-10">
                <button type="button" onClick={() => setShowAssignModal(null)} className="flex-1 py-5 font-black text-gray-400">Cancel</button>
                <button type="submit" disabled={submitting} className="flex-[2] bg-indigo-600 text-white py-5 rounded-[2rem] font-black shadow-xl shadow-indigo-100 disabled:opacity-50">
                   {submitting ? 'Creating...' : 'Deploy Assignment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: EDIT COURSE */}
      {showEditModal && (
        <div className="fixed inset-0 bg-[#1E293B]/60 backdrop-blur-md z-[100] flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-xl rounded-[3.5rem] p-12 shadow-2xl animate-pop-in">
            <h2 className="text-3xl font-black text-[#2D3162] mb-6">Edit Course Settings</h2>
            <form onSubmit={handleUpdateCourse} className="space-y-5">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-2">Course Title</label>
                <input type="text" value={editData.title} className="w-full p-5 bg-slate-50 border-none rounded-[1.5rem] focus:ring-2 ring-indigo-500 font-bold"
                  onChange={e => setEditData({...editData, title: e.target.value})} required />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-2">Course Description</label>
                <textarea value={editData.description} className="w-full p-5 bg-slate-50 border-none rounded-[1.5rem] h-32 focus:ring-2 ring-indigo-500"
                  onChange={e => setEditData({...editData, description: e.target.value})} required />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-2">Price (₦)</label>
                <input type="number" value={editData.price} className="w-full p-5 bg-slate-50 border-none rounded-[1.5rem] focus:ring-2 ring-indigo-500 font-bold"
                  onChange={e => setEditData({...editData, price: e.target.value})} required />
              </div>

              <div className="flex gap-4 mt-10">
                <button type="button" onClick={() => setShowEditModal(null)} className="flex-1 py-5 font-black text-gray-400">Cancel</button>
                <button type="submit" disabled={submitting} className="flex-[2] bg-[#2D3162] text-white py-5 rounded-[2rem] font-black shadow-xl shadow-indigo-100 disabled:opacity-50">
                   {submitting ? 'Saving...' : 'Update Course'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}