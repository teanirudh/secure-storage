import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return !user ? <Navigate to="/login" /> : children;
}

export default PrivateRoute;