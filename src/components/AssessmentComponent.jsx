import React from 'react';

const AssessmentComponent = () => {
  return (
    <div className="w-full min-h-screen bg-white flex items-center justify-center p-4 md:p-12 overflow-hidden">
      {/* Main Container: 
          - justify-between pushes the card to the left and text to the right 
          - max-w-7xl ensures it doesn't spread too far on ultra-wide screens
      */}
      <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">
        
        {/* LEFT SECTION: Interactive Card */}
        <div className="relative flex-1 flex justify-start">
          
          {/* Background Indigo Circle */}
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-indigo-600 rounded-full opacity-80 z-0"></div>
          
          {/* Main Card */}
          <div className="relative z-10 bg-white rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] p-8 w-full max-w-[420px] border border-gray-50">
            
            {/* Question Label */}
            <div className="inline-block px-5 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm font-bold mb-6">
              Question 1
            </div>

            <h2 className="text-3xl font-bold text-slate-800 mb-8 leading-tight">
              True or false? This play takes place in Italy
            </h2>

            {/* City Image */}
            <div className="rounded-3xl overflow-hidden shadow-sm mb-4">
              <img 
                src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&q=80&w=800" 
                alt="Venice" 
                className="w-full h-52 object-cover"
              />
            </div>

            {/* Floating Action Buttons (X and Check) */}
            {/* Positioned the X slightly into the box as requested */}
            <div className="absolute top-12 -right-6 flex flex-col gap-4">
              <button className="w-12 h-12 bg-white shadow-xl rounded-full flex items-center justify-center text-pink-500 text-xl border border-gray-50 hover:scale-110 transition-transform">
                ✕
              </button>
              <button className="w-12 h-12 bg-white shadow-xl rounded-full flex items-center justify-center text-emerald-500 text-xl border border-gray-50 translate-x-4 hover:scale-110 transition-transform">
                ✓
              </button>
            </div>

            {/* Floating Success Toast (Bottom Right) */}
            <div className="absolute -bottom-8 -right-12 bg-white shadow-2xl rounded-2xl p-4 flex items-center gap-4 border border-gray-100 animate-float">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="whitespace-nowrap pr-4">
                <p className="text-emerald-600 font-bold text-sm leading-tight">Your answer was</p>
                <p className="text-emerald-600 font-bold text-sm leading-tight">sent successfully</p>
              </div>
            </div>
          </div>

          {/* Decorative Dots */}
          <div className="absolute top-0 right-1/4 w-4 h-4 bg-orange-400 rounded-full opacity-50"></div>
          <div className="absolute bottom-10 -right-4 w-3 h-3 bg-pink-400 rounded-full"></div>
          <div className="absolute -bottom-6 left-12 w-3 h-3 bg-emerald-400 rounded-full"></div>
        </div>

        {/* RIGHT SECTION: Typography */}
        <div className="flex-1 text-left max-w-xl">
          <h1 className="text-5xl md:text-6xl font-extrabold text-[#2D3162] leading-[1.1] mb-6">
            Assessments, <br />
            <span className="text-orange-500">Quizzes</span>, Tests
          </h1>
          <p className="text-gray-500 text-xl md:text-2xl leading-relaxed font-medium">
            Easily launch live assignments, quizzes, and tests. Student results are automatically entered in the online gradebook.
          </p>
        </div>

      </div>

      {/* Animation Logic */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default AssessmentComponent;