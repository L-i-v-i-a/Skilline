import React from 'react';
import { Link } from 'react-router-dom';

const WhatIsSkilline = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
        
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-[#2F327D]">What is </span>
            <span className="text-[#F48C06]">Skilline?</span>
          </h2>
          <p className="text-[#696984] text-lg md:text-xl leading-relaxed">
            Skilline is a platform that allows educators to create online classes whereby they can 
            store the course materials online; manage assignments, quizzes and exams; monitor 
            due dates; grade results and provide students with feedback all in one place.
          </p>
        </div>

        {/* Action Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Instructor Card */}
          <div className="relative group overflow-hidden rounded-[30px] aspect-[4/3] md:aspect-auto md:h-[400px] shadow-xl">
            {/* Background Image */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"></div>
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300"></div>
            
            {/* Content */}
            <div className="relative h-full flex flex-col items-center justify-center text-center p-6">
              <h3 className="text-white text-2xl md:text-3xl font-bold uppercase tracking-widest mb-6">
                For Instructors
              </h3>
              <Link 
                to="/reg-instructor"
                className="px-8 py-4 border-2 border-white text-white rounded-full font-bold text-lg backdrop-blur-sm hover:bg-white hover:text-[#2F327D] transition-all duration-300 active:scale-95"
              >
                Start a class today
              </Link>
            </div>
          </div>

          {/* Student Card */}
          <div className="relative group overflow-hidden rounded-[30px] aspect-[4/3] md:aspect-auto md:h-[400px] shadow-xl">
            {/* Background Image */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"></div>
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300"></div>
            
            {/* Content */}
            <div className="relative h-full flex flex-col items-center justify-center text-center p-6">
              <h3 className="text-white text-2xl md:text-3xl font-bold uppercase tracking-widest mb-6">
                For Students
              </h3>
              <Link 
                to="/reg-student"
                className="px-10 py-4 bg-[#23BDEE]/90 text-white rounded-full font-bold text-lg shadow-lg hover:bg-[#23BDEE] transition-all duration-300 active:scale-95"
              >
                Enter access code
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhatIsSkilline;