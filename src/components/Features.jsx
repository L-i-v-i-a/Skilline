import React from 'react';
import mockupBg from '../assets/image_56d8fa.png'; 

const Features = () => {
  return (
    <section className="py-24 bg-white overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-[#2F327D]">Our </span>
            <span className="text-[#F48C06]">Features</span>
          </h2>
          <p className="text-[#696984] text-lg max-w-2xl mx-auto">
            This very extraordinary feature, can make learning activities more efficient
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* LEFT SIDE: THE REFINED SMALLER COLLAGE */}
          <div className="relative w-full lg:w-[60%] flex justify-center lg:justify-start">
            
            {/* Background Ornaments */}
            <div className="absolute -top-8 -left-4 w-28 h-28 bg-[#33EFA0] rounded-full -z-10 opacity-90"></div>
            <div className="absolute top-4 left-32 w-5 h-5 bg-[#23BDEE] rounded-full"></div>
            <div className="absolute -bottom-8 left-[35%] w-28 h-28 border-[12px] border-[#2F327D] rounded-full -z-10"></div>

            {/* Browser Frame */}
            <div className="relative w-full max-w-[650px] aspect-[16/10] bg-white rounded-[40px] shadow-2xl border border-gray-50 overflow-visible">
              <img src={mockupBg} alt="" className="absolute inset-0 w-full h-full object-cover rounded-[40px] opacity-30" />

              {/* Browser Dots */}
              <div className="absolute top-6 left-8 flex gap-1.5 z-20">
                <div className="w-2.5 h-2.5 bg-[#FF6363] rounded-full"></div>
                <div className="w-2.5 h-2.5 bg-[#F48C06] rounded-full"></div>
                <div className="w-2.5 h-2.5 bg-[#33EFA0] rounded-full"></div>
              </div>

              {/* --- SMALLER PICTURE CARDS --- */}

              {/* 1. Instructor (Reduced to 32% width) */}
              <div className="absolute top-[22%] left-[8%] w-[32%] z-10">
                <div className="relative rounded-[20px] overflow-hidden shadow-xl border-[4px] border-white">
                  <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600" alt="Instructor" className="w-full h-auto" />
                  <div className="absolute bottom-3 left-3 bg-[#23BDEE]/90 text-white text-[8px] px-2 py-1 rounded-md font-semibold">
                    Instructor: Every Howard
                  </div>
                </div>
              </div>

              {/* 2. Tamara Clarke (Small) */}
              <div className="absolute top-[15%] left-[45%] w-[18%] z-20">
                <div className="relative rounded-[15px] overflow-hidden shadow-lg border-2 border-white">
                  <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400" alt="Student" className="w-full h-auto" />
                  <div className="absolute bottom-1.5 left-1.5 bg-black/30 text-white text-[7px] px-1.5 py-0.5 rounded">Tamara Clarke</div>
                </div>
              </div>

              {/* 3. Adam Levin (Small & Floating High) */}
              <div className="absolute -top-[2%] right-[12%] w-[20%] z-10">
                <div className="relative rounded-[18px] overflow-hidden shadow-xl border-2 border-white">
                  <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400" alt="Student" className="w-full h-auto" />
                  <div className="absolute bottom-2 left-2 bg-black/30 text-white text-[8px] px-1.5 py-0.5 rounded">Adam Levin</div>
                </div>
              </div>

              {/* 4. Humbert Holland (Small Center) */}
              <div className="absolute bottom-[15%] left-[44%] w-[20%] z-40">
                <div className="relative rounded-[15px] overflow-hidden shadow-lg border-2 border-white">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400" alt="Student" className="w-full h-auto" />
                  <div className="absolute bottom-1.5 left-1.5 bg-black/30 text-white text-[7px] px-1.5 py-0.5 rounded">Humbert Holland</div>
                </div>
                {/* Hand Icon (Scaled down) */}
                <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center border border-gray-50 z-50">
                  <span className="text-sm">✋</span>
                </div>
              </div>

              {/* 5. Patricia Mendoza (Small & Popping Bottom Right) */}
              <div className="absolute -bottom-[5%] right-[5%] w-[28%] z-50">
                <div className="relative rounded-[22px] overflow-hidden shadow-2xl border-[4px] border-white">
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600" alt="Student" className="w-full h-auto" />
                  <div className="absolute bottom-3 left-3 bg-black/40 text-white text-[9px] px-2 py-1 rounded-md">Patricia Mendoza</div>
                </div>
              </div>

              {/* Refined Action Buttons */}
              <div className="absolute bottom-8 left-8 flex gap-3 z-50">
                <button className="bg-[#4D76F4] text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg hover:brightness-110 transition-all">
                  Present
                </button>
                <button className="bg-[#F03E7D] text-white px-7 py-2.5 rounded-full text-sm font-bold shadow-lg flex items-center gap-2 hover:brightness-110 transition-all">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                  Call
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: LIST CONTENT */}
          <div className="w-full lg:w-[40%] space-y-10">
            <h3 className="text-3xl md:text-[38px] font-bold leading-tight text-[#2F327D]">
              A <span className="text-[#F48C06]">user interface</span> designed for the classroom
            </h3>
            
            <div className="space-y-8">
              {featuresData.map((f, i) => (
                <div key={i} className="flex items-start gap-5">
                  <div className="shrink-0 w-11 h-11 bg-white rounded-xl shadow-md flex items-center justify-center">
                    <div className={`w-3 h-3 ${f.color} rounded-sm ${f.shadow}`}></div>
                  </div>
                  <p className="text-[#696984] text-lg leading-relaxed">
                    {f.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const featuresData = [
  { color: "bg-[#23BDEE]", text: "Teachers don't get lost in the grid view and have a dedicated Podium space.", shadow: "" },
  { color: "bg-[#F48C06]", text: "TA's and presenters can be moved to the front of the class.", shadow: "shadow-[2px_2px_0px_#2F327D]" },
  { color: "bg-[#9D53F2]", text: "Teachers can easily see all students and class data at one time.", shadow: "" }
];

export default Features;