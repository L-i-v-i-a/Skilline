import React, { useState } from 'react';
import logoImg from '../assets/logo-shape.png'; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-skill-bg/90 backdrop-blur-md py-4 transition-all duration-300">
      <div className="container mx-auto px-6 md:px-16 flex items-center justify-between">
        
        {/* Layered Logo: Text on top of Shape */}
        <div className="flex items-center relative group cursor-pointer">
          {/* The Blue Diamond Shape */}
          <img 
            src={logoImg} 
            alt="Shape" 
            className="h-10 md:h-12 w-auto object-contain transition-transform group-hover:scale-105" 
          />
          {/* The Text overlapping the shape */}
          <span className="text-2xl md:text-3xl font-bold text-skill-blue absolute left-2 md:left-3 tracking-tight">
            Skilline
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-12 font-medium text-skill-blue/80">
          <a href="#" className="hover:text-skill-orange transition-colors">Home</a>
          <a href="#" className="hover:text-skill-orange transition-colors">Careers</a>
          <a href="#" className="hover:text-skill-orange transition-colors">Blog</a>
          <a href="#" className="hover:text-skill-orange transition-colors">About Us</a>
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <button className="px-9 py-3 bg-white text-gray-600 rounded-full shadow-sm font-semibold hover:bg-gray-50 transition-all">
            Login
          </button>
          <button className="px-9 py-3 bg-skill-orange text-white rounded-full font-bold shadow-lg shadow-orange-200 hover:brightness-110 active:scale-95 transition-all">
            Sign Up
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-skill-blue focus:outline-none"
          aria-label="Toggle Menu"
        >
          <div className="w-7 h-5 relative flex flex-col justify-between">
            <span className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
            <span className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile Drawer (v4 transition style) */}
      <div className={`lg:hidden fixed inset-0 top-[72px] bg-white z-40 transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col items-center p-8 gap-8 text-xl font-bold text-skill-blue">
          <a href="#" onClick={() => setIsOpen(false)} className="active:text-skill-orange">Home</a>
          <a href="#" onClick={() => setIsOpen(false)} className="active:text-skill-orange">Careers</a>
          <a href="#" onClick={() => setIsOpen(false)} className="active:text-skill-orange">Blog</a>
          <a href="#" onClick={() => setIsOpen(false)} className="active:text-skill-orange">About Us</a>
          <div className="w-full h-px bg-gray-100 my-2" />
          <button className="w-full py-4 bg-gray-50 rounded-2xl text-gray-500">Login</button>
          <button className="w-full py-4 bg-skill-orange text-white rounded-2xl">Sign Up</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;