import React, { useState } from 'react';
import VideoModal from './VideoModal';
import studentImg from '../assets/student-hero.png';
import avatarImg from '../assets/avatar.png';

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="relative pt-16 pb-32 md:pt-20 lg:pt-28 lg:pb-52 overflow-hidden bg-[#FFF2E1]">
      <div className="w-full px-4 md:px-10 lg:px-16 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-0">
        
        {/* Left Content - Now sits lower without negative margin */}
        <div className="w-full lg:w-[45%] z-30 text-center lg:text-left">
          <h1 className="text-[36px] sm:text-[44px] md:text-[60px] xl:text-[70px] font-black leading-[1.1] tracking-tight">
            <span className="text-[#F48C06]">Studying</span> <span className="text-[#2F327D]">Online is now much easier</span>
          </h1>
          <p className="text-[#696984] mt-4 md:mt-6 text-lg md:text-2xl mx-auto lg:mx-0 max-w-lg leading-snug font-medium">
            Skillline is an interesting platform that will teach you in a more interactive way.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 md:gap-10 mt-8 md:mt-12">
            <button className="w-full sm:w-auto bg-[#F48C06] text-white px-10 py-4 md:py-5 rounded-full font-bold text-lg shadow-xl shadow-orange-100 hover:brightness-105 transition-all active:scale-95">
              Join for free
            </button>
            
            <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-4 group">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition duration-300">
                <svg viewBox="0 0 24 24" fill="#23BDEE" className="w-5 h-5 md:w-6 md:h-6 ml-1">
                  <path d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" />
                </svg>
              </div>
              <span className="font-bold text-[#252641] text-base md:text-lg">Watch how it works</span>
            </button>
          </div>
        </div>

        {/* Right Content: Student & Floating Glass Cards (Lowered positions) */}
        <div className="w-full lg:w-[55%] relative flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[320px] sm:max-w-[450px] md:max-w-[550px] lg:max-w-[680px]">
            {/* Main Image */}
            <img src={studentImg} alt="Student" className="w-full relative z-10 scale-105" />

            {/* Glass Card: 250k - Shifted down to top-[25%] */}
            <div className="absolute top-[25%] -left-4 sm:-left-8 md:-left-16 bg-white/40 backdrop-blur-md p-2 md:p-4 rounded-xl md:rounded-2xl shadow-xl flex items-center gap-2 md:gap-4 z-20 border border-white/30 animate-bounce-slow">
              <div className="bg-[#23BDEE] p-1.5 md:p-2 rounded-lg text-white">
                <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </div>
              <div>
                <p className="text-lg md:text-2xl font-black text-[#2F327D] leading-none">250k</p>
                <p className="text-[8px] md:text-[11px] text-[#2F327D]/70 font-bold mt-0.5 md:mt-1 uppercase tracking-tighter">Assisted Student</p>
              </div>
            </div>

            {/* Glass Card: Congratulations - Shifted down to top-[48%] */}
            <div className="absolute top-[48%] -right-4 sm:-right-6 md:-right-10 bg-white/40 backdrop-blur-md p-2 md:py-4 md:px-5 rounded-xl md:rounded-2xl shadow-xl flex items-center gap-2 md:gap-4 z-20 border border-white/30 animate-bounce-slow delay-700">
              <div className="bg-[#F48C06] p-1.5 md:p-2.5 rounded-lg text-white">
                <svg className="w-4 h-4 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
              </div>
              <div className="pr-4 md:pr-10">
                <p className="font-bold text-[#2F327D] text-sm md:text-lg leading-tight">Congratulations</p>
                <p className="text-[8px] md:text-xs text-[#2F327D]/70 font-medium">Your admission completed</p>
              </div>
              <div className="absolute right-2 md:right-4 bg-[#33EFA0] w-4 h-4 md:w-6 md:h-6 rounded-full flex items-center justify-center text-white text-[8px] md:text-[10px]">✓</div>
            </div>

            {/* Glass Card: User Experience - Kept at bottom */}
            <div className="absolute bottom-[2%] left-[2%] sm:left-[5%] bg-white/40 backdrop-blur-lg p-3 md:p-6 rounded-[20px] md:rounded-[35px] shadow-2xl w-[180px] sm:w-[240px] md:w-80 z-20 border border-white/40 animate-bounce-slow delay-300">
              <div className="flex items-center gap-2 md:gap-4 mb-3 md:mb-6">
                <div className="relative">
                  <img src={avatarImg} className="w-8 h-8 md:w-14 md:h-14 rounded-full border-2 border-white object-cover" alt="Instructor" />
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 md:w-4 md:h-4 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <div>
                  <p className="font-bold text-[#2F327D] text-xs md:text-lg leading-none">User Experience Class</p>
                  <p className="text-[8px] md:text-xs text-[#2F327D]/70 mt-1 font-medium">Today at 12.00 PM</p>
                </div>
              </div>
              <button className="w-full py-2 md:py-4 bg-[#F06292] text-white rounded-full font-bold text-xs md:text-lg hover:brightness-110 shadow-lg transition-all">
                Join Now
              </button>
            </div>

            {/* Graph Icon: Shifted down to top-[28%] away from headband */}
            <div className="absolute top-[28%] right-[10%] bg-[#F06292] p-2 md:p-3 rounded-lg md:rounded-xl shadow-lg z-20 flex flex-col items-center justify-center gap-0.5 md:gap-1 animate-pulse">
               <div className="flex items-end gap-0.5 md:gap-1 h-4 md:h-6 px-0.5 md:px-1">
                  <div className="w-0.5 md:w-1 bg-white/40 h-1 md:h-2 rounded-t-sm"></div>
                  <div className="w-0.5 md:w-1 bg-white h-3 md:h-4 rounded-t-sm"></div>
                  <div className="w-0.5 md:w-1 bg-white/60 h-2 md:h-3 rounded-t-sm"></div>
                  <div className="w-0.5 md:w-1 bg-white h-4 md:h-5 rounded-t-sm"></div>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Deep U-SHAPED CURVE */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] pointer-events-none">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-[120%] -ml-[10%] h-[100px] md:h-[180px] lg:h-[260px]">
          <path fill="#ffffff" d="M0,224 Q720,430 1440,224 L1440,320 L0,320 Z"></path>
        </svg>
      </div>

      <VideoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
        .delay-300 { animation-delay: 0.3s; }
        .delay-700 { animation-delay: 0.7s; }
        @media (min-width: 768px) {
          @keyframes bounce-slow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;