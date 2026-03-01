import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthLayout from '../components/AuthLayout';
import FormInput from '../components/FormInput';
import Button from '../components/Button';

const API_BASE = 'https://skilline-backend.onrender.com/api';

export default function RegisterStudent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    matric_number: '',
    major: '',
    date_of_birth: '',
    address: '',
    bio: '',
  });
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
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

    try {
      await axios.post(`${API_BASE}/register/student/`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setSuccess('Account created! Check your email for OTP.');
      setTimeout(() => {
        navigate('/verify-otp', { state: { email: formData.email } });
      }, 2200);
    } catch (err) {
      const errMsg = err.response?.data?.non_field_errors?.[0] ||
                     err.response?.data?.detail ||
                     'Registration failed. Please check your information.';
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Student Registration"
      subtitle="Join our learning platform as a student"
      linkText="Already registered?"
      linkTo="/login"
      linkLabel="Sign in"
    >
      {success && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded-r-lg text-green-700">
          {success}
        </div>
      )}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-lg text-red-700">
          {error}
        </div>
      )}

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

        <FormInput
          label="Matric / Registration Number *"
          name="matric_number"
          value={formData.matric_number}
          onChange={handleChange}
          placeholder="e.g. 2023/123456"
          required
        />

        <FormInput label="Major / Course of Study" name="major" value={formData.major} onChange={handleChange} />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Profile Photo (optional)</label>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-gray-500
                       file:mr-4 file:py-2 file:px-4 file:rounded-lg
                       file:border-0 file:text-sm file:font-semibold
                       file:bg-blue-50 file:text-accent-blue
                       hover:file:bg-blue-100 transition"
          />
        </div>

        <Button type="submit" loading={loading}>
          Create Student Account
        </Button>
      </form>
    </AuthLayout>
  );
}