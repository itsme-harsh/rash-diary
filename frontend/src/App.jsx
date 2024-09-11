import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import Header from './components/Header';
import LoginPage from './components/LoginPage';
import OTPVerificationPage from './components/OTPVerificationPage';
import RegisterPage from './components/RegisterPage';
import Sidebar from './components/Sidebar';
import './index.css';
import PrivateRoute from './PrivateRoute'; // Import the PrivateRoute
const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`flex flex-col min-h-screen ${darkMode ? 'dark' : ''}`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-4">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/verify-otp" element={<OTPVerificationPage />} />
            <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
