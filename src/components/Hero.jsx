import React, { useState } from 'react';
import VideoModal from './VideoModal';
import studentImg from '../assets/student-hero.png';
import avatarImg from '../assets/avatar.png';

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="relative pt-32 pb-20 bg-[#FFF2E1]">
      <div className="container mx-auto px-6 md:px-16 flex flex-col md:flex-row items-center">
        
        {/* Left Content */}
        <div className="md:w-1/2 z-10">
          <h1 className="text-5xl md:text-7xl font-bold leading-[1.1]">
            <span className="text-[#F48C06] font-extrabold">Studying Online</span> 
            <br />
            <span className="text-[#2F327D]">is now much easier</span>
          </h1>
          <p className="text-gray-500 mt-8 text-xl max-w-md leading-relaxed">
            Skillline is an interesting platform that will teach you in a more interactive way.
          </p>
          
          <div className="flex items-center gap-8 mt-12">
            <button className="bg-[#F48C06] text-white px-10 py-5 rounded-full font-bold text-lg shadow-2xl hover:translate-y-[-2px] transition-all">
              Join for free
            </button>
            
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-4 group"
            >
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition text-[#24D1EC]">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 ml-1">
                  <path d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" />
                </svg>
              </div>
              <span className="font-semibold text-gray-700 text-lg">Watch how it works</span>
            </button>
          </div>
        </div>

        {/* Right Content: The Visuals */}
        <div className="md:w-1/2 relative mt-16 md:mt-0">
          <div className="relative">
            <img src={studentImg} alt="Student" className="w-full relative z-10" />

            {/* Floating Card: 250k */}
            <div className="absolute top-[10%] -left-10 bg-white/90 backdrop-blur p-4 rounded-2xl shadow-2xl flex items-center gap-4 z-20">
              <div className="bg-[#24D1EC] p-3 rounded-xl text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </div>
              <div>
                <p className="text-xl font-bold text-[#2F327D]">250k</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Assisted Student</p>
              </div>
            </div>

            {/* Floating Card: Congratulations */}
            <div className="absolute top-[40%] -right-10 bg-white/90 backdrop-blur p-4 rounded-2xl shadow-2xl flex items-center gap-4 z-20">
              <div className="bg-[#F48C06] p-3 rounded-xl text-white shadow-lg shadow-orange-200">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
              </div>
              <div>
                <p className="font-bold text-[#2F327D]">Congratulations</p>
                <p className="text-xs text-gray-400">Your admission completed</p>
              </div>
              <div className="bg-[#33EFA0] w-6 h-6 rounded-full flex items-center justify-center text-white ml-2">✓</div>
            </div>

            {/* Floating Card: Class Join */}
            <div className="absolute bottom-[10%] -left-8 bg-white/95 backdrop-blur-md p-5 rounded-3xl shadow-2xl w-72 z-20">
              <div className="flex items-center gap-4 mb-5">
                <img src={avatarImg} className="w-12 h-12 rounded-full object-cover" alt="Instructor" />
                <div>
                  <p className="font-bold text-[#2F327D]">User Experience Class</p>
                  <p className="text-xs text-gray-400 font-medium">Today at 12.00 PM</p>
                </div>
              </div>
              <button className="w-full py-3 bg-[#D8587E] text-white rounded-full font-bold shadow-lg shadow-pink-200 hover:bg-[#c44a6d] transition">
                Join Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* The Bottom Curve */}
      <div className="absolute bottom-[-2px] left-0 w-full overflow-hidden leading-[0]">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[120px] fill-white">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5,73.84-4.36,147.54,16.88,218.2,35.26,69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"></path>
        </svg>
      </div>

      <VideoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};

export default Hero;