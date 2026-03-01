import React from 'react';
import { Link } from 'react-router-dom';

export default function AuthLayout({ children, title, subtitle, linkText, linkTo, linkLabel }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background Decorative Blobs - matching the Assessment section style */}
      <div className="absolute top-[-10%] left-[-5%] w-72 h-72 bg-blue-100 rounded-full blur-[100px] opacity-60"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-orange-100 rounded-full blur-[100px] opacity-60"></div>

      <div className="max-w-md w-full z-10">
        {/* Brand Logo Header */}
        <div className="flex flex-col items-center mb-10 animate-fade-down">
          <div className="relative w-14 h-14 flex items-center justify-center mb-4">
            <img 
              src="/assets/logo-shape.png" 
              alt="Skilline Logo" 
              className="absolute inset-0 w-full h-full object-contain"
            />
            <span className="relative text-white font-black text-[10px] uppercase tracking-tighter z-10">
              Skilline
            </span>
          </div>
        </div>

        {/* Auth Card */}
        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-50 animate-zoom-in">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-[#2D3162] tracking-tight leading-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-3 text-gray-400 font-medium text-sm">
                {subtitle}
              </p>
            )}
          </div>

          {/* Form Content */}
          <div className="space-y-5">
            {children}
          </div>

          {/* Bottom Link */}
          {linkText && linkTo && (
            <div className="mt-10 pt-6 border-t border-gray-50 text-center">
              <span className="text-gray-400 text-sm font-medium">{linkText} </span>
              <Link 
                to={linkTo} 
                className="text-sm font-bold text-[#F97316] hover:text-orange-600 transition-colors underline underline-offset-4 decoration-orange-200"
              >
                {linkLabel}
              </Link>
            </div>
          )}
        </div>

        {/* Footer Attribution */}
        <p className="text-center mt-8 text-gray-300 text-[10px] font-bold uppercase tracking-[0.2em]">
          © 2021 Class Technologies Inc.
        </p>
      </div>

      {/* Internal CSS for simple entrance animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes zoomIn {
          from { opacity: 0; transform: scale(0.97); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-down { animation: fadeDown 0.7s ease-out forwards; }
        .animate-zoom-in { animation: zoomIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}} />
    </div>
  );
}