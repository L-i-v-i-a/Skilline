import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthLayout from '../components/AuthLayout';
import FormInput from '../components/FormInput';
import Button from '../components/Button';

const API_BASE = 'https://skilline-backend.onrender.com/api';

export default function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve email from navigation state
  const [email] = useState(location.state?.email || '');
  const [formData, setFormData] = useState({
    otp: '',
    password: '',
    password2: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.password2) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      await axios.post(`${API_BASE}/reset-password/`, {
        email,
        otp: formData.otp,
        password: formData.password,
        password2: formData.password2
      });

      setSuccess('Password reset successfully! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid OTP or session expired.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create New Password"
      subtitle={email ? `Enter the code sent to ${email}` : "Reset your account password"}
    >
      {success && (
        <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6 rounded-r-2xl text-green-800 text-sm font-medium animate-fade-in">
          {success}
        </div>
      )}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 rounded-r-2xl text-red-800 text-sm font-medium animate-fade-in">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5 mt-4">
        {/* Hidden Email Field sent to API */}
        <input type="hidden" name="email" value={email} />

        <div className="text-center pb-2">
          <label className="block text-xs font-bold text-[#2D3162] mb-3 uppercase tracking-widest">
            6-Digit OTP Code
          </label>
          <input
            type="text"
            name="otp"
            maxLength={6}
            value={formData.otp}
            onChange={(e) => setFormData({...formData, otp: e.target.value.replace(/\D/g, '')})}
            placeholder="000000"
            className="w-full px-6 py-4 text-center text-3xl tracking-[0.4em] font-bold text-[#2D3162] border-2 border-[#E2E8F0] rounded-full focus:outline-none focus:border-[#F97316] bg-slate-50 transition-all placeholder:text-slate-200"
            required
          />
        </div>

        <FormInput
          label="New Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••••"
          required
        />

        <FormInput
          label="Confirm New Password"
          type="password"
          name="password2"
          value={formData.password2}
          onChange={handleChange}
          placeholder="••••••••"
          required
        />

        <div className="pt-4">
          <Button type="submit" loading={loading}>
            Reset Password
          </Button>
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