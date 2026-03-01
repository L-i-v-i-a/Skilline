import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';

const API_BASE = 'https://skilline-backend.onrender.com/api';

export default function InstructorProfile() {
  const { profileData, refreshProfile } = useOutletContext();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    bio: '',
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Sync local state when profileData arrives from the Layout
  useEffect(() => {
    if (profileData) {
      setFormData({
        first_name: profileData.first_name || '',
        last_name: profileData.last_name || '',
        bio: profileData.bio || '',
      });
    }
  }, [profileData]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const data = new FormData();
    data.append('first_name', formData.first_name);
    data.append('last_name', formData.last_name);
    data.append('bio', formData.bio);
    if (image) data.append('profile_image', image);

    try {
      const token = localStorage.getItem('accessToken');
      await axios.patch(`${API_BASE}/profile/update/`, data, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data' 
        }
      });
      alert("Profile updated!");
      refreshProfile(); // This triggers the header image to update instantly!
    } catch {
      alert("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl animate-fade-in">
      <h1 className="text-3xl font-black text-[#2D3162] mb-8">Instructor Settings</h1>
      
      <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-gray-100">
        <form onSubmit={handleUpdate} className="space-y-6">
          <div className="flex flex-col md:flex-row gap-8 items-center mb-8 pb-8 border-b border-gray-50">
            <div className="relative group">
              <img 
                src={profileData?.profile_image || 'https://via.placeholder.com/150'} 
                className="w-32 h-32 rounded-[2rem] object-cover border-4 border-indigo-50"
                alt="Instructor"
              />
              <input 
                type="file" 
                className="absolute inset-0 opacity-0 cursor-pointer" 
                onChange={(e) => setImage(e.target.files[0])}
              />
              <div className="absolute bottom-2 right-2 bg-indigo-600 text-white p-2 rounded-lg text-xs font-bold">Edit</div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#2D3162]">{profileData?.first_name} {profileData?.last_name}</h2>
              <p className="text-indigo-500 font-bold text-sm uppercase tracking-widest">Verified Instructor</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input 
              type="text" value={formData.first_name} placeholder="First Name"
              className="p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 ring-indigo-500"
              onChange={(e) => setFormData({...formData, first_name: e.target.value})}
            />
            <input 
              type="text" value={formData.last_name} placeholder="Last Name"
              className="p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 ring-indigo-500"
              onChange={(e) => setFormData({...formData, last_name: e.target.value})}
            />
          </div>

          <textarea 
            value={formData.bio} placeholder="Tell your students about your expertise..."
            className="w-full p-4 bg-slate-50 rounded-2xl h-40 outline-none focus:ring-2 ring-indigo-500"
            onChange={(e) => setFormData({...formData, bio: e.target.value})}
          />

          <button 
            type="submit" disabled={loading}
            className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
          >
            {loading ? 'Saving Changes...' : 'Update Instructor Profile'}
          </button>
        </form>
      </div>
    </div>
  );
}