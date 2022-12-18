import React from 'react';
import styles from './Menu.module.css';
import MenuLink from './MenuLink/MenuLink';
import { homeIcon, invoiceIcon, contractorsIcon, settingsIcon } from './Icons';
import useAuth from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import BurgerMenu from './BurgerMenu/BurgerMenu';

export default function Menu() {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    setAuth.logout();
    navigate('/login');
  };

  return (
    <div
      className={`row mt-1 mb-4 ps-1 pe-1 ${styles.main} align-items-center`}
    >
      <div className="col-4 col-lg-3 d-none d-md-block">
        <MenuLink color="#9747FF" label="Strona główna" to="/">
          {homeIcon}
        </MenuLink>
      </div>
      <div className="col-3 col-lg-3 d-none d-md-block">
        <MenuLink color="#85B6FF" label="Moje faktury" to="/my-invoices">
          {invoiceIcon}
        </MenuLink>
      </div>
      <div className="col-3 col-lg-3 d-none d-md-block">
        <MenuLink color="#4ECB71" label="Kontrahenci" to="/nowa-faktura1">
          {contractorsIcon}
        </MenuLink>
      </div>
      <div className="d-none d-lg-block col-1 col-lg-3 d-none d-lg-block">
        <MenuLink color="#EE9C22" label="Ustawienia" to="/nowa-faktura2">
          {settingsIcon}
        </MenuLink>
      </div>
      <div className="col-10  col-md-8 align-items-center justify-content-start d-flex d-md-none">
        <span>Witaj, {auth.user.email}</span>
        <span onClick={() => logout()} className="text-primary me-2 d-none">
          Wyloguj
        </span>
      </div>
      <div className="col-2 d-md-none">
        <BurgerMenu
          options={[
            { name: 'Strona główna', path: '/' },
            { name: 'Moje faktury', path: '/my-invoices' },
            { name: 'Kontrahenci', path: '/contractors' },
            { name: 'Ustawienia', path: '/settings' },
            { name: 'Wyloguj', path: '/logout' },
          ]}
        />
      </div>
      <div className="d-none d-md-flex col-md-2 d-lg-none justify-content-center d-flex">
        <BurgerMenu
          options={[{ name: 'Ustawienia', path: '/settings' }]}
          width="50%"
        />
      </div>
    </div>
  );
}
