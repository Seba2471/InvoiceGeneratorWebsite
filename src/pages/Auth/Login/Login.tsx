import React from 'react';
import LoginForm from '../../../components/Auth/Login/LoginForm/LoginForm';
import Auth from '../../../components/Layout/AuthLayout/AuthLayaout';
import { useDispatch } from 'react-redux';
import { authActions } from '../../../data/auth/auth';
import { INewUser } from '../../../models/Auth/IAuthRequest';
import { useNavigate } from 'react-router-dom';

export default function NewLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async (userData: INewUser) => {
    try {
      await dispatch(authActions.login(userData));
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
      onLogin={(email: string, password: string) => login({ password, email })}
    />
  );

  return <Auth content={content} />;
}
