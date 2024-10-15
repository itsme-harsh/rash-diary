import './App.css';
import React, { useEffect, Suspense, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkToken } from './features/auth/authSlice';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProtectedRoute, LoginRestrict } from './ProtectedRoutes';
import ErrorBoundary from './ErrorBoundary';
import NotFound from './pages/NotFound';

import Dashboard from './pages/Dashboard';

// Lazy load pages
const Login = lazy(() => import('./pages/Auth/Login'));
const OtpVerification = lazy(() => import('./pages/Auth/OtpVerification'));
const Category1 = lazy(() => import('./pages/Category1'));
const Category2 = lazy(() => import('./pages/Category2'));
const Log = lazy(() => import('./pages/Log'));
const PeoplePage = lazy(() => import('./pages/people/Page'));
const SignUp = lazy(() => import('./pages/Auth/SignUp'));
const Settings = lazy(() => import("./pages/Settings"));
const Profile = lazy(()=> import("./pages/Settings/Profile"))
const AddPeople = lazy(()=> import("./pages/people/addPeople"))
const SharePeople = lazy(()=> import("./pages/share/SherePeople"))
const BirthdayWish = lazy(()=> import('./pages/Features/BirthdayWish'))

function App() {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkToken());
  }, [dispatch]);

  if (status === 'loading') {
    return (
      <div className="splash active">
        <div className="splash-icon"></div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <Router>
        <Suspense fallback={
          <div className="splash active">
            <div className="splash-icon"></div>
          </div>}
        >
          <Routes>
            <Route path="/" element={<LoginRestrict><Login /></LoginRestrict>} />
            <Route path="/register" element={<LoginRestrict><SignUp /></LoginRestrict>} />
            <Route path="/verify-otp" element={<LoginRestrict><OtpVerification /></LoginRestrict>} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/category1" element={<ProtectedRoute><Category1 /></ProtectedRoute>} />
            <Route path="/category2" element={<ProtectedRoute><Category2 /></ProtectedRoute>} />
            <Route path="/people" element={<ProtectedRoute><PeoplePage /></ProtectedRoute>} />
            <Route path="/log" element={<ProtectedRoute><Log /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/add-people" element={<ProtectedRoute><AddPeople /></ProtectedRoute>} />
            <Route path="/share" element={<ProtectedRoute><SharePeople /></ProtectedRoute>} />
            <Route path="/birthday" element={<ProtectedRoute><BirthdayWish /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </ErrorBoundary>
  );
}

export default React.memo(App);
