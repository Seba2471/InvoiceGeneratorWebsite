import React from 'react';
import { axiosInstance } from '../../../axios';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../../../components/Auth/Register/RegisterForm/RegisterForm';
import Auth from '../../../components/Layout/AuthLayout/AuthLayaout';

export default function Register() {
  let navigate = useNavigate();

  const register = async (
    email: string,
    password: string,
    confirmPassword: string,
  ) => {
    try {
      await axiosInstance.post('Auth/register', {
        email,
        password,
        confirmPassword,
      });
      navigate('/login');
    } catch (e: any) {
      if (e.response) {
        return e.response.data.errors;
      } else {
        return { [e.message]: 'something went wrong' };
      }
    }
  };

  const content = (
    <RegisterForm
      onRegister={(email: string, password: string, confirmPassword: string) =>
        register(email, password, confirmPassword)
      }
    />
  );

  return <Auth content={content} />;
}
