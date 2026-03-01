import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthLayout from '../components/AuthLayout';
import FormInput from '../components/FormInput';
import Button from '../components/Button';

const API_BASE = 'https://skilline-backend.onrender.com/api';

export default function RegisterInstructor() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    department: '',
    expertise: '',
    years_experience: '',
    qualifications: '',
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProfileImage = (e) => {
    if (e.target.files[0]) setProfileImage(e.target.files[0]);
  };

  const handleResume = (e) => {
    if (e.target.files[0]) setResumeFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (formData.password !== formData.password2) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });
    if (profileImage) data.append('profile_image', profileImage);
    if (resumeFile) data.append('resume', resumeFile);

    try {
      await axios.post(`${API_BASE}/register/instructor/`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setSuccess('Instructor account created! Check your email for OTP.');
      setTimeout(() => {
        navigate('/verify-otp', { state: { email: formData.email } });
      }, 2200);
    } catch (err) {
      const errMsg = err.response?.data?.detail ||
                     err.response?.data?.non_field_errors?.[0] ||
                     'Registration failed. Please review the form.';
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Instructor Registration"
      subtitle="Become a teacher on our platform"
      linkText="Already have an account?"
      linkTo="/login"
      linkLabel="Sign in"
    >
      {success && <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded-r-lg text-green-700">{success}</div>}
      {error && <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-lg text-red-700">{error}</div>}

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormInput label="First Name *" name="first_name" value={formData.first_name} onChange={handleChange} required />
          <FormInput label="Last Name *" name="last_name" value={formData.last_name} onChange={handleChange} required />
        </div>

        <FormInput label="Email *" type="email" name="email" value={formData.email} onChange={handleChange} required />
        <FormInput label="Username *" name="username" value={formData.username} onChange={handleChange} required />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormInput label="Password *" type="password" name="password" value={formData.password} onChange={handleChange} required />
          <FormInput label="Confirm Password *" type="password" name="password2" value={formData.password2} onChange={handleChange} required />
        </div>

        <FormInput label="Department / Faculty *" name="department" value={formData.department} onChange={handleChange} required />
        <FormInput label="Areas of Expertise *" name="expertise" value={formData.expertise} onChange={handleChange} required placeholder="e.g. Data Science, Software Engineering, ..." />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormInput
            label="Years of Experience"
            type="number"
            name="years_experience"
            value={formData.years_experience}
            onChange={handleChange}
            min="0"
            placeholder="0"
          />
          <FormInput label="Phone Number" name="phone_number" value={formData.phone_number} onChange={handleChange} />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Profile Photo (optional)</label>
          <input type="file" accept="image/*" onChange={handleProfileImage} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-accent-blue hover:file:bg-blue-100" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Resume / CV (PDF recommended)</label>
          <input type="file" accept=".pdf,.doc,.docx" onChange={handleResume} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-accent-blue hover:file:bg-blue-100" />
        </div>

        <Button type="submit" loading={loading}>
          Create Instructor Account
        </Button>
      </form>
    </AuthLayout>
  );
}