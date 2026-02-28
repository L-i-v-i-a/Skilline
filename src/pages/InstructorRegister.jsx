import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const InstructorRegister = () => {
  const navigate = useNavigate();
  
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
    department: '',    // Instructor specific
    expertise: '',     // Instructor specific
    years_experience: '', // Instructor specific
    qualifications: '', // Instructor specific
  });

  const [files, setFiles] = useState({
    profile_image: null,
    resume: null,      // Instructor specific
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    
    // Append all text/number fields
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    // Append file fields
    if (files.profile_image) data.append('profile_image', files.profile_image);
    if (files.resume) data.append('resume', files.resume);

    try {
      const response = await fetch('https://skilline-backend.onrender.com/api/register/instructor/', {
        method: 'POST',
        body: data,
      });

      const result = await response.json();

      if (response.status === 201) {
        navigate('/verify-otp', { state: { email: formData.email } });
      } else {
        alert("Registration failed: " + JSON.stringify(result));
      }
    } catch (error) {
      console.error("Network Error:", error);
      alert("A network error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb] flex items-center justify-center py-12 px-4">
      <div className="max-w-4xl w-full bg-white rounded-[30px] shadow-2xl p-8 md:p-14">
        
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#2F327D]">
            Become an <span className="text-[#F48C06]">Instructor</span>
          </h2>
          <p className="text-gray-500 mt-3 text-lg">Share your knowledge with the Skilline community</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5">
            
            {/* Left Side: Account & Identity */}
            <div className="space-y-5">
              <h3 className="font-bold text-[#2F327D] border-b pb-2">Account Info</h3>
              <input type="text" name="username" placeholder="Username *" required className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50/50 outline-none focus:border-[#F48C06] focus:bg-white transition-all" onChange={handleChange} />
              <input type="email" name="email" placeholder="Email Address" className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50/50 outline-none focus:border-[#F48C06] transition-all" onChange={handleChange} />
              <input type="password" name="password" placeholder="Password *" required className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50/50 outline-none focus:border-[#F48C06] transition-all" onChange={handleChange} />
              <input type="password" name="password2" placeholder="Confirm Password *" required className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50/50 outline-none focus:border-[#F48C06] transition-all" onChange={handleChange} />
            </div>

            {/* Right Side: Professional Info */}
            <div className="space-y-5">
              <h3 className="font-bold text-[#2F327D] border-b pb-2">Professional Info</h3>
              <input type="text" name="department" placeholder="Department *" required className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50/50 outline-none focus:border-[#F48C06] transition-all" onChange={handleChange} />
              <input type="text" name="expertise" placeholder="Area of Expertise (e.g. Data Science) *" required className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50/50 outline-none focus:border-[#F48C06] transition-all" onChange={handleChange} />
              <input type="number" name="years_experience" placeholder="Years of Experience" className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50/50 outline-none focus:border-[#F48C06] transition-all" onChange={handleChange} />
              <input type="text" name="qualifications" placeholder="Qualifications (e.g. PhD, MSc)" className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50/50 outline-none focus:border-[#F48C06] transition-all" onChange={handleChange} />
            </div>
          </div>

          {/* Full Width Bio */}
          <textarea name="bio" placeholder="Professional Bio - Tell students about your background..." rows="3" className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50/50 outline-none focus:border-[#F48C06] transition-all resize-none" onChange={handleChange}></textarea>

          {/* Instructor File Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6 bg-gray-50/50 rounded-3xl px-8 border border-gray-100">
            <div>
              <label className="block text-sm font-semibold text-[#2F327D] mb-3">Profile Picture</label>
              <input type="file" name="profile_image" accept="image/*" className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-[#F48C06] file:text-white" onChange={handleFileChange} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#2F327D] mb-3">CV / Resume (PDF/Doc)</label>
              <input type="file" name="resume" className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-[#2F327D] file:text-white" onChange={handleFileChange} />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#2F327D] text-white py-5 rounded-2xl font-bold text-xl shadow-xl hover:bg-[#1e2050] transition-all disabled:opacity-50"
          >
            {loading ? "Registering Instructor..." : "Create Instructor Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default InstructorRegister;