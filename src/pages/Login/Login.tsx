import React, { useContext } from 'react';
import logo from '../../assets/images/logo.png';
import LoginForm from '../../components/Auth/Login/LoginForm/LoginForm';
import AuthContext from '../../contexts/authContext';
import authActions from '../../reducers/auth/actions';
import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import RightBar from '../../components/Auth/RightBar/RightBar';

export default function Login() {
  const { dispatch } = useContext(AuthContext);
  let navigate = useNavigate();

  const login = () => {
    dispatch(
      authActions.login({ token: 'Zalogowałem', isAuthenticated: true }),
    );
    navigate('/');
  };

  return (
    <div className='row' style={{ minHeight: '100vh' }}>
      <div className='col-6 align-self-center'>
        <img className={`img-fluid ${styles.logo}`} src={logo} alt='logo' />

        <div className='col-8 offset-2'>
          <LoginForm onLogin={() => login()} />
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
