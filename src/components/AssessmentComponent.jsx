import React from 'react';

const AssessmentComponent = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-white p-8 gap-12 font-sans">
      
      {/* Left Side: Visual Card Container */}
      <div className="relative w-full max-w-md">
        
        {/* Decorative Background Circles */}
        <div className="absolute -top-10 -left-10 w-24 h-24 bg-indigo-500 rounded-full opacity-80 -z-10"></div>
        <div className="absolute top-0 right-20 w-4 h-4 bg-orange-400 rounded-full"></div>
        <div className="absolute bottom-20 -right-4 w-3 h-3 bg-pink-400 rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-3 h-3 bg-emerald-400 rounded-full"></div>

        {/* Main Quiz Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 border border-gray-50 relative overflow-hidden">
          <div className="inline-block px-4 py-1 bg-indigo-100 text-indigo-500 rounded-full text-sm font-semibold mb-6">
            Question 1
          </div>
          
          <h3 className="text-2xl font-bold text-slate-700 mb-6 leading-tight">
            True or false? This play takes place in Italy
          </h3>

          {/* Image Placeholder */}
          <div className="rounded-2xl overflow-hidden mb-4">
            <img 
              src="https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&q=80&w=600" 
              alt="Venice Italy" 
              className="w-full h-48 object-cover"
            />
          </div>

          {/* Floating Success Notification */}
          <div className="absolute -bottom-6 -right-6 md:-right-12 bg-white shadow-xl rounded-2xl p-4 flex items-center gap-3 border border-gray-100 animate-bounce-slow">
            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="text-emerald-600 font-bold text-sm leading-tight">Your answer was</p>
              <p className="text-emerald-600 font-bold text-sm leading-tight">sent successfully</p>
            </div>
          </div>

          {/* Floating Action Icons */}
          <div className="absolute top-10 -right-4 flex flex-col gap-3">
            <div className="w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center border border-gray-50">
              <span className="text-pink-500 text-xl font-bold">✕</span>
            </div>
            <div className="w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center border border-gray-50 translate-x-4">
              <span className="text-emerald-500 text-xl font-bold">✓</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Text Content */}
      <div className="max-w-md space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-indigo-900 leading-tight">
          Assessments, <br />
          <span className="text-orange-500">Quizzes</span>, Tests
        </h1>
        <p className="text-gray-500 text-lg leading-relaxed">
          Easily launch live assignments, quizzes, and tests. Student results are automatically entered in the online gradebook.
        </p>
      </div>

      {/* Custom Keyframe for the bounce animation */}
      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default AssessmentComponent;