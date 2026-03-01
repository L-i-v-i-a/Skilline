import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, AlertCircle } from 'lucide-react';

const API_BASE = 'https://skilline-backend.onrender.com/api';

export default function MyCourses() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      const token = localStorage.getItem('accessToken');

      if (!token) {
        setError('Please log in to view your courses.');
        setLoading(false);
        navigate('/login');
        return;
      }

      try {
        const res = await axios.get(`${API_BASE}/students/courses/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Assuming paginated response with 'results' key (common in DRF)
        setEnrolledCourses(res.data.results || res.data);
      } catch (err) {
        console.error('Fetch error:', err);

        if (err.response?.status === 401) {
          setError('Your session has expired. Please log in again.');
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          setTimeout(() => navigate('/login'), 2000);
        } else {
          setError('Failed to load your courses. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#F97316]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-red-50 border border-red-200 rounded-xl text-red-700 flex items-center gap-3">
        <AlertCircle size={24} />
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#2D3162] tracking-tight">
            My Learning Journey
          </h1>
          <p className="text-gray-500 mt-2 font-medium">
            You are enrolled in {enrolledCourses.length} course{enrolledCourses.length !== 1 ? 's' : ''}
          </p>
        </div>

        <Link
          to="/student/courses/browse"
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#F97316] to-[#EA580C] text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:from-[#EA580C] hover:to-[#F97316] transition-all duration-300"
        >
          <BookOpen className="mr-2 h-5 w-5" />
          Discover New Courses
        </Link>
      </div>

      {/* Courses Grid */}
      {enrolledCourses.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-gray-200 shadow-sm">
          <div className="mx-auto w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mb-6">
            <BookOpen className="h-12 w-12 text-[#F97316]" />
          </div>
          <h3 className="text-2xl font-bold text-[#2D3162] mb-3">
            Your learning path is empty
          </h3>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            Start exploring courses and build your future today.
          </p>
          <Link
            to="/student/courses/browse"
            className="inline-block px-8 py-4 bg-[#F97316] text-white font-bold rounded-full hover:bg-[#EA580C] transition-colors shadow-lg"
          >
            Browse Courses
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {enrolledCourses.map((course) => (
            <div
              key={course.id}
              className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col"
            >
              {/* Course Thumbnail */}
              <div className="relative h-56 bg-gradient-to-br from-[#2D3162]/5 to-[#F97316]/5 overflow-hidden">
                {course.cover_image ? (
                  <img
                    src={course.cover_image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-6xl opacity-30">
                    {course.title.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="inline-block px-4 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-[#2D3162]">
                    {course.is_active ? 'In Progress' : 'Completed'}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                <p className="text-[#F97316] text-sm font-semibold uppercase tracking-wide mb-2">
                  {course.instructor || 'Instructor'}
                </p>
                <h3 className="text-xl font-bold text-[#2D3162] mb-3 line-clamp-2 group-hover:text-[#F97316] transition-colors">
                  {course.title}
                </h3>

                {/* Progress Bar (mocked - replace with real data later) */}
                <div className="mt-4 mb-6">
                  <div className="flex justify-between text-xs font-medium text-gray-500 mb-2">
                    <span>Progress</span>
                    <span>68%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#F97316] to-[#EA580C] rounded-full transition-all duration-500"
                      style={{ width: '68%' }}
                    />
                  </div>
                </div>

                <div className="mt-auto">
                  <Link
                    to={`/student/courses/${course.id}`}
                    className="block w-full bg-[#2D3162] text-white py-4 rounded-2xl font-bold text-center hover:bg-[#1a1c3a] transition-colors shadow-lg shadow-[#2D3162]/10"
                  >
                    Continue Learning
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}