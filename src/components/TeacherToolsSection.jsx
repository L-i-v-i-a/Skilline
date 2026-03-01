import React from 'react';

const TeacherToolsSection = () => {
  return (
    <section className="relative min-h-[700px] flex items-center justify-center overflow-hidden bg-white py-20 px-4 font-sans">
      {/* CSS Keyframes for the floating effects */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes scale-in {
          0% { transform: scale(0); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-float-slow { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 5s ease-in-out infinite; }
        .animate-pop { animation: scale-in 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
      `}</style>

      {/* --- BACKGROUND DECORATIONS --- */}
      {/* Dot Grid Background (Your image_1ffe46.png) */}
      <div 
        className="absolute inset-0 z-0 opacity-20"
        style={{ 
          backgroundImage: `url('/src/assets/image_1ffe46.png')`,
          backgroundSize: '450px',
          backgroundRepeat: 'repeat'
        }}
      />

      {/* Colourful Floating Circles from the background of your upload */}
      <div className="absolute top-[15%] right-[10%] w-5 h-5 bg-[#33EFA0] rounded-full animate-float-slow" />
      <div className="absolute bottom-[20%] left-[15%] w-10 h-10 bg-[#F48C06] rounded-full opacity-40 animate-float" />
      <div className="absolute bottom-[15%] right-[25%] w-4 h-4 bg-[#6533FF] rounded-full animate-float-delayed" />
      <div className="absolute top-[40%] left-[10%] w-3 h-3 bg-[#33EFA0] rounded-full opacity-50 animate-float-slow" />

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* --- LEFT CONTENT --- */}
        <div className="space-y-6 text-center lg:text-left transition-all duration-1000">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#2F327D]">
            <span className="text-[#F48C06]">Tools</span> For Teachers <br />
            And Learners
          </h2>
          <p className="text-[#696984] text-lg md:text-xl max-w-lg leading-relaxed mx-auto lg:mx-0">
            Class has a dynamic set of teaching tools built to be deployed and used during class. 
            Teachers can handout assignments in real-time for students to complete and submit.
          </p>
        </div>

        {/* --- RIGHT IMAGE SECTION --- */}
        <div className="relative flex justify-center items-center">
          
          {/* Main Red Circle behind the girl (from your image) */}
          <div className="absolute w-[320px] h-[320px] md:w-[450px] md:h-[450px] bg-[#FF5B5B] rounded-full animate-pop" />

          {/* The Girl Image */}
          <img 
            src="/src/assets/girl-image.png" 
            alt="Student Learning"
            className="relative z-10 w-[350px] md:w-[500px] drop-shadow-2xl transition-transform duration-700 hover:scale-105"
          />

          {/* Floating Tool Icons (The white squares in your image) */}
          {/* Top Left Icon */}
          <div className="absolute top-12 left-0 md:-left-8 z-20 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white animate-float">
            <div className="w-10 h-10 bg-[#6533FF]/10 rounded-xl flex items-center justify-center">
              <div className="w-6 h-6 bg-[#6533FF] rounded-md rotate-12" />
            </div>
          </div>

          {/* Bottom Right Icon */}
          <div className="absolute bottom-24 -right-4 md:-right-10 z-20 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white animate-float-delayed">
            <div className="w-10 h-10 bg-[#F48C06]/10 rounded-xl flex items-center justify-center">
              <div className="w-6 h-2 bg-[#F48C06] rounded-full mb-1" />
              <div className="w-4 h-2 bg-[#F48C06] rounded-full opacity-50" />
            </div>
          </div>

          {/* Small accent circles near the icons */}
          <div className="absolute top-1/4 right-0 w-4 h-4 bg-[#33EFA0] rounded-full animate-pulse" />
          <div className="absolute bottom-1/3 left-0 w-3 h-3 bg-[#6533FF] rounded-full animate-bounce" />

        </div>
      </div>
    </section>
  );
};

export default TeacherToolsSection;