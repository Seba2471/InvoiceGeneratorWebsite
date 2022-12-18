import React from 'react';
import logo from '../../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';
import RightBar from '../../components/Auth/RightBar/RightBar';
import RegisterForm from '../../components/Auth/Register/RegisterForm/RegisterForm';
import { axiosInstance } from '../../axios';

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
    <div
      className="row ps-3 pe-3 ps-md-5 pe-md-0 mb-5"
      style={{ minHeight: '100vh' }}
    >
      <div className="col-12 col-md-8 align-self-center">
        <img className={`img-fluid`} src={logo} alt="logo" />

        <div className="col-12 col-lg-8 offset-lg-2 col-xl-6 offset-xl-3">
          <RegisterForm
            onRegister={(
              email: string,
              password: string,
              confirmPassword: string,
            ) => register(email, password, confirmPassword)}
          />
          <div className="mt-5">
            <h4 className="text-center"> Masz już konto ? </h4>
            <h5
              onClick={() => navigate('/login')}
              className={`text-center`}
              style={{ color: '#85b6ff' }}
            >
              Zaloguj się!
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
