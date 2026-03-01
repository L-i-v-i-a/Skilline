import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthLayout from '../components/AuthLayout';
import FormInput from '../components/FormInput';
import Button from '../components/Button';

const API_BASE = 'https://skilline-backend.onrender.com/api';

export default function RegisterInstructor() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    department: '',
    expertise: '',
    years_experience: '',
    qualifications: '',
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProfileImage = (e) => {
    if (e.target.files[0]) setProfileImage(e.target.files[0]);
  };

  const handleResume = (e) => {
    if (e.target.files[0]) setResumeFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (formData.password !== formData.password2) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });
    if (profileImage) data.append('profile_image', profileImage);
    if (resumeFile) data.append('resume', resumeFile);

    try {
      await axios.post(`${API_BASE}/register/instructor/`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setSuccess('Instructor account created! Check your email for OTP.');
      setTimeout(() => {
        navigate('/verify-otp', { state: { email: formData.email } });
      }, 2200);
    } catch (err) {
      const errMsg = err.response?.data?.detail ||
                     err.response?.data?.non_field_errors?.[0] ||
                     'Registration failed. Please review the form.';
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Instructor Registration"
      subtitle="Join our community of elite educators"
      linkText="Already have an account?"
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
        
        {/* Names Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput label="First Name" name="first_name" value={formData.first_name} onChange={handleChange} required placeholder="Jane" />
          <FormInput label="Last Name" name="last_name" value={formData.last_name} onChange={handleChange} required placeholder="Smith" />
        </div>

        <FormInput label="Email Address" type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="jane@university.edu" />
        <FormInput label="Username" name="username" value={formData.username} onChange={handleChange} required placeholder="jsmith_edu" />

        {/* Passwords Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput label="Password" type="password" name="password" value={formData.password} onChange={handleChange} required placeholder="••••••••" />
          <FormInput label="Confirm" type="password" name="password2" value={formData.password2} onChange={handleChange} required placeholder="••••••••" />
        </div>

        <FormInput label="Department / Faculty" name="department" value={formData.department} onChange={handleChange} required placeholder="Faculty of Science" />
        <FormInput label="Expertise" name="expertise" value={formData.expertise} onChange={handleChange} required placeholder="e.g. Quantum Physics, AI..." />

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput label="Exp. (Years)" type="number" name="years_experience" value={formData.years_experience} onChange={handleChange} min="0" placeholder="5" />
          <FormInput label="Phone Number" name="phone_number" value={formData.phone_number} onChange={handleChange} placeholder="+123..." />
        </div>

        {/* Custom Pill File Uploads */}
        <div className="grid grid-cols-1 gap-4 pt-2">
          {/* Profile Image */}
          <div className="group">
            <label className="block text-xs font-bold text-[#2D3162] mb-2 ml-1 uppercase tracking-widest">Profile Photo</label>
            <div className="relative">
              <input type="file" accept="image/*" onChange={handleProfileImage} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
              <div className="w-full px-5 py-3 bg-slate-50 border-2 border-dashed border-[#E2E8F0] rounded-full flex items-center justify-between group-hover:border-[#F97316] transition-all">
                <span className="text-gray-400 text-xs truncate">
                  {profileImage ? profileImage.name : "Upload Photo"}
                </span>
                <svg className="w-4 h-4 text-[#F97316]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </div>
            </div>
          </div>

          {/* Resume Upload */}
          <div className="group">
            <label className="block text-xs font-bold text-[#2D3162] mb-2 ml-1 uppercase tracking-widest">Resume / CV</label>
            <div className="relative">
              <input type="file" accept=".pdf,.doc,.docx" onChange={handleResume} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
              <div className="w-full px-5 py-3 bg-slate-50 border-2 border-dashed border-[#E2E8F0] rounded-full flex items-center justify-between group-hover:border-[#F97316] transition-all">
                <span className="text-gray-400 text-xs truncate">
                  {resumeFile ? resumeFile.name : "Upload CV (PDF)"}
                </span>
                <svg className="w-4 h-4 text-[#F97316]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6">
          <Button type="submit" loading={loading}>
            Create Instructor Account
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