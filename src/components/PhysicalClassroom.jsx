import React, { useState } from 'react';
import teacherImg from '../assets/teacher.png';
import VideoModal from './VideoModal'; // Reusing your existing VideoModal

const PhysicalClassroom = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        
        {/* Left Content */}
        <div className="w-full lg:w-1/2 relative">
          {/* Decorative Orange Circle behind text */}
          <div className="absolute -top-6 -left-6 w-20 h-20 bg-[#F48C06]/20 rounded-full -z-10"></div>
          
          <h2 className="text-3xl md:text-4xl lg:text-[40px] font-bold leading-tight mb-8">
            <span className="text-[#2F327D]">Everything you can do in a physical classroom, </span>
            <span className="text-[#F48C06]">you can do with Skilline</span>
          </h2>
          
          <p className="text-[#696984] text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
            Skilline's school management software helps traditional and online schools manage 
            scheduling, attendance, payments and virtual classrooms all in one secure 
            cloud-based system.
          </p>
          
          <a 
            href="#learn-more" 
            className="text-[#696984] underline font-medium text-lg hover:text-[#F48C06] transition-colors"
          >
            Learn more
          </a>

          {/* Small decorative orange dot */}
          <div className="absolute right-0 bottom-20 w-4 h-4 bg-[#F48C06]/40 rounded-full"></div>
        </div>

        {/* Right Content - Video/Image with decorative frames */}
        <div className="w-full lg:w-1/2 relative">
          <div className="relative z-10">
            {/* Main Image Container */}
            <div className="rounded-[30px] overflow-hidden shadow-2xl relative">
              <img 
                src={teacherImg} 
                alt="Classroom" 
                className="w-full h-auto object-cover"
              />
              
              {/* Video Play Button Overlay */}
              <button 
                onClick={() => setIsModalOpen(true)}
                className="absolute inset-0 flex items-center justify-center group"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                  <svg viewBox="0 0 24 24" fill="#23BDEE" className="w-8 h-8 ml-1">
                    <path d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" />
                  </svg>
                </div>
              </button>
            </div>

            {/* Decorative Light Blue Corner (Top Left) */}
            <div className="absolute -top-5 -left-5 w-32 h-32 border-[12px] border-[#23BDEE] rounded-[40px] -z-10 hidden sm:block"></div>
            
            {/* Decorative Orange Corner (Bottom Right) */}
            <div className="absolute -bottom-5 -right-5 w-40 h-32 bg-[#F48C06] rounded-[30px] -z-10 hidden sm:block opacity-70"></div>
          </div>
        </div>
      </div>

      {/* Video Modal Component */}
      <VideoModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ" // Replace with your actual video link
      />
    </section>
  );
};

export default PhysicalClassroom;