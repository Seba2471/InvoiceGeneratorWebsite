import React from 'react';
import styles from './Login.module.css';
import bg from '../../assets/images/bg.svg';
import wave from '../../assets/images/wave.png';
import LoginForm from '../../components/Auth/Login/LoginForm/LoginForm';
import { axiosInstance } from '../../axios';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

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

  return (
    <div>
      <img className={`${styles.wave}`} src={wave} alt="wave" />
      <div className={`${styles.container}`}>
        <div className={`${styles.img}`}>
          <img src={bg} alt="bg" />
        </div>
        <LoginForm
          onLogin={(email: string, password: string) => login(email, password)}
        />
      </div>
    </div>
  );
}
