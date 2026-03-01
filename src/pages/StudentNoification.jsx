import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE = 'https://skilline-backend.onrender.com/api';

export default function StudentNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_BASE}/students/notifications/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotifications(res.data.results);
    } catch  {
      setError('Could not sync notifications.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const markAsRead = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`${API_BASE}/students/notifications/${id}/read/`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Update local state to reflect read status immediately
      setNotifications(notifications.map(n => 
        n.id === id ? { ...n, is_read: true } : n
      ));
    } catch {
      console.error("Failed to mark as read");
    }
  };

  if (loading) return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#F97316]"></div></div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-[#2D3162]">Notifications</h1>
          <p className="text-gray-400 font-medium">Stay updated with your course activities.</p>
        </div>
        <span className="bg-[#2D3162] text-white px-4 py-2 rounded-full text-xs font-bold">
          {notifications.filter(n => !n.is_read).length} New
        </span>
      </header>

      {error && <div className="p-4 bg-red-50 text-red-600 rounded-2xl border-l-4 border-red-500">{error}</div>}

      <div className="space-y-4">
        {notifications.length > 0 ? notifications.map((note) => (
          <div 
            key={note.id} 
            onClick={() => !note.is_read && markAsRead(note.id)}
            className={`group relative p-6 rounded-[2rem] border-2 transition-all cursor-pointer ${
              note.is_read 
              ? 'bg-white border-transparent opacity-70' 
              : 'bg-white border-[#F97316]/20 shadow-md hover:border-[#F97316]'
            }`}
          >
            <div className="flex items-start gap-5">
              {/* Icon / Status Indicator */}
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 ${
                note.is_read ? 'bg-slate-100 text-gray-400' : 'bg-orange-100 text-[#F97316]'
              }`}>
                {note.is_read ? '🔔' : '✨'}
              </div>

              {/* Message Content */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    {new Date(note.created_at).toLocaleDateString()} at {new Date(note.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </span>
                  {!note.is_read && (
                    <span className="w-2 h-2 bg-[#F97316] rounded-full animate-pulse"></span>
                  )}
                </div>
                <p className={`text-lg ${note.is_read ? 'text-gray-500' : 'text-[#2D3162] font-bold'}`}>
                  {note.message}
                </p>
              </div>
            </div>

            {/* Subtle "Mark as Read" hover hint */}
            {!note.is_read && (
              <div className="absolute top-4 right-8 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-bold text-[#F97316] uppercase tracking-tighter">
                Click to dismiss
              </div>
            )}
          </div>
        )) : (
          <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-gray-100">
            <div className="text-6xl mb-4 grayscale">📭</div>
            <p className="text-[#2D3162] font-bold">All caught up!</p>
            <p className="text-gray-400 text-sm">No new notifications to show.</p>
          </div>
        )}
      </div>
    </div>
  );
}