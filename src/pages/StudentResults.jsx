import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE = 'https://skilline-backend.onrender.com/api';

export default function StudentResults() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${API_BASE}/students/results/`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setResults(res.data.results);
      } catch  {
        setError('Unable to load results at this time.');
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, []);

  const getGradeColor = (grade, max) => {
    const percentage = (grade / max) * 100;
    if (percentage >= 75) return 'text-green-500';
    if (percentage >= 50) return 'text-orange-500';
    return 'text-red-500';
  };

  if (loading) return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#F97316]"></div></div>;

  return (
    <div className="space-y-8 animate-fade-in">
      <header>
        <h1 className="text-3xl font-black text-[#2D3162]">Academic Performance</h1>
        <p className="text-gray-400 font-medium mt-1">Track your grades and instructor feedback across all courses.</p>
      </header>

      {error && <div className="p-4 bg-red-50 text-red-600 rounded-2xl border-l-4 border-red-500">{error}</div>}

      <div className="grid grid-cols-1 gap-6">
        {results.length > 0 ? results.map((item) => (
          <div key={item.id} className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              
              {/* Assignment Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-slate-100 text-[#2D3162] text-[10px] font-black uppercase px-2 py-1 rounded">
                    {item.assignment.course}
                  </span>
                  <span className="text-gray-300 text-xs font-medium">
                    Submitted: {new Date(item.submitted_at).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#2D3162]">{item.assignment.title}</h3>
                
                {/* Feedback Box */}
                {item.feedback ? (
                  <div className="mt-4 p-4 bg-slate-50 rounded-2xl border-l-4 border-[#F97316]">
                    <p className="text-xs font-bold text-[#2D3162] uppercase tracking-widest mb-1">Instructor Feedback</p>
                    <p className="text-sm text-gray-600 italic">"{item.feedback}"</p>
                  </div>
                ) : (
                  <p className="mt-4 text-sm text-gray-400 italic">Waiting for instructor feedback...</p>
                )}
              </div>

              {/* Grade Display */}
              <div className="flex flex-col items-center justify-center bg-slate-50 rounded-[2rem] px-10 py-6 min-w-[180px]">
                <p className="text-[10px] font-black text-[#2D3162] uppercase tracking-widest mb-1">Final Score</p>
                <div className={`text-4xl font-black ${getGradeColor(item.grade, item.assignment.max_score)}`}>
                  {item.grade !== null ? item.grade : '--'}
                  <span className="text-gray-300 text-lg font-bold ml-1">/ {item.assignment.max_score}</span>
                </div>
                {item.grade !== null && (
                  <p className="text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-tighter">
                    {((item.grade / item.assignment.max_score) * 100).toFixed(0)}% Achievement
                  </p>
                )}
              </div>

              {/* Download Submission */}
              <div className="flex items-center">
                <a 
                  href={item.file} 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-4 bg-white border-2 border-slate-100 rounded-2xl text-[#2D3162] hover:border-[#F97316] hover:text-[#F97316] transition-all group"
                  title="Download your submission"
                >
                  <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                </a>
              </div>
            </div>
          </div>
        )) : (
          <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-gray-100">
            <div className="text-6xl mb-4 opacity-20">📂</div>
            <p className="text-[#2D3162] font-bold">No results found.</p>
            <p className="text-gray-400 text-sm">Once you submit assignments and they are graded, they'll appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}