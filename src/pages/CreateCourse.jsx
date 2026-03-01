import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_BASE = 'https://skilline-backend.onrender.com/api';

export default function CreateCourse() {
  const [formData, setFormData] = useState({ title: '', description: '', price: '' });
  const [files, setFiles] = useState({ cover_image: null, intro_video: null });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('price', formData.price);
    if (files.cover_image) data.append('cover_image', files.cover_image);
    if (files.intro_video) data.append('intro_video', files.intro_video);

    try {
      const token = localStorage.getItem('accessToken');
      await axios.post(`${API_BASE}/student/instructor/courses/create/`, data, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data' 
        }
      });
      alert('Course Created Successfully!');
      navigate('/instructor/courses');
    } catch {
      alert('Error creating course. Check if title is unique.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100">
      <h2 className="text-3xl font-black text-[#2D3162] mb-8">Create New Course</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input 
          type="text" placeholder="Course Title" className="w-full p-4 border rounded-2xl" 
          onChange={e => setFormData({...formData, title: e.target.value})} required 
        />
        <textarea 
          placeholder="Description" className="w-full p-4 border rounded-2xl h-32" 
          onChange={e => setFormData({...formData, description: e.target.value})} required 
        />
        <input 
          type="number" placeholder="Price (Naira)" className="w-full p-4 border rounded-2xl" 
          onChange={e => setFormData({...formData, price: e.target.value})} required 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold mb-2">Cover Image</label>
            <input type="file" accept="image/*" onChange={e => setFiles({...files, cover_image: e.target.files[0]})} />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">Intro Video (Optional)</label>
            <input type="file" accept="video/*" onChange={e => setFiles({...files, intro_video: e.target.files[0]})} />
          </div>
        </div>

        <button 
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all"
        >
          {loading ? 'Uploading Course...' : 'Publish Course'}
        </button>
      </form>
    </div>
  );
}