import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const API_BASE = 'https://skilline-backend.onrender.com/api';

export default function CourseAssignments() {
  const { courseId } = useParams();
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [courseTitle, setCourseTitle] = useState("Course"); // Initialized with a fallback

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const res = await axios.get(`${API_BASE}/students/courses/${courseId}/assignments/`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        const data = res.data.results || res.data || [];
        setAssignments(data);
        
        // Use the first assignment to set the course title context
        if (data.length > 0 && data[0].course_name) {
          setCourseTitle(data[0].course_name);
        }
      } catch (err) {
        console.error("Error loading assignments", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [courseId]);

  if (loading) return (
    <div className="flex justify-center items-center h-64 text-indigo-600 font-bold animate-pulse">
      Loading Curriculum...
    </div>
  );

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto p-4">
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <Link to={`/student/courses/${courseId}`} className="group text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-2 flex items-center gap-1">
            <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Course
          </Link>
          {/* NOW USING courseTitle HERE */}
          <h1 className="text-3xl font-black text-[#2D3162]">
            {courseTitle} <span className="text-indigo-600">Assignments</span>
          </h1>
          <p className="text-gray-400 text-sm font-medium mt-1">Complete your tasks to earn your certification.</p>
        </div>
        
        <div className="bg-white border-2 border-indigo-50 px-6 py-3 rounded-2xl shadow-sm">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Tasks</p>
          <p className="text-xl font-black text-indigo-600">{assignments.length}</p>
        </div>
      </div>

      {/* --- ASSIGNMENTS LIST --- */}
      <div className="grid gap-5">
        {assignments.length > 0 ? assignments.map((task) => (
          <div key={task.id} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all flex flex-col md:flex-row justify-between items-center gap-6 group">
            <div className="flex items-start gap-6 w-full">
              <div className="w-16 h-16 bg-[#F8FAFC] group-hover:bg-indigo-600 group-hover:text-white text-[#2D3162] rounded-[1.5rem] flex items-center justify-center text-2xl transition-all shrink-0 shadow-inner">
                📝
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-xl font-extrabold text-[#2D3162]">{task.title}</h3>
                  <span className="bg-indigo-50 text-indigo-600 text-[9px] font-black px-2 py-0.5 rounded uppercase">New</span>
                </div>
                <p className="text-gray-400 text-sm line-clamp-2 mb-4 font-medium leading-relaxed">
                  {task.description}
                </p>
                <div className="flex flex-wrap gap-4 items-center">
                  <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                    <span className="text-[10px] font-black uppercase tracking-tighter text-gray-500">Max Points:</span>
                    <span className="text-xs font-black text-indigo-600">{task.max_score}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-red-400 italic">Deadline: {new Date(task.due_date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>

            <Link 
              to={`/student/assignments/${task.id}/submit`} 
              className="w-full md:w-auto bg-[#2D3162] text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 hover:scale-105 active:scale-95 transition-all text-center shadow-lg shadow-indigo-100/50"
            >
              Start Submission
            </Link>
          </div>
        )) : (
          <div className="bg-white rounded-[3rem] p-24 text-center border-2 border-dashed border-slate-100">
            <div className="text-5xl mb-6">🏝️</div>
            <h3 className="text-2xl font-black text-[#2D3162]">No active tasks</h3>
            <p className="text-gray-400 font-medium max-w-xs mx-auto mt-2">
              Your instructor hasn't posted any assignments for this course yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}