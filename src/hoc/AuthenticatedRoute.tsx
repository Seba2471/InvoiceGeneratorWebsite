import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../contexts/authContext';

export default function AuthenticatedRoute() {
  const { state } = useContext(AuthContext);

  return state.isAuthenticated ? <Outlet /> : <Navigate to='/login' />;
}
