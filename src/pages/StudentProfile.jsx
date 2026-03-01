import React, { useState } from 'react';
import axios from 'axios';
import FormInput from '../components/FormInput';
import Button from '../components/Button';

const API_BASE = 'https://skilline-backend.onrender.com/api';

export default function StudentProfile({ profileData, refreshProfile }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  
  // Initialize form with existing profile data
  const [formData, setFormData] = useState({
    first_name: profileData?.first_name || '',
    last_name: profileData?.last_name || '',
    phone_number: profileData?.phone_number || '',
    address: profileData?.address || '',
    bio: profileData?.bio || '',
    major: profileData?.major || '',
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const data = new FormData();
    // Only append fields that have values
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });

    if (selectedImage) {
      data.append('profile_image', selectedImage);
    }

    try {
      const token = localStorage.getItem('token');
      await axios.patch(`${API_BASE}/profile/update/`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccess('Profile updated successfully!');
      // Trigger the layout to refresh the top bar name/image
      if (refreshProfile) refreshProfile(); 
      
      setTimeout(() => setSuccess(''), 3000);
    } catch{
      setError('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* 1. Profile Header Card */}
      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-8">
        <div className="relative group">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white ring-4 ring-orange-50 shadow-inner bg-slate-100">
            <img 
              src={previewUrl || profileData?.profile_image || 'https://via.placeholder.com/150'} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
          <label className="absolute bottom-0 right-0 bg-[#F97316] p-2 rounded-full text-white cursor-pointer shadow-lg hover:scale-110 transition-transform">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
          </label>
        </div>

        <div className="text-center md:text-left">
          <h1 className="text-3xl font-black text-[#2D3162]">{profileData?.first_name} {profileData?.last_name}</h1>
          <p className="text-gray-400 font-medium">@{profileData?.username} • {profileData?.major || 'Student'}</p>
          <div className="mt-3 inline-flex items-center gap-2 bg-green-50 text-green-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Active Account
          </div>
        </div>
      </div>

      {/* 2. Settings Form Card */}
      <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-gray-100">
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-[#2D3162]">Account Settings</h2>
          <p className="text-gray-400">Keep your personal details up to date for better course recommendations.</p>
        </div>

        {success && <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-2xl border-l-4 border-green-500 font-medium animate-fade-in">{success}</div>}
        {error && <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-2xl border-l-4 border-red-500 font-medium animate-fade-in">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput label="First Name" name="first_name" value={formData.first_name} onChange={handleChange} />
            <FormInput label="Last Name" name="last_name" value={formData.last_name} onChange={handleChange} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput label="Phone Number" name="phone_number" value={formData.phone_number} onChange={handleChange} />
            <FormInput label="Major / Course" name="major" value={formData.major} onChange={handleChange} />
          </div>

          <FormInput label="Address" name="address" value={formData.address} onChange={handleChange} />
          
          <div>
            <label className="block text-sm font-bold text-[#2D3162] mb-2 ml-1 uppercase tracking-widest">About Me (Bio)</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows="4"
              className="w-full px-6 py-4 border-2 border-[#E2E8F0] rounded-[2rem] focus:outline-none focus:border-[#F97316] transition-all resize-none"
              placeholder="Tell us a little about yourself..."
            ></textarea>
          </div>

          <div className="flex justify-end pt-4">
            <div className="w-full md:w-64">
              <Button type="submit" loading={loading}>Save All Changes</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}