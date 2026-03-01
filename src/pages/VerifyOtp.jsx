import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthLayout from '../components/AuthLayout';
import Button from '../components/Button';

const API_BASE = 'https://skilline-backend.onrender.com/api';

export default function VerifyOTP() {
  const location = useLocation();
  const navigate = useNavigate();

  // Email is kept in state but not necessarily shown as an editable field
  const [email] = useState(location.state?.email || '');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Email is sent to the API behind the scenes
      await axios.post(`${API_BASE}/verify-otp/`, { email, otp });
      setSuccess('Email verified successfully! Redirecting to login...');
      setTimeout(() => navigate('/login'), 1800);
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid or expired OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Verify Your Email"
      subtitle={email ? `We've sent a 6-digit code to ${email}` : "Enter the 6-digit code sent to your email"}
    >
      {/* Success Alert */}
      {success && (
        <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6 rounded-r-2xl text-green-800 text-sm font-medium animate-fade-in">
          {success}
        </div>
      )}

      {/* Error Alert */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 rounded-r-2xl text-red-800 text-sm font-medium animate-fade-in">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Hidden Email Field (still part of form for accessibility/browsers) */}
        <input type="hidden" value={email} />

        <div className="text-center">
          <label className="block text-sm font-bold text-[#2D3162] mb-4 uppercase tracking-widest">
            Verification Code
          </label>
          <input
            type="text"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
            placeholder="000000"
            className="w-full px-6 py-5 text-center text-4xl tracking-[0.3em] font-bold text-[#2D3162] border-2 border-[#E2E8F0] rounded-full focus:outline-none focus:border-[#F97316] transition-all bg-slate-50 focus:bg-white placeholder:text-slate-200"
            required
            autoFocus
          />
        </div>

        <Button type="submit" loading={loading}>
          Verify Now
        </Button>

        <div className="text-center pt-2">
          <p className="text-gray-400 font-medium text-sm">
            Didn't receive the code?{' '}
            <button
              type="button"
              className="text-[#F97316] hover:text-orange-600 font-bold transition-colors underline underline-offset-4 decoration-orange-200"
              onClick={() => alert('Code resent!')}
            >
              Resend Code
            </button>
          </p>
        </div>
      </form>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
      `}} />
    </AuthLayout>
  );
}