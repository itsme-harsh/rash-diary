import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Correct hook from v6

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Replaces useHistory

  // Example: Function to handle user login
  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      setUser(response.data.user);
      // Redirect after login
      navigate('/dashboard'); // Instead of history.push()
    } catch (error) {
      console.error('Failed to login', error);
    }
  };

  // Function to handle user logout
  const logout = () => {
    setUser(null);
    navigate('/login'); // Instead of history.push()
  };

  // Example: Check if user is authenticated
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('/api/auth/me');
        setUser(response.data.user);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
