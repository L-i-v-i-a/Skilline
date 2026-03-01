import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthLayout from '../components/AuthLayout';
import FormInput from '../components/FormInput';
import Button from '../components/Button';

const API_BASE = 'https://skilline-backend.onrender.com/api'; 

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 1. Authenticate and get tokens
      const res = await axios.post(`${API_BASE}/login/`, {
        username: formData.username,
        password: formData.password,
      });

      const { access, refresh } = res.data;
      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);

      // 2. Fetch the profile immediately to check the ROLE
      const profileRes = await axios.get(`${API_BASE}/profile/`, {
        headers: { Authorization: `Bearer ${access}` }
      });

      const userRole = profileRes.data.role; // 'student' or 'instructor'

      // 3. Conditional Navigation
      if (userRole === 'instructor') {
        navigate('/instructor/dashboard');
      } else {
        navigate('/student/dashboard');
      }

    } catch (err) {
      console.error("Login error details:", err);
      const errMsg = err.response?.data?.detail || 'Login failed. Please check your credentials.';
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to your Skilline account"
      linkText="Don't have an account?"
      linkTo="/register-page"
      linkLabel="Create one"
    >
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-lg text-red-700 text-sm font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <FormInput
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Enter your username"
          required
        />

        <FormInput
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••••"
          required
        />

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center cursor-pointer">
            <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
            <span className="ml-2 text-gray-600">Remember me</span>
          </label>
          <a href="/forgot-password" className="text-indigo-600 hover:text-indigo-700 font-bold">
            Forgot password?
          </a>
        </div>

        <Button type="submit" loading={loading} className="w-full py-4 bg-[#2D3162] hover:bg-black text-white rounded-2xl font-bold transition-all">
          Sign In
        </Button>
      </form>
    </AuthLayout>
  );
}