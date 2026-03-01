import React from 'react';

const GradebookComponent = () => {
  const students = [
    { id: 1, name: 'Student 1', score: 100, color: 'bg-cyan-400', badgeColor: 'bg-cyan-100', img: 'https://i.pravatar.cc/150?u=1', top: '40%', left: '15%', hasStar: true },
    { id: 2, name: 'Student 2', score: 9, subScore: 8, color: 'bg-blue-500', badgeColor: 'bg-blue-100', img: 'https://i.pravatar.cc/150?u=2', top: '35%', left: '50%' },
    { id: 3, name: 'Student 3', score: 85, color: 'bg-green-400', badgeColor: 'bg-green-100', img: 'https://i.pravatar.cc/150?u=3', top: '65%', left: '35%' },
    { id: 4, name: 'Student 4', score: 75, color: 'bg-red-500', badgeColor: 'bg-red-100', img: 'https://i.pravatar.cc/150?u=4', top: '55%', left: '65%' },
  ];

  return (
    <div className="w-full min-h-screen bg-white flex items-center justify-center p-6 md:p-12 overflow-hidden">
      <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* LEFT SECTION: Text Content */}
        <div className="flex-1 max-w-lg order-2 lg:order-1">
          <h2 className="text-orange-500 text-3xl font-bold mb-2">Class Management</h2>
          <h1 className="text-5xl font-extrabold text-[#2D3162] mb-6">Tools for Educators</h1>
          <p className="text-gray-500 text-lg leading-relaxed">
            Class provides tools to help run and manage the class such as Class Roster, 
            Attendance, and more. With the Gradebook, teachers can review and grade 
            tests and quizzes in real-time.
          </p>
        </div>

        {/* RIGHT SECTION: Gradebook Visual */}
        <div className="flex-1 relative order-1 lg:order-2 w-full max-w-[650px]">
          
          {/* Decorative Background Elements */}
          <div className="absolute -top-10 -right-4 flex gap-2">
             <div className="w-8 h-8 bg-blue-300 rounded-full opacity-60"></div>
             <div className="w-4 h-4 bg-blue-300 rounded-full mt-6 opacity-40"></div>
          </div>
          <div className="absolute -bottom-10 -left-6 w-32 h-32 bg-blue-50 rounded-2xl -z-10 border-b-4 border-l-4 border-blue-100"></div>
          <div className="absolute -bottom-4 -left-10 text-blue-200 text-4xl font-light">≋</div>

          {/* Main White Board */}
          <div className="bg-white rounded-[2.5rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.12)] overflow-hidden relative border border-gray-50 pb-20">
            
            {/* Header Blue Bar */}
            <div className="bg-[#4AA8FF] py-4 text-center">
              <h3 className="text-white text-xl font-bold tracking-wide">GradeBook</h3>
            </div>

            {/* Content Area / Tracks */}
            <div className="relative h-[400px] w-full mt-4">
              
              {/* The Horizontal Colored Tracks */}
              <div className="absolute top-[45%] left-0 w-[35%] h-5 bg-cyan-400 rounded-r-full opacity-90"></div>
              <div className="absolute top-[40%] right-0 w-[45%] h-5 bg-blue-500 rounded-l-full opacity-90"></div>
              <div className="absolute top-[70%] left-0 w-[45%] h-5 bg-green-400 rounded-r-full opacity-90"></div>
              <div className="absolute top-[60%] right-0 w-[30%] h-5 bg-red-500 rounded-l-full opacity-90"></div>

              {/* Students & Scores */}
              {students.map((student) => (
                <div 
                  key={student.id}
                  className="absolute flex items-center transition-transform hover:scale-105"
                  style={{ top: student.top, left: student.left }}
                >
                  <div className="relative">
                    <img 
                      src={student.img} 
                      alt={student.name} 
                      className="w-16 h-16 rounded-full border-4 border-white shadow-lg z-10 relative object-cover" 
                    />
                    {student.hasStar && (
                      <div className="absolute -bottom-1 -right-1 bg-yellow-400 rounded-full w-6 h-6 flex items-center justify-center border-2 border-white z-20">
                        <span className="text-white text-[10px]">★</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Score Badge */}
                  <div className={`${student.badgeColor} ml-[-15px] pl-6 pr-4 py-2 rounded-full shadow-sm`}>
                    <p className={`font-bold text-lg ${student.color.replace('bg-', 'text-')}`}>
                      {student.score}
                    </p>
                    {student.subScore && (
                      <p className="text-[10px] text-center font-bold text-blue-800 -mt-1 opacity-60">
                        {student.subScore}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Floating Icons around the edges */}
            <div className="absolute top-10 -left-6 w-20 h-20 bg-white shadow-xl rounded-full flex items-center justify-center border border-gray-50 animate-bounce-slow">
               <span className="text-yellow-400 text-4xl">★</span>
            </div>
            
            <div className="absolute top-24 -right-6 w-16 h-16 bg-white shadow-xl rounded-full flex items-center justify-center border border-gray-50">
               <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white text-xs transform -rotate-12">
                 📖
               </div>
            </div>

            {/* Export Button */}
            <div className="absolute bottom-6 right-8">
              <button className="bg-[#5D5FEF] text-white px-10 py-3 rounded-2xl font-bold text-xl shadow-[0_10px_20px_-5px_rgba(93,95,239,0.5)] hover:bg-[#4b4dc7] transition-all">
                Export
              </button>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default GradebookComponent;