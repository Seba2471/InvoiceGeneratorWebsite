import React, { useContext } from 'react';
import logo from '../../assets/images/logo.png';
import AuthContext from '../../contexts/authContext';
import authActions from '../../reducers/auth/actions';
import { useNavigate } from 'react-router-dom';
import RightBar from '../../components/Auth/RightBar/RightBar';
import RegisterForm from '../../components/Auth/Register/RegisterForm/RegisterForm';

export default function Register() {
  const { dispatch } = useContext(AuthContext);
  let navigate = useNavigate();

  const register = () => {
    navigate('/login');
  };

  return (
    <div className='row' style={{ minHeight: '100vh' }}>
      <div className='col-6 align-self-center'>
        <img className={`img-fluid`} src={logo} alt='logo' />

        <div className='col-8 offset-2'>
          <RegisterForm onRegister={() => register()} />
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
