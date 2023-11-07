import {Navigate} from 'react-router-dom';
import { useAuth } from '../auth-provider';

const AutologinRoute = ({ children }) => {
  const { auth } = useAuth();

  if (auth.isConnected)
    return <Navigate to="/dashboard" replace />;

  return children;
};

export default AutologinRoute;