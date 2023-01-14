import React from 'react';
import LoginForm from '../../../components/Auth/Login/LoginForm/LoginForm';
import { axiosInstance } from '../../../axios';
import useAuth from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Auth from '../../../components/Auth/Auth';

export default function NewLogin() {
  const [, setAuth] = useAuth();
  let navigate = useNavigate();

  const login = async (email: string, password: string) => {
    try {
      const response = await axiosInstance.post('Auth/login', {
        email,
        password,
      });
      setAuth.login(response.data);
      navigate('/');
    } catch (e: any) {
      if (e.response) {
        return e.response.data.errors;
      } else {
        return { [e.message]: 'something went wrong' };
      }
    }
  };

  const content = (
    <LoginForm
      onLogin={(email: string, password: string) => login(email, password)}
    />
  );

  return <Auth content={content} />;
}
