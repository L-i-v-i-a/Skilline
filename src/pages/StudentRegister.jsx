import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentRegister = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    matric_number: '', // required
    major: '',
    role: 'student', // Default role set here
  });

  const [files, setFiles] = useState({
    profile_image: null,
    student_id_document: null,
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
    
    // Append text fields (this now includes 'role': 'student')
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    // Append optional file fields
    if (files.profile_image) data.append('profile_image', files.profile_image);
    if (files.student_id_document) data.append('student_id_document', files.student_id_document);

    try {
      const response = await fetch('https://skilline-backend.onrender.com/api/register/student/', {
        method: 'POST',
        body: data,
      });

      const responseText = await response.text();

      let result;
      try {
        result = JSON.parse(responseText);
      } catch (err) {
      // Using 'err' here tells ESLint the variable is necessary
      console.error("Registration Network Error:", err); 
      alert("A network error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
      if (response.status === 201) {
        console.log("Success:", result);
        alert(result.message || "Account created! Check your email for OTP.");
        navigate('/verify-otp', { state: { email: result.email } });
      } else {
        console.error("Registration failed:", result);
        // Specifically check for role or other field errors
        alert(result.detail || "Registration failed. Please check your details.");
      }
    } catch (err) {
      console.error("Network / Fetch Error:", err);
      alert("A network error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb] flex items-center justify-center py-12 px-4 font-sans">
      <div className="max-w-4xl w-full bg-white rounded-[40px] shadow-2xl p-8 md:p-14">
        
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-[#2F327D]">
            Student <span className="text-[#F48C06]">Register</span>
          </h2>
          <p className="text-gray-500 mt-2">Create your account to join the classroom</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5">
            
            {/* Left Side: Account Basics */}
            <div className="space-y-5">
              <input type="text" name="username" placeholder="Username *" required className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50/50 outline-none focus:border-[#F48C06] focus:bg-white transition-all" onChange={handleChange} />
              
              <input type="email" name="email" placeholder="Email Address" className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50/50 outline-none focus:border-[#F48C06] focus:bg-white transition-all" onChange={handleChange} />
              
              <input type="password" name="password" placeholder="Password *" required className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50/50 outline-none focus:border-[#F48C06] focus:bg-white transition-all" onChange={handleChange} />
              
              <input type="password" name="password2" placeholder="Confirm Password *" required className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50/50 outline-none focus:border-[#F48C06] focus:bg-white transition-all" onChange={handleChange} />
            </div>

            {/* Right Side: Student Details */}
            <div className="space-y-5">
              <div className="flex gap-4">
                <input type="text" name="first_name" placeholder="First Name" className="w-1/2 px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50/50 outline-none focus:border-[#F48C06] transition-all" onChange={handleChange} />
                <input type="text" name="last_name" placeholder="Last Name" className="w-1/2 px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50/50 outline-none focus:border-[#F48C06] transition-all" onChange={handleChange} />
              </div>
              
              <input type="text" name="phone_number" placeholder="Phone Number" className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50/50 outline-none focus:border-[#F48C06] transition-all" onChange={handleChange} />
              
              <input type="text" name="matric_number" placeholder="Matric Number *" required className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50/50 outline-none focus:border-[#F48C06] transition-all" onChange={handleChange} />
              
              <input type="text" name="major" placeholder="Major (Software Engineering)" className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50/50 outline-none focus:border-[#F48C06] transition-all" onChange={handleChange} />
            </div>
          </div>

          {/* File Upload Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6 border-t border-gray-50">
            <div>
              <label className="block text-xs font-bold text-[#2F327D] mb-2 uppercase">Profile Image (Optional)</label>
              <input type="file" name="profile_image" accept="image/*" className="text-xs text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-[#F48C06]/10 file:text-[#F48C06] font-semibold cursor-pointer" onChange={handleFileChange} />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#2F327D] mb-2 uppercase">Student ID Document (Optional)</label>
              <input type="file" name="student_id_document" className="text-xs text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-[#2F327D]/10 file:text-[#2F327D] font-semibold cursor-pointer" onChange={handleFileChange} />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#F48C06] text-white py-5 rounded-2xl font-bold text-xl shadow-xl shadow-orange-100 hover:bg-[#e07f05] hover:-translate-y-1 transition-all disabled:opacity-50 disabled:translate-y-0"
          >
            {loading ? "Processing..." : "Create Student Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentRegister;