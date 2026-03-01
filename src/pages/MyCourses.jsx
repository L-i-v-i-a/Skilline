import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_BASE = 'https://skilline-backend.onrender.com/api';

export default function MyCourses() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const token = localStorage.getItem('token');
        // Note: Depending on backend logic, you might use a specific 
        // /api/students/my-enrollments/ endpoint or filter the list
        const res = await axios.get(`${API_BASE}/students/courses/`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        // For this demo, we assume the API returns courses the student is active in.
        setEnrolledCourses(res.data.results);
      } catch (err) {
        setError('Could not load your courses.');
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, []);

  if (loading) return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#F97316]"></div></div>;

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-[#2D3162]">My Learning Path</h1>
          <p className="text-gray-400 font-medium mt-1">You have {enrolledCourses.length} active courses this semester.</p>
        </div>
        <Link 
          to="/student/courses/browse" 
          className="bg-orange-50 text-[#F97316] px-6 py-3 rounded-full font-bold text-sm hover:bg-[#F97316] hover:text-white transition-all text-center"
        >
          + Explore New Courses
        </Link>
      </div>

      {error && <div className="p-4 bg-red-50 text-red-600 rounded-2xl border-l-4 border-red-500">{error}</div>}

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {enrolledCourses.map((course) => (
          <div key={course.id} className="group bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
            {/* Course Thumbnail */}
            <div className="relative h-48 bg-slate-100 overflow-hidden">
              <div className="absolute inset-0 bg-[#2D3162]/10 group-hover:bg-transparent transition-colors"></div>
              <div className="w-full h-full flex items-center justify-center text-5xl">
                {/* Visual Icon based on Course Title/ID */}
                {course.id % 2 === 0 ? '💻' : '🎨'}
              </div>
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black uppercase text-[#2D3162] tracking-tighter">
                {course.is_active ? 'In Progress' : 'Completed'}
              </div>
            </div>

            {/* Content */}
            <div className="p-8 flex-1 flex flex-col">
              <p className="text-[#F97316] text-xs font-bold uppercase tracking-widest mb-2">
                {course.instructor || 'Lead Instructor'}
              </p>
              <h3 className="text-xl font-bold text-[#2D3162] mb-3 leading-tight group-hover:text-[#F97316] transition-colors">
                {course.title}
              </h3>
              
              {/* Simple Progress Bar (Mockup) */}
              <div className="mt-4 mb-6">
                <div className="flex justify-between text-[10px] font-bold text-gray-400 mb-2 uppercase">
                  <span>Course Progress</span>
                  <span>65%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#F97316] rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>

              <Link 
                to={`/student/courses/${course.id}`} 
                className="mt-auto w-full bg-[#2D3162] text-white py-4 rounded-2xl font-bold text-sm text-center hover:bg-[#1a1c3a] transition-colors shadow-lg shadow-[#2D3162]/10"
              >
                Continue Learning
              </Link>
            </div>
          </div>
        ))}

        {enrolledCourses.length === 0 && (
          <div className="col-span-full py-20 text-center bg-white rounded-[2.5rem] border-2 border-dashed border-gray-100">
            <p className="text-gray-400 font-medium">You haven't enrolled in any courses yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}