import React from 'react';
import logo from '../../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';
import RightBar from '../../components/Auth/RightBar/RightBar';
import RegisterForm from '../../components/Auth/Register/RegisterForm/RegisterForm';

type RegisterFormType = {
  email: string;
  password: string;
  replyPasword: string;
};

export default function Register() {
  let navigate = useNavigate();

  const register = (form: RegisterFormType) => {
    console.log(form);
    navigate('/login');
  };

  return (
    <div className='row' style={{ minHeight: '100vh' }}>
      <div className='col-6 align-self-center'>
        <img className={`img-fluid`} src={logo} alt='logo' />

        <div className='col-8 offset-2'>
          <RegisterForm
            onRegister={(value: RegisterFormType) => register(value)}
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
