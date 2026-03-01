import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

    if (formData.password !== formData.password2) return 'Passwords do not match';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) return 'Please enter a valid email address';

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

    const formDataToSend = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (value && value.trim && value.trim() !== '') {
        formDataToSend.append(key, value.trim());
      } else if (value) {
        formDataToSend.append(key, value);
      }
    });

    if (profileImage) {
      formDataToSend.append('profile_image', profileImage);
    }

    // Debug log
    console.log('Submitting FormData:');
    for (let [key, val] of formDataToSend.entries()) {
      console.log(`${key}: ${typeof val === 'object' ? '[File]' : val}`);
    }

    try {
      const response = await fetch(`${API_BASE}/register/student/`, {
        method: 'POST',
        body: formDataToSend,
        // Important: do NOT set 'Content-Type' manually with FormData + fetch
        // The browser sets it automatically with the correct boundary
        mode: 'cors',
        credentials: 'omit', // or 'include' if you ever need cookies
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.log('Server responded with error:', response.status, errorData);
        throw new Error(`Server error: ${response.status} - ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      console.log('Success:', data);

      setSuccess('Account created successfully! Check your email for OTP.');
      setTimeout(() => {
        navigate('/verify-otp', { state: { email: formData.email } });
      }, 2200);
    } catch (err) {
      console.error('Fetch error:', err);

      let errMsg = 'Registration failed. Please try again later.';

      if (err.message.includes('502') || err.message.includes('Bad Gateway')) {
        errMsg = 'Backend service is currently unavailable (502 Bad Gateway). Please check server status.';
      } else if (err.message.includes('CORS')) {
        errMsg = 'CORS error – this usually means the backend is not responding properly.';
      } else if (err.name === 'TypeError' && err.message.includes('Failed to fetch')) {
        errMsg = 'Network error – backend might be down or unreachable.';
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
        {/* ... same form fields as before ... */}
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
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 transition"
          />
        </div>

        <Button type="submit" loading={loading}>
          Create Student Account
        </Button>
      </form>
    </AuthLayout>
  );
}