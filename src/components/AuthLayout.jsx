import React from 'react';
import { Link } from 'react-router-dom';

export default function AuthLayout({ children, title, subtitle, linkText, linkTo, linkLabel }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-orange-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
          {subtitle && <p className="mt-2 text-sm text-gray-600">{subtitle}</p>}
        </div>

        {children}

        {linkText && linkTo && (
          <div className="text-center text-sm">
            <span className="text-gray-600">{linkText} </span>
            <Link to={linkTo} className="font-medium text-accent-blue hover:text-blue-700">
              {linkLabel}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}