import React from 'react';

const TestimonialComponent = () => {
  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center justify-center p-6 md:p-12 font-sans overflow-hidden">
      
      {/* Main Flex Wrapper */}
      <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">
        
        {/* LEFT SECTION: Text Content */}
        <div className="flex-1 max-w-xl text-left order-2 lg:order-1">
          
          {/* Section Header with Line */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-slate-300"></div>
            <span className="text-[#2D3162] text-sm font-bold tracking-[0.2em] uppercase opacity-60">
              Testimonial
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-[#2D3162] leading-tight mb-8">
            What They Say?
          </h1>

          <div className="space-y-6 text-gray-400 text-lg md:text-xl leading-relaxed font-medium mb-12">
            <p>
              Skilline has got more than 100k positive ratings from our users around the world.
            </p>
            <p>
              Some of the students and teachers were greatly helped by the Skilline.
            </p>
            <p>
              Are you too? Please give your assessment
            </p>
          </div>

          {/* Action Button with Arrow */}
          <button className="group flex items-center justify-between pl-8 pr-2 py-2 rounded-full border border-orange-400 text-orange-400 font-bold text-lg hover:bg-orange-50 transition-all min-w-[280px]">
            Write your assessment
            <div className="w-12 h-12 rounded-full border border-orange-400 flex items-center justify-center ml-4 group-hover:bg-orange-400 group-hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </button>
        </div>

        {/* RIGHT SECTION: Overlapping Image Cards */}
        <div className="flex-1 relative order-1 lg:order-2 w-full max-w-[550px] flex justify-center lg:justify-end">
          
          {/* Main Profile Image Container */}
          <div className="relative w-full max-w-[420px] aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=800" 
              alt="Testimonial User" 
              className="w-full h-full object-cover"
            />
            
            {/* Floating Navigation Arrow */}
            <button className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-[#4AA8FF] shadow-xl hover:scale-110 transition-transform z-30">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Overlapping Review Card */}
          <div className="absolute -bottom-10 left-[-20px] md:left-[-40px] z-40 bg-white rounded-3xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] p-8 w-full max-w-[480px] border-l-[12px] border-[#F65D4E]">
            
            <div className="relative pl-6">
              {/* Divider Line */}
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-slate-200"></div>
              
              <p className="text-gray-400 text-lg leading-relaxed italic mb-8">
                "Thank you so much for your help. It's exactly what I've been looking for. You won't regret it. It really saves me time and effort. Skilline is exactly what our business has been lacking."
              </p>
              
              <div className="flex items-center justify-between">
                <h4 className="text-[#2D3162] font-bold text-xl">Gloria Rose</h4>
                
                {/* Star Rating Section */}
                <div className="text-right">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-400 text-sm font-bold tracking-tighter">12 reviews at Yelp</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TestimonialComponent;