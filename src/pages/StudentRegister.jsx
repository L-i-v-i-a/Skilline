import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentRegister = () => {
  const navigate = useNavigate();
  
  // Text fields state
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    date_of_birth: '',
    address: '',
    bio: '',
    matric_number: '',
    major: '',
  });

  // File fields state
  const [files, setFiles] = useState({
    profile_image: null,
    student_id_document: null,
  });

  const [loading, setLoading] = useState(false);

  // Handles all text-based inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handles file uploads
  const handleFileChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Create FormData object for multipart/form-data
    const data = new FormData();
    
    // Append all text fields
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    // Append files
    if (files.profile_image) data.append('profile_image', files.profile_image);
    if (files.student_id_document) data.append('student_id_document', files.student_id_document);

    try {
      const response = await fetch('https://skilline-backend.onrender.com/api/register/student/', {
        method: 'POST',
        body: data, 
        // Note: Browser sets Content-Type to multipart/form-data automatically
      });

      const result = await response.json();

      if (response.status === 201) {
        // Success: Navigate to verify page and pass email in state
        navigate('/verify-otp', { state: { email: formData.email } });
      } else {
        // Error: Show the user what went wrong (validation errors etc)
        alert("Registration failed: " + JSON.stringify(result));
      }
    } catch (error) {
      console.error("Network Error:", error);
      alert("A network error occurred. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb] flex items-center justify-center py-12 px-4">
      <div className="max-w-3xl w-full bg-white rounded-[30px] shadow-2xl p-8 md:p-14">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#2F327D]">
            Join <span className="text-[#F48C06]">Skilline</span>
          </h2>
          <p className="text-gray-500 mt-3 text-lg">Student Registration Account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
            
            {/* Left Column: Account Basics */}
            <div className="space-y-5">
              <input type="text" name="username" placeholder="Username *" required className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50/50 outline-none focus:border-[#F48C06] focus:bg-white transition-all" onChange={handleChange} />
              
              <input type="email" name="email" placeholder="Email Address" className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50/50 outline-none focus:border-[#F48C06] focus:bg-white transition-all" onChange={handleChange} />
              
              <input type="password" name="password" placeholder="Password *" required className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50/50 outline-none focus:border-[#F48C06] focus:bg-white transition-all" onChange={handleChange} />
              
              <input type="password" name="password2" placeholder="Confirm Password *" required className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50/50 outline-none focus:border-[#F48C06] focus:bg-white transition-all" onChange={handleChange} />
              
              <input type="text" name="phone_number" placeholder="Phone Number" className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50/50 outline-none focus:border-[#F48C06] focus:bg-white transition-all" onChange={handleChange} />
            </div>

            {/* Right Column: Student Details */}
            <div className="space-y-5">
              <div className="flex gap-4">
                <input type="text" name="first_name" placeholder="First Name" className="w-1/2 px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50/50 outline-none focus:border-[#F48C06] transition-all" onChange={handleChange} />
                <input type="text" name="last_name" placeholder="Last Name" className="w-1/2 px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50/50 outline-none focus:border-[#F48C06] transition-all" onChange={handleChange} />
              </div>
              
              <input type="text" name="matric_number" placeholder="Matric Number *" required className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50/50 outline-none focus:border-[#F48C06] transition-all" onChange={handleChange} />
              
              <input type="text" name="major" placeholder="Major (Course of Study)" className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50/50 outline-none focus:border-[#F48C06] transition-all" onChange={handleChange} />
              
              <input type="date" name="date_of_birth" title="Date of Birth" className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50/50 text-gray-400 outline-none focus:border-[#F48C06] transition-all" onChange={handleChange} />
              
              <input type="text" name="address" placeholder="Residential Address" className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50/50 outline-none focus:border-[#F48C06] transition-all" onChange={handleChange} />
            </div>
          </div>

          {/* Bio Section */}
          <textarea name="bio" placeholder="Tell us a little about yourself (Bio)" rows="3" className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50/50 outline-none focus:border-[#F48C06] transition-all resize-none" onChange={handleChange}></textarea>

          {/* File Uploads */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4 border-t border-gray-50">
            <div>
              <label className="block text-sm font-semibold text-[#2F327D] mb-3">Profile Picture</label>
              <input type="file" name="profile_image" accept="image/*" className="text-sm text-gray-400 file:mr-4 file:py-2.5 file:px-5 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-[#F48C06]/10 file:text-[#F48C06] hover:file:bg-[#F48C06]/20 transition-all cursor-pointer" onChange={handleFileChange} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#2F327D] mb-3">Student ID (Doc/Image)</label>
              <input type="file" name="student_id_document" className="text-sm text-gray-400 file:mr-4 file:py-2.5 file:px-5 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-[#2F327D]/10 file:text-[#2F327D] hover:file:bg-[#2F327D]/20 transition-all cursor-pointer" onChange={handleFileChange} />
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#F48C06] text-white py-5 rounded-2xl font-bold text-xl shadow-xl shadow-orange-100 hover:bg-[#e07f05] hover:-translate-y-1 transition-all disabled:opacity-50 disabled:translate-y-0"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : "Create Student Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentRegister;