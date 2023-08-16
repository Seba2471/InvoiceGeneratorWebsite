import React, { useState } from 'react';
import RegisterForm from '../../../components/Auth/Register/RegisterForm/RegisterForm';
import Auth from '../../../components/Layout/AuthLayout/AuthLayaout';
import ConfirmEmailForm from '../../../components/Auth/Register/ConfirmEmailForm/ConfirmEmailForm';
import { useDispatch } from 'react-redux';
import { IAuthRegisterRequest } from '../../../models/Auth/IAuthRegisterRequest';
import { authActions } from '../../../data/auth/auth';

export default function Register() {
  const [showEmailConfirm, setShowEmailConfirm] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const dispatch = useDispatch();

  const register = async (data: IAuthRegisterRequest) => {
    try {
      dispatch(authActions.register(data));
      setUserEmail(data.email);
      setShowEmailConfirm(true);
    } catch (e: any) {
      if (e.response) {
        return e.response.data.errors;
      } else {
        return { [e.message]: 'something went wrong' };
      }
    }
  };

  function timeout(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const sendConfirmEmail = async () => {
    //Mock backend
    await timeout(2000);
    console.log('Password has been restarted');
    return true;
  };

  const content = showEmailConfirm ? (
    <ConfirmEmailForm email={userEmail} sendNewMessage={sendConfirmEmail} />
  ) : (
    <RegisterForm
      onRegister={(email: string, password: string, confirmPassword: string) =>
        register({ email, password, confirmPassword })
      }
    />
  );

  return <Auth content={content} />;
}
