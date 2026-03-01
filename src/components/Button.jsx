import React from 'react';

export default function Button({ 
  children, 
  type = "button", 
  loading = false, 
  disabled, 
  className = "", 
  ...props 
}) {
  // Skilline Brand Colors
  const baseBg = "bg-[#F97316]"; // The vibrant orange from your design
  const hoverBg = "hover:bg-[#ea580c]";
  const shadowEffect = "shadow-[0_10px_25px_-5px_rgba(249,115,22,0.4)]";

  return (
    <button
      type={type}
      disabled={loading || disabled}
      className={`
        w-full flex justify-center items-center py-4 px-8 
        border-none rounded-full text-white font-bold text-lg
        transition-all duration-300 active:scale-95
        ${loading || disabled 
          ? 'bg-gray-300 cursor-not-allowed shadow-none' 
          : `${baseBg} ${hoverBg} ${shadowEffect} hover:-translate-y-0.5`}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <div className="flex items-center">
          <svg 
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            ></circle>
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            ></path>
          </svg>
          <span className="tracking-wide">Processing...</span>
        </div>
      ) : (
        <span className="tracking-wide">{children}</span>
      )}
    </button>
  );
}