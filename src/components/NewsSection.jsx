import React from 'react';

const NewsSection = () => {
  const sideArticles = [
    {
      id: 1,
      tag: 'PRESS RELEASE',
      title: 'Class Technologies Inc. Closes $30 Million Series A Financing to Meet High Demand',
      desc: 'Class Technologies Inc., the company that created Class...',
      img: 'https://images.unsplash.com/photo-1580894732230-28299aeed791?auto=format&fit=crop&q=80&w=400',
    },
    {
      id: 2,
      tag: 'NEWS',
      title: "Zoom's earliest investors are betting millions on a better Zoom for schools",
      desc: 'Zoom was never created to be a consumer product. Nonetheless, the...',
      img: 'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?auto=format&fit=crop&q=80&w=400',
    },
    {
      id: 3,
      tag: 'NEWS',
      title: 'Former Blackboard CEO Raises $16M to Bring LMS Features to Zoom Classrooms',
      desc: 'This year, investors have reaped big financial returns from betting on Zoom...',
      img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=400',
    },
  ];

  return (
    <div className="w-full bg-white py-20 px-6 md:px-12 lg:px-24 font-sans overflow-hidden">
      {/* HEADER SECTION */}
      <div className="text-center mb-16 animate-fade-in-up">
        <h2 className="text-[#2D3162] text-4xl md:text-5xl font-extrabold mb-4">
          Latest News and Resources
        </h2>
        <p className="text-gray-400 text-lg md:text-xl font-medium">
          See the developments that have occurred to Skillines in the world!
        </p>
      </div>

      {/* MAIN GRID */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
        
        {/* LEFT: Featured Article */}
        <div className="flex-1 group cursor-pointer animate-slide-in-left">
          <div className="rounded-[2rem] overflow-hidden mb-6 shadow-sm aspect-[16/10]">
            <img 
              src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=1200" 
              alt="Main News" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>
          <div className="space-y-4">
            <span className="inline-block px-5 py-1 bg-[#F4C467] text-white text-xs font-bold rounded-full uppercase tracking-wider">
              NEWS
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-[#2D3162] leading-tight group-hover:text-orange-500 transition-colors duration-300">
              Class adds $30 million to its balance sheet for a Zoom–friendly edtech solution
            </h3>
            <p className="text-gray-400 text-lg leading-relaxed">
              Class, launched less than a year ago by Blackboard co-founder Michael Chasen, integrates exclusively...
            </p>
            <a href="#" className="inline-block text-gray-400 font-bold underline decoration-gray-300 underline-offset-8 hover:text-orange-500 transition-colors">
              Read more
            </a>
          </div>
        </div>

        {/* RIGHT: Article List */}
        <div className="flex-1 flex flex-col gap-10">
          {sideArticles.map((article, index) => (
            <div 
              key={article.id}
              className={`flex flex-col sm:flex-row gap-6 group cursor-pointer animate-slide-in-right`}
              style={{ animationDelay: `${(index + 1) * 200}ms`, animationFillMode: 'both' }}
            >
              {/* Image Container with Tag */}
              <div className="relative w-full sm:w-48 h-32 shrink-0 rounded-2xl overflow-hidden shadow-sm">
                <img 
                  src={article.img} 
                  alt={article.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <span className="absolute bottom-2 right-2 px-3 py-1 bg-[#F4C467] text-white text-[10px] font-extrabold rounded-md shadow-sm uppercase">
                  {article.tag}
                </span>
              </div>
              
              {/* Content */}
              <div className="flex flex-col justify-center flex-1">
                <h4 className="text-[#2D3162] font-bold text-lg mb-2 leading-snug group-hover:text-orange-500 transition-colors duration-300">
                  {article.title}
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {article.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CSS Animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-in-up { animation: fadeInUp 0.8s ease-out forwards; }
        .animate-slide-in-left { animation: slideInLeft 0.8s ease-out forwards; }
        .animate-slide-in-right { animation: slideInRight 0.8s ease-out forwards; }
      `}} />
    </div>
  );
};

export default NewsSection;