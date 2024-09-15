import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { toast } from 'react-toastify';
import { resendOtp, verifyOtp } from '../features/auth/authSlice';

export default function OtpVerification() {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const inputRefs = useRef([]);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate

  const { isVerified, status } = useSelector((state) => state.auth); // Get verification status from Redux

  useEffect(() => {
    // Navigate to dashboard if verified
    if (isVerified) {
      navigate('/dashboard');
    }
  }, [isVerified, navigate]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return; // Only allow numbers

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Automatically focus the next input if not at the last input
    if (element.nextSibling && element.value !== "") {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      e.preventDefault(); // Prevent default backspace behavior

      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);

      // Focus the previous input if it exists
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Combine OTP array into a single string
    const otpCode = otp.join('');
    const username = sessionStorage.getItem('username');

    if (!username) {
      toast.error("No user information found. Please log in again.");
      setIsSubmitting(false);
      return;
    }

    try {
      const action = await dispatch(verifyOtp({ otp: otpCode, username }));

      if (verifyOtp.fulfilled.match(action)) {
        toast.success('Account verified successfully');
        // No need for timeout; navigate should happen automatically if isVerified updates
      } else {
        toast.error(action.payload?.message || 'OTP verification failed');
      }
    } catch (error) {
      toast.error('An unexpected error occurred during OTP verification');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOtp = async () => {
    setIsResending(true);
    const username = sessionStorage.getItem('username');

    if (!username) {
      toast.error("No user information found. Please log in again.");
      setIsResending(false);
      return;
    }

    try {
      const action = await dispatch(resendOtp({ username }));

      if (resendOtp.fulfilled.match(action)) {
        toast.success('OTP resent successfully');
      } else {
        toast.error(action.payload?.message || 'Failed to resend OTP');
      }
    } catch (error) {
      toast.error('An unexpected error occurred while resending OTP');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <main className="d-flex align-items-center justify-content-center vh-100 login-page">
      <div className="container">
        <div className="row justify-content-center h-100">
          <div className="col-sm-10 col-md-8 col-lg-5 d-flex flex-column justify-content-center">
            <div className="text-center mt-4">
              <h1 className="h2">Verify your Account</h1>
              <p className="lead">Enter the 6-digit code we sent to your email</p>
            </div>

            <div className="card shadow-sm border-0 rounded">
              <div className="card-body p-4">
                <div className="text-center mb-4">
                  <img
                    src="img/avatars/avatar.jpg"
                    alt="User Avatar"
                    className="img-fluid rounded-circle"
                    width="132"
                    height="132"
                  />
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="form-group mb-4">
                    <div className="d-flex justify-content-between">
                      {otp.map((data, index) => (
                        <input
                          key={index}
                          type="text"
                          maxLength="1"
                          className="form-control otp-input"
                          value={data}
                          onChange={(e) => handleChange(e.target, index)}
                          onKeyDown={(e) => handleKeyDown(e, index)}
                          onFocus={(e) => e.target.select()} // Auto-select the field on focus
                          ref={(ref) => (inputRefs.current[index] = ref)}
                          disabled={isSubmitting}
                          style={{
                            width: '46px',
                            height: '46px',
                            textAlign: 'center',
                            fontSize: '24px',
                            marginRight: index < otp.length - 1 ? '5px' : '0',
                          }}
                        />
                      ))}
                    </div>
                    <p className="text-muted text-center mt-2">
                      Didn't receive the code?{' '}
                      <a href="#" onClick={handleResendOtp}>
                        {isResending ? 'Resending...' : 'Resend'}
                      </a>
                    </p>
                  </div>
                  <div className="text-center mt-3">
                    <button
                      type="submit"
                      className="btn btn-lg btn-primary w-100"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Submitting...' : 'Verify'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
