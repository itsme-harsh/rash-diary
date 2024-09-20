import './App.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkToken } from './features/auth/authSlice';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { ProtectedRoute, LoginRestrict } from './ProtectedRoutes';
import OtpVerification from './pages/OtpVerification';
import Category1 from "./pages/Category1";
import Category2 from "./pages/Category2";
import ErrorBoundary from './ErrorBoundary';
import NotFound from './pages/NotFound';
import Log from './pages/Log';

function App() {
  const dispatch = useDispatch();
  const { isLoggedIn, isVerified, status } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkToken());
  }, [dispatch]);

  if (status === 'loading') {
    return <div className="splash active">
    <div className="splash-icon"></div>
  </div>
  }

  return (
    <>
     <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<LoginRestrict><Login /></LoginRestrict>} />
          <Route path="/verify-otp" element={<LoginRestrict><OtpVerification /></LoginRestrict>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>
          <Route path="/category1" element={<ProtectedRoute><Category1 /></ProtectedRoute>}/>
          <Route path="/category2" element={<ProtectedRoute><Category2 /></ProtectedRoute>}/>
          <Route path="/log" element={<ProtectedRoute><Log /></ProtectedRoute>}/>
        <Route path="*" element={<NotFound/>}/>
        </Routes>
      </Router>
      </ErrorBoundary>
    </>
  );
}

export default App;
