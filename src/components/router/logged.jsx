import {Navigate} from 'react-router-dom';
import { useAuth } from '../auth-provider';

const LogguedRoute = ({ children }) => {
  const { auth } = useAuth();

  if (!auth.isConnected)
    return <Navigate to="/login" replace />;

  return children;
};

export default LogguedRoute;