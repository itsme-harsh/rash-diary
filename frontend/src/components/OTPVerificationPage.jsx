import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'; // Updated import

const OTPVerificationPage = () => {
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState(''); // Ensure email is correctly set
  const navigate = useNavigate(); // Updated hook

  const handleOTPVerification = async () => {
    try {
      await axios.post('/api/auth/verify-otp', { email, otp });
      toast.success('OTP verified successfully');
      navigate('/dashboard'); // Updated method of navigation
    } catch (error) {
      toast.error('OTP verification failed');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Verify OTP</h1>
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="block w-full p-2 mb-4 border rounded"
      />
      <button
        onClick={handleOTPVerification}
        className="w-full p-2 bg-primary text-white rounded"
      >
        Verify OTP
      </button>
    </div>
  );
};

export default OTPVerificationPage;
