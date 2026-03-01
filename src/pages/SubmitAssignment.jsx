import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '../components/Button';

const API_BASE = 'https://skilline-backend.onrender.com/api';

export default function SubmitAssignment() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [assignment, setAssignment] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch assignment details to show the student what they are submitting for
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        // We use the results or specific assignment endpoint if available
        const res = await axios.get(`${API_BASE}/students/results/`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        // Find the specific assignment from the list
        const found = res.data.results.find(r => r.assignment.id === parseInt(id));
        setAssignment(found?.assignment);
      } catch {
        console.error("Error fetching assignment context");
      }
    };
    fetchDetails();
  }, [id]);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('assignment_id', id);
    formData.append('file', file);

    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API_BASE}/students/assignments/${id}/submit/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccess('Work submitted successfully! Redirecting...');
      setTimeout(() => navigate('/student/results'), 2200);
    } catch (err) {
      setError(err.response?.data?.error || 'Submission failed. Please check the file size and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      {/* Breadcrumb */}
      <button onClick={() => navigate(-1)} className="text-[#F97316] font-bold text-sm mb-6 flex items-center gap-2">
        ← Back to Course
      </button>

      <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-sm border border-gray-100">
        <header className="mb-10">
          <span className="bg-orange-50 text-[#F97316] text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-md">
            Assignment Submission
          </span>
          <h1 className="text-3xl font-black text-[#2D3162] mt-4">{assignment?.title || 'Upload Your Work'}</h1>
          <p className="text-gray-400 mt-2">{assignment?.description}</p>
        </header>

        {success && <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-8 rounded-r-2xl text-green-700 font-medium">{success}</div>}
        {error && <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded-r-2xl text-red-700 font-medium">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Custom Upload Area */}
          <div className="group relative">
            <input 
              type="file" 
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              accept=".pdf,.doc,.docx,.zip"
            />
            <div className={`w-full py-20 border-4 border-dashed rounded-[2.5rem] flex flex-col items-center justify-center transition-all ${
              file ? 'border-green-200 bg-green-50' : 'border-slate-100 bg-slate-50 group-hover:border-[#F97316]/30'
            }`}>
              <div className={`w-16 h-16 rounded-2xl mb-4 flex items-center justify-center text-3xl shadow-lg transition-transform group-hover:scale-110 ${
                file ? 'bg-green-500 text-white' : 'bg-[#2D3162] text-white'
              }`}>
                {file ? '✓' : '📤'}
              </div>
              <p className="text-[#2D3162] font-bold">
                {file ? file.name : 'Click or Drag to Upload'}
              </p>
              <p className="text-gray-400 text-xs mt-2 uppercase tracking-widest">
                PDF, DOCX, or ZIP (Max 10MB)
              </p>
            </div>
          </div>

          <div className="bg-blue-50/50 p-6 rounded-[2rem] flex items-start gap-4">
            <span className="text-xl">💡</span>
            <p className="text-sm text-[#2D3162]/70 leading-relaxed">
              Ensure your file is clearly named (e.g., <span className="font-bold italic">Assignment1_YourName.pdf</span>) before submitting. Once submitted, you can track your grade in the <strong>Results</strong> tab.
            </p>
          </div>

          <Button type="submit" loading={loading} disabled={!file}>
            Submit Assignment
          </Button>
        </form>
      </div>
    </div>
  );
}