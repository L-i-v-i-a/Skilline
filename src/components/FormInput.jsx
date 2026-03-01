import React from 'react';

export default function FormInput({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required = false,
  error,
  ...props
}) {
  return (
    <div className="w-full">
      {/* Label - Using the Skilline Navy for better hierarchy */}
      <label 
        htmlFor={name} 
        className="block text-sm font-bold text-[#2D3162] mb-2 ml-1"
      >
        {label} {required && <span className="text-orange-500">*</span>}
      </label>

      <div className="relative">
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`
            appearance-none block w-full px-6 py-4 
            border-2 rounded-full shadow-sm text-gray-700
            placeholder:text-gray-400 placeholder:font-medium
            transition-all duration-300 focus:outline-none
            ${error 
              ? 'border-red-400 focus:border-red-500 bg-red-50/30' 
              : 'border-[#E2E8F0] focus:border-[#F97316] bg-white focus:shadow-[0_0_0_4px_rgba(249,115,22,0.1)]'
            }
          `}
          {...props}
        />

        {/* Error Message */}
        {error && (
          <p className="mt-2 ml-4 text-xs font-bold text-red-500 animate-fade-in">
            {error}
          </p>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
      `}} />
    </div>
  );
}