import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '../components/Button';

export default function StudentCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get('https://skilline-backend.onrender.com/api/students/courses/', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setCourses(res.data.results);
      } catch (err) {
        console.error(err);
      } finally {
        // Loading complete
      }
    };
    fetchCourses();
  }, []);

  const handleEnroll = async (courseId) => {
    try {
      const _res = await axios.post(
        `https://skilline-backend.onrender.com/api/students/enroll/${courseId}/`,
        { is_paid: false },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }}
      );
      alert('Enrolled successfully! Redirecting to payment...');
      // TODO: Initiate Paystack flow here using _res.data.id (enrollment_id)
    } catch {
      alert('Enrollment failed.');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-extrabold text-[#2D3162] mb-8">Available Courses</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map(course => (
          <div key={course.id} className="bg-white rounded-4xl p-6 shadow-sm border border-gray-50 hover:shadow-xl transition-shadow">
            <div className="h-40 bg-slate-100 rounded-2xl mb-4 overflow-hidden">
               {/* Course placeholder image */}
               <div className="w-full h-full flex items-center justify-center text-4xl">📚</div>
            </div>
            <h3 className="text-xl font-bold text-[#2D3162] mb-2">{course.title}</h3>
            <p className="text-gray-400 text-sm mb-4 line-clamp-2">{course.description}</p>
            
            <div className="flex items-center justify-between mt-auto">
              <span className="text-[#F97316] font-bold text-lg">${course.price}</span>
              <button 
                onClick={() => handleEnroll(course.id)}
                className="bg-[#2D3162] text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-opacity-90 transition-all"
              >
                Enroll Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}