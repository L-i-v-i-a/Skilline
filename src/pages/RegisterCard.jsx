import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const RegisterCards = () => {
  return (
    <>
      <Navbar />
      <section className="relative pt-32 pb-24 bg-[#FFF2E1] overflow-hidden min-h-screen flex items-center">
        <div className="w-full px-4 md:px-10 lg:px-16 flex flex-col md:flex-row justify-center items-center gap-10 lg:gap-16 z-10">
          
          {/* Student Registration Card */}
          <div className="group relative w-full max-w-[480px] h-[320px] rounded-[30px] overflow-hidden shadow-2xl transition-transform duration-500 hover:-translate-y-4 animate-float">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80')] bg-cover bg-center transition-transform duration-700 group-hover:scale-110"></div>
            <div className="absolute inset-0 bg-[#2F327D]/60 backdrop-blur-[2px]"></div>
            
            {/* Content */}
            <div className="relative h-full flex flex-col items-center justify-center text-center px-8">
              <h3 className="text-white text-3xl font-black uppercase tracking-wider">For Students</h3>
              <p className="text-white/80 mt-4 mb-8 text-lg font-medium">
                Enter a world of interactive learning and grow your skills.
              </p>
              <Link 
                to="/reg-student" 
                className="bg-[#23BDEE] text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-[#1da8d6] transition-all active:scale-95 inline-block"
              >
                Register as Student
              </Link>
            </div>
          </div>

          {/* Instructor Registration Card */}
          <div className="group relative w-full max-w-[480px] h-[320px] rounded-[30px] overflow-hidden shadow-2xl transition-transform duration-500 hover:-translate-y-4 animate-float delay-300">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80')] bg-cover bg-center transition-transform duration-700 group-hover:scale-110"></div>
            <div className="absolute inset-0 bg-[#F48C06]/60 backdrop-blur-[2px]"></div>
            
            {/* Content */}
            <div className="relative h-full flex flex-col items-center justify-center text-center px-8">
              <h3 className="text-white text-3xl font-black uppercase tracking-wider">For Instructors</h3>
              <p className="text-white/80 mt-4 mb-8 text-lg font-medium">
                Share your knowledge with millions of students globally.
              </p>
              <Link 
                to="/reg-instructor" 
                className="bg-white text-[#2F327D] px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-gray-100 transition-all active:scale-95 inline-block"
              >
                Register as Instructor
              </Link>
            </div>
          </div>
        </div>

        {/* Background Decorative Circles */}
        <div className="absolute top-10 -left-20 w-64 h-64 bg-[#F48C06]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 -right-20 w-80 h-80 bg-[#23BDEE]/10 rounded-full blur-3xl"></div>

        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          .delay-300 {
            animation-delay: 0.5s;
          }
        `}</style>
      </section>
    </>
  );
};

export default RegisterCards;