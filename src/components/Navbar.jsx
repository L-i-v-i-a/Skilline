import React from 'react';
import logoImg from '../assets/logo-shape.png'; 

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#FFF2E1]/90 backdrop-blur-md py-5">
      <div className="container mx-auto px-6 md:px-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={logoImg} alt="Shape Logo" className="h-8 w-auto" />
          <span className="text-2xl font-bold text-[#2F327D]">Skilline</span>
        </div>

        <div className="hidden md:flex gap-12 text-[#2F327D] font-medium">
          <a href="#" className="hover:text-[#F48C06] transition">Home</a>
          <a href="#" className="hover:text-[#F48C06] transition">Careers</a>
          <a href="#" className="hover:text-[#F48C06] transition">Blog</a>
          <a href="#" className="hover:text-[#F48C06] transition">About Us</a>
        </div>

        <div className="flex gap-4">
          <button className="px-8 py-3 bg-white text-gray-700 rounded-full shadow-md font-medium hover:bg-gray-50 transition">Login</button>
          <button className="px-8 py-3 bg-[#F48C06] text-white rounded-full font-bold shadow-lg shadow-orange-200 hover:bg-orange-600 transition">Sign Up</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;