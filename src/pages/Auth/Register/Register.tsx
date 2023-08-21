import React, { useState } from 'react';
import RegisterForm from '../../../components/Auth/Register/RegisterForm/RegisterForm';
import Auth from '../../../components/Layout/AuthLayout/AuthLayaout';
import ConfirmEmailForm from '../../../components/Auth/Register/ConfirmEmailForm/ConfirmEmailForm';
import { useDispatch } from 'react-redux';
export default function Register() {
  const content = <RegisterForm />;

  return <Auth content={content} />;
}
