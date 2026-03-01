import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-[#252641] pt-16 pb-10 px-6 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* LOGO SECTION */}
        <div className="flex items-center gap-6 mb-12 animate-footer-slide-up">
          {/* Using your logo-shape.png asset */}
          <div className="relative w-14 h-14 flex items-center justify-center">
            <img 
              src="/assets/logo-shape.png" 
              alt="Logo Shape" 
              className="absolute inset-0 w-full h-full object-contain"
            />
            <span className="relative text-white font-bold text-lg z-10">Skilline</span>
          </div>
          
          {/* Vertical Divider Line */}
          <div className="w-[1px] h-12 bg-gray-600 hidden sm:block"></div>
          
          {/* Sub-text */}
          <div className="hidden sm:block text-left">
            <p className="text-white font-semibold text-lg leading-tight tracking-wide">
              Virtual Class <br /> for Zoom
            </p>
          </div>
        </div>

        {/* NEWSLETTER SECTION */}
        <div className="w-full max-w-xl text-center mb-16 animate-footer-fade-in">
          <h3 className="text-[#B2B3CF] text-2xl font-medium mb-8">
            Subscribe to get our Newsletter
          </h3>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
            <input 
              type="email" 
              placeholder="Your Email" 
              className="w-full bg-transparent border border-[#80819A] rounded-full px-8 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#545AE8] transition-all"
            />
            <button className="w-full sm:w-auto px-10 py-4 bg-[#545AE8] text-white font-bold rounded-full shadow-[0_10px_20px_rgba(84,90,232,0.3)] hover:bg-[#4349d6] transition-all active:scale-95">
              Subscribe
            </button>
          </div>
        </div>

        {/* BOTTOM NAVIGATION & COPYRIGHT */}
        <div className="flex flex-col items-center gap-6 w-full border-t border-gray-800 pt-10">
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 text-[#B2B3CF] font-medium text-sm">
            <a href="#" className="hover:text-white transition-colors">Careers</a>
            <span className="text-gray-700">|</span>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <span className="text-gray-700">|</span>
            <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
          </div>
          
          <p className="text-[#80819A] text-xs font-medium tracking-widest mt-2 uppercase">
            © 2021 Class Technologies Inc.
          </p>
        </div>

      </div>

      {/* Standard CSS Animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes footerSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes footerFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-footer-slide-up { animation: footerSlideUp 0.8s ease-out forwards; }
        .animate-footer-fade-in { animation: footerFadeIn 1.2s ease-in forwards; }
      `}} />
    </footer>
  );
};

export default Footer;