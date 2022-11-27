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
    <div className='row' style={{ minHeight: '100vh' }}>
      <div className='col-6 align-self-center'>
        <img className={`img-fluid`} src={logo} alt='logo' />

        <div className='col-8 offset-2'>
          <RegisterForm
            onRegister={(
              email: string,
              password: string,
              confirmPassword: string,
            ) => register(email, password, confirmPassword)}
          />
          <div className='mt-5'>
            <h4 className='text-center'> Masz już konto ? </h4>
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
      <RightBar />
    </div>
  );
}
