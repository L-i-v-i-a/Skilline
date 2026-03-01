import React from 'react';
import bgGrid from '../assets/bg.png';
import girlImg from '../assets/girl-image.png';

const TeacherToolsSection = () => {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden bg-white py-16 px-4 font-sans">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes pop-in {
          0% { transform: scale(0); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-pop { animation: pop-in 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
      `}</style>

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* --- LEFT CONTENT --- */}
        <div className="space-y-6 text-center lg:text-left">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight text-[#2F327D]">
            <span className="text-[#F48C06]">Tools</span> For Teachers <br />
            And Learners
          </h2>
          <p className="text-[#696984] text-lg max-w-lg leading-relaxed mx-auto lg:mx-0">
            Class has a dynamic set of teaching tools built to be deployed and used during class. 
            Teachers can handout assignments in real-time for students to complete and submit.
          </p>
        </div>

        {/* --- RIGHT IMAGE SECTION --- */}
        <div className="relative flex justify-center items-center py-10">
          
          {/* --- CONSTRAINED BACKGROUND GRID --- */}
          {/* This is now absolute to THIS container only */}
          <div 
            className="absolute w-[110%] h-[110%] z-0 opacity-40"
            style={{ 
              backgroundImage: `url(${bgGrid})`,
              backgroundSize: '200px', // Smaller grid for localized look
              backgroundRepeat: 'repeat',
              maskImage: 'radial-gradient(circle, black 40%, transparent 80%)', // Soft edges
              WebkitMaskImage: 'radial-gradient(circle, black 40%, transparent 80%)'
            }}
          />

          {/* RED CIRCLE */}
          <div className="absolute w-[280px] h-[280px] md:w-[380px] md:h-[380px] bg-[#FF5B5B] rounded-full animate-pop opacity-90 z-1" />

          {/* THE GIRL IMAGE */}
          <img 
            src={girlImg} 
            alt="Student"
            className="relative z-10 w-[300px] md:w-[420px] drop-shadow-xl"
          />

          {/* Floating UI Tool Icons */}
          <div className="absolute top-10 left-4 md:left-0 z-20 bg-white p-3 md:p-4 rounded-2xl shadow-xl animate-float">
             <div className="w-8 h-8 bg-[#6533FF]/20 rounded-lg flex items-center justify-center">
                <div className="w-5 h-5 bg-[#6533FF] rounded-sm" />
             </div>
          </div>

          <div className="absolute bottom-16 right-4 md:right-0 z-20 bg-white p-3 md:p-4 rounded-2xl shadow-xl animate-float" style={{ animationDelay: '1s' }}>
             <div className="w-8 h-8 bg-[#F48C06]/20 rounded-lg flex items-center justify-center">
                <div className="w-5 h-5 bg-[#F48C06] rounded-full" />
             </div>
          </div>

          {/* Colourful Dots */}
          <div className="absolute top-1/4 right-10 w-4 h-4 bg-[#33EFA0] rounded-full opacity-60 z-20" />
          <div className="absolute bottom-1/4 left-10 w-3 h-3 bg-[#6533FF] rounded-full opacity-40 z-20" />
        </div>
      </div>
    </section>
  );
};

export default TeacherToolsSection;