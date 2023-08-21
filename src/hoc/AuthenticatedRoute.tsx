import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { getIsAuthenticatedSelector } from '../data/auth/auth';

export default function AuthenticatedRoute() {
  const isAuthenticated = useSelector(getIsAuthenticatedSelector);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}
