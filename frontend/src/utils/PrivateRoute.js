import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

const PrivateRoute = ({ adminComponent, userComponent }) => {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" />;
  return user.is_admin ? adminComponent : userComponent;
}

export default PrivateRoute;