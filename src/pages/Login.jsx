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
      const res = await axios.post(`${API_BASE}/login/`, {
        username: formData.username,
        password: formData.password,
      });

      const { access, refresh } = res.data;
      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);

      // Optional: decode token to get role and redirect accordingly
      // For simplicity we just go to dashboard/home
      navigate('/dashboard'); // ← change to your protected route

    } catch (err) {
      const errMsg = err.response?.data?.detail || 'Login failed. Please check your credentials.';
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to your Educator account"
      linkText="Don't have an account?"
      linkTo="/register/student"
      linkLabel="Create one"
    >
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-lg text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <FormInput
          label="Username or Email"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Enter your username or email"
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
          <label className="flex items-center">
            <input type="checkbox" className="h-4 w-4 text-accent-blue focus:ring-accent-blue border-gray-300 rounded" />
            <span className="ml-2 text-gray-600">Remember me</span>
          </label>
          <a href="/forgot-password" className="text-accent-blue hover:text-blue-700 font-medium">
            Forgot password?
          </a>
        </div>

        <Button type="submit" loading={loading}>
          Sign In
        </Button>
      </form>
    </AuthLayout>
  );
}