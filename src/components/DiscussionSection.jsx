import React from 'react';

const DiscussionsSection = () => {
  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center justify-center p-6 md:p-12 overflow-hidden">
      
      {/* Main Content Wrapper */}
      <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-16">
        
        {/* LEFT SECTION: Layered Video Windows */}
        <div className="relative flex-1 flex justify-center lg:justify-start">
          
          {/* Decorative Blue Background Shape */}
          <div className="absolute -top-10 left-0 w-3/4 h-[80%] bg-blue-500 rounded-[2rem] opacity-90 -z-10 translate-x-[-10%]"></div>
          
          {/* Large Circle behind the windows */}
          <div className="absolute -top-16 right-1/4 w-32 h-32 border-[16px] border-cyan-400 rounded-full opacity-80"></div>
          
          {/* Background Window (Blurred/Faded) */}
          <div className="w-[500px] h-[320px] bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-100 overflow-hidden transform -translate-y-8 translate-x-4">
            <div className="flex gap-1.5 p-4 border-b border-gray-100">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            </div>
            <div className="grid grid-cols-3 gap-4 p-6 opacity-40">
              <div className="aspect-video bg-gray-200 rounded-xl"></div>
              <div className="aspect-video bg-gray-200 rounded-xl"></div>
              <div className="aspect-video bg-gray-200 rounded-xl"></div>
            </div>
          </div>

          {/* Foreground Window (Active Private Discussion) */}
          <div className="absolute top-20 left-10 md:left-20 w-full max-w-[480px] bg-white rounded-3xl shadow-2xl border border-gray-50 z-20">
            {/* Window Header */}
            <div className="flex gap-1.5 p-4">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            </div>

            {/* Video Feeds Container */}
            <div className="px-6 flex gap-4">
              {/* Teacher Feed */}
              <div className="relative flex-1">
                <img 
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300" 
                  alt="Teacher" 
                  className="w-full h-40 object-cover rounded-2xl shadow-inner"
                />
              </div>
              {/* Student Feed */}
              <div className="relative flex-1">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300" 
                  alt="Student" 
                  className="w-full h-40 object-cover rounded-2xl shadow-inner"
                />
                <div className="absolute bottom-2 left-2 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded flex items-center gap-1">
                  <span className="text-[8px] text-white font-medium">📶 Patricia Mendoza</span>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-6 flex items-center justify-between">
              <div>
                <h4 className="text-[#2D3162] font-bold text-lg">Private Discussion</h4>
                <p className="text-gray-400 text-xs">Your video can't be seen by others</p>
              </div>
              <button className="bg-[#F65D4E] hover:bg-[#e05245] text-white px-6 py-3 rounded-full font-bold text-sm shadow-lg shadow-red-200 transition-all">
                End Discussion
              </button>
            </div>

            {/* Floating People Icon */}
            <div className="absolute -top-6 -left-6 w-16 h-16 bg-white shadow-xl rounded-full flex items-center justify-center border border-gray-50">
               <div className="text-[#4AA8FF] text-2xl">👥</div>
            </div>
          </div>

          {/* Small Orange Decorative Triangle */}
          <div className="absolute top-1/4 -right-4 w-0 h-0 border-l-[12px] border-l-orange-400 border-y-[8px] border-y-transparent rotate-12"></div>
        </div>

        {/* RIGHT SECTION: Text Content */}
        <div className="flex-1 max-w-lg text-left">
          <h2 className="text-[#2D3162] text-3xl font-bold mb-2">One-on-One</h2>
          <h1 className="text-5xl font-extrabold text-orange-500 mb-8 leading-tight">Discussions</h1>
          <p className="text-gray-500 text-xl leading-relaxed">
            Teachers and teacher assistants can talk with students privately 
            without leaving the Zoom environment.
          </p>
        </div>
      </div>

      {/* BOTTOM SECTION: CTA Button */}
      <div className="mt-24">
        <button className="border-2 border-orange-400 text-orange-500 px-10 py-4 rounded-full font-bold text-lg hover:bg-orange-50 transition-colors">
          See more features
        </button>
      </div>

    </div>
  );
};

export default DiscussionsSection;