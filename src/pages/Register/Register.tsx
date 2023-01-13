import React from 'react';
import styles from './Register.module.css';
import bg from '../../assets/images/bg.svg';
import wave from '../../assets/images/wave.png';
// import LoginForm from '../../components/Auth/Login/LoginForm/LoginForm';
import { axiosInstance } from '../../axios';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../../components/Auth/Register/RegisterForm/RegisterForm';

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

  return (
    <div>
      <img className={`${styles.wave}`} src={wave} alt="wave" />
      <div className={`${styles.container}`}>
        <div className={`${styles.img}`}>
          <img src={bg} alt="bg" />
        </div>
        <RegisterForm
          onRegister={(
            email: string,
            password: string,
            confirmPassword: string,
          ) => register(email, password, confirmPassword)}
        />
      </div>
    </div>
  );
}
