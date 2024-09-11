import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

const PrivateRoute = ({ element, ...rest }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  return isAuthenticated() ? element : <Navigate to="/login" state={{ from: location }} />;
};

export default PrivateRoute;
