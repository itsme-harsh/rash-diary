import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast'; // Use react-hot-toast
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await axios.post('/api/auth/register', { email, password });
      toast.success('Registration successful. Please check your email for the OTP.');
      navigate('/login');
    } catch (error) {
      toast.error('Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="block w-full p-2 mb-4 border rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="block w-full p-2 mb-4 border rounded"
      />
      <button
        onClick={handleRegister}
        className="w-full p-2 bg-primary text-white rounded"
      >
        Register
      </button>
    </div>
  );
};

export default RegisterPage;
