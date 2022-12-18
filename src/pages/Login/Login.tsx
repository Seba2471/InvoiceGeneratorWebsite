import React from 'react';
import logo from '../../assets/images/logo.png';
import LoginForm from '../../components/Auth/Login/LoginForm/LoginForm';
import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import RightBar from '../../components/Auth/RightBar/RightBar';
import axiosInstance from '../../axios';
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
    <div
      className="row ps-3 pe-3 ps-md-5 pe-md-0 mb-5"
      style={{ minHeight: '100vh' }}
    >
      <div className="col-12 col-md-8 align-self-center">
        <img className={`img-fluid ${styles.logo}`} src={logo} alt="logo" />

        <div className="col-12 col-lg-8 offset-lg-2 col-xl-6 offset-xl-3">
          <LoginForm
            onLogin={(email: string, password: string) =>
              login(email, password)
            }
          />
          <div className="mt-5">
            <h5 className="text-center"> Nie masz jeszcze konta ? </h5>
            <h5
              onClick={() => navigate('/register')}
              className={`text-center ${styles.registerLink}`}
            >
              Zarejestruj się!
            </h5>
          </div>
        </div>
      </div>
      <div className="d-none d-md-flex col-md-4">
        <RightBar className="rounded-right" />
      </div>
    </div>
  );
}
