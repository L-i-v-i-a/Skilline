import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import FormInput from '../components/FormInput';
import Button from '../components/Button';

const API_BASE = 'https://skilline-backend.onrender.com/api';

export default function RegisterStudent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    matric_number: '',
    major: '',
    date_of_birth: '',
    address: '',
    bio: '',
  });
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  const validateForm = () => {
    if (!formData.username.trim()) return 'Username is required';
    if (!formData.email.trim()) return 'Email is required';
    if (!formData.first_name.trim()) return 'First name is required';
    if (!formData.last_name.trim()) return 'Last name is required';
    if (!formData.password.trim()) return 'Password is required';
    if (!formData.password2.trim()) return 'Confirm password is required';
    if (!formData.matric_number.trim()) return 'Matric / Registration Number is required';
    if (formData.password !== formData.password2) return 'Passwords do not match';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) return 'Please enter a valid email address';

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    const formDataToSend = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (value && value.trim && value.trim() !== '') {
        formDataToSend.append(key, value.trim());
      } else if (value) {
        formDataToSend.append(key, value);
      }
    });

    if (profileImage) {
      formDataToSend.append('profile_image', profileImage);
    }

    try {
      const response = await fetch(`${API_BASE}/register/student/`, {
        method: 'POST',
        body: formDataToSend,
        mode: 'cors',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Error ${response.status}`);
      }

      setSuccess('Account created successfully! Check your email for OTP.');
      setTimeout(() => {
        navigate('/verify-otp', { state: { email: formData.email } });
      }, 2200);
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Student Registration"
      subtitle="Join our learning platform as a student"
      linkText="Already registered?"
      linkTo="/login"
      linkLabel="Sign in"
    >
      {/* Alert Messages */}
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

      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        
        {/* Row 1: Names */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput label="First Name" name="first_name" value={formData.first_name} onChange={handleChange} required placeholder="John" />
          <FormInput label="Last Name" name="last_name" value={formData.last_name} onChange={handleChange} required placeholder="Doe" />
        </div>

        {/* Row 2: Contact & Identity */}
        <FormInput label="Email Address" type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="john@example.com" />
        <FormInput label="Username" name="username" value={formData.username} onChange={handleChange} required placeholder="johndoe123" />

        {/* Row 3: Security */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput label="Password" type="password" name="password" value={formData.password} onChange={handleChange} required placeholder="••••••••" />
          <FormInput label="Confirm" type="password" name="password2" value={formData.password2} onChange={handleChange} required placeholder="••••••••" />
        </div>

        {/* Row 4: Academic Info */}
        <FormInput
          label="Matric / Reg Number"
          name="matric_number"
          value={formData.matric_number}
          onChange={handleChange}
          placeholder="2023/123456"
          required
        />
        <FormInput label="Course of Study" name="major" value={formData.major} onChange={handleChange} placeholder="Computer Science" />

        {/* File Upload Styling */}
        <div className="px-1">
          <label className="block text-sm font-bold text-[#2D3162] mb-2 ml-1 uppercase tracking-wider">
            Profile Photo <span className="text-gray-300 font-normal">(optional)</span>
          </label>
          <div className="relative group">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className="w-full px-6 py-4 bg-slate-50 border-2 border-dashed border-[#E2E8F0] rounded-full flex items-center justify-between group-hover:border-[#F97316] transition-all">
              <span className="text-gray-400 text-sm truncate">
                {profileImage ? profileImage.name : "Click to upload image..."}
              </span>
              <div className="bg-[#F97316] text-white p-2 rounded-full">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <Button type="submit" loading={loading}>
            Create Student Account
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