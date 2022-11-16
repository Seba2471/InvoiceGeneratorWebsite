import React from 'react';
import logo from '../../../assets/images/logo.png';
import styles from './Header.module.css';

export default function Header() {
  return (
    <div className={`${styles.main} mt-3 row`}>
      <div className='col-12 col-md-4'>
        <img src={logo} className={`${styles.logo}`} alt='logo' />
      </div>
      <div className='d-none d-md-flex col-md-8 align-items-center justify-content-end'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='16'
          height='16'
          fill='currentColor'
          className='bi bi-search me-4'
          viewBox='0 0 16 16'
        >
          <path d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z' />
        </svg>
        <span className='me-3'>Witaj, Sebastian</span>

        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='16'
          height='16'
          fill='currentColor'
          className='bi bi-caret-down-fill me-4'
          viewBox='0 0 16 16'
        >
          <path d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z' />
        </svg>
      </div>
    </div>
  );
}
