import React from 'react';

const IntegrationsComponent = () => {
  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center justify-center p-6 md:p-12 font-sans overflow-hidden">
      
      {/* Main Container */}
      <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">
        
        {/* LEFT SECTION: Logo Grid */}
        <div className="flex-1 w-full max-w-lg grid grid-cols-2 gap-y-20 gap-x-12 items-center justify-items-center">
          
          {/* OneDrive */}
          <div className="flex flex-col items-center gap-2">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Microsoft_Office_OneDrive_%282019%E2%80%93present%29.svg" 
              alt="OneDrive" 
              className="w-24 h-24"
            />
            <span className="text-[#2D3162] text-3xl font-bold tracking-tight">OneDrive</span>
          </div>

          {/* Dropbox */}
          <div className="flex flex-col items-center gap-2">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Dropbox_Icon.svg" 
              alt="Dropbox" 
              className="w-24 h-24"
            />
          </div>

          {/* Google Drive */}
          <div className="flex flex-col items-center gap-2">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/1/12/Google_Drive_icon_%282020%29.svg" 
              alt="Google Drive" 
              className="w-24 h-24"
            />
            <span className="text-gray-500 text-xl font-medium">Google Drive</span>
          </div>

          {/* Microsoft Teams */}
          <div className="flex flex-col items-center gap-2">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/c/c9/Microsoft_Office_Teams_%282018%E2%80%93present%29.svg" 
              alt="Microsoft Teams" 
              className="w-24 h-24"
            />
          </div>
          
        </div>

        {/* RIGHT SECTION: Content */}
        <div className="flex-1 max-w-xl text-left">
          
          {/* Subheader with Line */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-slate-300"></div>
            <span className="text-[#2D3162] text-sm font-bold tracking-[0.2em] uppercase">
              Integrations
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-[#2D3162] leading-tight mb-8">
            200+ educational tools and <br />
            platform <span className="text-orange-500">integrations</span>
          </h1>

          <p className="text-gray-500 text-lg md:text-xl leading-relaxed font-medium mb-12">
            Schoology has every tool your classroom needs and comes 
            pre-integrated with more than 200+ tools, student information 
            systems (SIS), and education platforms.
          </p>

          {/* Action Button */}
          <button className="px-10 py-4 rounded-full border-2 border-orange-200 text-orange-400 font-bold text-lg hover:bg-orange-50 transition-all shadow-sm active:scale-95">
            See All Integrations
          </button>
          
        </div>

      </div>
    </div>
  );
};

export default IntegrationsComponent;