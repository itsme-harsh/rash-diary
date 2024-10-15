import React, { useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { registerUser } from '../../features/auth/authSlice';

const validateForm = (form) => {
  const errors = {};
  if (!form.username) errors.username = 'Username is required';
  if (!form.email) errors.email = 'Email is required';
  if (!form.password) {
    errors.password = 'Password is required';
  } else if (form.password.trim() !== form.password) {
    errors.password = 'Password cannot start or end with spaces';
  }
  if (!form.confirmPassword) {
    errors.confirmPassword = 'Confirm Password is required';
  } else if (form.password !== form.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }
  return errors;
};

const InputField = ({ field, value, onChange, error, isPasswordVisible, isSubmitting }) => (
  <div className="form-group mb-3">
    <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
    <input
      className={`form-control form-control-lg ${error ? 'border border-danger' : ''}`}
      type={field === 'password' || field === 'confirmPassword' ? (isPasswordVisible ? 'text' : 'password') : 'text'}
      id={field}
      name={field}
      placeholder={`Enter your ${field}`}
      autoComplete={field === "email" || "username" ? "on" : "off"}
      value={value}
      onChange={onChange}
      disabled={isSubmitting}
    />
    {error && <p className="text-danger">{error}</p>}
  </div>
);

const SignUp = React.memo(() => {
  const [form, setForm] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status } = useSelector((state) => state.auth);

  const handleChange = useCallback(({ target: { name, value } }) => {
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedForm = {
      username: form.username.trim(),
      email: form.email.trim(),
      password: form.password.trim(),
      confirmPassword: form.confirmPassword.trim(),
    };

    const formErrors = validateForm(trimmedForm);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const action = await dispatch(registerUser(trimmedForm));

      if (registerUser.fulfilled.match(action)) {
        toast.success('Registration successful. Please verify your account.');
        console.log(action.payload.data)
        sessionStorage.setItem('username', action.payload.data);
        setTimeout(() => navigate('/verify-otp'), 1000); //auto otp
      } else if (action.payload?.message === "Please verify your account" && action.payload?.statusCode === 400) {
        toast.success(action.payload?.message || 'Registration successful. Please verify your account.');
        console.log(action.payload.data)
        sessionStorage.setItem('username', action.payload.data);
        setTimeout(() => navigate('/verify-otp'), 1000); //need to send otp
      } else {
        toast.error(action.payload?.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      toast.error('Something went wrong. Try again');
      setErrors({ form: 'Something went wrong. Try again' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => setIsPasswordVisible((prev) => !prev);

  const isFormSubmitting = useMemo(() => isSubmitting || status === 'loading', [isSubmitting, status]);

  return (
    <main className="d-flex align-items-center justify-content-center vh-100 login-page">
      <div className="container">
        <div className="row justify-content-center h-100">
          <div className="col-sm-10 col-md-8 col-lg-6 d-flex flex-column justify-content-center">
            <div className="text-center mt-4">
              <h1 className="h2">Welcome to Rash-diary</h1>
              <p className="lead">Sign up for an account to continue.</p>
            </div>
            <div className="card shadow-sm border-0 rounded">
              <div className="pt-4 px-4">
                <form onSubmit={handleSubmit}>
                  {['username', 'email', 'password', 'confirmPassword'].map((field) => (
                    <InputField
                      key={field}
                      field={field}
                      value={form[field]}
                      onChange={handleChange}
                      error={errors[field]}
                      isPasswordVisible={isPasswordVisible}
                      isSubmitting={isFormSubmitting}
                    />
                  ))}
                  <div className="form-group position-relative">
                    <button
                      className="btn btn-lg btn-primary btn-block"
                      type="submit"
                      disabled={isFormSubmitting}
                    >
                      {isFormSubmitting ? 'Signing up...' : 'Sign Up'}
                    </button>
                  </div>
                </form>
              </div>
              <div className="card-footer py-3 border-0">
                <div className="text-center">
                  Already have an account? <Link to="/">Sign In</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
});

export default SignUp;
