import React, { useState } from 'react';
import teacherImg from '../assets/teacher.png';
import VideoModal from './VideoModal';

const PhysicalClassroom = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="relative py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 flex flex-col lg:flex-row items-center gap-16">
        
        {/* Left Content */}
        <div className="w-full lg:w-[45%] relative">
          {/* THE ORANGE CIRCLE: Positioned exactly behind the "E" */}
          <div className="absolute -top-4 -left-5 w-16 h-16 md:w-20 md:h-20 bg-[#F48C06]/50 rounded-full z-0"></div>
          
          <h2 className="relative z-10 text-3xl md:text-4xl lg:text-[42px] font-bold leading-[1.2] mb-8">
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
            className="text-[#696984] underline font-medium text-lg hover:text-[#F48C06] transition-colors inline-block"
          >
            Learn more
          </a>

          {/* Small decorative dot on the right side of the text block */}
          <div className="absolute -right-4 top-1/2 w-4 h-4 bg-[#F48C06]/40 rounded-full hidden lg:block"></div>
        </div>

        {/* Right Content - The "Framed" Image */}
        <div className="w-full lg:w-[55%] relative flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[600px]">
            
            {/* 1. LIGHT BLUE CORNER (Top Left) */}
            <div className="absolute -top-6 -left-6 w-32 h-32 border-[15px] border-[#23BDEE] rounded-[40px] z-0"></div>
            
            {/* 2. ORANGE BOX (Bottom Right) - Image sits "inside" this */}
            <div className="absolute -bottom-6 -right-6 w-[80%] h-[70%] bg-[#F48C06] rounded-[30px] z-0 opacity-80"></div>

            {/* 3. MAIN IMAGE - Touches the edges of the design logic */}
            <div className="relative z-10 rounded-[30px] overflow-hidden shadow-2xl bg-white">
              <img 
                src={teacherImg} 
                alt="Teacher in classroom" 
                className="w-full h-auto object-cover display-block"
              />
              
              {/* Play Button Overlay */}
              <button 
                onClick={() => setIsModalOpen(true)}
                className="absolute inset-0 flex items-center justify-center group bg-black/10 hover:bg-black/20 transition-all"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  <svg viewBox="0 0 24 24" fill="#23BDEE" className="w-8 h-8 ml-1">
                    <path d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <VideoModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ" 
      />
    </section>
  );
};

export default PhysicalClassroom;