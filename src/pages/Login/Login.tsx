import React from 'react';
import logo from '../../assets/images/logo.png';
import LoginForm from '../../components/Auth/Login/LoginForm/LoginForm';
import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import RightBar from '../../components/Auth/RightBar/RightBar';
import { axiosInstance } from '../../axios';
import useAuth from '../../hooks/useAuth';

export default function Login() {
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
    <div className='row' style={{ minHeight: '100vh' }}>
      <div className='col-6 align-self-center'>
        <img className={`img-fluid ${styles.logo}`} src={logo} alt='logo' />

        <div className='col-8 offset-2'>
          <LoginForm
            onLogin={(email: string, password: string) =>
              login(email, password)
            }
          />
          <div className='mt-5'>
            <h4 className='text-center'> Nie masz jeszcze konta ? </h4>
            <h5
              onClick={() => navigate('/register')}
              className={`text-center ${styles.registerLink}`}
            >
              Zarejestruj się!
            </h5>
          </div>
        </div>
      </div>
      <RightBar />
    </div>
  );
}
