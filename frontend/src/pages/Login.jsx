import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUser, resendOtp } from '../features/auth/authSlice';

const validateForm = (username, password) => {
  const errors = {};
  if (!username) errors.username = 'Username is required';
  if (!password) errors.password = 'Password is required';
  return errors;
};

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, isVerified, status, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLoggedIn && !isVerified) {
      navigate('/verify-otp'); // Redirect to OTP verification page
    } else if (isLoggedIn && isVerified) {
      setTimeout(()=>{
        navigate('/dashboard'); // Redirect to dashboard if verifie
      },1000)
    }
  }, [isLoggedIn, isVerified, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = form;

    const formErrors = validateForm(username, password);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const action = await dispatch(loginUser({ username, password }));

      if (loginUser.fulfilled.match(action)) {
        const { user } = action.payload;
        if (!user?.verified) {
          sessionStorage.setItem('username', username);
          toast.error('Please verify your account.');

          setTimeout(() => {
            navigate('/verify-otp'); // Redirect to verify OTP page after showing toast
          }, 1000); // Short delay for toast visibility

          // Call sendOtp after redirect
          setTimeout(() => {
            sendOtp();
          }, 1000);
        } else {
          toast.success('Logged in successfully');
          navigate('/dashboard'); // Redirect to dashboard if verified
        }
      } else if (action.payload?.statusCode === 400 && action.payload.message === "Please verify your account") {
        toast.error('Please verify your account.');
        sessionStorage.setItem('username', username);
        setTimeout(() => {
          navigate('/verify-otp'); // Redirect to verify OTP page after showing toast
        }, 1000); // Short delay for toast visibility

        // Call sendOtp after redirect
        setTimeout(() => {
          sendOtp();
        }, 1000);
      } else {
        const errorMsg = action.payload?.message || 'Login failed';
        setErrors({ form: errorMsg });
        toast.error(errorMsg);
      }
    } catch (error) {
      setErrors({ form: 'An unexpected error occurred' });
      toast.error('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const sendOtp = async () => {
    try {
      const username = sessionStorage.getItem('username');
      if (!username) {
        toast.error('No username found in session storage.');
        return;
      }
      
      const action = await dispatch(resendOtp({ username }));

      if (resendOtp.fulfilled.match(action)) {
        toast.success('OTP sent successfully');
      } else {
        toast.error(action.payload?.message || 'Failed to resend OTP');
      }
    } catch (error) {
      toast.error('An unexpected error occurred while resending OTP');
    }
  };

  return (
    <main className="d-flex align-items-center justify-content-center vh-100 login-page">
      <div className="container">
        <div className="row justify-content-center h-100">
          <div className="col-sm-10 col-md-8 col-lg-6 d-flex flex-column justify-content-center">
            <div className="text-center mt-4">
              <h1 className="h2">Welcome back</h1>
              <p className="lead">Sign in to your account to continue</p>
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
                  <div className="form-group mb-3">
                    <label htmlFor="username">Username</label>
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      id="username"
                      name="username"
                      placeholder="Enter your username"
                      autoComplete="off"
                      value={form.username}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                    {errors.username && <p className="text-danger">{errors.username}</p>}
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="password">Password</label>
                    <input
                      className="form-control form-control-lg"
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Enter your password"
                      autoComplete="off"
                      value={form.password}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                    {errors.password && <p className="text-danger">{errors.password}</p>}
                    <small className="form-text text-muted">
                      <Link to="/pages-reset-password">Forgot password?</Link>
                    </small>
                  </div>
                  {errors.form && <p className="text-danger">{errors.form}</p>}
                  <div className="form-group">
                    <button
                      className="btn btn-lg btn-primary btn-block"
                      type="submit"
                      disabled={isSubmitting || status === 'loading'}
                    >
                      {isSubmitting || status === 'loading' ? 'Logging in...' : 'Sign in'}
                    </button>
                  </div>
                </form>
              </div>
              <div className="card-footer py-3 border-0">
                <div className="text-center">
                  Don't have an account yet? <Link to="/register">Sign up</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
