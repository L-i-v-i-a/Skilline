import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE = 'https://skilline-backend.onrender.com/api';

export default function InstructorSubmissions() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [gradingId, setGradingId] = useState(null);
  const [gradeData, setGradeData] = useState({ grade: '', feedback: '' });

  const fetchSubmissions = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      // Note: You can fetch submissions per assignment or a general list
      // For this example, we'll fetch the instructor's general submission queue
      const res = await axios.get(`${API_BASE}/student/instructor/submissions/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSubmissions(res.data.results || []);
    } catch (err) {
      console.error("Error fetching submissions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSubmissions(); }, []);

  const handleGradeSubmit = async (submissionId) => {
    try {
      const token = localStorage.getItem('accessToken');
      await axios.patch(`${API_BASE}/student/instructor/submissions/${submissionId}/grade/`, 
        { 
          grade: parseInt(gradeData.grade), 
          feedback: gradeData.feedback 
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      alert('Grade updated!');
      setGradingId(null);
      setGradeData({ grade: '', feedback: '' });
      fetchSubmissions(); // Refresh the list
    } catch {
      alert('Failed to submit grade. Check the inputs.');
    }
  };

  if (loading) return <div className="text-center py-20 animate-pulse">Loading Submissions...</div>;

  return (
    <div className="space-y-8 animate-fade-in">
      <header>
        <h1 className="text-3xl font-black text-[#2D3162]">Submissions Queue</h1>
        <p className="text-gray-400">Review and grade your students' hard work.</p>
      </header>

      <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-gray-100">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-gray-100">
            <tr>
              <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Student</th>
              <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Assignment</th>
              <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">File</th>
              <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {submissions.map((sub) => (
              <React.Fragment key={sub.id}>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-6 font-bold text-[#2D3162]">{sub.student_name || 'Student'}</td>
                  <td className="px-8 py-6">
                    <p className="text-sm font-bold text-[#2D3162]">{sub.assignment.title}</p>
                    <p className="text-[10px] text-indigo-500 font-black uppercase">{sub.assignment.course}</p>
                  </td>
                  <td className="px-8 py-6">
                    <a href={sub.file} target="_blank" rel="noreferrer" className="text-indigo-600 font-bold text-xs hover:underline flex items-center gap-1">
                      📂 View Work
                    </a>
                  </td>
                  <td className="px-8 py-6 text-right">
                    {sub.grade !== null ? (
                      <span className="bg-green-50 text-green-600 px-4 py-2 rounded-full text-xs font-bold border border-green-100">
                        Graded: {sub.grade}/{sub.assignment.max_score}
                      </span>
                    ) : (
                      <button 
                        onClick={() => setGradingId(sub.id)}
                        className="bg-indigo-600 text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-indigo-700 transition-all"
                      >
                        Grade Now
                      </button>
                    )}
                  </td>
                </tr>

                {/* Inline Grading Form (Expands when button is clicked) */}
                {gradingId === sub.id && (
                  <tr className="bg-indigo-50/30">
                    <td colSpan="4" className="px-8 py-8 animate-slide-down">
                      <div className="flex flex-col md:flex-row gap-6 items-end">
                        <div className="flex-1 space-y-4 w-full">
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="col-span-1">
                              <label className="block text-[10px] font-black text-indigo-900 uppercase mb-2">Score (Max {sub.assignment.max_score})</label>
                              <input 
                                type="number" 
                                className="w-full p-3 rounded-xl border-2 border-indigo-100 focus:border-indigo-500 outline-none"
                                value={gradeData.grade}
                                onChange={(e) => setGradeData({...gradeData, grade: e.target.value})}
                              />
                            </div>
                            <div className="col-span-3">
                              <label className="block text-[10px] font-black text-indigo-900 uppercase mb-2">Feedback to Student</label>
                              <input 
                                type="text" 
                                className="w-full p-3 rounded-xl border-2 border-indigo-100 focus:border-indigo-500 outline-none"
                                placeholder="Excellent work on the logic..."
                                value={gradeData.feedback}
                                onChange={(e) => setGradeData({...gradeData, feedback: e.target.value})}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => setGradingId(null)} className="px-5 py-3 text-xs font-bold text-gray-500 uppercase">Cancel</button>
                          <button 
                            onClick={() => handleGradeSubmit(sub.id)}
                            className="bg-[#2D3162] text-white px-8 py-3 rounded-xl font-bold text-xs hover:bg-black transition-all"
                          >
                            Submit Grade
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
        
        {submissions.length === 0 && (
          <div className="py-20 text-center text-gray-400">
            No submissions found in your queue.
          </div>
        )}
      </div>
    </div>
  );
}