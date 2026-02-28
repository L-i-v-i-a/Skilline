import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const VerifyOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Retrieve the email passed from the registration page state
  const email = location.state?.email || ""; 
  
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://skilline-backend.onrender.com/api/verify-otp/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          otp: otp
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("OTP Verified Successfully!");
        navigate('/login'); // Redirect to your login route
      } else {
        // If the API returns a 400 or other error
        setError(result.message || "Invalid OTP. Please check the code and try again.");
      }
    } catch (err) {
      // 'err' is now used in console.log to prevent the "unused variable" error
      console.error("Network Exception:", err);
      setError("A network error occurred. Please check your internet connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb] flex items-center justify-center px-4 font-sans">
      <div className="max-w-md w-full bg-white rounded-[40px] shadow-2xl p-10 md:p-14 relative overflow-hidden">
        
        {/* Decorative Background Element */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#F48C06]/10 rounded-full"></div>

        <div className="text-center relative z-10">
          {/* Icon Header */}
          <div className="w-20 h-20 bg-[#F48C06]/10 rounded-3xl flex items-center justify-center mx-auto mb-8 rotate-3">
            <svg className="w-10 h-10 text-[#F48C06] -rotate-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          <h2 className="text-3xl font-bold text-[#2F327D] mb-3">Verify It's You</h2>
          <p className="text-gray-500 mb-8 text-sm leading-relaxed">
            We’ve sent a 6-digit code to <br />
            <span className="font-semibold text-[#2F327D]">{email || "your registered email"}</span>
          </p>

          <form onSubmit={handleVerify} className="space-y-6">
            <div className="relative">
              <input
                type="text"
                maxLength="6"
                placeholder="000000"
                className={`w-full text-center text-3xl tracking-[0.5em] font-bold py-5 rounded-2xl border-2 transition-all outline-none
                  ${error ? 'border-red-400 bg-red-50 text-red-600' : 'border-gray-100 bg-gray-50/50 focus:border-[#F48C06] focus:bg-white text-[#2F327D]'}
                `}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              {error && (
                <p className="text-red-500 text-xs mt-3 font-medium animate-pulse">
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || otp.length < 6}
              className="w-full bg-[#2F327D] text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-blue-100 hover:bg-[#1e2050] hover:-translate-y-1 active:translate-y-0 transition-all disabled:opacity-50 disabled:translate-y-0"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verifying...
                </span>
              ) : "Verify Account"}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-50">
            <p className="text-gray-400 text-sm">
              Didn't receive the code?{' '}
              <button 
                type="button"
                className="text-[#F48C06] font-bold hover:underline ml-1"
                onClick={() => alert("Resend logic would go here")}
              >
                Resend OTP
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;