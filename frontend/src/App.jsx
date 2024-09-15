import './App.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkToken } from './features/auth/authSlice';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { ProtectedRoute, LoginRestrict } from './ProtectedRoutes';
import OtpVerification from './pages/OtpVerification';
import Category1 from "./pages/Category1"
import Category2 from "./pages/Category2"
function App() {
  const dispatch = useDispatch();
  const { isLoggedIn, isVerified, status } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkToken());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>; // Show a loading indicator while checking the token
  }

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginRestrict><Login /></LoginRestrict>} />
          <Route path="/verify-otp" element={<LoginRestrict><OtpVerification /></LoginRestrict>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>
          <Route path="/category1" element={<ProtectedRoute><Category1 /></ProtectedRoute>}/>
          <Route path="/category2" element={<ProtectedRoute><Category2 /></ProtectedRoute>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
