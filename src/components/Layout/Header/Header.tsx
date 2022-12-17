import React from 'react';
import logo from '../../../assets/images/logo.png';
import styles from './Header.module.css';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

export default function Header() {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    setAuth.logout();
    navigate('/login');
  };

  return (
    <div className={`${styles.main} mt-1 row`}>
      <div className="col-12 col-md-5 align-items-center d-flex">
        <img src={logo} className={`${styles.logo}`} alt="logo" />
      </div>
      <div className="d-none d-md-flex col-md-7 align-items-center justify-content-end d-flex">
        <span>Witaj, {auth.user.email}</span>
        <span onClick={() => logout()} className="text-primary ms-3">
          Wyloguj
        </span>
      </div>
    </div>
  );
}
