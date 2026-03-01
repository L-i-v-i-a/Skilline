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
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  const validateForm = () => {
    if (!formData.username.trim()) return 'Username is required';
    if (!formData.email.trim()) return 'Email is required';
    if (!formData.first_name.trim()) return 'First name is required';
    if (!formData.last_name.trim()) return 'Last name is required';
    if (!formData.password.trim()) return 'Password is required';
    if (!formData.password2.trim()) return 'Confirm password is required';
    if (!formData.matric_number.trim()) return 'Matric / Registration Number is required';

    if (formData.password !== formData.password2) {
      return 'Passwords do not match';
    }

    // Optional: basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return 'Please enter a valid email address';
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    const data = new FormData();

    // Only append fields that have values (avoid sending empty strings for required fields)
    Object.entries(formData).forEach(([key, value]) => {
      if (value && value.trim && value.trim() !== '') {
        data.append(key, value.trim());
      } else if (value) {
        data.append(key, value);
      }
    });

    if (profileImage) {
      data.append('profile_image', profileImage);
    }

    // Debug: see exactly what is being sent
    console.log('Submitting FormData:');
    for (let [key, val] of data.entries()) {
      console.log(`${key}: ${typeof val === 'object' ? '[File]' : val}`);
    }

    try {
      const response = await axios.post(`${API_BASE}/register/student/`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Success response:', response.data);

      setSuccess('Account created successfully! Check your email for OTP.');
      setTimeout(() => {
        navigate('/verify-otp', { state: { email: formData.email } });
      }, 2200);
    } catch (err) {
      console.error('Registration error:', err);

      let errMsg = 'Registration failed. Please try again.';

      if (err.response?.data) {
        console.log('Server error response:', err.response.data);

        // Handle common DRF error formats
        if (err.response.data.detail) {
          errMsg = err.response.data.detail;
        } else if (typeof err.response.data === 'object') {
          // Field-specific errors
          const errors = Object.entries(err.response.data)
            .map(([field, messages]) => {
              if (Array.isArray(messages)) {
                return `${field}: ${messages.join(', ')}`;
              }
              return `${field}: ${messages}`;
            })
            .join(' • ');
          errMsg = errors || errMsg;
        }
      }

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
          <FormInput
            label="First Name *"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
          <FormInput
            label="Last Name *"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </div>

        <FormInput
          label="Email *"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <FormInput
          label="Username *"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormInput
            label="Password *"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <FormInput
            label="Confirm Password *"
            type="password"
            name="password2"
            value={formData.password2}
            onChange={handleChange}
            required
          />
        </div>

        <FormInput
          label="Matric / Registration Number *"
          name="matric_number"
          value={formData.matric_number}
          onChange={handleChange}
          placeholder="e.g. 2023/123456"
          required
        />

        <FormInput
          label="Major / Course of Study"
          name="major"
          value={formData.major}
          onChange={handleChange}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Profile Photo (optional)
          </label>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-gray-500
                       file:mr-4 file:py-2 file:px-4 file:rounded-lg
                       file:border-0 file:text-sm file:font-semibold
                       file:bg-blue-50 file:text-blue-600
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