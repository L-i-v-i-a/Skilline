import React, { useState, useEffect } from 'react';
import logoImg from '../assets/logo-shape.png'; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
      scrolled ? 'bg-white/95 shadow-lg py-3 backdrop-blur-md' : 'bg-transparent py-6'
    }`}>
      <div className="w-full px-6 md:px-10 lg:px-12 flex items-center">
        
        {/* 1. Logo stays on the far left */}
        <div className="flex items-center relative z-10 cursor-pointer group">
          <div className="relative flex items-center">
            <img 
              src={logoImg} 
              alt="Logo Shape" 
              className="h-10 w-10 md:h-11 md:w-11 object-contain" 
            />
            <span className="absolute left-2.5 md:left-3 text-2xl md:text-3xl font-bold text-skill-blue tracking-tighter whitespace-nowrap">
              Skillline
            </span>
          </div>
        </div>

        {/* 2. Grouped Links and Buttons pushed to the right */}
        <div className="hidden lg:flex items-center ml-auto gap-x-12 xl:gap-x-16">
          
          {/* Nav Links closer to the buttons */}
          <div className="flex items-center gap-x-8 xl:gap-x-12 font-medium text-skill-blue/90">
            {['Home', 'Careers', 'Blog', 'About Us'].map((link) => (
              <a 
                key={link} 
                href={`#${link.toLowerCase().replace(' ', '')}`} 
                className="hover:text-skill-orange transition-colors"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button className="px-9 py-3 bg-white text-gray-500 rounded-full shadow-sm font-semibold hover:shadow-md transition-all">
              Login
            </button>
            <button className="px-9 py-3 bg-skill-orange text-white rounded-full font-bold shadow-lg shadow-orange-200 hover:brightness-110 active:scale-95 transition-all">
              Sign Up
            </button>
          </div>
        </div>

        {/* 3. Mobile Hamburger stays on the right */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden ml-auto relative z-50 p-2 text-skill-blue"
        >
          <div className="w-6 h-5 flex flex-col justify-between items-end">
            <span className={`h-0.5 bg-current rounded-full transition-all duration-300 ${isOpen ? 'w-6 rotate-45 translate-y-2' : 'w-6'}`} />
            <span className={`h-0.5 bg-current rounded-full transition-all duration-300 ${isOpen ? 'opacity-0' : 'w-4'}`} />
            <span className={`h-0.5 bg-current rounded-full transition-all duration-300 ${isOpen ? 'w-6 -rotate-45 -translate-y-2' : 'w-5'}`} />
          </div>
        </button>
      </div>

      {/* Mobile Drawer remains the same */}
      <div className={`lg:hidden fixed inset-0 bg-white z-40 transition-all duration-500 ${
        isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}>
        <div className="flex flex-col items-center justify-center h-full px-8 gap-8 text-2xl font-bold text-skill-blue">
          <a href="#" onClick={() => setIsOpen(false)}>Home</a>
          <a href="#" onClick={() => setIsOpen(false)}>Careers</a>
          <a href="#" onClick={() => setIsOpen(false)}>Blog</a>
          <a href="#" onClick={() => setIsOpen(false)}>About Us</a>
          <div className="flex flex-col w-full max-w-xs gap-4 mt-4">
            <button className="w-full py-4 bg-gray-50 text-gray-400 rounded-2xl">Login</button>
            <button className="w-full py-4 bg-skill-orange text-white rounded-2xl">Sign Up</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;