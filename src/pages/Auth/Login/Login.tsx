import React from 'react';
import LoginForm from '../../../components/Auth/Login/LoginForm/LoginForm';
import Auth from '../../../components/Layout/AuthLayout/AuthLayaout';
import { useDispatch } from 'react-redux';
import { authActions } from '../../../data/auth/auth';
import { IAuthRequest } from '../../../models/Auth/IAuthRequest';

export default function NewLogin() {
  const dispatch = useDispatch();

  const login = async (userData: IAuthRequest) => {
    try {
      await dispatch(authActions.login(userData));
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
