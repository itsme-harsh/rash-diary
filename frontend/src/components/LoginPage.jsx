import React, { useState } from 'react';
import toast from 'react-hot-toast'; // Use react-hot-toast
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await login(email, password);
      toast.success('Login successful');
    } catch (error) {
      toast.error('Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
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
        onClick={handleLogin}
        className="w-full p-2 bg-primary text-white rounded"
      >
        Login
      </button>
    </div>
  );
};

export default LoginPage;
